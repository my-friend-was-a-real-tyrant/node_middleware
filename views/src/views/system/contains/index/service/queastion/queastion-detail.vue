<template>
    <div class="queastion-detail">
        <div class="box">
            <div class="alert" v-if="!read">
                <h2>年终满意度调查前言</h2>
                <p>尊敬的业户:</p>
                <p class="content-p">
                    您好! 为秉承公司“普罗大众 惠享生活”的服务理念，进一步提升公司的服务质量、服务水平，
                    中大普惠物业将通过“惠生活APP”进行此次调研，我们诚恳地邀请您提出宝贵的意见和建议。
                    本卷旨在征询您对我公司服务的满意程度，请您花宝贵的5分钟时间填写本卷，在调查项目的空格内填上您的真实感受。
                    为了感谢广大业主对此次满意度调查的支持与配合，在您完成调查后将有一份“神秘”礼品相赠。同时提醒您，
                    在此次调查中请注意以下几个事项：
                </p>
                <ul class="ul">
                    <li>
                        1. 此次调查均采用线上调查模式,每个房号只能一位业主(包括户主及其家人、租户)参与调查，
                        我们以首位有效完成调查的业主的评分为最终调查成绩；
                    </li>
                    <li>2. 参与调查的业主需在调查后10日内至客服中心完成礼品的领取（礼品赠完即止）;</li>
                    <li>3. 请参与调查的业主独立完成调查表，切勿将手机、账号交于他人（包括物业工作人员）进行满意度调查；</li>
                    <li>4. 所有领奖业主信息将会线下进行核实，每户限领一份,如领奖人员非该户业主，将取消领奖资格。</li>
                </ul>
                <p class="notice">（本次满意度调查最终解释权归浙江中大普惠物业有限公司所有）</p>
                <button class="btn" @click="Readly">我已阅读并同意上述协议</button>
            </div>
            <div class="queastionbox">
                <h2 class="title">{{ queastion.title }}</h2>
                <p>尊敬的业主：</p>
                <p class="content-p">{{ queastion.content }}</p>
                <ul>
                    <li>您的姓名：</li>
                    <li class="input-li">
                        <input class="input" type="text" v-model="name" readonly>
                    </li>
                    <li>您的手机号：</li>
                    <li class="input-li">
                        <input class="input" type="text" v-model="phone" readonly>
                    </li>
                </ul>
            </div>
            <div class="questionlist">
                <div class="item" v-for="(item, i) in queastion.sortList" :key="i">
                    <div class="title">{{ item.name }}</div>
                    <div v-for="(item2, j) in item.questionList" :key="j" v-if="item2.type == 1">
                        <div class="question">{{ item2.question }}</div>
                        <div class="type">
                            <span>{{ item2.type == 1 ? "单选题" : item2.type == 2 ? "多选题" : "填空题" }}</span>
                            <span>{{ item2.isMust == 1 ? "（必选）" : "" }}</span>
                        </div>
                        <ul class="result-ul">
                            <li class="result-li" v-for="(item3, k) in item2.optionsList" :key="k" :class="item2.choosed == item3.answerOptionsId ? 'yellow' : ''" @click="Choosed(item2, i, j, item3.answerOptionsId)">
                                <div class="left">{{ item3.answerOptions }}</div>
                                <div class="right">
                                    <img v-if="item2.choosed == item3.answerOptionsId" src="../../../../img/choosed.png" alt="">
                                    <img v-else src="../../../../img/notchoosed.png" alt="">
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div v-for="(item2, j) in item.questionList" :key="j" v-else-if="item2.type == 2">
                        <div class="question">{{ item2.question }}</div>
                        <div class="type">
                            <span>{{ item2.type == 1 ? "单选题" : item2.type == 2 ? "多选题" : "填空题" }}</span>
                            <span>{{ item2.isMust == 1 ? "（必选）" : "" }}</span>
                        </div>
                        <ul class="result-ul">
                            <li class="result-li" v-for="(item3, k) in item2.optionsList" :key="k" :class="item2.choosed.indexOf(item3.answerOptionsId) > -1 ? 'yellow' : ''" @click="Choosed(item2, i, j, item3.answerOptionsId)">
                                <div class="left">{{ item3.answerOptions }}</div>
                                <div class="right">
                                    <img v-if="item2.choosed.indexOf(item3.answerOptionsId) > -1" src="../../../../img/choosed.png" alt="">
                                    <img v-else src="../../../../img/notchoosed.png" alt="">
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div v-for="(item2, j) in item.questionList" :key="j" v-else>
                        <div class="question">{{ item2.question }}</div>
                        <div class="type">
                            <span>{{ item2.type == 1 ? "单选题" : item2.type == 2 ? "多选题" : "填空题" }}</span>
                            <span>{{ item2.isMust == 1 ? "（必填）" : "" }}</span>
                        </div>
                        <ul class="result-ul">
                            <li class="result-li">
                                <textarea class="input" v-model="item2.content"></textarea>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="error-alert" v-show="show">{{ alertmsg }}</div>
            <div class="message-box" v-show="isCommit">
                <div class="message-content">是否提交问卷？</div>
                <div class="message-btns">
                    <div class="left-cancle" @click="isCommit = false">取消</div>
                    <div class="right-submit" @click="Confirm">确认</div>
                </div>
            </div>
            <button class="btn" @click="Submit">提交</button>
        </div>
        <div class="mask" v-show="isCommit"></div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                read: true,
                queastion: {},
                name: "",
                phone: "",
                show: false,
                alertmsg: "",
                answerList: [],
                isCommit: false
            }
        },
        mounted() {
            this.Get();
        },
        methods: {
            Readly() {
                this.read = true;
            },
            Choosed(params1, params2, params3, params4) {
                let item = this.queastion.sortList[params2].questionList[params3];
                if (params1.type == 1) {
                    item.choosed = params4;
                } else if (params1.type == 2) {
                    if (item.choosed.indexOf(params4) > -1) {
                        let index = item.choosed.indexOf(params4);
                        item.choosed.splice(index, 1);
                    } else {
                        item.choosed.push(params4);
                    }
                }
            },
            Submit() {
                this.answerList = [];
                for (let i = 0; i < this.queastion.sortList.length; i++) {
                    let item1 = this.queastion.sortList[i];
                    for (let j = 0; j < item1.questionList.length; j++) {
                        let item2 = item1.questionList[j];
                        let obj = {
                            questionId: item2.questionId,
                            type: item2.type
                        };
                        if (item2.type == 1) {
                            if (item2.choosed == "") {
                                this.ShowAlert("请仔细检查所有选项");
                                break;
                            } else {
                                obj["answerOptionsId"] = item2.choosed;
                                obj["content"] = "";
                            }
                        } else if (item2.type == 2) {
                            if (!item2.choosed.length > 0) {
                                this.ShowAlert("请仔细检查所有选项");
                                break;
                            } else {
                                obj["answerOptionsId"] = item2.choosed;
                                obj["content"] = "";
                            }
                        } else {
                            if (item2.content == "") {
                                this.ShowAlert("请仔细检查所有选项");
                                break;
                            } else {
                                obj["answerOptionsId"] = [];
                                obj["content"] = item2.content;
                            }
                        }
                        this.answerList.push(obj);
                    }
                }
                this.isCommit = true;
            },
            Confirm() {
                let data = {
                    token: this.$route.query.token,
                    questionnaireId: this.$route.query.id,
                    answerList: JSON.stringify(this.answerList)
                }
                this.$http({
                    url: "/api/common/service/questionnaire/addAnswer",
                    method: "post",
                    data: data
                }).then(res => {
                    if (res.data.code === '00000') {
                        this.isCommit = false;
                        this.ShowAlert("提交成功");
                    } else {
                        this.isCommit = false;
                    }
                }).catch(error => {});
            },
            ShowAlert(msg) {
                this.show = true;
                this.alertmsg = msg;
                setTimeout(() => {
                    this.show = false;
                    this.alertmsg = "";
                }, 2000);
            },
			Get() {
				this.$http({
					url: '/api/common/service/questionnaire/getQuestionnaireInfo',
					method: 'get',
					params: {
                        questionnaireId: this.$route.query.id,
                        token: this.$route.query.token
                    }
				}).then(res => {
					if (res.data.code === '00000') {
                        let result = res.data.questionnaireInfo;
                        for (let i = 0; i < result.sortList.length; i++) {
                            let item1 = result.sortList[i];
                            for (let j = 0; j < item1.questionList.length; j++) {
                                let item2 = item1.questionList[j];
                                if (item2.type === 1) {
                                    item2["choosed"] = "";
                                } else if (item2.type === 2) {
                                    item2["choosed"] = [];
                                } else {
                                    item2["content"] = "";
                                }
                            }
                        }
                        this.name = result.userName;
                        this.phone = result.cellPhone;
						this.queastion = res.data.questionnaireInfo;
					}
				}).catch(error => {});
			}
        }
    }
