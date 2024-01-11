import {Client, default_Option, Option} from "../client";
import {GroupDetail, GroupList, MyGroupList} from "../internal";
import * as lodash from "lodash";

export class Group {
    c: Client;

    /** 通用属性 */
    id: string;
    /** 仅获取列表时可用 */
    sid1: string;
    /** 仅获取列表时可用 */
    cid0: string;
    /** 仅获取列表时可用 */
    category: string;
    /** 仅获取列表时可用 */
    cname0: string;
    /** 仅获取列表时可用 */
    depart: string;
    /** 仅获取列表时可用 */
    tags: Array<{
        tag_id: string;
        tag_name: string;
    }>
    /** 通用数据 */
    name: string;
    /** 通用数据 */
    logo: string;
    /** 通用数据 */
    vStern: string;
    /** 通用数据 */
    activ_num: string;
    /** 通用数据 */
    membercount: string;


    /** 仅详情可用 */
    intro: string;
    /** 仅详情可用 */
    constitution: string;
    /** 仅详情可用 */
    can_add_pic: boolean;
    /** 仅详情可用 */
    show_new_media: boolean;
    /** 仅详情可用 */
    show_teacher: boolean;
    /** 仅详情可用 */
    quit_type: number;
    /** 仅详情可用 */
    button: string[];
    /** 仅详情可用 */
    other: {
        title: string;
        value: string;
    }[];
    /** 仅详情可用 */
    teacher_list: {
        show_button: string;
        list: any[]; // 未提供具体数据类型，可以根据实际情况修改
    };

    constructor(data: any) {
        lodash.assign(this, data);
    }

    /**
     * 获取一个部落实例
     * @param sessid 部落id
     * @param option 选项
     */
    static async catch(this: Client, sessid: string, option: Option = default_Option): Promise<Group> {
        if (option.cache) {
            const group = this.getCache<Group>("groupv1", sessid);
            if (group) {
                return group;
            }
        }
        return GroupDetail(this.authData, sessid).then((data) => {
            let group = new Group(data.content);

            if (option.cache) {
                this.setCache("groupv1", sessid, group);
            }
            return group;
        })
    }

    static async* groupList(this: Client, page: number = -1) {
        let i = 1;
        const data = (await GroupList(this.authData, i));

        yield data.content.data.map((item: any) => {
            const v = new Group(item);
            v.c = this;
            return v;
        });
        const count = page == -1 ? data.content.totalPages : page;
        for (i = 2; i <= count; i++) {
            yield (await GroupList(this.authData, i)).content.data.map((item: any) => {
                const v = new Group(item);
                v.c = this;
                return v;
            });
        }
    }

    static async* myGroupList(this: Client, page: number = -1) {
        let current = 1;
        while (current <= page || page == -1) {
            const v = (await MyGroupList(this.authData, current)).content.map((e: any) => {
                const g = new Group(e)
                g.c = this;
                return g;
            });
            yield v;
            if (v.length < 10 || v.length == 0) break;
            current++;
        }
    }

    static async joinGroup(this: Client, sessid: string) {
        return "未实现"
    }

    static async leaveGroup(this: Client, sessid: string) {
        return "未实现"
    }

    /**
     * 加入部落
     */
    async join() {
        console.log("未实现")

    }

    async leave() {
        console.log("未实现")
    }

    /** 获取完整的部落信息 */
    async update() {
        lodash.assign(this, await this.c.getGroup(this.id, {cache: false}))
    }

}
