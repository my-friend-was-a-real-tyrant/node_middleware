webpackJsonp([107],{1047:function(t,e){},1228:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"questionnairedetail"},[a("div",{staticClass:"topNav"},[a("el-button",{attrs:{type:"danger",size:"small"},on:{click:t.BackToList}},[t._v("问卷列表")])],1),t._v(" "),a("div",[a("el-form",{staticClass:"demo-form-inline",attrs:{"label-width":"90px"}},[a("el-form-item",{attrs:{label:"标题："}},[a("el-input",{staticStyle:{width:"600px"},attrs:{readonly:"",size:"small",placeholder:""},model:{value:t.form.title,callback:function(e){t.form.title=e},expression:"form.title"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"内容："}},[a("el-input",{staticStyle:{width:"600px"},attrs:{type:"textarea",autosize:{minRows:2},placeholder:"",readonly:""},model:{value:t.form.content,callback:function(e){t.form.content=e},expression:"form.content"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"封面图片："}},[a("img",{staticClass:"image",attrs:{src:t.form.image,alt:""}})]),t._v(" "),a("el-form-item",{attrs:{label:"前台地址："}},[a("el-input",{staticStyle:{width:"600px"},attrs:{size:"small",placeholder:"",readonly:""},model:{value:t.form.url,callback:function(e){t.form.url=e},expression:"form.url"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"针对版本："}},[a("el-input",{staticStyle:{width:"180px"},attrs:{size:"small",placeholder:"",readonly:""},model:{value:t.form.groupType,callback:function(e){t.form.groupType=e},expression:"form.groupType"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"结束时间："}},[a("el-date-picker",{staticStyle:{width:"180px"},attrs:{size:"small",type:"date",placeholder:"",readonly:""},model:{value:t.form.endDatetime,callback:function(e){t.form.endDatetime=e},expression:"form.endDatetime"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"是否上线："}},[a("el-input",{staticStyle:{width:"180px"},attrs:{size:"small",placeholder:"",readonly:""},model:{value:t.form.sataes,callback:function(e){t.form.sataes=e},expression:"form.sataes"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"问卷问题："}},t._l(t.form.sortList,function(e,l){return a("div",{key:l,staticClass:"questioncontent"},[a("div",{staticClass:"title"},[a("span",[t._v("标题：")]),t._v(" "),a("el-input",{staticStyle:{width:"523px"},attrs:{size:"small",readonly:""},model:{value:e.name,callback:function(t){e.name=t},expression:"item.name"}})],1),t._v(" "),t._l(e.questionList,function(e,l){return a("div",{key:l,staticClass:"questionList"},[a("el-form",{ref:"item1",refInFor:!0,attrs:{model:t.form,"label-width":"90px"}},[a("el-form-item",{attrs:{label:"问题："}},[a("el-input",{staticStyle:{width:"480px"},attrs:{size:"small",readonly:""},model:{value:e.question,callback:function(t){e.question=t},expression:"item1.question"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"类型："}},[a("el-select",{staticStyle:{width:"480px"},attrs:{size:"small",placeholder:"",disabled:""},model:{value:e.type,callback:function(t){e.type=t},expression:"item1.type"}},[a("el-option",{attrs:{label:"单选题",value:1}}),t._v(" "),a("el-option",{attrs:{label:"多选题",value:2}}),t._v(" "),a("el-option",{attrs:{label:"填空题",value:3}})],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"是否必填："}},[a("el-select",{staticStyle:{width:"480px"},attrs:{size:"small",placeholder:"",disabled:""},model:{value:e.isMust,callback:function(t){e.isMust=t},expression:"item1.isMust"}},[a("el-option",{attrs:{label:"是",value:1}}),t._v(" "),a("el-option",{attrs:{label:"否",value:2}})],1)],1),t._v(" "),3!=e.type?a("el-form-item",{attrs:{label:"选项："}},[a("el-input",{staticStyle:{width:"480px"},attrs:{size:"small",placeholder:"",readonly:""},model:{value:e.optionsListstr,callback:function(t){e.optionsListstr=t},expression:"item1.optionsListstr"}})],1):t._e()],1)],1)})],2)}))],1)],1)])},staticRenderFns:[]}},409:function(t,e,a){function l(t){a(1047)}var s=a(65)(a(921),a(1228),l,"data-v-4328470e",null);t.exports=s.exports},921:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{form:{}}},mounted:function(){this.Get()},methods:{Get:function(){var t=this;this.$http({url:"/api/manageSystem/system/property/questionnaire/getQuestionnaireInfo",params:{id:this.$route.query.id}}).then(function(e){if("00000"===e.data.code){var a=e.data;1===a.questionnaireInfo.isShow?a.questionnaireInfo.sataes="上线":a.questionnaireInfo.sataes="下线";for(var l=0;l<a.questionnaireInfo.sortList.length;l++)for(var s=a.questionnaireInfo.sortList[l],i=0;i<s.questionList.length;i++){var o=s.questionList[i],n="";if(o.optionsList){for(var r=0;r<o.optionsList.length;r++){var m=o.optionsList[r];3!=m.type?r<o.optionsList.length-1?n+=m.answerOptions+"、":n+=m.answerOptions:n="由填表的用户自己填写"}s.questionList[i].optionsListstr=n}}t.form=a.questionnaireInfo,console.log(t.form)}}).catch(function(t){})},BackToList:function(){this.$router.push({path:"/manageSystem/property/questionnaire"})}}}}});