<style lang="less">
    @import '../../publicSource/reset.less';
    @import '../../publicSource/mobileReset.less';
</style>
<template>
    <router-view
        :address="address"
        :hostName="hostName"
        :isUser="isUser"
        :parkId="parkId"
        :roomId="roomId"
        @beingUser="beingUser"
        @setHostName="setHostName"
        @setAddress="setAddress"
        @setParkId="setParkId"
        @setRoomId="setRoomId"
    ></router-view>
</template>
<script lang="babel">
    export default {
        data() {
            return {
                isUser: false,
                hostName: '',
                address: '',
                parkId: '',
                roomId: ''
            }
        },
        methods: {
            beingUser() {
                this.isUser = true;
            },
            setHostName(hostName) {
                this.hostName = hostName;
            },
            setAddress(address) {
                this.address = address;
            },
            setParkId(id) {
                this.parkId = id;
            },
            setRoomId(id) {
                this.roomId = id;
            }
        }
    }
</script>