</script>
<style lang="less" scoped>
    .queastion-detail{
        width: 7.211538rem;
        position: relative;
        .box{
            padding: .192308rem;
            .btn{
                width: 6.826923rem;
                height: .769231rem;
                background-color: rgb(217, 190, 123);
                color: white;
                border-radius: 5px;
                font-size: .288462rem;
                margin: .480769rem auto 0;
            }
            .alert{
                width: 100%;
                background-color: white;
                h2{
                    text-align: center;
                    font-size: .388462rem;
                    padding-bottom: .288462rem;
                }
                p{
                    font-size: .269231rem;
                    line-height: .440385rem;
                }
                .content-p{
                    text-indent: 2em;
                }
                .ul{
                    padding-top: .384615rem;
                    li{
                        font-size: .269231rem;
                    }
                }
                .notice{
                    text-align: center;
                    font-size: .211538rem;
                    padding-top: .384615rem;
                }
            }
            .queastionbox{
                width: 100%;
                .title {
                    font-size: .388462rem;
                    text-align: center;
                    padding-bottom: .384615rem;
                }
                p{
                    font-size: .269231rem;
                }
                .content-p{
                    text-indent: 2em;
                    padding-top: .096154rem;
                    line-height: .440385rem;
                    padding-bottom: .292308rem;
                    border-bottom: 1px solid #eee;
                }
                ul{
                    margin-top: .288462rem;
                    li{
                        font-size: .269231rem;
                        &:nth-child(3){
                            padding-top: .144231rem;
                        }
                    }
                    .input-li{
                        padding-top: .144231rem;
                        .input{
                            background-color: #eee;
                            width: 6.826923rem;
                            height: .584615rem;
                            padding: .096154rem .192308rem;
                        }
                    }
                }
            }
            .questionlist{
                padding: .192308rem 0;
                .item{
                    width: 100%;
                    .title{
                        font-size: .269231rem;
                        text-align: center;
                        padding-top: .144231rem;
                    }
                    .type{
                        font-size: .211538rem;
                        color: rgb(217, 190, 123);
                        padding-top: .096154rem;
                        padding-bottom: .096154rem;
                    }
                    .question{
                        font-size: .269231rem;
                        padding-top: .144231rem;
                    }
                    .result-ul{
                        background-color: #eee;
                        margin-top: .144231rem;
                        .yellow{
                            background-color: #f1eac2;
                        }
                        .result-li{
                            display: flex;
                            justify-content: space-between;
                            padding: .192308rem;
                            &:not(:last-child){
                                border-bottom: 1px solid #dad8d8;
                            }
                            .left{
                                font-size: .269231rem;
                                line-height: .346154rem;
                            }
                            .right{
                                height: .346154rem;
                                cursor: pointer;
                                img{
                                    width: .346154rem;
                                    height: .346154rem;
                                }
                            }
                            .input{
                                background-color: #eee;
                                width: 6.826923rem;
                                height: .584615rem;
                                padding: .096154rem .192308rem;
                            }
                        }
                    }
                }
            }
            .error-alert{
                position: fixed;
                bottom: 4.807692rem;
                width: 5.769231rem;
                height: .688462rem;
                font-size: .240385rem;
                background-color: #4e4a4a;
                border-radius: 4px;
                left: .721154rem;
                color: white;
                line-height: .688462rem;
                text-align: center;
            }
            .message-box{
                position: fixed;
                bottom: 5.807692rem;
                left: .721154rem;
                width: 5.74162679rem;
                height: 2.2708134rem;
                background-color: white;
                border-radius: 4px;
                z-index: 30;
                .message-content{
                    height: 1.50526316rem;
                    line-height: 1.50526316rem;
                    text-align: center;
                    font-size: .28708134rem;
                }
                .message-btns{
                    height: .75598086rem;
                    border-top: 1px solid #eee;
                    display: flex;
                    div{
                        width: 50%;
                        line-height: .75598086rem;
                        font-size: .26794258rem;
                        text-align: center;
                    }
                    .right-submit{
                        border-left: 1px solid #eee;
                        box-sizing: border-box;
                        color: rgb(236, 157, 55);
                    }
                }
            }
        }
        .mask{
            width: 100%;
            height: 100%;
            position: fixed;
            top: 0;
            background-color: rgba(99, 99, 99, .5);
            z-index: 20;
        }
    }
</style>
