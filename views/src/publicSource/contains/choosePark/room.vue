<style lang="less" scoped>
    .choosePark-room{
        &-wrapper{ display: flex; flex-direction: column; position: relative; height: 100%;}
        &-top{ display: flex; height: .57rem; border-radius: .09rem; background-color: #dcdcdc; font-size: .22rem; color: #999; justify-content: center; align-items: center;
            i{ display: inline-block; width: .25rem; height: .25rem; background-image: url(../../img/choosePark_park_search.png); background-repeat: no-repeat; background-size: 100% 100%;}
            span{ padding: 0 .05rem;}
            &-wrapper{ height: .96rem; padding: .2rem .3rem; border-bottom: .01rem solid #dcdcdc;}
        }
        &-middle{ height: .96rem; padding: .2rem .3rem; border-bottom: .01rem solid #dcdcdc; font-size: .26rem; text-align: right; line-height: .55rem; color: #999;}
        &-list{
            &-wrapper{ flex-grow: 1; overflow: scroll;}
            &-unit{ height: .96rem; padding: 0 .3rem; border-bottom: .01rem solid #dcdcdc; background-color: #f5f5f5; font-size: .26rem; color: #999; line-height: .95rem;}
            &-room{ height: .96rem; padding: 0 .3rem; border-bottom: .01rem solid #dcdcdc; font-size: .26rem; line-height: .95rem;}
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
    <div class="choosePark-room-wrapper">
        <div class="choosePark-room-top-wrapper">
            <div class="choosePark-room-top" @click="handleSearch">
                <i></i>
                <span>请输入房间名称</span>
            </div>
        </div>
        <div class="choosePark-room-middle">
            <span @click="handleIFirstSeeSee">我先看看 > </span>
        </div>
        <div class="choosePark-room-list-wrapper" v-if="unitList.length > 1">
            <div v-for="item in unitList" :key="item.unitId">
                <div class="choosePark-room-list-unit">
                    <span>{{ item.unitName }}</span>
                </div>
                <div class="choosePark-room-list-room" v-for="roomItem in item.roomList" :key="roomItem.roomId" @click="handleChooseRoom(item.unitId, item.unitName, roomItem.roomId, roomItem.roomName)">
                    <span>{{ roomItem.roomName }}</span>
                </div>
            </div>
        </div>
        <div class="choosePark-room-list-wrapper" v-else-if="unitList.length === 1">
            <div class="choosePark-room-list-room" v-for="roomItem in unitList[0].roomList" :key="roomItem.roomId" @click="handleChooseRoom(unitList[0].unitId, unitList[0].unitName, roomItem.roomId, roomItem.roomName)">
                <span>{{ roomItem.roomName }}</span>
            </div>
        </div>

        <transition name="search-transition">
            <div class="choosePark-room-search-wrapper" v-show="search">
                <div class="choosePark-room-search-top-wrapper">
                    <input type="text" placeholder="请输入房间名称" class="choosePark-room-search-top" v-model.trim="searchWord" />
                    <span class="choosePark-room-search-top-cancle" @click="handleSearchCancle">取消</span>
                </div>
                <div class="choosePark-room-list-wrapper" v-if="searchRoom.length > 1">
                    <div v-for="item in searchRoom" :key="item.unitId">
                        <div class="choosePark-room-list-unit">
                            <span>{{ item.unitName }}</span>
                        </div>
                        <div class="choosePark-room-list-room" v-for="roomItem in item.roomList" :key="roomItem.roomId" @click="handleChooseRoom(item.unitId, item.unitName, roomItem.roomId, roomItem.roomName)">
                            <span>{{ roomItem.roomName }}</span>
                        </div>
                    </div>
                </div>
                <div class="choosePark-room-list-wrapper" v-else-if="searchRoom.length === 1">
                    <div class="choosePark-room-list-room" v-for="roomItem in searchRoom[0].roomList" :key="roomItem.roomId" @click="handleChooseRoom(searchRoom[0].unitId, searchRoom[0].unitName, roomItem.roomId, roomItem.roomName)">
                        <span>{{ roomItem.roomName }}</span>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script lang="babel">
    export default {
        props: ['build'],
        data() {
            return {
                search: false,
                searchWord: '',
                unitList: [
                    // {
                    //     unitId: '00000',
                    //     unitName: '1单元',
                    //     roomList: [
                    //         {
                    //             roomId: '0000',
                    //             roomName: '1101'
                    //         }
                    //     ]
                    // }
                ]
            }
        },
        computed: {
            searchRoom() {
                if (this.searchWord === '') {
                    return this.unitList;
                } else {
                    const searchRoom = [];
                    for (let i = 0; i < this.unitList.length; i ++) {
                        if (this.unitList[i].unitName.indexOf(this.searchWord) !== -1) {
                            const unitTemp = {
                                unitId: '',
                                unitName: '',
                                roomList: []
                            };
                            unitTemp.unitId = this.unitList[i].unitId;
                            unitTemp.unitName = this.unitList[i].unitName;
                            for (let j = 0; j < this.unitList[i].roomList.length; j ++) {
                                const roomTemp = {
                                    roomId: '',
                                    roomName: ''
                                };
                                roomTemp.roomId = this.unitList[i].roomList[j].roomId;
                                roomTemp.roomName = this.unitList[i].roomList[j].roomName;
                                unitTemp.roomList.push(roomTemp);
                            }
                            searchRoom.push(unitTemp);
                        } else {
                            let bool = false;
                            const unitTemp = {
                                unitId: '',
                                unitName: '',
                                roomList: []
                            };
                            unitTemp.unitId = this.unitList[i].unitId;
                            unitTemp.cityName = this.unitList[i].unitName;
                            for (let j = 0; j < this.unitList[i].roomList.length; j ++) {
                                if (this.unitList[i].roomList[j].roomName.indexOf(this.searchWord) !== -1) {
                                    if (!bool) {
                                        bool = true;
                                    }
                                    const roomTemp = {
                                        roomId: '',
                                        roomName: ''
                                    };
                                    roomTemp.roomId = this.unitList[i].roomList[j].roomId;
                                    roomTemp.roomName = this.unitList[i].roomList[j].roomName;
                                    unitTemp.roomList.push(roomTemp);
                                }
                            }
                            if (bool) {
                                searchRoom.push(unitTemp);
                            }
                        }
                    }

                    return searchRoom;
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
            handleChooseRoom(unitId, unitName, roomId, roomName) {
                if (this.unitList.length > 1) {
                    this.$emit('roomChoose', unitId, unitName, roomId, roomName, true);
                } else {
                    this.$emit('roomChoose', unitId, unitName, roomId, roomName, false);
                }
            },
            handleIFirstSeeSee() {
                this.$emit('iFirstSeeSee');
            }
        },
        mounted() {
            if (this.build.id !== '') {
                this.$http({
                    method: 'get',
                    url: '/api/login/getRoomList',
                    params: {
                        buildId: this.build.id
                    }
                }).then((response) => {
                    if (response.data.code === '00000') {
                        this.unitList = response.data.unitList;
                    }
                }).catch((response) => {
                    console.log(response);
                });
            } else {
                this.$emit('backToBuild');
            }
        }
    }
</script>