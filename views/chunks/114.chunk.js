webpackJsonp([114],{1035:function(e,t){},1216:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"contain-main"},[e._m(0),e._v(" "),n("el-form",{staticClass:"scoped-form",attrs:{"label-width":"120px","label-position":"left"}},[n("el-row",[n("el-col",{attrs:{span:8}},[n("el-form-item",{attrs:{label:"发布人："}},[n("span",[e._v(e._s(e.info.issuer))])])],1),e._v(" "),n("el-col",{attrs:{span:8}},[n("el-form-item",{attrs:{label:"发布日期："}},[n("span",[e._v(e._s(e.info.releaseDate))])])],1),e._v(" "),n("el-col",{attrs:{span:8}},[n("el-form-item",{attrs:{label:"编号："}},[n("span",[e._v(e._s(e.info.announcementNumber))])])],1)],1),e._v(" "),n("el-row",[n("el-col",{attrs:{span:8}},[n("el-form-item",{attrs:{label:"联系人："}},[n("span",[e._v(e._s(e.info.contact))])])],1),e._v(" "),n("el-col",{attrs:{span:8}},[n("el-form-item",{attrs:{label:"联系方式："}},[n("span",[e._v(e._s(e.info.cellphone))])])],1)],1),e._v(" "),n("el-row",[n("el-col",{attrs:{span:24}},[n("el-form-item",{attrs:{label:"标题："}},[n("span",[e._v(e._s(e.info.title))])])],1)],1),e._v(" "),n("el-row",[n("el-col",{attrs:{span:24}},[n("el-form-item",{attrs:{label:"内容："}},[n("span",[e._v(e._s(e.info.content))])])],1)],1),e._v(" "),e.info.imgList.length>0?n("el-row",[n("el-col",{attrs:{span:24}},[n("el-form-item",{attrs:{label:"附图："}},e._l(e.info.imgList,function(t){return n("img",{key:t,staticClass:"activityInfo-img",attrs:{src:t},on:{click:function(n){e.handleBigImage(t)}}})}))],1)],1):e._e(),e._v(" "),n("el-row",[n("el-button",{directives:[{name:"permit",rawName:"v-permit",value:1802,expression:"1802"}],attrs:{type:"primary",icon:"edit",size:"small"},on:{click:e.handleEditAnnouncement}},[e._v("编辑")]),e._v(" "),n("el-button",{directives:[{name:"permit",rawName:"v-permit",value:1803,expression:"1803"}],attrs:{type:"danger",icon:"delete",size:"small"},on:{click:e.handleDeleteAnnouncement}},[e._v("删除")]),e._v(" "),n("el-button",{attrs:{icon:"my-return",size:"small"},on:{click:e.handleRouterReturn}},[e._v("返回")])],1)],1),e._v(" "),n("el-dialog",{attrs:{size:"tiny"},model:{value:e.bigImgVisible,callback:function(t){e.bigImgVisible=t},expression:"bigImgVisible"}},[n("img",{attrs:{width:"100%",src:e.bigImageUrl,alt:""}})])],1)},staticRenderFns:[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"contain-title"},[n("span",[e._v("公告详情")])])}]}},397:function(e,t,n){function a(e){n(1035)}var i=n(65)(n(909),n(1216),a,"data-v-3867c3fa",null);e.exports=i.exports},909:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){void 0!==this.$route.query.currentPage&&parseInt(this.$route.query.currentPage);return{info:{issuer:"",announcementNumber:"",contact:"",cellphone:"",title:"",content:"",imgList:[]},bigImgVisible:!1,bigImageUrl:""}},methods:{handleRouterReturn:function(){this.$router.push("/manageSystem/property/announcement")},handleEditAnnouncement:function(){this.$router.push({path:"/manageSystem/property/announcement/editAnnouncement",query:{id:this.$route.query.id}})},handleDeleteAnnouncement:function(){var e=this;this.$confirm("您确定删除该公告吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.$http({url:"/api/manageSystem/system/property/announcement/deleteAnnouncement",method:"delete",params:{id:e.$route.query.id}}).then(function(t){e.$route.query.currentPage?e.$router.push({path:"/manageSystem/property/announcement"}):e.$router.push({path:"/manageSystem/property/announcement",query:{currentPage:1}})}).catch(function(e){console.log(e)})})},handleBigImage:function(e){this.bigImageUrl=e,this.bigImgVisible=!0}},mounted:function(){var e=this;this.$http({url:"/api/manageSystem/system/property/announcement/getAnnouncementInfo",params:{id:this.$route.query.id}}).then(function(t){"00000"===t.data.code&&(e.info=t.data.announcementInfo)}).catch(function(e){console.log(e)})}}}});