<style lang="less" scoped>
    .choosePark{
        &-wrapper{ height: 100%;}
    }
</style>
<template>
    <div class="choosePark-wrapper" v-title="'选择园区'">
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
    import hostnameObj from 'publicSource/hostname';
    const hostname = hostnameObj.hostname;

    export default {
        props: ['isUser'],
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
                this.$router.push('/choosePark/park');
            },
            backToBuild() {
                this.$router.push('/choosePark/build');
            },
            handleParkChoose(cityId, cityName, parkId, parkName) {
                this.city.id = cityId;
                this.city.name = cityName
                this.park.id = parkId;
                this.park.name = parkName;
                this.$emit('setParkId', parkId);

                this.$router.push('/choosePark/build');
            },
            handleBuildChoose(id, name) {
                this.build.id = id;
                this.build.name = name;
                
                this.$router.push('/choosePark/room');
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
                this.$router.push({
                    path: '/apply',
                    query: {
                        roomId: this.room.id
                    }
                });
                // ....
            },
            handleIFirstSeeSee() {
                window.location.href = hostname + '/system/';
            }
        },
        created() {
            if (this.isUser === false) {
                this.$router.push('/index');
            }
        }
    }
</script>