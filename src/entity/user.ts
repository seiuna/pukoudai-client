import {UserInfo} from "./entities";
import {Client} from "../client";

export class Student implements UserInfo {
    // 头像链接
    face: string;
    // 真实姓名
    realname: string;
    // 学号
    sno: string;
    // 学院
    yx: string;
    // 专业
    major: string;
    // 年级
    year: string;
    // 班级
    class: string;
    // 学分
    credit: number;
    // 诚信度百分比 xxx%
    cx: string;
    // 未知
    amount2: string;
    // 参与活动次数
    event_count: number;
    // 部落数量
    group_count: number;
    can_add_event: number;
    is_init: string;
    is_open_idcard: number;
    is_youke: number;
    jump_to_old: number;
    sid: string;
    sid1: string;
    uid: string | number;
    c: Client;

    constructor(data: UserInfo) {
        Object.assign(this, data);
    }

    async uploadFace(data: Buffer) {

    }

    /** 更新我的用户信息 */
    async update() {

    }

}

export interface SchoolInfo {
    // 学校名称
    school_name: string;
    // 学校标志
    school_logo: string;
    // 学分名称
    credit_name: string;
}


export class EventUser {
    c: Client;
    id: string;
    uid: string;
    eventId: string;
    realname: string;
    uface: string;
    checkStatus: number;
    isVip: number;
    tags: any[];
    /**
     @Description("1:管理员 2:签到员 3:普通成员")
     */
    userStatus: number;

    constructor(data: any) {
        Object.assign(this, data);
    }
}