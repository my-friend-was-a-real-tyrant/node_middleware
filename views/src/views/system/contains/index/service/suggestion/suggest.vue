<style lang="less" scoped>
    .scoped{ display: flex; flex-direction: column; justify-content: space-between; width: 100%; height: 100%;
        &-text{ flex-grow: 1; padding: .3rem; font-size: .28rem;}
        &-button{ flex-shrink: 0; width: 100%; border-radius: 0;}
    }
</style>
<template>
    <div class="scoped">
        <textarea class="scoped-text" placeholder="请输入您的问题" v-model.trim="question"></textarea>
        <zdButton class="scoped-button" @click="handleSubmitSuggestion">提交</zdButton>
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
                question: ''
            }
        },
        computed: {
            isVisitor() {
                return this.$store.state.isVisitor;
            }
        },
        methods: {
            handleSubmitSuggestion() {
                if (this.question === '') {
                    alert('请填写您的问题');
                } else {
                    this.$http({
                        url: '/api/system/service/suggestion/submitSuggestion',
                        method: 'post',
                        data: {
                            question: this.question,
                            parkId: this.$store.state.info.defaultParkId,
                            roomId: this.$store.state.info.defaultAddressId
                        }
                    }).then((response) => {
                        if (response.data.code === '00000') {
                            this.$message('提交成功');
                            this.$router.push('/service/suggestion');
                        }
                    }).catch((response) => {
                        console.log(response);
                    });
                }
            }
        },
        mounted() {
            if (this.isVisitor === true) {
                this.$router.replace('/index');
            }
        }
    }
</script>
