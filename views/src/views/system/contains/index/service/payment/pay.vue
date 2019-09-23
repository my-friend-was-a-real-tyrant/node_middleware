<template>
	<div v-title="'缴清欠费'">
		<div class="flex-vc">
			<div class="paymoney fsize20">{{amount}}元</div>
			<div class="paystatus mtop10 fsize15 gray">待支付</div>
		</div>
		<div class="flex-lr section fsize15">
			<div class="liggray">缴费说明</div>
			<div>物业费</div>
		</div>
		<div class="flex-lr section liggray mtop20 mbottom15 fsize15">
			<div class="liggray">收款方</div>
			<div>杭州中大银泰城</div>
		</div>
		<div class="hr" style="border:none;"></div>
		<div class="section fsize13 liggray mtop15 mbottom10">选择支付方式</div>
		<div class="hr-one"></div>
		<!--<div class="section flex-lr fsize15">
            <div class="flex-ll">
                <div class="icon32"></div>
                <div class="mleft15">一网通支付</div>
            </div>
            <div class="icon28"></div>
        </div>-->
		<!-- <div class="flex-lr fsize15 content" style="margin:0 4%;">
            <div class="flex-ll">
                <img class="icon32" :src="wxsrc"/>
                <div class="mleft15">微信支付</div>
            </div>
            <img class="icon28" :src='src' @click="bindChoose"/>
        </div> -->
		<ul class="pay-choose">
			<li class="pay-choose-item">
				<img src="../../../../img/cmb_pay_icon.png" />
				<div class="pay-choose-item-content">
					<span>招行一网通支付</span>
					<i class="pay-choose-item-content-i pay-choose-item-content-i-active"></i>
				</div>
			</li>
		</ul>
		<div class="hr-one"></div>
		<div class="bottom section">
			<button class="btnred confirmpay white" @click="confirmPay">确认支付</button>
		</div>
		<form :action="'https://netpay.cmbchina.com/netpayment/BaseHttp.dll?MB_EUserPay'" method="post" id="form">
			<input type="text" id="formData" name="jsonRequestData" style="display: none" />
		</form>
	</div>
</template>
<script lang="babel">
	import wx from 'weixin-js-sdk';
	export default {

		data() {
			return {
				amount: '',
				src: require('../img/checkpay.png'),
				checked: true,
				wxsrc: require('../img/weixinpay.png'),
			}
		},
		computed: {

		},
		methods: {
			//创建订单
			/*confirmPay(){

            },
            //微信支付
            wxpays(wxpaysdata){

            },
            //唤起微信支付
            pay(){
                if (typeof WeixinJSBridge == "undefined"){    
                    if( document.addEventListener ){    
                        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);    
                    }else if (document.attachEvent){    
                        document.attachEvent('WeixinJSBridgeReady', onBridgeReady);     
                        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);    
                    }    
                    }else{    
                    onBridgeReady(data,type);    
                }   
            },
            onBridgeReady(charge,type){ 
				var jsdd = JSON.parse(charge);
				console.log('jsdd:',jsdd);
			    WeixinJSBridge.invoke(    
			        'getBrandWCPayRequest', {    
			            "appId" : jsdd.appId,     //公众号名称，由商户传入         
			            "timeStamp":jsdd.timeStamp,         //时间戳，自1970年以来的秒数         
			            "nonceStr" : jsdd.nonceStr, //随机串         
			            "package" : jsdd.package,         
			            "signType" : 'MD5',         //微信签名方式:         
			            "paySign" : jsdd.paySign  //微信签名     
			        }, 
			        function(res){         
			            if(res.err_msg == "get_brand_wcpay_request:ok" ) {    
			                // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。     
			                
			                //location.href="http://xt.colorcun.com/PayMember/IndexQrcode/payresult?sellerid="+seller_id+"&order_id="+order_id+"&openid="+openid;
			                
			            }else if (res.err_msg == "get_brand_wcpay_request:cancel")  {  
			                //alert("支付过程中用户取消");  
			            }else{  
			               //支付失败  
			               //alert(res.err_msg);
			            }       
			        }    
			    );     
            }*/
			bindChoose: function () {
				/*if(this.checked=='true'){
				    this.checked=''
				    this.src = require('../img/uncheckpay.png')
				}else{
				    this.checked='true'
				    this.src = require('../img/checkpay.png')
				}*/
			},
			pay: function (response) {
				let _this = this;
				this.$http({
					url: '/api/mall/mall/payBillOrder',
					data: {
						id: _this.$route.query.id,
						type: 2
					},
					method: 'post'
				}).then(function (response) {
					if (response.data.code === '00000') {
						let _this = this
						alert('appId:' + response.data.appId)
						alert('paySign:' + response.data.paySign)
						wx.chooseWXPay({
							appId: response.data.appId,
							timestamp: Math.floor(response.data.timestamp / 1000),
							nonceStr: response.data.nonceStr, // 支付签名随机串，不长于 32 位
							package: 'prepay_id=' + response.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
							signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
							paySign: response.data.paySign, // 支付签名
							success: function (res) {
								// 支付成功后的回调函数
								alert('fail:' + fail)
								_this.$message('支付成功');
								_this.$router.replace('/payment');
							},
							fail: function () {
								alert('fail:' + fail)
							}
						});
					}
				});
			},
			confirmPay: function () {
				this.$http({
					url: '/api/mall/mall/payOrderByCmb',
					data: {
						id: this.$route.query.id,
						orderType: 2
					},
					method: 'post'
				}).then((response) => {
					// console.log(response)
					// if (response.data.code === '00000') {
					//     console.log(response)
					//     wx.config({
					//         debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					//         appId: response.data.appid, // 必填，公众号的唯一标识
					//         timestamp: response.data.timestamp, // 必填，生成签名的时间戳
					//         nonceStr: response.data.noncestr, // 必填，生成签名的随机串
					//         signature: response.data.signature,// 必填，签名，见附录1
					//         jsApiList: [
					//             'chooseWXPay'
					//         ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
					//     });
					//     this.pay(response)
					// }
					if (response.data.code === '00000') {
						const orderStr = response.data.orderStr;
						document.getElementById('formData').value = orderStr;
						document.getElementById('form').submit();
					}
				}).catch((response) => {
					console.log(response);
				});
			}
		},
		mounted: function () {
			this.amount = this.$route.query.amount
		}
	}
