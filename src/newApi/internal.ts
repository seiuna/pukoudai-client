// 登录 https://apis.pocketuni.net/uc/user/login  POST JSON
// {userName: "123", password: "312321312", sid: 208754666766336, device: "pc"}
// {"code":100001,"message":"登录失败，用户名或者密码错误","data":{}} 登陆失败
// {
//     "code": 0,
//     "message": "成功",
//     "data": {
//         "token": "280",
//         "sid": 208754666766336,
//         "deadline": 1803107591,
//         "baseUserInfo": {
//             "id": 2087
//             "sid": 208754666766336,
//             "roleID": 18,
//             "roleAliasID": 1801,
//             "degree": 0,
//             "bid": 0,0823,
//             "oid": 0,
//             "username": "2",
//             "realname": "",
//             "nickname": "4",
//             "gender": 1,
//             "cardtype": 0,
//             "cardno": "",
//             "_": "f7caaa19f3",
//             "yid": 18766,
//             "mid": 201,
//             "classID": 262,
//             "nYear": 4,
//             "mobile": "13",
//             "politicalID": 0,
//             "job": "",
//             "hobby": "",
//             "category": 0,
//             "createdAt": "2020-09-11 21:34:35",
//             "updatedAt": "2024-03-02 01:28:00",
//             "className": "-2",
//             "major": "信",
//             "collegeName": "计",
//             "year": "20",
//             "classInfos": null,
//             "avatar": {
//                 "id": ,
//                 "url": "https://img25",
//                 "name": ""
//             },
//             "creditName": "兑换学时",
//             "politicalName": "",
//             "hasChangedGender": 0,
//             "roleType": 4
//         },
//         "oldUserInfo": {
//             "oauth_token": "5",
//             "oauth_token_secret": "138a",
//             "low_password": "0",
//             "jump_to": "",
//             "user_info": {
//                 "uid": "",
//                 "sid": "",
//                 "sid1": "",
//                 "is_init": "1",
//                 "realname": "",
//                 "is_open_idcard": "0",
//                 "jump_to_old": "0",
//                 "is_youke": "0",
//                 "can_add_event": "0"
//             }
//         }
//     }
// }
// Bearer 2801d14300163e01047b:208754666766336   token:学校id


// 活动列表 https://apis.pocketuni.net/apis/activity/list POST JSON
// {sort: 0, page: 1, limit: 10}
//{
//     "code": 0,
//     "message": "成功",
//     "data": {
//         "pageInfo": {
//             "count": 507,
//             "total": 51,
//             "page": 1,
//             "limit": 10
//         },
//         "list": [
//             {
//                 "id": 208,
//                 "name": "【读书协会】“科技创新周”读书角",
//                 "logo": "httpsxscx.png",
//                 "credit": 2,
//                 "puAmount": 0,
//                 "allowUserCount": 100,
//                 "startTime": "2024-04-01 19:30:00",
//                 "startTimeValue": "报名未开始",
//                 "endTime": "2024-04-07 21:00:00",
//                 "statusName": "未开始",
//                 "allowJoinCount": 0,
//                 "joinType": 2,
//                 "joinStartTime": "2024-04-01 00:00:00",
//                 "work_upload": 0,
//                 "signType": 1
//             }
//         ]
//     }
// }

// 活动详情 https://apis.pocketuni.net/apis/activity/info POST JSON
// {id: 209737782263808}
// {
//     "code": 0,
//     "message": "成功",
//     "data": {
//         "baseInfo": {
//             "name": "【读书协会】“科技创新周”读书角",
//             "logo": "https://img.pocketuni.net//lzlg/sys_pic/activity_xscx.png",
//             "statusName": "未开始",
//             "categoryId": 208776145732453,
//             "categoryName": "学术科技与创新创业",
//             "subCategoryId": 0,
//             "levelId": 0,
//             "levelName": "",
//             "credit": 2,
//             "puAmount": 0,
//             "joinStartTime": "2024-04-01 00:00:00",
//             "joinEndTime": "2024-04-07 21:00:00",
//             "startTime": "2024-04-01 19:30:00",
//             "endTime": "2024-04-07 21:00:00",
//             "address": "图书馆211",
//             "allowUserCount": 100,
//             "joinUserCount": 1,
//             "signInUserCount": 1,
//             "signOutUserCount": 1,
//             "description": "生活质量的提高让我们对科技有了无限的遐想，我们可以在知识的海洋中领略科技的魅力，用智慧引领生活，在阅读中启发创造力、想象力，提高创新能力。读书角给同学提供一个良好的读书环境，让同学们能够在阅读我们细心选定的书籍中获得一些创新的思维。现场签到签退，由于场地原因每晚十个名额，参加活动加群864058117，联系人时慧，联系电话16627882526",
//             "joinType": 2,
//             "signType": 1,
//             "signPlace": "",
//             "signLong": "",
//             "signLat": "",
//             "signRadius": 0,
//             "needSignOut": 1,
//             "allowUserType": 1,
//             "allowCollege": [],
//             "allowYear": [],
//             "allowTribe": [],
//             "contact": "时慧",
//             "contactPhone": "***********",
//             "tags": null,
//             "signStartTime": "2024-04-01 18:30:00",
//             "signOutStartTime": "2024-04-07 20:30:00",
//             "workUpload": 0,
//             "canVote": 0
//         },
//         "userStatus": {
//             "hasJoin": 0,
//             "hasSignIn": 0,
//             "hasSignOut": 0,
//             "hasFinish": 0
//         },
//         "evaluateInfo": {
//             "averageStar": 0,
//             "praise": ""
//         },
//         "buttonInfo": [
//             {
//                 "name": "收藏",
//                 "event": "collect"
//             },
//             {
//                 "name": "报名未开始",
//                 "event": ""
//             }
//         ],
//         "joinInfo": {
//             "name": "我要参赛",
//             "event": "join"
//         },
//         "newsInfo": {
//             "id": 0,
//             "title": "",
//             "content": "",
//             "createdAt": ""
//         },
//         "voteConfig": {
//             "status": 1,
//             "allowMultiVotes": 1,
//             "playerCanVote": 1,
//             "voteLimit": 0,
//             "voteType": 0,
//             "playerCanJoin": 1,
//             "isMember": 0
//         },
//         "iscreator": 0,
//         "workButton": {
//             "name": "",
//             "url": "",
//             "status": 0,
//             "reason": ""
//         }
//     }
// }