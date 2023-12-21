/*
        当一个或者多个活动可以报名时自动报名
 */
import {baseDir, createClient} from "../client";
import {markEvent} from "../common";
import * as log4js from "log4js";
log4js.configure({
    appenders: {
        console: {
            type: 'console',
            layout: {
                type: 'pattern',
                pattern: '[%d{DATETIME}][%p][%c]: %m',
            },
        },
        file: {
            type: 'file',
            filename: 'logs/app.log',
            layout: {
                type: 'pattern',
                pattern: '[%d{ISO8601}] [%p] %c - %m%n',
            },
        },
    },
    categories: {
        default: {appenders: ['console', 'file'], level: 'info'},
    },
});
(async function () {
    const config=await import(baseDir+"/clicker.json")
    // console.log(config)
    config.users.forEach((v:any)=>{
        createClient(v.username,v.school?v.school:config.global.school,v.password).then((client)=>{

            if(v.events){
                v.events.forEach((event:string|number)=>{
                    markEvent(client,event)
                })}
            if(config.global.events){
                config.global.events.forEach((event:string|number)=>{
                    markEvent(client,event)
                })
            }

        }).catch((e)=>{
            console.log("登录失败: 用户 "+v.username)
        })

    })
})()