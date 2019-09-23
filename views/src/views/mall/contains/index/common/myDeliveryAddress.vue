<style lang="less" scoped>
    .myDeliveryAddress{
        &-wrapper{ display: flex; flex-direction: column; width: 100%; height: 100%; background-color: #f5f5f5;}
        &-list{ flex-grow: 1; padding: 0 .3rem; overflow: scroll;
            &-item{ margin-top: .3rem; border: 1px solid #dcdcdc; border-radius: .1rem; background-color: #fff; font-size: .3rem; color: #333;
                &-info{ padding: .3rem; border-bottom: 1px solid #dcdcdc; line-height: .4rem;
                    &-base{ display: flex; justify-content: space-between; margin-bottom: .1rem;}
                }
                &-operate{ display: flex; align-items: center; justify-content: space-between; padding: .3rem;
                    &-frequently{ display: flex; align-items: center;}
                    &-button{
                        button{ margin-left: .3rem;}
                    }
                }
            }
        }
        &-bottom{ flex-shrink: 0; width: 100%; border-radius: 0;}
    }
</style>
<template>
    <div class="myDeliveryAddress-wrapper" v-title="'选择收货地址'">
        <ul class="myDeliveryAddress-list">
            <li class="myDeliveryAddress-list-item" v-for="(item, index) in addressList" :key="item.id" @click="handleChooseAddress(item.id)">
                <div class="myDeliveryAddress-list-item-info">
                    <p class="myDeliveryAddress-list-item-info-base">
                        <span>{{ item.name }}</span>
                        <span>{{ item.cellphone }}</span>
                    </p>
                    <p class="myDeliveryAddress-list-item-info-add">
                        <span>{{ item.provinceName + item.cityName + item.districtName + item.address }}</span>
                    </p>
                </div>
                <div class="myDeliveryAddress-list-item-operate">
                    <div class="myDeliveryAddress-list-item-operate-frequently">
                        <zdCheckbox
                            :active="defaultAddressId === item.id"
                            @click.stop="handleSetFrequentlyAddress(item.id)"></zdCheckbox>
                        <span v-if="defaultAddressId === item.id">常用地址</span>
                        <span v-else>设为常用</span>
                    </div>
                    <div class="myDeliveryAddress-list-item-operate-button">
                        <zdButton
                            size="small"
                            type="primary"
                            :disabled="item.roomId ? false : true"
                            @click.stop="handleDelDeliveryAddress(item.id, index)"
                        >删除</zdButton>
                        <zdButton
                            size="small"
                            type="primary"
                            :disabled="item.roomId ? false : true"
                            @click.stop="handleEditDeliveryAddress(item.id)"
                        >编辑</zdButton>
                    </div>
                </div>
            </li>
        </ul>
        <zdButton class="myDeliveryAddress-bottom" @click="handleAddDeliveryAddress">新增收货地址</zdButton>
    </div>
</template>
<script lang="babel">
    import zdButton from 'publicComponents/button/button';
    import zdCheckbox from 'publicComponents/checkbox/checkbox';

    export default {
        components: {
            zdButton,
            zdCheckbox
        },
        data() {
            return {
                defaultAddressId: '',
                addressList: []
            }
        },
        methods: {
            handleSetFrequentlyAddress(addressId) {
                this.defaultAddressId = addressId;
                this.$http({
                    url: '/api/common/setFrequentlyAddress',
                    method: 'post',
                    data: {
                        addressId
                    }
                }).then((response) => {
                    // ..
                }).catch((response) => {
                    console.log(response);
                });
            },
            handleAddDeliveryAddress() {
                this.$router.push({
                    path: '/deliveryAddress/addDeliveryAddress',
                    query: {
                        merchandiseId: this.$route.query.merchandiseId,
                        groupId: this.$route.query.groupId,
                    }
                });
            },
            handleEditDeliveryAddress(addressId) {
                this.$router.push({
                    path: '/deliveryAddress/editDeliveryAddress',
                    query: {
                        merchandiseId: this.$route.query.merchandiseId,
                        groupId: this.$route.query.groupId,
                        addressId
                    }
                });
            },
            handleDelDeliveryAddress(addressId, index) {
                let r = confirm("确定删除该收货地址吗？");
                if (r == true) {
                    this.$http({
                        url: '/api/common/delDeliveryAddress',
                        method: 'post',
                        data: {
                            addressId
                        }
                    }).then((response) => {
                        if (response.data.code === '00000') {
                            this.$message('删除成功');
                            this.addressList.splice(index, 1);
                        }
                    }).catch((response) => {
                        console.log(response);
                    });
                }
            },
            handleChooseAddress(addressId) {
                if (Object.prototype.hasOwnProperty.call(this.$route.query, 'merchandiseId') === true) {
                    this.$router.push({
                        path: '/mall/createOrder',
                        query: {
                            id: this.$route.query.merchandiseId,
                            groupId: this.$route.query.groupId,
                            addressId
                        }
                    });
                }
            }
        },
        mounted() {
            this.$http({
                url: '/api/common/getMyDeliveryAddress'
            }).then((response) => {
                this.addressList = response.data.addressList;
                for (let i = 0; i < this.addressList.length; i ++) {
                    if (this.addressList[i].theDefault === true) {
                        this.defaultAddressId = this.addressList[i].id;
                        break;
                    }
                }
            }).catch((response) => {
                console.log(response);
            });
        }
    }
</script>