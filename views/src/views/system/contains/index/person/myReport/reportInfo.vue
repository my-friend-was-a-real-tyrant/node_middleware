<style lang="less" scoped>
    @border: 1px solid #dcdcdc;
    .repairmentInfo{ width: 100%; height: 100%; background-color: #f5f5f5;
        &-info{ margin-bottom: .3rem; background-color: #fff;
            &-item{ display: flex; justify-content: space-between; padding: .3rem; border-top: @border; border-bottom: @border; font-size: .28rem;
                &-title{ flex-shrink: 0; width: 1.5rem; color: #333;}
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
        &-img-big{ position: absolute; top: 0; left: 0; display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.8); overflow: scroll;
            img{ width: 100%;}
        }
    }
</style>
<template>
    <div class="repairmentInfo" v-title="'报事详情'">
        <ul class="repairmentInfo-info">
            <li class="repairmentInfo-info-item">
                <span class="repairmentInfo-info-item-title">报事类型</span>
                <span class="repairmentInfo-info-item-content">{{ info.type }}</span>
            </li>
            <li class="repairmentInfo-info-item">
                <span class="repairmentInfo-info-item-title">标题</span>
                <span class="repairmentInfo-info-item-content">{{ info.title }}</span>
            </li>
            <li class="repairmentInfo-info-item">
                <span class="repairmentInfo-info-item-title">报事内容</span>
                <span class="repairmentInfo-info-item-content">{{ info.content }}</span>
            </li>
            <li class="repairmentInfo-info-item">
                <span class="repairmentInfo-info-item-title">报修时间</span>
                <span class="repairmentInfo-info-item-content">{{ info.datetime }}</span>
            </li>
            <li class="repairmentInfo-info-item">
                <span class="repairmentInfo-info-item-status">{{ info.status === 1
                    ? '待审核'
                    :
                (info.status === 2
                    ? '维修中'
                    :
                (info.status === 3
                    ? '已拒绝'
                    :
                (info.status === 4
                    ? '已转送'
                    :
                (info.status === 5
                    ? '已完成'
                    : '已评价')))) }}</span>
                <span class="repairmentInfo-info-item-content">{{ info.statusChangeTime }}</span>
            </li>
        </ul>
        <ul class="repairmentInfo-info">
            <li class="repairmentInfo-info-item repairmentInfo-info-img" v-if="info.imgList.length > 0">
                <span class="repairmentInfo-info-img-title">报事图</span>
                <div class="repairmentInfo-info-img-content">
                    <img :src="img" v-for="img in info.imgList" :key="img" @click="handleImgBig(img)" />
                </div>
            </li>
        </ul>
        <ul class="repairmentInfo-info" v-if="info.remark !== '' && info.remark !== null">
            <li class="repairmentInfo-info-item">
                <span class="repairmentInfo-info-item-title">备注</span>
                <span class="repairmentInfo-info-item-content">{{ info.remark }}</span>
            </li>
        </ul>
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
                info: {
                    type: '',
                    title: '',
                    content: '',
                    datetime: '',
                    status: 0,
                    statusChangeTime: '',
                    imgList: [],
                    remark: ''
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
                    url: '/api/system/personalCenter/getReportInfo',
                    params: {
                        id: this.$route.query.id
                    }
                }).then((response) => {
                    this.info = response.data.info;
                }).catch((response) => {
                    console.log(response);
                });
            }
        }
    }
</script>