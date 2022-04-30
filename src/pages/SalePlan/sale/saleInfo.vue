<template>
	<view class="page">
		<view class="header"
			v-if="materForm.F_SaleType == 1 || materForm.F_SaleType == 3 || materForm.F_SaleType == 4 || materForm.F_SaleType == 5">
			<view class="nav">
				<view :class="['navbar',click==0?'inv-h-se':'']" @click="spanClick(0)">
					销售明细
					<view :class="['navbarxhx',click==0?'inv-h-sexhx':'']"></view>
				</view>
				<view :class="['navbar',click==1?'inv-h-se':'']" @click="spanClick(1)">
					销售物资清单
					<view :class="['navbarxhx',click==1?'inv-h-sexhx':'']"></view>
				</view>
			</view>
		</view>
		<view class="content" v-show="click == 0">
			<view class="xsmx">
				<view
					v-if="materForm.F_SaleType == 1 || materForm.F_SaleType == 3 || materForm.F_SaleType == 4 || materForm.F_SaleType == 5"
					class="cg_a"></view>
				<view class="mx">
					<text class="tou">
						销售明细
						<view class="bom"></view>
					</text>
					<view class="headop">
						<view class="heaadd">
							<text>销售项目</text>
							<text
								v-if="materForm.F_Remark2 != null || materForm.F_Remark1 != null">{{materForm.F_Remark2}}-{{materForm.F_Remark1}}</text>
							<text v-if="materForm.F_Remark2 == null || materForm.F_Remark1 == null"></text>
							<!-- <input v-model="materForm.F_Remark1" disabled /> -->
						</view>
						<view class="borbom"></view>
					</view>
					<view class="headop">
						<view class="heaadd">
							<text>销售日期</text>
							<text>{{materForm.F_SaleDate | moment}}</text>
							<!-- <input v-model="materForm.F_SaleDate" disabled /> -->
						</view>
						<view class="borbom"></view>
					</view>
					<view class="headop">
						<view class="heaadd">
							<text>销售内容</text>
							<input v-model="xsnr" disabled />
						</view>
						<view class="borbom"></view>
					</view>
					<view class="headop">
						<view class="heaadd">
							<text>规格</text>
							<input v-model="materForm.F_Model" disabled />
						</view>
						<view class="borbom"></view>
					</view>
					<view class="headop">
						<view class="heaadd">
							<text>单位</text>
							<input v-model="materForm.F_Unit" disabled />
						</view>
						<view class="borbom"></view>
					</view>
					<view class="headop">
						<view class="heaadd">
							<text>销售数量</text>
							<input v-model="materForm.F_SaleNum" disabled />
						</view>
						<view class="borbom"></view>
					</view>
					<view class="headop">
						<view class="heaadd">
							<text>单价</text>
							<input v-model="materForm.F_Price" disabled />
						</view>
						<view class="borbom"></view>
					</view>
					<view class="headop">
						<view class="heaadd">
							<text>税率（%）</text>
							<input v-model="materForm.F_TaxRate" disabled />
						</view>
						<view class="borbom"></view>
					</view>
					<view class="headop">
						<view class="heaadd">
							<text>税额</text>
							<input v-model="materForm.F_TaxAamount" disabled />
						</view>
						<view class="borbom"></view>
					</view>
					<view class="headop">
						<view class="heaadd">
							<text>销售金额（不含税）</text>
							{{materForm.F_SaleTotalPrice-materForm.F_TaxAamount}}
						</view>
						<view class="borbom"></view>
					</view>
					<view class="headop">
						<view class="heaadd">
							<text>销售金额（含税）</text>
							<input v-model="materForm.F_SaleTotalPrice" disabled />
						</view>
						<view class="borbom"></view>
					</view>
					<view class="headop">
						<view class="heaadd">
							<text>其他成本</text>
							<input v-model="materForm.F_OtherCost" disabled />
						</view>
						<view class="borbom"></view>
					</view>
					<view class="headop">
						<view class="heaadd">
							<text>送货位置</text>
							<input v-model="materForm.F_Location" disabled />
						</view>
						<view class="borbom"></view>
					</view>
					<view class="headtarea">
						<view class="heaadd">
							<text>备注</text>
							<text class="texnl">{{materForm.F_Description}}</text>
							<!-- <textarea v-model="materForm.F_Description" disabled /> -->
						</view>
						<view class="bom"></view>
					</view>
					<view class="headtarear">
						<view class="heaadd">
							<text>销售凭证</text>
						</view>
						<!-- <view class="imageinfo" v-if="materForm.F_Files == null">
							<image src="http://purchase.zhroot.com/attached/appImgs/saleplan/%E7%BB%84%204887.png">
							</image>
						</view> -->
						<view class="image" v-if="materForm.F_Files != null">
							<view v-for="(item,index) in fileImg" :key="index">
								<image :src="item" @tap="onPreviewImage(index)">
								</image>
							</view>
						</view>
						<!-- <view class="borbom"></view> -->
					</view>
				</view>
			</view>
			<view class="nullcop"></view>
		</view>
		<view class="content" v-show="click == 1">
			<view class="xsmx">
				<view
					v-if="materForm.F_SaleType == 1 || materForm.F_SaleType == 3 || materForm.F_SaleType == 4 || materForm.F_SaleType == 5"
					class="cg_a"></view>
				<view class="mx">
					<text class="tou">
						销售物资清单
						<view class="bom"></view>
					</text>
					<view class="right" v-for="(item,index) in materData" :key="index">
						<view class="tope">
							<text class="rightlo">物资编号：<text>({{item.F_MaterialCode}})</text></text>
							<text class="rightlo">物资名称：<text>{{item.F_MaterialName}}</text></text>
							<text class="rightlo">出库仓库：<text>{{item.F_Remark}}</text></text>
						</view>
						<view class="bomm">
							<view class="mid">
								<text>规格</text>
								<text class="gg">{{item.F_Model|| ""}}</text>
							</view>
							<view class="mid">
								<text>单位</text>
								<text class="gg">{{item.F_Unit || ""}}</text>
							</view>
							<view class="mid">
								<text>出库数量</text>
								<text class="gg1">{{item.F_StockNum || 0}}</text>
							</view>
						</view>
						<!-- <view class="bom"></view> -->
					</view>
				</view>
			</view>
			<view class="nullcop"></view>
		</view>
	</view>
