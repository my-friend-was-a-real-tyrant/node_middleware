<style lang="less" scoped>
    .wrapper{ display: flex; flex-direction: column; width: 100%; height: 100%;}
    .router{ flex-grow: 1; overflow: scroll;}
    .navigation{ flex-shrink: 0; display: flex; height:0.98rem; border-top: 1px solid #dcdcdc;
        &-item{
            &-wrapper{ display: flex; flex-direction: column; align-items: center; flex-basis: 0; flex-grow: 1; height: 100%; padding-top: .12rem;}
            &-img{ display: block; height: .66rem; width: .66rem; background-size: 100% 100%; background-repeat: no-repeat;
                .navigation-loop(@n, @i: 1) when (@i <= @n) {
                    &-0@{i} { background-image: url('../img/index_navigation_0@{i}.png');
                        &-active{ background-image: url('../img/index_navigation_0@{i}_active.png');}
                    }
                    .navigation-loop(@n, (@i + 1));
                }
                .navigation-loop(2, 1);
            }
            &-word{ font-size: .2rem; color: #808080;
                &-active{ color: #e9be6d;}
            }
        }
    }
</style>
<template>
    <div class="wrapper" v-title="'特惠商城'">
        <router-view class="router"></router-view>
        <div class="navigation">
            <div class="navigation-item-wrapper" v-for="index in 2" @click="handleRouterPush(index)" :key="index">
                <i class="navigation-item-img" 
                    :class="[
                        'navigation-item-img-0' + index, 
                        index === navigationActiveIndex 
                            ? 'navigation-item-img-0' + index + '-active'
                            : ''
                    ]"></i>
                <p class="navigation-item-word"
                    :class="index === navigationActiveIndex 
                        ? 'navigation-item-word-active'
                        : ''">
                    <span>
                        {{ index === 1 ? '商城' : '我的' }}
                    </span>
                </p>
            </div>
        </div>
    </div>
</template>
<script lang="babel">
    export default {
        computed: {
            navigationActiveIndex() {
                return this.$route.path === '/index/mall' 
                    ? 1 
                    : (
                        this.$route.path === '/index/person'
                            ? 2 
                            : ''
                    );
            }
        },
        methods: {
            handleRouterPush(index) {
                this.$router.replace(index === 1 
                    ? '/index/mall' 
                    : '/index/person'
                );
            }
        }
    }
</script>