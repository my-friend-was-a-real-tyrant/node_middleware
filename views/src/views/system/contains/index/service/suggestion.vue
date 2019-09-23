<style lang="less" scoped>
    .scoped{ display: flex; flex-direction: column; width: 100%; height: 100%; background-color: #f5f5f5;
        &-list{ flex-grow: 1; overflow: scroll;
            &-item{ padding: .3rem; margin-bottom: .4rem; border-top: 1px solid #dcdcdc; border-bottom: 1px solid #dcdcdc; background-color: #fff;
                &-qa{
                    i{ width: .4rem; height: .4rem; margin-right: .15rem; border-radius: .08rem; background-color: #E8BD6E; color: #fff; font-size: .28rem; line-height: .4rem; text-align: center;}
                    &-word{ height: .4rem; color: #333; font-size: .28rem; line-height: .4rem;}
                    &-date{ height: .4rem; color: #999; font-size: .22rem; line-height: .4rem;}
                }
                &-qa:nth-of-type(2){padding-top: 10px;
                    i{background-color: #75B90A;}
                }
                &-ask{ margin-bottom: .2rem;}
            }
        }
        &-button{ flex-shrink: 0; margin: .1rem auto;}
    }
</style>
<template>
    <div class="scoped">
        <ul class="scoped-list">
            <li class="scoped-list-item" v-for="item in suggestionList" :key="item.id" @click="handleRouteToSuggestionInfo(item.id)">
                <div class="scoped-list-item-qa clearFix">
                    <i class="fl">问</i>
                    <div class="fl">
                        <pre class="scoped-list-item-qa-word">{{ item.question }}</pre>
                        <p class="scoped-list-item-qa-date">{{ item.datetime }}</p>
                    </div>
                </div>
                <div class="scoped-list-item-qa clearFix">
                    <i class="fl">答</i>
                    <div class="fl">
                        <p class="scoped-list-item-qa-word">{{ item.answer }}</p>
                        <p class="scoped-list-item-qa-date">{{ item.revertDatetime }}</p>
                    </div>
                </div>
            </li>
        </ul>
        <zd-button class="scoped-button" @click="handleRouteToSuggest">我要咨询</zd-button>
    </div>
</template>
<script>
    import zdButton from 'publicComponents/button/button';

    export default {
        components: {
            zdButton
        },
        data() {
            return {
                suggestionList: []
            }
        },
        computed: {
            isVisitor() {
                return this.$store.state.isVisitor;
            },
            info() {
                return this.$store.state.info;
            }
        },
        methods: {
            handleRouteToSuggest() {
                this.$router.push('/service/suggestion/suggest')
            },
            handleRouteToSuggestionInfo(id) {
                this.$router.push({
                    path: '/service/suggestion/suggestionInfo',
                    query: {
                        id
                    }
                });
            }
        },
        mounted() {
            if (this.isVisitor === true) {
                alert("本功能只对业主开放，请到“个人中心”完善信息");
                this.$router.replace('/index/visitorPerson');
            } else {
                this.$http({
                    url: '/api/system/service/suggestion/getSuggestionList',
                    params: {
                        parkId: this.info.defaultParkId
                    }
                }).then((response) => {
                    this.suggestionList = response.data.suggestionList;
                }).catch((response) => {
                    console.log(response);
                });
            }
        }
    }
</script>

