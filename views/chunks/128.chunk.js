webpackJsonp([128],{1052:function(e,t){},1235:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"contain-main"},[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0}},[a("el-form-item",[a("el-button",{directives:[{name:"permit",rawName:"v-permit",value:201,expression:"201"}],attrs:{type:"primary",icon:"my-add",size:"small"},on:{click:e.handleAddDepartment}},[e._v("添加部门")])],1)],1),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{stripe:"",data:e.tableData}},[a("el-table-column",{attrs:{type:"expand"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-form",{staticClass:"demo-table-expand",attrs:{"label-position":"left",inline:""}},[a("el-form-item",{attrs:{label:"权限："}},[a("p",e._l(t.row.permissionsGroup,function(t){return a("ol",{key:t.id,staticClass:"clearFix"},[a("p",{staticClass:"fl"},[e._v(e._s(t.name)+"：")]),e._v(" "),e._l(t.children,function(t){return a("li",{key:t.id,staticClass:"fl scoped-li"},[e._v(e._s(t.name))])})],2)}))])],1)]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"park",label:"园区",width:"150"}}),e._v(" "),a("el-table-column",{attrs:{prop:"department",label:"部门","min-width":"150"}}),e._v(" "),a("el-table-column",{attrs:{prop:"description",label:"描述","min-width":"250"}}),e._v(" "),a("el-table-column",{attrs:{label:"操作","min-width":"280"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{directives:[{name:"permit",rawName:"v-permit",value:202,expression:"202"}],attrs:{type:"primary",size:"small",icon:"edit"},on:{click:function(a){e.handleEditDepartment(t.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{directives:[{name:"permit",rawName:"v-permit",value:203,expression:"203"}],attrs:{type:"danger",size:"small",icon:"delete"},on:{click:function(a){e.handleDeleteDepartment(t.row)}}},[e._v("删除")])]}}])})],1),e._v(" "),a("div",[a("div",{staticClass:"contain-bottom-pagination"},[a("el-pagination",{staticClass:"fr",attrs:{layout:"sizes, total, prev, pager, next, jumper","current-page":e.pageData.currentPage,total:e.pageData.totalSize,"page-sizes":[10,20,50,100],"page-size":e.pageData.pageSize},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)])],1)},staticRenderFns:[]}},382:function(e,t,a){function n(e){a(1052)}var r=a(65)(a(893),a(1235),n,"data-v-47e1b4d4",null);e.exports=r.exports},893:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{formData:{keywords:""},sendData:{keywords:""},tableData:[],pageData:{currentPage:void 0!==this.$route.query.currentPage?parseInt(this.$route.query.currentPage):1,totalSize:1,pageSize:10}}},methods:{watchQueryFun:function(){this.$route.query.currentPage?this.pageData.currentPage=parseInt(this.$route.query.currentPage):this.pageData.currentPage=1,this.ajaxFun()},ajaxFun:function(){var e=this;this.$http({url:"/api/manageSystem/system/manager/department/getDepartmentList",params:{keywords:this.sendData.keywords,pageNo:this.pageData.currentPage,pageSize:this.pageData.pageSize}}).then(function(t){"00000"===t.data.code&&(e.pageData.totalSize=t.data.count,e.tableData=t.data.departmentList)}).catch(function(e){console.log(e)})},handleSizeChange:function(e){this.pageData.pageSize=e,this.$route.query.currentPage?this.$router.push({path:"/manageSystem/manager/department"}):this.$router.push({path:"/manageSystem/manager/department",query:{currentPage:1}})},handleCurrentChange:function(e){this.$router.push({path:"/manageSystem/manager/department",query:{currentPage:e}})},searchFun:function(){this.sendData.keywords=this.formData.keywords,this.$route.query.currentPage?this.$router.push({path:"/manageSystem/manager/department"}):this.$router.push({path:"/manageSystem/manager/department",query:{currentPage:1}})},handleAddDepartment:function(){this.$router.push("/manageSystem/manager/department/addDepartment")},handleEditDepartment:function(e){var t=e.id;this.$router.push({path:"/manageSystem/manager/department/editDepartment",query:{id:t}})},handleDeleteDepartment:function(e){var t=this,a=e.id;this.$confirm("此操作将永久删除该部门, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$http({url:"/api/manageSystem/system/manager/department/deleteDepartment",params:{id:a},method:"delete"}).then(function(e){"00000"===e.data.code&&(t.$message({type:"success",message:"删除成功!"}),t.searchFun())}).catch(function(e){console.log(e)})})}},mounted:function(){this.watchQueryFun()},watch:{"$route.query.currentPage":function(){this.watchQueryFun()}}}}});