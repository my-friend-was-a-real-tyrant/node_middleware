<style lang="less" scoped>
    .container{ padding: 0 .3rem;}
    .word{ margin-bottom: .8rem; font-size: .3rem; color: #333; line-height: 3.55rem; text-align: center;}
</style>
<template>
    <div class="container">
        <p class="word">
            <span>您尚未加入任何家庭</span>
        </p>
        <zdButton
            @click="handleApplyFamily"
        >申请加入</zdButton>
    </div>
</template>
<script lang="babel">
    import zdButton from 'publicComponents/button/button';

    export default {
        components: {
            zdButton
        },
        computed: {
            isVisitor() {
                return this.$store.state.isVisitor;
            }
        },
        methods: {
            handleApplyFamily() {
                this.$router.push('/person/myFamily/addHouse');
            }
        },
        created() {
            if (this.isVisitor === false) {
                this.$router.push('/index/person');
            } else if (this.isVisitor !== true) {
                // 刷新页面，重新请求用户信息
            }
        }
    }
</script>