## 介绍
这是一个pu口袋校园的nodejs实现, 用于实现一些自动化的功能, 如自动报名, 自动转让等, 也可以用于爬取数据。

## 完成进度
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

## 使用方法

### 具体实现
请移步 [fufuu](https://github.com/seiuna/puu-uuuuuuuuuuuu)
一个pu client的简单用法，可以用于自动加入pu活动的脚本，可以自动加入你收藏的活动、你部落的活动、所有可以加入的活动。并且支持推送功能，可以通过邮件等方式推送活动信息。也可以根据你的要求自定义活动的筛选条件(甚至可以强制加入需要报名审核的活动)。 建议配合云函数/云服务器食用 pu口袋校园

### 作为库使用
```shell
npm install pu-client
```

```javascript
import {createClient} from 'pu-client'

createClient(username,school,password).then(async client => {
    client.joinEvent(eventId)
     // do something
})
```

## 免责声明

本项目仅供学习交流使用, 请勿用于商业用途, 由此引起的一切法律责任与本人无关.