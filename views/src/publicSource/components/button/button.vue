<style lang="less">
    .zd-button{ border: 0 none; border-radius: .1rem; outline: 0 none; background-color: #e9be6d; font-size: .28rem; color: #fff;
        &-large{ width: 6.6rem; height: .96rem;}
        &-normal{ width: 1.7rem; height: .76rem; font-size: .26rem;}
        &-small{ width: 1.38rem; height: .64rem;}

        &-danger{ background-color: #ff4c4c;}
        &-primary{ border: 1px solid #dcdcdc; background-color: #fff; color: #333;}
        &-disabled{ background-color: #eef1f6; color: #bfcbd9; cursor: not-allowed;}
    }
</style>
<template>
    <button 
        :disabled="disabled"
        class="zd-button"
        :class="[
            size ? 'zd-button-' + size : '',
            type ? 'zd-button-' + type : '',
            {
                'zd-button-disabled': disabled 
            }
        ]"
        @click="handleClick"
    >
        <span><slot></slot></span>
    </button>
</template>
<script lang="babel">
    export default {
        props: {
            type: String,
            size: {
                type: String,
                default: 'large'
            },
            disabled: Boolean
        },
        methods: {
            handleClick(e) {
                if (this.disabled == null || this.disabled === false) {
                    this.$emit('click', e);
                }
            }
        }
    }
</script>