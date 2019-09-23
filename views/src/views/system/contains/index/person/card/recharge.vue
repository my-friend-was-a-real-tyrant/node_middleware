<style lang="less" scoped>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: .3rem;
        padding: 10px;
        border-bottom: 1px solid #E5E5E9;
        img {
            vertical-align: middle;
        }
    }
    section {
        padding: 10px;
        .money {
            display: block;
            width: 90%;
            margin: 0 auto;
            margin-top: 20px;
            margin-bottom: 20px;
        }
        .item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: .3rem;
            border-bottom: 1px solid #E5E5E9;
            padding: 10px 0;
            div:first-child {
                display: flex;
                align-items: center;
                img {
                    height: .8rem;
                    margin-right: 10px;
                }
            }
            div:last-child {
                width: 20px;
                height: 20px;
                border: 1px solid #E5E5E9;
                border-radius: 50%;
                img {
                    height: 20px;
                }
            }
        }
        .explain {
            font-size: .2rem;
            color: #999999;
            margin: .1rem;
        }
    }
    footer {
        width: 100%;
        position: fixed;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: .3rem;
        padding: 10px;
        .submit {
            background-color: #EB5A54;
            padding: 5px 10px;
            color: #fff;
            border-radius: 5px;
        }
    }
</style>
<template>
    <div class="container" v-title="'充值'">
        <header>
            <i class="el-icon-arrow-left" @click="back"></i>
            <p>我要充值</p>
            <div>
                <img src="../../../../img/card_code.png" style="height: .3rem;">
                <span>付款</span>
            </div>
        </header>
        <section>
            <el-input class="money" v-model="money" placeholder="充值金额" @blur="getCost"></el-input>
            <p style="font-size: .3rem; margin: 10px;">选择支付方式</p>
            <div class="item" @click="choosePay(1)">
                <div>
                    <img src="../../img/zhifubao.png">
                    <span>支付宝</span>
                </div>
                <div><img src="../../img/choose.png" v-if="choose == 1"></div>
            </div>
            <div class="item" @click="choosePay(2)">
                <div>
                    <img src="../../img/weixin.png">
                    <span>微信</span>
                </div>
                <div><img src="../../img/choose.png" v-if="choose == 2"></div>
            </div>
            <div class="item" @click="choosePay(3)">
                <div>
                    <img src="../../img/yiwangtong.png">
                    <span>一网通</span>
                </div>
                <div><img src="../../img/choose.png" v-if="choose == 3"></div>
            </div>
            <p style="font-size: .3rem; margin: .1rem;">充值说明：</p>
            <p class="explain">1.饭卡只能本人使用</p>
            <p class="explain">2.饭卡需充值之后，才能使用</p>
            <p class="explain">3.饭卡只能在指定小区使用（杭州又有小区、杭州恒大小区、江山樾小区）</p>
        </section>
        <footer>
            <div style="display: flex;">
                <p>充值金额</p>
                <p style="color: #EB5A54;" v-if="cost != 0">￥{{cost}}</p>
            </div>
            <button class="submit" :disabled="cost == 0">充值</button>
        </footer>
    </div>
</template>
<script lang="babel">
    export default {
        data() {
            return {
                money: '',
                choose: 0,
                cost: 0,
            }
        },
        methods: {
            back() {
                history.go(-1);
            },
            choosePay(e) {
                this.choose = e;
            },
            getCost() {
                if ( this.money > 0 ) {
                    this.cost = this.money
                }
            }
        }
    }
</script>