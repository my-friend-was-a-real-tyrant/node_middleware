<template>
	<div v-title="'生活缴费'" style="height: 100%;">
		<div :class="changeShowType =='property'?'mbottom70':''">
			<div class="flex-ll black fsize15 tab">
				<div>
					<span :class='{activity_show: changeShowType =="property"}' @click="bindChange('property')">物业费</span>
				</div>
				<div>
					<span :class='{activity_show: changeShowType =="water"}' @click="bindChange('water')">水电费</span>
				</div>
			</div>
			<div v-if="changeShowType =='property'" class="hr"></div>
			<transition name="fade-choose">
				<section v-show="changeShowType =='water'" class="">
					<div class="money fsize15 t-align-c white">预存金额：{{preStorage}}元</div>
				</section>
			</transition>
			<el-collapse style="font-size:15px;">
				<div v-for="(item , index) in newList" :key="index">
					<!--<div v-if="item.type==2||item.type==3">
                    <el-collapse-item class="" :name="index">
                        <template slot="title">
                            <img class="circle mleft mtop14" :src="item.src" @click.stop="bindChecked('all',item.type,item.year,item.status)"/>
                            <span>{{item.year}}</span>
                        </template>
                        <el-collapse>
                            <div v-for="(item1 , index1) in item.content.part">
                                <el-collapse-item class="" :name="index1">
                                    <template slot="title">
                                        <img v-if="item1.costType==1" class="circle mleft mtop14" :src="item1.src" @click.stop="bindChecked('part',item.type,item.year,item.status,index1,item1.cost)"/>
                                        <span v-if="item.type==2">{{item.year}}{{index1==0?'下半年':'上半年'}}</span>
                                        <span v-if="item.type==3">{{item.year}}{{ index1 === 0 ? '冬季' : index1 === 1 ? '秋季' : index1===2 ? '夏季' : '春季' }}</span>
                                    </template>
                                    <div v-for="(item2,index2) in item1.part">
                                        <div class="part-content">
                                            <div class="flex-ll mtop15 section" style="margin-left:15px;">
                                                <div v-if="index1==0">
                                                    <div class="mleft10 fsize15">{{12-index2}}月份</div>
                                                </div>
                                                <div v-else>
                                                    <div class="mleft10 fsize15">{{6-index2}}月份</div>
                                                </div>
                                                <div class="mleft10 red">（未缴纳）</div>
                                            </div>
                                            <div class="mleft18">
                                                <div class="mtop10"><span>{{changeShowType=='property'?'物业管理费':'水费'}}：</span>{{item2.wuye}}元</div>
                                                <div class="mtop10"><span>{{changeShowType=='property'?'车位管理费':'水费'}}：</span>{{item2.car}}元</div>
                                                <div class="mtop10"><span>{{changeShowType=='property'?'公共能耗费':'空调费'}}：</span>{{item2.public}}元</div>
                                                <div class="mtop15" :class="index2==2?'':'hr-one'"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="hr" style="border:none;"></div>
                                </el-collapse-item>
                            </div>
                        </el-collapse>
                    </el-collapse-item>
                </div>
                <div v-else>-->
					<el-collapse-item class="" :name="index">
						<template slot="title">
							<div v-if="item.status!=2&&changeShowType =='property'" style="display:inline;">
								<img class="circle mtop14" :src="item.src" @click.stop="bindChecked('all',item.type,item.year,item.status)" />
							</div>
							<div v-else-if="item.status==2&&changeShowType =='property'" class="circle" style="display:inline-block;"></div>
							<span>{{item.year}}</span>
						</template>
						<div class="hr-one"></div>
						<div v-for="(val , valindex) in item.content" :key="valindex">
							<div class="part-content">
								<div class="flex-ll mtop15 section">
									<img v-if="item.type==1&&val.costType==1&&changeShowType =='property'" class="circle" :src='val.src'
									 @click.stop="bindChecked('part',item.type,item.year,val.status,val.id,val.cost)" />
									<i v-else-if="changeShowType =='property'" class="circle"></i>

									<div class="fsize15" :class="changeShowType =='property'?'mleft10':''">{{12-valindex}}月份</div>
									<div v-if="changeShowType =='property'" class="mleft10" :class="val.costType==1?'red':'green'">（{{val.costType==1?'未缴纳':'已缴纳'}}）</div>
								</div>
								<div class="mleft18" v-if="changeShowType=='property'">
									<div class="mtop10">
										<span>物业管理费：</span>{{val.cost}}元</div>
									<div class="hr-one mtop15"></div>
								</div>
								<div class="mleft" v-else>
									<div class="mtop10">
										<span>水费：</span>{{val.waterCost}}元</div>
									<div class="mtop10">
										<span>电费：</span>{{val.electricityCost}}元</div>
									<div class="mtop10">
										<span>空调费：</span>{{val.airCost}}元</div>
									<div class="hr-one mtop15"></div>
								</div>
							</div>
						</div>
					</el-collapse-item>
					<!--</div>-->
				</div>
			</el-collapse>
		</div>
		<div v-if="changeShowType =='property'" class="bottom flex-rr section fsize15">
			<div class="bottom-left hasNoUsed" @click="WantChoose">
				<span>优惠券:</span>
				<span>{{ couponList.availableList.length > 0 ? couponList.availableList.length :
					0 }}张可用{{ ((couponList.availableList.length > 0)&&Couponid) ? "(已选)" : "(未选)" }}</span>
			</div>
			<div class="bottom-right">
				<div style="margin-right: 10px">
					<span>合计:</span>
					<span>{{ totalMoney }}元</span>
				</div>
				<button class="btnred white" @click='confirmPay'>确认支付</button>
			</div>
		</div>
		<!-- 选取优惠券 -->
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
		<div class="alert-notice" v-show="alertShow">
			<div class="alert-content">
				<div>提示</div>
				<div>您有可用的优惠券</div>
				<div class="footer">
					<div @click="DontUsed">不使用</div>
					<div @click="ICanUsed" class="active">使用</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="babel">
	import zdButton from 'publicComponents/button/button';
	function partTwo(arr, type, limit) {
		let brr = [];
		let arrLen = arr.length;
		let num = 0;
		let num_max = 0;
		for (var i = 0; i < type; i++) {
			num_max += limit;
			brr[i] = arr.slice(num, num_max);
			num += limit;
		}
		return brr;
	}
	export default {
		components: {
			zdButton
		},
		data() {
			return {
				changeShowType: 'property',
				activeNames: [''],
				newList: [],
				zdlist: {},
				totalMoney: 0,
				preStorage: 0,
				alertShow: false,
				couponShow: false,
				couponList: {
					availableList: [],
					unavailableList: []
				},
				Couponid: "",
				face: 0
			}
		},
		computed: {
			isVisitor() {
				return this.$store.state.isVisitor;
			}
		},
		watch: {
			Couponid(newv, oldv) {
				for (let i = 0; i < this.couponList.availableList.length; i++) {
					let item = this.couponList.availableList[i];
					if (item.id === newv) {
						this.face = item.face;
						this.totalMoney = this.accSubtr(this.totalMoney, item.face);
					}
				}
			}
		},
		mounted() {
			this.roomId = this.$store.state.info.defaultAddressId;
			this.parkId = this.$store.state.info.defaultParkId;
			this.getList('userPropertyListGet');
		},
		methods: {
			bindChange: function (value) {
				this.changeShowType = value;
				if (value == 'property') {
					this.getList('userPropertyListGet');
				} else {
					this.getList('userWaterListGet');
				}
			},
			bindChoose: function () {

			},
			arrDeal: function () {
				let zdlist = this.zdlist;
				let yearList = []
				for (var i in zdlist.bills) {
					yearList.push({
						type: zdlist.payType, //1年缴   2半年缴  3季度缴   4月份缴   1:月付2：季度付3：半年付4：年付
						//type:i=='2018'?'2':i=='2017'?'3':i=='2016'?'4':'1',
						year: i + '年',
						content: zdlist.bills[i],
					})
				}
				let newList = [];
				let that = this;
				yearList.map(function (r, n) {
					let returnList = [];
					if (r.type == 3) { //半年
						returnList = partTwo(r.content, 2, 6)
					} else if (r.type == 2) { //季度
						returnList = partTwo(r.content, 4, 3)
					}
					if (r.type == 2 || r.type == 3) { //半年  季度
						newList.push({
							type: r.type,
							year: r.year,
							yearMoney: 0,
							status: 0,
							src: require('../img/unchecked.png'),
							content: {
								part: []
							}
						});
						let seasonMoney = 0
						let costType = 2;
						returnList.map(function (x, y) {
							x.map(function (a, b) {
								if (a.costType == 1) {
									seasonMoney += a.cost;
									costType = 1;
								}
							})
							newList[n].content.part.push({
								part: x,
								status: 0,
								src: require('../img/unchecked.png'),
								seasonMoney: seasonMoney,
								costType: costType
							});
						})
					} else { //整年  月份
						let yearMoney = 0;
						let notpaynum = 0;
						let paynum = 0;
						r.content.map(function (v, t) {
							if (v.costType == 1) {
								v.status = 0;
								v.src = require('../img/unchecked.png');
								yearMoney += v.cost;
								notpaynum++;
							} else {
								paynum++;
							}
						})
						let allstatus;
						if (paynum == r.content.length) {
							allstatus = 2;
						} else {
							allstatus = 0;
						}
						newList.push({
							type: r.type,
							year: r.year,
							yearMoney: yearMoney,
							content: r.content,
							src: require('../img/unchecked.png'),
							status: allstatus,
							notpaynum: notpaynum
						});
					}
				})
				this.newList = newList;
			},
			getList: function (Interface) {
				this.$http({
					method: 'get', //this.roomId
					url: '/api/system/life/coupon/' + Interface + '?parkId=' + this.parkId + '&roomId=' + this.roomId,
					data: {
						//parkId:1,
						//roomId:1401
					}
				}).then((res) => {
					this.zdlist = res.data.data;
					if (Interface == 'userWaterListGet') {
						this.preStorage = res.data.data.preStorage;
					} else {
						//this.zdlist = res.data.data;
					}
					this.arrDeal();
				}).catch((res) => {});
			},
			bindChecked: function (allchecked, type, year, status, id, cost) {
				let that = this;
				let totalMoney;
				if (this.Couponid) {
					totalMoney = this.accAdd(this.totalMoney, this.face)
				} else {
					totalMoney = this.totalMoney;
				}
				this.Couponid = "";
				let changeMoney = 0;
				this.newList.map(function (r, n) {
					if (r.year == year) {
						if (allchecked == 'all') { //年份全选
							if (type == 1 || type == 4) {
								r.content.map(function (v, t) {
									if (v.costType == 1) {
										if (status == 0) {
											if (v.status == 0) {
												changeMoney += v.cost //考虑到全选时，已经有选中的要排除
											}
											v.status = 1
											v.src = require('../img/checked.png')
											r.status = 1
											r.src = require('../img/checked.png')
										} else {
											changeMoney -= v.cost
											v.status = 0
											v.src = require('../img/unchecked.png')
											r.status = 0
											r.src = require('../img/unchecked.png')
										}
									}
								})
							} else {
								r.content.part.map(function (v, t) {
									if (status == 0) {
										if (v.status == 0) {
											changeMoney += v.seasonMoney
										}
										r.status = 1
										r.src = require('../img/checked.png')
										v.status = 1
										v.src = require('../img/checked.png')
									} else {
										changeMoney -= v.seasonMoney
										r.status = 0
										r.src = require('../img/unchecked.png')
										v.status = 0
										v.src = require('../img/unchecked.png')
									}
								})
							}
						} else { //部分全选
							if (type == 1 || type == 4) {
								let chooseNum = 0
								r.content.map(function (v, t) {
									if (type == 1) { //按月计算
										if (v.id == id) {
											if (status == 0) {
												v.status = 1;
												v.src = require('../img/checked.png');
												changeMoney += v.cost;
											} else {
												v.status = 0;
												v.src = require('../img/unchecked.png');
												r.src = require('../img/unchecked.png');
												r.status = 0;
												changeMoney -= v.cost;
											}
										}
										if (v.status == 1) {
											chooseNum++;
											if (chooseNum == r.notpaynum) {
												r.status = 1;
												r.src = require('../img/checked.png');
											}
										}
									}
								})
							} else {
								let notpaynum = 0;
								let chooseNum = 0;
								r.content.part.map(function (v, t) {
									if (v.costType == 1) {
										notpaynum++;
									}
								});
								r.content.part.map(function (v, t) {
									if (t == id) {
										if (v.status == 0) {
											v.status = 1;
											v.src = require('../img/checked.png');
											changeMoney += v.cost;
										} else {
											v.status = 0;
											v.src = require('../img/unchecked.png');
											r.src = require('../img/unchecked.png');
											r.status = 0;
											changeMoney -= v.cost;
										}
									}
									if (v.status == 1) {
										chooseNum++;
										if (chooseNum == notpaynum) {
											r.status = 1;
											r.src = require('../img/checked.png');
										}
									}
								});
							}
						}
					}
					that.$set(that.newList, n, r);
				});
				this.totalMoney = this.accAdd((+totalMoney), (+changeMoney));
				this.GetCoupon(this.totalMoney);
			},
			accAdd(arg1, arg2){
				let r1,r2,m; 
				try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0} 
				try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0} 
				m=Math.pow(10,Math.max(r1,r2)) ;
				return (arg1*m+arg2*m)/m;
			},
			accSubtr(arg1,arg2){
				var r1,r2,m,n;
				try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
				try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
				m=Math.pow(10,Math.max(r1,r2));
				//动态控制精度长度
				n=(r1>=r2)?r1:r2;
				return ((arg1*m-arg2*m)/m).toFixed(n);
			},
			confirmPay: function () {
				if (this.couponList.availableList.length > 0 && this.Couponid == "") {
					this.alertShow = true;
				} else {
					this.$http({
						method: 'post',
						url: '/api/mall/mall/createBillOrder',
						data: {
							id: this.roomId, //roomid
							ids: this.CreateIds(),
							couponId: this.Couponid
						}
					}).then((res) => {
						if (res.data.code == '00000') {
							this.$router.push({
								path: 'payment/pay',
								query: {
									id: res.data.data.id,
									amount: res.data.data.payAmount,
								}
							});
						}
					}).catch((res) => {});
				}
			},
			handleChooseCoupon(id) {
				this.Couponid = id;
				this.couponShow = false;
			},
			WantChoose() {
				this.couponShow = true;
			},
			DontUsed() {
				this.$http({
					method: 'post',
					url: '/api/mall/mall/createBillOrder',
					data: {
						id: this.roomId, //roomid
						ids: this.CreateIds()
					}
				}).then((res) => {
					if (res.data.code == '00000') {
						this.$router.push({
							path: 'payment/pay',
							query: {
								id: res.data.data.id,
								amount: res.data.data.payAmount,
							}
						});
					}
				}).catch((res) => {});
			},
			ICanUsed() {
				this.alertShow = false;
				this.couponShow = true;
			},
			CreateIds() {
				let ids = '';
				this.newList.map(function (r, n) {
					if (r.type == 4) {
						r.content.map(function (v, t) {
							if (v.costType == 1) {
								if (v.status == 1) {
									ids = ids + v.id + ',';
								}
							}
						})
					} else if (r.type == 1) {
						if (r.status == 1) {
							r.content.map(function (v, t) {
								if (v.status == 1) {
									ids = ids + v.id + ',';
								}
							})
						}
					}
				});
				return ids.substring(0, ids.lastIndexOf(','));
			},
			GetCoupon(params) {
                this.$http({
                    url: '/api/mall/mall/getCouponList?price=' + params + '&merchandiseId=0&sortId=0&type=2',
					method: 'get'
                }).then(res => {
                    if (res.data.code === '00000') {
						this.couponList.availableList = res.data.availableList;
						this.couponList.unavailableList = res.data.unavailableList;
                    }
                }).catch(error => {});
            }
		}
	}
