<style lang="less" scoped>
    .scoped{
        &-header{ margin-bottom: 20px; font-size: 20px; line-height: 1;
            &-blue{ font-size: 24px; color: #5793f3;}
        }
        &-charts{ height: 600px;}
        &-type{ margin: 0 10px; color: #000; text-decoration: underline;
            &-link{ color: #000; text-decoration: none; cursor: pointer;}
        }
    }
</style>
<template>
    <div class="scoped">
        <div class="scoped-header">
            <span>累计用户总量: </span>
            <span class="scoped-header-blue">{{ count }}</span>
        </div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span style="line-height: 36px;">新增用户趋势</span>
                <p class="fr">
                    <span class="scoped-type" :class="{'scoped-type-link': type === 2}" @click="handleTypeChange(1)">日</span>
                    <span class="scoped-type" :class="{'scoped-type-link': type === 1}" @click="handleTypeChange(2)">月</span>
                    <el-date-picker
                        type="date"
                        size="small"
                        placeholder="选择日期"
                        v-show="type === 1"
                        v-model="date"
                        :clearable="false">
                    </el-date-picker>
                    <el-date-picker
                        type="month"
                        size="small"
                        placeholder="选择月"
                        v-show="type === 2"
                        v-model="month"
                        :clearable="false">
                    </el-date-picker>
                </p>
            </div>
            <div class="scoped-charts">
                <!-- .. -->
            </div>
        </el-card>
    </div>
</template>
<script>
    import { transition } from 'publicSource/dateTransition'
    export default {
        data() {
            const date = new Date();
            const month = new Date();
            const yAxisNum = [];
            const yAxisPer = [];
            const xAxis = [];
            return {
                count: 0,
                myChart: {},
                type: 1,
                date,
                month,
                xAxis,
                yAxisNum,
                yAxisPer
            }
        },
        methods: {
            handleTypeChange(t) {
                this.type = t;
            },
            ajaxFun() {
                this.$http({
                    url: '/api/manageSystem/system/user/userStatistics/getUserStatistics',
                    params: {
                        type: this.type,
                        date: this.type === 1
                            ? transition(this.date)
                            : transition(this.month)
                    }
                }).then((response) => {
                    if (response.data.code === '00000') {
                        this.xAxis = response.data.data.x;
                        this.yAxisPer = response.data.data.yRatio;
                        this.yAxisNum = response.data.data.yNum;
                        this.count = response.data.data.count;
                        this.myChart.setOption({
                            xAxis: {
                                data: this.xAxis,
                            },
                            series: [{
                                data: this.yAxisNum,
                            }, {
                                data: this.yAxisPer,
                            }]
                        });
                    }
                }).catch((response) => {
                    console.log(response);
                });
            }
        },
        mounted() {
            // 基于准备好的dom，初始化echarts实例
            this.myChart = this.$echarts.init(document.querySelector('.scoped-charts'));

            // 指定图表的配置项和数据
            const option = {
                title: {
                    show: false
                },
                legend: {
                    data:['新增用户', '新增用户活跃占比']
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        axis: 'x'
                    },
                    formatter: '{b}<br/>{a0}: {c0}<br/>{a1}: {c1}%'
                },
                xAxis: {
                    data: this.xAxis,
                    axisPointer: {
                        show: true,
                        label: {
                            show: true,
                        }
                    }
                },
                yAxis: [{
                    name: '新增用户',
                    axisLabel: {  
                        show: true,  
                        interval: 'auto',  
                        // formatter: '{value} %'  
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#5793f3'
                        }
                    },
                    minInterval: 1
                }, {
                    name: '新增用户活跃占比',
                    axisLabel: {  
                        show: true,  
                        interval: 'auto',  
                        formatter: '{value} %'  
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#d14a61'
                        }
                    }
                }],
                dataZoom: {},
                series: [{
                    name: '新增用户',
                    type: 'line',
                    data: this.yAxisNum,
                    itemStyle: {
                        normal: {
                            color: '#5793f3'
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: '#5793f3',
                            width: 2
                        }
                    },
                }, {
                    name: '新增用户活跃占比',
                    type: 'line',
                    data: this.yAxisPer,
                    yAxisIndex: 1,
                    itemStyle: {
                        normal: {
                            color: '#d14a61'
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: '#d14a61',
                            width: 2
                        }
                    },
                }]
            };

            // 使用刚指定的配置项和数据显示图表。
            this.myChart.setOption(option);
            window.onresize = () => {
                //重置容器高宽
                this.myChart.resize();
            };
            this.ajaxFun();
        },
        watch: {
            type() {
                this.ajaxFun();
            },
            date() {
                if (this.type === 1) {
                    this.ajaxFun();
                }
            },
            month() {
                if (this.type === 2) {
                    this.ajaxFun();
                }
            }
        }
    }
</script>
