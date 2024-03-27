//
// @POST("apis/activity/signInGps")
// Observable<BaseResponse<StatusModel>> activityGpsSignIn(@Body JsonObject jsonObject);
//
// @POST("apis/activity/signOutGps")
// Observable<BaseResponse<StatusModel>> activityGpsSignOut(@Body JsonObject jsonObject);
//
// @POST("apis/activity/signIn")
// Observable<BaseResponse<Object>> activityScanSignIn(@Body JsonObject jsonObject);
//
// @POST("apis/activity/signOut")
// Observable<BaseResponse<Object>> activityScanSignOut(@Body JsonObject jsonObject);
//
// @POST("apis/activity/cancel")
// Observable<BaseResponse<Object>> cancelActivity(@Body JsonObject jsonObject);
//
// @POST("apis/activity/collect/add")
// Observable<BaseResponse<Object>> collectActivity(@Body JsonObject jsonObject);
//
// @POST("activity/basic/add")
// Observable<BaseResponse<Object>> createActivity(@Body JsonObject jsonObject);
//
// @POST("apis/activity/collect/del")
// Observable<BaseResponse<Object>> delCollectActivity(@Body JsonObject jsonObject);
//
// @POST("activity/basic/del")
// Observable<BaseResponse<Object>> deleteActivity(@Body JsonObject jsonObject);
//
// @POST("activity/finish/add")
// Observable<BaseResponse<Object>> doFinishEvent(@Body JsonObject jsonObject);
//
// @POST("activity/finish/edit")
// Observable<BaseResponse<Object>> editFinishEvent(@Body JsonObject jsonObject);
//
// @POST("activity/basic/fullEdit/{id}")
// Observable<BaseResponse<Object>> fullEditActivity(@Path("id") String id, @Body JsonObject jsonObject);
//
// @GET("da/access/list")
// Observable<BaseResponse<List<String>>> getActivityAccess();
//
// @POST("apis/todo/activityFinishTodo")
// Observable<BaseResponse<ListResponse<List<ActivityInfoEntity>>>> getActivityFinishTodo(@Body JsonObject jsonObject);
//
// @POST("apis/activity/info")
// Observable<BaseResponse<ActivityDetailResult>> getActivityInfo(@Body JsonObject jsonObject);
//
// @POST("apis/activity/list")
// Observable<BaseResponse<ListResponse<List<ActivityInfoEntity>>>> getActivityList(@Body JsonObject jsonObject);
//
// @POST("apis/activity/member")
// Observable<BaseResponse<ListResponse<List<ActivityMemberEntity>>>> getActivityMember(@Body JsonObject jsonObject);
//
// @POST("apis/activity/news/list")
// Observable<BaseResponse<ListResponse<List<ActivityNoticeEntity>>>> getActivityNoticeList(@Body JsonObject jsonObject);
//
// @POST("apis/activity/audit/list")
// Observable<BaseResponse<ListResponse2<List<ActivityInfoEntity>>>> getAuditTodo(@Body JsonObject jsonObject);
//
// @GET("da/audit/activity/list/{nodeId}")
// Observable<BaseResponse<ListResponse2<List<ActivityInfoEntity>>>> getAuditTodo(@Path("nodeId") String nodeId, @QueryMap Map<String, Object> jsonObject);
//
// @POST("apis/activity/list")
// Observable<BaseResponse<ListResponse<List<ActivityInfoEntity>>>> getCalendarActivityList(@Body JsonObject jsonObject);
//
// @GET("apis/activity/canSignList")
// Observable<BaseResponse<ListResponse<List<ActivityInfoEntity>>>> getCanSignList();
//
// @GET("apis/activity/collect/list")
// Observable<BaseResponse<ListResponse<List<ActivityInfoEntity>>>> getCollectActivity(@QueryMap Map<String, Object> map);
//
// @GET("activity/basic/info/{id}")
// Observable<BaseResponse<ActivityDetailEntity>> getEditActivityInfo(@Path("id") String id);
//
// @POST("apis/activity/evaluate/list")
// Observable<BaseResponse<ListResponse<List<ActivityCommentEntity>>>> getEvaluateList(@Body JsonObject jsonObject);
//
// @POST("apis/todo/evaluate")
// Observable<BaseResponse<ListResponse<List<ActivityInfoEntity>>>> getEvaluateTodo(@Body JsonObject jsonObject);
//
// @POST("activity/finish/info")
// Observable<BaseResponse<FinishEventInfo>> getFinishEventInfo(@Body JsonObject jsonObject);
//
// @POST("apis/todo/activityMemberAuditTodo")
// Observable<BaseResponse<ListResponse<List<ActivityInfoEntity>>>> getMemberAuditTodo(@Body JsonObject jsonObject);
//
// @POST("apis/activity/myList")
// Observable<BaseResponse<ListResponse<List<ActivityInfoEntity>>>> getMyActivityList(@Body JsonObject jsonObject);
//
// @POST("apis/myManageEvent/list")
// Observable<BaseResponse<ListResponse<List<ActivityInfoEntity>>>> getMyManageEvent(@Body JsonObject jsonObject);
//
// @POST("apis/activity/vote/player/info")
// Observable<BaseResponse<PlayerInfoEntity>> getPlayerInfo(@Body JsonObject jsonObject);
//
// @POST("apis/activity/vote/player/list")
// Observable<BaseResponse<ListResponse<List<PlayerEntity>>>> getPlayerList(@Body JsonObject jsonObject);
//
// @GET("apis/activity/vote/rejectReason/{id}")
// Observable<BaseResponse<RejectReasonEntity>> getRejectReason(@Path("id") String id);
//
// @POST("apis/todo/signInTodo")
// Observable<BaseResponse<ListResponse<List<ActivityInfoEntity>>>> getSignInTodo(@Body JsonObject jsonObject);
//
// @POST("apis/todo/signOutTodo")
// Observable<BaseResponse<ListResponse<List<ActivityInfoEntity>>>> getSignOutTodo(@Body JsonObject jsonObject);
//
// @POST("apis/activity/sign/result")
// Observable<BaseResponse<ActivitySignResultEntity>> getSignResult(@Body JsonObject jsonObject);
//
// @POST("apis/tribe/eventList")
// Observable<BaseResponse<ListResponse<List<ActivityInfoEntity>>>> getTribeActivity(@Body JsonObject jsonObject);
//
// @POST("apis/activity/join")
// Observable<BaseResponse<StatusModel>> joinActivity(@Body JsonObject jsonObject);
//
// @POST("activity/basic/partEdit/{id}")
// Observable<BaseResponse<Object>> partEditActivity(@Path("id") String id, @Body JsonObject jsonObject);
//
// @POST("activity/news/add")
// Observable<BaseResponse<Object>> submitActivityNews(@Body JsonObject jsonObject);
//
// @POST("apis/activity/evaluate/add")
// Observable<BaseResponse<Object>> submitEvaluate(@Body JsonObject jsonObject);
//
// @POST("apis/activity/vote")
// Observable<BaseResponse<VoteResult>> vote(@Body JsonObject jsonObject);
//
// @POST("apis/activity/vote/review")
// Observable<BaseResponse<Object>> voteReview(@Body JsonObject jsonObject);


