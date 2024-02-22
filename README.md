## 介绍
如你所见这是一个pu口袋校园~

## 支持的功能
- [x] 登陆与认证
  - [x] 二维码登陆
  - [x] 账户密码登陆
- [ ] 功能
  - [x] 加入活动
  - [x] 取消活动
  - [x] 获取活动列表
  - [x] 获取活动详情
  - [x] 获取活动报名人员列表
  - [x] 取消收藏或收藏活动
  - [x] 获取收藏活动列表
  - [x] 获取用户信息
  - [x] 获取用户报名活动列表
  - [x] 获取我的活动列表
  - [x] 获取我的部落列表
  - [x] 获取部落详情
  - [x] 获取部落成员列表
  - [x] 获取部落活动列表
  - [x] 获取部落列表
  - [x] 每日签到

## 使用方法

### 作为库使用
```shell
npm install pu-client
```

```javascript
import {createClient} from 'pu-client'

createClient(username,school,password).then(async client => {
    client.joinEvent(eventId)
     // do something...
})
```

## 免责声明

本项目仅供学习交流使用, 请勿用于商业用途, 由此引起的一切法律责任与本人无关.