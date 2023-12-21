import {callSchoolList, schoolCache} from "../o/api";
import {Client, ClientImp} from "../client";
const {AutoComplete, prompt, Select, Input, Password} = require('enquirer');
import * as ncp from "copy-paste";
(async function (){


    await callSchoolList()
    const schoolIn = new AutoComplete({
        name: 'school',
        message: '选择你的学校',
        limit: 10,
        initial: 2,
        choices: Object.keys(schoolCache)
    });
   const scho = schoolCache[await schoolIn.run()]
    ncp.copy(scho , function () {
        console.log(scho)
        console.log("已复制到系统剪切板中。")
    });
})()

