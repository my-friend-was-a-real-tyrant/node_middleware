<style lang="less" scoped>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: .3rem;
        padding: 10px;
        img {
            vertical-align: middle;
        }
    }
    section {
        .card {
            width: 90%;
            background: linear-gradient(left, #007eff, #00bbff);
        }
        .msgitem {
            width: 90%;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            font-size: .3rem;
            border-bottom: 1px solid #E5E5E9;
            padding: 10px 0;
            div {
                display: flex;
                align-items: center;
                img {
                    height: .8rem;
                    margin-right: 10px;
                }
                i {
                    margin-top: .05rem;
                }
            }
        }
        .explain {
            font-size: .2rem;
            color: #999999;
            margin: .3rem;
        }
    }
</style>
<template>
    <div class="container" v-title="'我的饭卡'">
        <header>
            <i class="el-icon-arrow-left" @click="back"></i>
            <p>我的饭卡</p>
            <div>
                <img src="../../../img/card_code.png" style="height: .3rem;">
                <span>付款</span>
            </div>
        </header>
        <section>
            <div class="card">
                <div class="item">
                    <p></p>
                    <p></p>
                    <p></p>
                </div>
                <div class="item">

                </div>
                <div class="item">

                </div>
            </div>
            <div class="msgitem" @click="toName">
                <div>
                    <img src="../../../img/card_nickname.png">
                    <span>昵称</span>
                </div>
                <div>
                    <span style="margin-right: 10px;">{{ userName }}</span>
                    <i class="el-icon-arrow-right"></i>
                </div>
            </div>
            <div class="msgitem" @click="toRecord">
                <div>
                    <img src="../../../img/card_record.png">
                    <span>消费记录</span>
                </div>
                <div>
                    <i class="el-icon-arrow-right"></i>
                </div>
            </div>
            <p style="font-size: .3rem; margin: .3rem;">饭卡说明：</p>
            <p class="explain">1.饭卡只能本人使用</p>
            <p class="explain">2.饭卡需充值之后，才能使用</p>
            <p class="explain">3.饭卡只能在指定小区使用（杭州又有小区、杭州恒大小区、江山樾小区）</p>
        </section>
    </div>
</template>
<script lang="babel">
    export default {
        computed: {
            userName() {
                return this.$store.state.info.userName;
            }
        },
        methods: {
            back() {
                history.go(-1);
            },
            toName() {
                this.$router.push({path: '/person/card/nickname'});
            },
            toRecord() {
                this.$router.push({path: '/person/card/consumption'});
            }
        },
        mounted() {
            this.$http({
                url: 'cardinfo/selCardInfo',
                params: {
                    phone: '18270336242'
                }
            }).then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            })
        }
    }
</script>