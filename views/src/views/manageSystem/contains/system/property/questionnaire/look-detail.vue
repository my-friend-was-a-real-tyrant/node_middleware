<template>
    <div class="questionnairedetail">
        <div class="topNav">
            <el-button type="danger" @click="BackToList" size="small">问卷列表</el-button>
        </div>
        <div>
            <el-form class="demo-form-inline" label-width="90px">
                <el-form-item label="标题：">
                    <el-input style="width: 600px;" readonly size="small" v-model="form.title" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="内容：">
                    <el-input style="width: 600px;" v-model="form.content" type="textarea" :autosize="{ minRows: 2}"
                        placeholder="" readonly ></el-input>
                </el-form-item>
                <el-form-item label="封面图片：">
                    <img class="image" :src="form.image" alt="">
                </el-form-item>
                <el-form-item label="前台地址：">
                    <el-input style="width: 600px;" size="small" v-model="form.url" placeholder="" readonly ></el-input>
                </el-form-item>
                <el-form-item label="针对版本：">
                    <el-input style="width: 180px;" size="small" v-model="form.groupType" placeholder="" readonly ></el-input>
                </el-form-item>
                <el-form-item label="结束时间：">
                    <el-date-picker style="width: 180px;" v-model="form.endDatetime" size="small" type="date" placeholder="" readonly ></el-date-picker>
                </el-form-item>
                <el-form-item label="是否上线：">
                    <el-input style="width: 180px;" size="small" v-model="form.sataes" placeholder="" readonly ></el-input>
                </el-form-item>
                <el-form-item label="问卷问题：">
                    <div class="questioncontent" v-for="(item, i) in form.sortList" :key="i">
                        <div class="title">
                            <span>标题：</span>
                            <el-input style="width: 523px;" size="small" v-model="item.name" readonly ></el-input>
                        </div>
                        <div v-for="(item1, j) in item.questionList" :key="j" class="questionList">
                            <el-form :model="form" ref="item1" label-width="90px">
                                <el-form-item :label="'问题' + '：'">
                                    <el-input style="width: 480px;" size="small" v-model="item1.question" readonly ></el-input>
                                </el-form-item>
                                <el-form-item label="类型：">
                                    <el-select style="width: 480px;" size="small" v-model="item1.type" placeholder="" disabled>
                                        <el-option label="单选题" :value="1"></el-option>
                                        <el-option label="多选题" :value="2"></el-option>
                                        <el-option label="填空题" :value="3"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="是否必填：">
                                    <el-select style="width: 480px;" size="small" v-model="item1.isMust" placeholder="" disabled>
                                        <el-option label="是" :value="1"></el-option>
                                        <el-option label="否" :value="2"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="选项：" v-if="item1.type != 3">
                                    <el-input style="width: 480px;" v-model="item1.optionsListstr" size="small" placeholder="" readonly ></el-input>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                form: {}
            }
        },
        mounted () {
            this.Get();
        },
        methods: {
            Get() {
                this.$http({
                    url: '/api/manageSystem/system/property/questionnaire/getQuestionnaireInfo',
                    params: {
                        id: this.$route.query.id
                    }
                }).then(res => {
                    if (res.data.code === '00000') {
                        let result = res.data;
                        if (result.questionnaireInfo.isShow === 1) {
                            result.questionnaireInfo["sataes"] = "上线";
                        } else {
                            result.questionnaireInfo["sataes"] = "下线";
                        }
                        for (let i = 0; i < result.questionnaireInfo.sortList.length; i++) {
                            let item1 = result.questionnaireInfo.sortList[i];
                            for (let j = 0; j < item1.questionList.length; j++) {
                                let item2 = item1.questionList[j];
                                let str = "";
                                if (item2.optionsList) {
                                    for (let k = 0; k < item2.optionsList.length; k++) {
                                        let item3 = item2.optionsList[k];
                                        if (item3.type != 3) {
                                            if (k < item2.optionsList.length - 1) {
                                                str += item3.answerOptions + '、';
                                            } else {
                                                str += item3.answerOptions;
                                            }
                                        } else {
                                            str = "由填表的用户自己填写";
                                        }
                                    }
                                    item1.questionList[j]["optionsListstr"] = str;
                                }
                            }
                        }
                        this.form = result.questionnaireInfo;
                        console.log(this.form);
                    }
                }).catch(error => {});
            },
            BackToList() {
                this.$router.push({
                    path: "/manageSystem/property/questionnaire"
                });
            }
        }
    }
</script>
<style lang="less" scoped>
    .image{
        width: 150px;
        height: 150px;
        border: 1.5px dashed #DCDFE6;
        border-radius: 5px;
    }
</style>
