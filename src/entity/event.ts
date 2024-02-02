import * as lodash from "lodash";
import {
    CancelEvent,
    EventDetail,
    EventList,
    EventUsers,
    FavEvent,
    GroupEvent,
    JoinEvent,
    MyEventList,
    MyFavEvent
} from "../internal";
import {Client, default_Option, Option, statusMap} from "../client";
import {StrNum} from "./entities";
import {EventUser} from "./user";

export class Event {
    c: Client;


    id: string;
    title: string;
    hit: string;
    typeId: string;

    credit_old: number = 0;
    coverId: string;
    sTime: string;
    eTime: number = 0;
    joinCount: number = 0;
    limitCount: number = 0;
    note: string;
    is_prov_event: string;
    address: string;
    description: string;
    //活动可报名时间
    startline: string;
    deadline: string;

    school_audit: string;

    cover: string;
    friendCount: number = 0;
    isTop: string;
    cName: string;
    isCredit: string;
    credit_num: number | string;
    credit_name: string;

    area: number = 0;
    isAllowEvent: number;


    /** 通用属性 */
    is_need_sign_out: string;
    is_school_event: string;
    credit: string;
    score: string;
    //0 已结束 1 未开始
    status: number = 0;
    free_attend: string;
    pu_amount: string;
    school_venue: string;
    tags: string[];
    eventStatus: {
        title: string;
        status: number;
        desc: string;
    }[];
    allow: number;
    is_outside: string;
    typeId2: string;
    category: {
        categoryId: string;
        name: string;
    };


    createrId: string;
    actiId: string;
    name: string;
    actiIcon: string;
    sid: string;
    actiPoster: string;
    startTime: number;
    endTime: number;

    cost: string;
    location: string;
    joinNum: number;
    leftNum: number;
    descs: string;
    uid: string;
    needTel: string;
    gid: string;

    regStartTimeStr: number;
    //报名结束时间
    regEndTimeStr: number;
    // 1 报名需要审核  2 不需要审核  审核为自动判断
    allow_school: string[];
    allow_year: string[];
    allow_user_type: string;
    allow_group: string[];
    allow_area: string[];

    isTicket: string;
    cTime: string;
    is_gps_sign: string;
    levelId: string;
    audit_uid: string;

    hours: string;
    player_upload: string;
    work_upload: string;
    show_hours: string;
    approval: string;
    notRegSignIn: string;
    createrName: string;
    category_title: string;

    type2_name: string;
    xm_id: string;
    xm_name: string;
    descsUrl: string;
    type: number;
    thinAssn: any;
    isExpire: number;
    collectFlag: number;
    permission: number;
    isJoin: number;
    actiNotice: any;
    isVote: string;
    checkoutFlag: number;
    signTips: string;
    regStatus: number;
    creditName: string;

    contact_user: string;
    contact_user_phone: string;
    level_name: string;
    seriesName: string;
    event_user_status: {
        title: string;
        status: number;
        desc: string;
    }[];
    isAllow: number;
    allow_school_objs: {
        id: string;
        pid: string;
        display_order: string;
        title: string;
        cityId: string;
        domain: string;
        tj_year: string;
        sort: string;
        level: string;
    }[];
    allow_group_obj: any[];
    allow_area_obj: any[];
    limitNum: number;
    audit_user: string;
    orga_name: string;
    sign_in_start_time: string;
    sign_out_start_time: string;
    sign_out_status: any;
    sign_in_status: any;
    sign_in_num: string;
    sign_out_num: number;
    schoolArea: string[];
    is_evaluate: number;
    //没用的东西
    button_status: {
        join_button: string;
        join_status: string;
        player_button: string;
    };
    current_time: number;
    input_list: any[];
    show_event_photo_button: string;

    constructor(data: any) {
        lodash.assign(this, data);
        if (!this.title) {
            // this.name = withMapper(() => this.title)
        }
    }

    static async catch(this: Client, sessid: string, option: Option = default_Option): Promise<Event> {
        if (option.cache) {
            const event = this.getCache<Event>("eventv1", sessid);
            if (event) {
                return event;
            }
        }
        return EventDetail(this.authData, sessid).then((data) => {
            let event = new Event(data.content);
            event.c = this;
            if (option.cache) {
                this.setCache("eventv1", sessid, event);
            }
            return event;
        })
    }

