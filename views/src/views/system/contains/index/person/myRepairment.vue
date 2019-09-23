<style lang="less" scoped>
    @border: 1px solid #dcdcdc;
    .myRepairment{ width: 100%; height: 100%; background-color: #f5f5f5;
        &-list{
            &-item{ display: flex; flex-direction: column; margin-top: .3rem; border-top: @border; border-bottom: @border; padding: .3rem; background-color: #fff;
                p{ display: flex; justify-content: space-between; align-items: center; height: .5rem;}
                &-description{ flex-grow: 1; font-size: .28rem; color: #333; overflow: hidden;}
                &-date{ flex-shrink: 0; width: 1.4rem; font-size: .22rem; color: #999; text-align: right;}
                &-area{ font-size: .28rem; color: #666;}
                &-status{ font-size: .28rem; color: #ff4208;}
            }
        }
    }
</style>
<template>
    <div class="myRepairment" v-title="'报修记录'">
        <zdTabs @changeTabName="changeTabName">
            <zdTabsView
                label="全部"
                name="001">
                <ul class="myRepairment-list">
                    <li class="myRepairment-list-item" v-for="item in allRepairmentList" :key="item.repairmentId" @click="handleRouteToRepairmentInfo(item.repairmentId)">
                        <p>
                            <span class="myRepairment-list-item-description">{{ item.description.length > 16 ? item.description.slice(0, 16).concat('...') : item.description }}</span>
                            <span class="myRepairment-list-item-date">{{ item.date }}</span>
                        </p>
                        <p>
                            <span class="myRepairment-list-item-area">{{ item.area }}</span>
                            <span class="myRepairment-list-item-status">{{ item.status === 1 
                                ? '待审核'
                                :
                            (item.status === 2
                                ? '已分配工作人员'
                                :
                            (item.status === 3 
                                ? '已拒绝'
                                :
                            (item.status === 4
                                ? '已转送第三方服务机构'
                                :
                            (item.status === 5
                                ? '待评价'
                                :
                            (item.status === 6
                                ? '已评价'
                                : ''))))) }}</span>
                        </p>
                    </li>
                </ul>
            </zdTabsView>
            <zdTabsView
                label="待审核"
                name="002">
                <ul class="myRepairment-list">
                    <li class="myRepairment-list-item" v-for="item in auditingRepairmentList" :key="item.repairmentId" @click="handleRouteToRepairmentInfo(item.repairmentId)">
                        <p>
                            <span class="myRepairment-list-item-description">{{ item.description.length > 16 ? item.description.slice(0, 16).concat('...') : item.description }}</span>
                            <span class="myRepairment-list-item-date">{{ item.date }}</span>
                        </p>
                        <p>
                            <span class="myRepairment-list-item-area">{{ item.area }}</span>
                            <span class="myRepairment-list-item-status">{{ item.status === 1 
                                ? '待审核'
                                :
                            (item.status === 2
                                ? '已分配工作人员'
                                :
                            (item.status === 3 
                                ? '已拒绝'
                                :
                            (item.status === 4
                                ? '已转送'
                                :
                            (item.status === 5
                                ? '待评价'
                                :
                            (item.status === 6
                                ? '已评价'
                                : ''))))) }}</span>
                        </p>
                    </li>
                </ul>
            </zdTabsView>
            <zdTabsView
                label="已转送"
                name="003">
                <ul class="myRepairment-list">
                    <li class="myRepairment-list-item" v-for="item in reportedRepairmentList" :key="item.repairmentId" @click="handleRouteToRepairmentInfo(item.repairmentId)">
                        <p>
                            <span class="myRepairment-list-item-description">{{ item.description.length > 16 ? item.description.slice(0, 16).concat('...') : item.description }}</span>
                            <span class="myRepairment-list-item-date">{{ item.date }}</span>
                        </p>
                        <p>
                            <span class="myRepairment-list-item-area">{{ item.area }}</span>
                            <span class="myRepairment-list-item-status">{{ item.status === 1 
                                ? '待审核'
                                :
                            (item.status === 2
                                ? '已分配工作人员'
                                :
                            (item.status === 3 
                                ? '已拒绝'
                                :
                            (item.status === 4
                                ? '已转送第三方服务机构'
                                :
                            (item.status === 5
                                ? '待评价'
                                :
                            (item.status === 6
                                ? '已评价'
                                : ''))))) }}</span>
                        </p>
                    </li>
                </ul>
            </zdTabsView>
            <zdTabsView
                label="维修中"
                name="004">
                <ul class="myRepairment-list">
                    <li class="myRepairment-list-item" v-for="item in repairingRepairmentList" :key="item.repairmentId" @click="handleRouteToRepairmentInfo(item.repairmentId)">
                        <p>
                            <span class="myRepairment-list-item-description">{{ item.description.length > 16 ? item.description.slice(0, 16).concat('...') : item.description }}</span>
                            <span class="myRepairment-list-item-date">{{ item.date }}</span>
                        </p>
                        <p>
                            <span class="myRepairment-list-item-area">{{ item.area }}</span>
                            <span class="myRepairment-list-item-status">{{ item.status === 1 
                                ? '待审核'
                                :
                            (item.status === 2
                                ? '已分配工作人员'
                                :
                            (item.status === 3 
                                ? '已拒绝'
                                :
                            (item.status === 4
                                ? '已转送第三方服务机构'
                                :
                            (item.status === 5
                                ? '待评价'
                                :
                            (item.status === 6
                                ? '已评价'
                                : ''))))) }}</span>
                        </p>
                    </li>
                </ul>
            </zdTabsView>
            <zdTabsView
                label="待评价"
                name="005">
                <ul class="myRepairment-list">
                    <li class="myRepairment-list-item" v-for="item in finishRepairmentList" :key="item.repairmentId" @click="handleRouteToRepairmentInfo(item.repairmentId)">
                        <p>
                            <span class="myRepairment-list-item-description">{{ item.description.length > 16 ? item.description.slice(0, 16).concat('...') : item.description }}</span>
                            <span class="myRepairment-list-item-date">{{ item.date }}</span>
                        </p>
                        <p>
                            <span class="myRepairment-list-item-area">{{ item.area }}</span>
                            <span class="myRepairment-list-item-status">{{ item.status === 1 
                                ? '待审核'
                                :
                            (item.status === 2
                                ? '已分配工作人员'
                                :
                            (item.status === 3 
                                ? '已拒绝'
                                :
                            (item.status === 4
                                ? '已转送第三方服务机构'
                                :
                            (item.status === 5
                                ? '待评价'
                                :
                            (item.status === 6
                                ? '已评价'
                                : ''))))) }}</span>
                        </p>
                    </li>
                </ul>
            </zdTabsView>
        </zdTabs>
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
                allRepairmentList: [],
                auditingRepairmentList: [],
                reportedRepairmentList: [],
                repairingRepairmentList: [],
                finishRepairmentList: []
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
                this.$router.replace('/person/myRepairment/tab/' + name);
            },
            handleRouteToRepairmentInfo(repairmentId) {
                this.$router.push({
                    path: '/person/myRepairment/repairmentInfo',
                    query: {
                        repairmentId
                    }
                });
            }
        },
        mounted() {
            if (this.isVisitor === true) {
                this.$router.replace('/index/visitorPerson');
            } else {
                this.$http({
                    url: '/api/system/personalCenter/getRepairmentList',
                    params: {
                        parkId: this.info.defaultParkId
                    }
                }).then((response) => {
                    if (response.data.code === '00000') {
                        this.allRepairmentList = response.data.repairmentList;
                        this.auditingRepairmentList = response.data.auditingRepairmentList;
                        this.reportedRepairmentList = response.data.reportedRepairmentList;
                        this.repairingRepairmentList = response.data.repairingRepairmentList;
                        this.finishRepairmentList = response.data.finishRepairmentList;
                    }
                }).catch((response) => {
                    console.log(response);
                });
            }
        }
    }
</script>