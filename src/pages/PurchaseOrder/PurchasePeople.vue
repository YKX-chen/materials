<template>
	<view class="maximum">
		<view class="uni-list">
			<radio-group @change="radioChange">
				<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.value"
					style="display: flex;border-bottom: 1rpx solid rgba(128, 128, 128, 0.1)">
					<view>
						<radio :value="item.F_Id" :checked="index === current" style="transform:scale(0.7)" />
					</view>
					<view class="name" style="line-height: 60rpx;margin-left: 10rpx;flex:1">{{item.F_RealName}}</view>
					<view class="name" style="line-height: 60rpx;flex:1">{{item.F_OrganizeId}}</view>
					<view class="name" style="line-height: 60rpx;flex:1">{{item.F_RoleId}}</view>
					<view class="name" style="line-height: 60rpx;margin-right: 15rpx;flex:1">{{item.F_Account}}</view>
				</label>
			</radio-group>
		</view>


		<view class="bom">
			<button type="primary" plain="true" class="plabtn" @click="cancell()">取消</button>
			<button type="primary" class="prbtn" @click="submit()">保存</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items: [{
					value: 'USA',
					name: '美国'
				}, ],
				current: "",

				id: "", //采购单id
				peopleid: "", //人员id
			}
		},
		onLoad() {
			this.id = this.$store.PurchaseId
			this.GetUserDep()
		},
		//顶部导航按钮-----修改
		onNavigationBarButtonTap(e) {
			uni.reLaunch({
				url: "./PurchaseOrder"
			})
		},
		//物理返回键
		onBackPress(options) {
			uni.reLaunch({
				url: "./PurchaseOrder"
			})
			return true
		},
		methods: {
			// 获取采购员列表
			GetUserDep() {
				uni.request({
					url: this.url + '/WebApiInterface/OrderPurchase/GetPurchaseUser',
					method: 'POST',
					data: {
						"orderId": this.id //采购单id
					},
					success: (res) => {
						console.log(res, '获取采购员列表');
						this.items = res.data.Data
						// console.log(this.GetInfoById, '获取采购员列表');
					}
				});
			},

			// 保存
			submit() {
				if (!this.peopleid) {
					uni.showToast({
						icon: 'none',
						title: '请选择人员!'
					});
				} else {
					uni.request({
						url: this.url + '/WebApiInterface/OrderPurchase/Assign',
						method: 'POST',
						data: {
							"orderId": this.id, //采购单id
							"purchaseUserId": this.peopleid
						},
						success: (res) => {
							console.log(res, '保存');
							if (res.data.StatusCode == 200) {
								uni.reLaunch({
									url: "./PurchaseOrder"
								})
							} else {
								uni.showToast({
									icon: 'none',
									title: res.data.Info
								});
							}
						}
					});
				}
			},
			// 取消
			cancell() {
				uni.reLaunch({
					url: "./PurchaseOrder"
				})
			},

			// 单选
			radioChange: function(evt) {
				console.log(evt.detail.value, '人员id')
				this.peopleid = evt.detail.value
				// for (let i = 0; i < this.items.length; i++) {
				// 	if (this.items[i].value === evt.detail.value) {
				// 		this.current = i;
				// 		break;
				// 	}
				// }
			}
		}
	}
</script>

<style lang="scss">
	.maximum {
		display: flex;
		display: -webkit-flex;
		width: 100%;
		height: 100vh;
		flex-direction: column;
		background: #fff;
		margin-top: 30rpx;

		.name {
			font-size: 30rpx;
		}


		.bom {
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 160rpx;
			background-color: #FFFFFF;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;

			button {
				width: 45%;
				height: 80rpx;
				line-height: 80rpx;
				border: none;
				outline: none;
			}

			.plabtn {
				font-size: 32rpx;
				font-family: PingFang SC;
				border: 1rpx solid #2798FD;
				box-shadow: 0rpx 5rpx 10rpx rgba(39, 152, 253, 0.4);
				color: #2798FD;
			}

			.prbtn {
				font-size: 32rpx;
				font-family: PingFang SC;
				border: 1rpx solid #2798FD;
				box-shadow: 0rpx 5rpx 10rpx rgba(39, 152, 253, 0.4);
			}
		}
	}
</style>
