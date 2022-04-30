<template>
	<view class="content">
		<view class="partment">
			<view class="zuzhi">
				<!-- 头部 -->
				<text>组织</text>
				<!-- 下拉 -->
				<view class="drowzjl">
					<view class="proyjxh" v-for="(item,index) in number" :key="index">
						<view class="fu">
							<view v-show="!seen" @click="xmjl">
								<image src="../../static/mix-tree/defaultIcon.png"></image>
							</view>
							<view v-show="seen" @click="xmjl">
								<image class="xx" src="../../static/mix-tree/currentIcon.png"></image>
							</view>
							<text class="name" @click="manager()">{{item.name}}</text>
						</view>
						<view class="mid">
							<view class="fu1" v-for="(two,index) in item.children" v-show="twoshow">
								<text v-if="two.child.childList.length == 0"
									@click="staff(two.child)">{{two.name}}</text>
								<text v-if="two.child.childList.length > 0">
									<view class="fu3">
										<view v-show="twoseen" @click="erji">
											<image src="../../static/mix-tree/defaultIcon.png"></image>
										</view>
										<view v-show="!twoseen" @click="erji">
											<image class="xx" src="../../static/mix-tree/currentIcon.png"></image>
										</view>
										<text @click="staff(two.child)">{{two.name}}</text>
									</view>
									<view class="fu1" v-for="(three,index) in childName" v-show="threeshow">
										<view class="threeop" v-if="two.child.childList.length > 0"
											v-for="(op,index) in three.child.childList">
											<text @click="staff(op)">{{op.F_FullName}}</text>
										</view>
									</view>
								</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>



<script>
	export default {
		data() {
			return {
				cardata: [], //父级
				twoshow: false,
				threeshow: false,
				seen: false,
				twoseen: false,
				section: "",
				section2: "",
				number: [],
				childName: [],
			}
		},
		onLoad() {
			this.organization();
		},
		onNavigationBarButtonTap(e) {
			uni.reLaunch({
				url: "index"
			})
		},
		//物理返回键
		onBackPress(options) {
			uni.reLaunch({
				url: "index"
			})
			return true
		},
		methods: {
			//组织架构
			organization() {
				uni.request({
					url: this.url + "/WebApiInterface/Department/GetDepList",
					method: "POST",
					success: (res) => {
						this.depId = res.data.Data[0].F_Id
						this.cardata = res.data.Data
						//第二级
						for (var i = 0; i < this.cardata[0].childList.length; i++) {
							var list = {
								name: "",
								twop: false,
								child: ""
							}
							var card = this.cardata[0].childList[i]
							list.name = card.F_FullName + "（ " + card.F_Address + " ）"
							list.child = card
							this.childName.push(list)
							this.section2 = this.cardata[0].childList[i].F_FullName + " > "
							console.log(this.childName, this.section2, 'name')
						}
						for (var i = 0; i < this.cardata.length; i++) {
							this.number.push({
								name: this.cardata[i].F_FullName + '（ ' + this.cardata[i].F_Address +
									' ）',
								children: this.childName,
								one: false,
								id: this.cardata[i].F_Id
							})
							this.section = this.cardata[i].F_FullName
						}
						console.log(this.number, '数组number')
						console.log(this.cardata, '数组')
					},
				});

			},
			//点击跳转到人员
			staff(item) {
				console.log(item, 'item')
				let data = JSON.stringify(item)
				let section = JSON.stringify(this.section)
				let section2 = JSON.stringify(this.section2)
				// if (item.childList.length > 0) {
				// 	uni.reLaunch({
				// 		url: "staffInfo?data=" + data + "&section=" + section + "&section2=" + section2
				// 	})
				// }else{
					uni.reLaunch({
						url: "staffInfo?data=" + data + "&section=" + section
					})
				// }

			},
			//点击总经理跳转
			manager() {
				let section2 = JSON.stringify(this.section2)
				uni.reLaunch({
					url: "staffInfo?data=" + JSON.stringify(this.cardata[0]) + "&section=" + JSON.stringify(this
						.section)

				})
			},
			xmjl() {
				var number = this.number
				if (this.twoshow == false || this.seen == false) {
					this.twoshow = true
					this.seen = true
					this.twoseen = true
				} else {
					this.twoshow = false
					this.seen = false
				}
			},
			erji() {
				if (this.threeshow == false || this.twoseen == true) {
					this.threeshow = true
					this.twoseen = false
				} else {
					this.threeshow = false
					this.twoseen = true
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {

		.partment {
			width: 93%;
			height: 88vh;
			margin: auto;
			margin-top: 30rpx;
			border-radius: 9rpx;
			background-color: #FFFFFF;

			.zuzhi {
				padding: 30rpx;

				text {
					font-size: 34rpx;
					font-family: PingFang SC;
					font-weight: bold;
					line-height: 48rpx;
					color: #262626;
				}

				.drowzjl {
					.fu {
						margin-top: 20rpx;
						height: 90rpx;
						display: flex;
						align-items: center;

						.name {
							width: 100%;
							font-size: 32rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #333333;
						}

						view {
							width: 50rpx;
						}

						image {
							width: 22rpx;
							height: 22rpx;
							margin-right: 30rpx;
						}

						.xx {
							width: 32rpx;
							height: 22rpx;
						}
					}

					.mid {
						margin-top: -20rpx;
					}

					.fu1 {
						margin: 30rpx;
						margin-left: 82rpx;

						text {
							font-size: 26rpx;
							font-family: PingFang SC;
							font-weight: 400;
							line-height: 37rpx;
							color: #666666;
						}

						.threeop {
							height: 80rpx;
							margin-left: -50rpx;
						}

						.fu3 {
							width: 100%;
							margin-left: -42rpx;
							display: flex;

							view {
								width: 50rpx;
							}

							image {
								width: 22rpx;
								height: 22rpx;
								margin-right: 30rpx;
							}

							.xx {
								width: 32rpx;
								height: 22rpx;
							}
						}
					}
				}
			}
		}
	}
</style>
