import {ClientOption, Filter, GroupData, StrNum} from "./entity/entities";
import {EventInfo, SchoolEvent} from "./entity/event";
import {
    CancelEvent,
    EventDetail,
    EventList,
    EventUsers, FavEvent, GroupList,
    JoinEvent,
    Login,
    MSchoolInfo,
    MUserInfo,
    MyEventList, MyFavEvent, MyGroupList,
    Qrcode
} from "./internal";
import {getMTime} from "./utils";
import {MD5} from 'crypto-js';
import {getLogger} from "log4js";
import {EventUser, SchoolInfo, StudentInfo} from "./entity/user";
import * as Fs from "fs";
import {callSchoolList} from "./o/api";

const logger = getLogger("CLIENT");
export let baseDir = process.cwd() + "/pu-client";

Fs.mkdirSync(baseDir + "/userdata", {recursive: true})
Fs.mkdirSync(baseDir + "/cache", {recursive: true})
const default_info:StudentInfo={
    amount2: "",
    can_add_event: 0,
    class: "",
    credit: 0,
    cx: "",
    event_count: 0,
    face: "",
    group_count: 0,
    is_init: "",
    is_open_idcard: 0,
    is_youke: 0,
    jump_to_old: 0,
    major: "",
    realname: "",
    sid: "",
    sid1: "",
    sno: "",
    uid: 111,
    year: "",
    yx: ""

}
export declare class Client {
    processing: boolean;
    userinfo: StudentInfo;
    joinDelay: number;
    school: SchoolInfo | undefined;
    qrcodeToken: string | undefined;
    oauth_token: string | undefined;
    oauth_token_secret: string | undefined;
    options: ClientOption;
    cookie: string;
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




    //获取收藏的活动列表
    myFavEventList(cache?:boolean): Promise<DataResult<Array<SchoolEvent>>>;
    //获取活动详情
    eventInfo(eventId: StrNum,cache?:boolean): Promise<DataResult<EventInfo>>;
    //获取活动列表
    eventList(type?:"已结束"|"进行中"|"审核中"|"未开始"|"全部",keyword?: string,count?:number, page?: number,cache?:boolean): Promise<DataResult<Array<SchoolEvent>>>;
    /**
     获取活动用户列表
     * @param eventId 活动id
     * @param page 需要多少页的数据 默认获取全部的数据
     * @param cache
     */
    eventUsers(eventId:StrNum,page:number,cache?:boolean): Promise<DataResult<Array<EventUser>>>;

    //获取我的活动列表
    myEventList(type:"已结束"|"进行中"|"审核中"|"未开始"|"全部",page?:number,count?:number,filter?: Filter): Promise<DataResult<Array<SchoolEvent>>>;

    groupList( page?: number,cache?:boolean):Promise<DataResult<Array<GroupData>>>;
    myGroupList( page?: number,cache?:boolean):Promise<DataResult<Array<GroupData>>>;
    favEvent(eventId: StrNum,action:"fav"|"cancel"): Promise<DataResult<string>>;
    // groupEvent(assnId: StrNum,action:"fav"|"cancel"): Promise<DataResult<string>>;

    /**
     * 重新登录 仅仅适用于使用账号密码登录的
     */
     reLogin(): Promise<this> ;
}

export class ClientBase implements Client {
    joinDelay: number = -1;
    originLoginData: any;
    processing: boolean = false;
    userinfo: StudentInfo=default_info;
    qrcodeToken: string | undefined;
    oauth_token: string | undefined;
    oauth_token_secret: string | undefined;
    school: SchoolInfo | undefined;
    cookie: string=""
    options: ClientOption = {
        cacheTime: 1000 * 60 * 4,
        reLogin:false
    };
    userdataPath: string | undefined;
    _password: StrNum ="";
    _school: StrNum ="";