// public static Observable getActivityList(int page, String searchKey, List<BaseNode> list, boolean isLabor) {
//     JsonObject jsonObject = new JsonObject();
//     jsonObject.addProperty(PictureConfig.EXTRA_PAGE, Integer.valueOf(page));
//     jsonObject.addProperty("limit", (Number) 10);
//     if (isLabor) {
//         jsonObject.addProperty("puType", (Number) 1);
//     }
//     if (!TextUtils.isEmpty(searchKey)) {
//         jsonObject.addProperty("title", searchKey);
//     }
//     if (list != null && !list.isEmpty()) {
//         for (BaseNode baseNode : list) {
//             if (baseNode instanceof FirstNode) {
//                 FirstNode firstNode = (FirstNode) baseNode;
//                 JsonArray jsonArray = new JsonArray();
//                 if (jsonObject.has(firstNode.getKey())) {
//                     jsonArray = jsonObject.getAsJsonArray(firstNode.getKey());
//                 }
//                 Iterator<BaseNode> it2 = baseNode.getChildNode().iterator();
//                 while (true) {
//                     if (!it2.hasNext()) {
//                         break;
//                     }
//                     BaseNode next = it2.next();
//                     if (next instanceof SecondNode) {
//                         SecondNode secondNode = (SecondNode) next;
//                         if (!secondNode.isChecked()) {
//                             continue;
//                         } else if (firstNode.getIsMulti() == 0) {
//                             jsonObject.addProperty(firstNode.getKey(), Long.valueOf(PUStringUtils.toLong(secondNode.getId())));
//                             break;
//                         } else {
//                             jsonArray.add(Long.valueOf(PUStringUtils.toLong(secondNode.getId())));
//                             if (next.getChildNode() != null && !next.getChildNode().isEmpty()) {
//                                 JsonArray jsonArray2 = new JsonArray();
//                                 if (jsonObject.has(secondNode.getKey())) {
//                                     jsonArray2 = jsonObject.getAsJsonArray(secondNode.getKey());
//                                 }
//                                 Iterator<BaseNode> it3 = next.getChildNode().iterator();
//                                 while (true) {
//                                     if (!it3.hasNext()) {
//                                         break;
//                                     }
//                                     BaseNode next2 = it3.next();
//                                     if (next2 instanceof ThirdNode) {
//                                         ThirdNode thirdNode = (ThirdNode) next2;
//                                         if (!thirdNode.isChecked()) {
//                                             continue;
//                                         } else if (secondNode.getIsMulti() == 0) {
//                                             jsonObject.addProperty(secondNode.getKey(), Long.valueOf(PUStringUtils.toLong(thirdNode.getId())));
//                                             break;
//                                         } else {
//                                             jsonArray2.add(Long.valueOf(PUStringUtils.toLong(thirdNode.getId())));
//                                         }
//                                     }
//                                 }
//                                 if (jsonArray2.size() > 0) {
//                                     jsonObject.add(secondNode.getKey(), jsonArray2);
//                                 }
//                             }
//                         }
//                     }
//                 }
//                 if (jsonArray.size() > 0) {
//                     jsonObject.add(firstNode.getKey(), jsonArray);
//                 }
//             }
//         }
//     }
//     return ((LutActivityInterface) getService(LutActivityInterface.class)).getActivityList(jsonObject);
// }
//
// public static Observable getCalendarActivityList(int page, String startTime, String endTime, int my) {
//     JsonObject jsonObject = new JsonObject();
//     jsonObject.addProperty(PictureConfig.EXTRA_PAGE, Integer.valueOf(page));
//     jsonObject.addProperty("limit", (Number) 15);
//     jsonObject.addProperty(AnalyticsConfig.RTD_START_TIME, Long.valueOf(DateTimeUtil.stringToLong(startTime + " 00:00:00") / 1000));
//     if (TextUtils.isEmpty(endTime)) {
//         jsonObject.addProperty("endTime", Long.valueOf(DateTimeUtil.stringToLong(startTime + " 23:59:59") / 1000));
//     } else {
//         jsonObject.addProperty("endTime", Long.valueOf(DateTimeUtil.stringToLong(endTime + " 23:59:59") / 1000));
//     }
//     jsonObject.addProperty("my", Integer.valueOf(my));
//     return ((LutActivityInterface) getService(LutActivityInterface.class)).getCalendarActivityList(jsonObject);
// }
//
// public static Observable getActivityInfo(String activityId) {
//     JsonObject jsonObject = new JsonObject();
//     jsonObject.addProperty("id", Long.valueOf(PUStringUtils.toLong(activityId)));
//     return ((LutActivityInterface) getService(LutActivityInterface.class)).getActivityInfo(jsonObject);
// }
//
// public static Observable getEditActivityInfo(String activityId) {
//     return ((LutActivityInterface) getService(LutActivityInterface.class)).getEditActivityInfo(activityId);
// }
//
// public static Observable joinActivity(String activityId) {
//     JsonObject jsonObject = new JsonObject();
//     jsonObject.addProperty("activityId", Long.valueOf(PUStringUtils.toLong(activityId)));
//     return ((LutActivityInterface) getService(LutActivityInterface.class)).joinActivity(jsonObject);
// }
//
// public static Observable cancelActivity(String activityId) {
//     JsonObject jsonObject = new JsonObject();
//     jsonObject.addProperty("activityId", Long.valueOf(PUStringUtils.toLong(activityId)));
//     return ((LutActivityInterface) getService(LutActivityInterface.class)).cancelActivity(jsonObject);
// }
//
// public static Observable getActivityMember(String activityId, int page, int limit) {
//     JsonObject jsonObject = new JsonObject();
//     jsonObject.addProperty(PictureConfig.EXTRA_PAGE, Integer.valueOf(page));
//     jsonObject.addProperty("limit", Integer.valueOf(limit));
//     jsonObject.addProperty("activityId", Long.valueOf(PUStringUtils.toLong(activityId)));
//     return ((LutActivityInterface) getService(LutActivityInterface.class)).getActivityMember(jsonObject);
// }
//
// public static Observable getSignResult(String activityId) {
//     JsonObject jsonObject = new JsonObject();
//     jsonObject.addProperty("activityId", Long.valueOf(PUStringUtils.toLong(activityId)));
//     return ((LutActivityInterface) getService(LutActivityInterface.class)).getSignResult(jsonObject);
// }
//
// public static Observable getCanSignList() {
//     return ((LutActivityInterface) getService(LutActivityInterface.class)).getCanSignList();
// }
//
// public static Observable createActivity(ActivityCreateUploadEntity model) {
//     JsonObject jsonObject = new JsonObject();
//     jsonObject.addProperty("logoId", Long.valueOf(PUStringUtils.toLong(model.getCreateEventFirstEntity().getCover().getId())));
//     jsonObject.addProperty("name", model.getCreateEventFirstEntity().getTitle());
//     jsonObject.addProperty("description", model.getCreateEventFirstEntity().getDescription());
//     jsonObject.addProperty("categoryId", Long.valueOf(PUStringUtils.toLong(model.getCreateEventFirstEntity().getActivityCategory().getId())));
//     if (model.getCreateEventFirstEntity().getActivityLevel() != null) {
//         jsonObject.addProperty("levelId", Long.valueOf(PUStringUtils.toLong(model.getCreateEventFirstEntity().getActivityLevel().getId())));
//     }
//     if (model.getCreateEventFirstEntity().getActivityTribe() != null) {
//         jsonObject.addProperty("tid", Long.valueOf(PUStringUtils.toLong(model.getCreateEventFirstEntity().getActivityTribe().getId())));
//     }
//     if (model.getCreateEventFirstEntity().getActivityTags() != null && !model.getCreateEventFirstEntity().getActivityTags().isEmpty()) {
//         JsonArray jsonArray = new JsonArray();
//         for (ActivityOptionModel activityOptionModel : model.getCreateEventFirstEntity().getActivityTags()) {
//             jsonArray.add(Long.valueOf(PUStringUtils.toLong(activityOptionModel.getId())));
//         }
//         jsonObject.add("tagIds", jsonArray);
//     }
//     jsonObject.addProperty("contact", model.getCreateEventFirstEntity().getContact());
//     jsonObject.addProperty("contactPhone", model.getCreateEventFirstEntity().getContact_phone());
//     jsonObject.addProperty("joinType", Integer.valueOf(model.getCreateEventSecondEntity().getJoinType()));
//     jsonObject.addProperty("joinStartTime", model.getCreateEventSecondEntity().getJoinStartTime());
//     jsonObject.addProperty("joinEndTime", model.getCreateEventSecondEntity().getJoinEndTime());
//     jsonObject.addProperty(AnalyticsConfig.RTD_START_TIME, model.getCreateEventSecondEntity().getStartTime());
//     jsonObject.addProperty("endTime", model.getCreateEventSecondEntity().getEndTime());
//     jsonObject.addProperty("allowUserType", Integer.valueOf(model.getCreateEventSecondEntity().getAllowUserType()));
//     if (model.getCreateEventSecondEntity().getAllowUserType() == 1) {
//         JsonArray jsonArray2 = new JsonArray();
//         for (ActivityOptionModel activityOptionModel2 : model.getCreateEventSecondEntity().getAllowYear()) {
//             if (!activityOptionModel2.getId().equals("0") && !activityOptionModel2.getName().equals("全部")) {
//                 jsonArray2.add(Long.valueOf(PUStringUtils.toLong(activityOptionModel2.getId())));
//             }
//         }
//         jsonObject.add("allowYear", jsonArray2);
//         JsonArray jsonArray3 = new JsonArray();
//         for (ActivityOptionModel activityOptionModel3 : model.getCreateEventSecondEntity().getAllowCollege()) {
//             if (!activityOptionModel3.getId().equals("0") && !activityOptionModel3.getName().equals("全部")) {
//                 jsonArray3.add(Long.valueOf(PUStringUtils.toLong(activityOptionModel3.getId())));
//             }
//         }
//         jsonObject.add("allowCollege", jsonArray3);
//     } else if (model.getCreateEventSecondEntity().getAllowUserType() == 2) {
//         JsonArray jsonArray4 = new JsonArray();
//         for (TribeEntity tribeEntity : model.getCreateEventSecondEntity().getAllowTribe()) {
//             jsonArray4.add(Long.valueOf(PUStringUtils.toLong(tribeEntity.getId())));
//         }
//         jsonObject.add("allowTribe", jsonArray4);
//     }
//     jsonObject.addProperty("allowUserCount", Integer.valueOf(model.getCreateEventSecondEntity().getAllowUserCount()));
//     jsonObject.addProperty("signType", Integer.valueOf(model.getCreateEventThirdEntity().getSignType()));
//     jsonObject.addProperty("address", model.getCreateEventThirdEntity().getAddress());
//     if (model.getCreateEventThirdEntity().getSignType() == 2) {
//         jsonObject.addProperty("signPlace", model.getCreateEventThirdEntity().getSignPlace());
//         jsonObject.addProperty("signLong", model.getCreateEventThirdEntity().getSignLong());
//         jsonObject.addProperty("signLat", model.getCreateEventThirdEntity().getSignLat());
//         jsonObject.addProperty("signRadius", Long.valueOf(PUStringUtils.toLong(model.getCreateEventThirdEntity().getSignRadius().getId())));
//     }
//     jsonObject.addProperty("needSignOut", Integer.valueOf(model.getCreateEventThirdEntity().getNeedSignOut()));
//     if (model.getCreateEventThirdEntity().getOrg().getIsCid() == 1) {
//         jsonObject.addProperty("cid", Long.valueOf(PUStringUtils.toLong(model.getCreateEventThirdEntity().getOrg().getId())));
//     } else {
//         jsonObject.addProperty("oid", Long.valueOf(PUStringUtils.toLong(model.getCreateEventThirdEntity().getOrg().getId())));
//     }
//     jsonObject.addProperty("auditor", Long.valueOf(PUStringUtils.toLong(model.getCreateEventThirdEntity().getAuditor().getId())));
//     return ((LutActivityInterface) getService(LutActivityInterface.class)).createActivity(jsonObject);
// }
//
// public static Observable editActivity(ActivityCreateUploadEntity model) {
//     JsonObject jsonObject = new JsonObject();
//     jsonObject.addProperty("logoId", Long.valueOf(PUStringUtils.toLong(model.getCreateEventFirstEntity().getCover().getId())));
//     jsonObject.addProperty("name", model.getCreateEventFirstEntity().getTitle());
//     jsonObject.addProperty("description", model.getCreateEventFirstEntity().getDescription());
//     jsonObject.addProperty("categoryId", Long.valueOf(PUStringUtils.toLong(model.getCreateEventFirstEntity().getActivityCategory().getId())));
//     if (model.getCreateEventFirstEntity().getActivityLevel() != null) {
//         jsonObject.addProperty("levelId", Long.valueOf(PUStringUtils.toLong(model.getCreateEventFirstEntity().getActivityLevel().getId())));
//     }
//     if (model.getCreateEventFirstEntity().getActivityTribe() != null) {
//         jsonObject.addProperty("tid", Long.valueOf(PUStringUtils.toLong(model.getCreateEventFirstEntity().getActivityTribe().getId())));
//     }
//     if (model.getCreateEventFirstEntity().getActivityTags() != null && !model.getCreateEventFirstEntity().getActivityTags().isEmpty()) {
//         JsonArray jsonArray = new JsonArray();
//         for (ActivityOptionModel activityOptionModel : model.getCreateEventFirstEntity().getActivityTags()) {
//             jsonArray.add(Long.valueOf(PUStringUtils.toLong(activityOptionModel.getId())));
//         }
//         jsonObject.add("tagIds", jsonArray);
//     }
//     jsonObject.addProperty("contact", model.getCreateEventFirstEntity().getContact());
//     jsonObject.addProperty("contactPhone", model.getCreateEventFirstEntity().getContact_phone());
//     jsonObject.addProperty("joinType", Integer.valueOf(model.getCreateEventSecondEntity().getJoinType()));
//     jsonObject.addProperty("joinStartTime", model.getCreateEventSecondEntity().getJoinStartTime());
//     jsonObject.addProperty("joinEndTime", model.getCreateEventSecondEntity().getJoinEndTime());
//     jsonObject.addProperty(AnalyticsConfig.RTD_START_TIME, model.getCreateEventSecondEntity().getStartTime());
//     jsonObject.addProperty("endTime", model.getCreateEventSecondEntity().getEndTime());
//     jsonObject.addProperty("allowUserType", Integer.valueOf(model.getCreateEventSecondEntity().getAllowUserType()));
//     if (model.getCreateEventSecondEntity().getAllowUserType() == 1) {
//         JsonArray jsonArray2 = new JsonArray();
//         for (ActivityOptionModel activityOptionModel2 : model.getCreateEventSecondEntity().getAllowYear()) {
//             if (!activityOptionModel2.getId().equals("0") && !activityOptionModel2.getName().equals("全部")) {
//                 jsonArray2.add(Long.valueOf(PUStringUtils.toLong(activityOptionModel2.getId())));
//             }
//         }
//         jsonObject.add("allowYear", jsonArray2);
//         JsonArray jsonArray3 = new JsonArray();
//         for (ActivityOptionModel activityOptionModel3 : model.getCreateEventSecondEntity().getAllowCollege()) {
//             if (!activityOptionModel3.getId().equals("0") && !activityOptionModel3.getName().equals("全部")) {
//                 jsonArray3.add(Long.valueOf(PUStringUtils.toLong(activityOptionModel3.getId())));
//             }
//         }
//         jsonObject.add("allowCollege", jsonArray3);
//     } else if (model.getCreateEventSecondEntity().getAllowUserType() == 2) {
//         JsonArray jsonArray4 = new JsonArray();
//         for (TribeEntity tribeEntity : model.getCreateEventSecondEntity().getAllowTribe()) {
//             jsonArray4.add(Long.valueOf(PUStringUtils.toLong(tribeEntity.getId())));
//         }
//         jsonObject.add("allowTribe", jsonArray4);
//     }
//     jsonObject.addProperty("allowUserCount", Integer.valueOf(model.getCreateEventSecondEntity().getAllowUserCount()));
//     jsonObject.addProperty("signType", Integer.valueOf(model.getCreateEventThirdEntity().getSignType()));
//     jsonObject.addProperty("address", model.getCreateEventThirdEntity().getAddress());
//     if (model.getCreateEventThirdEntity().getSignType() == 2) {
//         jsonObject.addProperty("signPlace", model.getCreateEventThirdEntity().getSignPlace());
//         jsonObject.addProperty("signLong", model.getCreateEventThirdEntity().getSignLong());
//         jsonObject.addProperty("signLat", model.getCreateEventThirdEntity().getSignLat());
//         jsonObject.addProperty("signRadius", Long.valueOf(PUStringUtils.toLong(model.getCreateEventThirdEntity().getSignRadius().getId())));
//     }
//     jsonObject.addProperty("needSignOut", Integer.valueOf(model.getCreateEventThirdEntity().getNeedSignOut()));
//     if (model.getCreateEventThirdEntity().getOrg().getIsCid() == 1) {
//         jsonObject.addProperty("cid", Long.valueOf(PUStringUtils.toLong(model.getCreateEventThirdEntity().getOrg().getId())));
//     } else {
//         jsonObject.addProperty("oid", Long.valueOf(PUStringUtils.toLong(model.getCreateEventThirdEntity().getOrg().getId())));
//     }
//     jsonObject.addProperty("auditor", Long.valueOf(PUStringUtils.toLong(model.getCreateEventThirdEntity().getAuditor().getId())));
//     return ((LutActivityInterface) getService(LutActivityInterface.class)).fullEditActivity(model.getActivityId(), jsonObject);
// }
//
// public static Observable createOrEditActivity(ActivityPublishEntity model) {
//     JsonObject jsonObject = new JsonObject();
//     ActivityFirstStepEntity firstStepEntity = model.getFirstStepEntity();
//     jsonObject.addProperty("isTuan", Integer.valueOf(model.getActivityFlag()));
//     jsonObject.addProperty("categoryId", Long.valueOf(PUStringUtils.toLong(firstStepEntity.getInfoEntity().getActivityCategory().getId())));
//     if (firstStepEntity.getInfoEntity().getActivitySubCategory() != null) {
//         jsonObject.addProperty("subCategoryId", Long.valueOf(PUStringUtils.toLong(firstStepEntity.getInfoEntity().getActivitySubCategory().getId())));
//     }
//     jsonObject.addProperty("logoId", Long.valueOf(PUStringUtils.toLong(firstStepEntity.getInfoEntity().getCover().getId())));
//     jsonObject.addProperty("name", firstStepEntity.getInfoEntity().getTitle());
//     jsonObject.addProperty("description", firstStepEntity.getInfoEntity().getDescription());
//     if (firstStepEntity.getTagEntity().getActivityTags() != null && !firstStepEntity.getTagEntity().getActivityTags().isEmpty()) {
//         JsonArray jsonArray = new JsonArray();
//         for (ActivityOptionModel activityOptionModel : firstStepEntity.getTagEntity().getActivityTags()) {
//             if (!TextUtils.isEmpty(activityOptionModel.getId()) && !activityOptionModel.getId().equals("0")) {
//                 jsonArray.add(Long.valueOf(PUStringUtils.toLong(activityOptionModel.getId())));
//             }
//         }
//         jsonObject.add("tagIds", jsonArray);
//     }
//     if (firstStepEntity.getTagEntity().getActivityLevel() != null) {
//         jsonObject.addProperty("levelId", Long.valueOf(PUStringUtils.toLong(firstStepEntity.getTagEntity().getActivityLevel().getId())));
//     }
//     if (firstStepEntity.getTagEntity().getActivityTribe() != null) {
//         jsonObject.addProperty("tid", Long.valueOf(PUStringUtils.toLong(firstStepEntity.getTagEntity().getActivityTribe().getId())));
//     }
//     if (model.getActivityFlag() == 1 && firstStepEntity.getTagEntity().getJobProgram() != null) {
//         jsonObject.addProperty("leagueProjectId", Long.valueOf(PUStringUtils.toLong(firstStepEntity.getTagEntity().getJobProgram().getId())));
//     }
//     if (firstStepEntity.getOrgEntity().getOrgType() == 1 && firstStepEntity.getOrgEntity().getCollege() != null) {
//         jsonObject.addProperty("cid", Long.valueOf(PUStringUtils.toLong(firstStepEntity.getOrgEntity().getCollege().getId())));
//     } else if (firstStepEntity.getOrgEntity().getOrgType() == 0 && firstStepEntity.getOrgEntity().getOrg() != null) {
//         jsonObject.addProperty("oid", Long.valueOf(PUStringUtils.toLong(firstStepEntity.getOrgEntity().getOrg().getId())));
//     }
//     jsonObject.addProperty("auditor", Long.valueOf(PUStringUtils.toLong(firstStepEntity.getOrgEntity().getAuditor().getId())));
//     ActivitySecondStepEntity secondStepEntity = model.getSecondStepEntity();
//     jsonObject.addProperty("joinType", Integer.valueOf(secondStepEntity.getJoinEntity().getJoinType()));
//     jsonObject.addProperty("allowUserCount", Integer.valueOf(secondStepEntity.getJoinEntity().getAllowUserCount()));
//     jsonObject.addProperty("joinStartTime", secondStepEntity.getTimeEntity().getJoinStartTime());
//     jsonObject.addProperty("joinEndTime", secondStepEntity.getTimeEntity().getJoinEndTime());
//     jsonObject.addProperty(AnalyticsConfig.RTD_START_TIME, secondStepEntity.getTimeEntity().getStartTime());
//     jsonObject.addProperty("endTime", secondStepEntity.getTimeEntity().getEndTime());
//     jsonObject.addProperty("allowUserType", Integer.valueOf(secondStepEntity.getCanJoinEntity().getAllowUserType()));
//     if (secondStepEntity.getCanJoinEntity().getAllowUserType() == 1) {
//         JsonArray jsonArray2 = new JsonArray();
//         for (ActivityOptionModel activityOptionModel2 : secondStepEntity.getCanJoinEntity().getAllowYear()) {
//             if (!TextUtils.isEmpty(activityOptionModel2.getId()) && !activityOptionModel2.getId().equals("0")) {
//                 jsonArray2.add(Long.valueOf(PUStringUtils.toLong(activityOptionModel2.getId())));
//             }
//         }
//         jsonObject.add("allowYear", jsonArray2);
//         JsonArray jsonArray3 = new JsonArray();
//         for (ActivityOptionModel activityOptionModel3 : secondStepEntity.getCanJoinEntity().getAllowCollege()) {
//             if (!TextUtils.isEmpty(activityOptionModel3.getId()) && !activityOptionModel3.getId().equals("0")) {
//                 jsonArray3.add(Long.valueOf(PUStringUtils.toLong(activityOptionModel3.getId())));
//             }
//         }
//         jsonObject.add("allowCollege", jsonArray3);
//     } else if (secondStepEntity.getCanJoinEntity().getAllowUserType() == 2) {
//         JsonArray jsonArray4 = new JsonArray();
//         for (TribeEntity tribeEntity : secondStepEntity.getCanJoinEntity().getAllowTribe()) {
//             jsonArray4.add(Long.valueOf(PUStringUtils.toLong(tribeEntity.getId())));
//         }
//         jsonObject.add("allowTribe", jsonArray4);
//     } else if (secondStepEntity.getCanJoinEntity().getAllowUserType() == 3) {
//         JsonArray jsonArray5 = new JsonArray();
//         for (ActivityOptionModel activityOptionModel4 : secondStepEntity.getCanJoinEntity().getAllowCampus()) {
//             jsonArray5.add(Long.valueOf(PUStringUtils.toLong(activityOptionModel4.getId())));
//         }
//         jsonObject.add("allowCampus", jsonArray5);
//     }
//     ActivityThirdStepEntity thirdStepEntity = model.getThirdStepEntity();
//     jsonObject.addProperty("signType", Integer.valueOf(thirdStepEntity.getSignInEntity().getSignType()));
//     jsonObject.addProperty("address", thirdStepEntity.getSignInEntity().getAddress());
//     if (thirdStepEntity.getSignInEntity().getSignType() == 2) {
//         jsonObject.addProperty("signLong", thirdStepEntity.getSignInEntity().getSignLong());
//         jsonObject.addProperty("signLat", thirdStepEntity.getSignInEntity().getSignLat());
//         jsonObject.addProperty("signPlace", thirdStepEntity.getSignInEntity().getSignPlace());
//         jsonObject.addProperty("signRadius", Long.valueOf(PUStringUtils.toLong(thirdStepEntity.getSignInEntity().getSignRadius().getId())));
//     }
//     jsonObject.addProperty("needSignOut", Integer.valueOf(thirdStepEntity.getNeedSignOut()));
//     jsonObject.addProperty("canVote", Integer.valueOf(thirdStepEntity.getNeedVote()));
//     jsonObject.addProperty("contact", thirdStepEntity.getContactEntity().getContact());
//     jsonObject.addProperty("contactPhone", thirdStepEntity.getContactEntity().getContact_phone());
//     if (!TextUtils.isEmpty(model.getActivityId())) {
//         return ((LutActivityInterface) getService(LutActivityInterface.class)).fullEditActivity(model.getActivityId(), jsonObject);
//     }
//     return ((LutActivityInterface) getService(LutActivityInterface.class)).createActivity(jsonObject);
// }
//
// public static Observable partEditActivity(ActivityPartialModel model) {
//     JsonObject jsonObject = new JsonObject();
//     jsonObject.addProperty("joinStartTime", model.getJoinStartTime());
//     jsonObject.addProperty("joinEndTime", model.getJoinEndTime());
//     jsonObject.addProperty(AnalyticsConfig.RTD_START_TIME, model.getStartTime());
//     jsonObject.addProperty("endTime", model.getEndTime());
//     jsonObject.addProperty("address", model.getAddress());
//     jsonObject.addProperty("joinType", Integer.valueOf(model.getJoinType()));
//     return ((LutActivityInterface) getService(LutActivityInterface.class)).partEditActivity(model.getActivityId(), jsonObject);
// }
//
// public static Observable activityScanSignIn(String activityId, String mid) {
//     JsonObject jsonObject = new JsonObject();
//     jsonObject.addProperty("activityId", Long.valueOf(PUStringUtils.toLong(activityId)));
//     jsonObject.addProperty("mid", Long.valueOf(PUStringUtils.toLong(mid)));
//     return ((LutActivityInterface) getService(LutActivityInterface.class)).activityScanSignIn(jsonObject);
// }
//
// public static Observable activityGpsSignIn(String activityId, String signInAddress, String signInRemark) {
//     JsonObject jsonObject = new JsonObject();
//     jsonObject.addProperty("activityId", Long.valueOf(PUStringUtils.toLong(activityId)));
//     jsonObject.addProperty("signInAddress", signInAddress);
//     if (!TextUtils.isEmpty(signInRemark)) {
//         jsonObject.addProperty("signInRemark", signInRemark);
//     }
//     return ((LutActivityInterface) getService(LutActivityInterface.class)).activityGpsSignIn(jsonObject);
// }
//
// public static Observable activityScanSignOut(String activityId, String mid) {
//     JsonObject jsonObject = new JsonObject();
//     jsonObject.addProperty("activityId", Long.valueOf(PUStringUtils.toLong(activityId)));
//     jsonObject.addProperty("mid", Long.valueOf(PUStringUtils.toLong(mid)));
//     return ((LutActivityInterface) getService(LutActivityInterface.class)).activityScanSignOut(jsonObject);
// }
//
// public static Observable activityGpsSignOut(String activityId, String signInAddress, String signInRemark) {
//     JsonObject jsonObject = new JsonObject();
//     jsonObject.addProperty("activityId", Long.valueOf(PUStringUtils.toLong(activityId)));
//     jsonObject.addProperty("signInAddress", signInAddress);
//     if (!TextUtils.isEmpty(signInRemark)) {
//         jsonObject.addProperty("signInRemark", signInRemark);
//     }
//     return ((LutActivityInterface) getService(LutActivityInterface.class)).activityGpsSignOut(jsonObject);
// }
//
// public static Observable getMyManageEvent(int page, int type, String title) {
//     JsonObject jsonObject = new JsonObject();
//     jsonObject.addProperty(PictureConfig.EXTRA_PAGE, Integer.valueOf(page));
//     jsonObject.addProperty("limit", (Number) 10);
//     jsonObject.addProperty("type", Integer.valueOf(type));
//     if (!TextUtils.isEmpty(title)) {
//         jsonObject.addProperty("title", title);
//     }
//     return ((LutActivityInterface) getService(LutActivityInterface.class)).getMyManageEvent(jsonObject);
// }
//
// public static Observable deleteActivity(String id) {
//     JsonObject jsonObject = new JsonObject();
//     jsonObject.addProperty("id", Long.valueOf(PUStringUtils.toLong(id)));
//     jsonObject.addProperty("deleteReason", "用户删除");
//     return ((LutActivityInterface) getService(LutActivityInterface.class)).deleteActivity(jsonObject);
// }
//
// public static Observable getTribeActivity(String tribeID, int page) {
//     JsonObject jsonObject = new JsonObject();
//     jsonObject.addProperty("tribeID", Long.valueOf(PUStringUtils.toLong(tribeID)));
//     jsonObject.addProperty(PictureConfig.EXTRA_PAGE, Integer.valueOf(page));
//     jsonObject.addProperty("limit", (Number) 10);
//     return ((LutActivityInterface) getService(LutActivityInterface.class)).getTribeActivity(jsonObject);
// }
//
// public static Observable getTodoActivity(int page, String code) {
//     JsonObject jsonObject = new JsonObject();
//     jsonObject.addProperty(PictureConfig.EXTRA_PAGE, Integer.valueOf(page));
//     jsonObject.addProperty("limit", (Number) 10);
//     if (code.equals("event1")) {
//         return ((LutActivityInterface) getService(LutActivityInterface.class)).getSignInTodo(jsonObject);
//     }
//     if (code.equals("event2")) {
//         return ((LutActivityInterface) getService(LutActivityInterface.class)).getSignOutTodo(jsonObject);
//     }
//     if (code.equals("event3")) {
//         return ((LutActivityInterface) getService(LutActivityInterface.class)).getEvaluateTodo(jsonObject);
//     }
//     if (code.equals("event4")) {
//         return ((LutActivityInterface) getService(LutActivityInterface.class)).getMemberAuditTodo(jsonObject);
//     }
//     if (code.equals("event5")) {
//         return ((LutActivityInterface) getService(LutActivityInterface.class)).getActivityFinishTodo(jsonObject);
//     }
//     return null;
// }
//
// public static Observable getAuditTodo(String nodeId, int page, String code) {
//     if (code.equals("event9") || code.equals("event10")) {
//         JsonObject jsonObject = new JsonObject();
//         jsonObject.addProperty(PictureConfig.EXTRA_PAGE, Integer.valueOf(page));
//         jsonObject.addProperty("limit", (Number) 10);
//         jsonObject.addProperty(a.s, Integer.valueOf(PUStringUtils.toInt(nodeId)));
//         jsonObject.addProperty("puType", Integer.valueOf(code.equals("event9") ? 1 : 0));
//         return ((LutActivityInterface) getService(LutActivityInterface.class)).getAuditTodo(jsonObject);
//     }
//     HashMap hashMap = new HashMap();
//     hashMap.put(PictureConfig.EXTRA_PAGE, Integer.valueOf(page));
//     hashMap.put("limit", 10);
//     return ((LutActivityInterface) getService(LutActivityInterface.class)).getAuditTodo(nodeId, hashMap);
// }
//
// public static Observable getMyActivityList(String type, int page) {
//     JsonObject jsonObject = new JsonObject();
//     jsonObject.addProperty("type", Long.valueOf(PUStringUtils.toLong(type)));
//     jsonObject.addProperty(PictureConfig.EXTRA_PAGE, Integer.valueOf(page));
//     jsonObject.addProperty("limit", (Number) 10);
//     return ((LutActivityInterface) getService(LutActivityInterface.class)).getMyActivityList(jsonObject);
// }
//
// public static Observable doFinishEvent(String activityId, String content, String pay, String pics) {
//     JsonObject jsonObject = new JsonObject();
//     jsonObject.addProperty("activityId", Long.valueOf(PUStringUtils.toLong(activityId)));
//     jsonObject.addProperty(SocialConstants.PARAM_IMAGE, pics);
//     jsonObject.addProperty("content", content);
//     if (!TextUtils.isEmpty(pay)) {
//         jsonObject.addProperty("pay", Double.valueOf(PUStringUtils.toDouble(pay)));
//     }
//     return ((LutActivityInterface) getService(LutActivityInterface.class)).doFinishEvent(jsonObject);
// }
//
// public static Observable editFinishEvent(String activityId, String content, String pay, String pics) {
//     JsonObject jsonObject = new JsonObject();
//     jsonObject.addProperty("activityId", Long.valueOf(PUStringUtils.toLong(activityId)));
//     jsonObject.addProperty(SocialConstants.PARAM_IMAGE, pics);
//     jsonObject.addProperty("content", content);
//     if (!TextUtils.isEmpty(pay)) {
//         jsonObject.addProperty("pay", Double.valueOf(PUStringUtils.toDouble(pay)));
//     }
//     return ((LutActivityInterface) getService(LutActivityInterface.class)).editFinishEvent(jsonObject);
// }
//
// public static Observable getFinishEventInfo(String activityId) {
//     JsonObject jsonObject = new JsonObject();
//     jsonObject.addProperty("activityId", Long.valueOf(PUStringUtils.toLong(activityId)));
//     return ((LutActivityInterface) getService(LutActivityInterface.class)).getFinishEventInfo(jsonObject);
// }
//
// public static Observable getEvaluateList(int page, int limit, int level, String activityId) {
//     JsonObject jsonObject = new JsonObject();
//     jsonObject.addProperty("activityId", Long.valueOf(PUStringUtils.toLong(activityId)));
//     jsonObject.addProperty(PictureConfig.EXTRA_PAGE, Integer.valueOf(page));
//     jsonObject.addProperty("level", Integer.valueOf(level));
//     jsonObject.addProperty("limit", Integer.valueOf(limit));
//     return ((LutActivityInterface) getService(LutActivityInterface.class)).getEvaluateList(jsonObject);
// }
//
// public static Observable submitEvaluate(String activityId, int star, String content, List<String> pics) {
//     JsonObject jsonObject = new JsonObject();
//     jsonObject.addProperty("activityId", Long.valueOf(PUStringUtils.toLong(activityId)));
//     jsonObject.addProperty("star", Integer.valueOf(star));
//     jsonObject.addProperty("content", content);
//     if (pics != null && !pics.isEmpty()) {
//         JsonArray jsonArray = new JsonArray();
//         for (String str : pics) {
//             jsonArray.add(Long.valueOf(PUStringUtils.toLong(str)));
//         }
//         jsonObject.add(SocialConstants.PARAM_IMAGE, jsonArray);
//     }
//     return ((LutActivityInterface) getService(LutActivityInterface.class)).submitEvaluate(jsonObject);
// }
//
// public static Observable submitActivityNews(String activityId, String content, List<String> pics) {
//     JsonObject jsonObject = new JsonObject();
//     jsonObject.addProperty("activityId", Long.valueOf(PUStringUtils.toLong(activityId)));
//     jsonObject.addProperty("content", content);
//     if (pics != null && !pics.isEmpty()) {
//         JsonArray jsonArray = new JsonArray();
//         for (String str : pics) {
//             jsonArray.add(Long.valueOf(PUStringUtils.toLong(str)));
//         }
//         jsonObject.add("picIds", jsonArray);
//     }
//     return ((LutActivityInterface) getService(LutActivityInterface.class)).submitActivityNews(jsonObject);
// }
//
// public static Observable getActivityNoticeList(String activityId, int page) {
//     JsonObject jsonObject = new JsonObject();
//     jsonObject.addProperty("activityId", Long.valueOf(PUStringUtils.toLong(activityId)));
//     jsonObject.addProperty(PictureConfig.EXTRA_PAGE, Integer.valueOf(page));
//     jsonObject.addProperty("limit", (Number) 15);
//     return ((LutActivityInterface) getService(LutActivityInterface.class)).getActivityNoticeList(jsonObject);
// }
//
// public static Observable collectActivity(String activityId) {
//     JsonObject jsonObject = new JsonObject();
//     jsonObject.addProperty("activityId", Long.valueOf(PUStringUtils.toLong(activityId)));
//     return ((LutActivityInterface) getService(LutActivityInterface.class)).collectActivity(jsonObject);
// }
//
// public static Observable delCollectActivity(String activityId) {
//     JsonObject jsonObject = new JsonObject();
//     jsonObject.addProperty("activityId", Long.valueOf(PUStringUtils.toLong(activityId)));
//     return ((LutActivityInterface) getService(LutActivityInterface.class)).delCollectActivity(jsonObject);
// }
//
// public static Observable getCollectActivity(int page) {
//     HashMap hashMap = new HashMap();
//     hashMap.put(PictureConfig.EXTRA_PAGE, Integer.valueOf(page));
//     hashMap.put("limit", 15);
//     return ((LutActivityInterface) getService(LutActivityInterface.class)).getCollectActivity(hashMap);
// }
//
// public static Observable vote(String activityId, String playId) {
//     JsonObject jsonObject = new JsonObject();
//     jsonObject.addProperty("activityId", Long.valueOf(PUStringUtils.toLong(activityId)));
//     jsonObject.addProperty("playId", Long.valueOf(PUStringUtils.toLong(playId)));
//     return ((LutActivityInterface) getService(LutActivityInterface.class)).vote(jsonObject);
// }
//
// public static Observable voteReview(String playId, String desc) {
//     JsonObject jsonObject = new JsonObject();
//     jsonObject.addProperty("id", Long.valueOf(PUStringUtils.toLong(playId)));
//     jsonObject.addProperty("content", desc);
//     return ((LutActivityInterface) getService(LutActivityInterface.class)).voteReview(jsonObject);
// }
//
// public static Observable getPlayerList(int page, int limit, String activityId, String key) {
//     JsonObject jsonObject = new JsonObject();
//     jsonObject.addProperty("activityId", Long.valueOf(PUStringUtils.toLong(activityId)));
//     if (!TextUtils.isEmpty(key)) {
//         jsonObject.addProperty("key", key);
//     }
//     jsonObject.addProperty(PictureConfig.EXTRA_PAGE, Integer.valueOf(page));
//     jsonObject.addProperty("limit", Integer.valueOf(limit));
//     return ((LutActivityInterface) getService(LutActivityInterface.class)).getPlayerList(jsonObject);
// }
//
// public static Observable getPlayerInfo(String activityId, String playId) {
//     JsonObject jsonObject = new JsonObject();
//     jsonObject.addProperty("activityId", Long.valueOf(PUStringUtils.toLong(activityId)));
//     jsonObject.addProperty("id", Long.valueOf(PUStringUtils.toLong(playId)));
//     return ((LutActivityInterface) getService(LutActivityInterface.class)).getPlayerInfo(jsonObject);
// }
//
// public static Observable getRejectReason(String activityId) {
//     return ((LutActivityInterface) getService(LutActivityInterface.class)).getRejectReason(activityId);
// }
//
// public static Observable getActivityAccess() {
//     return ((LutActivityInterface) getService(LutActivityInterface.class)).getActivityAccess();
// }
// }

import {Client} from "../newclient";
import {CallAPI} from "./index";

export async function SigninGps(client: Client, activityId: string, signInAddress: string, signInRemark: string): Promise<any> {
    return CallAPI(client, {
        endpoint: "apis/activity/signInGps",
        method: "POST",
        login: true,
        data: {
            activityId: activityId,
            signInAddress: signInAddress,
            signInRemark: signInRemark
        },
        processResponse: (response: any) => {
            return response;
        }
    })
}