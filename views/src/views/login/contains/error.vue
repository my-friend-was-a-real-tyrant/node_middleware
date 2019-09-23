<style lang="less" scoped>
    .error{
        &-wrapper{ display: flex; flex-direction: column; width: 100%; height: 100%; padding: .3rem;}
        &-position{ flex-shrink: 0; height: .96rem; border: .01rem solid #dcdcdc; border-radius: .09rem; line-height: .94rem; font-size: 0; overflow: hidden;
            &-icon{ display: inline-block; width: .8rem; height: .94rem; background-image: url(../img/apply_position.jpg); background-size: 100% 100%; background-repeat: no-repeat; vertical-align: top;}
            &-word{ display: inline-block; max-width: 5rem; font-size: .3rem; color: #333; vertical-align: top;}
            &-arrow{ float: right; width: .65rem; height: .94rem; background-image: url(../img/apply_position_arrow.jpg); background-size: 100% 100%; background-repeat: no-repeat; vertical-align: top;}
        }
        &-message{ flex-grow: 1; padding-top: .96rem; text-align: center;
            p{ font-size: .36rem; color: #333; line-height: .9rem;}
            img{ width: 4rem; height: 3rem; margin-top: 1.2rem;}
        }
        &-visitor{ flex-shrink: 0; font-size: .3rem; color: #e9be6d; text-align: center;}
    }
</style>
<template>
    <div class="error-wrapper" v-title="'选择园区'">
        <div class="error-position" @click="handleChangeAddress">
            <i class="error-position-icon"></i>
            <span class="error-position-word">{{ address }}</span>
            <i class="error-position-arrow"></i>
        </div>
        <div class="error-message">
            <p>抱歉，未找到您的信息</p>
            <p>请重新选择园区或到物业咨询</p>
            <img src="../img/error.png" />
        </div>
        <p class="error-visitor">
            <span>我先看看</span>
        </p>
    </div>
</template>
<script lang="babel">
    export default {
        props: ['address'],
        methods: {
            handleChangeAddress() {
                this.$router.push('/choosePark');
            }
        }
    }
</script>