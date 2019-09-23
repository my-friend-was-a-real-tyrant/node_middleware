<style lang="less" scoped>
    .scoped{ display: flex; flex-direction: column; width: 100%; height: 100%; background-color: #f5f5f5;
        &-list{ flex-grow: 1; overflow: scroll;
            &-item{ padding: .3rem; margin-bottom: .4rem; border-top: 1px solid #dcdcdc; border-bottom: 1px solid #dcdcdc; background-color: #fff;
                &-qa{  margin-top: .2rem;
                    i{ width: .4rem; height: .4rem; margin-right: .15rem; border-radius: .08rem; background-color: #e9be6d; color: #fff; font-size: .28rem; line-height: .4rem; text-align: center;}
                    &-word{ height: .4rem; color: #333; font-size: .28rem; line-height: .4rem;}
                    &-date{ height: .4rem; color: #999; font-size: .22rem; line-height: .4rem;}
                }
                &-ask{ margin-top: 0;}
            }
        }
        &-button{ flex-shrink: 0; width: 100%; border-radius: 0;}
    }
</style>
<template>
    <div class="scoped">
        <div class="scoped-list-item">
            <div class="scoped-list-item-qa clearFix">
                <i class="fl">问</i>
                <div class="fl">
                    <pre class="scoped-list-item-qa-word">{{ suggestionInfo.question.text }}</pre>
                    <p class="scoped-list-item-qa-date">{{ suggestionInfo.question.datetime }}</p>
                </div>
            </div>
            <div class="scoped-list-item-qa clearFix" v-for="item in suggestionInfo.answer" :key="item.id">
                <i class="fl">答</i>
                <div class="fl">
                    <p class="scoped-list-item-qa-word">{{ item.text }}</p>
                    <p class="scoped-list-item-qa-date">{{ item.datetime }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                suggestionInfo: {
                    question: {
                        text: '',
                        datetime: ''
                    },
                    answer: [{
                        id: '',
                        text: '',
                        datetime: '',
                        operator: ''
                    }]
                }
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
        mounted() {
            if (this.isVisitor === true) {
                this.$router.replace('/index');
            } else {
                this.$http({
                    url: '/api/system/service/suggestion/getSuggestionInfo',
                    params: {
                        suggestionId: this.$route.query.id
                    }
                }).then((response) => {
                    this.suggestionInfo = response.data.suggestionInfo;
                }).catch((response) => {
                    console.log(response);
                });
            }
        }
    }
</script>
