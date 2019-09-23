<style lang="less" scoped>
    header {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: .3rem;
        padding: 10px;
        i {
            position: absolute;
        }
        .title {
            margin: 0 auto;
        }
    }
    section {
        padding: 10px 20px;
        .item {
            font-size: .3rem;
            display: flex;
            margin: 5px 0;
            div:first-child {
                flex-basis: 30%;
                flex-shrink: 0;
            }
            div {
                word-break:break-all; ;
            }
        }
    }
</style>
<template>
    <div class="container" v-title="'订单详情'">
        <header>
            <i class="el-icon-arrow-left" @click="back"></i>
            <p class="title">订单详情</p>
        </header>
        <section>
            <div style="text-align: center; padding: 40px;">
                <P style="font-size: .3rem;">锦园小区食堂消费</P>
                <P style="font-size: .4rem;">-300.00</P>
            </div>
            <div>
                <div class="item">
                    <div>类型</div>
                    <div>支出</div>
                </div>
                <div class="item">
                    <div>时间</div>
                    <div>2019-07-20 14:23:34</div>
                </div>
                <div class="item">
                    <div>交易单号</div>
                    <div>15009478119072010039325978023103236</div>
                </div>
                <div class="item">
                    <div>备注</div>
                    <div>锦园小区食堂消费</div>
                </div>
            </div>
        </section>
    </div>
</template>
<script lang="babel">
    export default {
        data() {
            return {
            }
        },
        methods: {
            back() {
                history.go(-1);
            }
        }
    }
</script>