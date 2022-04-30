<template>
	<view class="page">
		<view class="header">
			<view class="mid">
				<view class="steps" v-for="(item,index) in InfoList" :key="index">
					<view class="date">
						<text class="yuan"></text>
						<text>{{item.F_CreatorTime}}</text>
						<!-- <text>{{item.F_OperaType == 1?'采购入库':item.F_OperaType == 2?'销售出库':item.F_OperaType == 3?'盘亏':item.F_OperaType == 4?'盘盈':item.F_OperaType == 5?'销售入库':"--"}}</text> -->
						<text class="cgrk" v-if="item.F_OperaType == 1">采购入库</text>
						<text class="xsck" v-if="item.F_OperaType == 2">销售出库</text>
						<text class="pk" v-if="item.F_OperaType == 3">盘亏</text>
						<text class="py" v-if="item.F_OperaType == 4">盘盈</text>
						<text class="xsrk" v-if="item.F_OperaType == 5">销售入库</text>
					</view>
					<view class="proname">
						<text>{{item.F_MaterialName}}（{{item.F_MaterialCode}}）</text>
					</view>
					<view class="houseinfo">
						<view class="mid">
							<view class="left">
								<text>规&emsp;&emsp;格：</text>
								<text class="gg">{{item.F_Model}}</text>
							</view>
							<view class="left">
								<text>材&emsp;&emsp;质：</text>
								<text class="gg">{{item.F_Material}}</text>
							</view>
						</view>
						<view class="mid">
							<view class="left">
								<text>单&emsp;&emsp;位：</text>
								<text class="gg">{{item.F_Unit}}</text>
							</view>
							<view class="left">
								<text>操作数量：</text>
								<text class="gg">{{item.F_OperaNum}}</text>
							</view>
						</view>
						<view class="mide">
							<view class="left">
								<text>仓库名称：
									<text class="gg">{{item.F_WarehouseId}}</text>
								</text>
							</view>
						</view>
						<view class="mide">
							<view class="left">
								<text>总&nbsp;&nbsp;金&nbsp;额：
									<text class="gg">{{item.F_TotalMoney}}</text>
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
				InfoList: [],
				data: {},
			}
		},
		onLoad(options) {
			this.data = JSON.parse(options.data)
			console.log(this.data, 'data')
			this.houseinfo()
		},
		//顶部导航按钮-----修改
		onNavigationBarButtonTap(e) {
			uni.reLaunch({
				url:"examine"
			})
		},
		//物理返回键
		onBackPress(options){
			uni.reLaunch({
				url:"examine"
			})
			return true
		},
		methods: {
			houseinfo() {
				let data = {
					"materialId": this.data.F_MaterialId, //             [可选]材料ID
					"warehouseId": "", //             [可选]仓库ID
					"materialName": "", //            [可选]材料名称
					"model": "", //                   [可选]规格
				}
				uni.request({
					url: this.url + '/WebApiInterface/Warehouse/GetStockRecord',
					method: 'POST',
					data: data,
					success: (res) => {
						this.InfoList = res.data.Data
						this.InfoList.forEach((item) => {
							item.F_CreatorTime = item.F_CreatorTime.slice(0, 10).split("-").join(".")
							item.F_TotalMoney = Number(item.F_TotalMoney).toFixed(2).toString()
								.replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, "$1,")
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		display: flex;
		width: 100%;
		flex-direction: column;
		background: #f3f3f3;
		margin-top: 30rpx;

		.header {
			width: 90%;
			// height: 200rpx;
			background: #ffffff;
			border-radius: 9rpx;
			margin: auto;
			margin-bottom: 50rpx;

			.mid {
				margin-top: 30rpx;

				.steps {
					width: 90%;
					margin-left: 40rpx;
					border-left: 1rpx solid #f2f2f2;
					margin-bottom: 30rpx;

					.date {
						width: 100%;
						display: flex;
						flex-direction: row;
						justify-content: space-between;
						align-items: center;
						font-size: 34rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #4c4c4c;

						.yuan {
							width: 18rpx;
							height: 18rpx;
							background-color: #FFFFFF;
							border: 8rpx solid #2798FD;
							border-radius: 50%;
							position: relative;
							left: -16rpx;
						}

						text:nth-child(2) {
							width: 60%;
							margin-left: -20rpx;
						}

						text:nth-child(3) {
							// width: 20%;
							// background: rgba(255, 0, 0, 0.07);
							// border: 1rpx solid #FF0000;
							border-radius: 50rpx;
							font-size: 27rpx;
							font-family: PingFang SC;
							font-weight: 400;
							// color: #FF0000;
							padding: 6rpx 25rpx;
							margin-right: 20rpx;
						}
						.cgrk{
							background: rgba(116, 100, 255, 0.07);
							border: 1px solid #7464FF;
							color: #7464FF;
						}
						.xsck{
							background: rgba(255, 153, 51, 0.07);
							border: 1px solid #FF9933;
							color: #FF9933;
						}
						.pk{
							background: rgba(255, 0, 0, 0.07);
							border: 1px solid #FF0000;
							color: #FF0000;
						}
						.py{
							background: rgba(255, 61, 0, 0.07);
							border: 1px solid #FF3D00;
							color: #FF3D00;
						}
						.xsrk{
							background: rgba(116, 100, 255, 0.07);
							border: 1px solid #7464FF;
							color: #7464FF;
						}
					}

					.proname {
						width: 100%;
						margin: 20rpx 40rpx;
						font-size: 30rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #000000;
					}

					.houseinfo {
						margin-left: 40rpx;
						display: flex;
						flex-direction: column;
						font-size: 26rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #888888;
						margin-top: -10rpx;
						.mid {
							display: flex;
							flex-direction: row;
							justify-content: space-between;
							.left {
								width: calc(50%);
								margin-top: -20rpx;
							}
							.left:nth-child(1){
								width: 50%;
							}
							.left:nth-child(2){
								// margin-left: 20rpx;
								width: 50%;
							}
						}
						.mide{
							display: flex;
							flex-direction: row;
							margin-top: 10rpx;
						}

						.gg {
							margin-right: 30rpx;
							color: #000000;
						}
					}

				}
			}
		}
	}
</style>
