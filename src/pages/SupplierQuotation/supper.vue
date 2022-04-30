<template>
	<view class="page">
		<view class="header">
			<view class="search">
				<view class="input">
					<view class="icon">
						<image src="http://purchase.zhroot.com/attached/appImgs/proslices/ico%E6%90%9C%E7%B4%A2.png">
						</image>
					</view>
					<input class="see" type="text" v-model="searcinput" @input="searchSale" placeholder="请输入搜索内容"
						placeholder-class="placeinput"></input>
				</view>
			</view>
		</view>
		<!-- 列表 -->
		<view class="maximum">
			<view class="uni-list">
				<radio-group>
					<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in supplierData"
						:key="item.value" style="display: flex;border-bottom: 1rpx solid rgba(128, 128, 128, 0.1)"
						@click="radioChange(item)">
						<view>
							<radio :value="item.F_Id" :checked="index === current" style="transform:scale(0.7)" />
						</view>
						<view class="name" style="line-height: 60rpx;flex:1">{{item.F_SupplierName}}</view>
					</label>
				</radio-group>
			</view>
		</view>
		<view class="btnbom"></view>
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
				searcinput: "",
				supplierData: [],
				current: "",
				suppin:{}
			}
		},
		//顶部导航按钮-----修改
		onNavigationBarButtonTap(e) {
			uni.reLaunch({
				url: "quotation"
			})
		},
		//物理返回键
		onBackPress(options) {
			uni.reLaunch({
				url: "quotation"
			})
			return true
		},
		onLoad() {
			this.suppDep()
		},
		methods: {
			// 单选
			radioChange: function(e) {
				console.log(e, '物资')
				this.suppin = e
			},

			// 搜索
			searchSale(val) {
				console.log(val.detail.value, '输入')
				this.suppDep(val.detail.value)
			},
			//供应商下拉列表
			suppDep(name) {
				let data = {
					"supplierName": name,
					"userId": uni.getStorageSync('userid')
				}
				uni.request({
					url: this.url + '/WebApiInterface/Supplier/GetSupplierList_I',
					method: 'post',
					data: data,
					success: (res) => {
						this.supplierData = res.data.Data
						console.log(this.supplierData, '物资下拉')
					}
				})
			},
			// 取消
			cancell() {
				uni.reLaunch({
					url:"quotation"
				})
			},
			// 保存
			submit() {
				let data = JSON.stringify(this.suppin)
				uni.reLaunch({
					url: "./quotation?suppin="+data
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		width: 100%;
		display: flex;
		flex-direction: column;

		.header {
			width: 100%;
			height: 126rpx;
			background: #FFFFFF;
			font-size: 16rpx;
			text-align: center;
			position: sticky;
			top: var(--window-top);
			z-index: 99;

			.search {
				width: 100%;
				height: 56rpx;
				display: flex;

				.input {
					width: 80%;
					margin: 20rpx 0 0 20rpx;
					position: relative;

					.icon {
						position: absolute;
						left: 37rpx;
						top: 28rpx;
						width: 27rpx;
						height: 27rpx;
						// background-color: #999999;

						image {
							width: 29rpx;
							height: 29rpx;
							margin-top: -2rpx;
						}
					}

					.see {
						width: 100%;
						height: 78rpx;
						border-radius: 40rpx;
						font-size: 24rpx;
						font-family: PingFang SC;
						color: #737373;
						background: #F7F7F7;
						text-align: left;
						padding-left: 90rpx;

						.placeinput {
							font-size: 24rpx;
							font-family: PingFang SC;
							font-weight: 400;
							line-height: 33rpx;
							color: #737373;
							margin-left: 9rpx;
						}
					}
				}
			}
		}

		.maximum {
			background: #fff;

			.name {
				font-size: 30rpx;
			}



		}

		.btnbom {
			width: 100%;
			height: 200rpx;
		}

		.bom {
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 160rpx;
			background-color: #FFFFFF;
			display: flex;
			flex-direction: row;
			justify-content: space-around;
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
				font-weight: 400;
				border: 1rpx solid #2798FD;
				box-shadow: 0rpx 5rpx 10rpx rgba(39, 152, 253, 0.4);
				color: #2798FD;
			}

			.prbtn {
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 400;
				border: 1rpx solid #2798FD;
				box-shadow: 0rpx 5rpx 10rpx rgba(39, 152, 253, 0.4);
			}
		}
	}
</style>
