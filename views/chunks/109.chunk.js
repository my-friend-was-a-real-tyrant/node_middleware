webpackJsonp([109],{1008:function(t,e){},1185:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"contain-main"},[t._m(0),t._v(" "),n("el-form",{ref:"formData",staticClass:"scoped-form",attrs:{"label-width":"120px","label-position":"left"}},[n("el-form-item",{attrs:{label:"组名称"}},[n("el-input",{model:{value:t.groupForm.name,callback:function(e){t.groupForm.name=e},expression:"groupForm.name"}}),t._v(" "),n("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.handleAddContact}},[t._v("添加常用电话")])],1),t._v(" "),n("div",{staticClass:"clearFix"},t._l(t.contactList,function(e,a){return n("div",{key:a,staticClass:"fl scoped-contact"},[n("el-form-item",{attrs:{label:"联系名称"}},[n("el-input",{model:{value:e.name,callback:function(t){e.name=t},expression:"contact.name"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"联系方式"}},[n("el-input",{model:{value:e.cellphone,callback:function(t){e.cellphone=t},expression:"contact.cellphone"}})],1),t._v(" "),n("el-button",{staticClass:"fl",attrs:{type:"danger",size:"small"},on:{click:function(e){t.handleDeleteContact(a)}}},[t._v("删除")])],1)})),t._v(" "),n("el-form-item",[n("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.handleSubmit}},[t._v("提交")]),t._v(" "),n("el-button",{attrs:{type:"danger",size:"small"},on:{click:t.handleCancel}},[t._v("返回")])],1)],1)],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"contain-title"},[n("span",[t._v("添加组")])])}]}},402:function(t,e,n){function a(t){n(1008)}var o=n(65)(n(914),n(1185),a,"data-v-07666578",null);t.exports=o.exports},914:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{groupForm:{name:""},contactList:[]}},methods:{handleCancel:function(){this.$router.push("/manageSystem/property/frequentlyPhone")},handleAddContact:function(){this.contactList.push({cellphone:"",name:""})},handleDeleteContact:function(t){var e=this;this.$confirm("您确定删除该条联系方式吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.contactList.splice(t,1)})},addGroup:function(){return this.$http({url:"/api/manageSystem/system/property/frequentlyPhone/addFrequentlyPhoneGroup",method:"post",data:{name:this.groupForm.name}})},addContact:function(t){return this.$http({url:"/api/manageSystem/system/property/frequentlyPhone/addFrequentlyPhoneContact",method:"post",data:{id:t,contactList:this.contactList}})},handleSubmit:function(){var t=this,e="";this.addGroup().then(function(n){return"00000"===n.data.code&&(e=n.data.id,t.addContact(e))}).then(function(n){"00000"===n.data.code?(t.$message("新建成功"),t.$router.push("/manageSystem/property/frequentlyPhone")):t.handleDeleteGroup(e)}).catch(function(t){console.log(t)})},handleDeleteGroup:function(t){this.$http({url:"/api/manageSystem/system/property/frequentlyPhone/deleteFrequentlyPhoneGroup",method:"delete",params:{id:t}})}}}}});