<style lang="less" scoped>
    .changeHouse{
        &-wrapper{ width: 100%; height: 100%; background-color: #f5f5f5;}
        &-list{ width: 100%; background-color: #fff;
            &-item{ display: flex; align-items: center; justify-content: space-between; width: 100%; height: .96rem; padding: 0 .3rem; border-bottom: 1px solid #dcdcdc; font-size: .26rem; color: #333;
                &-check{ width: .35rem; height: .35rem; background-image: url(../../../../img/changeHouse_check.png); background-size: 100% 100%;}
            }
        }
    }
</style>
<template>
    <div class="changeHouse-wrapper">
        <ul class="changeHouse-list">
            <li class="changeHouse-list-item"
                v-for="room in roomList"
                :key="room.roomId"
                @click="handleChooseRoom(room.roomId, room.roomName)">
                <span>{{ room.roomName }}</span>
                <i class="changeHouse-list-item-check"
                    v-if="defaultRoomId === room.roomId"
                ></i>
            </li>
        </ul>
    </div>
</template>
<script lang="babel">
    export default {
        data() {
            return {
                defaultRoomId: this.$store.state.info.defaultAddressId,
                roomList: [
                    {
                        roomId: '',
                        roomName: ''
                    }
                ]
            }
        },
        computed: {
            isVisitor() {
                return this.$store.state.isVisitor;
            }
        },
        methods: {
            handleChooseRoom(roomId, roomName) {
                this.defaultRoomId = roomId;
                this.$http({
                    url: '/api/system/personalCenter/setDefaultRoom',
                    method: 'post',
                    data: {
                        roomId
                    }
                }).then((response) => {
                    if (response.data.code === '00000') {
                        // 改变store中的info
                        this.$store.commit('defaultAddressChange', {
                            identity: response.data.info.identity,
                            defaultAddressId: roomId,
                            defaultAddressName: roomName,
                            isAgent: response.data.info.theResponsible
                        });
                        this.$message('切换成功');
                        // 跳转我的家庭
                        if (this.$route.params.fromPage === 'myFamily') {
                            this.$router.replace('/person/myFamily');
                        } else {
                            this.$router.replace('/index');
                        }
                    }
                }).catch((response) => {
                    console.log(response);
                });
            }
        },
        mounted() {
            if (this.isVisitor === true) {
                this.$router.replace('/index/visitorPerson');
            } else {
                this.$http({
                    url: '/api/system/personalCenter/getMyRoomList'
                }).then((response) => {
                    if (response.data.code === '00000') {
                        this.roomList = response.data.roomList;
                    }
                }).catch((response) => {
                    console.log(response);
                });
            }
            console.log(123);
            console.log(this.$route);
        }
    }
</script>