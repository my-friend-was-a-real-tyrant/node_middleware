<style lang="less" scoped>
    .choosePark{
        &-wrapper{ height: 100%;}
    }
</style>
<template>
    <div class="choosePark-wrapper">
        <router-view
            @parkChoose="handleParkChoose"
            @buildChoose="handleBuildChoose"
            @roomChoose="handleRoomChoose"
            @backToPark="backToPark"
            @backToBuild="backToBuild"
            @iFirstSeeSee="handleIFirstSeeSee"
            :park="park"
            :build="build"
            :unit="unit"
            :room="room"
        ></router-view>
    </div>
</template>
<script lang="babel">
    export default {
        data() {
            return {
                city: {
                    id: '',
                    name: ''
                },
                park: {
                    id: '',
                    name: ''
                },
                build: {
                    id: '',
                    name: ''
                },
                unit: {
                    bool: true,
                    id: '',
                    name: ''
                },
                room: {
                    id: '',
                    name: ''
                }
            }
        },
        methods: {
            backToPark() {
                this.$router.replace('/person/myFamily/addHouse/choosePark/park');
            },
            backToBuild() {
                this.$router.replace('/person/myFamily/addHouse/choosePark/build');
            },
            handleParkChoose(cityId, cityName, parkId, parkName) {
                this.city.id = cityId;
                this.city.name = cityName
                this.park.id = parkId;
                this.park.name = parkName;

                this.$emit('setParkId', parkId);
                this.$router.replace('/person/myFamily/addHouse/choosePark/build');
            },
            handleBuildChoose(id, name) {
                this.build.id = id;
                this.build.name = name;
                
                this.$router.replace('/person/myFamily/addHouse/choosePark/room');
            },
            handleRoomChoose(unitId, unitName, roomId, roomName, bool) {
                this.unit.id = unitId;
                this.unit.name = unitName;
                this.unit.bool = bool;
                this.room.id = roomId;
                this.room.name = roomName;

                const address = this.room.name;

                this.$emit('setRoomId', roomId);
                this.$emit('setAddress', address);

                // ....
                // ..跳转并传递参数
                this.$router.replace({
                    path: '/person/myFamily/addHouse/apply',
                    query: {
                        roomId: this.room.id
                    }
                });
                // ....
            },
            handleIFirstSeeSee() {
                this.$router.push('/');
            }
        }
    }
</script>