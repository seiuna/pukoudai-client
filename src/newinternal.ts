// export async function gpsSignInAndOut(type, event_id, oauth_token, oauth_token_secret) {
//     const time = Math.floor(Date.now());
//     const signValue = gpsSigninAndOutSign(event_id, time);
//     try {
//         const response = await axios.post(
//             "https://pocketuni.net/index.php?app=api&mod=Event&act=" + type,
//             {
//                 event_id: event_id,
//                 oauth_token: oauth_token,
//                 oauth_token_secret: oauth_token_secret,
//                 sign: signValue,
//                 time: time,
//             },
//             {
//                 headers: {
//                     "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
//                 },
//             }
//         );
//         return response.data;
//
//     } catch (error) {
//         console.error(error)
//         throw error;
//     }
// }
import {Client} from "./client";
import {StrNum} from "./entity/entities";
import {CallAPI} from "./internal";

// export async function gpsSignInAndOut(client: Client, eventId: StrNum, type: string): Promise<any> {
//     return CallAPI(client, {
//         endpoint: "https://pocketuni.net/index.php?app=api&mod=Event&act="+type,
//         login: false,
//         formData: (function () {
//             const time = Math.floor(Date.now());
//             const formData = new FormData();
//             formData.append("event_id", eventId.toString());
//             formData.append("sign", gpsSigninAndOutSign(eventId, time));
//             formData.append("time", time.toString());
//
//             return formData;
//         })(),
//         processResponse: (data,response) => {
//             //设置回cookie 以防万一
//             const cookies = response.headers.get('Set-Cookie');
//             if (client && cookies) {
//                 client.authData.cookie = cookies;
//             }
//
//             return data;
//         },
//     });
// }
export async function check(client: Client, eventId: StrNum, type: string): Promise<any> {
    return CallAPI(client, {
        endpoint: "https://pocketuni.net/index.php?app=api&mod=User&act=checkUser",
        login: true,
        formData: (function () {
            const time = Math.floor(Date.now());
            const formData = new FormData();


            return formData;
        })(),
        processResponse: (data, response) => {


            return data;
        },
    });
}

// RequestParams token = PuApp.get().getToken();
// token.put("actiId", actiId);
// token.put("userId", userId);
// token.put("type", type);
// Client.post(this.mContext, "Event", "signOnline", token, this.handler);

export async function check1(client: Client, eventId: StrNum, userId: StrNum, type: 1 | 0): Promise<any> {
    return CallAPI(client, {
        endpoint: "https://pocketuni.net/index.php?app=api&mod=Event&act=signOnline",
        login: true,
        formData: (function () {
            const time = Math.floor(Date.now());
            const formData = new FormData();
            formData.append("actiId", eventId.toString());
            formData.append("userId", userId.toString());
            formData.append("type", type.toString());
            return formData;
        })(),
        processResponse: (data, response) => {
            return data;
        },
    });
}
