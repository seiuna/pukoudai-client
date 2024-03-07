```js
import {ao as i} from "./index-c0UMv7FU.js";

function s(t) {
    return i({
        url: "/apis/user/pc-info",
        method: "post",
        data: t
    })
}

function o(t) {
    return i({
        url: "/apis/activity/myList",
        method: "post",
        data: t
    })
}

function r(t) {
    return i({
        url: "/apis/myManageEvent/list",
        method: "post",
        data: t
    })
}

function n(t) {
    return i({
        url: "/apis/tribe/myList",
        method: "post",
        data: t
    })
}

function u(t) {
    return i({
        url: "/apis/msg/list",
        method: "post",
        data: t
    })
}

function p(t) {
    return i({
        url: "/apis/home/icon",
        method: "get",
        params: t
    })
}

import {ao as o} from "./index-c0UMv7FU.js";

const e = "/apis/activity";

function n(t) {
    return o({
        url: `${e}/list`,
        method: "post",
        data: t
    })
}

function i(t) {
    return o({
        url: `${e}/info`,
        method: "post",
        data: t
    })
}

function u(t) {
    return o({
        url: `${e}/news/list`,
        method: "post",
        data: t
    })
}

function s(t) {
    return o({
        url: `${e}/vote/player/list`,
        method: "post",
        data: t
    })
}

function a(t) {
    return o({
        url: `${e}/member`,
        method: "post",
        data: t
    })
}

function p(t) {
    return o({
        url: `${e}/evaluate/list`,
        method: "post",
        data: t
    })
}

function l(t) {
    return o({
        url: `${e}/join`,
        method: "post",
        data: t
    })
}

function m(t) {
    return o({
        url: `${e}/cancel`,
        method: "post",
        data: t
    })
}

function c(t) {
    return o({
        url: `${e}/vote/form/${t}`,
        method: "get"
    })
}

function f(t) {
    return o({
        url: `${e}/vote/player/add`,
        method: "post",
        data: t
    })
}

function d(t) {
    return o({
        url: `${e}/evaluate/add`,
        method: "post",
        data: t
    })
}

function v(t) {
    return o({
        url: `${e}/vote/player/info`,
        method: "post",
        data: t
    })
}

function $(t) {
    return o({
        url: `${e}/vote`,
        method: "post",
        data: t
    })
}

import {ao as o} from "./index-c0UMv7FU.js";

function u() {
    return o({
        url: "/uc/school/list",
        method: "get"
    })
}

function e(t) {
    return o({
        url: "/uc/user/login",
        method: "post",
        data: t
    })
}

function n(t) {
    return o({
        url: "/uc/user/exit",
        method: "get",
        data: t
    })
}

function i(t) {
    return o({
        url: "/uc/user/qrcode",
        method: "get",
        params: t
    })
}

function s(t) {
    return o({
        url: "/uc/user/qrnotify",
        method: "get",
        params: t
    })
}


```