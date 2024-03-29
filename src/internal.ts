import * as Log4js from "log4js";
import {Client} from "./client";
import {StrNum} from "./entity/entities";
import {sign} from "./o/sign";

const logger = Log4js.getLogger("API")

const root = "https://pocketuni.net";


let id = 0;
export async function SchoolList(): Promise<any> {
    return CallAPI(undefined, {
        endpoint: "/index.php?app=api&mod=Sitelist&act=getSchools",
        login: false,
        processResponse: (data) => {
            return data;
        },
    });

}

export async function SignInAndOut(client: Client | undefined, eventId: StrNum, userId: StrNum, type: 1 | 2): Promise<any> {
    return CallAPI(client, {
        endpoint: "https://pocketuni.net/index.php?app=api&mod=Event&act=signOnline",
        login: true,
        formData: (function () {
            const time = Math.floor(Date.now());
            const formData = new FormData();
            formData.append("actiId", eventId.toString());
            formData.append("userId", userId.toString());
            formData.append("type", type.toString());
            return formData;
        })(),
        processResponse: (data, response) => {
            return data;
        },
    });
}


export async function CallAPI(client: Client | undefined, options: {
    endpoint: string,
    login: boolean,
    formData?: FormData,
    additionalFormData?: (formData: FormData, client: Client) => void,
    processResponse?: (data: any,response:Response) => any,
}): Promise<any> {
    if(options.login&&!client?.authData.isLogin){
        return Promise.reject("未登录");
    }
    if ((client?.authData.oauth_token && client?.authData.oauth_token_secret) || !options.login || !client) {
        const formData = options.formData || new FormData();

        if (client !== undefined && client.authData.sid !== undefined) {
            formData.append("sid", client.authData.sid.toString());
            formData.append('oauth_token', client.authData.oauth_token + "");
            formData.append('oauth_token_secret', client.authData.oauth_token_secret + "");
            if (options.additionalFormData) {
                options.additionalFormData(formData, client);
            }
        }
        formData.append('version', "7.10.0");
        formData.append('from', "pc");
        const tid = id;
        id++;
        logger.debug(`Called API  => ${tid} ` + options.endpoint)
        try {
            const response = await fetch((options.endpoint.startsWith("https") ? "" : root) + options.endpoint, {
                body: formData,
                method: 'POST',
                headers:{
                    "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36 Edg/121.0.0.0"
                    ,"Referer":"https://pocketuni.net/",
                    "Origin":"https://pocketuni.net",
                    "Cookie":(()=>{
                        return client ? client.authData.cookie : "";
                    })()
                }
            });
            logger.debug(`API Response  => ${tid} ` + options.endpoint);
            let data=undefined;
            try {
                if (response.status === 401) {
                    logger.error("认证失败");
                    client?.emit("auth-failed",client)
                    return Promise.reject("认证失败")
                }
                data = await response.json();
                if (options.processResponse) {
                    return options.processResponse(data,response);
                }
            }catch (err){
                logger.error("服务器死了", err);
                return Promise.reject("服务器死了")
            }
            return data;
        } catch (error) {
            logger.error("API请求失败:", error);
            return Promise.reject("API请求失败");
        }
    } else {
        logger.error("API请求失败: " + "未登录");
        return Promise.reject("未登录");
    }
}

/**
 * 使用账户密码登录
 * @param client
 * @param school
 * @param password
 * @param username
 * @constructor
 */
export async function Login(client: Client, school: StrNum, password: StrNum, username: StrNum): Promise<any> {
    return CallAPI(client, {
        endpoint: "/index.php?app=api&mod=Sitelist&act=login",
        login: false,
        formData: (function () {
            const formData = new FormData();
            formData.append("school", school.toString());
            formData.append("password", password.toString());
            formData.append("usernum", username.toString());
            formData.append("type", "pc");
            formData.append("email", username.toString() + school.toString());
            return formData;
        })(),
        processResponse: (data,response) => {
            //设置回cookie 以防万一
            const cookies = response.headers.get('Set-Cookie');
            if (client && cookies) {
                client.authData.cookie = cookies;
            }

            return data;
        },
    });
}

