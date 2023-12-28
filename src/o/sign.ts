import {MD5} from 'crypto-js';

const keys = "s25ycjfxcehwzs60yookgq8fx1es05af"

//签名算法 逆天混淆
export const sign = (uid: string | number, eventId: string | number,time:number=(Math.floor(Date.now() / 1000))): string => {
    const text = `${uid}${eventId}${time}${keys}`;
    const hashedData = MD5(text).toString().toLowerCase();
    return hashedData;
};
