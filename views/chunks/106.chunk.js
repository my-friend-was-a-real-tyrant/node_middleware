webpackJsonp([106],{1064:function(t,e){},1249:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"questionnairecensus"},[n("div",{staticClass:"topNav"},[n("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.exportExcel}},[t._v("导出Excel")]),t._v(" "),n("el-button",{attrs:{type:"danger",size:"small"},on:{click:t.BackToList}},[t._v("问卷列表")])],1),t._v(" "),n("h2",[t._v(t._s((new Date).getFullYear()+"年度年终满意度调查结果统计表("+t.type+")"))]),t._v(" "),n("div",{staticClass:"table"},[n("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:""}},[n("el-table-column",{attrs:{prop:"name",label:"项目",align:"center",width:"120"}}),t._v(" "),n("el-table-column",{attrs:{label:"满意度调查项目",align:"left"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("ul",t._l(e.row.questionList,function(e,s){return n("li",{key:s,staticClass:"ul-li"},[t._v(t._s(e.question))])}))]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"参与人次",width:"120",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("ul",t._l(e.row.questionList,function(e,s){return n("li",{key:s,staticClass:"ul-li"},[t._v(t._s(e.userCount))])}))]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"满意人次",width:"120",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("ul",t._l(e.row.questionList,function(e,s){return n("li",{key:s,staticClass:"ul-li green"},[t._v(t._s(e.res1))])}))]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"基本满意人次",width:"140",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("ul",t._l(e.row.questionList,function(e,s){return n("li",{key:s,staticClass:"ul-li warning"},[t._v(t._s(e.res2))])}))]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"不满意人次",width:"140",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("ul",t._l(e.row.questionList,function(e,s){return n("li",{key:s,staticClass:"ul-li danger"},[t._v(t._s(e.res3))])}))]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"满意率",prop:"scle",width:"130",align:"center"}})],1)],1)])},staticRenderFns:[]}},410:function(t,e,n){function s(t){n(1064)}var i=n(65)(n(922),n(1249),s,null,null);t.exports=i.exports},922:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{tableData:[],type:""}},mounted:function(){this.Get()},methods:{Get:function(){var t=this;this.$http({url:"/api/manageSystem/system/property/questionnaire/getQuestionnaireStatistics",params:{id:this.$route.query.id}}).then(function(e){if("00000"===e.data.code){var n=e.data;n.statisticsInfo.sortList.length>0&&n.statisticsInfo.sortList.map(function(t){var e=0,n=0,s=0,i=0,a=0;t.questionList.map(function(t){var a=0,o=0,l=0;t.optionsList.map(function(t){"满意"===t.answerOptions&&(a=t.optionCount),"基本满意"===t.answerOptions&&(o=t.optionCount),"不满意"===t.answerOptions&&(l=t.optionCount)}),t.res1=a,t.res2=o,t.res3=l,e+=t.userCount,n+=t.res1,s+=t.res2,i+=t.res3}),t.questionList.push({question:"总体评价",res1:n,res2:s,res3:i,userCount:e}),a=n+s>0&&e>0?((n+s)/e*100).toFixed(2)+"%":"0%",t.scle=a}),t.tableData=n.statisticsInfo.sortList,t.type=n.statisticsInfo.groupType}}).catch(function(t){})},BackToList:function(){this.$router.push({path:"/manageSystem/property/questionnaire"})},exportExcel:function(){this.$http({url:"/api/manageSystem/system/property/questionnaire/exportStatistics",params:{id:this.$route.query.id}}).then(function(t){"00000"===t.data.code&&(window.location.href=t.data.path)}).catch(function(t){})}}}}});