/**
 * 使用二维码登录
 * @param client
 * @constructor
 */
export function Qrcode(client: Client): Promise<any> {
    return CallAPI(client, {
        endpoint: "/index.php?app=api&mod=Sitelist&act=pollingLogin&0",
        login: false,
        formData: (function () {
            const formData = new FormData();
            formData.append("token", client.authData.qrcodeToken);
            return formData;
        })(),
        processResponse: (data,response) => {
            const cookies = response.headers.get('Set-Cookie');
            if (client && cookies) {
                client.authData.cookie = cookies;
            }
            return data;
        },
    });
}

/**
 * 获取活动详情
 * @param client
 * @param eventId
 * @constructor
 */
export function EventDetail(client: Client, eventId: string | number): Promise<any> {
    return CallAPI(client, {
        endpoint: "/index.php?app=api&mod=Event&act=queryActivityDetailById&",
        login: true,
        formData: (function () {
            const formData = new FormData();
            formData.append("actiId", eventId.toString());
            return formData;
        })(),
        processResponse: (data) => {
            data.content.id = eventId;
            return data;
        },
    });
}

export function EventList(client: Client, status: number, page: number, count: number, keyword: string): Promise<any> {
    return CallAPI(client, {
        endpoint: "/index.php?app=api&mod=Event&act=newEventList&",
        login: true,
        formData: (function () {
            const formData = new FormData();
            formData.append("page", page.toString());
            formData.append("keyword", keyword);
            formData.append("count",count.toString() );
            formData.append("eventStatus",status?status.toString():'0');
            return formData;
        })(),
        processResponse: (data) => {
            return data;
        },
    });
}

export function CancelEvent(client: Client, eventId: string | number): Promise<any> {
    return CallAPI(client, {
        endpoint: "/index.php?app=api&mod=Event&act=cancelEvent",
        login: true,
        formData: (function () {
            const formData = new FormData();
            formData.append("id", eventId.toString());
            return formData;
        })(),
        processResponse: (data) => {
            return data;
        },
    });
}

/**
 *  获取活动我的活动列表
 * @param client
 * @param page
 * @param status 2 进行中 1 未开始 0 全部 4 已完结  5 审核中
 * @param count
 * @constructor
 */
export function MyEventList(client: Client, page: number, status: number, count: number): Promise<any> {
    return CallAPI(client, {
        endpoint: "/index.php?app=api&mod=Event&act=myEventList",
        login: true,
        formData: (function () {
            const formData = new FormData();
            formData.append("page", page.toString());
            formData.append("action", 'join');
            formData.append("status", status.toString());
            formData.append("count", count.toString());
            return formData;
        })(),
        processResponse: (data) => {
            return data;
        },
    });
}

/**
 * 加入一个活动
 * @param client
 * @param eventId
 * @constructor
 */
export function JoinEvent(client: Client, eventId: string | number): Promise<any> {
    return CallAPI(client, {
        endpoint: "/index.php?app=api&mod=Event&act=join2&",
        login: true,
        formData: (function () {
            const formData = new FormData();
            const time = Math.floor(Date.now() / 1000);
            formData.append('id', eventId+"");
            formData.append('time', time.toString());
            formData.append('sign', sign(`${client.authData.uid}`, eventId));
            return formData;
        })(),
        processResponse: (data) => {
            return data;
        },
    });
}

export function MUserInfo(client: Client): Promise<any> {
    return CallAPI(client, {
        endpoint: "/index.php?app=api&mod=Pc&act=pcUser",
        login: true,
        processResponse: (data) => {
            return data;
        },
    });
}

export function MSchoolInfo(client: Client): Promise<any> {
    return CallAPI(client, {
        endpoint: "/index.php?app=api&mod=Pc&act=pcHead&sid=" + client.authData.sid,
        login: true,
        processResponse: (data) => {
            return data;
        },
    });
}

