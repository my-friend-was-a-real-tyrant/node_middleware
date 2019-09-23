<template>
	<div class="choose">
		<div class="choose-top">
			<p :class="index==active?'choose-top-item active-item':'choose-top-item'" v-for='( item , index ) in chooseList'
			 :key='index' @click="active=index;change(index)">
				{{item}}
			</p>
		</div>
		<div class="choose-list">
			<div class="choose-list-item" v-for="( item , index ) in list" :key="index" @click="toTar(item)">
				<div class="list-item-left">
					<img v-if="item.status == 2" :src="item.pictures[0]" alt="" class="list-item-left-img">
					<img v-if="item.status == 4" :src="item.img" alt="" class="list-item-left-img">
				</div>
				<div class="list-item-right">
					<p class="item-name">{{ item.name }}</p>
					<p class="item-desc">{{ item.description }}</p>
					<div class="item-price">
						<p>团购价：</p>
						<p class="item-all-price" v-if="item.spellPrice == 0">{{ item.specialPrice }}</p>
						<p class="item-all-price" v-else>{{ item.spellPrice }}</p>
						<p>元</p>
						<p v-if="item.status == 2" class="item-all-content"> / {{ item.content }}</p>
					</div>
					<div class="item-btn">
						<p v-if="active == 0" class="item-btn-buy">立即购买</p>
						<p v-if="item.spelled == 1" class="item-btn-pt">立即拼团</p>
					</div>
				</div>
			</div>
			<div class="myOrder" @click='toOrder'>
				<div></div>
				<p>订单</p>
			</div>
		</div>
	</div>
</template>
<script>
	import domain from "../../../../../../publicSource/domain";
	export default {
		data() {
			return {
				active: 0,
				chooseList: ["推荐", "拼团"],
				list: []
			};
		},
		mounted() {
			this.change(0);
		},
		methods: {
			change(index) {
				this.list = [];
				if (index === 0) {
					this.$http({
						method: "get",
						url: "/api/mall/mall/getRecommendInfoNew"
					}).then(response => {
						if (response.data.code === "00000") {
							let data = response.data.data.recommendList;
							for (let i = 0; i < data.length; i++) {
								for (let j = 0; j < data[i].pictures.length; j++) {
									data[i].pictures[j] = domain.domainname + data[i].pictures[j];
								}
							}
							this.list = data;
						}
					}).catch(response => {});
				} else if (index === 1) {
					this.$http({
						method: "get",
						// url: "/api/mall/mall/getMerchandiseList",
						url: "/api/mall/mall/getRecommendInfoNew"
					}).then(response => {
						console.log(response)
						if (response.data.code === "00000") {
							let data = response.data.data.spellList;
							for (let i = 0; i < data.length; i++) {
								for (let j = 0; j < data[i].pictures.length; j++) {
									data[i].pictures[j] = domain.domainname + data[i].pictures[j];
								}
							}
							this.list = data;
						}
					}).catch(response => {});
				}
			},
			toOrder() {
				this.$router.push({
					path: "/index/person/myOrder"
				});
			},
			toTar(item) {
				this.$router.push({
					path: "/mall/merchandiseInfo",
					query: {
						id: item.id,
						groupId: item.groupId
					}
				});
			}
		}
	};
</script>
<style lang="less" scoped>
	@import "../../common.less";

	.choose {
		&-top {
			margin-top: 0.36rem;
			height: 0.64rem;
			line-height: 0.64rem;
			text-align: center;
			font-size: 0.24rem;
			display: flex;
			border-top: 1px solid @active-color;
			border-bottom: 1px solid @active-color;

			&-item {
				color: @active-color;
				width: 50%;
			}

			.active-item {
				color: #fff;
				background-color: @active-color;
			}
		}

		.choose-list-item {
			height: 3.14rem;

			&:not(:last-child) {
				border-bottom: 1px solid @border-e8;
			}

			display: flex;
			justify-content: center;
			padding-left: .2rem;
			padding-right: .2rem;

			.list-item-left {
				width: 2.64rem;
				height: 2.64rem;
				display: flex;
				align-content: center;
				margin-top: .25rem;

				&-img {
					width: 2.64rem;
					height: auto;
				}
			}

			.list-item-right {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				font-size: 0.24rem;
				padding-left: .15rem;

				.item-name {
					font-size: 0.28rem;
					color: @base-color;
					margin-bottom: 0.16rem;
					.texts-overflow(@line: 1);
				}

				.item-desc {
					color: @color-99;
					.texts-overflow(@line: 1);
				}

				.item-price {
					color: @active-color;
					margin-bottom: 0.24rem;
					color: @color-fba;
					margin-top: 0.3rem;
					display: flex;
					align-items: baseline;

					.item-all-price {
						font-size: 0.44rem;
					}

					.item-all-content {
						width: 1.35999029rem;
						.texts-overflow(@line: 1);
					}
				}

				.item-btn {
					height: 0.52rem;
					display: flex;
					justify-content: space-between;
					align-items: flex-end;

					&-buy {
						width: 1.8rem;
						height: 0.52rem;
						text-align: center;
						border-radius: 0.06rem;
						line-height: 0.52rem;
						color: #fff;
						background-color: @active-color;
					}

					&-pt {
						width: 1.8rem;
						height: 0.52rem;
						text-align: center;
						color: #fff;
						line-height: 0.52rem;
						background-color: rgba(255, 0, 0, 0.74);
						border-radius: 3px;
					}
				}
			}
		}

		.myOrder {
			position: fixed;
			bottom: 1.2rem;
			right: 0.3rem;
			width: 1rem;
			height: 1rem;
			border: .012999rem solid #f4f4f4;
			border-radius: 50%;
			background-color: white;

			div {
				width: .26rem;
				height: .29rem;
				background-image: url(../../../../img/myOrder.png);
				background-repeat: no-repeat;
				background-size: 100% 100%;
				margin: .12599903rem auto 0;
			}

			p {
				text-align: center;
				font-size: 0.20rem;
				color: #333;
				padding-top: .10799709rem;
				color: #999;
			}
		}
	}
</style>