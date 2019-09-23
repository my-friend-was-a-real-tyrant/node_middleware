<style lang="less" scoped>
    .complaint{ width: 100%; height: 100%;
        &-wrapper{ width: 100%; height: 100%;}
        &-content{
            &-wrapper{ position: relative; flex-grow: 1;}
            &-list{ margin-bottom: .96rem;
                &-item{ display: flex; justify-content: space-between; height: 1.9rem; padding: .2rem .3rem; border-bottom: 1px solid #dcdcdc;
                    img{ height: 1.5rem; width: 1.5rem; margin-right: .3rem;}
                    &-word{ width: 4.8rem; flex-grow: 1;}
                    &-title{ font-size: .3rem; color: #333;}
                    &-description, &-date, &-status{ font-size: .24rem; color: #666;}
                    &-description{ height: .75rem; padding: .1rem 0;}
                    &-status{ color: #ff4208;}
                    &-bottom{ display: flex; justify-content: space-between;}
                }
            }
            &-button{ position: fixed; bottom: 0; left: 0; width: 100%; border-radius: 0;}
        }
    }
</style>
<template>
    <div class="complaint" v-title="'表扬投诉'">
        <zdTabs class="complaint-wrapper" @changeTabName="changeTabName">
            <zdTabsView
                label="表扬"
                name="001"
                class="complaint-content-wrapper"
            >
                <ul class="complaint-content-list">
                    <li class="complaint-content-list-item" v-for="item in praiseList" :key="item.id" @click="handleComplaintInfoRoute(item.id)">
                        <img :src="item.img" v-if="item.img !== ''" />
                        <div class="complaint-content-list-item-word">
                            <p class="complaint-content-list-item-title">{{ item.title }}</p>
                            <pre class="complaint-content-list-item-description">{{ item.description }}</pre>
                            <p class="complaint-content-list-item-date">{{ item.date }}</p>
                        </div>
                    </li>
                </ul>
                <zdButton class="complaint-content-button" @click="handlePraiseRoute">我要表扬</zdButton>
            </zdTabsView>
            <zdTabsView
                label="投诉"
                name="002"
                class="complaint-content-wrapper"
            >
                <ul class="complaint-content-list">
                    <li class="complaint-content-list-item" v-for="item in complaintList" :key="item.id" @click="handleComplaintInfoRoute(item.id)">
                        <img :src="item.img" v-if="item.img !== ''" />
                        <div class="complaint-content-list-item-word">
                            <p class="complaint-content-list-item-title">{{ item.title }}</p>
                            <pre class="complaint-content-list-item-description">{{ item.description }}</pre>
                            <div class="complaint-content-list-item-bottom">
                                <p class="complaint-content-list-item-date">{{ item.date }}</p>
                                <p class="complaint-content-list-item-status">{{ item.status }}</p>
                            </div>
                        </div>
                    </li>
                </ul>
                <zdButton class="complaint-content-button" @click="handleComplaintRoute">我要投诉</zdButton>
            </zdTabsView>
        </zdTabs>
    </div>
</template>
<script lang="babel">
    import zdTabs from 'publicComponents/tabs/tabs';
    import zdTabsView from 'publicComponents/tabs/tabsView';
    import zdButton from 'publicComponents/button/button';

    export default {
        components: {
            zdTabs,
            zdTabsView,
            zdButton
        },
        data() {
            return {
                praiseList: [],
                complaintList: []
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
                this.$router.replace('/service/myComplaint/tab/' + name);
            },
            handlePraiseRoute() {
                this.$router.push('/service/myComplaint/complaint/2');
            },
            handleComplaintRoute() {
                this.$router.push('/service/myComplaint/complaint/1');
            },
            handleComplaintInfoRoute(id) {
                this.$router.push({
                    path: '/service/myComplaint/complaintInfo',
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
                    url: '/api/system/service/complaint/getComplaintList',
                    params: {
                        parkId: this.info.defaultParkId
                    }
                }).then((response) => {
                    this.praiseList = response.data.praiseList;
                    this.complaintList = response.data.complaintList;
                }).catch((response) => {
                    console.log(response);
                });
            }
        }
    }
</script>