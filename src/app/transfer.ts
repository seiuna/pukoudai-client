/*
        将一个人的活动转让给另一个人
 */

import {terminalClient} from "../index";
const {AutoComplete, prompt, Select, Input, Password} = require('enquirer');

const event = new Input({
    name: 'event',
    message: '输入活动id',
});
(async () => {
   const from=await terminalClient();
   const to=await terminalClient();
   if(to.userinfo?.sid===from.userinfo?.sid){
         console.log("不能自己转给自己")
         return;
   }

   const eventId=event.run();
   const fe=await from.eventInfo(eventId);
   const te=await from.eventInfo(eventId);
   let flag=false;
   if(fe.status){
       if(!fe.data.isJoin){
           console.log("转让人没有这个活动捏")

          flag=true;
       }
       if(te.data.isJoin){
           console.log("被转人已经有活动了捏")
           flag=false;
       }
   }
})()