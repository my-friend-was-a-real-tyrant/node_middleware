<style lang="less" scoped>
    .pay{ width: 100%; height: 100%; background-color: #f5f5f5;
        &-info{ background-color: #fff; padding: 0 .3rem;
            &-price{ padding-top: .4rem; border-bottom: 1px solid #dcdcdc;
                p{ font-size: .3rem; color: #999; text-align: center}
                p&-number{ font-size: .6rem; color: #333; line-height: 1.4rem;}
            }
            &-merchandise{ font-size: .3rem; line-height: .82rem; color: #333;}
        }
        &-choose{ background-color: #fff;
            &-title{ padding: .3rem; font-size: .26rem; color: #999;}
            &-item{ display: flex; justify-content: space-between;
                img{ flex-shrink: 0; width: 1.24rem; height: 1.1rem;}
                &-content{ display: flex; justify-content: space-between; align-items: center; flex-grow: 1; height: 1.1rem; padding: .3rem .3rem .3rem 0; font-size: .3rem; color: #333;
                    &-i{ width: .56rem; height: .56rem; background-image: url(../../../img/choose_false.png); background-size: 100% 100%;
                        &-active{ background-image: url(../../../img/choose_true.png);}
                    }
                }
            }
        }
        &-button{ position: fixed; bottom: 0; left: 0; width: 100%; border-radius: 0;}
    }        
</style>
<template>
    <div class="pay">
        <div class="pay-info">
            <div class="pay-info-price">
                <p>在线支付</p>
                <p class="pay-info-price-number">¥{{ orderInfo.price }}</p>
            </div>
            <p class="pay-info-merchandise">{{ orderInfo.merchandiseName }}</p>
        </div>
        <p class="pay-choose-title">选择支付方式</p>
        <ul class="pay-choose">
            <!-- <li class="pay-choose-item">
                <img src="../../../img/pay_icon.png" />
                <div class="pay-choose-item-content">
                    <span>微信支付</span>
                    <i class="pay-choose-item-content-i pay-choose-item-content-i-active"></i>
                </div>
            </li> -->
            <li class="pay-choose-item">
                <img src="../../../img/cmb_pay_icon.png" />
                <div class="pay-choose-item-content">
                    <span>招行一网通支付</span>
                    <i class="pay-choose-item-content-i pay-choose-item-content-i-active"></i>
                </div>
            </li>
        </ul>
        <zdButton size="large" type="danger" class="pay-button" @click="handlePayOrder" v-if="orderInfo.status === 1">确认支付 ¥{{ orderInfo.price }}</zdButton>
        <form :action="'https://netpay.cmbchina.com/netpayment/BaseHttp.dll?MB_EUserPay'" method="post" id="form">
            <input type="text" id="formData" name="jsonRequestData" style="display: none" />
        </form>
    </div>
</template>
<script>
    import zdButton from 'publicComponents/button/button';
    // import wx from 'weixin-js-sdk';

    export default {
        components: {
            zdButton
        },
        data() {
            return {
                env: process.env.NODE_ENV,
                orderInfo: {
                    price: 0,
                    merchandiseName: '',
                    status: 1
                }
            }
        },
        methods: {
            handlePayOrder() {
                this.$http({
                    url: '/api/mall/mall/payOrderByCmb',
                    data: {
                        id: this.$route.query.id,
                        orderType:1
                    },
                    method: 'post'
                }).then((response) => {
                    if (response.data.code === '00000') {
                        const orderStr = response.data.orderStr;
                        document.getElementById('formData').value = orderStr;
                        document.getElementById('form').submit();
                    }
                }).catch((response) => {
                    console.log(response);
                });
                // const _this = this;
                // _this.$http({
                //     url: '/api/mall/mall/payOrder',
                //     data: {
                //         id: _this.$route.query.id,
                //         type: 2
                //     },
                //     method: 'post'
                // }).then(function(response) {
                //     if (response.data.code === '00000') {
                //         wx.chooseWXPay({
                //             appId: response.data.appId,
                //             timestamp: Math.floor(response.data.timestamp / 1000),
                //             nonceStr: response.data.nonceStr, // 支付签名随机串，不长于 32 位
                //             package: 'prepay_id=' + response.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                //             signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                //             paySign: response.data.paySign, // 支付签名
                //             success: function (res) {
                //                 // 支付成功后的回调函数
                //                 _this.$message('支付成功');
                //                 _this.$router.replace('/index/person/myOrder');
                //             }
                //         });
                //     }
                // });
            }
        },
        mounted() {
            this.$http({
                url: '/api/mall/mall/getOrderInfo',
                params: {
                    id: this.$route.query.id
                }
            }).then((response) => {
                this.orderInfo = response.data.orderInfo;
                if (this.orderInfo.status !== 1) {
                    this.$router.replace({
                        path: '/index/person/myOrder/orderInfo',
                        query: {
                            id: this.$route.query.id
                        }
                    });
                }
            }).catch((response) => {
                console.log(response);
            });

            // this.$http({
            //     url: '/api/wechat/getJsConfigOptions'
            // }).then((response) => {
            //     if (response.data.code === '00000') {
            //         wx.config({
            //             debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            //             appId: response.data.appid, // 必填，公众号的唯一标识
            //             timestamp: response.data.timestamp, // 必填，生成签名的时间戳
            //             nonceStr: response.data.noncestr, // 必填，生成签名的随机串
            //             signature: response.data.signature,// 必填，签名，见附录1
            //             jsApiList: [
            //                 'chooseWXPay'
            //             ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            //         });
            //     }
            // }).catch((response) => {
            //     console.log(response);
            // });
        }
    }
</script>
