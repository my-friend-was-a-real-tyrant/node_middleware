webpackJsonp([72],{1088:function(t,e){},1272:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"scoped"},[a("div",{staticClass:"scoped-header"},[a("span",[t._v("累计用户总量: ")]),t._v(" "),a("span",{staticClass:"scoped-header-blue"},[t._v(t._s(t.count))])]),t._v(" "),a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",slot:"header"},[a("span",{staticStyle:{"line-height":"36px"}},[t._v("新增用户趋势")]),t._v(" "),a("p",{staticClass:"fr"},[a("span",{staticClass:"scoped-type",class:{"scoped-type-link":2===t.type},on:{click:function(e){t.handleTypeChange(1)}}},[t._v("日")]),t._v(" "),a("span",{staticClass:"scoped-type",class:{"scoped-type-link":1===t.type},on:{click:function(e){t.handleTypeChange(2)}}},[t._v("月")]),t._v(" "),a("el-date-picker",{directives:[{name:"show",rawName:"v-show",value:1===t.type,expression:"type === 1"}],attrs:{type:"date",size:"small",placeholder:"选择日期",clearable:!1},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}}),t._v(" "),a("el-date-picker",{directives:[{name:"show",rawName:"v-show",value:2===t.type,expression:"type === 2"}],attrs:{type:"month",size:"small",placeholder:"选择月",clearable:!1},model:{value:t.month,callback:function(e){t.month=e},expression:"month"}})],1)]),t._v(" "),a("div",{staticClass:"scoped-charts"})])],1)},staticRenderFns:[]}},430:function(t,e,a){function s(t){a(1088)}var i=a(65)(a(942),a(1272),s,"data-v-77fa6b62",null);t.exports=i.exports},785:function(t,e,a){"use strict";function s(t,e){if(""==t||null==t)return"";var a=new Date(t),s=a.getFullYear(),i=a.getMonth()+1<10?"0"+(a.getMonth()+1):a.getMonth()+1,n=a.getDate()<10?"0"+a.getDate():a.getDate(),o=s+"-"+i+"-"+n,r=a.getHours()<10?"0"+a.getHours():a.getHours(),l=a.getMinutes()<10?"0"+a.getMinutes():a.getMinutes(),c=a.getSeconds()<10?"0"+a.getSeconds():a.getSeconds();return"datetime"===e?o=o+" "+r+":"+l+":"+c:"minute"===e&&(o=o+" "+r+":"+l),o}Object.defineProperty(e,"__esModule",{value:!0}),e.transition=s},942:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(785);e.default={data:function(){return{count:0,myChart:{},type:1,date:new Date,month:new Date,xAxis:[],yAxisNum:[],yAxisPer:[]}},methods:{handleTypeChange:function(t){this.type=t},ajaxFun:function(){var t=this;this.$http({url:"/api/manageSystem/system/user/userStatistics/getUserStatistics",params:{type:this.type,date:1===this.type?(0,s.transition)(this.date):(0,s.transition)(this.month)}}).then(function(e){"00000"===e.data.code&&(t.xAxis=e.data.data.x,t.yAxisPer=e.data.data.yRatio,t.yAxisNum=e.data.data.yNum,t.count=e.data.data.count,t.myChart.setOption({xAxis:{data:t.xAxis},series:[{data:t.yAxisNum},{data:t.yAxisPer}]}))}).catch(function(t){console.log(t)})}},mounted:function(){var t=this;this.myChart=this.$echarts.init(document.querySelector(".scoped-charts"));var e={title:{show:!1},legend:{data:["新增用户","新增用户活跃占比"]},tooltip:{trigger:"axis",axisPointer:{axis:"x"},formatter:"{b}<br/>{a0}: {c0}<br/>{a1}: {c1}%"},xAxis:{data:this.xAxis,axisPointer:{show:!0,label:{show:!0}}},yAxis:[{name:"新增用户",axisLabel:{show:!0,interval:"auto"},axisLine:{lineStyle:{color:"#5793f3"}},minInterval:1},{name:"新增用户活跃占比",axisLabel:{show:!0,interval:"auto",formatter:"{value} %"},axisLine:{lineStyle:{color:"#d14a61"}}}],dataZoom:{},series:[{name:"新增用户",type:"line",data:this.yAxisNum,itemStyle:{normal:{color:"#5793f3"}},lineStyle:{normal:{color:"#5793f3",width:2}}},{name:"新增用户活跃占比",type:"line",data:this.yAxisPer,yAxisIndex:1,itemStyle:{normal:{color:"#d14a61"}},lineStyle:{normal:{color:"#d14a61",width:2}}}]};this.myChart.setOption(e),window.onresize=function(){t.myChart.resize()},this.ajaxFun()},watch:{type:function(){this.ajaxFun()},date:function(){1===this.type&&this.ajaxFun()},month:function(){2===this.type&&this.ajaxFun()}}}}});