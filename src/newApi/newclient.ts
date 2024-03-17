import {EventEmitter} from "node:events";
import {SchoolList} from "./internal";


export interface Client extends EventEmitter {
    store: any;
    cookie: string;

    login(option: { school: string, username: string, password: string }): Promise<this>;

}

export class NewClientImp extends EventEmitter implements Client {
    store: any;
    cookie: string;

    async login(option: { school: string; username: string; password: string; }): Promise<this> {
        return this;
    }
}

export class OldClientImp extends EventEmitter implements Client {
    store: any;
    cookie: string;

    async login(option: { school: string; username: string; password: string; }): Promise<this> {
        return this;
    }
}

export namespace common {
    const sl: any = [];

    /**
     * name => SchoolData
     * email => SchoolData
     * school => SchoolData
     */
    export async function Schools() {
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

    // export const CreatClient = async (option: { school: string, username: string, password: string }):Promise<Client> => {
    //     const v=(await Schools())[option.school];
    //     if(v){
    //         // if(v.is_go==="1"){
    //         //     return new NewClientImp().signIn(option);
    //         // }else {
    //         //     return new OldClientImp().signIn(option);
    //         // }
    //     }else {
    //         throw new Error("学校不存在")
    //     }
    // }

}