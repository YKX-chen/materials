<template>
	<view class="box">
		<!-- 导航栏 -->
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
				<!-- <view class="screen">
					<view class="icon">
						<image
							src="http://purchase.zhroot.com/attached/appImgs/Cslices/icon%EF%BC%8F%E7%AD%9B%E9%80%89@2x.png">
						</image>
					</view>
					筛选
				</view> -->
			</view>
		</view>


		<!-- 卡片部分 -->
		<view class="containersale" v-for="(item,index) in cardata" :key="index">
			<view class="matermid" @click="examinfo(item)">
				<view class="mater">
					<text>{{item.F_MaterialName}}</text>
					<view class="icon">
						<image src="http://purchase.zhroot.com/attached/appImgs/proslices/%E7%AE%AD%E5%A4%B4.png">
						</image>
					</view>
				</view>
				<view class="matercode">
					<text class="code">
						材料编码：
						<text>{{item.F_Code}}</text>
					</text>
					<text class="cz">
						材质：
						<text>{{item.F_Material}}</text>
					</text>
				</view>
				<view class="dibux"></view>
				<view class="matermodel">
					<view class="mid">
						<text>规格</text>
						<text class="gg">{{item.F_Model || "-"}}</text>
					</view>
					<view class="mid">
						<text>单位</text>
						<text class="gg">{{item.F_Unit || "-"}}</text>
					</view>
					<view class="mid">
						<text>库存数量</text>
						<text class="gg">{{item.F_CurrentNum || "-"}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="nullcop"></view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				cardata: [],
				searcinput: "", //搜索
				index: 0,
			};
		},
		onLoad() {
			this.materdcg();
		},
		created() {},
		onReachBottom() {
		},
		//顶部导航按钮-----修改
		onNavigationBarButtonTap(e) {
			uni.reLaunch({
				url:"warehouse"
			})
		},
		//物理返回键
		onBackPress(options){
			uni.reLaunch({
				url:"warehouse"
			})
			return true
		},
		methods: {
			//点击跳转详情页
			examinfo(item) {
				console.log(item, 'fid')
				let data = {
					F_MaterialId:item.F_MaterialId,
					F_MaterialName:item.F_MaterialName,
					F_Model:item.F_Model
				}
				data = JSON.stringify(data)
				uni.reLaunch({
					url: "./warehouseinfo?data="+data
				})
			},

			// 物资库存
			materdcg(){
				var data = {
					"warehouseId": uni.getStorageSync('warehouseid'),//[可选] 仓库ID 
					"materialName": this.searcinput //[可选] 材料名称 / 材料编号
				};
				uni.request({
					url: this.url + "/WebApiInterface/Warehouse/StockInfo",
					method: "POST",
					data: data,
					success: (res) => {
						console.log(res, "cardata采购单分页列表(移动端)");
						this.cardata = res.data.Data
					},
				});
			},
			//搜索
			searchSale(val) {
				console.log(val, "输入的内容");
				this.materdcg();
			},
		},
	};
</script>

