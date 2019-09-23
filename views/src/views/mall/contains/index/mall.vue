<style lang="less" scoped>
    .merchandise{
        &-wrapper{ display: flex; height: 3.3rem; padding: .3rem; border-top: 1px solid #dcdcdc; border-bottom: 1px solid #dcdcdc; background-color: #fff;}
        &-img{ flex-shrink: 0; width: 2.7rem; height: 2.7rem; margin-right: .35rem;}
        &-info{ display: flex; flex-direction: column; flex-grow: 1; padding-top: .3rem;
            &-title{ height: .63rem; font-size: .42rem; color: #333; text-overflow: ellipsis; overflow: hidden;}
            &-description{ height: .33rem; font-size: .22rem; color: #999; text-overflow: ellipsis; overflow: hidden;}
            &-price{ color: #ff4208; font-size: .5rem;
                &-title{ font-size: .36rem;}
                &-unit{ color: #333; font-size: .22rem;}
            }
            &-button{ width: 1.58rem; height: .52rem; border: 0 none; outline: 0 none; border-radius: .08rem; background-color: #ff4208; color: #fff; font-size: .28rem;
                &-disabled{ background-color: #999;}
            }
        }
    }
</style>
<template>
    <ul v-title="'特惠商城'">
        <li class="merchandise-wrapper" v-for="merchandise in merchandiseList" :key="merchandise.id" @click="handleMerchandiseInfo(merchandise.id, merchandise.groupId)">
            <img class="merchandise-img" :src="merchandise.img" />
            <div class="merchandise-info">
                <p class="merchandise-info-title">{{ merchandise.name }}</p>
                <p class="merchandise-info-description">{{ merchandise.description }}</p>
                <p class="merchandise-info-price">
                    <span class="merchandise-info-price-title">拼团价：</span><span>{{ merchandise.price }}</span><span class="merchandise-info-price-unit">元/份</span>
                </p>
                <button class="merchandise-info-button" :class="{'merchandise-info-button-disabled': merchandise.status !== 2}">{{ merchandise.status === 2 ? '立即购买' : merchandise.status === 3 ? '已售罄' : '已结束' }}</button>
            </div>
        </li>
    </ul>
</template>
<script lang="babel">
    export default {
        data() {
            return {
                merchandiseList: []
            }
        },
        methods: {
            handleMerchandiseInfo(id, groupId) {
                this.$router.push({
                    path: '/mall/merchandiseInfo',
                    query: {
                        id,
                        groupId
                    }
                });
            }
        },
        mounted() {
            this.$http({
                url: '/api/mall/mall/getMerchandiseList'
            }).then((response) => {
                this.merchandiseList = response.data.merchandiseList;
            }).catch((response) => {
                console.log(response);
            });
        }
    }
</script>