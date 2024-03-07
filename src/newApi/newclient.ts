import {EventEmitter} from "node:events";
import {SchoolList} from "./internal";

namespace newClient {
    export interface NewClient extends EventEmitter {
        store: any;

        signIn(option: { school: string, username: string, password: string }): Promise<this>;


    }

    export class NewClientImp extends EventEmitter implements NewClient {
        store: any;

        async signIn(option: { school: string; username: string; password: string; }): Promise<this> {
            return this;
        }
    }

}

namespace common {
    const sl: any = [];

    /**
     * name => SchoolData
     * email => SchoolData
     * school => SchoolData
     */
    export async function schoolList() {
        if (sl.length > 0) {
            return sl;
        }
        const sll = await SchoolList();
        sll.forEach((v: any) => {
            sl[v.name] = v;
            sl[v.email] = v;
            sl[v.school] = v;
        })
    }


}