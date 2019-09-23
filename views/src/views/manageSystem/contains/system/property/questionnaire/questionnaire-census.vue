<template>
    <div class="questionnairecensus">
        <div class="topNav">
            <el-button type="primary" size="small" @click="exportExcel">导出Excel</el-button>
            <el-button type="danger" @click="BackToList" size="small">问卷列表</el-button>
        </div>
        <h2>{{ (new Date()).getFullYear() + "年度年终满意度调查结果统计表(" + type + ")" }}</h2>
        <div class="table">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="name" label="项目" align="center" width="120"></el-table-column>
                <el-table-column label="满意度调查项目" align="left">
                    <template scope="props">
                        <ul>
                            <li class="ul-li" v-for="(item, i) in props.row.questionList" :key="i">{{ item.question }}</li>
                        </ul>
                    </template>
                </el-table-column>
                <el-table-column label="参与人次" width="120" align="center">
                    <template scope="props">
                        <ul>
                            <li class="ul-li" v-for="(item, i) in props.row.questionList" :key="i">{{ item.userCount }}</li>
                        </ul>
                    </template>
                </el-table-column>
                <el-table-column label="满意人次" width="120" align="center">
                    <template scope="props">
                        <ul>
                            <li class="ul-li green" v-for="(item, i) in props.row.questionList" :key="i">{{ item.res1 }}</li>
                        </ul>
                    </template>
                </el-table-column>
                <el-table-column label="基本满意人次" width="140" align="center">
                    <template scope="props">
                        <ul>
                            <li class="ul-li warning" v-for="(item, i) in props.row.questionList" :key="i">{{ item.res2 }}</li>
                        </ul>
                    </template>
                </el-table-column>
                <el-table-column label="不满意人次" width="140" align="center">
                    <template scope="props">
                        <ul>
                            <li class="ul-li danger" v-for="(item, i) in props.row.questionList" :key="i">{{ item.res3 }}</li>
                        </ul>
                    </template>
                </el-table-column>
                <el-table-column label="满意率" prop="scle" width="130" align="center"></el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                tableData: [],
                type: ""
            }
        },
        mounted () {
            this.Get();
        },
        methods: {
            Get() {
                this.$http({
                    url: '/api/manageSystem/system/property/questionnaire/getQuestionnaireStatistics',
                    params: {
                        id: this.$route.query.id
                    }
                }).then(res => {
                    if (res.data.code === '00000') {
                        let result = res.data;
                        if (result.statisticsInfo.sortList.length > 0) {
                            result.statisticsInfo.sortList.map(item1 => {
                                let totalall = 0;
                                let total1 = 0;
                                let total2 = 0;
                                let total3 = 0;
                                let scle = 0;
                                item1.questionList.map(item2 => {
                                    let num1 = 0;
                                    let num2 = 0;
                                    let num3 = 0;
                                    item2.optionsList.map(item3 => {
                                        if (item3.answerOptions === "满意") {
                                            num1 = item3.optionCount;
                                        }
                                        if (item3.answerOptions === "基本满意") {
                                            num2 = item3.optionCount;
                                        }
                                        if (item3.answerOptions === "不满意") {
                                            num3 = item3.optionCount;
                                        }
                                    });
                                    item2["res1"] = num1;
                                    item2["res2"] = num2;
                                    item2["res3"] = num3;
                                    totalall += item2.userCount;
                                    total1 += item2.res1;
                                    total2 += item2.res2;
                                    total3 += item2.res3;
                                });
                                item1.questionList.push({
                                    question: "总体评价",
                                    res1: total1,
                                    res2: total2,
                                    res3: total3,
                                    userCount: totalall
                                });
                                if ((total1 + total2) > 0 && totalall > 0) {
                                    scle = (((total1 + total2) / totalall) * 100).toFixed(2) + "%";
                                } else {
                                    scle = 0 + "%";
                                }
                                item1["scle"] = scle;
                            });
                        }
                        this.tableData = result.statisticsInfo.sortList;
                        this.type = result.statisticsInfo.groupType;
                    }
                }).catch(error => {});
            },
            BackToList() {
                this.$router.push({
                    path: "/manageSystem/property/questionnaire"
                });
            },
            exportExcel() {
                this.$http({
                    url: '/api/manageSystem/system/property/questionnaire/exportStatistics',
                    params: {
                        id: this.$route.query.id
                    }
                }).then(res => {
                    if (res.data.code === '00000') {
                        window.location.href = res.data.path;
                    }
                }).catch(error => {});
            }
        }
    }
</script>
<style lang="less">
    .questionnairecensus{
        h2{
            padding: 20px;
            text-align: center;
        }
        ul{
            .ul-li{
                list-style: none;
                height: 40px;
                padding: 0 10px;
                line-height: 40px;
                &:not(:last-child){
                    border-bottom: 1px solid #DCDFE6;
                }
                &:last-child{
                    font-weight: 800;
                    font-size: 18px;
                    text-align: center;
                }
            }
            .green{
                color: #67C23A;
            }
            .warning{
                color: #E6A23C;
            }
            .danger{
                color: #F56C6C;
            }
        }
        .el-table .el-table__body-wrapper .cell{
            padding: 0;
        }
    }
</style>
