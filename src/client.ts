import {ClientOption, StrNum} from "./entity/entities";
import {Login, MSchoolInfo, MUserInfo, PersonalCenter, Qrcode, Sign} from "./internal";
import {getLogger} from "log4js";
import {EventUser, SchoolInfo, Student} from "./entity/user";
import * as Fs from "fs";
import {callSchoolList} from "./o/api";
import {Group} from "./entity/group";
import {Event} from "./entity/event";

const logger = getLogger("CLIENT");
export let baseDir = process.cwd() + "/pu-client";

Fs.mkdirSync(baseDir + "/userdata", {recursive: true})
Fs.mkdirSync(baseDir + "/cache", {recursive: true})

/** 认证信息 */
export interface AuthData {

    /** 用户token */
    oauth_token: string;
    /** 用户token */
    oauth_token_secret: string;
    /** 用户cookie */
    cookie: string;
    /** 用户id */
    uid: string;
    /** 学校id */
    sid: string;
    /** 学号 */
    sno: string;
    /** 使用二维码登录的token */
    qrcodeToken: string;
    /** 学校代码 */
    schoolCode: string;
    /** 用户名/学号 */
    username: StrNum;
    /** 密码 */
    password: StrNum;
    /** 是否正在登录 */
    processing: boolean;
}

export interface Client {
    store: any;
    /** 认证信息 */
    authData: AuthData
    userinfo: Student;
    schoolinfo: SchoolInfo;
    options: ClientOption;

    // on(event: "auth-failed", listener: (client: Client) => void): this;
    /** 是否登录中 */
    isLogging(): boolean;

    /** 二维码登录 */
    login(qrcodeToken: string): Promise<this>;

    /** 账号密码登录 */
    login(username?: StrNum, password?: StrNum, school?: string): Promise<this>;

    /** 测试token是否有效 */
    test(): Promise<void>;

    /** 重新登录 仅仅适用于使用账号密码登录的*/
    reLogin(): Promise<this>;

    /** 更新用户信息 */
    updateInfo(): Promise<void>;

    /** 获取缓存信息 */
    getCache<T>(serve: string, key: string): T;

    /** 设置缓存信息 */
    setCache<T>(serve: string, key: string, data: T): void;

    /** 清除缓存信息 */
    clearCache<T>(serve: string, key?: string): void;

    /** 获取部落对象 */
    getGroup(sessid: string, option?: Option): Promise<Group>;

    /** 获取活动对象 */
    getEvent(event: string, option?: Option): Promise<Event>;

    /** 取消活动 */
    cancelEvent(eventId: StrNum): Promise<DataResult<string>>;

    /** 加入活动 */
    joinEvent(eventId: StrNum): Promise<DataResult<string>>;

    /** 收藏/取消收藏活动 */
    favEvent(eventId: StrNum, action: "add" | "cancel"): Promise<void>;

    /** 获取活动列表 生成器
     * 此函数获取的Event对象不完整 请使用getEvent获取完整对象
     * @param type 活动类型
     * @param keyword 关键字
     * @param count 每页数量 默认 20
     * @param page 页数 默认 -1 需要你自行判断是否已获取完 例如 events.length<count||events.length==0
     */
    eventList(type: "已结束" | "进行中" | "未开始" | "全部", keyword?: string, count?: number, page?: number): AsyncGenerator<Array<Event>>;

    /** 获取我收藏的活动 默认一次性获取全部 生成器
     *  此函数获取的Event对象不完整 请使用getEvent获取完整对象
     *  @param page 页数 默认 -1
     *  @param count 每页数量 默认 10
     *  @param option 选项
     */
    myFavEventList(page?: number, count?: number, option?: Option): AsyncGenerator<Array<Event>>;

    /** 获取我的活动 生成器
     * 此函数获取的Event对象不完整 请使用getEvent获取完整对象
     * @param type 活动类型
     * @param count 每页数量 默认 10
     * @param page 页数 默认 -1 需要你自行判断是否已获取完 例如 events.length<count||events.length==0
     */
    myEventList(type: "已结束" | "进行中" | "审核中" | "未开始" | "全部", page?: number, count?: number): AsyncGenerator<Array<Event>>;

