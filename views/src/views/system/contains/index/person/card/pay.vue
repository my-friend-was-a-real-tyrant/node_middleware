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
        font-size: .3rem;
        .img {
            padding: 40px;
            img {
                display: block;
                margin: 0 auto;
                height: 2rem;
            }
            p {
                margin-top: 10px;
                text-align: center;
                font-size: .5rem;
            }
        }
        .item {
            display: flex;
            justify-content: space-between;
            padding: 10px;
            .title {
                color: #ccc;
            }
        }
        .submit {
            display: block;
            width: 90%;
            height: .8rem;
            margin: 0 auto;
            background-color: #EB5A54;
            color: #fff;
            border-radius: 5px;
            margin-top: 10px;
        }
    }
</style>
<template>
    <div class="container" v-title="'充值详情'">
        <header>
            <i class="el-icon-arrow-left" @click="back"></i>
            <p class="title">充值详情</p>
        </header>
        <section>
            <div class="img">
                <img src="../../img/paysuccess.png">
                <p>充值成功</p>
            </div>
            <div class="item" style="padding-bottom: 5px">
                <p class="title">充值方式</p>
                <p>支付宝</p>
            </div>
            <div class="item" style="padding-top: 5px">
                <p class="title">充值金额</p>
                <p>￥300.00</p>
            </div>
            <button class="submit">完成</button>
        </section>
    </div>
</template>
<script lang="babel">
export default {
    methods: {
        back() {
            history.go(-1);
        }
    }
}
</script>