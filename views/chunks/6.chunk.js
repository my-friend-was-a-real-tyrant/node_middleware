webpackJsonp([6],{1017:function(e,t){},1195:function(e,t,r){e.exports={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"order"},[i("div",{staticClass:"order-address",on:{click:function(t){e.deliveryAddressList.length>0?e.handleChooseAddress():e.handleAddAddress()}}},[e.deliveryAddressList.length>0?i("div",{staticClass:"order-address-info"},[i("div",{staticClass:"order-address-info-top"},[i("p",{staticClass:"order-address-info-top-name"},[i("span",[e._v("收件人："+e._s(e.orderData.deliveryAddress.name))])]),e._v(" "),i("p",{staticClass:"order-address-info-top-cellphone"},[i("span",[e._v(e._s(e.orderData.deliveryAddress.cellphone))])])]),e._v(" "),i("p",{staticClass:"order-address-info-bottom"},[i("span",[e._v("收货地址："+e._s(e.orderData.deliveryAddress.provinceName+e.orderData.deliveryAddress.cityName+e.orderData.deliveryAddress.districtName+e.orderData.deliveryAddress.address))])])]):i("div",{staticClass:"order-address-info"},[i("div",{staticClass:"order-address-info-top"},[i("p",{staticClass:"order-address-info-top-name"},[i("span",[e._v("点击添加收货地址")])])])]),e._v(" "),i("i",{staticClass:"order-address-icon"})]),e._v(" "),i("img",{staticClass:"order-address-line",attrs:{src:r(839)}}),e._v(" "),i("div",{staticClass:"order-info"},[i("div",{staticClass:"order-info-merchandise order-info-item"},[(this.$route.query.type,i("img",{staticClass:"order-info-merchandise-img",attrs:{src:e.orderData.merchandise.img}})),e._v(" "),i("div",{staticClass:"order-info-merchandise-info"},[i("p",{staticClass:"order-info-merchandise-info-name"},[i("span",[e._v(e._s(e.orderData.merchandise.name))])]),e._v(" "),i("p",{staticClass:"order-info-merchandise-info-content"},[(this.$route.query.type,i("span",[e._v("净含量："+e._s(e.orderData.merchandise.content))]))]),e._v(" "),i("p",{staticClass:"order-price"},[i("span",{staticClass:"order-price-s"},[e._v("¥")]),e._v(" "),"dm"!==this.$route.query.type||this.$route.query.from||e.orderData.merchandise.singlePrice?"dm"===this.$route.query.type&&!this.$route.query.from&&e.orderData.merchandise.singlePrice?i("span",[e._v(e._s(e.orderData.merchandise.singlePrice))]):"pt"===this.$route.query.from?i("span",[e._v(e._s(e.orderData.merchandise.spellPrice))]):i("span",[e._v(e._s(e.orderData.merchandise.price.integer+"."+e.orderData.merchandise.price.decimal))]):i("span",[e._v(e._s(e.orderData.merchandise.specialPrice))])])])]),e._v(" "),i("div",{staticClass:"order-info-item order-info-count"},[e._m(0),e._v(" "),"dm"==this.$route.query.type?i("div",{staticClass:"order-info-item-content"},[i("button",{on:{click:function(t){e.clickReduce()}}},[e._v("-")]),e._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:e.orderData.merchandise.count,expression:"orderData.merchandise.count"}],attrs:{type:"number"},domProps:{value:e.orderData.merchandise.count},on:{blur:[function(t){e.orderData.merchandise.count<1?e.orderData.merchandise.count=1:e.orderData.merchandise.count>e.orderData.merchandise.maxQuantity?e.orderData.merchandise.count=e.orderData.merchandise.maxQuantity:e.orderData.merchandise.count=1},function(t){e.$forceUpdate()}],input:function(t){t.target.composing||(e.orderData.merchandise.count=t.target.value)}}}),e._v(" "),i("span",{directives:[{name:"show",rawName:"v-show",value:e.isShow,expression:"isShow"}],staticStyle:{color:"white"}},[e._v(".")]),e._v(" "),i("button",{on:{click:function(t){e.clickAdd()}}},[e._v("+")])]):i("div",{staticClass:"order-info-item-content"},[i("button",{on:{click:function(t){e.orderData.merchandise.count>1&&e.orderData.merchandise.count--}}},[e._v("-")]),e._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:e.orderData.merchandise.count,expression:"orderData.merchandise.count"}],attrs:{type:"number"},domProps:{value:e.orderData.merchandise.count},on:{blur:[function(t){e.orderData.merchandise.count<1?e.orderData.merchandise.count=1:e.orderData.merchandise.count>e.orderData.merchandise.maxCount?e.orderData.merchandise.count=e.orderData.merchandise.maxCount:e.orderData.merchandise.count=1},function(t){e.$forceUpdate()}],input:function(t){t.target.composing||(e.orderData.merchandise.count=t.target.value)}}}),e._v(" "),i("button",{on:{click:function(t){e.orderData.merchandise.count<e.orderData.merchandise.maxCount&&e.orderData.merchandise.count++}}},[e._v("+")])])]),e._v(" "),i("div",{staticClass:"order-info-item order-info-coupon"},[e._m(1),e._v(" "),i("p",{staticClass:"order-info-item-content",on:{click:e.handleCouponShow}},[!1===e.couponPrice?i("span",[e._v(e._s(e.couponList.availableList.length)+"张可用")]):i("span",[e._v("已减"+e._s(e.couponPrice)+"元")]),e._v(" "),i("i",{staticClass:"order-address-icon"})])]),e._v(" "),e._m(2),e._v(" "),i("div",{staticClass:"order-info-item"},[i("p",{staticClass:"order-info-item-title"},[i("span",[e._v("共"+e._s(e.orderData.merchandise.count)+"件商品 小计：")]),e._v(" "),"dm"==this.$route.query.type?i("em",{staticClass:"order-price"},[i("span",{staticClass:"order-price-s"},[e._v("¥")]),e._v(" "),i("span",[e._v(e._s(e.total))])]):i("em",{staticClass:"order-price"},[i("span",{staticClass:"order-price-s"},[e._v("¥")]),e._v(" "),i("span",[e._v(e._s(e.allPrice.integer))]),e._v(" "),i("span",{staticClass:"order-price-s"},[e._v(e._s("."+e.allPrice.decimal))])])])])]),e._v(" "),i("div",{staticClass:"order-bottom"},[i("p",{staticClass:"order-info-item-title"},[i("span",[e._v("合计：")]),e._v(" "),"dm"==this.$route.query.type?i("em",{staticClass:"order-price"},[i("span",{staticClass:"order-price-s"},[e._v("¥")]),e._v(" "),i("span",[e._v(e._s(e.total))])]):i("em",{staticClass:"order-price"},[i("span",{staticClass:"order-price-s"},[e._v("¥")]),e._v(" "),i("span",[e._v(e._s(e.allPrice.integer))]),e._v(" "),i("span",{staticClass:"order-price-s"},[e._v("."+e._s(e.allPrice.decimal))])])]),e._v(" "),i("button",{on:{click:e.handleCreateOrder}},[e._v("提交订单")])]),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:e.couponShow,expression:"couponShow"}],staticClass:"order-coupon coupon-box"},[i("p",{staticClass:"order-coupon-title"},[i("span",[e._v("——可使用优惠券（"+e._s(e.couponList.availableList.length)+"张）——")])]),e._v(" "),i("ul",{staticClass:"coupon-box-ul"},e._l(e.couponList.availableList,function(t){return i("li",{key:t.id,staticClass:"coupon-box-ul-li",on:{click:function(r){e.handleChooseCoupon(t.id)}}},[i("div",{staticClass:"left"},[i("div",{staticClass:"left-top"},[e._v(e._s(t.merchantName))]),e._v(" "),i("div",{staticClass:"left-bottom"},[e._m(3,!0),e._v(" "),i("div",{staticClass:"left-bottom-bottom"},[e._v("有效期至："+e._s(t.expireDatetime))])])]),e._v(" "),i("div",{staticClass:"right"},[i("div",{staticClass:"right-top"},[e._v(e._s((t.preferentialType,t.face.toFixed(2))))]),e._v(" "),i("div",{staticClass:"right-bottom"},[e._v(e._s(t.couponDescription))])])])})),e._v(" "),i("p",{staticClass:"order-coupon-title"},[i("span",[e._v("——不可用优惠券（"+e._s(e.couponList.unavailableList.length)+"张）——")])]),e._v(" "),i("ul",{staticClass:"coupon-box-ul"},e._l(e.couponList.unavailableList,function(t){return i("li",{key:t.id,staticClass:"coupon-box-ul-li"},[i("div",{staticClass:"left"},[i("div",{staticClass:"left-top"},[e._v(e._s(t.merchantName))]),e._v(" "),i("div",{staticClass:"left-bottom"},[e._m(4,!0),e._v(" "),i("div",{staticClass:"left-bottom-bottom"},[e._v("有效期至："+e._s(t.expireDatetime))])])]),e._v(" "),i("div",{staticClass:"right"},[i("div",{staticClass:"right-top"},[e._v(e._s((t.preferentialType,t.face.toFixed(2))))]),e._v(" "),i("div",{staticClass:"right-bottom"},[e._v(e._s(t.couponDescription))])])])})),e._v(" "),i("zdButton",{staticClass:"order-coupon-bottom",attrs:{size:"large"},on:{click:function(t){e.handleChooseCoupon("")}}},[e._v("不使用优惠券")])],1)])},staticRenderFns:[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("p",{staticClass:"order-info-item-title"},[r("span",[e._v("购买数量：")])])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("p",{staticClass:"order-info-item-title"},[r("span",[e._v("优惠券：")])])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"order-info-item order-info-delivery"},[r("p",{staticClass:"order-info-item-title"},[r("span",[e._v("运费：")])]),e._v(" "),r("p",{staticClass:"order-info-item-content"},[r("span",[e._v("¥0.00")])])])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"left-bottom-top"},[r("p",{staticClass:"desc"},[e._v("立即使用")])])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"left-bottom-top"},[r("p",{staticClass:"desc"},[e._v("立即使用")])])}]}},229:function(e,t,r){function i(e){r(1017)}var s=r(65)(r(868),r(1195),i,"data-v-187cd524",null);e.exports=s.exports},32:function(e,t){var r=e.exports={version:"2.4.0"};"number"==typeof __e&&(__e=r)},781:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:{type:String,size:{type:String,default:"large"},disabled:Boolean},methods:{handleClick:function(e){null!=this.disabled&&!1!==this.disabled||this.$emit("click",e)}}}},782:function(e,t){},783:function(e,t,r){function i(e){r(782)}var s=r(65)(r(781),r(784),i,null,null);e.exports=s.exports},784:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("button",{staticClass:"zd-button",class:[e.size?"zd-button-"+e.size:"",e.type?"zd-button-"+e.type:"",{"zd-button-disabled":e.disabled}],attrs:{disabled:e.disabled},on:{click:e.handleClick}},[r("span",[e._t("default")],2)])},staticRenderFns:[]}},795:function(e,t,r){e.exports={default:r(796),__esModule:!0}},796:function(e,t,r){var i=r(32),s=i.JSON||(i.JSON={stringify:JSON.stringify});e.exports=function(e){return s.stringify.apply(s,arguments)}},814:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={domainname:"http://system.zhongdapuhui.com"}},839:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAtAAAAAECAIAAAAoBZ/bAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo5Nzk0OTRiMi00MDgzLWY0NDEtOTJkOS04ZGYyOWE5ZTExZWYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDdFNkEyNzA3NEZCMTFFNzhGNjVENUYzODIxRkVDRjgiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDdFNkEyNkY3NEZCMTFFNzhGNjVENUYzODIxRkVDRjgiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4NDk4ZThkYy0wZDQwLWNhNDktYWViZS1kMjQ3YzU0Mjc0YTQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTc5NDk0YjItNDA4My1mNDQxLTkyZDktOGRmMjlhOWUxMWVmIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+0lhKvAAAAshJREFUeNrcWW1P0nEU5S8ExAxdj4qJViLiaq22WK0XljbbtHwaBlT6om/RB+kTQKESrFm60mhjrbFla2srHqYEMp9WVmYMg4R/Z+MznPuC+4Lx6n92d8+995z7Ux4+ii83ntYwo3039+CL3/YrTUXJmq0+hyd+xE5FaSp8u5sMXtr6SEXZMTRM28eiLVdVReGh6MulwczCcHreUC7yUFSNErM4A3bX9sHDbJpNJKa6f6SoKIUDpnDHrVdtfft1OioQOAamgW81wDSxdP7o64O2kTfWnrJSRwWy7XydiAfwS0VBFsgFGSEvKpDpX2Fs5cXN1Yiusk8F2jIdf9I1vtR0UUMOmQIhPh0763e41+otbCCZDkKgOqgRKsX4uI6qNsylXW8y1LP+TlFV6pSZ6RyNtPZQh6axXBxdeT6QWaT2JNYYllnINrSnM1JZdXlz6V5y5ujeTyoK2OXr9rIV7aFSfnz5WV8uWqdWiMpJUV63Xgt20qf/yfzGZDxwbjtORSlp9XOn+mfPDPzVGmpACFYbB1oQipAKhJbxpp5e2XivaFQqkMwm06qV3lwU7YMmqg2lLlYglAYFQpnYCkCmgxCZhjZ/l5tq2lm1x1aGXoZqhnamOoCX7TfCHbepUwZqCZrJnQo3Fn9T6/3hxIXHjjskaSlMXxnrLEMzBJrQ5/BkzVYB5YQFoGUqJ0Ss2QkTw745yfiN6m5Gddbrm6ko+nJpJD03mFnAn9rYZOe/f76fmIbArY07DTzhUHpeoEBihzRsHOwdgQ7CKAjYXTGLU9VwL506Eo+x0lrymzXgAGROczIjBvvMkwpdX3tLpa+YdQbNJhNTFjLNZI7AUBj92YhrZZatnGReHsWEoEzjwCvDMcM3sy+CME5B2/BiWy97k0FkQGqgg9iaRmZKi3lCsUNa9b0b+snIfO9GYEpjVmNiY24LZPRfgAEAwEKt/IPhIhoAAAAASUVORK5CYII="},868:function(e,t,r){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var s=r(795),a=i(s),o=r(783),d=i(o),n=r(997),c=(i(n),r(814));i(c);t.default={components:{zdButton:d.default},data:function(){return{isShow:!1,total:0,deliveryAddressList:[],couponList:{availableList:[],unavailableList:[]},couponShow:!1,orderData:{deliveryAddress:{id:"",name:"",cellphone:"",provinceName:"",cityName:"",districtName:"",address:""},merchandise:{name:"",content:"",price:{integer:0,decimal:0,price:0},img:"",count:1,maxCount:999,coupon:""}},Couponid:"",couponPrice1:!1}},computed:{defaultAddressId:function(){return this.$store.state.defaultAddressId},noCouponPrice:function(){return"dm"===this.$route.query.type||"pt"===this.$route.query.type?100*this.orderData.merchandise.price*this.orderData.merchandise.count/100:100*this.orderData.merchandise.price.price*this.orderData.merchandise.count/100},couponPrice:function(){return""!=this.Couponid&&this.accountPrice()}},watch:{noCouponPrice:function(){this.getCouponList()},couponPrice:function(e,t){e!=t&&this.computedPrice()}},methods:{clickAdd:function(){var e=this;e.orderData.merchandise.count<e.orderData.merchandise.maxQuantity&&e.orderData.merchandise.count++,this.computedPrice(),localStorage.removeItem("zd_info"),localStorage.setItem("zd_info",(0,a.default)(e.orderData.merchandise)),e.isShow=!0,setTimeout(function(){e.isShow=!1},50)},clickReduce:function(){var e=this;e.orderData.merchandise.count>1&&e.orderData.merchandise.count--,this.computedPrice(),localStorage.removeItem("zd_info"),localStorage.setItem("zd_info",(0,a.default)(e.orderData.merchandise)),e.isShow=!0,setTimeout(function(){e.isShow=!1},50)},computedPrice:function(){"pt"===this.$route.query.from?this.total=(this.orderData.merchandise.count*this.orderData.merchandise.spellPrice).toFixed(2)-this.couponPrice:this.orderData.merchandise.singlePrice&&parseFloat(this.orderData.merchandise.singlePrice)>0?this.total=(this.orderData.merchandise.count*this.orderData.merchandise.singlePrice).toFixed(2)-this.couponPrice:this.total=(this.orderData.merchandise.count*this.orderData.merchandise.specialPrice).toFixed(2)-this.couponPrice},handleChooseAddress:function(){this.$router.push({path:"/deliveryAddress/deliveryAddressList",query:{merchandiseId:this.$route.query.id,groupId:this.$route.query.groupId}})},handleAddAddress:function(){this.$router.push({path:"/deliveryAddress/addDeliveryAddress",query:{merchandiseId:this.$route.query.id,groupId:this.$route.query.groupId}})},handleCouponShow:function(){if(this.couponList.availableList.length>0){if(1!=this.orderData.merchandise.count){var e=this.total+this.couponPrice;this.getCouponList(e)}this.couponShow=!0}},getCouponList:function(e){var t=this,r=JSON.parse(localStorage.getItem("zd_info")),i=this.$route.query;i.type?this.$http({url:"/api/mall/mall/getCouponList",params:{price:e||(r.singlePrice?r.singlePrice*r.count:r.specialPrice*r.count),sortId:i.sortId,merchandiseId:r.id}}).then(function(e){"00000"===e.data.code&&(t.couponList.availableList=e.data.availableList,t.couponList.unavailableList=e.data.unavailableList)}).catch(function(e){}):this.$http({url:"/api/mall/mall/getCouponList",params:{price:this.noCouponPrice,sortId:i.sortId,merchandiseId:r.id}}).then(function(e){"00000"===e.data.code&&(t.couponList.availableList=e.data.availableList,t.couponList.unavailableList=e.data.unavailableList)}).catch(function(e){})},handleChooseCoupon:function(e){this.orderData.merchandise.coupon=e,this.Couponid=e,this.couponShow=!1},accountPrice:function(){if("number"!=typeof this.orderData.merchandise.coupon)return!1;for(var e=0;e<this.couponList.availableList.length;e++)if(this.orderData.merchandise.coupon===this.couponList.availableList[e].id)return this.couponList.availableList[e].preferentialType,this.couponList.availableList[e].face},handleCreateOrder:function(){var e=this,t=this.$route.query,r={addressId:this.orderData.deliveryAddress.id,merchandiseId:this.orderData.merchandise.id,quantity:this.orderData.merchandise.count,couponId:!1===this.couponPrice?"":this.orderData.merchandise.coupon,specs:(0,a.default)(this.orderData.merchandise.goodsGroup)};"pt"===t.from&&(t.groupId?r.groupId=t.groupId:r.groupId=0),"dm"===t.type?"pt"===t.from?this.$http({url:"/api/mall/person/generateTogetherForm",method:"post",data:r}).then(function(t){"00000"===t.data.code&&(e.$message("订单创建成功，请稍后..."),setTimeout(function(){e.$router.push({path:"/mall/payOrder",query:{id:t.data.data.id}})},1e3))}).catch(function(e){}):this.orderData.deliveryAddress.id&&this.$http({url:"/api/mall/person/generateSingleForm",method:"post",data:r}).then(function(t){"00000"===t.data.code&&(e.$message("订单创建成功，请稍后..."),setTimeout(function(){e.$router.push({path:"/mall/payOrder",query:{id:t.data.data.id}})},1e3))}).catch(function(e){}):(r.couponId=!1===this.couponPrice?"":this.orderData.merchandise.coupon,r.id=this.$route.query.id,r.groupId=this.$route.query.groupId,this.orderData.deliveryAddress.id&&this.$http({url:"/api/mall/mall/createOrder",method:"post",data:r}).then(function(t){"00000"===t.data.code&&(e.$message("订单创建成功，请稍后..."),setTimeout(function(){e.$router.push({path:"/mall/payOrder",query:{id:t.data.id}})},1e3))}).catch(function(e){}))}},mounted:function(){var e=this;if(this.$route.query.type){var t=JSON.parse(localStorage.getItem("zd_info"));this.orderData.merchandise=t,this.orderData.merchandise.img=t.pictures[0],this.computedPrice(),this.$http({url:"/api/common/getMyDeliveryAddress"}).then(function(t){if("00000"==t.data.code&&(e.deliveryAddressList=t.data.addressList,e.deliveryAddressList.length>0))if(Object.prototype.hasOwnProperty.call(e.$route.query,"addressId")){for(var r=0;r<e.deliveryAddressList.length;r++)if(e.deliveryAddressList[r].id==e.$route.query.addressId){e.orderData.deliveryAddress=e.deliveryAddressList[r];break}}else for(var i=0;i<e.deliveryAddressList.length;i++){if(Object.prototype.hasOwnProperty.call(e.deliveryAddressList[i],e.defaultAddressId===e.deliveryAddressList[i].roomId)){e.orderData.deliveryAddress=e.deliveryAddressList[i];break}if(i===e.deliveryAddressList.length-1)for(var s=0;s<e.deliveryAddressList.length;s++)if(!0===e.deliveryAddressList[s].theDefault){e.orderData.deliveryAddress=e.deliveryAddressList[s];break}}}).catch(function(e){})}else this.$http.all([this.$http({url:"/api/common/getMyDeliveryAddress"}),this.$http({url:"/api/mall/mall/getMerchandiseInfo",params:{id:this.$route.query.id,groupId:this.$route.query.groupId}})]).then(this.$http.spread(function(t,r){if("00000"===t.data.code&&(e.deliveryAddressList=t.data.addressList,e.deliveryAddressList.length>0))if(Object.prototype.hasOwnProperty.call(e.$route.query,"addressId")){for(var i=0;i<e.deliveryAddressList.length;i++)if(e.deliveryAddressList[i].id==e.$route.query.addressId){e.orderData.deliveryAddress=e.deliveryAddressList[i];break}}else for(var s=0;s<e.deliveryAddressList.length;s++){if(Object.prototype.hasOwnProperty.call(e.deliveryAddressList[s],e.defaultAddressId===e.deliveryAddressList[s].roomId)){e.orderData.deliveryAddress=e.deliveryAddressList[s];break}if(s===e.deliveryAddressList.length-1)for(var a=0;a<e.deliveryAddressList.length;a++)if(!0===e.deliveryAddressList[a].theDefault){e.orderData.deliveryAddress=e.deliveryAddressList[a];break}}"00000"===r.data.code&&(e.orderData.merchandise.name=r.data.info.name,e.orderData.merchandise.content=r.data.info.content,e.orderData.merchandise.price=r.data.info.groupPrice,e.orderData.merchandise.maxCount=r.data.info.maxCount,e.orderData.merchandise.img=r.data.info.imgList[0])})).catch(function(e){})}}},997:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t="0",r="00";return Math.ceil(e)===Math.floor(e)?t=e+"":(t=Math.floor(e)+"",r=(1e3*e-1e3*Math.floor(e))/10,r<10?r="0"+r:r+=""),{price:e,integer:t,decimal:r}}}});