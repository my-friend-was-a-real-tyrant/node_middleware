webpackJsonp([35],{1075:function(t,e){},1259:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"apply-wrapper"},[a("div",{staticClass:"apply-position",on:{click:t.handleChangeAddress}},[a("i",{staticClass:"apply-position-icon"}),t._v(" "),a("span",{staticClass:"apply-position-word"},[t._v(t._s(t.address))]),t._v(" "),a("i",{staticClass:"apply-position-arrow"})]),t._v(" "),a("div",{staticClass:"apply-form"},[a("zdInput",{attrs:{icon:"identity",type:"select",selectOption:t.selectOption,label:"选择身份",labelSize:"large",placeholder:"请选择您的身份"},model:{value:t.formData.identity,callback:function(e){t.formData.identity=e},expression:"formData.identity"}}),t._v(" "),t.isVisitor?a("zdInput",{attrs:{icon:"person",label:"您的姓名",labelSize:"large",placeholder:"请输入您的姓名"},model:{value:t.formData.myName,callback:function(e){t.formData.myName=e},expression:"formData.myName"}}):t._e(),t._v(" "),a("zdInput",{directives:[{name:"show",rawName:"v-show",value:"1"!==t.formData.identity.value,expression:"formData.identity.value !== '1'"}],attrs:{icon:"person",label:"户主姓名",labelSize:"large",placeholder:"请输入户主姓名"},model:{value:t.formData.hostName,callback:function(e){t.formData.hostName=e},expression:"formData.hostName"}}),t._v(" "),a("zdInput",{directives:[{name:"show",rawName:"v-show",value:"1"!==t.formData.identity.value,expression:"formData.identity.value !== '1'"}],attrs:{icon:"cellphone",label:"户主手机号",labelSize:"large",placeholder:"请输入户主手机号"},model:{value:t.formData.hostCellphone,callback:function(e){t.formData.hostCellphone=e},expression:"formData.hostCellphone"}}),t._v(" "),a("p",{staticClass:"apply-link",on:{click:t.handleInvite}},[a("span",[t._v("我有邀请码 >")])]),t._v(" "),a("zdButton",{on:{click:t.handleSubmit}},[t._v("确定")])],1),t._v(" "),!0===t.isVisitor?a("p",{staticClass:"apply-visitor",on:{click:t.handleRouteToSystem}},[a("span",[t._v("我先看看")])]):t._e()])},staticRenderFns:[]}},446:function(t,e,a){function l(t){a(1075)}var i=a(65)(a(963),a(1259),l,"data-v-6eba902b",null);t.exports=i.exports},781:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{type:String,size:{type:String,default:"large"},disabled:Boolean},methods:{handleClick:function(t){null!=this.disabled&&!1!==this.disabled||this.$emit("click",t)}}}},782:function(t,e){},783:function(t,e,a){function l(t){a(782)}var i=a(65)(a(781),a(784),l,null,null);t.exports=i.exports},784:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("button",{staticClass:"zd-button",class:[t.size?"zd-button-"+t.size:"",t.type?"zd-button-"+t.type:"",{"zd-button-disabled":t.disabled}],attrs:{disabled:t.disabled},on:{click:t.handleClick}},[a("span",[t._t("default")],2)])},staticRenderFns:[]}},801:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{icon:{type:String,required:!0},type:{type:String,default:"input"},label:String,labelSize:{type:String,default:"small"},placeholder:String,value:{},selectOption:{type:Array,validator:function(t){for(var e=0;e<t.length;e++)if(!Object.hasOwnProperty.call(t[e],"value")||!Object.hasOwnProperty.call(t[e],"label"))return!1;return!0}}},data:function(){return{inputValue:"",selectLabel:"",selectValue:""}},methods:{handleInput:function(t){var e=t.target.value;this.inputValue=e,this.$emit("input",this.inputValue)}},watch:{selectValue:function(t){if(""===t)this.selectLabel="";else for(var e=0;e<this.selectOption.length;e++)if(this.selectOption[e].value===t){this.selectLabel=this.selectOption[e].label;break}this.inputValue=this.selectLabel,this.$emit("input",{value:t,label:this.selectLabel})}}}},803:function(t,e){},807:function(t,e,a){function l(t){a(803)}var i=a(65)(a(801),a(809),l,null,null);t.exports=i.exports},809:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"zd-input-wrapper"},[a("i",{class:"zd-input-icon zd-input-icon-"+t.icon}),t._v(" "),a("span",{staticClass:"zd-input-label",class:"zd-input-label-"+t.labelSize},[t._v(t._s(t.label))]),t._v(" "),"select"===t.type?a("div",{staticClass:"zd-input-content",staticStyle:{position:"relative"}},[a("select",{directives:[{name:"model",rawName:"v-model",value:t.selectValue,expression:"selectValue"}],staticClass:"zd-input-select",on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.selectValue=e.target.multiple?a:a[0]}}},[a("option",{attrs:{value:""}}),t._v(" "),t._l(t.selectOption,function(e){return a("option",{key:e.value,domProps:{value:e.value}},[t._v(t._s(e.label))])})],2),t._v(" "),a("input",{staticClass:"zd-input zd-input-noSlot",attrs:{type:"text",readonly:"readonly",placeholder:t.placeholder},domProps:{value:t.inputValue}})]):a("div",{staticClass:"zd-input-content"},[a("input",{staticClass:"zd-input",class:t.$slots.default?"":"zd-input-noSlot",attrs:{type:"text",placeholder:t.placeholder},domProps:{value:t.inputValue},on:{input:t.handleInput}}),t._v(" "),t._t("default")],2)])},staticRenderFns:[]}},963:function(t,e,a){"use strict";function l(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var i=a(807),n=l(i),s=a(783),o=l(s),r=a(265),u=l(r),c=u.default.hostname;e.default={props:["address","hostName"],components:{zdInput:n.default,zdButton:o.default},data:function(){return{selectOption:[{label:"户主",value:"1"},{label:"家属",value:"2"},{label:"租户",value:"3"}],formData:{identity:{},myName:"",hostName:"",hostCellphone:""},cellphoneReg:/^1(([3,8]\d)|(5[0-3,5-9])|(47)|(7[5-8]))(\d{8})$/}},computed:{isVisitor:function(){return this.$store.state.isVisitor},info:function(){return this.$store.state.info},formValidate:function(){return""===this.formData.identity.value?"请选择您的身份":"1"===this.formData.identity.value?""!==this.formData.myName||"请填写您的姓名":""===this.formData.hostName||""===this.formData.hostCellphone||""===this.formData.myName?"请将表单填写完整":!1!==this.cellphoneReg.test(this.formData.hostCellphone)||"请填写正确的手机号"}},methods:{handleChangeAddress:function(){this.$router.replace("/person/myFamily/addHouse/choosePark")},handleSubmit:function(){var t=this;!0===this.formValidate?this.$http({method:"post",url:"/api/login/apply",data:{identity:this.formData.identity.value,myName:this.formData.myName,hostName:this.formData.hostName,hostCellphone:this.formData.hostCellphone,roomId:this.$route.query.roomId}}).then(function(e){"00000"===e.data.code&&("1"===t.formData.identity.value?(t.$message("添加成功"),t.isVisitor&&(window.location.href=c+"/system/")):t.$message("您的申请已提交，请等待审核"),t.$router.replace("/person/myFamily"))}).catch(function(t){console.log(t)}):alert(this.formValidate)},handleRouteToSystem:function(){this.$router.push("/")},handleInvite:function(){this.$router.push("/person/myFamily/addHouse/invite")}},created:function(){""===this.address&&this.$router.replace("/person/myFamily/addHouse/choosePark")},mounted:function(){this.isVisitor||(this.formData.myName=this.info.userName)}}}});