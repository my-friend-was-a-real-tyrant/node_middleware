<template>
    <div class="heard">
        <div class="heard-top">
            <ul class="heard-top-ul">
                <li v-for="(item, index) in list" :key="index" :class="item.active == active ? 'active' : ''" @click="active = index;change(index)"
                    v-text="item.title"></li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                active: "0",
                list: [
                    {
                        title: "商圈",
                        active: "0"
                    },
                    {
                        title: "健康",
                        active: "1"
                    },
                    {
                        title: "金融",
                        active: "2"
                    },
                    {
                        title: "旅游",
                        active: "3"
                    },
                    {
                        title: "优惠券",
                        active: "4"
                    }
                ]
            };
        },
        mounted() {
            if (this.$route.path == "/index/life/business") {
                this.active = 0;
            } else {
                this.active = 2;
            }
        },
        watch: {
            $router() {
                if (this.$route.path == "/index/life/business") {
                    this.active = 0;
                } else {
                    this.active = 2;
                }
            }
        },
        methods: {
            change(val) {
                this.$emit("change", val);
            }
        }
    };
</script>
<style lang="less" scoped>
    @import "../../common.less";
    .heard {
        width: 100%;
        position: relative;
        &-top {
            width: 100%;
            &-ul {
                display: flex;
                justify-content: space-around;
                background-color: white;
                border-bottom: 1px solid #e8e8e8;
                li {
                    min-width: 0.4rem;
                    height: 0.7rem;
                    line-height: 0.7rem;
                    font-size: 0.28rem;
                    color: @base-color;
                    text-align: center;
                    position: relative;
                }
                .active {
                    color: @active-color;
                }
                .active::after {
                    content: " ";
                    display: block;
                    width: 100%;
                    position: absolute;
                    bottom: -2px;
                    border-bottom: 4px solid @active-color;
                    color: @active-color;
                }
            }
        }
    }
</style>