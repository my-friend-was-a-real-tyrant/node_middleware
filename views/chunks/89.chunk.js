webpackJsonp([89],{1013:function(s,t){},1191:function(s,t){s.exports={render:function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("div",{directives:[{name:"title",rawName:"v-title",value:"个人中心",expression:"'个人中心'"}],staticClass:"container"},[e("div",{staticClass:"info"},[e("div",{staticClass:"info-headimg"},[e("img",{attrs:{src:s.headImgUrl}})]),s._v(" "),e("p",{staticClass:"info-name"},[s._v(s._s(s.userName)),e("span",{on:{click:s.showMyMessage}},[s._v("编辑个人信息")])])]),s._v(" "),e("div",{staticClass:"function"},s._l(8,function(t){return e("div",{key:t,staticClass:"function-item"},[e("i",{staticClass:"function-item-img",class:"function-item-img-0"+t}),s._v(" "),e("div",{staticClass:"function-item-wrapper",on:{click:function(e){s.handleClick(t)}}},[e("p",{staticClass:"function-item-word"},[s._v(s._s(1===t?"我的家庭":2===t?"查看我的报修":3===t?"我的收货地址":4===t?"我的优惠券":5===t?"查看我的报事":6===t?"我的咨询建议":7===t?"我的投诉表扬":"我的活动"))]),s._v(" "),e("i",{staticClass:"icon"})])])}))])},staticRenderFns:[]}},439:function(s,t,e){function i(s){e(1013)}var r=e(65)(e(954),e(1191),i,"data-v-13cc29c6",null);s.exports=r.exports},954:function(s,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={computed:{isVisitor:function(){return this.$store.state.isVisitor},headImgUrl:function(){return this.$store.state.info.avatar},userName:function(){return this.$store.state.info.userName}},methods:{handleClick:function(s){switch(s){case 1:this.$router.push("/person/myFamily");break;case 2:this.$router.push("/person/myRepairment");break;case 3:this.$router.push("/person/myDeliveryAddress");break;case 4:this.$router.push("/person/myCoupon");break;case 5:this.$router.push("/person/myReport");break;case 6:this.$router.push("/service/suggestion");break;case 7:this.$router.push("/service/myComplaint");break;case 8:this.$router.push("/service/activity/activityEnrolled")}},showMyMessage:function(){this.$router.push("/person/editMyMessage")}},created:function(){!0===this.isVisitor?this.$router.replace("/index/visitorPerson"):this.isVisitor}}}});