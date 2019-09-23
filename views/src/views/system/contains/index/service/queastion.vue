<template>
    <div class="question" v-title="'问卷调查'">
        <div class="question-item" v-for="(item, i) in list" :key="i" @click="Click(item)">
            <img :src="item.image" alt="">
            <div class="question-item-bottom">
                <p class="question-item-title">{{ item.title }}</p>
                <div class="question-time">
                    <p><img src="../../../img/wjdc_yijieshu@2x.png" alt="" class='icons'><span>{{ item.status == 1 ? "已过期" : item.endDatetime + " 过期" }}</span> </p>
                    <p><img src="../../../img/wjdc_zhuzhuangtu@2x.png" alt="" class="icons"> <span>{{ item.count }}</span></p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
	export default {
		data() {
			return {
				list: []
			};
		},
        computed: {
            isVisitor() {
                return this.$store.state.isVisitor;
            },
            info() {
                return this.$store.state.info;
            }
        },
		mounted() {
			this.Get();
		},
		methods: {
			Click(params) {
				if (params.isUsable == 0) {
					alert(params.message);
				} else {
					window.location.href = params.url;
				}
				function getQueryString(url) {  
					var qs = url.substr(url.indexOf("?") + 1),
						args = {},
						items = qs.length ? qs.split("&") : [], // 取得每一个参数项,
						item = null,
						len = items.length;
					for(var i = 0; i < len; i++) {
						item = items[i].split("=");
						var name = decodeURIComponent(item[0]),
						value = decodeURIComponent(item[1]);
						if(name) {
							args[name] = value;
						}
					}
					return args;
				}
			},
			Get() {
				this.$http({
					url: '/api/common/service/questionnaire/getQuestionnaireList',
					method: 'get',
					params: {
						parkId: this.info.defaultParkId
					}
				}).then(res => {
					if (res.data.code === '00000') {
						this.list = res.data.questionnaireList;
					}
				}).catch(error => {});
			}
		}
	};
</script>

<style lang="less" scoped>
	.question {
		padding: 0.2rem;
		&-item {
			border-top-left-radius: 3px;
			border-top-right-radius: 3px;
			img {
				height: 3rem;
				width: 100%;
			}
			&:not(:last-child){
				margin-bottom: 10px;
			}
			&-bottom {
				padding: 0.26rem 0.28rem;
				border-bottom: 1px solid #eee;
				border-left: 1px solid #eee;
				border-right: 1px solid #eee;
				border-radius: 3px;
				height: 1.44rem;
				.question-time {
					padding-top: 0.26rem;
					bottom: 0.26rem;
					display: flex;
					color: #999;
					font-size: 0.22px;
					justify-content: space-between;
					span {
						display: inline-block;
						line-height: 0.3rem;
						padding-left: 0.12rem;
					}
					.icons {
						width: 0.25rem;
						height: auto;
						flex-grow: 0;
					}
				}
			}
			&-title {
				font-size: 0.3rem;
				color: #333;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}
	}
</style>
