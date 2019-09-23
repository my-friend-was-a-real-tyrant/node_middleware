<style lang="less" scoped>
    @import './common.less';
</style>
<template>
    <div v-title="'中大普惠物业'">
        <div class="address" v-if="!isVisitor">
            <span>{{ userInfo.defaultAddressName }}</span>
            <i @click="handleChangePark">切换</i>
        </div>
        <img src="../../img/index_banner_01.jpg" class="banner" />
        <div class="nav-list">
            <div class="nav-item" v-for="n in 10" :key="n" @click="handleClick(n)">
                <img :src="imgArr[n - 1]" />
                <p>
                    <span>{{ 
                        n === 1 ? '自助缴费' : 
                        (n === 2 ? '社区公告' : 
                        (n === 3 ? '维修服务' : 
                        (n === 4 ? '投诉表扬' : 
                        (n === 5 ? '咨询建议' : 
                        (n === 6 ? '园区活动' : 
                        (n === 7 ? '访客通行' : 
                        (n === 8 ? '手机开门' : 
                        (n === 9 ? '常用电话' : 
                        (n === 10 ? '园区报事' : '')))))))))
                    }}</span>
                </p>
            </div>
        </div>
    </div>
</template>
<script lang="babel">
    export default {
        data() {
            const imgArr = [];
            for (let i = 1; i <= 10; i ++) {
                const imgItem = require('../../img/index_service_item_' + ((i < 10) ? ('0' + i) : i) + '.png');
                imgArr.push(imgItem);
            }
            return {
                imgArr
            }
        },
        computed: {
            isVisitor() {
                return this.$store.state.isVisitor;
            },
            userInfo() {
                return this.$store.state.info;
            }
        },
        methods: {
            handleClick(n) {
                if (this.isVisitor === true) {
                    alert('本功能只对业主开放，请到“个人中心完善信息”');
                } else {
                    switch(n) {
                        case 1: 
                            // alert('进入自助缴费');
                            //alert('敬请期待');
                            this.$router.push('/service/payment');
                            break;
                        case 2:
                            // alert('敬请期待');
                            this.$router.push('/service/announcement');
                            break;
                        case 3:
                            // alert('进入维修服务');
                            this.$router.push('/service/repairment');
                            break;
                        case 4:
                            // alert('进入投诉表扬');
                            this.$router.push('/service/myComplaint');
                            break;
                        case 5:
                            // alert('进入咨询建议');
                            // alert('敬请期待');
                            this.$router.push('/service/suggestion');
                            break;
                        case 6:
                            // alert('进入园区活动');
                            // alert('敬请期待');
                            this.$router.push('/service/activity');
                            break;
                        case 7:
                            // alert('进入访客通行');
                            alert('敬请期待');
                            break;
                        case 8:
                            alert('敬请期待');
                            break;
                        case 9:
                            // alert('进入常用电话');
                            // alert('敬请期待');
                            this.$router.push('/service/commonTelephone');
                            break;
                        case 10:
                            // alert('进入园区报事');
                            // alert('敬请期待');
                            this.$router.push('/service/report');
                            break;
                    }
                }
            },
            handleChangePark() {
                this.$router.push('/person/myFamily/changeDefaultHouse/index');
            }
        }
    }
</script>