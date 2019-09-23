<style lang="less" scoped>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: .3rem;
        padding: 10px;
        border-bottom: 1px solid #E5E5E9;
        .submit {
            background-color: #EB5A54;
            padding: 5px 10px;
            color: #fff;
            border-radius: 5px;
        }
    }
    section {
        margin-top: 5px;
        .title {
            font-size: .3rem;
            color: #999;
            margin: 10px;
        }
        .item {
            display: flex;
            align-items: center;
            margin: 10px;
            justify-content: space-between;
            input {
                font-size: .4rem;
                flex-basis: 50%;
            }
            img {
                height: .4rem;
            }
        }
    }
</style>
<template>
    <div class="container" v-title="'修改昵称'">
        <header>
            <p @click="back">取消</p>
            <p>修改昵称</p>
            <button class="submit">保存</button>
        </header>
        <section>
            <p class="title">昵称</p>
            <div class="item">
                <input type="text" v-model="userName">
                <img src="../../img/clear.png" @click="clear">
            </div>
        </section>
    </div>
</template>
<script lang="babel">
    export default {
        data() {
            return {
                userName: this.$store.state.info.userName,
            }
        },
        methods: {
            back() {
                history.go(-1);
            },
            clear() {
                this.userName = '';
            }
        }
    }
</script>