<style lang="less">
    @border: 1px solid #dcdcdc;
    .familyMember{ display: flex; flex-direction: column; width: 100%; height: 100%; padding-top: .3rem; background-color: #f5f5f5;
        &-header{ display: flex; align-items: center; height: 1.5rem; margin-bottom: .3rem; padding: 0 .3rem; border-top: @border; border-bottom: @border; background-color: #fff;
            &-headimg{ flex-shrink: 0; width: .9rem; height: .9rem; border-radius: 50%; background-color: #dcdcdc; overflow: hidden;
                img{ width: 100%; height: 100%;}
            }
            &-name{ flex-grow: 1; padding-left: .3rem; font-size: .3rem; color: #333;}
        }
        &-info{ border-top: @border; background-color: #fff; font-size: .28rem; color: #333;
            &-item{ display: flex; justify-content: space-between; align-items: center; height: .96rem; padding: 0 .3rem; border-bottom: @border;
            }
        }
        &-operate{ padding: .3rem;
            &-button{ display: flex;
                button{ flex-shrink: 1; margin: 0 .15rem;}
            }
        }
    }
</style>
<template>
    <div class="familyMember" v-title="'成员信息'">
        <div class="familyMember-header">
            <div class="familyMember-header-headimg">
                <img :src="info.headimgurl" />
            </div>
            <p class="familyMember-header-name">{{ info.name }}</p>
        </div>
        <ul class="familyMember-info">
            <li class="familyMember-info-item">
                <span>身份</span>
                <span>{{ info.identity === 1
                    ? '户主'
                    :
                (info.identity === 2
                    ? '家属'
                    :

                (info.identity === 3
                    ? '租户'
                    : '')) }}</span>
            </li>
            <li class="familyMember-info-item">
                <span>手机号</span>
                <span>{{ info.cellphone }}</span>
            </li>
            <li class="familyMember-info-item" v-if="$route.params.type === 'host'">
                <span>审核状态</span>
                <span>{{ info.status === 2
                    ? '已通过'
                    :
                (info.status === 1
                    ? '待审核'
                    : 
                (info.status === 3
                    ? '已拒绝'
                    : '')) }}</span>
            </li>
            <li class="familyMember-info-item" v-if="myInfo.indentity === 1 && info.status === 2 && info.identity !== 1">
                <span>设为代理人</span>
                <zdCheckbox
                    :active="setAsAgent"
                    @click="handleClickSetAgent"></zdCheckbox>
            </li>
        </ul>
        <div class="familyMember-operate" v-if="$route.params.type === 'host'">
            <zdButton
                type="danger"
                v-if="info.status === 2 && info.identity !== 1"
                @click="handleDelMember"
            >删除</zdButton>
            <div class="familyMember-operate-button" v-else-if="info.status === 1">
                <zdButton
                    type="primary"
                    @click="handleAudit('disagree')"
                >拒绝</zdButton>
                <zdButton
                    @click="handleAudit('agree')"
                >同意</zdButton>
            </div>
        </div>
    </div>
</template>
<script lang="babel">
    import zdButton from 'publicComponents/button/button';
    import zdCheckbox from 'publicComponents/checkbox/checkbox';

    export default {
        components: {
            zdButton,
            zdCheckbox
        },
        data() {
            return {
                setAsAgent: false,
                info: {
                    headimgurl: '',
                    name: '',
                    identity: '',
                    cellphone: '',
                    status: '',
                    isAgent: false
                }
            }
        },
        computed: {
            isVisitor() {
                return this.$store.state.isVisitor;
            },
            myInfo() {
                return this.$store.state.info;
            }
        },
        methods: {
            handleDelMember() {
                let r = confirm("确定删除该成员吗？");
                if (r == true) {
                    this.$http({
                        url: '/api/system/personalCenter/delMember',
                        method: 'post',
                        data: {
                            id: this.$route.query.id
                        }
                    }).then((response) => {
                        if (response.data.code === '00000') {
                            this.$router.push('/person/myFamily');
                        }
                    }).catch((response) => {
                        console.log(response);
                    });
                }
            },
            handleClickSetAgent() {
                // if (this.myInfo.identity === 1) {
                if (this.setAsAgent === false) {
                    this.setAsAgent = true;
                    // 发送请求
                    this.$http({
                        url: '/api/system/personalCenter/setAgent',
                        method: 'post',
                        data: {
                            id: this.$route.query.id
                        }
                    }).then((response) => {
                        if (response.data.code === '00000') {
                            this.$message('设置代理人成功');
                        }
                    }).catch((response) => {
                        console.log(response);
                    });
                } else {
                    this.setAsAgent = false;
                    this.$http({
                        url: '/api/system/personalCenter/cancelAgent',
                        method: 'post',
                        data: {
                            id: this.$route.query.id
                        }
                    }).then((response) => {
                        if (response.data.code === '00000') {
                            this.$message('已取消代理人身份');
                        }
                    }).catch((response) => {
                        console.log(response);
                    });
                }
                // }
            },
            handleAudit(type) {
                this.$http({
                    url: '/api/system/personalCenter/auditMember',
                    method: 'post',
                    data: {
                        type,
                        id: this.$route.query.id
                    }
                }).then((response) => {
                    if (response.data.code === '00000') {
                        this.$router.push('/person/myFamily');
                    }
                }).catch((response) => {
                    console.log(response);
                });
            }
        },
        mounted() {
            if (this.isVisitor === true) {
                this.$router.replace('/index/visitorPerson');
            } else {
                this.$http({
                    url: '/api/system/personalCenter/getMemberInfo',
                    params: {
                        type: this.$route.params.type,
                        id: this.$route.query.id,
                        auditStatus: this.$route.query.auditStatus
                    }
                }).then((response) => {
                    if (response.data.code === '00000') {
                        this.info.headimgurl = response.data.info.avatar;
                        this.info.name = response.data.info.realName;
                        this.info.identity = response.data.info.identity;
                        this.info.cellphone = response.data.info.cellphone;
                        this.info.status = response.data.info.status ? response.data.info.status : 2;
                        this.info.isAgent = response.data.info.theResponsible;
                        this.setAsAgent = response.data.info.theResponsible;
                    }
                }).catch((response) => {
                    console.log(response);
                });
            }
        }
    }
</script>