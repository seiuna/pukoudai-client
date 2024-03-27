//
// @POST("uc/user/self/auth")
// Observable<BaseResponse<Object>> authSelf(@Body JsonObject jsonObject);
//
// @POST("apis/personal/bind/phone")
// Observable<BaseResponse<Object>> bindPhone(@Body JsonObject jsonObject);
//
// @POST("uc/user/self/bind")
// Observable<BaseResponse<Object>> bindSelf(@Body JsonObject jsonObject);
//
// @GET("apis/user/bind-status")
// Observable<BaseResponse<ThirdPartStatus>> getBindStatus();
//
// @GET("uc/college/account-list")
// Observable<BaseResponse<BaseListResponse<CollegeEntity>>> getCollegeList(@QueryMap Map<String, Object> map);
//
// @POST("apis/personal/credit")
// Observable<BaseResponse<PersonalCreditEntity>> getCredit();
//
// @GET("apis/system/doc")
// Observable<BaseResponse<DocEntity>> getDoc();
//
// @POST("uc/user/phone")
// Observable<BaseResponse<PhoneModel>> getPhone(@Body JsonObject jsonObject);
//
// @GET("uc/user/infocurr")
// Observable<BaseResponse<LutUserInfo>> getUserInfo();
//
// @POST("apis/user/init/user")
// Observable<BaseResponse<Object>> initUser(@Body JsonObject jsonObject);
//
// @GET("apis/user/isrevoke")
// Observable<BaseResponse<RevokeModel>> isrevoke();
//
// @POST("uc/user/login")
// Observable<BaseResponse<LoginResultModel>> login(@Body JsonObject jsonObject);
//
// @POST("apis/user/modify")
// Observable<BaseResponse<Object>> modifyUserInfo(@Body JsonObject jsonObject);
//
// @POST("uc/user/complate/info")
// Observable<BaseResponse<Object>> register(@Body JsonObject jsonObject);
//
// @POST("uc/user/reset-password")
// Observable<BaseResponse<Object>> resetPassword(@Body JsonObject jsonObject);
//
// @POST("apis/user/reset-passwd")
// Observable<BaseResponse<Object>> resetPwd(@Body JsonObject jsonObject);
//
// @GET("apis/user/revoke")
// Observable<BaseResponse<Object>> revoke();
//
// @POST("uc/user/send-code")
// Observable<BaseResponse<Object>> sendCode(@Body JsonObject jsonObject);
//
// @POST("apis/personal/send/code")
// Observable<BaseResponse<Object>> sendMsgCode(@Body JsonObject jsonObject);
//
// @POST("uc/user/unbind")
// Observable<BaseResponse<Object>> unbind(@Body JsonObject jsonObject);
//
// @POST("uc/user/bind")
// Observable<BaseResponse<Object>> userBind(@Body JsonObject jsonObject);

