// 可以用于 学校id的转换 例如 QVlcRFxQRV9SRF9SQFpS => 208754666766336  s=sid
export function h(i: string, s: string = "") {
    try {
        const t = atob(i);
        let r = "";
        for (let e = 0; e < t.length; e++) {
            const o = t.charCodeAt(e) ^ s.charCodeAt(e % s.length);
            r += String.fromCharCode(o)
        }
        return r
    } catch {
    }
}

// {
//     "name": "山东科技大学",
//     "email": "@sdust.com",
//     "school": "3330",
//     "display_order": "SDKJDX",
//     "cas_url": "",
//     "is_go": "1",  // 为 1 表示使用了新的api
//     "go_id": "208754666766336"   // 用于登录
// }