    /** 获取部落列表 生成器
     *  此函数获取的Group对象不完整 请使用getGroup获取完整对象
     *  @param page 页数 默认 -1
     */
    groupList(page?: number): AsyncGenerator<Array<Group>>;

    /** 获取我加入的部落列表 生成器
     * 此函数获取的Group对象不完整 请使用getGroup获取完整对象
     * @param page 页数 默认 -1
     */
    myGroupList(page?: number): AsyncGenerator<Array<Group>>;

    /** 获取活动用户列表 生成器
     * @param eventId 活动id
     */
    eventUsers(eventId: StrNum): AsyncGenerator<Array<EventUser>>;

    /**
     * 每日签到
     */
    dailySign(): Promise<DataResult<any>>;
}

export class ClientImp implements Client {
    store: any = {}
    authData: AuthData = {
        oauth_token: "",
        oauth_token_secret: "",
        cookie: "",
        uid: "",
        sid: "",
        sno: "",
        qrcodeToken: "",
        schoolCode: "",
        username: "",
        password: "",
        processing: false
    }
    options: ClientOption;
    schoolinfo: SchoolInfo;
    userinfo: Student;
    readonly cacheMap: Map<string, any> = new Map<string, any>();
    readonly catchGroup = Group.catch.bind(this);
    readonly catchEvent = Event.catch.bind(this);
    readonly cancelEventB = Event.cancelEvent.bind(this);
    readonly joinEventB = Event.joinEvent.bind(this);
    readonly eventListB = Event.eventList.bind(this);
    readonly favEventB = Event.favEvent.bind(this);
    readonly myEventListB = Event.myEventList.bind(this);
    readonly myFavEventListB = Event.myFavEventList.bind(this);
    readonly myGroupListB = Group.myGroupList.bind(this);
    readonly groupListB = Group.groupList.bind(this);
    readonly eventUsersB = Event.eventUsers.bind(this);


    async login(username?: StrNum, password?: StrNum, school?: string, qrcodeToken?: string): Promise<this> {
        if (this.authData.processing) {
            return Promise.reject("正在登录中");
        }
        let rspData;
        this.authData.processing = true
        if (password && username && school && qrcodeToken === undefined) {
            this.options.reLogin = true;
            this.authData.schoolCode = school;
            this.authData.username = username;
            this.authData.password = password;
            rspData = await Login(this.authData, school, password, username).then((v) => {
                return v
            })
        } else {
            this.options.reLogin=false
            this.authData.qrcodeToken = (username as string);
            try {
                rspData = await this.poll().then((v) => {
                    return v
                })
            } catch (e) {
                return Promise.reject(e)
            }
        }
        if (rspData.message === "success") {
            this.userinfo = rspData.content.user_info;
            this.authData.oauth_token = rspData.content.oauth_token;
            this.authData.oauth_token_secret = rspData.content.oauth_token_secret;
            this.count = 30;
        } else {
            this.options.reLogin = false
            return Promise.reject(rspData.message)
        }
        this.authData.processing = false
        await this.updateInfo();
        return this;
    }

    private count: number = 30;

    async reLogin(): Promise<this> {
        if (!this.options.reLogin) {
            return Promise.reject("不支持重新登录")
        }
        return await this.login(this.authData.username, this.authData.password, this.authData.schoolCode + "");
    }

    async updateInfo(): Promise<void> {
        try {
            await MUserInfo(this.authData).then((data: any) => {
                this.userinfo = new Student(Object.assign(data.content, this.userinfo));
                this.authData.uid = this.userinfo.uid + "";
                this.authData.sid = this.userinfo.sid + "";
                this.authData.sno = this.userinfo.sno + "";
            })
            await MSchoolInfo(this.authData).then((data: any) => {
                this.schoolinfo = data.content.school
            })
            await PersonalCenter(this.authData).then((data: any) => {
                this.userinfo = new Student(Object.assign(data.content.user_info, this.userinfo));
            })
        }catch (e){
            return Promise.reject(e)
        }
    }

