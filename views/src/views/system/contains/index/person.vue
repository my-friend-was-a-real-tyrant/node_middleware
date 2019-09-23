<style lang="less" scoped>
    @border: 1px solid #dcdcdc;
    .container {
        display: flex;
        flex-direction: column;
        background-color: #f5f5f5;
        overflow: scroll;
    }

    .info {
        height: 4rem;
        margin-bottom: .3rem;
        padding: 0 .3rem;
        border-top: @border;
        border-bottom: @border;
        background-color: #fff;
        &-msg {
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: space-around;
            margin-top: 10px;
            &-head {
                display: flex;
                align-items: center;
                &-img {
                    width: 100%;
                    height: 100%;
                    width: .9rem;
                    height: .9rem;
                    border-radius: 50%;
                    background-color: #fff;
                }
            }
            &-name {
                flex-grow: 1;
                padding-left: .3rem;
                font-size: .3rem;
                color: #333;
                span {
                    float: right;
                    font-size: .24rem;
                }
            }
            &-item {
                font-size: .25rem;
                flex-basis: 30%;
                padding: .2rem .1rem;;
                height: 2.2rem;
                border-radius: 5px;
                color: #fff;
                position: relative;
                &-icon {
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background-color: #bbc6d3;
                    position: absolute;
                    bottom: 5px;
                    left: .1rem;
                    opacity: .5;
                    padding-top: 1px;
                }
            }
        }
    }

    .icon {
        flex-shrink: 0;
        display: inline-block;
        width: .13rem;
        height: .24rem;
        background-image: url(../../../../publicSource/img/push_icon.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }

    .function {
        flex-grow: 1;
        padding-left: .3rem;
        border-top: @border;
        background-color: #fff;
        &-item {
            display: flex;
            height: .96rem;
            align-items: center;
            &-img {
                flex-shrink: 0;
                display: inline-block;
                width: .6rem;
                height: .95rem;
                background-size: 100% 100%;
                background-repeat: no-repeat;
                &-01 {
                    background-image: url(../../img/index_person_function_01.png);
                }
                &-02 {
                    background-image: url(../../img/index_person_function_02.png);
                    margin-right: .17rem;
                    width: .42rem;
                    height: .4rem;
                }
                &-03 {
                    background-image: url(../../img/index_person_function_03.png);
                }
                &-04 {
                    background-image: url(../../img/index_person_function_04.png);
                }
                &-05 {
                    background-image: url(../../img/index_person_function_05.png);
                }
                &-06 {
                    background-image: url(../../img/index_person_function_06.png);
                }
                &-07 {
                    background-image: url(../../img/index_person_function_07.png);
                }
                &-08 {
                    // background-image: url(../../img/index_person_function_08.png);
                }
            }
            &-wrapper {
                display: flex;
                align-items: center;
                flex-grow: 1;
                height: 100%;
                padding-right: .3rem;
                border-bottom: @border;
            }
            &-word {
                flex-grow: 1;
                font-size: .28rem;
                color: #333;
            }
        }
    }
</style>
<template>
    <div class="container" v-title="'个人中心'">
        <div class="info">
            <div class="info-msg" @click='showMyMessage'>
                <div class="info-msg-name">
                    <p style="font-weight: 600;">{{ userName }}</p>
                    <p style="font-size: .2rem;">测试1-1-107</p>
                </div>
                <div class="info-msg-head">
                    <img class="info-msg-head-img" :src="headImgUrl" />
                    <i class="el-icon-arrow-right" style="font-size: .3rem;"></i>
                </div>
            </div>
            <!-- <i class="icon"></i> -->
            <div class="info-msg">
                <div class="info-msg-item" style="background-color: #768fa7;" @click="showMySerive('/person/myFamily')">
                    <p>我的家庭</p>
                    <div class="info-msg-item-icon">
                        <i class="el-icon-arrow-right" style="margin-left: 4px; color: #768fa7;"></i>
                    </div>
                </div>
                <div class="info-msg-item" style="background-color: #77a67b;" @click="showMySerive('/person/myRepairment')">
                    <p>我的报修</p>
                    <div class="info-msg-item-icon">
                        <i class="el-icon-arrow-right" style="margin-left: 4px; color: #77a67b;"></i>
                    </div>
                </div>
                <div class="info-msg-item" style="background-color: #a77777;" @click="showMySerive('/person/myReport')">
                    <p>我的报事</p>
                    <div class="info-msg-item-icon">
                        <i class="el-icon-arrow-right" style="margin-left: 4px; color: #a77777;"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="function">
            <div class="function-item" v-for="n in 8" :key="n">
                <i class="function-item-img" :class="'function-item-img-0' + n"></i>
                <div class="function-item-wrapper" @click="handleClick(n)">
                    <p class="function-item-word">{{ 
                        n === 1 
                            ? '我的活动'
                            : 
                        (n === 2
                            ? '我的饭卡'
                            :
                        (n === 3
                            ? '我的收货地址'
                            : 
                        (n === 4 
                            ? '我的优惠券'
                            : 
                        (n === 5 
                            ? '查看我的报事'
                            : 
                        (n === 6 
                            ? '我的咨询建议'
                            : 
                        (n === 7 
                            ? '我的投诉表扬'
                            : '我的家庭'
                        )))))) }}</p>
                    <i class="el-icon-arrow-right" style="font-size: .3rem;"></i>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="babel">
    export default {
        computed: {
            isVisitor() {
                return this.$store.state.isVisitor;
            },
            headImgUrl() {
                return this.$store.state.info.avatar;
            },
            userName() {
                return this.$store.state.info.userName;
            }
        },
        methods: {
            handleClick(n) {
                switch (n) {
                    case 1:
                        this.$router.push('/service/activity/activityEnrolled');
                        break;
                    case 2:
                        this.$router.push('/person/card');
                        break;
                    case 3:
                        this.$router.push('/person/myDeliveryAddress');
                        break;
                    case 4:
                        this.$router.push('/person/myCoupon');
                        break;
                    case 5:
                        this.$router.push('/person/myReport');
                        break;
                    case 6:
                        this.$router.push('/service/suggestion');
                        break;
                    case 7:
                        this.$router.push('/service/myComplaint');
                        break;
                    case 8:
                        this.$router.push('/person/myFamily');
                        break;
                }
            },
            showMyMessage() {
                this.$router.push('/person/editMyMessage')
            },
            showMySerive(path) {
                this.$router.push(path)
            }
        },
        created() {
            if (this.isVisitor === true) {
                this.$router.replace('/index/visitorPerson');
            } else if (this.isVisitor !== false) {
                // 刷新页面，重新发送请求获取用户信息
            }
        }
    }
</script>