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
    uname: string;                 // 用户名
    sign: string;                  // 个性签名或描述
    mobile: string;                // 手机号码
    sex: string;                   // 性别
    event_level_label: string;     // 用户活动等级标签
    user_type: string;             // 用户类型
    student_id: string;            // 学生ID
    modify_sex: string;            // 修改性别状态
    school: string;                // 学校名称
    college: string;               // 学院名称
    city: string;                  // 城市
    city_code: string;             // 城市代码
    is_test: string;               // 测试状态
    following_count: string;       // 关注的用户数
    follower_count: string;        // 粉丝数
    year_system: string;           // 学年制度
    outlook: string;               // 外貌或形象
    native_place: any;     // 籍贯信息
    idcard_no: string;             // 身份证号码
    idcard_type_label: string;     // 身份证类型标签
    privacy_policy: string;        // 隐私政策
    is_use_tag: string;            // 使用标签状态
    is_notify: string;             // 通知状态
    is_security_question: string;  // 安全问题状态
    is_verified: string;           // 认证状态
    verified: Record<string, any>; // 认证信息
    revoke: string;                // 撤销状态
    check_grad: string;            // 检查毕业状态
    is_bind: string;               // 绑定状态
    is_bind_socialite: string;     // 绑定社交账号状态
    verify: string;                // 验证状态
    school_suffix: string;         // 学校后缀
    is_open_poi: string;           // 开放POI状态
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