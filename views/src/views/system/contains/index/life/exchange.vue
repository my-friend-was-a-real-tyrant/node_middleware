<template>
    <div class="exchange">
        <input type="text" placeholder="请输入兑换码" v-model="exchange">
        <div class="button" :class="exchange == '' ? '' : 'active'" @click="HasExchange">兑换</div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                exchange: ""
            }
        },
        watch: {
            exchange(newv, oldv) {
                const reg = /^[0-9]*$/;
                if(!reg.test(newv)) {
                    this.exchange = oldv;
                }
            }
        },
        methods: {
            HasExchange() {
                this.$http.patch('/api/system/life/coupon/exchangeCoupon', {
                    code: this.exchange
                }).then(res => {
                    if (res.data.code === '00000') {
                        this.$message('兑换成功');
                        setTimeout(() => {
                            this.$router.push({
                                path: "/person/myCoupon/tab/001"
                            });
                        }, 1500);
                    } else {
                        this.$message(res.data.message);
                    }
                }).catch(error => {});
            }
        }
    }
</script>
<style lang="less" scoped>
    .exchange{
        width: 7.2rem;
        background-color: #f4f4f4;
        input{
            width: 100%;
            height: .86rem;
            padding: 0 .2rem;
            background-color: white;
            font-size: .28rem;
        }
        .button{
            width: 6.8rem;
            margin: .6rem .2rem 0;
            font-size: .28rem;
            background-color: white;
            height: .86rem;
            border-radius: 4px;
            text-align: center;
            line-height: .86rem;
            background-color: #c7c5c5;
            color: white;
        }
        .active{
            background-color: #e9be6d;
        }
    }
</style>

