<style lang="less" scoped>
    .choosePark-build{
        &-wrapper{ display: flex; flex-direction: column; position: relative; height: 100%;}
        &-top{ display: flex; height: .57rem; border-radius: .09rem; background-color: #dcdcdc; font-size: .22rem; color: #999; justify-content: center; align-items: center;
            i{ display: inline-block; width: .25rem; height: .25rem; background-image: url(../../img/choosePark_park_search.png); background-repeat: no-repeat; background-size: 100% 100%;}
            span{ padding: 0 .05rem;}
            &-wrapper{ height: .96rem; padding: .2rem .3rem; border-bottom: .01rem solid #dcdcdc;}
        }
        &-middle{ height: .96rem; padding: .2rem .3rem; border-bottom: .01rem solid #dcdcdc; font-size: .26rem; text-align: right; line-height: .55rem; color: #999;}
        &-list{
            &-wrapper{ flex-grow: 1; overflow: scroll;}
            &-build{ height: .96rem; padding: 0 .3rem; border-bottom: .01rem solid #dcdcdc; font-size: .26rem; line-height: .95rem;}
        }

        &-search{
            &-wrapper{ display: flex; flex-direction: column; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: #fff;}
            &-top{ width: 5.78rem; height: .57rem; padding-left: .15rem; border: 0 none; outline: 0 none; border-radius: .09rem; background-color: #dcdcdc; font-size: .22rem; color: #000; vertical-align: top;
                &-wrapper{ height: .96rem; padding: .2rem .3rem; border-bottom: .01rem solid #dcdcdc; line-height: .55rem; font-size: 0;}
                &-cancle{ display: inline-block; padding-left: .25rem; font-size: .28rem; color: #666; vertical-align: top;}
            }
        }
    }

    .search-transition{
        &-enter-active, &-leave-active{ transition: all .5s;}
        &-enter, &-leave-active{ opacity: 0; transform: translateX(.3rem);}
    }
</style>
<template>
    <div class="choosePark-build-wrapper">
        <div class="choosePark-build-top-wrapper">
            <div class="choosePark-build-top" @click="handleSearch">
                <i></i>
                <span>请输入楼栋名称</span>
            </div>
        </div>
        <div class="choosePark-build-middle">
            <span @click="handleIFirstSeeSee">我先看看 > </span>
        </div>
        <div class="choosePark-build-list-wrapper">
            <div class="choosePark-build-list-build" v-for="item in build" :key="item.buildingCode" @click="handleChooseBuild(item.id, item.buildingName)">
                <span>{{ item.buildingName }}</span>
            </div>
        </div>

        <transition name="search-transition">
            <div class="choosePark-build-search-wrapper" v-show="search">
                <div class="choosePark-build-search-top-wrapper">
                    <input type="text" placeholder="请输入楼栋名称" class="choosePark-build-search-top" v-model.trim="searchWord" />
                    <span class="choosePark-build-search-top-cancle" @click="handleSearchCancle">取消</span>
                </div>
                <div class="choosePark-build-list-wrapper">
                    <div class="choosePark-build-list-build" v-for="item in searchBuild" :key="item.buildingCode" @click="handleChooseBuild(item.id, item.buildingName)">
                        <span>{{ item.buildingName }}</span>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script lang="babel">
    export default {
        props: ['park'],
        data() {
            return {
                search: false,
                searchWord: '',
                build: [
                    // {
                    //     buildingId: '0000',
                    //     buildingName: '1幢'
                    // }
                ]
            }
        },
        computed: {
            searchBuild() {
                if (this.searchWord === '') {
                    return this.build;
                } else {
                    const searchBuild = [];
                    for (let i = 0; i < this.build.length; i ++) {
                        if (this.build[i].buildingName.indexOf(this.searchWord) !== -1) {
                            const buildTemp = {
                                buildingCode: '',
                                buildingName: ''
                            };
                            buildTemp.buildingCode = this.build[i].buildingCode;
                            buildTemp.buildingName = this.build[i].buildingName;

                            searchBuild.push(buildTemp);
                        }
                    }

                    return searchBuild;
                }
            }
        },
        methods: {
            handleSearch() {
                this.search = true;
            },
            handleSearchCancle() {
                this.search = false;
            },
            handleChooseBuild(id, name) {
                this.$emit('buildChoose', id, name);
            },
            handleIFirstSeeSee() {
                this.$emit('iFirstSeeSee');
            }
        },
        mounted() {
            if (this.park.id !== '') {
                this.$http({
                    method: 'get',
                    url: '/api/login/getBuildingList',
                    params: {
                        parkId: this.park.id
                    }
                }).then((response) => {
                    if (response.data.code === '00000') {
                        this.build = response.data.buildList;
                    }
                }).catch((response) => {
                    console.log(response);
                });
            } else {
                this.$emit('backToPark');
            }
        }
    }
</script>