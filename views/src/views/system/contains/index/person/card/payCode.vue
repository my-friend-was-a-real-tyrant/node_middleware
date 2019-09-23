<style lang="less" scoped>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: .3rem;
        padding: 10px;
        .refresh {
            height: .3rem;
            vertical-align: middle;
        }
    }
    section {
        font-size: .3rem;
        .cord {
            width: 90%;
            margin: 0 auto;
            margin-top: 40px;
            border-radius: 5px;
            .img {
                padding: 60px;
                border-bottom: 1px dashed #ccc;
                img {
                    display: block;
                    margin: 0 auto;
                    height: 2rem;
                }
            }
        }
    }
</style>
<template>
    <div class="container" v-title="'付款二维码'">
        <header>
            <i class="el-icon-arrow-left" @click="back"></i>
            <p class="title">付款二维码</p>
            <div>
                <img src="../../img/refresh.png" class="refresh">
                <span>刷新</span>
            </div>
        </header>
        <section>
            <div class="cord">
                <div class="img">
                    <img src="../../img/payerror.png" class="code">
                </div>
                <div style="padding: 40px;">
                    <p style="text-align: center;">请出示二维码向商家付款</p>
                </div>
            </div>
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