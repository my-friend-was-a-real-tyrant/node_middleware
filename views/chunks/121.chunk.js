webpackJsonp([121],{1063:function(e,a){},1248:function(e,a){e.exports={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"contain-main"},[e._m(0),e._v(" "),t("el-form",{ref:"formData",staticClass:"scoped-form",attrs:{"label-width":"100px","label-position":"left"}},[t("el-form-item",{attrs:{label:"姓名"}},[t("span",[e._v(e._s(e.info.managerName))])]),e._v(" "),t("el-form-item",{attrs:{label:"联系方式"}},[t("span",[e._v(e._s(e.info.managerCellphone))])]),e._v(" "),t("el-form-item",{attrs:{label:"状态"}},[t("span",[e._v(e._s(e.info.status))])]),e._v(" "),t("el-form-item",{attrs:{label:"权限"}},e._l(e.info.permissions,function(a){return t("ol",{key:a.id,staticClass:"clearFix"},[t("p",{staticClass:"scoped-li fl",staticStyle:{"list-style":"none"}},[e._v(e._s(a.name)+"：")]),e._v(" "),e._l(a.children,function(a){return t("li",{key:a.id,staticClass:"scoped-li fl"},[e._v(e._s(a.name))])})],2)})),e._v(" "),t("div",{staticClass:"clearFix"},e._l(e.info.departmentList,function(a){return t("div",{key:a.id,staticClass:"scoped-department fl"},[t("el-form-item",{attrs:{label:"部门"}},[t("span",[e._v(e._s(a.manager?"无":a.departmentName))])]),e._v(" "),t("el-form-item",{attrs:{label:"职位"}},[t("span",[e._v(e._s(a.manager?"园区经理":1===a.job?"经理":"员工"))])])],1)})),e._v(" "),t("el-form-item",[t("el-button",{directives:[{name:"permit",rawName:"v-permit",value:302,expression:"302"}],attrs:{type:"primary",icon:"edit",size:"small"},on:{click:e.handleEditManager}},[e._v("编辑")]),e._v(" "),t("el-button",{directives:[{name:"permit",rawName:"v-permit",value:304,expression:"304"}],attrs:{icon:"my-businesscard",size:"small"},on:{click:e.handleEditManagerDepartment}},[e._v("分配部门")]),e._v(" "),t("el-button",{attrs:{size:"small"},on:{click:e.handleCancel}},[e._v("返回")])],1)],1)],1)},staticRenderFns:[function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"contain-title"},[t("span",[e._v("员工信息")])])}]}},390:function(e,a,t){function n(e){t(1063)}var s=t(65)(t(901),t(1248),n,"data-v-58102ff2",null);e.exports=s.exports},901:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default={data:function(){return{info:{managerName:"",managerCellphone:"",status:"",departmentList:[]}}},methods:{handleEditManager:function(){this.$router.push({path:"/manageSystem/manager/manager/editManager",query:{managerId:this.$route.query.managerId}})},handleEditManagerDepartment:function(){this.$router.push({path:"/manageSystem/manager/manager/editManagerDepartment",query:{id:this.$route.query.managerId}})},handleCancel:function(){this.$router.push("/manageSystem/manager/manager")}},mounted:function(){var e=this;this.$http({url:"/api/manageSystem/system/manager/manager/getManagerInfo",params:{managerId:this.$route.query.managerId}}).then(function(a){"00000"===a.data.code&&(e.info.managerName=a.data.managerName,e.info.managerCellphone=a.data.managerCellphone,e.info.status=a.data.isLockedWord,e.info.departmentList=a.data.eipList,e.info.permissions=a.data.permissions)}).catch(function(e){console.log(e)})}}}});