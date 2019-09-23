<style lang="less" scoped>
	.order{ width: 100%; height: 100%; font-size: 0; background-color: #f5f5f5;
		&-address{ display: flex; justify-content: space-between; align-items: center; padding: .3rem; background-color: #fff;
			&-info{ display: flex; flex-direction: column; flex-grow: 1; font-size: .3rem; color: #333;
				&-top{ display: flex; justify-content: space-between; margin-bottom: .1rem;}
			}
			&-icon{ flex-shrink: 0; display: inline-block; width: .13rem; height: .24rem; background-image: url(../../../../../publicSource/img/push_icon.png); background-size: 100% 100%; background-repeat: no-repeat;}
			&-line{ width: 100%; margin-bottom: .3rem;}
		}
		&-info{ padding-left: .3rem; border-top: 1px solid #dcdcdc; border-bottom: 1px solid #dcdcdc; background-color: #fff;
			&-item{ display: flex; padding: .3rem .3rem .3rem 0; border-bottom: 1px solid #dcdcdc;
				&:last-child{ justify-content: flex-end; border-bottom: 0 none;}
				&-title{ font-size: .26rem; color: #333; padding-right: 10px;}
			}
			&-merchandise{
				&-img{ width: 1.4rem; height: 1.4rem; margin-right: .3rem; border: 1px solid #dcdcdc;}
				&-info{ display: flex; flex-direction: column; justify-content: space-between;width: 4.83996117rem;
					&-name{ height: .36rem; font-size: .3rem; color: #333;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
					&-content{ flex-grow: 1; font-size: .22rem; color: #999;padding-top: 5px;}
				}
			}
			&-count{ justify-content: space-between;
				button, input{ width: .62rem; height: .48rem; margin: 0 1px; border: 0 none; border-radius: 0; outline: 0 none; background-color: #efefef; color: #333; font-weight: 800; text-align: center;
					// &:last-child{ border-right: 1px solid #666;}
				}
			}
			&-coupon{ justify-content: space-between;
				.order-info-item-content{ color: #ff4c4c;}
				span{ font-size: .26rem;}
			}
			&-delivery{ justify-content: space-between;
				.order-info-item-content{ color: #999;}
				span{ font-size: .26rem;}
			}
		}
		&-price{ font-size: 0; color: #ff4c4c;
			 > span{ font-size: .36rem;}
			& > &-s{ font-size: .26rem;}
		}
		&-bottom{ position: fixed; bottom: 0; left: 0; display: flex; justify-content: flex-end; width: 100%; height: .96rem; border-top: 1px solid #dcdcdc; background-color: #fff; line-height: .96rem;
			button{ width: 1.9rem; height: 100%; border: 0 none; background-color: #ff4c4c; color: #fff; font-size: .3rem;}
		}
		&-coupon{ position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: #f5f5f5; overflow: scroll; padding-bottom: 50px;
			&-title{ padding-top: .3rem; color: #999; font-size: .26rem; text-align: center;}
			&-list{ padding: .3rem;
				&-item{ position: relative; width: 6.6rem; height: 3.3rem; margin-bottom: .3rem; border-radius: .08rem; background-color: #fff; overflow: hidden;
					&-top{ position: relative; height: 1.73rem; padding: .3rem;
						&-merchant{ float: left; font-size: .36rem; color: #fff;}
						&-right{ color: #fff; text-align: right;
							&-price{ font-size: .6rem;}
							&-description{ font-size: .24rem;}
						}
						&-wave{ float: left; width: .32rem; height: .32rem; margin-left: -.04rem; border-radius: 50%; background-color: #fff;
							&-wrapper{ position: absolute; bottom: -.08rem; left: 0; width: 110%; height: .15rem;}
						}
					}
					&-expire{ margin-top: .7rem; margin-left: .3rem; font-size: .22rem;}
					&-button{ position: absolute; bottom: .2rem; right: .8rem; width: 1.14rem; height: 1.14rem; border: .02rem solid #fff; border-radius: 50%; font-size: .24rem; line-height: 1.14rem; text-align: center; transform: rotate(-15deg);}
				}
				&-mall &-item-top, &-mall &-item-rest, &-mall &-item-top-wave:nth-child(odd){ background-color: #f7c463;}
				&-mall, &-mall &-item-button{ color: #f7c463;}
				&-mall &-item-button{ border-color: #f7c463;}
				&-merchant &-item-top, &-merchant &-item-rest, &-merchant &-item-top-wave:nth-child(odd){ background-color: #00a762;}
				&-merchant, &-merchant &-item-button{ color: #00a762;}
				&-merchant &-item-button{ border-color: #00a762;}
				&-pay &-item-top, &-pay &-item-rest, &-pay &-item-top-wave:nth-child(odd){ background-color: #f17b77;}
				&-pay, &-pay &-item-button{ color: #f17b77;}
				&-pay &-item-button{ border-color: #f17b77;}

				&-item-disabled &-item-top, &-item-disabled &-item-rest, &-item-disabled &-item-top-wave:nth-child(odd){ background-color: #aaa;}
				&-item-disabled, &-item-disabled &-item-button{ color: #aaa;}
				&-item-disabled &-item-button{ border-color: #aaa;}

				& &-item-top-wave:nth-child(odd){ margin-top: -.15rem;}
			}
			&-bottom{ position: fixed; bottom: 0; left: 0; width: 100%; border-radius: 0;}
		}
		.coupon-box-ul{
			&-li {
				display: flex;
				margin: .14423077rem .28846154rem;
				width: 6.63461538rem;
				height: 2.11538462rem;
				background-image: url("../../../../system/contains/index/img/mycoupon.png");
				background-repeat: no-repeat;
				background-size: 100% 100%;
				&:nth-child(2) {
					margin-top: 0;
				}
				.left {
					width: 4.75rem;
					padding-left: .19230769rem;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					&-top {
						font-size: .28846154rem;
						color: #333;
					}
					&-bottom {
						margin-top: .09615385rem;
						&-top {
							display: flex;
							align-items: baseline;
							.price{
								font-size: .46153846rem;
								color: #ff6666;
								font-weight: 500;
								margin-right: 5px;
							}
							.desc {
								font-size: .25rem;
								background-color: #ffabab;
								color: white;
								padding: 0 .09615385rem;
								font-size: .23076923rem;
								border-radius: 2px;
							}
						}
						&-bottom {
							margin-top: 5px;
							font-size: .23076923rem;
						}
					}
				}
				.right {
					width: 1.875rem;
					padding-top: .49230769rem;
					&-top {
						text-align: center;
						font-size: .38461538rem;
						color: white;
						.img-box{
							width: 1.15384615rem;
							height: 1.15384615rem;
							margin-left: .36rem;
							img{
								width: 100%;
								height: 100%;
							}
						}
					}
					&-bottom {
						font-size: .23076923rem;
						text-align: center;
						color: white;
					}
				}
			}
			.alreadyUsedList{
				background-image: url("../../../../system/contains/index/img/coupon.png");
			}
		}
	}
</style>
<template>
	<div class="order">
		<div class="order-address" @click="deliveryAddressList.length > 0 ? handleChooseAddress() : handleAddAddress()">
			<div class="order-address-info" v-if="deliveryAddressList.length > 0">
				<div class="order-address-info-top">
					<p class="order-address-info-top-name">
						<span>收件人：{{ orderData.deliveryAddress.name }}</span>
					</p>
					<p class="order-address-info-top-cellphone">
						<span>{{ orderData.deliveryAddress.cellphone }}</span>
					</p>
				</div>
				<p class="order-address-info-bottom">
					<span>收货地址：{{ orderData.deliveryAddress.provinceName + orderData.deliveryAddress.cityName + orderData.deliveryAddress.districtName + orderData.deliveryAddress.address }}</span>
				</p>
			</div>
			<div class="order-address-info" v-else>
				<div class="order-address-info-top">
					<p class="order-address-info-top-name">
						<span>点击添加收货地址</span>
					</p>
				</div>
			</div>
			<i class="order-address-icon"></i>
		</div>
		<img class="order-address-line" src="../../../img/create_order.png" />
		<div class="order-info">
			<div class="order-info-merchandise order-info-item">
				<img class="order-info-merchandise-img" v-if="this.$route.query.type == 'dm'" :src="orderData.merchandise.img" />
				<img class="order-info-merchandise-img" v-else :src="orderData.merchandise.img" />
				<div class="order-info-merchandise-info">
					<p class="order-info-merchandise-info-name">
						<span>{{ orderData.merchandise.name }}</span>
					</p>
					<p class="order-info-merchandise-info-content">
						<span v-if="this.$route.query.type === 'dm'">净含量：{{ orderData.merchandise.content }}</span>
						<span v-else>净含量：{{ orderData.merchandise.content }}</span>
					</p>
					<p class="order-price">
						<span class="order-price-s">¥</span>
						<span v-if="this.$route.query.type === 'dm' && !this.$route.query.from && !orderData.merchandise.singlePrice">{{ orderData.merchandise.specialPrice }}</span>
						<span v-else-if="this.$route.query.type === 'dm' && !this.$route.query.from && orderData.merchandise.singlePrice">{{ orderData.merchandise.singlePrice }}</span>
						<span v-else-if="this.$route.query.from === 'pt'">{{ orderData.merchandise.spellPrice }}</span>
						<span v-else>{{ orderData.merchandise.price.integer +  '.' + orderData.merchandise.price.decimal}}</span>
					</p>
				</div>
			</div>
			<div class="order-info-item order-info-count">
				<p class="order-info-item-title">
					<span>购买数量：</span>
				</p>
				<div class="order-info-item-content" v-if="this.$route.query.type == 'dm'">
					<button @click="clickReduce()">-</button>
					<input type="number" v-model="orderData.merchandise.count"
						@blur="orderData.merchandise.count < 1
							? orderData.merchandise.count = 1
							: (orderData.merchandise.count > orderData.merchandise.maxQuantity
								? orderData.merchandise.count = orderData.merchandise.maxQuantity
								: orderData.merchandise.count = 1)">
					<span v-show="isShow" style="color: white;">.</span>
					<button @click="clickAdd()">+</button>
				</div>
				<div class="order-info-item-content" v-else>
					<button @click="orderData.merchandise.count > 1
						? orderData.merchandise.count --
						: ''">-</button>
					<input type="number" v-model="orderData.merchandise.count"
						@blur="orderData.merchandise.count < 1
							? orderData.merchandise.count = 1
							: (orderData.merchandise.count > orderData.merchandise.maxCount
								? orderData.merchandise.count = orderData.merchandise.maxCount
								: orderData.merchandise.count = 1)">
					<button @click="orderData.merchandise.count < orderData.merchandise.maxCount
						? orderData.merchandise.count ++
						: ''">+</button>
				</div>
			</div>
			<div class="order-info-item order-info-coupon">
				<p class="order-info-item-title">
					<span>优惠券：</span>
				</p>
				<p class="order-info-item-content" @click="handleCouponShow">
					<span v-if="couponPrice === false">{{ couponList.availableList.length }}张可用</span>
					<span v-else>已减{{ couponPrice }}元</span>
					<i class="order-address-icon"></i>
				</p>
			</div>
			<div class="order-info-item order-info-delivery">
				<p class="order-info-item-title">
					<span>运费：</span>
				</p>
				<p class="order-info-item-content">
					<span>¥0.00</span>
				</p>
			</div>
			<div class="order-info-item">
				<p class="order-info-item-title">
					<span>共{{ orderData.merchandise.count }}件商品 小计：</span>
					<em class="order-price" v-if="this.$route.query.type == 'dm'">
						<span class="order-price-s">¥</span>
						<span>{{ total }}</span>
					</em>
					<em class="order-price" v-else>
						<span class="order-price-s">¥</span>
						<span>{{ allPrice.integer }}</span>
						<span class="order-price-s">{{ '.' + allPrice.decimal }}</span>
					</em>
				</p>
			</div>
		</div>
		<div class="order-bottom">
			<p class="order-info-item-title">
				<span>合计：</span>
				<em class="order-price" v-if="this.$route.query.type == 'dm'">
					<span class="order-price-s">¥</span>
					<span>{{ total }}</span>
				</em>
				<em class="order-price" v-else>
					<span class="order-price-s">¥</span>
					<span>{{ allPrice.integer }}</span>
					<span class="order-price-s">.{{ allPrice.decimal }}</span>
				</em>
			</p>
			<button @click="handleCreateOrder">提交订单</button>
		</div>
		<div class="order-coupon coupon-box" v-show="couponShow">
			<p class="order-coupon-title">
				<span>——可使用优惠券（{{ couponList.availableList.length }}张）——</span>
			</p>
			<ul class="coupon-box-ul">
				<li class="coupon-box-ul-li" v-for="coupon in couponList.availableList" :key="coupon.id" @click="handleChooseCoupon(coupon.id)">
					<div class="left">
						<div class="left-top">{{ coupon.merchantName }}</div>
						<div class="left-bottom">
							<div class="left-bottom-top">
								<p class="desc">立即使用</p>
							</div>
							<div class="left-bottom-bottom">有效期至：{{ coupon.expireDatetime }}</div>
						</div>
					</div>
					<div class="right">
						<div class="right-top">{{ coupon.preferentialType === 1 ? coupon.face.toFixed(2) : coupon.face.toFixed(2) }}</div>
						<div class="right-bottom">{{ coupon.couponDescription }}</div>
					</div>
				</li>
			</ul>
			<p class="order-coupon-title">
				<span>——不可用优惠券（{{ couponList.unavailableList.length }}张）——</span>
			</p>
			<ul class="coupon-box-ul">
				<li class="coupon-box-ul-li" v-for="coupon in couponList.unavailableList" :key="coupon.id">
					<div class="left">
						<div class="left-top">{{ coupon.merchantName }}</div>
						<div class="left-bottom">
							<div class="left-bottom-top">
								<p class="desc">立即使用</p>
							</div>
							<div class="left-bottom-bottom">有效期至：{{ coupon.expireDatetime }}</div>
						</div>
					</div>
					<div class="right">
						<div class="right-top">{{ coupon.preferentialType === 1 ? coupon.face.toFixed(2) : coupon.face.toFixed(2) }}</div>
						<div class="right-bottom">{{ coupon.couponDescription }}</div>
					</div>
				</li>
			</ul>
			<zdButton size="large" class="order-coupon-bottom" @click="handleChooseCoupon('')">不使用优惠券</zdButton>
		</div>
	</div>
</template>
<script lang="babel">
	import zdButton from 'publicComponents/button/button';
	import priceTransform from 'publicSource/money';
	import domain from "../../../../../publicSource/domain";
	export default {
		components: {
			zdButton
		},
		data() {
			return {
				isShow: false,
				total: 0,
				deliveryAddressList: [],
				couponList: {
					availableList: [],
					unavailableList: []
				},
				couponShow: false,
				orderData: {
					deliveryAddress: {
						id: '',
						name: '',
						cellphone: '',
						provinceName: '',
						cityName: '',
						districtName: '',
						address: ''
					},
					merchandise: {
						name: '',
						content: '',
						price: {
							integer: 0,
							decimal: 0,
							price: 0
						},
						img: '',
						count: 1,
						maxCount: 999,
						coupon: ''
					}
				},
				Couponid: "",
				couponPrice1: false
			}
		},
		computed: {
			defaultAddressId() {
				return this.$store.state.defaultAddressId;
			},
			noCouponPrice() {
				if (this.$route.query.type === "dm" || this.$route.query.type === "pt") {
					return (this.orderData.merchandise.price * 100) * this.orderData.merchandise.count / 100;
				} else {
					return (this.orderData.merchandise.price.price * 100) * this.orderData.merchandise.count / 100;
				}
			},
			couponPrice() {
				if (this.Couponid != "") {
					return this.accountPrice();
				} else {
					return false;
				}
				// if (typeof this.orderData.merchandise.coupon === 'number') {
				//     this.accountPrice();
				// } else {
				//     return false;
				// }
			},
			// allPrice() {
			//     if (this.$route.query.type === 'dm') {
			//         return (this.orderData.merchandise.count * this.orderData.merchandise.specialPrice).toFixed(2) - this.couponPrice;
			//     } else {
			//         const price = (typeof this.couponPrice === 'number'
			//             ? (this.noCouponPrice * 100 - this.couponPrice * 100) / 100
			//             : this.noCouponPrice);
			//         return priceTransform(price);
			//     }
			// }
		},
		watch: {
			'noCouponPrice'() {
				this.getCouponList();
			},
			couponPrice(newv, oldv) {
				if (newv != oldv) {
					this.computedPrice();
				}
			}
		},
		methods: {
			clickAdd() {
				let _that = this;
				_that.orderData.merchandise.count < _that.orderData.merchandise.maxQuantity ? _that.orderData.merchandise.count++ : '';
				this.computedPrice();
				localStorage.removeItem("zd_info");
				localStorage.setItem("zd_info", JSON.stringify(_that.orderData.merchandise));
				_that.isShow = true;
				setTimeout(() => {
					_that.isShow = false;
				}, 50);
			},
			clickReduce() {
				let _that = this;
				_that.orderData.merchandise.count > 1 ? _that.orderData.merchandise.count-- : '';
				this.computedPrice();
				localStorage.removeItem("zd_info");
				localStorage.setItem("zd_info", JSON.stringify(_that.orderData.merchandise));
				_that.isShow = true;
				setTimeout(() => {
					_that.isShow = false;
				}, 50);
			},
			computedPrice() {
				if (this.$route.query.from === 'pt') {
					this.total = (this.orderData.merchandise.count * this.orderData.merchandise.spellPrice).toFixed(2) - this.couponPrice;
				} else {
					if (this.orderData.merchandise.singlePrice && parseFloat(this.orderData.merchandise.singlePrice) > 0) {
						this.total = (this.orderData.merchandise.count * this.orderData.merchandise.singlePrice).toFixed(2) - this.couponPrice;
					} else {
						this.total = (this.orderData.merchandise.count * this.orderData.merchandise.specialPrice).toFixed(2) - this.couponPrice;
					}
				}
			},
			handleChooseAddress() {
				this.$router.push({
					path: '/deliveryAddress/deliveryAddressList',
					query: {
						merchandiseId: this.$route.query.id,
						groupId: this.$route.query.groupId
					}
				});
			},
			handleAddAddress() {
				this.$router.push({
					path: '/deliveryAddress/addDeliveryAddress',
					query: {
						merchandiseId: this.$route.query.id,
						groupId: this.$route.query.groupId
					}
				});
			},
			handleCouponShow() {
				if (this.couponList.availableList.length > 0) {
					if (this.orderData.merchandise.count != 1) {
						let price = this.total + this.couponPrice;
						this.getCouponList(price);
					}
					this.couponShow = true;
				}
			},
			getCouponList(params) {
				let info = JSON.parse(localStorage.getItem("zd_info"));
				let query = this.$route.query;
				if (query.type) {
					this.$http({
						url: '/api/mall/mall/getCouponList',
						params: {
							price: params ? params : info.singlePrice ? (info.singlePrice * info.count) : (info.specialPrice * info.count),
							sortId: query.sortId,
							merchandiseId: info.id
						}
					}).then(res => {
						if (res.data.code === '00000') {
							this.couponList.availableList = res.data.availableList;
							this.couponList.unavailableList = res.data.unavailableList;
						}
					}).catch((response) => {});
				} else {
					this.$http({
						url: '/api/mall/mall/getCouponList',
						params: {
							price: this.noCouponPrice,
							sortId: query.sortId,
							merchandiseId: info.id
						}
					}).then(res => {
						if (res.data.code === '00000') {
							this.couponList.availableList = res.data.availableList;
							this.couponList.unavailableList = res.data.unavailableList;
						}
					}).catch((response) => {});
				}
			},
			handleChooseCoupon(id) {
				this.orderData.merchandise.coupon = id;
				this.Couponid = id;
				this.couponShow = false;
			},
			accountPrice() {
				if (typeof this.orderData.merchandise.coupon === 'number') {
					for (let i = 0; i < this.couponList.availableList.length; i ++) {
						if (this.orderData.merchandise.coupon === this.couponList.availableList[i].id) {
							if (this.couponList.availableList[i].preferentialType === 3) {
								// 满减
								return this.couponList.availableList[i].face;
							} else {
								// 打折
								return this.couponList.availableList[i].face;
								// let v = (this.noCouponPrice * 10000 - (this.noCouponPrice * 100) * (this.couponList.availableList[i].face * 100)) / 10000;
								// if (this.couponList.availableList[i].maxValue !== 0 && v > this.couponList.availableList[i].maxValue) {
								//     return maxValue;
								// } else {
								//     return v;
								// }
							}
						}
					}
				} else {
					return false;
				}
			},
			handleCreateOrder() {
				let query = this.$route.query;
				let data = {
					addressId: this.orderData.deliveryAddress.id,
					merchandiseId: this.orderData.merchandise.id,
					quantity: this.orderData.merchandise.count,
					couponId: this.couponPrice === false ? '' : this.orderData.merchandise.coupon,
					specs: JSON.stringify(this.orderData.merchandise.goodsGroup),
					// couponId: 0
				}
				if (query.from === "pt") {
					if (query.groupId) {
						data["groupId"] = query.groupId;
					} else {
						data["groupId"] = 0;
					}
				}
				if (query.type === "dm") {
					if (query.from === "pt") {
						this.$http({
							url: "/api/mall/person/generateTogetherForm",
							method: "post",
							data: data
						}).then(res => {
							if (res.data.code === '00000') {
								// 将返回的订单编号添加进参数
								this.$message('订单创建成功，请稍后...');
								setTimeout(() => {
									this.$router.push({
										path: '/mall/payOrder',
										query: {
											id: res.data.data.id
										}
									});
								}, 1000);
							}
						}).catch(error => {});
					} else {
						if (this.orderData.deliveryAddress.id) {
							this.$http({
								url: "/api/mall/person/generateSingleForm",
								method: 'post',
								data: data
							}).then(response => {
								if (response.data.code === '00000') {
									// 将返回的订单编号添加进参数
									this.$message('订单创建成功，请稍后...');
									setTimeout(() => {
										this.$router.push({
											path: '/mall/payOrder',
											query: {
												id: response.data.data.id
											}
										});
									}, 1000);
								}
							}).catch(error => {});
						} else {}
					}
				} else {
					data.couponId = this.couponPrice === false ? '' : this.orderData.merchandise.coupon;
					data["id"] = this.$route.query.id;
					data["groupId"] = this.$route.query.groupId;
					if (this.orderData.deliveryAddress.id) {
						this.$http({
							url: '/api/mall/mall/createOrder',
							method: 'post',
							data: data
						}).then((response) => {
							if (response.data.code === '00000') {
								// 将返回的订单编号添加进参数
								this.$message('订单创建成功，请稍后...');
								setTimeout(() => {
									this.$router.push({
										path: '/mall/payOrder',
										query: {
											id: response.data.id
										}
									});
								}, 1000);
							}
						}).catch((response) => {});
					} else {}
				}
			}
		},
		mounted() {
			let query = this.$route.query;
			if (query.type) {
				let info = JSON.parse(localStorage.getItem("zd_info"));
				this.orderData.merchandise = info;
				// this.orderData.merchandise["count"] = 1;
				this.orderData.merchandise["img"] = info.pictures[0];
				this.computedPrice();
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
			} else {
				this.$http.all([this.$http({
					url: '/api/common/getMyDeliveryAddress'
				}), this.$http({
					url: '/api/mall/mall/getMerchandiseInfo',
					params: {
						id: this.$route.query.id,
						groupId: this.$route.query.groupId
					}
				})]).then(this.$http.spread((response_01, response_02) => {
					if (response_01.data.code === '00000') {
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
					if (response_02.data.code === '00000') {
						this.orderData.merchandise.name = response_02.data.info.name;
						this.orderData.merchandise.content = response_02.data.info.content;
						this.orderData.merchandise.price = response_02.data.info.groupPrice;
						this.orderData.merchandise.maxCount = response_02.data.info.maxCount;
						this.orderData.merchandise.img = response_02.data.info.imgList[0];
					}
				})).catch((response) => {});
			}
			// this.getCouponList();
		}
	}
</script>