    static async joinEvent(this: Client, eventId: StrNum) {
        if (Date.now() < this.store.joinDelay) {
            return {status: false, data: "操作频繁"};
        }
        this.store.joinDelay = Date.now() + 1000 * 3;
        return await JoinEvent(this.authData, eventId).then((data) => {

            if (data.msg.includes("记得准时签到哦~")) {
                return {status: true, data: "报名成功"};
            }
            if (data.msg.includes("报名时间已结束，无法报名哦~")) {
                return {status: false, data: "报名时间已结束"};
            }
            if (data.msg.includes("操作过于频繁，请稍候再试")) {
                return {status: false, data: "操作频繁"};
            }
            if (data.msg.includes("请求错误")) {
                return {status: false, data: "请求错误"};
            }
            if (data.msg.includes("活动不存在或已删除")) {
                return {status: false, data: "活动不存在或已删除"};
            }
            if (data.msg.includes("无需报名活动")) {
                return {status: true, data: "无需报名活动"};
            }
            return {status: false, data: "未知错误"};
        })
    }

    static async cancelEvent(this: Client, eventId: StrNum) {
        return await CancelEvent(this.authData, eventId).then((data) => {
            if (data.msg.includes("用户不存在")) {
                return {status: false, data: '未加入该活动'};
            }
            return {status: true, data: "ok"};
        })
    }

    static async* eventList(this: Client, type: "已结束" | "进行中" | "未开始" | "全部" = "进行中", page = -1, keyword: string = "", count: number = 20): AsyncGenerator<Array<Event>> {
        const status = statusMap[type];
        let current = 1;
        while (current <= page || page == -1) {

            const v = (await EventList(this.authData, status, current, count, keyword)).content.map((e: any) => {
                const event = new Event(e)
                event.c = this;
                return event;
            });
            yield v;
            if (v.length < count || v.length == 0) break;
            current++;
        }
    }

    static async* myEventList(this: Client, type: "已结束" | "进行中" | "审核中" | "未开始" | "全部", page: number = -1, count: number = 10) {
        const status = statusMap[type];
        let current = 1;
        while (current <= page || page == -1) {
            const v = (await MyEventList(this.authData, current, status, count)).map((e: any) => {
                const aa = new Event(e)
                aa.c = this;
                return aa;
            });
            yield v;
            if (v.length < count || v.length == 0) break;
            current++;
        }

    }

    static async* myFavEventList(this: Client, page = -1, count: number = 10, option: Option | undefined): AsyncGenerator<Array<Event>> {
        let current = 1;
        while (current <= page || page == -1) {
            const v = (await MyFavEvent(this.authData, count, current)).map((e: any) => {
                const event = new Event(e)
                event.c = this;
                return event;
            });
            yield v;
            if (v.length < count || v.length == 0) break;
            current++;
        }
    }

    static async* groupEventList(this: Client, sessid: number, page = -1, count: number = 10, option: Option | undefined): AsyncGenerator<Array<Event>> {
        let current = 1;
        while (current <= page || page == -1) {
            const v = (await GroupEvent(this.authData, sessid, current)).content.map((e: any) => {
                const event = new Event(e)
                event.c = this;
                return event;
            });
            yield v;
            if (v.length < count || v.length == 0) break;
            current++;
        }
    }

    static async favEvent(this: Client, eventId: StrNum, action: "add" | "cancel") {
        return await FavEvent(this.authData, eventId, action);
    }

    static async* eventUsers(this: Client, eventId: StrNum): AsyncGenerator<Array<EventUser>> {

        let current = 1;
        while (true) {
            const data = (await EventUsers(this.authData, eventId, current)).content.map((e: any) => {
                const user = new EventUser(e)
                user.c = this;
                return user;
            });
            yield data;
            if (data.length == 0 || data.length < 10) {
                break;
            }

            current++;
        }

    }

    async join() {
        return this.c.joinEvent(this.id)
    }

    async cancel() {
        return this.c.cancelEvent(this.id)
    }

    /** 获取完整的活动信息 */
    async update() {
        lodash.assign(this, await this.c.getEvent(this.id, {cache: false}))
    }

    /** 获取活动的用户信息 */
    getMemberList() {
        return this.c.eventUsers(this.id);
    }

    async fav(action: "add" | "cancel") {
        return await this.c.favEvent(this.id, action);
    }

}
