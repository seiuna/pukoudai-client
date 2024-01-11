import {Client} from "../client";
import {TimeInterval} from "../o/common";


export class Clientable {
    client?: Client;
}

export interface School {
    name: string;
    email: string;
    school: string;
    displayer_order: string
}

export type loginType = "qrcode" | "password" | "token" | "save";

export interface UserData {
    oauth_token: string;
    oauth_token_secret: string;
    low_password: number;
    jump_to: string;
    user_info: UserInfo;

}

export interface UserInfo {
    uid: string | number;
    sid: string;
    sid1: string;
    is_init: string;
    is_open_idcard: number;
    jump_to_old: number;
    is_youke: number;
    can_add_event: number;
}


export type StrNum = string | number;

export interface ClientOption {
    cacheTime: number,
    reLogin:boolean,
}

export type Filter = {
    // 活动名称
    name?: string,
    //
    time?: TimeInterval | Date,
    allow?: boolean,
    // 实践分>
    credit?: number,
    // 过滤方法
    func?: (event: Event) => boolean
}

/**
 * 不完整
 */
export interface GroupData {
    id: string;
    name: string;
    sid1: string;
    logo: string;
    membercount: string;
    vStern: string;
    cid0: string;
    activ_num: string;
    category: string;
    cname0: string;
    depart: string;
}

