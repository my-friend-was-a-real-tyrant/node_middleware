<template>
    <div class="business">
        <div class="nav-list">
            <div class="nav-item" v-for="(item,index) in navtext" :key="index" @click="handleClick(item)">
                <img :src="item.icon" class="nav-item-img" />
                <p class="nav-item-name">
                    {{item.name}}
                </p>
            </div>
        </div>
        <life-list></life-list>
    </div>
</template>
<script>
    import i1 from "../../../img/sh_xinfutuangou@2x.png";
    import i2 from "../../../img/sh_quanbufenlei@2x.png";
    import lifeList from "./components/life-list";
    import doname from "../../../../../publicSource/domain";
    export default {
        components: {
            lifeList
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                this.$http({
                        url: "/api/mall/sort/getMerchandiseSortList",
                        params: {
                            keywords: ""
                        }
                    })
                    .then(res => {
                        if (res.status == 200) {
                            res.data.sortList.forEach((element, i) => {
                                if (i < 8) {
                                    const temp = {
                                        name: element.name,
                                        icon: doname.domainname + element.url,
                                        id: element.id,
                                        router: null
                                    };
                                    this.navtext.push(temp);
                                }
                            });
                            this.navtext.unshift({
                                name: "幸福团购",
                                router: "/service/classfiySecond",
                                icon: i1,
                                id: -1
                            });
                            this.navtext.push({
                                name: "全部分类",
                                router: "/service/allclass",
                                icon: i2,
                                id: null
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            handleClick(item) {
                if (item.id) {
                    this.$router.push({
                        path: "/service/classfiySecond",
                        query: {
                            id: item.id,
                            name: item.name
                        }
                    });
                } else {
                    this.$router.push({
                        path: item.router
                    });
                }
            }
        },
        data() {
            return {
                navtext: []
            };
        }
    };
</script>
<style lang="less" scoped>
    @import "./life.less";
</style>