webpackJsonp([105],{1082:function(t,e){},1266:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"submit-list",attrs:{id:"submitlist"}},[a("div",{staticClass:"submit-list-topNav"},[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0}},[a("el-form-item",{attrs:{label:"手机号："}},[a("el-input",{attrs:{placeholder:"请输入关键字",size:"small"},model:{value:t.formData.keywords,callback:function(e){t.formData.keywords=e},expression:"formData.keywords"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"状态："}},[a("el-select",{attrs:{placeholder:"请选择",size:"small"},model:{value:t.formData.status,callback:function(e){t.formData.status=e},expression:"formData.status"}},[a("el-option",{attrs:{label:"全部",value:"0"}}),t._v(" "),a("el-option",{attrs:{label:"未领取",value:"1"}}),t._v(" "),a("el-option",{attrs:{label:"已领取",value:"2"}})],1)],1),t._v(" "),a("el-form-item",[a("el-button",{staticClass:"el-icon-search",attrs:{type:"primary",size:"small"},on:{click:t.Query}},[t._v("查询")]),t._v(" "),a("el-button",{attrs:{type:"danger",size:"small"},on:{click:t.BackToList}},[t._v("问卷列表")])],1)],1)],1),t._v(" "),a("div",{staticClass:"submit-list"},[a("el-table",{staticStyle:{width:"100%"},attrs:{stripe:"",border:"",data:t.tableData}},[a("el-table-column",{attrs:{type:"index",label:"序号",width:"60",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"name",label:"姓名","min-width":"80",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"cellphone",label:"手机号","min-width":"110",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"simpleName",label:"小区","min-width":"150",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"状态","min-width":"100",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-tag",{attrs:{type:1===e.row.status?"danger":"success"}},[t._v(t._s(1===e.row.status?"未领取":"已领取"))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"message",label:"信息","min-width":"100",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"createDatetime",label:"创建时间","min-width":"150",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",width:"80",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(a){t.Exit(e.row)}}},[t._v("编辑")])]}}])})],1)],1),t._v(" "),a("div",{staticStyle:{"padding-top":"20px"}},[a("el-pagination",{staticClass:"fr",attrs:{layout:"total, prev, pager, next, jumper","current-page":t.pageData.currentPage,total:t.pageData.totalSize,"page-size":t.pageData.pageSize},on:{"current-change":t.handleCurrentChange}})],1)])},staticRenderFns:[]}},411:function(t,e,a){function s(t){a(1082)}var n=a(65)(a(923),a(1266),s,null,null);t.exports=n.exports},923:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{formData:{keywords:"",status:"0"},pageData:{currentPage:1,totalSize:0,pageSize:10},tableData:[]}},mounted:function(){this.Get()},methods:{Query:function(){this.Get()},Exit:function(t){var e=this;if(2===t.status)return void this.$message({type:"warning",message:"已经使用，无法修改"});this.$confirm("此操作将会修改该条列表的状态, 是否继续?","消息提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.$http({url:"/api/manageSystem/system/property/questionnaire/updateStatus",method:"patch",data:{id:t.id}}).then(function(t){"00000"===t.data.code?(e.$message({type:"success",message:"操作成功"}),e.Get()):e.$message({type:"danger",message:"操作失败"})}).catch(function(t){e.$message({type:"danger",message:"操作失败"})})}).catch(function(){})},handleCurrentChange:function(t){this.pageData.currentPage=t,this.Get()},BackToList:function(){this.$router.push({path:"/manageSystem/property/questionnaire"})},Get:function(){var t=this,e={pageNo:this.pageData.currentPage,pageSize:this.pageData.pageSize,id:this.$route.query.id,status:+this.formData.status};Boolean(this.formData.keywords)?e.keywords=this.formData.keywords:e.keywords="",this.$http({url:"/api/manageSystem/system/property/questionnaire/getQuestionnaireUserList",params:e}).then(function(e){if("00000"===e.data.code){var a=e.data;t.pageData.totalSize=a.count,t.tableData=a.userList}}).catch(function(t){})}}}}});