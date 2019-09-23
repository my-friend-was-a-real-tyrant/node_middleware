<style lang="less">
    .zd-tabs-views{ display: none;
        &-active{ display: block;}
    }
</style>
<template>
    <div class="zd-tabs-views" :class="active?'zd-tabs-views-active':''">
        <slot></slot>
    </div>
</template>
<script lang="babel">
    export default {
        props: {
            label: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            activeName: String,
        },
        data() {
            return {
                active: false
            }
        }
    }
</script>