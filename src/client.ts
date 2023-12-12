import {ClientOption, Filter, StrNum} from "./entity/entities";
import {EventInfo, SchoolEvent} from "./entity/event";
import {
    CancelEvent,
    EventDetail,
    EventList,
    EventUsers,
    JoinEvent,
    Login,
    MSchoolInfo,
    MUserInfo,
    MyEventCollect,
    Qrcode
} from "./internal";
import {getMTime} from "./utils";
import {MD5} from 'crypto-js';
import {getLogger} from "log4js";
import {EventUser, SchoolInfo, StudentInfo} from "./entity/user";
import * as Fs from "fs";
import {callSchoolList, schoolCache} from "./o/api";

const logger = getLogger("CLIENT");
export let baseDir = process.cwd() + "/pu-client";

export declare class Client {
    processing: boolean;
    userinfo: StudentInfo | undefined;
    joinDelay: number;
    school: SchoolInfo | undefined;
    qrcodeToken: string | undefined;
    oauth_token: string | undefined;
    oauth_token_secret: string | undefined;
    options: ClientOption;
    originLoginData: any;
    userdataPath: string | undefined;
    //登录
    login(qrcodeToken: string): Promise<this>;
    //登录
    login(username?: StrNum, password?: StrNum, school?: string): Promise<this>;




    //加入活动
    joinEvent(eventId: StrNum): Promise<DataResult<string>>;



    //测试当前用户token是否有效
    test(): Promise<void>;

    //取消活动
    cancelEvent(eventId: StrNum): Promise<DataResult<string>>;

    //更新用户信息
    updateInfo(): Promise<void>;

    //以下函数都有缓存

    /*
    获取我的收藏活动列表
    @Deprecated
     */
    myCollectEventList(filter: Filter,cache?:boolean): Promise<DataResult<Array<SchoolEvent>>>;
    //获取收藏的活动列表
    collectEventList(filter: Filter,cache?:boolean): Promise<DataResult<Array<SchoolEvent>>>;
    //获取活动详情
    eventInfo(eventId: StrNum,cache?:boolean): Promise<DataResult<EventInfo>>;
    //获取活动列表
    eventList(keyword: string, page: number, filter: Filter,cache?:boolean): Promise<DataResult<Array<SchoolEvent>>>;
    /**
     获取活动用户列表
     * @param eventId 活动id
     * @param page 需要多少页的数据 默认获取全部的数据
     * @param cache
     */
    eventUsers(eventId:StrNum,page:number,cache?:boolean): Promise<DataResult<Array<EventUser>>>;

    //获取我的活动列表
    // myEventList(filter?: Filter): Promise<DataResult<Array<SchoolEvent>>>;





}

export class ClientBase implements Client {
    joinDelay: number = -1;
    originLoginData: any;
    processing: boolean = false;
    userinfo: StudentInfo | undefined;
    qrcodeToken: string | undefined;
    oauth_token: string | undefined;
    oauth_token_secret: string | undefined;
    school: SchoolInfo | undefined;
    options: ClientOption = {
        cacheTime: 1000 * 60 * 4,
        usecache: true
    };
    userdataPath: string | undefined;

    async login(username?: StrNum, password?: StrNum, school?: string, qrcodeToken?: string): Promise<this> {
        if (this.processing) {
            return Promise.reject("正在登录中");
        }
        let rspData;
        this.processing = true
        if (password && username && school) {
            rspData = await Login(this, school, password, username).then((v) => {
                return v
            })
        } else {
            this.qrcodeToken = (username as string);
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
            this.oauth_token = rspData.content.oauth_token;
            this.oauth_token_secret = rspData.content.oauth_token_secret;
        } else {
            return Promise.reject(rspData.message)
        }
        this.processing = false
        await this.updateInfo();
        return this;
    }

    private count: number = 30;
    private async poll() {
        while (true) {
            this.count--;
            if (this.count < 0) {
                return Promise.reject("二维码超时")
            }
            const data = await Qrcode(this, this.qrcodeToken + "").then((data) => {

                return data;
            })
            if (data.message === "success") {
                return data;
            }
            await new Promise(r => setTimeout(r, 1000))
        }
    }

