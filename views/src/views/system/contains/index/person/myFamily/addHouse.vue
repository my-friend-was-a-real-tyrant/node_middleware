<template>
    <router-view
        :address="address"
        :hostName="hostName"
        :roomId="roomId"
        :parkId="parkId"
        @setHostName="setHostName"
        @setAddress="setAddress"
        @setRoomId="setRoomId"
        @setParkId="setParkId"
    ></router-view>
</template>
<script lang="babel">
    export default {
        data() {
            return {
                hostName: '',
                address: '',
                roomId: '',
                parkId: ''
            }
        },
        methods: {
            setHostName(hostName) {
                this.hostName = hostName;
            },
            setAddress(address) {
                this.address = address;
            },
            setRoomId(id) {
                this.roomId = id;
            },
            setParkId(id) {
                this.parkId = id;
            }
        }
    }
</script>