webpackJsonp([37],{1028:function(t,i){},1208:function(t,i){t.exports={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{directives:[{name:"title",rawName:"v-title",value:"报事详情",expression:"'报事详情'"}],staticClass:"repairmentInfo"},[e("ul",{staticClass:"repairmentInfo-info"},[e("li",{staticClass:"repairmentInfo-info-item"},[e("span",{staticClass:"repairmentInfo-info-item-title"},[t._v("报事类型")]),t._v(" "),e("span",{staticClass:"repairmentInfo-info-item-content"},[t._v(t._s(t.info.type))])]),t._v(" "),e("li",{staticClass:"repairmentInfo-info-item"},[e("span",{staticClass:"repairmentInfo-info-item-title"},[t._v("标题")]),t._v(" "),e("span",{staticClass:"repairmentInfo-info-item-content"},[t._v(t._s(t.info.title))])]),t._v(" "),e("li",{staticClass:"repairmentInfo-info-item"},[e("span",{staticClass:"repairmentInfo-info-item-title"},[t._v("报事内容")]),t._v(" "),e("span",{staticClass:"repairmentInfo-info-item-content"},[t._v(t._s(t.info.content))])]),t._v(" "),e("li",{staticClass:"repairmentInfo-info-item"},[e("span",{staticClass:"repairmentInfo-info-item-title"},[t._v("报修时间")]),t._v(" "),e("span",{staticClass:"repairmentInfo-info-item-content"},[t._v(t._s(t.info.datetime))])]),t._v(" "),e("li",{staticClass:"repairmentInfo-info-item"},[e("span",{staticClass:"repairmentInfo-info-item-status"},[t._v(t._s(1===t.info.status?"待审核":2===t.info.status?"维修中":3===t.info.status?"已拒绝":4===t.info.status?"已转送":5===t.info.status?"已完成":"已评价"))]),t._v(" "),e("span",{staticClass:"repairmentInfo-info-item-content"},[t._v(t._s(t.info.statusChangeTime))])])]),t._v(" "),e("ul",{staticClass:"repairmentInfo-info"},[t.info.imgList.length>0?e("li",{staticClass:"repairmentInfo-info-item repairmentInfo-info-img"},[e("span",{staticClass:"repairmentInfo-info-img-title"},[t._v("报事图")]),t._v(" "),e("div",{staticClass:"repairmentInfo-info-img-content"},t._l(t.info.imgList,function(i){return e("img",{key:i,attrs:{src:i},on:{click:function(e){t.handleImgBig(i)}}})}))]):t._e()]),t._v(" "),""!==t.info.remark&&null!==t.info.remark?e("ul",{staticClass:"repairmentInfo-info"},[e("li",{staticClass:"repairmentInfo-info-item"},[e("span",{staticClass:"repairmentInfo-info-item-title"},[t._v("备注")]),t._v(" "),e("span",{staticClass:"repairmentInfo-info-item-content"},[t._v(t._s(t.info.remark))])])]):t._e(),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.bigImgShow,expression:"bigImgShow"}],staticClass:"repairmentInfo-img-big",on:{click:function(i){t.bigImgShow=!1}}},[e("img",{attrs:{src:t.bigImg}})])])},staticRenderFns:[]}},454:function(t,i,e){function n(t){e(1028)}var s=e(65)(e(973),e(1208),n,"data-v-2c67b87f",null);t.exports=s.exports},781:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default={props:{type:String,size:{type:String,default:"large"},disabled:Boolean},methods:{handleClick:function(t){null!=this.disabled&&!1!==this.disabled||this.$emit("click",t)}}}},782:function(t,i){},783:function(t,i,e){function n(t){e(782)}var s=e(65)(e(781),e(784),n,null,null);t.exports=s.exports},784:function(t,i){t.exports={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("button",{staticClass:"zd-button",class:[t.size?"zd-button-"+t.size:"",t.type?"zd-button-"+t.type:"",{"zd-button-disabled":t.disabled}],attrs:{disabled:t.disabled},on:{click:t.handleClick}},[e("span",[t._t("default")],2)])},staticRenderFns:[]}},794:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default={props:{active:{}},methods:{handleClick:function(t){this.$emit("click",t)}}}},797:function(t,i){},798:function(t,i,e){function n(t){e(797)}var s=e(65)(e(794),e(799),n,null,null);t.exports=s.exports},799:function(t,i){t.exports={render:function(){var t=this,i=t.$createElement;return(t._self._c||i)("i",{staticClass:"zd-checkbox",class:{"zd-checkbox-active":t.active},on:{click:t.handleClick}})},staticRenderFns:[]}},973:function(t,i,e){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(i,"__esModule",{value:!0});var s=e(798),a=n(s),o=e(783),r=n(o);i.default={components:{zdCheckbox:a.default,zdButton:r.default},data:function(){return{info:{type:"",title:"",content:"",datetime:"",status:0,statusChangeTime:"",imgList:[],remark:""},bigImg:"",bigImgShow:!1}},computed:{isVisitor:function(){return this.$store.state.isVisitor}},methods:{handleImgBig:function(t){this.bigImg=t,this.bigImgShow=!0}},mounted:function(){var t=this;!0===this.isVisitor?this.$router.replace("/index/visitorPerson"):this.$http({url:"/api/system/personalCenter/getReportInfo",params:{id:this.$route.query.id}}).then(function(i){t.info=i.data.info}).catch(function(t){console.log(t)})}}}});