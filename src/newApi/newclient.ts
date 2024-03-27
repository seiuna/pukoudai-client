import {EventEmitter} from "node:events";
import {Login, SchoolList} from "./internal";


export interface Client {
    store: any;
    cookie: string;

    login(): Promise<this>;

}

class NewClientImp extends EventEmitter implements Client {

    store: any;
    cookie: string;

    // // parameterized constructors
    constructor(qrcode: string);
    constructor(sid: string, username: string, password: string);
    constructor(a?: string, b?: string, c?: string) {
        super();
        if (b && c) {
            this.store = {
                sid: a,
                username: b,
                password: c,
                type: "password"
            }
        } else {
            this.store = {
                qrcode: a,
                type: "qrcode"
            }
        }
    }

    async login(): Promise<this> {
        if (this.store.type === "qrcode") {

        } else {
            const data = await Login(this.store.username, this.store.password, this.store.sid, "pc");
            console.log(data)
            return data;
        }
        return this;
    }
}


export namespace school {
    const sl: any = [];

    /**
     * name => SchoolData
     * email => SchoolData
     * school => SchoolData
     */
    export async function list() {
        if (sl.length > 0) {
            return sl;
        }
        const sll = await SchoolList();
        sll.forEach((v: any) => {
            sl[v.name] = v;
            sl[v.email] = v;
            sl[v.school] = v;

        })
        return sl;
    }

    export async function isUseNewApi(nameIdEmail: string) {
        const list = await school.list();
        return list[nameIdEmail].is_go === "1";

    }


}
// (await SchoolList())[school],username,password



export async function newClient(username: string | number, password: string | number, sch: string) {
    const sid = (await school.list())[sch].go_id;
    if (sid) {
        const client: Client = new NewClientImp(sid, username.toString(), password.toString());
        return await client.login();
    } else {
        return Promise.reject("学校不存在")
    }

}
