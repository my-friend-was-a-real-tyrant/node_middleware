webpackJsonp([80],{1001:function(e,t){},1178:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"contain-main"},[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0}},[a("div",[a("el-form-item",{staticClass:"order-serial-number"},[a("el-input",{attrs:{size:"small",icon:"my-order",placeholder:"订单编号"},model:{value:e.formData.orderSerialNumber,callback:function(t){e.formData.orderSerialNumber=t},expression:"formData.orderSerialNumber"}})],1),e._v(" "),a("el-form-item",[a("el-select",{attrs:{size:"small",placeholder:"订单状态"},model:{value:e.formData.status,callback:function(t){e.formData.status=t},expression:"formData.status"}},[a("el-option",{attrs:{label:"全部状态",value:""}}),e._v(" "),a("el-option",{attrs:{label:"待支付",value:1}}),e._v(" "),a("el-option",{attrs:{label:"已支付",value:2}}),e._v(" "),a("el-option",{attrs:{label:"已发货",value:3}}),e._v(" "),a("el-option",{attrs:{label:"已完成",value:4}}),e._v(" "),a("el-option",{attrs:{label:"已成团",value:6}}),e._v(" "),a("el-option",{attrs:{label:"已取消",value:8}}),e._v(" "),a("el-option",{attrs:{label:"已关闭",value:9}})],1)],1),e._v(" "),a("el-form-item",[a("el-input",{attrs:{size:"small",icon:"my-addressbook_fill",placeholder:"收件人姓名"},model:{value:e.formData.receiverName,callback:function(t){e.formData.receiverName=t},expression:"formData.receiverName"}})],1),e._v(" "),a("el-form-item",[a("el-input",{attrs:{size:"small",icon:"my-mobile",placeholder:"收件人手机号"},model:{value:e.formData.receiverCellphone,callback:function(t){e.formData.receiverCellphone=t},expression:"formData.receiverCellphone"}})],1),e._v(" "),a("el-form-item",[a("el-date-picker",{attrs:{size:"small",type:"datetime",format:"yyyy-MM-dd HH:mm:ss",placeholder:"最早下单时间"},model:{value:e.formData.earliestPurchaseDatetime,callback:function(t){e.formData.earliestPurchaseDatetime=t},expression:"formData.earliestPurchaseDatetime"}}),e._v(" "),a("span",[e._v("-")]),e._v(" "),a("el-date-picker",{attrs:{size:"small",type:"datetime",format:"yyyy-MM-dd HH:mm:ss",placeholder:"最晚下单时间"},model:{value:e.formData.latestPurchaseDatetime,callback:function(t){e.formData.latestPurchaseDatetime=t},expression:"formData.latestPurchaseDatetime"}})],1),e._v(" "),a("el-form-item",[a("el-input",{attrs:{size:"small",placeholder:"商品名称"},model:{value:e.formData.name,callback:function(t){e.formData.name=t},expression:"formData.name"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",icon:"search",size:"small"},on:{click:e.searchFun}},[e._v("搜索")])],1),e._v(" "),a("el-form-item",[a("el-button",{directives:[{name:"permit",rawName:"v-permit",value:3202,expression:"3202"}],staticClass:"import-wrapper",attrs:{size:"small"}},[a("span",[e._v("导入物流信息")]),e._v(" "),a("form",{attrs:{id:"import-form"}},[a("input",{staticClass:"import",attrs:{type:"file",accept:"application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",id:"import"},on:{change:e.handleUploadExcel}})])]),e._v(" "),a("el-button",{staticClass:"import-wrapper",attrs:{size:"small"},on:{click:e.exportOrder}},[a("span",[e._v("导出订单信息")])])],1)],1),e._v(" "),a("div",[a("el-form-item",{attrs:{label:"排序规则"}},[a("el-radio-group",{on:{change:e.searchFun},model:{value:e.formData.sortRule,callback:function(t){e.formData.sortRule=t},expression:"formData.sortRule"}},[a("el-radio",{attrs:{label:1}},[e._v("按下单时间升序")]),e._v(" "),a("el-radio",{attrs:{label:2}},[e._v("按下单时间降序")])],1)],1)],1)]),e._v(" "),a("el-table",{ref:"tableData",staticStyle:{width:"100%"},attrs:{stripe:"",data:e.tableData},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"expand"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-form",{staticClass:"demo-table-expand",attrs:{"label-position":"left"}},[a("el-form-item",{attrs:{label:"收货人姓名："}},[a("p",[a("span",[e._v(e._s(t.row.receiverName))])])]),e._v(" "),a("el-form-item",{attrs:{label:"收货人手机号："}},[a("p",[a("span",[e._v(e._s(t.row.receiverCellphone))])])]),e._v(" "),a("el-form-item",{attrs:{label:"收货人地址："}},[a("p",[a("span",[e._v(e._s(t.row.receiverAddress))])])]),e._v(" "),t.row.expressCompany?a("el-form-item",{attrs:{label:"物流公司："}},[a("p",[a("span",[e._v(e._s(t.row.expressCompany))])])]):e._e(),e._v(" "),t.row.expressNumber?a("el-form-item",{attrs:{label:"物流单号："}},[a("p",[a("span",[e._v(e._s(t.row.expressNumber))])])]):e._e()],1)]}}])}),e._v(" "),e.isselect?a("el-table-column",{attrs:{type:"selection",width:"55"}}):e._e(),e._v(" "),a("el-table-column",{attrs:{prop:"serialNumber",label:"订单编号","min-width":"180"}}),e._v(" "),a("el-table-column",{attrs:{prop:"name",label:"商品名","min-width":"180"}}),e._v(" "),a("el-table-column",{attrs:{prop:"amount",label:"订单金额(元)","min-width":"100"}}),e._v(" "),a("el-table-column",{attrs:{prop:"status",label:"状态","min-width":"130"}}),e._v(" "),a("el-table-column",{attrs:{label:"下单时间","min-width":"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-icon",{attrs:{name:"time"}}),e._v(" "),a("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.createDatetime))])]}}])})],1),e._v(" "),a("div",[a("div",{staticClass:"contain-bottom-pagination"},[a("el-pagination",{staticClass:"fr",attrs:{layout:"sizes, total, prev, pager, next, jumper","current-page":e.pageData.currentPage,total:e.pageData.totalSize,"page-sizes":[10,20,50,100],"page-size":e.pageData.pageSize},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)]),e._v(" "),a("div",[e.isselect?a("el-button",{attrs:{type:"danger",size:"small"},on:{click:e.export2Excel}},[e._v("确定")]):e._e(),e._v(" "),e.isselect?a("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.cancelFun}},[e._v("取消")]):e._e()],1)],1)},staticRenderFns:[]}},380:function(e,t,a){function r(e){a(1001)}var s=a(65)(a(891),a(1178),r,null,null);e.exports=s.exports},785:function(e,t,a){"use strict";function r(e,t){if(""==e||null==e)return"";var a=new Date(e),r=a.getFullYear(),s=a.getMonth()+1<10?"0"+(a.getMonth()+1):a.getMonth()+1,l=a.getDate()<10?"0"+a.getDate():a.getDate(),i=r+"-"+s+"-"+l,n=a.getHours()<10?"0"+a.getHours():a.getHours(),o=a.getMinutes()<10?"0"+a.getMinutes():a.getMinutes(),c=a.getSeconds()<10?"0"+a.getSeconds():a.getSeconds();return"datetime"===t?i=i+" "+n+":"+o+":"+c:"minute"===t&&(i=i+" "+n+":"+o),i}Object.defineProperty(t,"__esModule",{value:!0}),t.transition=r},891:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a(785);t.default={data:function(){return{excelUrl:"",isselect:!1,multipleSelection:[],formData:{orderSerialNumber:"",receiverName:"",receiverCellphone:"",purchaserName:"",purchaserCellphone:"",earliestPurchaseDatetime:"",latestPurchaseDatetime:"",sortRule:1,status:"",name:""},sendData:{orderSerialNumber:"",receiverName:"",receiverCellphone:"",purchaserName:"",purchaserCellphone:"",earliestPurchaseDatetime:"",latestPurchaseDatetime:"",sortRule:1,status:"",name:""},tableData:[],pageData:{currentPage:void 0!==this.$route.query.currentPage?parseInt(this.$route.query.currentPage):1,totalSize:1,pageSize:10}}},methods:{export2Excel:function(){var e=this;a.e(142).then(function(){var t=a(998),r=t.export_json_to_excel,s=["订单金额","收件手机号","收件人姓氏","订单编号","订单状态"],l=["amount","receiverCellphone","receiverName","serialNumber","status"],i=e.multipleSelection;r(s,e.formatJson(l,i),"列表excel"),e.downloadLoading=!1}.bind(null,a)).catch(a.oe)},formatJson:function(e,t){return t.map(function(t){return e.map(function(e){return t[e]})})},handleSelectionChange:function(e){this.multipleSelection=e},cancelFun:function(){this.multipleSelection=[],this.$refs.tableData.clearSelection(),this.isselect=!1},exportOrder:function(){this.isselect=!0},watchQueryFun:function(){this.$route.query.currentPage?this.pageData.currentPage=parseInt(this.$route.query.currentPage):this.pageData.currentPage=1,this.ajaxFun()},ajaxFun:function(){var e=this;this.$http({url:"/api/manageSystem/system/mall/order/getOrderList",params:{name:this.sendData.name,orderSerialNumber:this.sendData.orderSerialNumber,receiverName:this.sendData.receiverName,receiverCellphone:this.sendData.receiverCellphone,purchaserName:this.sendData.purchaserName,purchaserCellphone:this.sendData.purchaserCellphone,earliestPurchaseDatetime:(0,r.transition)(this.sendData.earliestPurchaseDatetime),latestPurchaseDatetime:(0,r.transition)(this.sendData.latestPurchaseDatetime),sortRule:this.sendData.sortRule,status:this.sendData.status,pageNo:this.pageData.currentPage,pageSize:this.pageData.pageSize}}).then(function(t){"00000"===t.data.code&&(e.pageData.totalSize=t.data.count,e.tableData=t.data.orderList)}).catch(function(e){console.log(e)})},handleSizeChange:function(e){this.pageData.pageSize=e,this.$route.query.currentPage?this.$router.push({path:"/manageSystem/mall/order"}):this.$router.push({path:"/manageSystem/mall/order",query:{currentPage:1}})},handleCurrentChange:function(e){this.$router.push({path:"/manageSystem/mall/order",query:{currentPage:e}})},searchFun:function(){this.sendData.name=this.formData.name,this.sendData.orderSerialNumber=this.formData.orderSerialNumber,this.sendData.receiverName=this.formData.receiverName,this.sendData.receiverCellphone=this.formData.receiverCellphone,this.sendData.purchaserName=this.formData.purchaserName,this.sendData.purchaserCellphone=this.formData.purchaserCellphone,this.sendData.earliestPurchaseDatetime=this.formData.earliestPurchaseDatetime,this.sendData.latestPurchaseDatetime=this.formData.latestPurchaseDatetime,this.sendData.sortRule=this.formData.sortRule,this.sendData.status=this.formData.status,this.$route.query.currentPage?this.$router.push({path:"/manageSystem/mall/order"}):this.$router.push({path:"/manageSystem/mall/order",query:{currentPage:1}})},handleUploadExcel:function(){var e=this;if(!1===/(.(xls|xlsx))+$/i.test(document.getElementById("import").files[0].name))return this.$alert("请导入文件类型为excel格式的表格文件。","提示"),!1;var t=new FormData;t.append("file",document.getElementById("import").files[0]),t.append("uploadType",11),t.append("fileSuffixType",11),this.$http({url:"/v1/file",method:"post",data:t}).then(function(t){document.getElementById("import-form").reset(),1e4===t.data.code&&1e4===t.data.returnData.subCode&&(e.excelUrl=t.data.returnData.data.filePath,e.handleImportOrder())}).catch(function(e){console.log(e)})},handleImportOrder:function(){var e=this;this.$http({url:"/api/manageSystem/system/mall/order/importOrder",method:"post",data:{filePath:this.excelUrl}}).then(function(t){"00000"===t.data.code&&e.$message({message:"导入成功",type:"success"})}).catch(function(e){console.log(e)})}},mounted:function(){this.watchQueryFun()},watch:{"$route.query.currentPage":function(){this.watchQueryFun()}}}}});