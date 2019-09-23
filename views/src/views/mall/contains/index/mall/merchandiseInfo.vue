<template>
	<div class="merchandise" v-title="'特惠商城'">
		<swiper ref="mySwiper" :options="swiperOptions" class="merchandise-img">
			<swiper-slide v-if='groupId' v-for="img in info.imgList" :key="img">
				<img :src="img" />
			</swiper-slide>
			<swiper-slide v-if="info.status === 1" v-for="img in info.imgList" :key="img">
				<img :src="img" />
			</swiper-slide>
			<swiper-slide v-if="info.status === 2" v-for="img in info.pictures" :key="img">
				<img :src="img" />
			</swiper-slide>
			<div class="swiper-pagination" slot="pagination"></div>
		</swiper>
		<div class="merchandise-price">
			<div class="merchandise-price-title" v-if="info.spelled == 1">
				<span>拼团：</span>
				<span><span style="color: red;padding-left: 8px;"> {{info.lumpCount}}</span> 人团</span>
			</div>
			<div class="merchandise-price-left" v-if='!groupId'>
				<span>¥</span>
				<span class="merchandise-price-left-group" v-if="info.status == 2 && info.spelled == 0">
					<span class="merchandise-price-left-group-l">{{ info.specialPrice }}</span>
				</span>
				<span class="merchandise-price-left-group" v-if="info.status == 2 && info.spelled == 1">
					<span class="merchandise-price-left-group-l">{{ info.spellPrice }}</span>
				</span>
				<span class="merchandise-price-left-group" v-if="info.status === 1">
					<span class="merchandise-price-left-group-l">{{ info.groupPrice.integer }}</span>
					<span class="merchandise-price-left-group-s">{{ '.' + info.groupPrice.decimal }}</span>
				</span>
				<span class="merchandise-price-left-origin" v-if="info.status == 2">¥{{ info.price }}</span>
				<span class="merchandise-price-left-origin" v-if="info.status == 1">¥{{ info.originPrice.integer + '.' + info.originPrice.decimal }}</span>
			</div>
			<div class="merchandise-price-left" v-if='groupId'>
				<span>¥</span>
				<span class="merchandise-price-left-group" v-if="info.groupStatus == 2 ">
					<span class="merchandise-price-left-group-l">{{ info.groupPrice.integer+ '.' + info.groupPrice.decimal }}</span>
				</span>
				<span class="merchandise-price-left-origin" v-if="info.status == 2">¥{{ info.originPrice.integer + '.' + info.originPrice.decimal }}</span>
			</div>
			<div class="merchandise-price-right" v-if="info.status === 1">
				<p>距结束仅剩</p>
				<p>
					<span class="merchandise-price-right-number" v-if="info.countDown.day > 0">{{ info.countDown.day < 10 ? '0' + info.countDown.day : info.countDown.day }}</span>
					<span v-if="info.countDown.day > 0">天</span>
					<span class="merchandise-price-right-number">{{ info.countDown.hour < 10 ? '0' + info.countDown.hour : info.countDown.hour }}</span>
					<span>时</span>
					<span class="merchandise-price-right-number">{{ info.countDown.minute < 10 ? '0' + info.countDown.minute : info.countDown.minute }}</span>
					<span>分</span>
					<span class="merchandise-price-right-number">{{ info.countDown.second < 10 ? '0' + info.countDown.second : info.countDown.second }}</span>
					<span>秒</span>
				</p>
			</div>
		</div>
		<div class="merchandise-title">{{ info.name }}</div>
		<pre class="merchandise-description">{{ info.description }}</pre>
		<div class="merchandise-content">净含量: {{ info.content }}</div>
		<div class="merchandise-percent" v-show='false'  >
			<p class="merchandise-percent-title">参团数量</p>
			<div class="merchandise-percent-wrapper">
				<span class="merchandise-percent-minCount">0</span>
				<span class="merchandise-percent-maxCount">{{ info.maxCount }}</span>
				<div class="merchandise-percent-already" :style="{'width': (info.saleCount / info.maxCount * 100) + '%'}">
					<i class="merchandise-percent-triangle"></i>
					<span class="merchandise-percent-saleCount">{{ info.saleCount }}</span>
				</div>
				<div class="merchandise-percent-already"  :style="{'width': (info.saleCount / info.lumpCount * 100) + '%'}">
					<i class="merchandise-percent-triangle"></i>
					<span class="merchandise-percent-saleCount">{{ info.saleCount }}</span>
				</div>
			</div>
		</div>
		<div v-if='!groupId'>
			<img v-if="info.status === 1" :src="info.detail" class="merchandise-detail" />
			<img v-if="info.status === 2" :src="info.details" class="merchandise-detail" />
		</div>
		<div v-if='groupId'>
			<img  :src="info.detail" class="merchandise-detail" />
			<div class="merchandise-button" @click="handleCreateOrder" >
				<span>立即购买</span>
			</div>
		</div>
		<div class="merchandise-button" @click="handleCreateOrder" v-if="info.status === 1">
			<span>立即参团!</span>
		</div>
		<div class="merchandise-button" @click="SingleBuyOrGroupPurchase(2)" v-if="info.status === 2 && info.spelled == 0">
			<span>单买（{{ info.specialPrice }} 元）</span>
		</div>
		<div class="merchandise-button" v-if="info.status === 2 && info.spelled == 1">
			<div class="pintuan" @click="SingleBuyOrGroupPurchase(1)">拼团（{{ info.spellPrice }} 元）</div>
			<div class="danmai" @click="SingleBuyOrGroupPurchase(2)">单买（{{ info.specialPrice }} 元）</div>
		</div>
		<div class="mask" v-show="skuShow"></div>
		<div class="Specifications" v-if="Boolean(info.specsList)" v-show="skuShow">
			<div class="Specifications-heard">
				<div class="img-box">
					<img :src="info.cover" alt="">
				</div>
				<div class="right-box">
					<div class="title">{{ info.name }}</div>
					<div class="price">价钱：{{ info.singlePrice }}</div>
				</div>
				<img class="close" src="../../../img/close.png" alt="" @click="skuShow = false">
			</div>
			<div class="Specifications-body">
				<div class="Specifications-body-list">
					<div class="Specifications-body-list-item" v-for="(item1, index) in info.specsList" :key="index">
						<div class="title">{{ item1.name }}：</div>
						<div class="specifications">
							<div class="value" :class="item1.checked === item2 ? 'active' : ''" v-for="(item2, index) in item1.value" :key="index" @click="ChooseSpecifications(item1, item2)">{{ item2 }}</div>
						</div>
					</div>
				</div>
				<div class="Specifications-body-number">
					<div class="title">购买数量：</div>
					<div class="btns">
						<button type="button" name="button" @click="Reduce">-</button>
						<p>{{ info.count }}</p>
						<button type="button" name="button" @click="Add">+</button>
					</div>
				</div>
			</div>
			<div class="Specifications-btn" @click="Next">下一步</div>
		</div>
	</div>
