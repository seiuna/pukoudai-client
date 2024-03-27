import {createClient} from "../client";
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

(async () => {
    try {
        // const client=await createClientByQrcode((await Qrcode()).token)
        const client = await createClient(234012318, "@njci.com", "wsk2586+");
        // console.log(client.authData.oauth_token)
        // console.log(client.authData.oauth_token_secret)
        // console.log(client.userinfo)
        console.log()
        for await (const group of client.myGroupList()) {
            console.log(group)
        }
        // console.log(client.userinfo)
        // console.log(client.schoolinfo)
        // console.log()
        // const group=await Group.catch.bind(client)("100");
        // console.log(group)
        // console.log(group.join())
        // console.log("====================================")
        // // for await(const group of  client.groupList()){
        // //     group.forEach((e)=>{
        // //         console.log(e.name)
        // //     })
        // // }
        // console.log("====================================")
        // for await(const event of  client.eventList("未开始")){
        //     event.forEach((e)=>{
        //         console.log(e.title)
        //     })
        // }
        // console.log("====================================")
        for await(const event of client.myEventList("全部")) {
            event.forEach(async (e) => {
                const ee = (await client.getEvent(e.id));

                console.log(e.title, e.id)
            })
        }
        // console.log(client.authData.uid)
        // console.log(await  SignInAndOut(undefined,"3123","321312",1) )
        // console.log("====================================")
        // for await(const event of  client.myFavEventList()){
        //     event.forEach((e)=>{
        //         console.log(e.title)
        //     })
        // }
        // console.log("====================================")
        // console.log(await   client.signEvent("5718093",client.authData.uid,2) );
        // console.log(await    gpsSignInAndOut(client,"5705836","signOut") )        // console.log("====================================")
        // console.log(await    check1(client,"5704930","20871749",1) )        // console.log("====================================")
        const type = 1;
        const id = "";

        console.log(await client.signEvent("5775906", "20871749", type))       // console.log("=========17===========================")
        console.log(await client.signEvent("5771777", "20871755", type))       // console.log("=========17===========================")
        console.log(await client.signEvent("5771777", "20871905", type))        // console.log("====================================")
        console.log(await client.signEvent("5771777", "20871751", type))        // console.log("====================================")
        console.log(await client.signEvent("5771777", "20871752 ", type))        // console.log("====================================")
        // console.log(await    client.signEvent("5748675","20379336 ",1) )        // console.log("====================================")
        console.log(await client.signEvent("5771777", "20871754", type))        // console.log("====================================")
        console.log(await client.signEvent("5771777", "20873562", type))        // console.log("====================================")
        console.log(await client.signEvent("5771777", "20871775", type))        // console.log("====================================")
        console.log(await client.signEvent("5771777", "20871773", type))        // console.log("====================================")
        console.log(await client.signEvent("5771777", "20871748", type))        // console.log("====================================")


        console.log(await client.signEvent("5771777", "20871776", type))        // console.log("====================================")
        console.log(await client.signEvent("5771777", "20871764", type))        // console.log("====================================")
        // console.log(await    client.signEvent("5738086",client.authData.uid,2) )        // console.log("====================================")
        // console.log(await    client.signEvent("5738086",client.authData.uid,2) )        // console.log("====================================")
        // console.log(await    client.signEvent("5757359",client.authData.uid,1) )        // console.log("====================================")
        // console.log(await    client.signEvent("5760089","20871756",1) )        // console.log("====================================")
        // console.log(await    client.signEvent("5759761",client.authData.uid,1) )        // console.log("====================================")
        for await(const event of (await client.getEvent("5760089")).getMemberList()) {
            event.forEach((e) => {
                console.log(e.realname, e.uid)
            })
        }
        // })
        // }
        // for await (const a of client.eventUsers(5701281)){
        //     a.forEach((e)=>{
        //         console.log(e.uid+"   "+e.realname)
        //     })
        // }
    } catch (e) {
        console.log(e)
    }
})()


// import {h} from "../newApi/sign";
//
// console.log(h("QVlcRFxQRV9SRF9SQFpS","sid"))
