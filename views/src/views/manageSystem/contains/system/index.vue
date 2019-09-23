<style lang="less" scoped>
    .manageSystenIndex{ background: #EEF1F6; padding: 0;
        &-head{ background: #ffffff; padding: 30px 50px;}
        &-message{
            display: flex; justify-content: space-between;
            >div{ display: flex; align-items: center;}
            >div:first-of-type{ margin-top: 30px;}
            &-photo{ width: 100px; height: 100px; border-radius: 50%; border: 1px solid #868686; overflow: hidden;
                img{ width: 100px; height: 100px;}
            }
            &-me,&-job{ display: flex; flex-wrap: wrap; margin-left: 50px;
                li{height: 40px; line-height: 40px; font-size: 18px;  margin-right: 40px}

            }
            
            &-order{ width: 300px; flex-shrink: 0;
                h6{ font-size: 20px; font-weight: 400; margin-bottom: 10px; margin-left: 20px}
                li{ display: inline-block; padding-left: 30px; width: 70px; border-right: 1px solid #E5EAEF; cursor: pointer;
                    p{ color: #999999; font-size: 14px;}
                    span{ font-size: 24px; color: #48CDFD;}
                }
                li:last-of-type{ border: none;}
            }
        }
        &-chart{display: flex; padding: 2%; justify-content: space-between; background: #EEF1F6;}
        &-cirleChart,&-barChart{width: 48%;
            .text { font-size: 14px; }
            .item { padding: 18px 0; }
            .clearfix{ span{color: #999999; font-size: 20px} }
            .clearfix:before,
            .clearfix:after {  display: table; content: ""; }
            .clearfix:after { clear: both}
            .box-card { width: 100%; } 
            &-barPic { width: 100%; height: 320px; }
            
        }
        &-cirleChart{
            &-piePic{width: 110%; height: 320px; position: relative; left: -5%}
            button{margin-right: 3%}
            .bgColor{background: #58B3FD}
        }
    }
</style>
<template>
    <div class="manageSystenIndex">
        <div class="manageSystenIndex-head">
            <div class="manageSystenIndex-title">个人工作台</div>
            <div class="manageSystenIndex-message">
                <div>
                    <div class="manageSystenIndex-message-photo">
                        <img src="../../img/user.png" alt="">
                    </div>
                    <div>
                        <ul class="manageSystenIndex-message-me">
                            <li>姓名：{{manageMessage.name}}</li>
                            <li>联系方式：{{manageMessage.call}}</li>
                        </ul>
                        <ul class="manageSystenIndex-message-job">
                            <li v-for="(n,i) in manageMessage.job" :key="n">
                                职位：{{(manageMessage.identity === 1 || manageMessage.identity === 2) ? '' : (manageMessage.depart[i] + '-')}}{{n}}
                            </li>
                        </ul>
                    </div>
                    
                </div>
                <div class="manageSystenIndex-message-order">
                    <div>
                        <h6>未处理的订单</h6>
                        <ul>
                            <li @click="manageMessageOrderRun(0)" v-permit="1100">
                                <p>报修</p>
                                <span>{{ repairmentCount }}</span>
                            </li>
                            <li @click="manageMessageOrderRun(1)" v-permit="1300">
                                <p>报事</p>
                                <span>{{ reportCount }}</span>
                            </li>
                            <li @click="manageMessageOrderRun(2)" v-permit="1200">
                                <p>投诉</p>
                                <span>{{ complaintCount }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="manageSystenIndex-chart">
            <div class="manageSystenIndex-barChart" v-permit="1100">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span style="line-height: 36px;">报修满意度</span>
                        <el-button style="float: right; background: none; padding: 0;" type="primary">
                            <el-row class="block-col-2" >
                            <el-col :span="12">
                                <el-dropdown trigger="click"  @command="handleCommand">
                                <el-button type="primary" id="manageDropTitle">
                                    {{barYear}}<i class="el-icon-caret-bottom el-icon--right"></i>
                                </el-button>
                                <el-dropdown-menu slot="dropdown" style="height:200px; overflow:auto">
                                    <el-dropdown-item v-for="n in mansgeDrop" :key="n" :command="''+n">{{n}}</el-dropdown-item>
                                </el-dropdown-menu>
                                </el-dropdown>
                            </el-col>
                            </el-row>
                        </el-button>
                    </div>
                    <div>
                        <div ref="manageBar" class="manageSystenIndex-cirleChart-barPic"></div>
                    </div>
                </el-card>
            </div>
            <div class="manageSystenIndex-cirleChart" v-permit="-1">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span style="line-height: 36px;">上报数量占比</span>
                        <el-button style="float: right;" :type="bgC === 2 ? 'primary' : ''" @click="yearChange">当年</el-button>
                        <el-button style="float: right;" :type="bgC === 1 ? 'primary' : ''" @click="monthChange">当月</el-button>
                    </div>
                    <div>
                        <div ref="managePie" class="manageSystenIndex-cirleChart-piePic"></div>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>
<script lang="babel">
    export default {
        data(){
            let nowYear = (new Date()).getFullYear();
            let nowMonth = (new Date()).getMonth() + 1;
            return{
                bgC: 1,
                barYear: '',
                myBarCharts: '',
                command: '',
                nowYear: nowYear,
                nowMonth: nowMonth,
                myPieCharts: '',
                manageDepartShow: false,
                mansgeDrop: [],
                mouthData: ['1','2','3','4','5','6','7','8','9','10','11','12'],
                manageMessage:{
                    src: '',
                    name: '',
                    call: '',
                    depart: [],
                    job: [],
                    identity: ''
                },
                repairmentCount: 0,
                reportCount: 0,
                complaintCount: 0,
                manageMessageOrder:[
                    {
                        title: '报修',
                        count: ''
                    },
                    {
                        title: '报事',
                        count: ''
                    },
                    {
                        title: '投诉',
                        count: ''
                    }
                ]
            }
        },
        computed: {
            parkName() {
                return this.$store.state.info.parkName;
            },
            isSuper() {
                return this.$store.state.isSuper;
            },
            isParkManager() {
                return this.$store.state.isParkManager;
            },
            permissions() {
                return this.$store.state.permissions;
            }
        },
        methods:{
            handleCommand(command) {
                this.command = command;
                this.barChart(command);
                this.barYear = command;
            },
            getMyRepairmentCount() {
                return this.$http({
                    method: 'get',
                    url: "/api/manageSystem/system/getMyRepairmentCount",
                });
            },
            getMyReportCount() {
                return this.$http({
                    method: 'get',
                    url: "/api/manageSystem/system/getMyReportCount",
                });
            },
            getMyComplaintCount() {
                return this.$http({
                    method: 'get',
                    url: "/api/manageSystem/system/getMyComplaintCount",
                });
            },
            getIndexInfo() {
                return this.$http({
                    method: 'get',
                    url: "/api/manageSystem/system/getIndexInfo",
                });
            },
            getindexHeaderInfo() {
                this.getIndexInfo().then((response) => {
                    if (response.data.code === '00000') {
                        this.manageMessage.depart = response.data.department;
                        this.manageMessage.name = response.data.userName;
                        this.manageMessage.call = response.data.userCellphone;
                        this.manageMessage.identity = response.data.identity;
                        
                        if(this.manageMessage.identity == '1') {
                            this.manageMessage.job = ['超级管理员'];
                            this.manageDepartShow = false;
                        } 
                        if(this.manageMessage.identity == '2') {
                            this.manageMessage.job = ['园区经理'];
                            this.manageDepartShow = false;
                        } 
                        if(this.manageMessage.identity == '3') {
                            this.manageMessage.job = [];
                            for(let i in response.data.job){
                                if(response.data.job[i] == 1){
                                    this.manageMessage.job.push('经理')
                                }else if(response.data.job[i] == 2){
                                    this.manageMessage.job.push('员工')
                                }
                            }
                            this.manageDepartShow = true;
                        }
                    }
                })
                if (this.isSuper || this.isParkManager) {
                    this.getMyRepairmentCount().then( (res) => {
                        if (res.data.code === '00000') {
                            this.repairmentCount = res.data.count;
                        }
                    });
                    this.getMyReportCount().then( (res) => {
                        if (res.data.code === '00000') {
                            this.reportCount = res.data.count;
                        }
                    });
                    this.getMyComplaintCount().then( (res) => {
                        if (res.data.code === '00000') {
                            this.complaintCount = res.data.count;
                        }
                    });
                } else {
                    for (let i in this.permissions) {
                        if (this.permissions[i] === 1100) {
                            this.getMyRepairmentCount().then( (res) => {
                                if (res.data.code === '00000') {
                                    this.repairmentCount = res.data.count;
                                }
                            });
                        }
                        if (this.permissions[i] === 1300) {
                            this.getMyReportCount().then( (res) => {
                                if (res.data.code === '00000') {
                                    this.reportCount = res.data.count;
                                }
                            });
                        }
                        if (this.permissions[i] === 1200) {
                            this.getMyComplaintCount().then( (res) => {
                                if (res.data.code === '00000') {
                                    this.complaintCount = res.data.count;
                                }
                            });
                        }
                    }
                }
            },
            manageMessageOrderRun(index){
                (index == 0) && (this.$router.push("/manageSystem/property/repairment"));
                (index == 1) && (this.$router.push("/manageSystem/property/report"));
                (index == 2) && (this.$router.push("/manageSystem/property/complaint"));
            },
            //首页：上报数量-环形图
            pieChart() {
                this.myPieCharts = this.$echarts.init(this.$refs.managePie);
                let chartWidthd = this.myPieCharts._dom.getElementsByTagName('div')[0].style.width;
                window.addEventListener('resize',() => {
                    this.myPieCharts.resize();
                    chartWidthd = this.myPieCharts._dom.getElementsByTagName('div')[0].style.width;
                    this.myPieCharts.setOption({
                        graphic:{
                            left: parseInt(chartWidthd) * .3 - 45 + 'px',
                            style: {
                                
                            }
                        },
                    });
                },false)
                const pieOption = {
                    backgroundColor: '#fff',  
                    tooltip: {
                        trigger: 'item',
                        formatter: (val) => {
                            var name = '';
                            if (val.data.name == 'report') { name = '报事'}
                            if (val.data.name == 'repair') { name = '报修'}
                            if (val.data.name == 'complaint') { name = '投诉'}
                            return val.seriesName + '<br>&nbsp&nbsp&nbsp&nbsp' + name + " : " + val.data.value;
                        }
                    },
                    legend: {
                        show: true,
                        orient: 'vertical',
                        right: '5%',
                        top: 0,
                        itemGap: 10,
                        formatter: (s) => {
                            (s === 'complaint') && (s = "投诉");
                            (s === 'repair') && (s = "报修");
                            (s === 'report') && (s = "报事");
                            return " " + s + " | "  + 0  + "  " + 0.00 + '%'
                        },
                        data: ['complaint', 'repair', 'report'],
                        textStyle: {
                            fontSize:12 
                        }
                    },
                    graphic:{
                        type:'text',
                        left: parseInt(chartWidthd) * .3 - 40 + 'px',
                        top:'center',
                        style:{
                            text:this.nowYear + "年" + this.nowMonth + "月份\n  总数：0",
                            fontSize: 14,
                            fill:'#000',
                        }
                    },
                    series: [
                        {
                            name:'上报数量',
                            type: 'pie',
                            clockwise: false,
                            radius: ['50%', '75%'],
                            center: ['30%', 'center'],
                            itemStyle: {
                                normal:{
                                    borderWidth: 10,
                                    borderColor: "#fff",
                                    label: {
                                        show: false,
                                    },
                                    labelLine:{
                                        show:false,
                                    }
                                },
                                emphasis: {
                            
                                }
                            },
                            data: [
                                {value: 0, name: 'complaint'},
                                {value: 0, name: 'repair'},
                                {value: 0, name: 'report'},
                            ]
                        }
                    ],
                    color: ['#6C99FC','#FA2C68','#FCCC6D']
                }
                this.myPieCharts.setOption(pieOption);         
            },
            //pie 当月按钮点击
            monthChange() {
                if(this.isSuper) {
                    this.$http({
                        method: "get",
                        url: "/api/manageSystem/system/getFunctionProportion",
                        params: {
                            type: 2
                        }
                    }).then((res) => {
                        if (res.data.code === '00000') {
                            this.bgC = 1;
                            let time = 'mouth';
                            this.pieMessage(time,res);
                        }  
                    }).catch((response) => {
                        console.log(response);
                    })
                }
            },
            //pie 当年按钮点击
            yearChange() {
                if(this.isSuper) {
                    this.$http({
                        method: "get",
                        url: "/api/manageSystem/system/getFunctionProportion",
                        params: {
                            type: 1
                        }
                    }).then( (res) => {
                        if (res.data.code === '00000') {
                            this.bgC = 2;
                            let time = 'year';
                            this.pieMessage(time,res)
                        }
                    }).catch((response) => {
                        console.log(response);
                    })
                }
            },
            //环形图修改数据
            pieMessage(time,res){
                const text = '';
                let pieIndex = 0;
                const com = res.data.data[0].complaint;
                const repa = res.data.data[1].repair;
                const repo = res.data.data[2].report;
                const all = com + repo + repa;
                let index = -1; 
                let average = [];
                this.myPieCharts.setOption({
                    legend: {
                        formatter: (s) => {   
                            let val = 0;
                            index ++;
                            for (let i = 0; i < 3; i ++) {
                                if (res.data.data[i][s]) {
                                    val = res.data.data[i][s];
                                }
                            }
                            (s === 'complaint') && (s = "投诉");
                            (s === 'repair') && (s = "报修");
                            (s === 'report') && (s = "报事");
                            if (all == 0) {
                                return " " + s + " | "  + val  + "  " + 0 + '%'
                            } else {
                                if (index < 2) {
                                    average[index] = (val / all * 100).toFixed(2)
                                    
                                }else {
                                    average[index] = (100 - average[0] - average[1]).toFixed(2)
                                }
                                return " " + s + " | "  + val  + "  " + average[index] + '%';
                                // return " " + s + " | "  + val  + "  " + (val / all * 100).toFixed(2) + '%'
                            }
                        }, 
                    },
                    graphic: {
                        style: {
                            text: (time === 'mouth') ? (this.nowYear + "年" + this.nowMonth +"月份\n\n   总数：" + all) : (this.nowYear + " 年\n\n   总数：" + all),
                        }
                    },
                    series:[
                        {
                            
                            data: [
                                {value: res.data.data[0].complaint, name: 'complaint'},
                                {value: res.data.data[1].repair, name: 'repair'},
                                {value: res.data.data[2].report, name: 'report'},
                            ]
                        }
                    ] 
                });
            },
            barChartSet(command) {
                this.myBarCharts = this.$echarts.init(this.$refs.manageBar);
                let barIndex = 0;
                window.addEventListener('resize', () => {
                    this.myBarCharts.resize();
                },false)
                if (command) {
                    this.command = command;
                    this.$http({
                        method: "get",
                        url: "/api/manageSystem/system/getRepairmentCsr",
                        params: {
                            year: command
                        }
                    }).then((res) => {
                        if (res.data.code === '00000') {
                            const dataCsr = [];
                            const dataCount = [];
                            const dataPleasedNum = [];
                            let barIndex = 0;
                            let zeroList = [];
                            if (res.data.data.xMonthList) {
                                for (let i = 0; i < 12; i ++) {
                                    dataCsr[i] = '';
                                    dataCount[i] = '';
                                    dataPleasedNum[i] = '';
                                    for(let j = 0; j < 12; j ++){
                                        if (res.data.data.xMonthList[j] == i + 1) {
                                            dataCsr[i] = res.data.data.yCsr[j];
                                            dataCount[i] = res.data.data.yCountList[j];
                                            dataPleasedNum[i] = res.data.data.yPleasedNumList[j];
                                            barIndex ++;
                                            if(dataCsr[i] == 0){
                                                zeroList.push(i)
                                            }
                                        }
                                    }
                                }
                            } else {
                                for (let i = 0; i < 12; i ++) {
                                    dataCsr[i] = '';
                                }
                            }
                            const options = {
                                xAxis: {
                                    data: this.mouthData,
                                    boundaryGap:false,
                                    nameGap: 20,
                                    axisLabel:{
                                        interval: 0,
                                        formatter:function(val){
                                            return val + '\n' + '月份' ;
                                        },
                                        textStyle: {
                                            fontSize: 16
                                        },
                                    },
                                    axisTick: { 
                                        show: false
                                    },
                                    axisLine: { show: false },
                                    axisPointer:{
                                        show: true
                                    }
                                },
                                yAxis:{ show: false },
                                grid:[
                                    {x:'5%',y:'20%',width:'90%',height:'55%'}
                                ],
                                tooltip: {
                                    formatter: function (val){
                                        if(val[0]) {
                                            for(let i = 0; i < zeroList.length;i ++) {
                                                if(val[0].dataIndex == zeroList[i]) {
                                                    return command + "-" + val[0].name 
                                                }else {
                                                    return command + "-" + val[0].name + " 满意："　+ dataPleasedNum[val[0].dataIndex]  + " 总数：" + dataCount[val[0].dataIndex];
                                                }
                                            }
                                            
                                        }else{
                                            return command + "-" + val.name + " 满意："　+ dataPleasedNum[val.dataIndex]  + " 总数：" + dataCount[val.dataIndex];
                                        }                                    
                                    },

                                },
                                series: [
                                    {
                                        name: '报修满意度',
                                        type: "bar",
                                        barWidth: 24,
                                        barGap: "20%",
                                        itemStyle: {
                                            normal: {
                                                label: {
                                                    formatter: function (val) {
                                                        return dataCsr[val.dataIndex] + "%" ;
                                                    }
                                                }
                                            }
                                        },
                                        data: dataCsr
                                    }
                                ]
                            };
                            this.myBarCharts.setOption(options);
                        }
                    }).catch((response) => {
                        console.log(response);
                    })
                }else{//第一次创建柱形图
                    command = 2017;
                    const barOption = {
                        xAxis: {
                            data: this.mouthData,
                            boundaryGap:false,
                            nameGap: 20,
                            axisLabel:{
                                interval: 0,
                                formatter:function(val){
                                    return val + '\n' + '月份' ;
                                },
                                textStyle: {
                                    fontSize: 16
                                },
                            },
                            axisTick: { 
                                show: false
                            },
                            axisLine: { show: false },
                            axisPointer:{
                                show: true
                            }
                        },
                        yAxis:{ show: false },
                        grid:[
                            {x:'5%',y:'20%',width:'90%',height:'55%'}
                        ],
                        series: [
                            {
                                name: '报修满意度',
                                type: "bar",
                                barWidth: 24,
                                barGap: "20%",
                                itemStyle: {
                                    normal: {
                                        color: "#38A0FC",
                                        label: {
                                            show: true,
                                            position: 'top',
                                            textStyle: {
                                                fontSize: 12,
                                                color: '#333333'
                                            },
                                            formatter: function () {

                                            }
                                        }
                                    }
                                },
                                data: []
                            }
                        ]

                    };
                    this.myBarCharts.setOption(barOption);
                }
            },
            //首页：报修满意度-柱形图
            barChart(command){
                if (this.isSuper || this.isParkManager) {
                    this.barChartSet(command);
                } else {
                    for (let i = 0; i < this.permissions.length; i ++) {
                        if (this.permissions[i] === 1100) {
                            this.barChartSet(command);
                        }
                    }
                }
            }
        },
        watch: {
            parkName() {
                // 重新请求所需数据
                this.barChart(this.command);
                this.monthChange();
                this.getindexHeaderInfo();
            }
        },
        mounted() { 
            this.handleCommand(2018)
            this.pieChart();
            this.barChart();
            this.monthChange();
            let yearIndex = 0;
            for (let i = this.nowYear; i > 2007; i --) {
                this.mansgeDrop[yearIndex] = i;
                yearIndex ++;
            }
            this.getindexHeaderInfo();
            //首页：个人默认信息
            // this.$http({
            //     method: 'get',
            //     url: "/api/manageSystem/system/getIndexInfo",
            // }).then( (response) => {
            //     if (response.data.code === '00000') {
            //         this.manageMessageOrder[0].count = response.data.myComplaintCount;
            //         this.manageMessageOrder[1].count = response.data.myRepairsCount;
            //         this.manageMessageOrder[2].count = response.data.myReportsCount;
            //         this.manageMessage.depart = response.data.department;
            //         this.manageMessage.name = response.data.userName;
            //         this.manageMessage.call = response.data.userCellphone;
            //         this.manageMessage.identity = response.data.identity;
            //         if(this.manageMessage.identity == '1') {
            //             this.manageMessage.job = ['超级管理员'];
            //             this.manageDepartShow = false;
            //         } 
            //         if(this.manageMessage.identity == '2') {
            //             this.manageMessage.job = ['管理员'];
            //             this.manageDepartShow = false;
            //         } 
            //         if(this.manageMessage.identity == '3') {
            //             this.manageMessage.job = [];
            //             for(let i in response.data.job){
            //                 if(response.data.job[i] == 1){
            //                     this.manageMessage.job.push('经理')
            //                 }else if(response.data.job[i] == 2){
            //                     this.manageMessage.job.push('员工')
            //                 }
            //             }
            //             this.manageDepartShow = true;
            //         }
            //     }
            // }).catch( (response) => {
            //     console.log(response)
            // })
        }
    }
</script>