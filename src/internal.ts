import * as Log4js from "log4js";
import {Client} from "./client";
import {StrNum} from "./entity/entities";
import {sign} from "./o/sign";

const logger = Log4js.getLogger("API")

const root = "https://pocketuni.net";


function addAuthTokens(formData: FormData, client: Client) {
    formData.append('oauth_token', client.oauth_token + "");
    formData.append('oauth_token_secret', client.oauth_token_secret + "");
}

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
            if(client&&cookies){
                client.cookie=cookies;
            }

            return data;
        },
    });
}

export async function CallAPI(client: Client|undefined, options: {
    endpoint: string,
    login: boolean,
    formData?: FormData,
    additionalFormData?: (formData: FormData, client: Client) => void,
    processResponse?: (data: any,response:Response) => any,
}): Promise<any> {
    if ( !options.login||client===undefined||client.userinfo !== undefined) {
        const formData = options.formData || new FormData();

        if (client!==undefined&&client.userinfo !== undefined) {
            formData.append("sid", client.userinfo.sid);
            addAuthTokens(formData, client);
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
            const response = await fetch(root + options.endpoint,{
                body: formData,
                method: 'POST',
                headers:{
                    // ？？？？？ 你在干什么
                    "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36 Edg/121.0.0.0"
                    ,"Referer":"https://pocketuni.net/",
                    "Origin":"https://pocketuni.net",
                    "Cookie":(()=>{
                        return  client?client.cookie:"";
                    })()
                }

            });
            logger.debug(`API Response  => ${tid} ` + options.endpoint);

            let data=undefined;
            try {
                data = await response.json();
                if (data.message === "认证失败" || data.message === "授权失败") {
                    if(client){
                        if(client.options.reLogin){
                        if(!client.processing){
                                logger.debug("重新登录");
                                if(client)
                                    try {
                                        await client.reLogin();

                                    }catch (err){
                                        logger.error(err)
                                    }
                                return CallAPI(client, options);
                            }

                        }
                    }
                    logger.error("认证失败");
                    return Promise.reject("认证失败")
                }
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
 * 使用二维码登录
 * @param client
 * @param token
 * @constructor
 */
export function Qrcode(client: Client, token: string): Promise<any> {
    return CallAPI(client, {
        endpoint: "/index.php?app=api&mod=Sitelist&act=pollingLogin&0",
        login: false,
        formData: (function () {
            const formData = new FormData();
            formData.append("token", token);
            return formData;
        })(),
        processResponse: (data,response) => {
            const cookies = response.headers.get('Set-Cookie');
            if(client&&cookies){
                client.cookie=cookies;
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
            return data;
        },
    });
}

export function EventList(client: Client, status:number, page: number, count: number,keyword:string): Promise<any> {
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
export function MyEventList(client: Client, page: number,status:number,count:number): Promise<any> {
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
            formData.append('sign', sign(`${client.userinfo?.uid}`, eventId));
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
        endpoint: "/index.php?app=api&mod=Pc&act=pcHead&sid=" + client.userinfo?.sid,
        login: true,
        processResponse: (data) => {
            return data;
        },
    });
}

//https://pocketuni.net/index.php?act=myEventCollect&mod=Collect&app=api
export function MyFavEvent(client: Client,count:number): Promise<any> {
    return CallAPI(client, {
        endpoint: "/index.php?act=myEventCollect&mod=Collect&app=api",
        login: true,
        formData: (function () {
            const formData = new FormData();
            formData.append("count",count.toString());
            return formData;
        })(),
        processResponse: (data) => {
            return data;
        },
    });
}
export function EventUsers(client: Client, eventId: StrNum,page:number): Promise<any> {
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
export function GroupList(client: Client,page:StrNum): Promise<any> {
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
 * 活动部落活动
 * @param client
 * @param assnId 部落id
 * @param page 每页最多10个
 * @constructor
 */
export function GroupEvent(client: Client,assnId:StrNum,page:StrNum): Promise<any> {
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
 * @param type fav|cancel
 * @constructor
 */
export function FavEvent(client: Client,eventId:StrNum,type:"fav"|"cancel"): Promise<any> {
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
export function MyGroupList(client: Client,page:StrNum,action=''): Promise<any> {
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
