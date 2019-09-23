<style lang="less" scoped>
    .activity{ display: flex; flex-direction: column; justify-content: space-between; width: 100%; height: 100%; background-color: #f5f5f5;
        &-list{ flex-grow: 1; overflow-y: scroll;
            &-item{ display: flex; padding: .3rem; margin-bottom: .3rem; border-top: 1px solid #dcdcdc; border-bottom: 1px solid #dcdcdc; background-color: #fff;
                img{ flex-shrink: 0; width: 1.28rem; height: 1.28rem; margin-right: .3rem;}
                &-words{ display: flex; flex-direction: column; justify-content: space-between; flex-grow: 1;
                    &-top{ display: flex; justify-content: space-between; align-items: center;
                        &-title{ font-size: .28rem; color: #333;}
                        &-date{ font-size: .22rem; color: #999;}
                    }
                    &-content{ height: .7rem; font-size: .24rem; color: #666;}
                }
            }
        }
        &-button{ width: 100%; border-radius: 0; flex-shrink: 0;}
    }
</style>
<template>
    <div class="activity" v-title="'已报名的活动'">
        <ul class="activity-list">
            <li class="activity-list-item" v-for="activity in activityList" :key="activity.id" @click="handleActivityInfo(activity.id)">
                <img :src="activity.img" v-if="activity.img !== ''" />
                <div class="activity-list-item-words">
                    <div class="activity-list-item-words-top">
                        <p class="activity-list-item-words-top-title">{{ activity.title }}</p>
                        <p class="activity-list-item-words-top-date">{{ activity.date }}</p>
                    </div>
                    <pre class="activity-list-item-words-content">{{ activity.content }}</pre>
                </div>
            </li>
        </ul>
    </div>
</template>
<script lang="babel">
    import zdButton from 'publicComponents/button/button';

    export default {
        components: {   
            zdButton
        },
        computed: {
            isVisitor() {
                return this.$store.state.isVisitor;
            },
            info() {
                return this.$store.state.info;
            }
        },
        data() {
            return {
                activityList: []
            }
        },
        methods: {
            handleActivityInfo(id) {
                this.$router.push({
                    path: '/service/activity/activityInfo',
                    query: {
                        id
                    }
                });
            }
        },
        mounted() {
            if (this.isVisitor === true) {
                this.$router.replace('/index');
            } else {
                this.$http({
                    url: '/api/system/service/activity/getEnrolledActivityList',
                    params: {
                        parkId: this.info.defaultParkId,
                        roomId: this.info.defaultAddressId
                    }
                }).then((response) => {
                    this.activityList = response.data.activityList;
                }).catch((response) => {
                    console.log(response);
                });
            }
        }
    }
</script>