<style lang="scss">
	* {
		box-sizing: border-box;
		padding: 0;
		margin: 0;
		list-style: none;
	}

	.box {
		display: flex;
		width: 100%;
		flex-direction: column;
		background: #f3f3f3;

		.bigdialog {
			margin-top: 120rpx;
			padding: 0 20rpx;

			.dialoginput {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-around;
				margin-bottom: 60rpx;

				text {
					width: 42%;
					font-size: 36rpx;
				}

				picker {
					width: 56%;
					height: 60rpx;
					line-height: 60rpx;
					border-radius: 50rpx;
					background-color: #F7F7F7;
					color: #737373;
					font-size: 24rpx;
					padding-left: 20rpx;
				}

				button {
					width: 36%;
					height: 60rpx;
					font-size: 26rpx;
					line-height: 60rpx;
					border-radius: 50rpx;
				}
			}
		}


		.header {
			width: 100%;
			height: 120rpx;
			background: #ffffff;
			font-size: 16rpx;
			text-align: center;
			position: sticky;
			top: var(--window-top);
			z-index: 99;

			.nav {
				height: 82rpx;
				display: flex;

				.navbar {
					flex: 1;
					line-height: 82rpx;
					font-size: 30rpx;
				}
			}

			.search {
				width: 100%;
				height: 118rpx;
				display: flex;

				.input {
					width: 95%;
					margin: 20rpx 0 0 30rpx;
					margin: auto;
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
						// width: 565rpx;
						height: 78rpx;
						border-radius: 40rpx;
						font-size: 24rpx;
						font-family: PingFang SC;
						color: #737373;
						background: #f7f7f7;
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

				// 筛选按钮
				.screen {
					margin: 41rpx 0 0 30rpx;
					font-size: 26rpx;
					font-family: PingFang SC;

					.icon {
						margin-top: 4rpx;
						margin-right: 10rpx;
						display: inline-block;
						height: 31rpx;
						width: 28rpx;

						// background-color: #999999;
						image {
							height: 31rpx;
							width: 28rpx;
						}
					}
				}
			}
		}


		.containersale {
			position: relative;
			display: flex;
			flex-direction: column;
			padding: 0 30rpx;
			.matermid {
				margin: auto;
				margin-top: 30rpx;
				width: 100%;
				height: auto;
				background-color: #ffffff;
				padding-bottom: 20rpx;
				border-radius: 9rpx;
				overflow: hidden;

				.mater {
					margin-top: 30rpx;
					display: flex;
					flex-direction: row;

					text {
						font-size: 34rpx;
						font-family: PingFang SC;
						font-weight: bold;
						line-height: 60rpx;
						color: #000000;
						width: 60%;
						margin-left: 30rpx;
					}
				}

				.matercode {
					margin-left: 30rpx;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					line-height: 60rpx;
					color: #888888;

					.code {
						width: 50%;

						text {
							color: #000000;
						}
					}

					.cz {
						width: 46%;

						text {
							font-size: 22rpx;
							font-family: PingFang SC;
							font-weight: 400;
							line-height: 60rpx;
							color: #6fbafd;
							padding: 6rpx 20rpx;
							background: rgba(39, 152, 253, 0.07);
							border: 1rpx solid #72bcfd;
							opacity: 1;
							border-radius: 9rpx;
						}
					}
				}

				.dibux {
					width: 100%;
					height:3rpx;
					border-bottom: 1rpx solid #f2f2f2;
					margin-top: 20rpx;
				}

				.matermodel {
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;
					height: auto;
					.mid {
						width: calc(33.1% - 20rpx);
						display: flex;
						flex-direction: column;
						align-items: center;
						margin-top: 20rpx;
						font-size: 26rpx;
						.gg {
							width: 100%;
							text-align: center;
							color: #333333;
							word-wrap: break-word;
							word-break: normal;
						}

						text {
							margin-top: 6rpx;
							font-size: 28rpx;
							color: #999999;
						}
					}
					.mid:nth-child(2){
						border-right: 1rpx solid #f2f2f2;
						border-left: 1rpx solid #f2f2f2;
					}
					.mid:nth-child(3n) {
						margin-right: 0;
					}

					.mid:nth-last-child(1) {
						border-right: none;
					}
				}

				.icon {
					width: 40%;
					height: 44rpx;

					image {
						float: right;
						width: 24rpx;
						height: 46rpx;
						margin-right: 30rpx;
					}
				}
			}
		}

		.nullcop {
			width: 100%;
			height: 50rpx;
		}

		.close {
			padding-left: 20rpx;
		}

		.selectContent {
			display: flex;
			width: 100%;
			flex-direction: column;

			.selectBox {
				display: flex;
				width: 100%;
				flex-direction: column;

				.selectTitle {
					width: 100%;
					font-weight: bold;
					font-size: 32rpx;
					line-height: 60rpx;
				}

				.list {
					display: flex;
					width: 100%;
					flex-wrap: wrap;

					.btn {
						width: calc(46% - 20rpx);
						background: #f6f8fa;
						color: #888888;
						height: 70rpx;
						line-height: 70rpx;
						font-size: 30rpx;
						margin-right: 30rpx;
						text-align: center;
						margin-bottom: 30rpx;
						border-radius: 8rpx;
					}

					.btn:nth-child(4n) {
						margin-right: 0;
					}

					.btn.this {
						background: #2798fd;
						color: #fff;
					}
				}
			}
		}
	}
</style>
