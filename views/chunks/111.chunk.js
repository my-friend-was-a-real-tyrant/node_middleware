webpackJsonp([111],{1050:function(e,t){},1232:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"contain-main"},[e._m(0),e._v(" "),a("el-form",{ref:"finishComplaintForm",staticClass:"scoped-form",attrs:{"label-width":"90px","label-position":"left",model:e.finishComplaintFormData,rules:e.finishComplaintFormRules}},[a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"编号："}},[a("span",[e._v(e._s(e.info.number))])])],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"类型"}},[a("span",[e._v(e._s(e.info.type))])])],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"状态"}},[a("span",[e._v(e._s(e.info.status))])])],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"发布人"}},[a("span",[e._v(e._s(e.info.userName))])])],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"联系方式"}},[a("span",[e._v(e._s(e.info.userCellphone))])])],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"发布时间"}},[a("span",[e._v(e._s(e.info.date))])])],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"发布人地址"}},[a("span",[e._v(e._s(e.info.address))])])],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"标题"}},[a("span",[e._v(e._s(e.info.title))])]),e._v(" "),a("el-form-item",{attrs:{label:"内容"}},[a("pre",[e._v(e._s(e.info.description))])]),e._v(" "),""!==e.info.img?a("el-form-item",{attrs:{label:"附图"}},[a("img",{staticClass:"repairmentInfo-img",staticStyle:{"{ max-width":"200px"},attrs:{src:e.info.img},on:{click:function(t){e.handleBigImage(e.info.img)}}})]):e._e(),e._v(" "),"投诉"===e.info.type&&1===e.info.statusCode?a("el-form-item",{attrs:{label:"完成备注",prop:"remark"}},[a("el-input",{model:{value:e.finishComplaintFormData.remark,callback:function(t){e.finishComplaintFormData.remark=t},expression:"finishComplaintFormData.remark"}})],1):e._e(),e._v(" "),a("el-form-item",[1===e.info.statusCode&&1===e.info.typeForApp?a("el-button",{directives:[{name:"permit",rawName:"v-permit",value:1202,expression:"1202"}],attrs:{type:"primary",size:"small"},on:{click:e.handleAppointTask}},[e._v("转派")]):e._e(),e._v(" "),1===e.info.statusCode&&1===e.info.typeForApp?a("el-button",{directives:[{name:"permit",rawName:"v-permit",value:1202,expression:"1202"}],attrs:{type:"primary",size:"small"},on:{click:e.handleFinishComplaint}},[e._v("处理完成")]):e._e(),e._v(" "),1===e.info.statusCode&&1===e.info.typeForApp?a("el-button",{directives:[{name:"permit",rawName:"v-permit",value:-1,expression:"-1"}],attrs:{type:"primary",size:"small"},on:{click:e.handleChangeComplaintType}},[e._v("转为报事")]):e._e(),e._v(" "),a("el-button",{attrs:{size:"small"},on:{click:e.handleCancel}},[e._v("返回")])],1)],1),e._v(" "),e._m(1),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{stripe:"",data:e.info.operationRecordsList}},[a("el-table-column",{attrs:{prop:"event",label:"事件","min-width":"100"}}),e._v(" "),a("el-table-column",{attrs:{prop:"operation",label:"操作内容","min-width":"150"}}),e._v(" "),a("el-table-column",{attrs:{prop:"remark",label:"备注信息","min-width":"150"}}),e._v(" "),a("el-table-column",{attrs:{prop:"operator",label:"操作人","min-width":"160"}}),e._v(" "),a("el-table-column",{attrs:{prop:"operateDatetime",label:"操作时间","min-width":"150"}})],1),e._v(" "),a("el-dialog",{attrs:{title:"转为报事",visible:e.changeComplaintTypeDialogVisible,size:"small"},on:{"update:visible":function(t){e.changeComplaintTypeDialogVisible=t},close:e.handleResetChangeComplaintType}},[a("el-form",{ref:"changeComplaintTypeForm",attrs:{model:e.changeComplaintTypeFormData,rules:e.changeComplaintTypeFormRules}},[a("el-form-item",{attrs:{prop:"remark"}},[a("el-input",{attrs:{placeholder:"请填写备注"},model:{value:e.changeComplaintTypeFormData.remark,callback:function(t){e.changeComplaintTypeFormData.remark=t},expression:"changeComplaintTypeFormData.remark"}})],1),e._v(" "),a("el-form-item",{attrs:{prop:"report"}},[a("el-select",{style:{width:"100%"},attrs:{filterable:"",placeholder:"请选择报事类型"},model:{value:e.changeComplaintTypeFormData.report,callback:function(t){e.changeComplaintTypeFormData.report=t},expression:"changeComplaintTypeFormData.report"}},[a("el-option",{attrs:{value:1,label:"服务报事"}}),e._v(" "),a("el-option",{attrs:{value:2,label:"安保报事"}}),e._v(" "),a("el-option",{attrs:{value:3,label:"绿化报事"}}),e._v(" "),a("el-option",{attrs:{value:4,label:"设备报事"}})],1)],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",slot:"footer"},[a("el-button",{on:{click:e.handleCloseChangeComplaintType}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.handleSubmitChangeComplaintType}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"转派任务",visible:e.appointTaskDialogVisible,size:"small"},on:{"update:visible":function(t){e.appointTaskDialogVisible=t},close:e.handleResetAppointTask}},[a("el-form",{ref:"appointTaskForm",attrs:{model:e.appointTaskFormData,rules:e.appointTaskFormRules}},[a("el-form-item",{attrs:{prop:"remark"}},[a("el-input",{attrs:{placeholder:"请填写转派备注"},model:{value:e.appointTaskFormData.remark,callback:function(t){e.appointTaskFormData.remark=t},expression:"appointTaskFormData.remark"}})],1),e._v(" "),a("el-form-item",{attrs:{prop:"manager"}},[a("el-select",{style:{width:"100%"},attrs:{filterable:"",placeholder:"请选择要指派的人员"},model:{value:e.appointTaskFormData.manager,callback:function(t){e.appointTaskFormData.manager=t},expression:"appointTaskFormData.manager"}},e._l(e.appointTaskManagerList,function(e){return a("el-option",{key:e.value,attrs:{value:e.value,label:e.label}})}))],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",slot:"footer"},[a("el-button",{on:{click:e.handleCloseAppointTask}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.handleSubmitAppointTask}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{attrs:{size:"tiny"},model:{value:e.bigImgVisible,callback:function(t){e.bigImgVisible=t},expression:"bigImgVisible"}},[a("img",{attrs:{width:"100%",src:e.bigImageUrl,alt:""}})])],1)},staticRenderFns:[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"contain-title"},[a("span",[e._v("投诉表扬详情")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"contain-title"},[a("span",[e._v("操作记录")])])}]}},400:function(e,t,a){function i(e){a(1050)}var o=a(65)(a(912),a(1232),i,"data-v-462c8fbb",null);e.exports=o.exports},912:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{info:{type:"",status:"",address:"",title:"",date:"",description:"",img:"",userName:"",userCellphone:"",operationRecordsList:[]},finishComplaintFormData:{remark:""},finishComplaintFormRules:{remark:[{required:!0,message:"请填写备注",trigger:"blur"}]},changeComplaintTypeDialogVisible:!1,changeComplaintTypeFormData:{remark:"",report:""},changeComplaintTypeFormRules:{remark:[{required:!0,message:"请填写备注",trigger:"blur"}],report:[{type:"number",required:!0,message:"请选择报事类型",trigger:"blur"}]},appointTaskManagerList:[],appointTaskDialogVisible:!1,appointTaskFormData:{remark:"",manager:""},appointTaskFormRules:{remark:[{required:!0,message:"请填写备注",trigger:"blur"}],manager:[{type:"number",required:!0,message:"请选择指派人员",trigger:"blur"}]},bigImgVisible:!1,bigImageUrl:""}},methods:{handleDelete:function(){var e=this;e.$http({url:"/api/manageSystem/system/property/complaint/deleteComplaint",method:"delete",params:{id:e.$route.query.id}}).then(function(t){"00000"===t.data.code&&(e.$message("删除成功"),e.$router.push("/manageSystem/property/complaint"))}).catch(function(e){console.log(e)})},handleFinishComplaint:function(){var e=this;e.$refs.finishComplaintForm.validate(function(t){if(!t)return!1;e.$http({url:"/api/manageSystem/system/property/complaint/finishComplaint",method:"patch",data:{id:e.$route.query.id,remark:e.finishComplaintFormData.remark}}).then(function(t){"00000"===t.data.code&&(e.$message("处理成功"),e.$router.push("/manageSystem/property/complaint"))}).catch(function(e){console.log(e)})})},handleResetChangeComplaintType:function(){this.$refs.changeComplaintTypeForm.resetFields()},handleCloseChangeComplaintType:function(){this.changeComplaintTypeDialogVisible=!1},handleSubmitChangeComplaintType:function(){var e=this;e.$refs.changeComplaintTypeForm.validate(function(t){if(!t)return!1;e.$http({url:"/api/manageSystem/system/property/complaint/changeComplaintType",method:"patch",data:{id:e.$route.query.id,remark:e.changeComplaintTypeFormData.remark,report:e.changeComplaintTypeFormData.report}}).then(function(t){"00000"===t.data.code&&(e.$message("处理成功"),e.$router.push("/manageSystem/property/complaint"))}).catch(function(e){console.log(e)})})},handleChangeComplaintType:function(){this.changeComplaintTypeDialogVisible=!0},handleResetAppointTask:function(){this.$refs.appointTaskForm.resetFields()},handleCloseAppointTask:function(){this.appointTaskDialogVisible=!1},handleSubmitAppointTask:function(){var e=this;e.$refs.appointTaskForm.validate(function(t){if(!t)return!1;e.$http({url:"/api/manageSystem/system/property/complaint/appointTask",method:"patch",data:{id:e.$route.query.id,remark:e.appointTaskFormData.remark,manager:e.appointTaskFormData.manager}}).then(function(t){"00000"===t.data.code&&(e.$message("转派成功"),e.$router.push("/manageSystem/property/complaint"))}).catch(function(e){console.log(e)})})},handleAppointTask:function(){this.appointTaskDialogVisible=!0},handleCancel:function(){this.$router.push("/manageSystem/property/complaint")},handleBigImage:function(e){this.bigImageUrl=e,this.bigImgVisible=!0}},mounted:function(){var e=this;this.$http({url:"/api/manageSystem/system/property/complaint/getComplaintInfo",params:{id:this.$route.query.id}}).then(function(t){"00000"===t.data.code&&(e.info=t.data.repairmentInfo)}).catch(function(e){console.log(e)}),this.$http({url:"/api/manageSystem/system/property/complaint/getAppointTaskManagerList"}).then(function(t){"00000"===t.data.code&&(e.appointTaskManagerList=t.data.managerList)}).catch(function(e){console.log(e)})}}}});