/*
        将一个人的活动转让给另一个人
 */

import {terminalClient} from "../index";
import * as Fs from "fs";
const {AutoComplete, prompt, Select, Input, Password} = require('enquirer');
const config=Fs.readFileSync(process.cwd()+"/config.json").toString();


const event = new Input({
    name: 'event',
    message: '输入活动id',
});
(async () => {
    console.log("将一个人的活动转让给另一个人 第一个为转让人 第二个为被转让人");
    const from=await terminalClient();
    const to=await terminalClient();
    if(to.userinfo?.sid===from.userinfo?.sid){
        console.log("不能自己转给自己!")
        process.exit(0)
    }

    const eventId=event.run();
    const fe=await from.eventInfo(eventId);
    const te=await from.eventInfo(eventId);
    let flag=false;
    if(fe.status){
        console.log(`活动名: ${fe.data.name}`);
        if(!fe.data.isJoin){
            console.log("转让人没有这个活动")

            flag=true;
        }
        if(te.data.isJoin){
            console.log("被转人已经有活动了")
            flag=false;
        }
    }
    if(flag){
        process.exit(0)
    }
    let ok:boolean=false;
    setInterval(()=>{
        to.eventInfo(eventId,false
        ).then((v)=>{
            if(v.status){
                ok=true;
                if(v.data.joinNum<v.data.limitNum){
                    to.joinEvent(eventId).catch().then(
                        (value)=>{
                            if(value.status){
                                console.log("转让成功")
                                process.exit()
                            }else {
                                console.log(value.data)
                            }

                        }
                    )
                }
            }
        }).catch(e=>{

        })
    },200)
    setInterval(()=>{
        if(ok){
         from.cancelEvent(eventId).catch();
        }
    })
})()