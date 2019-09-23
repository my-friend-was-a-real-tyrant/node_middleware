<style lang="less" scoped>
    .userFunction{padding: 0;
        &-dataCover{width: 100%; height: 70px;}
        &-data{ height: 50px; margin: 0 30px; border-bottom: 1px solid #E4E4E4;padding: 10px 20px;
            span{ margin-right: 20px; cursor: pointer}
        }
        &-word{ color: #000; text-decoration: underline;}
        &-link{ color: #000; text-decoration: none; cursor: pointer;}
        &-chartCover{background: white; margin: 30px}
        &-chart{width: 100%; height: 600px;}
        &-service{display: flex; 
            ul{ list-style: none; padding: 0 15px; margin: 0 30px; cursor: pointer; padding: 20px 0; opacity: 0.7;
                li{ line-height: 30px; font-size: 12px}
                li:nth-of-type(1){ font-size: 20px;}
                li:nth-of-type(3){ display: flex; justify-content: space-between; color: #93DEDE; font-size: 14px}
                li:nth-of-type(3).tabColor{ color: #6C99FC; border-bottom: 1px solid #6C99FC;}
            }
        }
        &-chartDiv{ width: 100%; height: 600px; background: #EEF1F6; padding: 30px; 
            ul{ width: 100%; height: 100%; position: relative; background: #ffffff; border-radius: 5px;
                li{ width: 100%; height: 100%; position: absolute}
            }
            &-charts{ width: 100%; height: 100%;}
        }
        .tabActive{ display: block}
        .tabNormal{ display: none}
        
        .tabOpacity{ opacity: 1}
    }
</style>
<template>
    <div class="userFunction">
        <div class="userFunction-data">
            <p class="fr">
                <span class="userFunction-word" :class = "{'userFunction-link' : linkType === 2}" @click="handleTypeChange(1)">日</span>
                <span class="userFunction-word" :class = "{'userFunction-link' : linkType === 1}" @click="handleTypeChange(2)">月</span>
                <el-date-picker
                    type="date"
                    size="small"
                    placeholder="选择日期"
                    v-show="linkType === 1"
                    v-model="dateTime"
                    :clearable="false">
                </el-date-picker>
                <el-date-picker
                    type="month"
                    size="small"
                    placeholder="选择月"
                    v-show="linkType === 2"
                    v-model="month"
                    :clearable="false">
                </el-date-picker>
            </p>
        </div>
        
        <div class="userFunction-service">
            <ul v-for="(n,i) in userTab" :key="n" @click="userCreateChart(i)" :class="{'tabOpacity' : tabType === i}">
                <li>{{n.title}}</li>
                <li>使用次数 占比</li>
                <li :class="{'tabColor' : tabType === i}"><span>{{n.number}}</span><span>{{n.percent}}%</span></li>
            </ul>
        </div>
        <div class="userFunction-chartDiv">
            <ul>
                <li><div class="userFunction-chartDiv-charts"></div></li>
            </ul>     
        </div>
    </div>
</template>
<script>
    import { transition } from 'publicSource/dateTransition';
    export default {
        data() {
            const dateTime = new Date();
            const month = new Date();
            return{
                linkType: 1,
                month: month,
                tabType: 0,
                xData: [],
                yData: [],
                chartsName: '',
                dateTime: dateTime,
                userFunctionChart: '',
                userTab: [
                    {
                        title: "维修服务",
                        number: 0,
                        percent: '0'
                    },
                    {
                        title: "园区报事",
                        number: 0,
                        percent: '0'
                    },
                    {
                        title: "投诉表扬",
                        number: 0,
                        percent: '0'
                    },
                    {
                        title: "咨询建议",
                        number: 0,
                        percent: '0'
                    },
                    {
                        title: "园区活动",
                        number: 0,
                        percent: '0'
                    }
                ]
            }
        },
        methods: {
            handleTypeChange(t) {
                this.linkType = t;
                this.$http({
                    method: 'get',
                    url: '/api/manageSystem/system/user/functionStatistics/getFunctionStatistics',
                    params: {
                        type: this.linkType,
                        date: this.linkType === 1
                            ? transition(this.dateTime)
                            : transition(this.month)
                    }
                }).then( (res) => {
                    if (res.data.code === '00000') {
                        let data = res.data.data;
                        data.repairment.percent;
                        this.userTab = [
                            {
                                title: "维修服务",
                                number: data.repairment.count,
                                percent: data.repairment.percent
                            },
                            {
                                title: "园区报事",
                                number: data.report.count,
                                percent: data.report.percent
                            },
                            {
                                title: "投诉表扬",
                                number: data.complaint.count,
                                percent: data.complaint.percent
                            },
                            {
                                title: "咨询建议",
                                number: data.suggestion.count,
                                percent: data.suggestion.percent
                            },
                            {
                                title: "园区活动",
                                number: data.activity.count,
                                percent: data.activity.percent
                            }
                        ];
                        this.userCreateChart(this.tabType)
                    }
                    
                }).catch((response) => {
                    console.log(response);
                })
            }, 
            userCreateChart(index) {
                this.tabType = index;
                let url = '';
                if (index === 0){
                    url = 'getRepairmentCharts';
                    this.chartsName = "维修服务使用趋势"
                }else if (index === 1){
                    url = 'getReportCharts';
                    this.chartsName = "园区报事使用趋势"
                }else if (index === 2){
                    url = 'getComplaintCharts';
                    this.chartsName = "投诉表扬使用趋势"
                }else if (index === 3){
                    url = 'getSuggestionCharts';
                    this.chartsName = "咨询建议使用趋势"
                } else if (index === 4){
                    url = 'getActivityCharts';
                    this.chartsName = "园区活动使用趋势"
                }              
                this.$http({
                    method: 'get',
                    url: '/api/manageSystem/system/user/functionStatistics/' + url,
                    params: {
                        type: this.linkType,
                        date: this.linkType === 1
                            ? transition(this.dateTime)
                            : transition(this.month)
                    }
                }).then( (res) => {
                    if (res.data.code === '00000') {
                        this.userFunctionChart.setOption({
                            title: {
                                text: this.chartsName
                            },
                            xAxis: {
                                data: res.data.data.xDate,
                            },
                            series: [{
                                data: res.data.data.yNum,
                            }]
                        })  
                    }
                }).catch((response) => {
                    console.log(response);
                })
                window.onresize = () => {
                    this.userFunctionChart.resize();
                };
            }
        },
        mounted() {
            this.handleTypeChange(1);
            let userFunctionChartDiv = document.querySelector('.userFunction-chartDiv-charts');
            this.userFunctionChart = this.$echarts.init(userFunctionChartDiv);
            const option = {
                title:{
                    text: "",
                    left: "1%",
                    top: "5%",
                    textStyle: {
                        fontSize: 16,
                        color: "#999999"
                    }
                },
                tooltip: {
                    formatter: "{a}<br /> 时间: {b} 数量: {c}"
                },
                grid: [
                    { x: '5%', y: '20%', width: '90%', height: '70%' }
                ],
                xAxis: {
                    data: this.xData,
                    nameGap: 30,
                    axisPointer: {
                        show: true,
                        label: {
                            show: true,
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel:{
                        textStyle: {
                            fontSize: 14    
                        },
                    }
                    
                },
                yAxis: {
                    type: 'value',
                    nameGap: 20,
                    axisTick: {
                        show: false,
                    },
                    axisLabel:{
                        textStyle: {
                            fontSize: 16   
                        },
                    },
                    minInterval: 1
                },
                series: [
                    {   
                        name: "维修服务",
                        type: "line",   
                        data: this.yData,
                        symbolSize: 5,
                        itemStyle:{
                            normal: {
                                color: "#333333"
                            }
                        },
                        lineStyle: {
                            normal: {
                                color: '#5793f3',
                                width: 2
                            }
                        },
                    }
                ]

            }
            this.userFunctionChart.setOption(option) 
            // this.userCreateChart(0) 
        },
        watch: {
            dateTime() {
                if (this.linkType === 1) {
                    this.handleTypeChange(1);
                }
            },
            month() {
                if (this.linkType === 2) {
                    this.handleTypeChange(2);
                }
            }
        }
    }
</script>