</template>
<script lang="babel">
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import zdButton from 'publicComponents/button/button';
	import domain from '../../../../../publicSource/domain.js';
	export default {
		components: {
			swiper,
			swiperSlide
		},
		data() {
			return {
				swiperOptions: {
					pagination : '.swiper-pagination'
				},
				info: {
					name: '',
					description: '',
					content: '',
					originPrice: {
						integer: 0,
						decimal: 0
					},
					groupPrice: {
						integer: 0,
						decimal: 0
					},
					countDown: {
						day: 0,
						hour: 0,
						minute: 0,
						second: 0
					},
					maxCount: 999,
					saleCount: 0,
					imgList: [],
					detail: ''
				},
				interval: '',
				groupId:'',
				skuShow: false,
				isDisabled: true
			}
		},
		watch: {
			'info.countDown.second': function() {
				if (this.info.countDown.second < 0) {
					if (this.info.countDown.minute > 0 || this.info.countDown.hour > 0 || this.info.countDown.day > 0) {
						this.info.countDown.minute --;
						this.info.countDown.second = 59;
					} else {
						clearInterval(this.interval);
						this.info.countDown.second = 0;
					}
				}
			},
			'info.countDown.minute': function() {
				if (this.info.countDown.minute < 0) {
					this.info.countDown.hour --;
					this.info.countDown.minute = 59;
				}
			},
			'info.countDown.hour': function() {
				if (this.info.countDown.hour < 0) {
					this.info.countDown.day --;
					this.info.countDown.hour = 23;
				}
			}
		},
		mounted() {
			let query = this.$route.query;
			this.groupId = this.$route.query.groupId;
			if (query.groupId) {
				this.$http({
					url: '/api/mall/mall/getMerchandiseInfo',
					params: {
						id: query.id,
						groupId: query.groupId
					}
				}).then(res => {
					if (res.data.code === '00000') {
						this.info = res.data.info;
						if (Boolean(data.specsList)) {
							this.info["count"] = 1;
							this.info["singlePrice"] = res.data.info.price;
							this.info["cover"] = res.data.info.pictures[0];
							for (let i = 0; i < data.specsList.length; i++) {
								data.specsList[i]["checked"] = "";
							}
						}
						this.countDownStart();
					} else {}
				}).catch(error => {});
			} else {
				this.$http({
					url: '/api/mall/mall/getTogetherDetails',
					params: {
						id: query.id
					}
				}).then(res => {
					if (res.data.code === '00000') {
						let data = res.data.data;
						data["countDown"] = {
							day: -1,
							hour: -1,
							minute: -1,
							second: -1
						}
						if (data.status === 2) {
							for (let i = 0; i < data.pictures.length; i++) {
								data.pictures[i] = domain.domainname + data.pictures[i];
							}
							data.details = domain.domainname + data.details;
						}
						if (Boolean(data.specsList)) {
							data["cover"] = data.pictures[0];
							data["count"] = 1;
							data["singlePrice"] = data.price;
							for (let i = 0; i < data.specsList.length; i++) {
								// data.specsList[i]["checked"] = data.specsList[i].value[0];	// sku 默认选中第一项
								data.specsList[i]["checked"] = "";	// sku 默认不选中
							}
						}
						this.info = data;
						// Boolean(data.specsList) ? this.GetPrice() : "";
					} else {}
				}).catch(error => {});
			}
		},
		methods: {
			countDownStart() {
				this.interval = setInterval(() => {
					this.info.countDown.second --;
				}, 1000);
			},
			handleCreateOrder() {
				this.$router.push({
					path: '/mall/createOrder',
					query: {
						id: this.$route.query.id,
						groupId: this.$route.query.groupId
					}
				});
			},
			Reduce(params) {
				if (this.info.count > 1) {
					this.info.count --;
				}
			},
			Add(params) {
				this.info.count ++;
			},
			ChooseSpecifications(params1, params2) {
				this.info.count = 1;
				params1.checked = params2;
				this.GetPrice();
			},
			SingleBuyOrGroupPurchase(params) {
				let query = this.$route.query;
				localStorage.removeItem("zd_info");
				localStorage.setItem("zd_info", JSON.stringify(this.info));
				if (params === 1) {                 // 拼团
					this.$router.push({
						path: "/mall/collage",
						query: {
							id: this.info.id
						}
					});
				} else if (params === 2) {          // 单买
					this.skuShow = true;
				}
			},
			Next() {
				if (this.isDisabled) {
					let query = this.$route.query;
					localStorage.removeItem("zd_info");
					localStorage.setItem("zd_info", JSON.stringify(this.info));
					this.$router.push({
						path: '/mall/createOrder',
						query: {
							type: "dm",
							sortId: query.sortId ? query.sortId : 0
						}
					});
				} else {
					alert("暂无此组合的商品")
				}
			},
			GetPrice(params) {
				let info = this.info.specsList;
				let specs = new Array();
				let obj = new Object();
				for (let i = 0; i < info.length; i++) {
					if (info[i].checked !== "") {
						let obj1 = new Object();
						obj[info[i].name] = info[i].checked;
						obj1[info[i].name] = info[i].checked;
						specs.push(obj1);
					}
				}
				if (specs.length === info.length) {
					this.info["goodsGroup"] = obj;
					this.$http({
						url: '/api/mall/mall/getMerchandisePeice',
						method: 'get',
						params: {
							merchandiseId: this.info.id,
							specs: JSON.stringify(obj)
						}
					}).then(res => {
						if (res.data.code === '00000') {
							this.info.singlePrice = res.data.data;
						} else if (res.data.code === 'E0003'){
							this.isDisabled = false;
							alert(res.data.message);
						}
					}).catch((response) => {});
				}
			}
		}
	}