    async cancelEvent(eventId: StrNum): Promise<DataResult<string>> {
        return await CancelEvent(this, eventId).then((data) => {

            if (data.msg.includes("用户不存在")) {
                return {status: true, data: '未加入该活动'};
            }
            return {status: true, data: data.msg};

        })
    }


    async test(): Promise<void> {
        return await MUserInfo(this).catch((e) => {
            return Promise.reject(e);
        })
    }

    async updateInfo(): Promise<void> {
        try {
            await MUserInfo(this).then((data: any) => {
                this.userinfo = Object.assign(data.content, this.userinfo)
            })
            await MSchoolInfo(this).then((data: any) => {
                this.school = data.content.school
            })
            this.userdataPath = baseDir + "/userdata/" + `${this.userinfo?.sno}_${this.userinfo?.sid}`;
            Fs.mkdirSync(this.userdataPath, {recursive: true})
            const o:any={};
            o.userinfo = this.userinfo;
            o.oauth_token = this.oauth_token;
            o.oauth_token_secret = this.oauth_token_secret;
            // o.school = this.school;
            // o.userdataPath = baseDir + "/userdata/" + `${sno}_${school}`;
            Fs.writeFileSync(this.userdataPath + "/userinfo.json", JSON.stringify(this))
        }catch (e){
            return Promise.reject(e)}
    }

    async joinEvent(eventId: StrNum): Promise<DataResult<string>> {
        if (Date.now() < this.joinDelay) {
            return {status: false, data: "操作过于频繁，请稍候再试？"};
        }
        this.joinDelay = Date.now() + 1000 * 2;
        return await JoinEvent(this, eventId).then((data) => {

            if (data.msg.includes("记得准时签到哦~")) {
                return {status: true, data: data.msg};
            }
            // if(data.msg.includes("操作过于频繁，请稍候再试")){
            //     return "ok";
            // }
            return {status: false, data: data.msg};
        })
    }

    async eventList(keyword: string, page: number, filter: Filter = {},cache:boolean=true): Promise<DataResult<Array<SchoolEvent>>> {
        let rtv:SchoolEvent[]=[];
        let flag=true;
        const time=getMTime()
        const cyc=page==-1;
        const max = page;
        while (flag){
            if(cyc){
                page++;
            } else {
                page++;
                if (page > max) {
                    break;
                }
            }
            rtv = rtv.concat(await EventList(this, page, keyword).then((data) => {
                if(filter){
                    return data.content.filter((v:SchoolEvent)=>{

                        let flag1=true;
                        if(time>=v.eTime){
                            flag=false;
                        }
                        if(filter.allow){
                            flag1 = flag1 && v.allow === '0';
                        }
                        if(filter.name){

                            if(RegExp(filter.name).test(v.title)){
                                flag1=flag1&&true;}
                        }
                        if(filter.credit){
                            if(v.credit<filter.credit){
                                flag1=flag1&&false;
                            }
                        }
                        if (filter.func) {
                            if (!filter.func(v)) {
                                flag1 = flag1 && false;
                            }
                        }
                        return flag1;
                    })
                }
                return data;
            }))
        }
        return {status: true, data: rtv};
    }

    async eventInfo(eventId: StrNum,cache:boolean=true): Promise<DataResult<EventInfo>> {

        return await EventDetail(this, eventId).then((data: any) => {
            return {status: true, data: data.content};
        })

    }
    async myCollectEventList(filter: Filter={},cache:boolean=true): Promise<DataResult<Array<SchoolEvent>>> {
        return await MyEventCollect(this).then((data) => {
            if (filter) {
                return data.content.filter((v: SchoolEvent) => {

                    let flag1 = true;

                    if (filter.allow) {
                        flag1 = flag1 && v.allow === '0';
                    }
                    if (filter.name) {
                        if (!v.title.includes(filter.name)) {
                            flag1 = flag1 && false;
                        }
                    }
                    if (filter.credit) {
                        if (v.credit < filter.credit) {
                            flag1 = flag1 && false;
                        }
                    }
                    if (filter.func) {
                        if (!filter.func(v)) {
                            flag1 = flag1 && false;
                        }
                    }
                    return flag1;
                })
            } else {
                return data.content;
            }
        })
    }
    async collectEventList(filter: Filter, cache?: boolean): Promise<DataResult<Array<SchoolEvent>>> {
        return this.myCollectEventList(filter,cache);
    }
    async eventUsers(eventId: StrNum, page: number=-1, cache?: boolean): Promise<DataResult<Array<EventUser>>> {
        const rtv=[];
        let count=page==-1?1000:page;
        for (let i = 1; i < count; i++) {
            const data = await EventUsers(this, eventId,i).then((data: any) => {
                return data.content;
            })
            if(data.length==0){
                break;
            }
            rtv.push(...data);
        }
        return {status: true, data: rtv};

    }
}

