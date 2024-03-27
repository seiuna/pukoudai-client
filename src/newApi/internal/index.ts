import {Client} from "../newclient";

export * from "./account";


export const ROOT: string = "https://apis.pocketuni.net"

export async function CallAPI(client: Client | undefined, options: {
    endpoint: string,
    login: boolean,
    method?: string,
    data?: any,
    processResponse?: (data: any, response: Response) => any,
}): Promise<any> {
    try {
        const response = await fetch((options.endpoint.startsWith("https") ? "" : ROOT) + options.endpoint, {
            body: JSON.stringify(options.data),
            method: options.method ? options.method : "POST",
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36 Edg/121.0.0.0",
                "Content-type": "application/json",
                "Cookie": (() => {
                    return client ? client.cookie : "";
                })()
            }
        });

        let data = undefined;
        try {
            if (response.status === 401) {
                // client?.emit("auth-failed", client)
                return Promise.reject("认证失败")
            }
            data = await response.json();
            if (options.processResponse) {
                return options.processResponse(data, response);
            }
        } catch (err) {

            return Promise.reject("错误的返回")
        }
        return data;
    } catch (error) {

        return Promise.reject("API请求失败");
    }

}

export async function SchoolList(): Promise<any> {
    return CallAPI(undefined, {
        endpoint: "https://pocketuni.net/index.php?app=api&mod=Sitelist&act=getSchools",
        login: false,
        processResponse: (data: any) => {
            return data;
        },
    });

}

export const c = "msp-gzip";
export const d = "Msp-Param";
export const e = "Operation-Type";
export const f = "content-type";
export const g = "Version";
export const h = "AppId";
export const i = "des-mode";
export const j = "namespace";
export const k = "api_name";
export const l = "api_version";
export const m = "data";
export const n = "params";
export const o = "public_key";
export const p = "device";
export const q = "action";
export const r = "type";
export const s = "method";

export const AUTHOR = "author";
export const CREATE_AT = "create_at";
export const DISPLAY_NAME = "display_name";
export const DURATION = "duration";
export const FULL_IMAGE = "full_image";
export const HEIGHT = "height";
export const IMAGE = "image";
export const LINKS = "links";
export const OBJECT_TYPE = "object_type";
export const PROTOCOL_KEY_ACCESSTOKEN = "access_token";
export const PROTOCOL_KEY_AK = "ak";
export const PROTOCOL_KEY_ANDROID_ID = "android_id";
export const PROTOCOL_KEY_COMMENT_COUNT = "cm";
export const PROTOCOL_KEY_COMMENT_TEXT = "ct";
export const PROTOCOL_KEY_DATA = "data";
export const PROTOCOL_KEY_DE = "de";
export const PROTOCOL_KEY_DESCRIPTOR = "dc";
export const PROTOCOL_KEY_DT = "dt";
export const PROTOCOL_KEY_EN = "en";
export const PROTOCOL_KEY_ENTITY_KEY = "ek";
export const PROTOCOL_KEY_ENTITY_NAME = "name";
export const PROTOCOL_KEY_EXPIRE_IN = "expires_in";
export const PROTOCOL_KEY_EXPIRE_ON = "expire_on";
export const PROTOCOL_KEY_EXTEND = "ext";
export const PROTOCOL_KEY_FR = "fr";
export const PROTOCOL_KEY_FRIST_TIME = "ft";
export const PROTOCOL_KEY_FTYPE = "ftype";
export const PROTOCOL_KEY_FURL = "furl";
export const PROTOCOL_KEY_IMAGE = "pic";
export const PROTOCOL_KEY_IMEI = "imei";
export const PROTOCOL_KEY_LIKE_COUNT = "lk";
export const PROTOCOL_KEY_MAC = "mac";
export const PROTOCOL_KEY_MD5IMEI = "md5imei";
export const PROTOCOL_KEY_MSG = "msg";
export const PROTOCOL_KEY_NEW_INSTALL = "ni";
export const PROTOCOL_KEY_OPENID = "openid";
export const PROTOCOL_KEY_OPID = "opid";
export const PROTOCOL_KEY_OS = "os";
export const PROTOCOL_KEY_OS_VERSION = "os_version";
export const PROTOCOL_KEY_PLATFORM_ERROR = "platform_error";
export const PROTOCOL_KEY_PV = "pv";
export const PROTOCOL_KEY_REQUEST_TYPE = "tp";
export const PROTOCOL_KEY_SHARE_NUM = "sn";
export const PROTOCOL_KEY_SHARE_SNS = "sns";
export const PROTOCOL_KEY_SHARE_TO = "to";
export const PROTOCOL_KEY_SHARE_USID = "usid";
export const PROTOCOL_KEY_SID = "sid";
export const PROTOCOL_KEY_SN = "sn";
export const PROTOCOL_KEY_ST = "st";
export const PROTOCOL_KEY_TENCENT = "tencent";
export const PROTOCOL_KEY_THUMB = "thumb";
export const PROTOCOL_KEY_TITLE = "title";
export const PROTOCOL_KEY_TO = "to";
export const PROTOCOL_KEY_UID = "uid";
export const PROTOCOL_KEY_URL = "url";
export const PROTOCOL_KEY_USECOCOS = "use_coco2dx";
export const PROTOCOL_KEY_VERIFY_MEDIA = "via";
export const PROTOCOL_KEY_VERSION = "sdkv";
export const PROTOCOL_SHARE_TYPE = "type";
export const PROTOCOL_VERSION = "pcv";
export const SUMMARY = "summary";
export const TAGS = "tags";
export const URL = "url";
export const WIDTH = "width";