</script>
<style>
	/*水平方向左右分布*/
	.flex-lr {
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: row;
		-webkit-flex-direction: row;
	}
	.flex-ll {
		display: flex;
		display: -webkit-flex;
		justify-content: flex-start;
		align-items: center;
		flex-direction: row;
		-webkit-flex-direction: row;
	}
	.flex-rr {
		display: flex;
		display: -webkit-flex;
		justify-content: flex-end;
		align-items: center;
		flex-direction: row;
		-webkit-flex-direction: row;
	}
	/*垂直方向居中分布*/
	.flex-vc {
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		-webkit-flex-direction: column;
	}
	/*垂直方向居左分布*/
	.flex-vl {
		display: flex;
		display: -webkit-flex;
		justify-content: flex-start;
		align-items: left;
		flex-direction: column;
		-webkit-flex-direction: column;
	}
	/*水平方向居中分布*/
	.flex-cc {
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		flex-direction: row;
		-webkit-flex-direction: row;
	}
	/*基准线对齐*/
	.flex-bc {
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: baseline;
		flex-direction: row;
		-webkit-flex-direction: row;
	}
	/*流式布局*/
	.flex-auto {
		display: flex;
		display: -webkit-flex;
		justify-content: space-around;
		align-content: flex-start;
		flex-flow: wrap;
	}
	.black {
		color: #333;
	}
	.gray {
		color: #666;
	}
	.liggray {
		color: #999;
	}
	.white {
		color: #fff;
	}
	.red {
		color: #ff4c4c;
	}
	.fsize13 {
		font-size: 13px;
	}
	.fsize15 {
		font-size: 15px;
	}
	.fsize18 {
		font-size: 18px;
	}
	.fsize20 {
		font-size: 20px;
	}
	.section {
		width: 92%;
		padding-left: 4%;
		padding-right: 4%;
	}
	.t-align-c {
		text-align: center;
	}
	.title div {
		width: 50%;
		text-align: center;
		opacity: 0.5;
		height: 50px;
		line-height: 50px;
	}
	.money {
		height: 36px;
		line-height: 36px;
		background-color: #ffac33;
	}
	.hr {
		height: 10px;
		background-color: #f0f0f0;
		width: 100%;
		border-top: 1px solid #e0e0e0;
		border-bottom: 1px solid #e0e0e0;
	}
	.hr-one {
		height: 1px;
		background-color: #e0e0e0;
		width: 100%;
	}
	.icon {
		width: 15px;
		height: 15px;
		border-radius: 50%;
		border: 1px solid #333;
	}
	.icon28 {
		width: 28px;
		height: 28px;
	}
	.icon32 {
		width: 32px;
		height: 32px;
	}
	.mleft {
		margin-left: 4%;
	}
	.mleft10 {
		margin-left: 10px;
	}
	.mleft15 {
		margin-left: 15px;
	}
	.mtop10 {
		margin-top: 10px;
	}
	.mtop15 {
		margin-top: 15px;
	}
	.mtop20 {
		margin-top: 20px;
	}
	.mbottom10 {
		margin-bottom: 10px;
	}
	.mbottom15 {
		margin-bottom: 15px;
	}
	.mleft18 {
		margin-left: 10.67%;
	}
	.bottom {
		position: fixed;
		bottom: 0px;
		height: 58px;
		width: 100%;
		line-height: 58px;
		border-top: 1px solid #ccc;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.btnred {
		height: .67416268rem;
		background-color: #ff4c4c;
		width: 1.2569378rem;
		text-align: center;
		border-radius: 4px;
	}
	.paymoney {
		margin-top: 35px;
	}
	.paystatus {
		margin-bottom: 30px;
	}
	.confirmpay {
		width: 100%;
		position: relative;
	}
	.content {
		height: 55px;
	}
	.pay-choose {
		background-color: #fff;
	}
	.pay-choose-title {
		padding: 0.3rem;
		font-size: 0.26rem;
		color: #999;
	}
	.pay-choose-item {
		display: flex;
		justify-content: space-between;
	}
	.pay-choose-item img {
		flex-shrink: 0;
		width: 1.24rem;
		height: 1.1rem;
	}
	.pay-choose-item-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-grow: 1;
		height: 1.1rem;
		padding: 0.3rem 0.3rem 0.3rem 0;
		font-size: 0.3rem;
		color: #333;
	}
	.pay-choose-item-content-i {
		width: 0.56rem;
		height: 0.56rem;
		background-image: url(../../../../img/choose_false.png);
		background-size: 100% 100%;
	}
	.pay-choose-item-content-i-active {
		background-image: url(../../../../img/choose_true.png);
	}
</style>