//https://pocketuni.net/index.php?act=myEventCollect&mod=Collect&app=api
export function MyFavEvent(client: Client, count: number, page: number): Promise<any> {
    return CallAPI(client, {
        endpoint: "/index.php?act=myEventCollect&mod=Collect&app=api",
        login: true,
        formData: (function () {
            const formData = new FormData();
            formData.append("count",count.toString());
            formData.append("page", page.toString());
            return formData;
        })(),
        processResponse: (data) => {
            return data;
        },
    });
}

export function EventUsers(client: Client, eventId: StrNum, page: number): Promise<any> {
    return CallAPI(client, {
        endpoint: "/index.php?app=api&mod=Event&act=eventUser&",
        login: true,
        formData: (function () {
            const formData = new FormData();
            formData.append("id", eventId.toString());
            formData.append("page",page.toString());
            return formData;
        })(),
        processResponse: (data) => {
            return data;
        },
    });
}

/**
 * 获取部落列表
 * @param client
 * @param page 每页最多10个
 * @constructor
 */
export function GroupList(client: Client, page: StrNum): Promise<any> {
    return CallAPI(client, {
        endpoint: "/index.php?act=groupList&mod=Group&app=api",
        login: true,
        formData: (function () {
            const formData = new FormData();
            formData.append("page", page.toString());
            return formData;
        })(),
        processResponse: (data) => {
            return data;
        },
    });
}

/**
 * 获取部落活动
 * @param client
 * @param assnId 部落id
 * @param page 每页最多10个
 * @constructor
 */
export function GroupEvent(client: Client, assnId: StrNum, page: StrNum): Promise<any> {
    return CallAPI(client, {
        endpoint: "/index.php?act=groupList&mod=Group&app=api",
        login: true,
        formData: (function () {
            const formData = new FormData();
            formData.append("page", page.toString());
            formData.append("assnId",assnId.toString());
            return formData;
        })(),
        processResponse: (data) => {
            return data;
        },
    });
}

/**
 * 取消收藏或者收藏活动
 * @param client
 * @param eventId 活动id
 * @param type add|cancel
 * @constructor
 */
export function FavEvent(client: Client, eventId: StrNum, type: "add" | "cancel"): Promise<any> {
    return CallAPI(client, {
        endpoint: "/index.php?act=fav&mod=Event&app=api",
        login: true,
        formData: (function () {
            const formData = new FormData();
            formData.append("type", type);
            formData.append("id",eventId.toString());
            return formData;
        })(),
        processResponse: (data) => {
            return data;
        },
    });
}

/**
 *
 * @param client
 * @param page 每页最多10个
 * @param action 默认 空 apply 为申请中
 * @constructor
 */
export function MyGroupList(client: Client, page: StrNum, action = ''): Promise<any> {
    return CallAPI(client, {
        endpoint: "/index.php?act=mygrouplist&mod=Group&app=api",
        login: true,
        formData: (function () {
            const formData = new FormData();
            formData.append("page", page.toString());
            formData.append("action",action);
            return formData;
        })(),
        processResponse: (data) => {
            return data;
        },
    });
}

export function GroupDetail(client: Client, sessid: StrNum): Promise<any> {
    return CallAPI(client, {
        endpoint: `/index.php?app=api&mod=Group&act=groupDetailPc&id=${sessid}`,
        login: true,
        processResponse: (data) => {
            // 因为没有id 所以手动加上
            data.content.id = sessid;
            return data;
        },
    });
}

export function PersonalCenter(client: Client): Promise<any> {
    return CallAPI(client, {
        endpoint: `https://pocketuni.net/api/User/personalCenter?oauth_token=${client.authData.oauth_token}&oauth_token_secret=${client.authData.oauth_token_secret}`,
        login: true,
        processResponse: (data) => {
            return data;
        },
    });
}

//https://pocketuni.net/api/jifen/sign
//day=&oauth_token_secret=9225d2824cf62098a829f8cbd19e3750&oauth_token=2bf8b3b14568e7efd9bbb8c36a4ccdff
export function Sign(client: Client): Promise<any> {
    return CallAPI(client, {
        endpoint: `https://pocketuni.net/api/jifen/sign`,
        login: true,
        formData: (function () {
            const formData = new FormData();
            formData.append("day", "");
            return formData;
        })(),
        processResponse: (data) => {
            return data;
        },
    });
}