</script>
<style>
	.swiper-pagination-bullet-active{ background-color: #e9be6d !important;}
</style>
<style lang="less" scoped>
	.merchandise{ padding-bottom: .97rem;
		&-img{ width: 100%; height: 6.5rem;
			img{ width: 100%; height: 100%;}
		}
		&-price{ position: relative; display: flex; justify-content: space-between; align-items: center; width: 100%; height: .84rem; padding: 0 .3rem; background-color: #ffa44d; color: #fff;
			&-title{ position: absolute; left: 0; top: -0.35rem; z-index: 1; display: flex; justify-content: center; align-items: center; width: 2.34rem; height: .35rem; border-radius: 0 .08rem 0 0; background-color: #e9be6d; font-size: .26rem;}
			&-left{ font-size: .24rem;
				&-group{ font-size: 0;
					 > span{ font-size: .4rem;}
					& > &-s{ font-size: .3rem;}
				}
				&-origin{ font-size: .22rem; text-decoration: line-through;}
			}
			&-right{ font-size: .22rem;
				&-number{ display: inline-block; width: .28rem; height: .28rem; border-radius: .03rem; background-color: #fff; color: #e9be6d; text-align: center; line-height: .28rem;}
			}
		}
		&-title{ padding: 0 .3rem; line-height: .6rem; font-size: .26rem; color: #333;}
		&-description, &-content{ padding: 0 .3rem; line-height: 1.5; font-size: .22rem; color: #999;}
		&-percent{ height: 1.9rem;
			&-title{ padding: .3rem; font-size: .26rem; color: #333;}
			&-wrapper{ position: relative; height: .16rem; width: 6.6rem; margin: .3rem auto 0; border-radius: .08rem; background-color: #e6e6e6;}
			&-minCount, &-maxCount{ position: absolute; bottom: -.35rem; font-size: .18rem;}
			&-minCount{ left: 0;}
			&-maxCount{ right: 0;}
			&-already{ position: absolute; top: 0; left: 0; height: .16rem; border-radius: .08rem 0 0 .08rem; background-color: #2ee820;}
			&-triangle{ position: absolute; top: 0; right: -.06rem; border-width: .06rem; border-style: solid; border-color: #fff transparent transparent transparent; font-size: 0;}
			&-saleCount{ position: absolute; top: -.35rem; right: -.5rem; width: 1rem; height: 1rem; font-size: .26rem; color: #333; text-align: center;}
		}
		&-detail{ width: 100%; }
		&-button{ position: fixed; bottom: 0; left: 0; width: 100%; height: .97rem; font-size: .3rem; line-height: .97rem; justify-content: center; color: #fff; display: flex; background-color: #ff4c4c;
			.pintuan, .danmai{ width: 50%; line-height: .97rem; color: white; text-align: center; }
			.pintuan{ background-color: #f59119; }
			.danmai{ background-color: #ff4c4c; }
		}
		.mask{ width: 100%; height: 100%; position: fixed; top: 0; left: 0; z-index: 10; background-color: rgba(0, 0, 0, 0.5); }
		.Specifications{ width: 7.21153846rem; position: fixed; bottom: 0; left: 0; background-color: white; z-index: 20;
			&-heard{ width: 100%; height: 2.38461538rem; padding: .28846154rem .24038462rem; position: relative; border-bottom: 1px solid #eee; display: flex;
				.right-box{ height: 100%; display: flex; flex-direction: column;
					.title{ font-size: .28846154rem; color: #333; padding-left: .19230769rem; }
					.price{ font-size: .25rem; color: #333; padding-left: .19230769rem; padding-top: .09615385rem; } }
				.img-box{ width: 1.80769231rem; height: 1.80769231rem; img{ width: 100%; } }
				.close{ width: .24038462rem; height: .24038462rem; position: absolute;right: .28846154rem; top: .28846154rem; } }
			&-body{ width: 100%;
				&-list{ width: 100%; height: 3.10576923rem; overflow-y: scroll; padding: .28846154rem .24038462rem;
					&-item{
						&:not(:first-child){ padding-bottom: .28846154rem; }
						&:not(:last-child){ padding-bottom: 8px; }
						.title{ font-size: .28846154rem; color: #333; padding-bottom: 8px; }
						.specifications{ display: flex;
							.value{ width: 1.34615385rem; height: .48076923rem; border: 1px solid #f5f5f5; border-radius: 5px; text-align: center; background-color: #f5f5f5; line-height: .46153846rem; font-size: .25rem; color: #333;
								&:not(:nth-child(4n+1)){ margin-left: .38461538rem;}
							}
							.active{ color: #ff6666; border-color: #ff6666;}
						}
					}
				}
				&-number{ display: flex; justify-content: space-between; border-bottom: 1px solid #eee; padding: .28846154rem .24038462rem; .title{ font-size: .28846154rem; color: #333; } .btns{ font-size: .28846154rem; display: flex; align-items: center; p{ height: .33653846rem; line-height: .33653846rem; padding: 0 5px; } button{ width: .33653846rem; height: .33653846rem; line-height: .19230769rem; font-weight: 800; border: .01rem solid #333; background-color: #f5f5f5; } } }
			}
			&-btn{ width: 6.73076923rem; height: .81730769rem; margin: .19230769rem .24038462rem; border-radius: 4px; background-color: #ff6666; color: white; text-align: center; line-height: .81730769rem; font-size: .28846154rem; }
		}
	}
</style>