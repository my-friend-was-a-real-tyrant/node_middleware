<style lang="less" scoped>
    .welcome{
        &-wrapper{ width: 100%; height: 100%; padding-top: 1rem; background-image: url(../img/welcome.jpg); background-size: 100% auto; color: #fff; text-align: center;}
        &-word{
            &-l{ font-size: .48rem; line-height: 2.15rem;}
            &-s{ font-size: .36rem; line-height: .97rem;}
        }
    }
</style>
<template>
    <div class="welcome-wrapper" v-title="'欢迎'">
        <p class="welcome-word-l">欢迎加入中大惠生活</p>
        <p class="welcome-word-s">身份：户主</p>
        <p class="welcome-word-s">姓名：{{ hostName }}</p>
    </div>
</template>
<script lang="babel">
    import hostnameObj from 'publicSource/hostname';
    const hostname = hostnameObj.hostname;

    export default {
        props: ['hostName'],
        created() {
            if (this.hostName === '') {
                this.$router.push('/index');
            }
        },
        mounted() {
            setTimeout(() => {
                window.location.href = hostname + '/system/';
            }, 3000);
        }
    }
</script>