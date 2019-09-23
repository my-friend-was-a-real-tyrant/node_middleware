<template>
    <div class="collage">
        <div class="collage-title">{{ list.length > 0 ? "加入已有拼团或开启新的拼团" : "暂无拼团" }}</div>
        <div class="collage-list">
            <div class="collage-list-item" v-for="(item, index) in list" :key="index">
                <div class="left">{{ item.name }}</div>
                <div class="right">
                    <div class="p-box">
                        <p>成团还差{{ item.remainingQuantity }}人</p>
                        <p>({{ item.time }})</p>
                    </div>
                    <button @click="Join(item)">加入</button>
                </div>
            </div>
        </div>
        <div class="collage-button" @click="OpenNew">开启新的拼团</div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                list: [],
                deliveryAddressList: [],
                orderData: {
                    deliveryAddress: {
                        id: '',
                        name: '',
                        cellphone: '',
                        provinceName: '',
                        cityName: '',
                        districtName: '',
                        address: ''
                    }
                }
            }
        },
        computed: {
            
        },
        mounted () {
            let query = this.$route.query;
            this.Get(query.id);
            this.$http({
                url: '/api/common/getMyDeliveryAddress'
            }).then(response_01 => {
                if (response_01.data.code == "00000") {
                    this.deliveryAddressList = response_01.data.addressList;
                    if (this.deliveryAddressList.length > 0) {
                        if (Object.prototype.hasOwnProperty.call(this.$route.query, 'addressId')) {
                            for (let i = 0; i < this.deliveryAddressList.length; i ++) {
                                if (this.deliveryAddressList[i].id == this.$route.query.addressId) {
                                    this.orderData.deliveryAddress = this.deliveryAddressList[i];
                                    break;
                                }
                            }
                        } else {
                            for (let j = 0; j < this.deliveryAddressList.length; j ++) {
                                if (Object.prototype.hasOwnProperty.call(this.deliveryAddressList[j], 'roomId' && this.defaultAddressId === this.deliveryAddressList[j].roomId)) {
                                    this.orderData.deliveryAddress = this.deliveryAddressList[j];
                                    break;
                                }
                                if (j === this.deliveryAddressList.length - 1) {
                                    for (let i = 0; i < this.deliveryAddressList.length; i ++) {
                                        if (this.deliveryAddressList[i].theDefault === true) {
                                            this.orderData.deliveryAddress = this.deliveryAddressList[i];
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }).catch(error => {});
        },
        methods: {
            OpenNew() {
                this.$router.push({
                    path: '/mall/createOrder',
                    query: {
                        type: "dm",
                        from: "pt"
                    }
                });
            },
            Join(params) {
                this.$router.push({
                    path: '/mall/createOrder',
                    query: {
                        type: "dm",
                        from: "pt",
                        groupId: params.groupId
                    }
                });
            },
            Get(params) {
                this.$http({
                    url: "/api/mall/mall/getTogetherTable",
                    method: 'get',
                    params: {
                        id: params
                    }
                }).then(res => {
                    if (res.data.code == '00000') {
                        res.data.data.forEach(item => {
                            item["time"] = this.formatDate(item.endDatetime);
                        });
                        this.list = res.data.data;
                    }
                }).catch(error => {});
            },
            formatDate(now) {
                let time = new Date(now);
                let y = time.getFullYear();     // 年
                let m = time.getMonth() + 1 > 10 ? time.getMonth() + 1 : '0' + (time.getMonth() + 1);       // 月
                let d = time.getDate() > 10 ? time.getDate() + 1 : '0' + time.getDate();                    // 日
                let h = time.getHours() > 10 ? time.getHours() + 1 : '0' + time.getHours();                 // 时
                let mm = time.getMinutes() > 10 ? time.getMinutes() + 1 : '0' + time.getMinutes();          // 分
                let s = time.getSeconds() > 10 ? time.getSeconds() + 1 : '0' + time.getSeconds();           // 秒
            　　return m + "-" + d + " " + h + ":" + mm + ":" + s;
            }
        }
    }
</script>
<style lang="less" scoped>
    .collage{
        width: 100%;
        height: 100%;
        position: relative;
        &-title{
            height: .86399126rem;
            line-height: .86399126rem;
            font-size: .24959748rem;
            text-align: center;
            color: #999;
            border-bottom: 1px solid #e8e8e8;
        }
        &-list{
            padding: 0 .19199806rem;
            &-item{
                display: flex;
                align-items: center;
                height: .80639185rem;
                border-bottom: 1px solid #e8e8e8;
                .left{
                    width: 3.51995632rem;
                    font-size: .24959748rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .right {
                    width: 3.19997573rem;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    button{
                        width: .76799223rem;
                        height: .43199563rem;
                        background-color: rgba(255, 0, 0, 0.74);
                        border-radius: 3px;
                        border: 0;
                        outline: none;
                        color: white;
                        font-size: .23039767rem;
                    }
                    .p-box{
                        p{
                            font-size: .23039767rem;
                            text-align: center;
                            padding-right: 4px;
                        }
                    }
                }
            }
        }
        &-button{
            position: fixed;
            bottom: 0;
            width: 100%;
            height: .86399126rem;
            text-align: center;
            line-height: .86399126rem;
            font-size: .28799709rem;
            background-color: rgba(255, 0, 0, 0.74);
            color: white;
        }
    }
</style>