    isLogging(): boolean {
        return this.authData.processing;
    }

    getCache<T>(serve: string, key: string): T {
        return this.cacheMap.get(serve + "." + key);
    }

    setCache<T>(serve: string, key: string, data: T): void {
        this.cacheMap.set(serve + "." + key, data);
    }

    clearCache(serve: string, key?: string): void {
        this.cacheMap.delete(serve + "." + key);
        if (key) {
            this.cacheMap.forEach((value, key) => {
                if (key.startsWith(serve)) {
                    this.cacheMap.delete(key);
                }
            })
        }
    }

    getGroup(sessid: string, option?: Option): Promise<Group> {
        return this.catchGroup(sessid, option);

    }

    getEvent(event: string, option?: Option): Promise<Event> {
        return this.catchEvent(event, option);

    }

    cancelEvent(eventId: StrNum): Promise<DataResult<string>> {
        return this.cancelEventB(eventId);
    }

    joinEvent(eventId: StrNum): Promise<DataResult<string>> {
        return this.joinEventB(eventId);
    }

    favEvent(eventId: StrNum, action: "add" | "cancel"): Promise<void> {
        return this.favEventB(eventId, action);

    }

    eventList(type: "已结束" | "进行中" | "未开始" | "全部", keyword: string, count: number, page: number): AsyncGenerator<Array<Event>> {
        return this.eventListB(type, page, keyword, count);
    }

    myEventList(type: "已结束" | "进行中" | "审核中" | "未开始" | "全部", page: number, count: number): AsyncGenerator<Array<Event>> {
        return this.myEventListB(type, page, count);
    }

    myFavEventList(page?: number, count?: number, option?: Option): AsyncGenerator<Array<Event>> {
        return this.myFavEventListB(page, count, option);

    }

    groupList(page?: number): AsyncGenerator<Array<Group>> {
        return this.groupListB(page);
    }

    myGroupList(page?: number): AsyncGenerator<Array<Group>> {
        return this.myGroupListB(page);
    }

    eventUsers(eventId: StrNum): AsyncGenerator<Array<EventUser>> {
        return this.eventUsersB(eventId);

    }

    test(): Promise<void> {
        try {
            return this.updateInfo();
        } catch (e) {
            return Promise.reject(e);
        }
    }

    private async poll() {
        while (true) {
            this.count--;
            if (this.count < 0) {
                return Promise.reject("二维码超时")
            }
            const data = await Qrcode(this.authData);
            if (data.message === "success") {
                return data;
            }
            await new Promise(r => setTimeout(r, 1000))
        }
    }

    async dailySign(): Promise<DataResult<any>> {
        const data = await Sign(this.authData);
        return {status: data.message === "签到成功", data: data.message};
    }


}

const defaultOption: ClientOption = {
    reLogin: false,
    cacheTime: 1000 * 60 * 60 * 24 * 7
}

export async function createClient(username: StrNum, school: string, password: StrNum, option: ClientOption = defaultOption): Promise<Client> {
    const client: Client = new ClientImp();
    await callSchoolList();
    client.options = option;

    return await client.login(username, password, school);

}

export async function createClientByQrcode(qrcodeToken: string, option: ClientOption = defaultOption): Promise<Client> {
    const client: Client = new ClientImp();
    await callSchoolList();
    client.options = option;
    return await client.login(qrcodeToken);
}

export interface CacheData {
    time: number;
    data: any;
}

export interface DataResult<T> {

    status: boolean;
    data: T;
}

/**
 * 用于各种获取操作的设置 如缓存
 */
export interface Option {
    cache: boolean
}

export const default_Option: Option = {
    cache: true
}
export const statusMap: any = {
    // 2 进行中 1 未开始 0 全部 4 已完结  5 审核中

    进行中: 2,
    未开始: 1,
    全部: 0,
    已完结: 4,
    审核中: 5,
    已结束: 3
}