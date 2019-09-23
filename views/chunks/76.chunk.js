webpackJsonp([76],{1054:function(t,e){},1237:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"contain-main"},[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,"label-width":"70px","label-position":"left"}},[a("div",[a("el-form-item",{attrs:{label:"关键字"}},[a("el-input",{attrs:{size:"small"},model:{value:t.formData.keywords,callback:function(e){t.formData.keywords=e},expression:"formData.keywords"}})],1),t._v(" "),a("el-form-item",{attrs:{prop:"date",label:"开始日期"}},[a("el-date-picker",{attrs:{type:"date",placeholder:"请选择开始日期",size:"small"},model:{value:t.formData.startDate,callback:function(e){t.formData.startDate=e},expression:"formData.startDate"}})],1),t._v(" "),a("el-form-item",{attrs:{prop:"date",label:"结束日期"}},[a("el-date-picker",{attrs:{type:"date",placeholder:"请选择结束日期",size:"small"},model:{value:t.formData.endDate,callback:function(e){t.formData.endDate=e},expression:"formData.endDate"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"类型"}},[a("el-select",{attrs:{size:"small"},model:{value:t.formData.type,callback:function(e){t.formData.type=e},expression:"formData.type"}},[a("el-option",{attrs:{value:"",label:"全部"}}),t._v(" "),a("el-option",{attrs:{value:1,label:"服务报事"}}),t._v(" "),a("el-option",{attrs:{value:2,label:"安保报事"}}),t._v(" "),a("el-option",{attrs:{value:3,label:"绿化报事"}}),t._v(" "),a("el-option",{attrs:{value:4,label:"设备报事"}})],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"状态"}},[a("el-select",{attrs:{size:"small"},model:{value:t.formData.status,callback:function(e){t.formData.status=e},expression:"formData.status"}},[a("el-option",{attrs:{value:"",label:"全部"}}),t._v(" "),a("el-option",{attrs:{value:1,label:"处理中"}}),t._v(" "),a("el-option",{attrs:{value:2,label:"处理完成"}})],1)],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",icon:"search",size:"small"},on:{click:t.searchFun}},[t._v("搜索")])],1)],1),t._v(" "),a("el-form-item",[a("el-checkbox",{model:{value:t.formData.belongToMe,callback:function(e){t.formData.belongToMe=e},expression:"formData.belongToMe"}},[t._v("只查看指派给我的")])],1)],1),t._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{stripe:"",data:t.tableData}},[a("el-table-column",{attrs:{prop:"type",label:"报事类型","min-width":"130"}}),t._v(" "),a("el-table-column",{attrs:{prop:"title",label:"标题","min-width":"150"}}),t._v(" "),a("el-table-column",{attrs:{prop:"contactPersonName",label:"联系人","min-width":"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"contactPersonCellphone",label:"联系方式","min-width":"150"}}),t._v(" "),a("el-table-column",{attrs:{prop:"datetime",label:"报事时间","min-width":"180"}}),t._v(" "),a("el-table-column",{attrs:{prop:"status",label:"状态","min-width":"100"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"primary",size:"small",icon:"search"},on:{click:function(a){t.handleReportInfo(e.row)}}},[t._v("详情")])]}}])})],1),t._v(" "),a("div",[a("div",{staticClass:"contain-bottom-pagination"},[a("el-pagination",{staticClass:"fr",attrs:{layout:"sizes, total, prev, pager, next, jumper","current-page":t.pageData.currentPage,total:t.pageData.totalSize,"page-sizes":[10,20,50,100],"page-size":t.pageData.pageSize},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)])],1)},staticRenderFns:[]}},414:function(t,e,a){function r(t){a(1054)}var s=a(65)(a(926),a(1237),r,"data-v-4c13c9fe",null);t.exports=s.exports},785:function(t,e,a){"use strict";function r(t,e){if(""==t||null==t)return"";var a=new Date(t),r=a.getFullYear(),s=a.getMonth()+1<10?"0"+(a.getMonth()+1):a.getMonth()+1,n=a.getDate()<10?"0"+a.getDate():a.getDate(),o=r+"-"+s+"-"+n,l=a.getHours()<10?"0"+a.getHours():a.getHours(),i=a.getMinutes()<10?"0"+a.getMinutes():a.getMinutes(),u=a.getSeconds()<10?"0"+a.getSeconds():a.getSeconds();return"datetime"===e?o=o+" "+l+":"+i+":"+u:"minute"===e&&(o=o+" "+l+":"+i),o}Object.defineProperty(e,"__esModule",{value:!0}),e.transition=r},926:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a(785);e.default={data:function(){return{formData:{keywords:"",startDate:"",endDate:"",belongToMe:!1,status:"",type:""},sendData:{keywords:"",startDate:"",endDate:"",belongToMe:!1,type:"",status:""},tableData:[],pageData:{currentPage:void 0!==this.$route.query.currentPage?parseInt(this.$route.query.currentPage):1,totalSize:1,pageSize:10}}},methods:{watchQueryFun:function(){this.$route.query.currentPage?this.pageData.currentPage=parseInt(this.$route.query.currentPage):this.pageData.currentPage=1,this.ajaxFun()},ajaxFun:function(){var t=this;this.$http({url:"/api/manageSystem/system/property/report/getReportList",params:{keywords:this.sendData.keywords,startDate:(0,r.transition)(this.sendData.startDate),endDate:(0,r.transition)(this.sendData.endDate),belongToMe:this.sendData.belongToMe,status:this.sendData.status?this.sendData.status:"",type:this.sendData.type?this.sendData.type:"",pageNo:this.pageData.currentPage,pageSize:this.pageData.pageSize}}).then(function(e){"00000"===e.data.code&&(t.pageData.totalSize=e.data.count,t.tableData=e.data.reportList)}).catch(function(t){console.log(t)})},handleSizeChange:function(t){this.pageData.pageSize=t,this.$route.query.currentPage?this.$router.push({path:"/manageSystem/property/report"}):this.$router.push({path:"/manageSystem/property/report",query:{currentPage:1}})},handleCurrentChange:function(t){this.$router.push({path:"/manageSystem/property/report",query:{currentPage:t}})},searchFun:function(){this.sendData.keywords=this.formData.keywords,this.sendData.startDate=this.formData.startDate,this.sendData.endDate=this.formData.endDate,this.sendData.belongToMe=this.formData.belongToMe,this.sendData.status=this.formData.status,this.sendData.type=this.formData.type,this.$route.query.currentPage?this.$router.push({path:"/manageSystem/property/report"}):this.$router.push({path:"/manageSystem/property/report",query:{currentPage:1}})},handleReportInfo:function(t){var e=t.id;this.$router.push({path:"/manageSystem/property/report/reportInfo",query:{id:e}})}},mounted:function(){this.watchQueryFun()},watch:{"$route.query.currentPage":function(){this.watchQueryFun()},"formData.belongToMe":function(){this.searchFun()}}}}});