<style lang="less" scoped>
    .choosePark-park{
        &-wrapper{ display: flex; flex-direction: column; position: relative; height: 100%;}
        &-top{ display: flex; height: .57rem; border-radius: .09rem; background-color: #dcdcdc; font-size: .22rem; color: #999; justify-content: center; align-items: center;
            i{ display: inline-block; width: .25rem; height: .25rem; background-image: url(../../img/choosePark_park_search.png); background-repeat: no-repeat; background-size: 100% 100%;}
            span{ padding: 0 .05rem;}
            &-wrapper{ height: .96rem; padding: .2rem .3rem; border-bottom: .01rem solid #dcdcdc;}
        }
        &-middle{ height: .96rem; padding: .2rem .3rem; border-bottom: .01rem solid #dcdcdc; font-size: .26rem; text-align: right; line-height: .55rem; color: #999;}
        &-list{
            &-wrapper{ flex-grow: 1; overflow: scroll;}
            &-city{ height: .96rem; padding: 0 .3rem; border-bottom: .01rem solid #dcdcdc; background-color: #f5f5f5; font-size: .26rem; color: #999; line-height: .95rem;}
            &-park{ height: .96rem; padding: 0 .3rem; border-bottom: .01rem solid #dcdcdc; font-size: .26rem; line-height: .95rem;}
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
    <div class="choosePark-park-wrapper">
        <div class="choosePark-park-top-wrapper">
            <div class="choosePark-park-top" @click="handleSearchPark">
                <i></i>
                <span>请输入园区名称</span>
            </div>
        </div>
        <div class="choosePark-park-middle">
            <span @click="handleIFirstSeeSee">我先看看 > </span>
        </div>
        <div class="choosePark-park-list-wrapper">
            <div v-for="item in cityList" :key="item.cityId">
                <div class="choosePark-park-list-city">
                    <span>{{ item.cityName }}</span>
                </div>
                <div class="choosePark-park-list-park" v-for="parkItem in item.parkList" :key="parkItem.id" @click="handleChoosePark(item.cityId, item.cityName, parkItem.id, parkItem.name)">
                    <span>{{ parkItem.name }}</span>
                </div>
            </div>
        </div>
        <transition name="search-transition">
            <div class="choosePark-park-search-wrapper" v-show="search">
                <div class="choosePark-park-search-top-wrapper">
                    <input type="text" placeholder="请输入园区名称" class="choosePark-park-search-top" id="choosePark-park-search-input" v-model.trim="searchWord" />
                    <span class="choosePark-park-search-top-cancle" @click="handleSearchParkCancle">取消</span>
                </div>
                <div class="choosePark-park-list-wrapper">
                    <div v-for="item in searchCity" :key="item.cityId">
                        <div class="choosePark-park-list-city">
                            <span>{{ item.cityName }}</span>
                        </div>
                        <div class="choosePark-park-list-park" v-for="parkItem in item.parkList" :key="parkItem.id" @click="handleChoosePark(item.cityId, item.cityName, parkItem.id, parkItem.name)">
                            <span>{{ parkItem.name }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script lang="babel">
    export default {
        data() {
            return {
                search: false,
                searchWord: '',
                cityList: [
                    // {
                    //     cityId: '00000',
                    //     cityName: '杭州市',
                    //     parkList: [
                    //         {
                    //             parkId: 'P0001',
                    //             parkName: '杭州新天地1'
                    //         }
                    //     ]
                    // }
                ]
            }
        },
        computed: {
            searchCity() {
                if (this.searchWord === '') {
                    return this.cityList;
                } else {
                    const searchCity = [];
                    for (let i = 0; i < this.cityList.length; i ++) {
                        if (this.cityList[i].cityName.indexOf(this.searchWord) !== -1) {
                            const cityTemp = {
                                cityId: '',
                                cityName: '',
                                parkList: []
                            };
                            cityTemp.cityId = this.cityList[i].cityId;
                            cityTemp.cityName = this.cityList[i].cityName;
                            for (let j = 0; j < this.cityList[i].parkList.length; j ++) {
                                const parkTemp = {
                                    id: '',
                                    name: ''
                                };
                                parkTemp.id = this.cityList[i].parkList[j].id;
                                parkTemp.name = this.cityList[i].parkList[j].name;
                                cityTemp.parkList.push(parkTemp);
                            }
                            searchCity.push(cityTemp);
                        } else {
                            let bool = false;
                            const cityTemp = {
                                cityId: '',
                                cityName: '',
                                parkList: []
                            };
                            cityTemp.cityId = this.cityList[i].cityId;
                            cityTemp.cityName = this.cityList[i].cityName;
                            for (let j = 0; j < this.cityList[i].parkList.length; j ++) {
                                if (this.cityList[i].parkList[j].name.indexOf(this.searchWord) !== -1) {
                                    if (!bool) {
                                        bool = true;
                                    }
                                    const parkTemp = {
                                        id: '',
                                        name: ''
                                    };
                                    parkTemp.id = this.cityList[i].parkList[j].id;
                                    parkTemp.name = this.cityList[i].parkList[j].name;
                                    cityTemp.parkList.push(parkTemp);
                                }
                            }
                            if (bool) {
                                searchCity.push(cityTemp);
                            }
                        }
                    }

                    return searchCity;
                }
            }
        },
        methods: {
            handleSearchPark() {
                this.search = true;
            },
            handleSearchParkCancle() {
                this.search = false;
            },
            handleChoosePark(cityId, cityName, parkId, parkName) {
                this.$emit('parkChoose', cityId, cityName, parkId, parkName);
            },
            handleIFirstSeeSee() {
                this.$emit('iFirstSeeSee');
            }
        },
        mounted() {
            this.$http({
                method: 'get',
                url: '/api/login/getParkList'
            }).then((response) => {
                if (response.data.code === '00000') {
                    this.cityList = response.data.cityList;
                }
            }).catch((response) => {
                console.log(response);
            });
        }
    }
</script>