// public static Observable login(int type, String account, String password) {
//     JsonObject jsonObject = new JsonObject();
//     jsonObject.addProperty(SocializeProtocolConstants.PROTOCOL_KEY_SID, Long.valueOf(PUStringUtils.toLong(SaveUtils.getSchoolInfo().getGo_id())));
//     jsonObject.addProperty(e.p, "app");
//     jsonObject.addProperty("type", Integer.valueOf(type));
//     if (type == 0) {
//         jsonObject.addProperty("userName", account);
//         jsonObject.addProperty("password", password);
//     } else {
//         jsonObject.addProperty("accessToken", account);
//         jsonObject.addProperty("openId", password);
//     }
//     return ((LutMineInterface) getService(LutMineInterface.class)).login(jsonObject);
// }
//
// public static Observable getDoc() {
//     return ((LutMineInterface) getService(LutMineInterface.class)).getDoc();
// }
//
// public static Observable revoke() {
//     return ((LutMineInterface) getService(LutMineInterface.class)).revoke();
// }
//
// public static Observable isrevoke() {
//     return ((LutMineInterface) getService(LutMineInterface.class)).isrevoke();
// }
//
// public static Observable getUserInfo() {
//     return ((LutMineInterface) getService(LutMineInterface.class)).getUserInfo();
// }
//
// public static Observable modifyUserInfo(String nickName, int gender, Long avator, boolean isSaveGender) {
//     JsonObject jsonObject = new JsonObject();
//     jsonObject.addProperty("nickName", nickName);
//     if (isSaveGender) {
//         jsonObject.addProperty("gender", Integer.valueOf(gender));
//     }
//     if (avator != null && avator.longValue() > 0) {
//         jsonObject.addProperty("avator", avator);
//     }
//     return ((LutMineInterface) getService(LutMineInterface.class)).modifyUserInfo(jsonObject);
// }
//
// public static Observable resetPwd(String originPassword, String password, String confirmPassword) {
//     JsonObject jsonObject = new JsonObject();
//     jsonObject.addProperty("originPassword", originPassword);
//     jsonObject.addProperty("password", password);
//     jsonObject.addProperty("confirmPassword", confirmPassword);
//     return ((LutMineInterface) getService(LutMineInterface.class)).resetPwd(jsonObject);
// }
//
// public static Observable sendMsgCode(String phone) {
//     JsonObject jsonObject = new JsonObject();
//     jsonObject.addProperty("phone", phone);
//     return ((LutMineInterface) getService(LutMineInterface.class)).sendMsgCode(jsonObject);
// }
//
// public static Observable initUser(UserInitConfirmEntity model) {
//     JsonObject jsonObject = new JsonObject();
//     jsonObject.addProperty("avator", Long.valueOf(PUStringUtils.toLong(model.getIconPath())));
//     jsonObject.addProperty("realname", model.getUserName());
//     jsonObject.addProperty("cardType", Long.valueOf(PUStringUtils.toLong(model.getIdCardType())));
//     jsonObject.addProperty("cardNumber", model.getIdCardNum());
//     jsonObject.addProperty("phone", model.getPhone());
//     jsonObject.addProperty("code", model.getCode());
//     jsonObject.addProperty("password", model.getPwd());
//     jsonObject.addProperty("comfirePassword", model.getConfirmPwd());
//     return ((LutMineInterface) getService(LutMineInterface.class)).initUser(jsonObject);
// }
//
// public static Observable userBind(String sid, String username, String password, AccountEntity entity) {
//     JsonObject jsonObject = new JsonObject();
//     jsonObject.addProperty(SocializeProtocolConstants.PROTOCOL_KEY_SID, Long.valueOf(PUStringUtils.toLong(sid)));
//     if (entity != null) {
//         jsonObject.addProperty("type", Integer.valueOf(entity.getLoginType()));
//         jsonObject.addProperty("accessToken", entity.getAccessToken());
//         jsonObject.addProperty("openId", entity.getOpenid());
//     }
//     jsonObject.addProperty("username", username);
//     jsonObject.addProperty("password", password);
//     return ((LutMineInterface) getService(LutMineInterface.class)).userBind(jsonObject);
// }
//
// public static Observable bindSelf(String accessToken, String openId, int type) {
//     JsonObject jsonObject = new JsonObject();
//     jsonObject.addProperty("type", Integer.valueOf(type));
//     jsonObject.addProperty("accessToken", accessToken);
//     jsonObject.addProperty("openId", openId);
//     return ((LutMineInterface) getService(LutMineInterface.class)).bindSelf(jsonObject);
// }
//
// public static Observable unbind(int type) {
//     JsonObject jsonObject = new JsonObject();
//     jsonObject.addProperty("type", Integer.valueOf(type));
//     return ((LutMineInterface) getService(LutMineInterface.class)).unbind(jsonObject);
// }
//
// public static Observable authSelf(String username, String password) {
//     JsonObject jsonObject = new JsonObject();
//     jsonObject.addProperty("username", username);
//     jsonObject.addProperty("password", password);
//     return ((LutMineInterface) getService(LutMineInterface.class)).authSelf(jsonObject);
// }
//
// public static Observable bindPhone(String phone, String code) {
//     JsonObject jsonObject = new JsonObject();
//     jsonObject.addProperty("phone", phone);
//     jsonObject.addProperty("code", code);
//     return ((LutMineInterface) getService(LutMineInterface.class)).bindPhone(jsonObject);
// }
//
// public static Observable register(SubmitRegisterModel model) {
//     JsonObject jsonObject = new JsonObject();
//     jsonObject.addProperty("type", Integer.valueOf(PUStringUtils.toInt(model.getDriver())));
//     jsonObject.addProperty("accessToken", model.getAccessToken());
//     jsonObject.addProperty("openId", model.getOpenId());
//     jsonObject.addProperty("name", model.getRealname());
//     jsonObject.addProperty("gender", Integer.valueOf(PUStringUtils.toInt(model.getSex())));
//     jsonObject.addProperty(SocializeProtocolConstants.PROTOCOL_KEY_SID, Long.valueOf(PUStringUtils.toLong(model.getSid())));
//     jsonObject.addProperty("collegeId", Long.valueOf(PUStringUtils.toLong(model.getSid1())));
//     jsonObject.addProperty("year", Long.valueOf(PUStringUtils.toLong(model.getYear())));
//     jsonObject.addProperty("cardNumber", model.getIdcard());
//     jsonObject.addProperty("password", model.getPassword());
//     if (!TextUtils.isEmpty(model.getMobile())) {
//         jsonObject.addProperty("phone", model.getMobile());
//     }
//     return ((LutMineInterface) getService(LutMineInterface.class)).register(jsonObject);
// }
//
// public static Observable getCollegeList(String sid) {
//     HashMap hashMap = new HashMap();
//     hashMap.put("id", Long.valueOf(PUStringUtils.toLong(sid)));
//     return ((LutMineInterface) getService(LutMineInterface.class)).getCollegeList(hashMap);
// }
//
// public static Observable getBindStatus() {
//     return ((LutMineInterface) getService(LutMineInterface.class)).getBindStatus();
// }
//
// public static Observable getCredit() {
//     return ((LutMineInterface) getService(LutMineInterface.class)).getCredit();
// }
//
// public static Observable getPhone(String account) {
//     JsonObject jsonObject = new JsonObject();
//     jsonObject.addProperty("username", account);
//     jsonObject.addProperty(SocializeProtocolConstants.PROTOCOL_KEY_SID, Long.valueOf(PUStringUtils.toLong(SaveUtils.getSchoolInfo().getGo_id())));
//     return ((LutMineInterface) getService(LutMineInterface.class)).getPhone(jsonObject);
// }
//
// public static Observable sendCode(String account) {
//     JsonObject jsonObject = new JsonObject();
//     jsonObject.addProperty("username", account);
//     jsonObject.addProperty(SocializeProtocolConstants.PROTOCOL_KEY_SID, Long.valueOf(PUStringUtils.toLong(SaveUtils.getSchoolInfo().getGo_id())));
//     return ((LutMineInterface) getService(LutMineInterface.class)).sendCode(jsonObject);
// }
//
// public static Observable resetPassword(String account, String code, String password, String confirmPassword) {
//     JsonObject jsonObject = new JsonObject();
//     jsonObject.addProperty("username", account);
//     jsonObject.addProperty("code", code);
//     jsonObject.addProperty("password", password);
//     jsonObject.addProperty("confirmPassword", confirmPassword);
//     jsonObject.addProperty(SocializeProtocolConstants.PROTOCOL_KEY_SID, Long.valueOf(PUStringUtils.toLong(SaveUtils.getSchoolInfo().getGo_id())));
//     return ((LutMineInterface) getService(LutMineInterface.class)).resetPassword(jsonObject);
// }

import {CallAPI} from "./index";

/**
 *
 * @param username
 * @param password
 * @param sid
 * @param device app or pc when device is app, your android or apple client will out
 * @constructor
 */
export async function Login(username: string, password: string, sid: string | number, device: "app" | "pc") {
    return CallAPI(undefined, {
        endpoint: "/uc/user/login",
        login: false,
        data: {
            type: 0,
            userName: username,
            password: password,
            sid: parseInt(sid.toString()),
            device: "pc"
        },
        processResponse: (data) => {
            return data;
        },
    });

}