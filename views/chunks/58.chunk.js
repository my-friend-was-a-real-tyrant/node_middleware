webpackJsonp([58],{1042:function(t,i){},1223:function(t,i){t.exports={render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{directives:[{name:"title",rawName:"v-title",value:"活动详情",expression:"'活动详情'"}],staticClass:"info"},[s("div",{staticClass:"info-up"},[s("div",{staticClass:"info-title"},[s("span",[t._v(t._s(t.activityInfo.title))])]),t._v(" "),s("div",{staticClass:"info-date"},[t._v("发布时间："+t._s(t.activityInfo.createDatetime))]),t._v(" "),s("pre",{staticClass:"info-content"},[t._v(t._s(t.activityInfo.content))]),t._v(" "),t._l(t.activityInfo.img,function(i){return s("img",{directives:[{name:"show",rawName:"v-show",value:t.activityInfo.img.length>0,expression:"activityInfo.img.length > 0"}],key:i,staticClass:"info-img",attrs:{src:i},on:{click:function(s){t.handleImgBig(i)}}})})],2),t._v(" "),s("div",{staticClass:"info-mid"}),t._v(" "),s("ul",{staticClass:"info-top"},[s("li",{staticClass:"info-top-item"},[s("span",{staticClass:"info-top-item-title"},[t._v("报名时间:")]),t._v(" "),s("span",{staticClass:"info-top-item-content"},[t._v(t._s(t.activityInfo.enrollTime))])]),t._v(" "),s("li",{staticClass:"info-top-item"},[s("span",{staticClass:"info-top-item-title"},[t._v("活动时间:")]),t._v(" "),s("span",{staticClass:"info-top-item-content"},[t._v(t._s(t.activityInfo.activityTime))])]),t._v(" "),s("li",{staticClass:"info-top-item"},[s("span",{staticClass:"info-top-item-title"},[t._v("活动地点:")]),t._v(" "),s("span",{staticClass:"info-top-item-content"},[t._v(t._s(t.activityInfo.activityAddress))])]),t._v(" "),s("li",{staticClass:"info-top-item"},[s("span",{staticClass:"info-top-item-title"},[t._v("活动对象:")]),t._v(" "),s("span",{staticClass:"info-top-item-content"},[t._v(t._s(t.activityInfo.activityTarget))])]),t._v(" "),s("li",{staticClass:"info-top-item"},[s("span",{staticClass:"info-top-item-title"},[t._v("联系人:")]),t._v(" "),s("span",{staticClass:"info-top-item-content"},[t._v(t._s(t.activityInfo.contact))])]),t._v(" "),s("li",{staticClass:"info-top-item"},[s("span",{staticClass:"info-top-item-title"},[t._v("联系电话:")]),t._v(" "),s("a",{staticClass:"info-tel",attrs:{href:"tel:"+t.activityInfo.contactCellphone}},[t._v(t._s(t.activityInfo.contactCellphone))])]),t._v(" "),s("li",{staticClass:"info-top-item"},[s("span",{staticClass:"info-top-item-title"},[t._v("参加人数:")]),t._v(" "),s("span",{staticClass:"info-top-item-content"},[t._v(t._s(t.activityInfo.actualCount)+" 人")])])]),t._v(" "),"OUT_OF_DATE"===t.activityInfo.status?s("zdButton",{staticClass:"info-button",attrs:{size:"large",disabled:""}},[t._v("不可报名")]):t.activityInfo.isEnrolled?s("zdButton",{staticClass:"info-button",attrs:{size:"large"},on:{click:t.handleCancelEnroll}},[t._v("取消报名")]):s("zdButton",{staticClass:"info-button",attrs:{size:"large"},on:{click:t.handleEnroll}},[t._v("我要报名")]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:t.bigImgShow,expression:"bigImgShow"}],staticClass:"info-img-big",on:{click:function(i){t.bigImgShow=!1}}},[s("img",{attrs:{src:t.bigImg}})])],1)},staticRenderFns:[]}},458:function(t,i,s){function n(t){s(1042)}var e=s(65)(s(977),s(1223),n,"data-v-3ec5c2eb",null);t.exports=e.exports},781:function(t,i,s){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default={props:{type:String,size:{type:String,default:"large"},disabled:Boolean},methods:{handleClick:function(t){null!=this.disabled&&!1!==this.disabled||this.$emit("click",t)}}}},782:function(t,i){},783:function(t,i,s){function n(t){s(782)}var e=s(65)(s(781),s(784),n,null,null);t.exports=e.exports},784:function(t,i){t.exports={render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("button",{staticClass:"zd-button",class:[t.size?"zd-button-"+t.size:"",t.type?"zd-button-"+t.type:"",{"zd-button-disabled":t.disabled}],attrs:{disabled:t.disabled},on:{click:t.handleClick}},[s("span",[t._t("default")],2)])},staticRenderFns:[]}},977:function(t,i,s){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=s(783),e=function(t){return t&&t.__esModule?t:{default:t}}(n);i.default={components:{zdButton:e.default},computed:{isVisitor:function(){return this.$store.state.isVisitor}},data:function(){return{activityInfo:{title:"",createDatetime:"",img:[],content:"",enrollTime:"",activityTime:"",activityAddress:"",activityTarget:"",contact:"",contactCellphone:"",isEnrolled:!1},bigImg:"",bigImgShow:!1}},methods:{handleEnroll:function(){this.$router.push({path:"/service/activity/activityInfo/enrollActivity",query:{id:this.$route.query.id}})},handleCancelEnroll:function(){var t=this;1==confirm("确定取消报名吗？")&&this.$http({url:"/api/system/service/activity/cancelEnrollActivity",method:"patch",data:{id:this.activityInfo.applyId}}).then(function(i){"00000"===i.data.code&&(t.$message("已成功取消报名"),t.$router.replace("/service/activity"))}).catch(function(t){console.log(t)})},handleImgBig:function(t){this.bigImg=t,this.bigImgShow=!0}},mounted:function(){var t=this;!0===this.isVisitor?this.$router.replace("/index"):this.$http({url:"/api/system/service/activity/getActivityInfo",params:{activityId:this.$route.query.id}}).then(function(i){t.activityInfo=i.data.activityInfo}).catch(function(t){console.log(t)})}}}});