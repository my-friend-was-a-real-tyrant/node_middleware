webpackJsonp([16],{1071:function(t,e){},1256:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{directives:[{name:"title",rawName:"v-title",value:"特惠商城",expression:"'特惠商城'"}],staticClass:"wrapper"},[i("router-view",{staticClass:"router"}),t._v(" "),i("div",{staticClass:"navigation"},t._l(2,function(e){return i("div",{key:e,staticClass:"navigation-item-wrapper",on:{click:function(i){t.handleRouterPush(e)}}},[i("i",{staticClass:"navigation-item-img",class:["navigation-item-img-0"+e,e===t.navigationActiveIndex?"navigation-item-img-0"+e+"-active":""]}),t._v(" "),i("p",{staticClass:"navigation-item-word",class:e===t.navigationActiveIndex?"navigation-item-word-active":""},[i("span",[t._v("\n                    "+t._s(1===e?"商城":"我的")+"\n                ")])])])}))],1)},staticRenderFns:[]}},223:function(t,e,i){function n(t){i(1071)}var a=i(65)(i(862),i(1256),n,"data-v-69213eb2",null);t.exports=a.exports},862:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={computed:{navigationActiveIndex:function(){return"/index/mall"===this.$route.path?1:"/index/person"===this.$route.path?2:""}},methods:{handleRouterPush:function(t){this.$router.replace(1===t?"/index/mall":"/index/person")}}}}});