</script>
<style lang="less">
	.order-coupon{ z-index: 100; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: #f5f5f5; overflow: scroll; padding-bottom: 50px;
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
	.alert-notice{
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .5);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100;
		display: flex;
		justify-content: center;
		align-items: center;
		.alert-content{
			width: 5.26315789rem;
			height: 2.48803828rem;
			background-color: #fff;
			border-radius: 4px;
			div{
				height: .76555024rem;
				box-sizing: border-box;
				text-align: center;
				font-size: .26794258rem;
				line-height: .76555024rem;
				&:nth-child(2){
					height: .9569378rem;
				}
			}
			.footer{
				border-top: 1px solid #eee;
				font-size: .26794258rem;
				display: flex;
				div{
					height: .74119617rem;
					line-height: .74119617rem;
					width: 50%;
					&:nth-child(2){
						border-left: 1px solid #eee;
					}
				}
				.active{
					color: rgb(232, 156, 70);
				}
			}
		}
	}
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

	.white {
		color: #fff;
	}

	.red {
		color: #ff4c4c;
	}

	.green {
		color: #00cb65;
	}

	.fsize15 {
		font-size: 15px;
	}

	.fsize18 {
		font-size: 18px;
	}

	.section {
		width: 92%;
		padding-left: 4%;
		padding-right: 4%;
	}

	.t-align-c {
		text-align: center;
	}
	.tab div {
		width: 50%;
		text-align: center;
		opacity: 1;
	}
	.tab div span {
		color: #333;
		border-bottom: 1px solid #fff;
		height: 50px;
		line-height: 50px;
		display: inline-block;
		opacity: 0.5;
	}
	.tab div .activity_show {
		opacity: 1;
		border-color: #333;
	}
	.money {
		height: 36px;
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
	.circle {
		width: 15px;
		height: 15px;
	}
	.mleft {
		margin-left: 4%;
	}
	.mleft10 {
		margin-left: 10px;
	}
	.mleft20 {
		margin-left: 20px;
	}
	.mtop10 {
		margin-top: 10px;
	}
	.mtop14 {
		margin-top: 14.5px;
	}
	.mtop15 {
		margin-top: 15px;
	}
	.mbottom10 {
		margin-bottom: 10px;
	}
	.mbottom15 {
		margin-bottom: 15px;
	}
	.mbottom70 {
		margin-bottom: 70px;
	}
	.mleft18 {
		margin-left: 10.67%;
	}
	.bottom {
		position: fixed;
		z-index: 100;
		bottom: 0px;
		height: 58px;
		width: 100%;
		line-height: 60px;
		border-top: 1px solid #ccc;
		background: #fff;
		display: flex;
		justify-content: space-between;
	}
	.bottom-left{
		border: 1px solid #eee;
		height: .66985646rem;
		line-height: .66985646rem;
		padding: 0 .14354067rem;
		border-radius: 4px;
		font-size: .24880383rem;
	}
	.hasNoUsed{
		background-color: #ff4c4c;
		color: #fff;
	}
	.bottom-right{
		display: flex;
		align-items: center;
	}
	.btnred {
		height: 36px;
		background-color: #ff4c4c;
		width: 96px;
		text-align: center;
		border-radius: 5px;
	}
	.el-collapse-item__header {
		background: none !important;
		font-size: 18px !important;
		color: #333 !important;
		height: 44px !important;
		line-height: 44px !important;
	}
	.el-collapse-item {
		width: 100%;
	}

	.el-collapse-item__arrow {
		line-height: 44px !important;
	}

	.el-collapse-item__header__arrow {
		float: right;
		line-height: 44px;
		margin-right: 10px;
	}

	.el-collapse-item__content {
		padding: 0;
		color: #333;
	}

	.el-collapse {
		border: none !important;
	}

	.el-collapse-item__wrap {
		background-color: #fff;
		/*border-bottom:none*/
	}

	.icon-checked {
		background: url("../img/checked.png");
		background-size: 100%;
		background-repeat: no-repeat;
		width: 15px;
		height: 15px;
	}

	.icon-unchecked {
		background: url("../img/unchecked.png");
		background-size: 100%;
		background-repeat: no-repeat;
		width: 15px;
		height: 15px;
	}
</style>
