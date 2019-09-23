<style lang="less" scoped>
    @border: 1px solid #dcdcdc;
    .repairmentInfo{ width: 100%; height: 100%; background-color: #f5f5f5;
        &-info{ margin-bottom: .3rem; background-color: #fff;
            &-item{ display: flex; justify-content: space-between; padding: .3rem; border-top: @border; border-bottom: @border; font-size: .28rem;
                &-title{ flex-shrink: 0; width: 1.7rem; color: #333;}
                &-status{ flex-shrink: 0; width: 1.5rem; color: #ff4208;}
                &-content{ flex-grow: 1; color: #666; text-align: right; overflow: hidden; word-wrap: break-word;}
            }
            &-img{
                &-title{ flex-shrink: 0; width: 1rem; color: #999;}
                &-content{ display: flex; flex-wrap: wrap; flex-grow: 1;
                    img{ width: 1.6rem; height: 1.6rem; margin: 0 .22rem .3rem;}
                }
            }
        }
        &-assess{ margin-bottom: .3rem; padding: .3rem; border-top: @border; border-bottom: @border; background-color: #fff; font-size: .28rem;
            &-title{ margin-bottom: .5rem; text-align: center;}
            &-checkbox{ display: flex;
                &-item{ display: flex; justify-content: center; align-items: center; flex-grow: 1; flex-shrink: 1;
                    span{ margin-left: .2rem;}
                }
            }
            &-button{ display: block; margin: 0 auto;}
        }
        &-result{
            padding: 0 .3rem .3rem .3rem;
            .title{
                font-size: .28rem;
                padding-bottom: .25rem;
            }
            .remack{
                font-size: .28rem;
                padding-bottom: .25rem;
            }
            &-content{
                display: flex; flex-wrap: wrap; flex-grow: 1;
                img{ width: 1.82692308rem; height: 1.82692308rem; margin: 0 .22rem .3rem;
                    &:nth-child(3n+1){
                        margin-left: 0;
                    }
                    &:nth-child(3n+3){
                        margin-right: 0;
                    }
                }
            }
        }
        &-img-big{ position: fixed; top: 0; left: 0; display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.8); overflow: scroll;
            img{ width: 100%;}
        }
        &-tel{ color: #72ACE3;}
    }
</style>
<template>
    <div class="repairmentInfo" v-title="'报修详情'">
        <ul class="repairmentInfo-info">
            <li class="repairmentInfo-info-item">
                <span class="repairmentInfo-info-item-title">报修类型</span>
                <span class="repairmentInfo-info-item-content">{{ info.repairmentType }}</span>
            </li>
            <li class="repairmentInfo-info-item">
                <span class="repairmentInfo-info-item-title">报修事件</span>
                <span class="repairmentInfo-info-item-content">{{ info.repairmentContent }}</span>
            </li>
            <li class="repairmentInfo-info-item">
                <span class="repairmentInfo-info-item-title">报修地点</span>
                <span class="repairmentInfo-info-item-content">{{ info.repairmentArea }}</span>
            </li>
            <li class="repairmentInfo-info-item">
                <span class="repairmentInfo-info-item-title">最佳上门时间</span>
                <pre class="repairmentInfo-info-item-content">{{ info.bestTime }}</pre>
            </li>
            <li class="repairmentInfo-info-item">
                <span class="repairmentInfo-info-item-title">报修时间</span>
                <span class="repairmentInfo-info-item-content">{{ info.repairmentCreateTime }}</span>
            </li>
            <li class="repairmentInfo-info-item">
                <span class="repairmentInfo-info-item-status">{{ info.repairmentStatus === 1
                    ? '待审核'
                    :
                (info.repairmentStatus === 2
                    ? '维修中'
                    :
                (info.repairmentStatus === 3
                    ? '已拒绝'
                    :
                (info.repairmentStatus === 4
                    ? '已转送'
                    :
                (info.repairmentStatus === 5
                    ? '已完成'
                    : '已评价')))) }}</span>
                <span class="repairmentInfo-info-item-content">{{ info.statusChangeTime }}</span>
            </li>
        </ul>
        <ul class="repairmentInfo-info">
            <li class="repairmentInfo-info-item repairmentInfo-info-img" v-if="info.userImgList.length > 0">
                <span class="repairmentInfo-info-img-title">报修图</span>
                <div class="repairmentInfo-info-img-content">
                    <img :src="img" v-for="img in info.userImgList" :key="img" @click="handleImgBig(img)" />
                </div>
            </li>
            <li class="repairmentInfo-info-item repairmentInfo-info-img" v-if="info.manageImgList.length > 0">
                <span class="repairmentInfo-info-img-title">转送图</span>
                <div class="repairmentInfo-info-img-content">
                    <img :src="img" v-for="img in info.manageImgList" :key="img" @click="handleImgBig(img)" />
                </div>
            </li>
        </ul>
        <ul class="repairmentInfo-info" v-if="info.repairMan !== '' && info.repairMan !== null">
            <li class="repairmentInfo-info-item">
                <span class="repairmentInfo-info-item-title">维修员</span>
                <span class="repairmentInfo-info-item-content">{{ info.repairMan }}</span>
            </li>
            <li class="repairmentInfo-info-item">
                <span class="repairmentInfo-info-item-title">联系方式</span>
                <span class="repairmentInfo-info-item-content"><a :href="'tel:' + info.repairManCellphone" class="repairmentInfo-tel">{{ info.repairManCellphone }}</a></span>
            </li>
        </ul>
        <ul class="repairmentInfo-info" v-if="info.remark !== '' && info.remark !== null">
            <li class="repairmentInfo-info-item">
                <span class="repairmentInfo-info-item-title">备注</span>
                <span class="repairmentInfo-info-item-content">{{ info.remark }}</span>
            </li>
        </ul>
        <div class="repairmentInfo-result" v-if="info.repairmentStatus === 5 || info.repairmentStatus === 6">
            <div class="title">维修结果：</div>
            <div class="remack">{{ info.remarks }}</div>
            <div class="repairmentInfo-result-content">
                <img v-for="img in info.completeImgList" :src="img" :key="img" @click="handleImgBig(img)" />
            </div>
        </div>
        <div class="repairmentInfo-assess" v-if="info.repairmentStatus === 5">
            <p class="repairmentInfo-assess-title">
                <span>请对我们的服务评价</span>
            </p>
            <div class="repairmentInfo-assess-checkbox">
                <div class="repairmentInfo-assess-checkbox-item">
                    <zdCheckbox
                        :active="checkAssessId === 5"
                        @click="handleClickAssess(5)"></zdCheckbox>
                    <span>非常满意</span>
                </div>
                <div class="repairmentInfo-assess-checkbox-item">
                    <zdCheckbox
                        :active="checkAssessId === 3"
                        @click="handleClickAssess(3)"></zdCheckbox>
                    <span>基本满意</span>
                </div>
                <div class="repairmentInfo-assess-checkbox-item">
                    <zdCheckbox
                        :active="checkAssessId === 2"
                        @click="handleClickAssess(2)"></zdCheckbox>
                    <span>不满意</span>
                </div>
            </div>
        </div>
        <zdButton class="repairmentInfo-assess-button" @click="handleSubmitAssess" v-if="info.repairmentStatus === 5">提交评价</zdButton>
        <div class="repairmentInfo-img-big" v-show="bigImgShow" @click="bigImgShow = false">
            <img :src="bigImg" />
        </div>
    </div>
</template>
<script lang="babel">
    import zdCheckbox from 'publicComponents/checkbox/checkbox';
    import zdButton from 'publicComponents/button/button';
    export default {
        components: {
            zdCheckbox,
            zdButton
        },
        data() {
            return {
                checkAssessId: '',
                info: {
                    repairmentContent: '',
                    repairmentArea: '',
                    repairmentCreateTime: '',
                    repairmentStatus: '',
                    repairMan: '',
                    repairManCellphone: '',
                    statusChangeTime: '',
                    userImgList: [],
                    manageImgList: [],
                    completeImgList: []
                },
                bigImg: '',
                bigImgShow: false
            }
        },
        computed: {
            isVisitor() {
                return this.$store.state.isVisitor;
            }
        },
        methods: {
            handleClickAssess(i) {
                this.checkAssessId = i;
            },
            handleSubmitAssess() {
                if (this.checkAssessId !== 2 && this.checkAssessId !== 3 && this.checkAssessId !== 5) {
                    alert('请选择您的满意度');
                } else {
                    this.$http({
                        url: '/api/system/personalCenter/assessRepairment',
                        method: 'post',
                        data: {
                            repairmentId: this.$route.query.repairmentId,
                            assess: this.checkAssessId
                        }
                    }).then((response) => {
                        if (response.data.code === '00000') {
                            this.$message('感谢您的评价');
                            this.$router.replace('/person/myRepairment');
                        }
                    }).catch((response) => {});
                }
            },
            handleImgBig(img) {
                this.bigImg = img;
                this.bigImgShow = true;
            }
        },
        mounted() {
            if (this.isVisitor === true) {
                this.$router.replace('/index/visitorPerson');
            } else {
                this.$http({
                    url: '/api/system/personalCenter/getRepairmentInfo',
                    params: {
                        repairmentId: this.$route.query.repairmentId
                    }
                }).then((response) => {
                    this.info = response.data.info;
                }).catch((response) => {});
            }
        }
    }
</script>