    async login(username?: StrNum, password?: StrNum, school?: string, qrcodeToken?: string): Promise<this> {
        if (this.processing) {
            return Promise.reject("正在登录中");
        }
        let rspData;
        this.processing = true
        if (password && username && school) {
            this._password=password;
            this._school=school;
            rspData = await Login(this, school, password, username).then((v) => {
                return v
            })
        } else {
            this.options.reLogin=false
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

    /**
     *
     * @param eventId
     * @return data 未加入该活动 ok
     */
    async cancelEvent(eventId: StrNum): Promise<DataResult<string>> {
        try {
            return await CancelEvent(this, eventId).then((data) => {

                if (data.msg.includes("用户不存在")) {
                    return {status: true, data: '未加入该活动'};
                }
                return {status: true, data: "ok"};

            })
        }catch (err){
            return {status: false, data: ""};

        }

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
            return Promise.reject(e)
        }
    }
    async favEvent(eventId: StrNum,action:"fav"|"cancel"): Promise<DataResult<string>> {
        try {
            return  await FavEvent(this, eventId, action).then((data) => {
                return {status: true, data: data.msg};
            })
        }catch (err){
            return {status: false, data: ''};

        }
    }
    async joinEvent(eventId: StrNum): Promise<DataResult<string>> {
        if (Date.now() < this.joinDelay) {
            return {status: false, data: "操作过于频繁，请稍候再试？"};
        }
        this.joinDelay = Date.now() + 1000 * 3;
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

    async eventList(type:"已结束"|"进行中"|"未开始"|"全部"="进行中",keyword: string="",count:number=40, page: number=-1,cache:boolean=true): Promise<DataResult<Array<SchoolEvent>>> {
        let rtv:SchoolEvent[]=[];
        const cyc=page === -1;
        let current=1;
      let failed=0;
      const status=this.smap[type]
            while(cyc||current<=page){
                try {
                    if(current>page&&!cyc){
                        break;
                    }
                rtv.push(...(await EventList(this,status,current,count,keyword)).content);
                current++;
                if(rtv.length%count!==0){
                    break;}
                }catch (err){

                    console.log(err)
                    if(failed>5){
                        console.warn(`获取活动列表失败[${failed}]`)
                        return {status: false, data: rtv};
                    }
                    failed++;
                }
            }

        return {status: true, data: rtv};


    }

    async eventInfo(eventId: StrNum,cache:boolean=true): Promise<DataResult<EventInfo>> {
        let rtv:any=[];
        try{
            rtv = (await EventDetail(this, eventId));
            return {status:true,data:rtv.content}

        }catch (err){
            return {status:false,data:rtv}
        }
    }
    async myFavEventList(cache:boolean=true): Promise<DataResult<Array<SchoolEvent>>> {
        let rtv:any=[];
        try{
             rtv = (await MyFavEvent(this,100000));
            return {status:true,data:rtv}

        }catch (err){
            return {status:false,data:rtv}
        }

    }

    readonly smap:any={
        // 2 进行中 1 未开始 0 全部 4 已完结  5 审核中

        进行中:2,
        未开始:1,
        全部:0,
        已完结:4,
        审核中:5,
        已结束:3
    }
    async myEventList(type:"已结束"|"进行中"|"审核中"|"未开始"|"全部", page:number=1, count:number=(this.userinfo.event_count*100<10?50:this.userinfo.event_count*100), filter?: Filter): Promise<DataResult<Array<SchoolEvent>>>{

        try{
            const status=this.smap[type]
            const rtv= await MyEventList(this,page,status,count);
            return {status:true,data:rtv}

        }catch (err){
            return Promise.reject(err)
        }

    }
    async eventUsers(eventId: StrNum, page: number=-1, cache?: boolean): Promise<DataResult<Array<EventUser>>> {
        const rtv=[];
        let count=page==-1?1000:page;
        let failed=1;
        for (let i = 1; i < count; i++) {
         try {
             const data = await EventUsers(this, eventId,i).then((data: any) => {
                 return data.content;
             })
             if(data.length==0){
                 break;
             }
             rtv.push(...data);

         }catch (err){
             if (failed>=5){
                 logger.warn(`获取活动用户列表失败[${failed}]`)
                 return {status: false, data: rtv};

             }
             failed++;
             i--;
         }
        }
        return {status: true, data: rtv};

    }
    async groupList(page = -1, cache = true): Promise<DataResult<Array<GroupData>>> {

        const promises: Promise<unknown>[] = [];
        let i=1;
        const data=await GroupList(this, i);
        const count = page == -1 ? data.content.totalPages : page;
        logger.debug("总页数:"+count);
        for ( i= 2; i <= count; i++) {
            promises.push(GroupList(this, i));
        }

  try {
      const results = await Promise.allSettled(promises);
      const rtv: GroupData[] = [];

      results.forEach((result) => {
          if (result.status === 'fulfilled') {
              const data = (result as PromiseFulfilledResult<any>).value;
              rtv.push(...data.content.data);

          }
      });
      return { status: true, data: rtv };

  }catch (err){
      return { status: false, data: [] };

  }
    }

    async myGroupList(page = -1, cache = true): Promise<DataResult<Array<GroupData>>> {
        const count = page === -1 ? 4 : page;
        const promises: Promise<unknown>[] = [];

        for (let i = 1; i <= count; i++) {
            promises.push(MyGroupList(this, i));
        }

    try {
        const results = await Promise.allSettled(promises);
        const rtv: GroupData[] = [];

        results.forEach((result) => {
            if (result.status === 'fulfilled') {
                const data = (result as PromiseFulfilledResult<any>).value;
                if (data.content&&data.content.length < 10) {
                    rtv.push(...data.content);
                }
            }
        });
        return { status: true, data: rtv };

    }catch (err){
        return { status: false, data: [] };

    }

    }
   async reLogin(): Promise<this> {

           return  await this.login(this.userinfo.sno,this._password,this._school+"");

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
    // readonly collectEventList = this.cacheHandler.withCache(super.collectEventList);
    readonly eventUsers = this.cacheHandler.withCache(super.eventUsers);
    readonly  groupList=this.cacheHandler.withCache(super.groupList);
    readonly  myGroupList=this.cacheHandler.withCache(super.myGroupList);



}

export function createClient(qrcodeToken: string): Promise<Client>;
export function createClient(username: StrNum,  school: string): Promise<Client>;
export function createClient(username: StrNum,  school: string,password: StrNum): Promise<Client>;

export async function createClient(username?: StrNum, school?: string, password?: StrNum, qrcodeToken?: string): Promise<Client> {
    const client: Client = new ClientImp();
    await callSchoolList();

                return await client.login(username, password, school);

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