</template>

<script>
	import uploadImg from "../../../components/uploadImg.vue"
	export default {
		data() {
			return {
				click: 0,
				materForm: {},
				materData: [],
				xsnr: "",
				imgsrc: "",
				fid: "",
				fileImg: []
			}
		},
		components: {
			uploadImg
		},
		onLoad(option) {
			// this.fid = option.fid
			this.spaninfo()
		},
		//物理返回键
		onBackPress(options) {
			uni.reLaunch({
				url: "saleindex"
			})
			return true
		},
		//顶部导航按钮-----修改
		onNavigationBarButtonTap(e) {
			console.log(e.index, 'e')
			if (e.index == 1) {
				uni.reLaunch({
					url: "saleindex"
				})
			} else {
				if (this.materForm.F_Status == 0) {
					uni.reLaunch({
						url: "./salemodify"
					})
				} else {
					uni.showToast({
						icon: 'none',
						title: '不可修改'
					});
				}
			}


		},
		methods: {
			// 预览图片
			onPreviewImage(e) {
				console.log(e,'index')
				uni.previewImage({
					urls: this.fileImg,
					current: e
				})
			},
			spanClick(type) {
				this.click = type
			},
			spaninfo() {
				uni.request({
					url: this.url + '/WebApiInterface/Sale/GetInfo',
					method: 'POST',
					data: {
						// id: uni.getStorageSync('saleinfo') || this.fid
						id: this.$store.saleinfo
					},
					success: (res) => {
						this.materForm = res.data.Data.sale
						this.materData = res.data.Data.saleDetails
						if (this.materForm.F_Files) {
							var fileList = this.materForm.F_Files.split(",")
							this.fileImg = fileList.map((item) => {
								return this.url + item
							})
						}
						console.log(this.fileImg, 'pp')
						console.log(this.imgsrc,this.materForm.F_Files, 'imgsrc')
						// this.materForm.F_SaleDate = this.materForm.F_SaleDate.slice(0, 10)
						this.xsnr = [this.materForm.F_MaterialCode, this.materForm.F_MaterialName].join("-")
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		.header {
			width: 100%;
			height: 90rpx;
			padding-top: 20rpx;
			background: #ffffff;
			text-align: center;
			position: fixed;
			top: var(--window-top);
			z-index: 99;

			.nav {
				height: 110rpx;
				display: flex;

				.navbar {
					flex: 1;
					font-size: 30rpx;
				}
			}
		}

		.content {
			width: 90%;
			height: auto;
			background-color: #FFFFFF;
			margin: auto;
			margin-top: 30rpx;
			border-radius: 9rpx;

			.nullcop {
				width: 100%;
				height: 1rpx;
				margin-bottom: 60rpx;
			}

			.imageinfo {
				width: 190rpx;
				height: 190rpx;
				background-color: rgba(245, 248, 255, 0.9);
				border-radius: 5rpx;
				margin-top: 20rpx;
				display: flex;
				justify-content: center;
				align-items: center;

				image {
					width: 122rpx;
					height: 84rpx;
				}

			}

			.image {
				// width: 190rpx;
				// height: 190rpx;
				// background-color: rgba(245, 248, 255, 0.9);
				border-radius: 5rpx;
				margin-top: 20rpx;
				display: flex;
				margin-left: 10rpx;
				// justify-content: center;
				align-items: center;

				image {
					width: 190rpx;
					height: 190rpx;
					margin-right: 20rpx;
					border-radius: 9rpx;
				}

			}

			.xsmx {

				// margin-top: 150rpx;
				.cg {
					margin-top: 0rpx;
				}

				.cg_a {
					margin-top: 150rpx;
				}

				input {
					font-size: 28rpx;
				}

				background-color: #FFFFFF;
				border-radius: 9rpx;

				.mx {
					margin: 30rpx;
					padding-top: 30rpx;
					background-color: #FFFFFF;

					.tou {
						font-size: 34rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #262626;

					}

					.headop {
						.heaadd {
							display: flex;
							flex-direction: row;
							justify-content: space-between;
							height: 38rpx;
							font-size: 28rpx;
							font-family: PingFang SC;
							font-weight: 400;
							line-height: 38rpx;
							margin: 20rpx 0rpx;
							color: #666666;

							input {
								text-align: right;
							}

							.texjj {
								width: 70%;
								text-align: right;
								margin-right: -12rpx;

							}
						}

						.borbom {
							margin-top: 30rpx;
							height: 1px;
							background: #FAFAFA;
							opacity: 1;
						}

						.placeinput {
							text-align: right;
							color: #B3B3B3;
							font-size: 28rpx;
						}
					}

					.headtarea {
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #666666;

						.heaadd {
							display: flex;
							flex-direction: column;
							text:nth-child(1) {
								height: 90rpx;
								line-height: 90rpx;
							}
							.texnl {
								width: 100%;
								height: auto;
								padding-bottom: 20rpx;
								word-wrap: break-word;
								word-break: normal;
							}
						}
						.placeinput {
							color: #B3B3B3;
							font-size: 28rpx;
						}
					}

					.headtarear {
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 400;
						margin: 20rpx 0rpx;
						color: #666666;

					}

					.bom {
						margin: 20rpx 0rpx;
						height: 1px;
						background: #FAFAFA;
						opacity: 1;
					}

					.right {
						.tope {
							display: flex;
							flex-direction: column;

							.rightlo {
								font-size: 28rpx;
								color: #888888;
							}

							text {
								margin-bottom: 20rpx;
								font-size: 28rpx;
								color: #000000;
							}
						}

						.bomm {
							display: flex;
							flex-direction: row;
							justify-content: space-between;
							align-items: center;
							width: 90%;
							margin: auto;
							color: #999999;

							.mid {
								width: calc(33.1% - 20rpx);
								display: flex;
								flex-direction: column;
								justify-content: space-between;
								align-items: center;
								margin-top: 9rpx;
								font-size: 26rpx;
								width: 180rpx;

								.gg {
									width: 100%;
									text-align: center;
									color: #333333;
									word-wrap: break-word;
									word-break: normal;
								}

								.gg1 {
									width: 60%;
									text-align: left;
									color: #333333;
								}

								text {
									margin-top: 6rpx;
									font-size: 28rpx;

								}
							}

							.mid:nth-child(2) {
								border-right: 1rpx solid #f2f2f2;
								border-left: 1rpx solid #f2f2f2;
							}

							.mide {
								display: flex;
								flex-direction: column;
								justify-content: space-between;
								align-items: center;
								margin-top: 9rpx;
								font-size: 26rpx;
								width: 180rpx;

								.gg {
									color: #333333;
								}

								text {
									margin-top: 6rpx;
									font-size: 28rpx;
								}
							}

							.xian {
								width: 1rpx;
								height: 80rpx;
								margin-top: 20rpx;
								border-right: 1rpx solid #f2f2f2;
							}
						}
					}
				}
			}
		}



		.inv-h-se {
			width: 47rpx;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: bold;
			line-height: 45rpx;
			color: #2798fd;
		}

		.inv-h-sexhx {
			width: 47rpx;
			height: 8rpx;
			background-color: #2798fd;
			border-radius: 12rpx;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: bold;
			line-height: 45rpx;
			color: #2798fd;
			border-bottom: 1rpx solid #2798fd;
			margin: auto;
			margin-top: 16rpx;
		}
	}
</style>
