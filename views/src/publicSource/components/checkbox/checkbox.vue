<style lang="less">
    .zd-checkbox{ width: .38rem; height: .38rem; background-image: url(../../img/checkbox.png); background-size: 100% 100%;
        &-active{ background-image: url(../../img/checkbox_active.png);}
    }
</style>
<template>
    <i class="zd-checkbox"
        :class="{'zd-checkbox-active': active}"
        @click="handleClick"></i>
</template>
<script lang="babel">
    export default {
        props: {
            active: {}
        },
        methods: {
            handleClick(e) {
                this.$emit('click', e);
            }
        }
    }
</script>