export class ClientImp extends ClientBase {
    readonly cacheHandler = {
        cache: new Map<string, CacheData>(),
        apply: async function (target: any, thisArg: ClientImp, args: Array<any>) {
            const hash = MD5(target.name + JSON.stringify(args)).toString().toLowerCase();
            const data = this.cache.get(hash);
            if (data !== undefined && getMTime() - data.time < thisArg.options.cacheTime&&args[args.length-1]) {
                logger.debug(`从缓存 => ${target.name} ${thisArg.userinfo?.sno}`)
                return data.data;
            } else {
                if(args[args.length-1]){
                    logger.debug(`缓存不存在 => ${target.name}`)
                }

                const rv = target.bind(thisArg)(args[0], args[1], args[2], args[3], args[4], args[5])
                this.cache.set(hash, {time: getMTime() + thisArg.options.cacheTime, data: rv})
                return rv;
            }

        },
        withCache: (any: any) => {
            return new Proxy(any, this.cacheHandler);
        }
    };
    readonly eventList = this.cacheHandler.withCache(super.eventList);
    readonly eventInfo = this.cacheHandler.withCache(super.eventInfo);
    readonly collectEventList = this.cacheHandler.withCache(super.collectEventList);
    readonly eventUsers = this.cacheHandler.withCache(super.eventUsers);

    /*
    @Deprecated
     */
    readonly myCollectEventList = this.cacheHandler.withCache(super.myCollectEventList);

}

export function createClient(qrcodeToken: string): Promise<Client>;
export function createClient(username: StrNum,  school: string): Promise<Client>;
export function createClient(username: StrNum,  school: string,password: StrNum): Promise<Client>;

export async function createClient(username?: StrNum, school?: string, password?: StrNum, qrcodeToken?: string): Promise<Client> {
    const client: Client = new ClientImp();
   await callSchoolList();
    if (qrcodeToken) {
        return await client.login(qrcodeToken);
    } else {
        if(!password){
            logger.debug(`尝试使用本地缓存创建客户端 =>${username}`)
            return  await createClientByCache(username as string, schoolCache[school as string]);

        }else {
            try {
                logger.debug(`尝试使用本地缓存创建客户端 =>${username}`)
                return await createClientByCache(username as string, school as string);
            }catch (err){
                logger.debug(`本地缓存创建客户端失败 =>${username}`)
                return await client.login(username, password, school);
            }
        }

    }
}

/**
 * 从缓存中创建client
 * @param sno 学号
 * @param school 学校id
 * return client
 * return Promise.reject("不存在"||"认证失败")
 */
export async function createClientByCache(sno: StrNum, school: StrNum) {
    if (!Fs.existsSync(baseDir + "/userdata/" + `${sno}_${school}` + "/userinfo.json")) {
        return Promise.reject("认证失败")
    }
    const client: Client = new ClientImp();
    const cac = JSON.parse(Fs.readFileSync(baseDir + "/userdata/" + `${sno}_${school}` + "/userinfo.json").toString());
    // client.userinfo = cac.userinfo;
    client.oauth_token = cac.oauth_token;
    client.oauth_token_secret = cac.oauth_token_secret;
    client.userinfo=cac.userinfo;
    // client.school = cac.school;
    // client.userdataPath = baseDir + "/userdata/" + `${sno}_${school}`;
    try {
        await client.test();
        logger.debug(`本地缓存创建客户端成功 =>${sno}`)
        await client.updateInfo();
        return client;
    } catch (e) {
        return Promise.reject("认证失败")
    }

}


interface CacheData {
    time: number;
    data: any;
}

export interface DataResult<T> {
    status: boolean;
    data: T;
}

export function setBaseDir(path: string) {
    baseDir = process.cwd() + "/" + path;
}

export function getBaseDir() {
    return baseDir;
}