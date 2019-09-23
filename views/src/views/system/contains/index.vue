<style lang="less" scoped>
	.wrapper {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		position: relative;
		-webkit-overflow-scrolling: touch;
	}
	.router {
		flex-grow: 1;
		padding-bottom: 1.1rem;
	}
	.navigation {
		width: 100%;
		display: flex;
		height: 1rem;
		position: fixed;
		bottom: 0;
		background-color: white;
		border-top: 1px solid #dcdcdc;
		&-item {
			&-wrapper {
				display: flex;
				flex-direction: column;
				align-items: center;
				flex-basis: 0;
				flex-grow: 1;
				height: 100%;
				// padding-top: 0.08rem;
			}
			&-img {
				display: block;
				height: 0.66rem;
				width: 0.66rem;
				background-size: 100% 100%;
				background-repeat: no-repeat;
				.navigation-loop(@n, @i: 1) when (@i <= @n) {
					&-0@{i} {
						background-image: url("../img/index_navigation_0@{i}.png");
						&-active {
							background-image: url("../img/index_navigation_0@{i}_active.png");
						}
					}
					.navigation-loop(@n, (@i + 1));
				}
				.navigation-loop(4, 1);
			}
			&-word {
				font-size: 0.2rem;
				color: #808080;
				&-active {
					color: #e9be6d;
				}
			}
		}
	}
</style>
<template>
    <div class="wrapper">
        <router-view class="router"></router-view>
        <div class="navigation">
            <div class="navigation-item-wrapper" v-for="index in 4" :key="index" @click="handleRouterPush(index)">
                <i class="navigation-item-img" :class="['navigation-item-img-0' + index,index === navigationActiveIndex ? 'navigation-item-img-0' + index + '-active' : '']"></i>
                <p class="navigation-item-word" :class="index === navigationActiveIndex ? 'navigation-item-word-active' : ''">
                    <span>
                        {{ index === 1 ? '首页' : (index === 2 ? '管家' : (index === 3 ? '生活' : '我的')) }}
                    </span>
                </p>
            </div>
        </div>
    </div>
</template>
<script lang="babel">
    export default {
        computed: {
            isVisitor() {
                return this.$store.state.isVisitor;
            },
            navigationActiveIndex() {
                return this.$route.path === '/index/service' ? 1 : (this.$route.path === '/index/manager' ? 2 : (this.$route.path.indexOf('life')>-1 ? 3 : ((this.$route.path === '/index/person' || this.$route.path === '/index/visitorPerson') ? 4 : '')));
            }
        },
        methods: {
            handleRouterPush(index) {
                this.$router.replace(index === 1 ? '/index/service' : (index === 2 ? '/index/manager' : (index === 3 ? '/index/life' : (this.isVisitor === true ? '/index/visitorPerson' : '/index/person'))));
            }
        }
    }
</script>