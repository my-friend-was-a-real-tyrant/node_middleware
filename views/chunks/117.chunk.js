webpackJsonp([117],{1036:function(t,a){},1217:function(t,a){t.exports={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"contain-main"},[t._m(0),t._v(" "),e("el-form",{ref:"formData",staticClass:"scoped-form",attrs:{model:t.formData,rules:t.formRules,"label-width":"150px","label-position":"left",inline:""}},[e("el-row",[e("el-col",{attrs:{span:12}},[e("el-form-item",{attrs:{label:"联系人：",prop:"contact"}},[e("el-input",{attrs:{size:"small"},model:{value:t.formData.contact,callback:function(a){t.formData.contact=a},expression:"formData.contact"}})],1)],1),t._v(" "),e("el-col",{attrs:{span:12}},[e("el-form-item",{attrs:{label:"联系方式：",required:"",prop:"cellphone"}},[e("el-input",{attrs:{size:"small"},model:{value:t.formData.cellphone,callback:function(a){t.formData.cellphone=a},expression:"formData.cellphone"}})],1)],1)],1),t._v(" "),e("el-row",[e("el-col",{attrs:{span:24}},[e("el-form-item",{attrs:{label:"报名截止时间：",prop:"enrollEndDate"}},[e("el-date-picker",{attrs:{type:"datetime",format:"yyyy-MM-dd HH:mm:ss",size:"small"},model:{value:t.formData.enrollEndDate,callback:function(a){t.formData.enrollEndDate=a},expression:"formData.enrollEndDate"}})],1)],1)],1),t._v(" "),e("el-row",[e("el-col",{attrs:{span:24}},[e("el-form-item",{attrs:{label:"活动时间：",required:""}},[e("el-form-item",{attrs:{prop:"activityStartDatetime"}},[e("el-date-picker",{attrs:{type:"datetime",format:"yyyy-MM-dd HH:mm:ss",size:"small"},model:{value:t.formData.activityStartDatetime,callback:function(a){t.formData.activityStartDatetime=a},expression:"formData.activityStartDatetime"}})],1),t._v(" "),e("span",[t._v("—")]),t._v(" "),e("el-form-item",{attrs:{prop:"activityEndDatetime"}},[e("el-date-picker",{attrs:{type:"datetime",format:"yyyy-MM-dd HH:mm:ss",size:"small"},model:{value:t.formData.activityEndDatetime,callback:function(a){t.formData.activityEndDatetime=a},expression:"formData.activityEndDatetime"}})],1)],1)],1)],1),t._v(" "),e("el-row",[e("el-col",{attrs:{span:12}},[e("el-form-item",{attrs:{label:"活动地址：",prop:"address"}},[e("el-input",{attrs:{size:"small"},model:{value:t.formData.address,callback:function(a){t.formData.address=a},expression:"formData.address"}})],1)],1),t._v(" "),e("el-col",{attrs:{span:12}},[e("el-form-item",{attrs:{label:"活动对象：",prop:"target"}},[e("el-input",{attrs:{size:"small"},model:{value:t.formData.target,callback:function(a){t.formData.target=a},expression:"formData.target"}})],1)],1)],1),t._v(" "),e("el-row",[e("el-col",{attrs:{span:24}},[e("el-form-item",{attrs:{label:"活动人数：",required:"",prop:"maxCount"}},[e("el-input",{attrs:{size:"small"},model:{value:t.formData.maxCount,callback:function(a){t.formData.maxCount=a},expression:"formData.maxCount"}})],1)],1)],1),t._v(" "),e("el-row",[e("el-col",{attrs:{span:24}},[e("el-form-item",{attrs:{label:"单个账号报名人数：",prop:"userCountMax",required:""}},[e("el-input",{attrs:{size:"small"},model:{value:t.formData.userCountMax,callback:function(a){t.formData.userCountMax=a},expression:"formData.userCountMax"}})],1)],1)],1),t._v(" "),e("el-row",[e("el-col",{attrs:{span:24}},[e("el-form-item",{attrs:{label:"标题：",prop:"title"}},[e("el-input",{attrs:{size:"small",maxlength:50},model:{value:t.formData.title,callback:function(a){t.formData.title=a},expression:"formData.title"}})],1)],1)],1),t._v(" "),e("el-row",[e("el-col",{attrs:{span:24}},[e("el-form-item",{attrs:{label:"内容：",prop:"content"}},[e("el-input",{attrs:{type:"textarea",size:"small",autosize:{minRows:3},maxlength:500},model:{value:t.formData.content,callback:function(a){t.formData.content=a},expression:"formData.content"}})],1)],1)],1),t._v(" "),e("el-row",[e("el-col",{attrs:{span:24}},[e("el-form-item",{attrs:{label:"上传图片：",prop:"imgList"}},[e("el-upload",{ref:"uploadImg",attrs:{action:"/v1/file","list-type":"picture-card",name:"file",accept:"image/*","file-list":t.initImgList,data:{uploadType:11,fileSuffixType:1},"on-success":t.handleFileUpload,"on-preview":t.handlePictureCardPreview,"on-change":t.handleImgChange,"on-remove":t.handleImgChange,"before-upload":t.handleCheckImgLength}},[e("i",{staticClass:"el-icon-plus"},[e("span",{staticClass:"description"},[t._v("最多上传9张图片")])])])],1)],1)],1),t._v(" "),e("el-form-item",{attrs:{label:" "}},[e("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(a){t.handleAddActivity("formData")}}},[t._v("确定")]),t._v(" "),e("el-button",{attrs:{size:"small"},on:{click:t.handleReturn}},[t._v("返回")])],1)],1),t._v(" "),e("el-dialog",{attrs:{size:"tiny"},model:{value:t.dialogVisible,callback:function(a){t.dialogVisible=a},expression:"dialogVisible"}},[e("img",{attrs:{width:"100%",src:t.dialogImageUrl,alt:""}})])],1)},staticRenderFns:[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"contain-title"},[e("span",[t._v("添加活动")])])}]}},394:function(t,a,e){function r(t){e(1036)}var i=e(65)(e(906),e(1217),r,"data-v-3a0c51df",null);t.exports=i.exports},906:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default={data:function(){var t=function(t,a,e){if(""===a)e(new Error("请输入联系方式"));else{!1===/^1[345789]\d{9}$/.test(a)?e(new Error("请输入正确的手机号")):e()}},a=function(t,a,e){""===a?e(new Error("不能为空")):/^[1-9]\d*$/.test(a)?e():e(new Error("请输入正整数"))};return{dialogVisible:!1,dialogImageUrl:"",initImgList:[],formData:{id:this.$route.query.id,contact:"",cellphone:"",enrollEndDate:"",activityStartDatetime:"",activityEndDatetime:"",address:"",target:"",maxCount:"",userCountMax:"",title:"",content:"",imgList:[]},formRules:{contact:[{required:!0,message:"请输入联系人",trigger:"blur"}],cellphone:[{validator:t,trigger:"blur"}],enrollEndDate:[{type:"date",required:!0,message:"请选择报名截止日期",trigger:"blur"}],activityStartDatetime:[{type:"date",required:!0,message:"请选择活动开始时间",trigger:"blur"}],activityEndDatetime:[{type:"date",required:!0,message:"请选择活动结束时间",trigger:"blur"}],address:[{required:!0,message:"请输入活动地址",trigger:"blur"}],target:[{required:!0,message:"请输入活动对象",trigger:"blur"}],maxCount:[{validator:a,trigger:"blur"}],userCountMax:[{validator:a,trigger:"blur"}],title:[{required:!0,message:"请输入标题",trigger:"blur"}],content:[{required:!0,message:"请输入内容",trigger:"blur"}]}}},methods:{handleFileUpload:function(t,a,e){if(1e4!==t.code||1e4!==t.returnData.subCode)if("E0004"===t.code)this.$router.push("/manageSystem/login");else{this.$alert(t.message,"提示",{confirmButtonText:"确定"});for(var r=0;r<e.length;r++)if(e[r]===a){e.splice(r,1);break}}},handlePictureCardPreview:function(t){this.dialogImageUrl=t.url,this.dialogVisible=!0},handleImgChange:function(t,a){for(var e=[],r=0;r<a.length;r++)"success"===a[r].status&&(!0===Object.prototype.hasOwnProperty.call(a[r],"response")?e.push(a[r].response.returnData.data.filePath):e.push(a[r].urlNoHostname));this.formData.imgList=e},handleCheckImgLength:function(t){return!1===/(.(jpg|gif|jpeg|png))+$/i.test(t.name)?(this.$alert("请上传正确格式的图片","提示"),!1):this.$refs.uploadImg.uploadFiles.length>9?(this.$alert("限上传九张图片","提示"),!1):void 0},handleReturn:function(){this.$router.push("/manageSystem/property/activity")},handleAddActivity:function(t){var a=this;a.$refs[t].validate(function(t){if(!t)return!1;a.$http({url:"/api/manageSystem/system/property/activity/editActivity",method:"patch",data:a.formData}).then(function(t){"00000"===t.data.code&&(a.$message("编辑成功"),a.$router.push("/manageSystem/property/activity"))}).catch(function(t){console.log(t)})})}},mounted:function(){var t=this;this.$http({url:"/api/manageSystem/system/property/activity/getActivityInfo",params:{id:this.$route.query.id}}).then(function(a){if("00000"===a.data.code){for(var e=0;e<a.data.activityInfo.imgList.length;e++){var r={name:"content"+e,url:a.data.activityInfo.imgList[e],urlNoHostname:a.data.activityInfo.imgListNoHostname[e]};t.initImgList.push(r)}t.formData.contact=a.data.activityInfo.contact,t.formData.cellphone=a.data.activityInfo.cellphone,t.formData.enrollEndDate=new Date(a.data.activityInfo.enrollEndDate),t.formData.activityStartDatetime=new Date(a.data.activityInfo.activityStartDatetime),t.formData.activityEndDatetime=new Date(a.data.activityInfo.activityEndDatetime),t.formData.address=a.data.activityInfo.address,t.formData.target=a.data.activityInfo.target,t.formData.maxCount=a.data.activityInfo.maxCountNum,t.formData.userCountMax=a.data.activityInfo.userCountMax,t.formData.title=a.data.activityInfo.title,t.formData.content=a.data.activityInfo.content,t.formData.imgList=a.data.activityInfo.imgListNoHostname}}).catch(function(t){console.log(t)})}}}});