<style lang="less" scoped>
    .scoped{
        &-charts{ height: 600px;}
        &-type{ margin: 0 10px; color: #000; text-decoration: underline;
            &-link{ color: #000; text-decoration: none; cursor: pointer;}
        }
    }
</style>
<template>
    <div class="scoped">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span style="line-height: 36px;">活跃用户趋势</span>
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
            const yAxis = [];
            const xAxis = [];
            return {
                myChart: {},
                type: 1,
                date,
                month,
                xAxis,
                yAxis
            }
        },
        methods: {
            handleTypeChange(t) {
                this.type = t;
            },
            ajaxFun() {
                this.$http({
                    url: '/api/manageSystem/system/user/activityUser/getActivityUser',
                    params: {
                        type: this.type,
                        date: this.type === 1
                            ? transition(this.date)
                            : transition(this.month)
                    }
                }).then((response) => {
                    if (response.data.code === '00000') {
                        this.xAxis = response.data.data.x;
                        this.yAxis = response.data.data.y;
                        this.myChart.setOption({
                            xAxis: {
                                data: this.xAxis,
                            },
                            series: [{
                                data: this.yAxis,
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
                    data:['活跃用户', '比例']
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        axis: 'x'
                    },
                    formatter: '{b}<br/>{a}: {c}'
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
                yAxis: {
                    name: '活跃人数',
                    axisLabel: {  
                        show: true,  
                        interval: 'auto',  
                        // formatter: '{value} %'  
                    },
                    minInterval: 1
                },
                dataZoom: {},
                series: [{
                    name: '活跃用户',
                    type: 'line',
                    data: this.yAxis,
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
