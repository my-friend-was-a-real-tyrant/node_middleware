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
                    <li class="myRepairment-list-item" v-for="item in allReportList" :key="item.id" @click="handleRouteToReportInfo(item.id)">
                        <p>
                            <span class="myRepairment-list-item-description">{{ item.type }}</span>
                            <span class="myRepairment-list-item-date">{{ item.date }}</span>
                        </p>
                        <p>
                            <span class="myRepairment-list-item-area">{{ item.title }}</span>
                            <span class="myRepairment-list-item-status">{{ item.status === 1 
                                ? '处理中'
                                : '处理完成' }}</span>
                        </p>
                    </li>
                </ul>
            </zdTabsView>
            <zdTabsView
                label="处理中"
                name="002">
                <ul class="myRepairment-list">
                    <li class="myRepairment-list-item" v-for="item in handlingReportList" :key="item.id" @click="handleRouteToReportInfo(item.id)">
                        <p>
                            <span class="myRepairment-list-item-description">{{ item.type }}</span>
                            <span class="myRepairment-list-item-date">{{ item.date }}</span>
                        </p>
                        <p>
                            <span class="myRepairment-list-item-area">{{ item.title }}</span>
                            <span class="myRepairment-list-item-status">{{ item.status === 1 
                                ? '处理中'
                                : '处理完成' }}</span>
                        </p>
                    </li>
                </ul>
            </zdTabsView>
            <zdTabsView
                label="处理完成"
                name="003">
                <ul class="myRepairment-list">
                    <li class="myRepairment-list-item" v-for="item in handledRepairmentList" :key="item.id" @click="handleRouteToReportInfo(item.id)">
                        <p>
                            <span class="myRepairment-list-item-description">{{ item.type }}</span>
                            <span class="myRepairment-list-item-date">{{ item.date }}</span>
                        </p>
                        <p>
                            <span class="myRepairment-list-item-area">{{ item.title }}</span>
                            <span class="myRepairment-list-item-status">{{ item.status === 1 
                                ? '处理中'
                                : '处理完成' }}</span>
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
                allReportList: [],
                handlingReportList: [],
                handledRepairmentList: []
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
                this.$router.replace('/person/myReport/tab/' + name);
            },
            handleRouteToReportInfo(id) {
                this.$router.push({
                    path: '/person/myReport/reportInfo',
                    query: {
                        id
                    }
                });
            }
        },
        mounted() {
            if (this.isVisitor === true) {
                this.$router.replace('/index/visitorPerson');
            } else {
                this.$http({
                    url: '/api/system/personalCenter/getReportList',
                    params: {
                        parkId: this.info.defaultParkId
                    }
                }).then((response) => {
                    if (response.data.code === '00000') {
                        this.allReportList = response.data.allReportList;
                        this.handlingReportList = response.data.handlingReportList;
                        this.handledRepairmentList = response.data.handledRepairmentList;
                    }
                }).catch((response) => {
                    console.log(response);
                });
            }
        }
    }
</script>