<style lang="less" scoped>
    .icon{ display: inline-block; width: .13rem; height: .24rem; margin-left: .3rem; background-image: url(../../../../../publicSource/img/push_icon.png); background-size: 100% 100%; background-repeat: no-repeat;}
    .myFamily{
        &-wrapper{ display: flex; flex-direction: column; justify-content: space-between; width: 100%; height: 100%; background-color: #f5f5f5;}
        &-info{ flex-shrink: 0; display: flex; flex-direction: column; justify-content: space-between; width: 6.6rem; height: 3.3rem; margin: .4rem .3rem .3rem; padding: .3rem; border: 1px solid #dcdcdc; border-radius: .08rem; background-color: #fff;
            &-address{ display: flex; justify-content: space-between;
                &-word{ width: 4.8rem; font-size: .26rem; color: #333;}
                &-change{ width: .91rem; height: .5rem; border: .02rem solid #dcdcdc; border-radius: .09rem; background-color: #fff; font-size: .24rem; color: #333;}
            }
            &-other{ display: flex;
                &-item{ flex-basis: 0; flex-grow: 1;
                    &-contain{ display: flex; justify-content: center; align-items: center; font-size: .3rem; color: #333;}
                    &-title{ font-size: .22rem; color: #999; text-align: center;}
                }
            }
        }
        &-member{ flex-grow: 1; background-color: #fff;
            &-tabs{
                &-item{ display: flex; justify-content: space-between; align-items: center; padding: .2rem .3rem; border-bottom: 1px solid #dcdcdc; font-size: .28rem; color: #333;}
                &-left{ line-height: .48rem;}
                &-right{ display: flex; align-items: center;
                    span{ color: #999;}
                }
                &-headimg{ width: .68rem; height: .68rem; margin-right: .3rem; border-radius: 50%; background-color: #dcdcdc; overflow: hidden;}
                &-word{ flex-grow: 1;
                    &-s{ flex-grow: 1; font-size: .24rem;}
                }
            }
        }
        &-bottom{ flex-shrink: 0; display: flex; height: .96rem; border-top: 1px solid #dcdcdc; background-color: #fff;
            &-item{ display: flex; justify-content: center; align-items: center; flex-basis: 0; flex-grow: 1; height: 100%; border-left: 1px solid #dcdcdc; font-size: .26rem; color: #333;
                &:first-child{ border-left: 0 none;}
            }
        }
    }
</style>
<template>
    <div class="myFamily-wrapper" v-title="'我的家庭'">
        <div class="myFamily-info">
            <div class="myFamily-info-address">
                <p class="myFamily-info-address-word">{{ info.defaultAddressName }}</p>
                <button class="myFamily-info-address-change"
                    @click="handleChangeHouse">切换</button>
            </div>
            <div class="myFamily-info-other">
                <div class="myFamily-info-other-item">
                    <p class="myFamily-info-other-item-contain">{{ info.identity === 1 
                        ? '户主'
                        :
                    (info.identity === 2
                        ? '家属'
                        : '租客') }}</p>
                    <p class="myFamily-info-other-item-title">我的身份</p>
                </div>
                <div class="myFamily-info-other-item">
                    <p class="myFamily-info-other-item-contain">{{ memberCount }}</p>
                    <p class="myFamily-info-other-item-title">当前房屋人数</p>
                </div>
            </div>
        </div>
        <div class="myFamily-member" v-if="info.identity === 1 || info.isAgent === true">
            <zdTabs @changeTabName="changeTabName" ref="tabs">
                <zdTabsView
                    label="待审核"
                    name="001"
                >
                    <ul>
                        <li class="myFamily-member-tabs-item"
                            v-for="member in waitedAuditList"
                            :key="member.userId"
                            @click="handleMemberInfo(member, 2)">
                            <ul class="myFamily-member-tabs-left">
                                <li>姓名：{{ member.realName }}</li>
                                <li>手机：{{ member.cellphone }}</li>
                                <li>身份：{{ member.identity === 2
                                    ? '家属' 
                                    : '租户' }}</li>
                            </ul>
                            <div class="myFamily-member-tabs-right">
                                <span>详情</span>
                                <i class="icon"></i>
                            </div>
                        </li>
                    </ul>
                </zdTabsView>
                <zdTabsView
                    label="已审核"
                    name="002"
                >
                    <ul>
                        <li class="myFamily-member-tabs-item"
                            v-for="member in alreadyAuditedList"
                            :key="member.userId">
                            <ul class="myFamily-member-tabs-left">
                                <li>姓名：{{ member.realName }}</li>
                                <li>手机：{{ member.cellphone }}</li>
                                <li>身份：{{ member.identity === 2
                                    ? '家属' 
                                    : '租户' }}</li>
                            </ul>
                            <div class="myFamily-member-tabs-right">
                                <span>{{ member.status === 2
                                    ? '审核通过'
                                    :
                                (member.status === 1)
                                    ? '待审核'
                                    : '已拒绝' }}</span>
                            </div>
                        </li>
                    </ul>
                </zdTabsView>
                <zdTabsView
                    label="该房屋成员"
                    name="003"
                >
                    <ul>
                        <li class="myFamily-member-tabs-item"
                            v-for="member in memberList"
                            :key="member.userId"
                            @click="handleMemberInfo(member)">
                            <img :src="member.avatar" class="myFamily-member-tabs-headimg" />
                            <span>{{ member.realName }}</span>
                            <span class="myFamily-member-tabs-word-s">{{ member.theResponsible ? '(代理人)' : '' }}</span>
                            <span>{{ member.identity === 1
                                ? '户主' 
                                : 
                            (member.identity === 2
                                ? '家属'
                                : '租户') }}</span>
                            <i class="icon"></i>
                        </li>
                    </ul>
                </zdTabsView>
            </zdTabs>
        </div>
        <div class="myFamily-member" v-else>
            <ul>
                <li class="myFamily-member-tabs-item"
                    v-for="member in agentList"
                    :key="member.userId"
                    @click="handleMemberInfo(member)">
                    <img :src="member.avatar" class="myFamily-member-tabs-headimg" />
                    <span class="myFamily-member-tabs-word">{{ member.realName }}</span>
                    <span>{{ member.identity === 1
                        ? '户主' 
                        : 
                    (member.identity === 2
                        ? '家属(代理人)'
                        : '租户(代理人)') }}</span>
                    <i class="icon"></i>
                </li>
            </ul>
        </div>
        <div class="myFamily-bottom">
            <div class="myFamily-bottom-item"
                @click="handleInviteMember">
                <span>邀请家庭成员</span>
            </div>
            <!-- <div class="myFamily-bottom-item"
                v-if="info.identity === 1 || info.isAgent === true"
                @click="handleInviteMember">
                <span>邀请家庭成员</span>
            </div> -->
            <div class="myFamily-bottom-item" @click="handleAddHouse">
                <span>添加房屋</span>
            </div>
        </div>
    </div>
</template>
<script lang="babel">
    import zdTabs from 'publicComponents/tabs/tabs';
    import zdTabsView from 'publicComponents/tabs/tabsView';

    export default {
        components: {
            zdTabs,
            zdTabsView
        },
        data() {
            return {
                memberCount: 0,
                waitedAuditList: [],
                alreadyAuditedList: [],
                memberList: [],
                agentList: []
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
            changeTabName(name) {
                this.$router.replace('/person/myFamily/tab/' + name);
            },
            handleChangeHouse() {
                this.$router.push('/person/myFamily/changeDefaultHouse/myFamily');
            },
            handleAddHouse() {
                this.$router.push('/person/myFamily/addHouse');
            },
            handleMemberInfo(member, auditStatus) {
                const path = '/person/myFamily/familyMemberInfo/' + (this.info.identity === 1 || this.info.isAgent ? 'host' : 'tenant');
                
                this.$router.push({
                    path,
                    query: {
                        id: member.id,
                        auditStatus
                    }
                });
            },
            handleInviteMember() {
                this.$router.push('/person/myFamily/inviteMember');
            }
        },
        mounted() {
            if (this.isVisitor === true) {
                this.$router.replace('/index/visitorPerson');
            } else {
                this.$http({
                    url: '/api/system/personalCenter/getMyFamilyInfo',
                    params: {
                        roomId: this.info.defaultAddressId
                    }
                }).then((response) => {
                    if (response.data.code === '00000') {
                        this.memberCount = response.data.data.memberCount;
                        if (response.data.data.theResponsible === true || response.data.data.identity === 1) {
                            this.waitedAuditList = response.data.data.waitedList;
                            this.alreadyAuditedList = response.data.data.auditedList;
                            this.memberList = response.data.data.memberList;

                            this.$refs['tabs'].tipsNumberChange(0, this.waitedAuditList.length)
                        } else {
                            this.agentList = response.data.data.responsibleList;
                        }
                    }
                }).catch((response) => {
                    console.log(response);
                });

            }
        }
    }
</script>