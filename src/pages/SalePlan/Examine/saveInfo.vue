<template>
	<view class="page">
		<!-- 需求计划详情部分 -->
		<view class="header">
			<view class="heamid">
				<text class="heatop">
					对账
					<!-- <view class="borbom"></view> -->
				</text>
				<view class="headop">
					<view class="heaadd">
						<text>项目</text>
						<text>{{materialForm.F_Remark2}}-{{materialForm.F_Remark1}}</text>
					</view>
				</view>
				<view class="headop">
					<view class="heaadd">
						<text>账期</text>
						<text>{{materialForm.F_AccountDate|moment}}</text>
					</view>
				</view>
				<view class="headop">
					<view class="heaadd">
						<text>账单金额(含税)</text>
						<text>{{materialForm.F_SalePrice}}</text>
					</view>
				</view>
				<view class="headop">
					<view class="heaadd1">
						<text>备注</text>
						<text class="texnl" v-if="materialForm.F_Description == null"></text>
						<text class="texnl2" v-if="materialForm.F_Description != null">{{materialForm.F_Description}}</text>
					</view>
				</view>
				<view class="headop">
					<view class="heaadd1">
						<text>对账凭证</text>
						<view class="upimg">
							<image v-for="(item,index) in imgsrclist" :key="index"
								:src="'http://purchase.zhroot.com' + item" mode="" @click="clickImg"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 询价记录 -->
		<view class="materbomm">
			<view class="sale">
				<!-- 头部文字 -->
				<view class="salehead">
					<text class="salete">账单明细</text>
				</view>
				<view class="salehead">
					<text v-if="materData.length<=0" class="salete"
						style="color: rgba(0, 0, 0, 0.5);">别看了,当前无询价记录</text>
				</view>
				<view v-for="(item, index) in materData" :key="index">
					<!-- 日期和询价人 -->
					<view class="marginsale">
						<view class="saleheadop saleheadop1">
							<text class="opsale">{{ item.F_SaleDate | moment }}</text>
						</view>
						<view class="righttext">
							<text class="rigxj">物资编码：<text class="riguse">{{
                  item.F_MaterialCode
                }}</text></text><!-- 采购员 -->
						</view>
					</view>
					<!-- 供应商 -->
					<view class="marginmid">
						<view class="supptext">
							<text>物资名称：<text>{{ item.F_MaterialName }}</text></text>
						</view>
						<view class="suppcon">
							<view>
								<text>规格：</text>
								<text>{{item.F_Model}}</text>
							</view>
							<view>
								<text>数量：</text>
								<text>{{item.F_SaleNum}}</text>
							</view>
							<view>
								<text>单位：</text>
								<text>{{item.F_Unit}}</text>
							</view>
						</view>
						<view class="suppjg">
							<view class="supbj">
								<text class="supptop">
									{{ item.F_SaleTotalPrice }}
									<text class="small">元</text>
								</text>
								<text class="suppbom">合计金额</text>
							</view>
							<view class="supbj">
								<text class="supptop">
									{{item.F_Price||0}}
									<text class="small">元</text>
								</text>
								<text class="suppbom">单价(不含税)</text>
							</view>
							<view class="supbj">
								<text class="supptop">
									{{ item.F_TaxRate }}
									<text class="small">%</text>
								</text>
								<text class="suppbom">税率</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bom" v-if="status=='1'">
			<button type="warn" class="plabtn" @click="cancell(1)">拒绝</button>
			<button type="primary" class="prbtn" @click="cancell(2)">通过</button>
		</view>
		<!-- 弹出层begin -->
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog :type="msgtype" title="驳回说明" :before-close="true" @confirm="dialogConfirm"
				@close="dialogClose">
				<view class="submitj">
					<textarea v-model="explain" placeholder="请输入内容" placeholder-class="placeinput" maxlength="100" />
				</view>
			</uni-popup-dialog>
		</uni-popup>
		<!-- 弹出层end -->
		<view class="matsupbom" v-if="status=='1'"></view>
		<view class="matsup" v-if="status=='2'"></view>
	</view>
</template>

<script>
	let page = 1,
		rows = 10;
	export default {
		data() {
			return {
				saleid: "",
				materialForm: {},
				materData: [],
				imgsrclist: [],
				numplace: "请输入数量",
				requestMore: true, //是否还有数据
				msgtype: "warn", //弹出层的类型
				explain: "", //审批驳回时说明
				data: {},
				status: "" //判断是否为审批
			};
		},
		onLoad(option) {
			this.status = option.status
			this.materList();
		},
		//物理返回键
		onBackPress(options) {
			uni.reLaunch({
				url: "Examine"
			})
			return true
		},
		//顶部导航按钮-----修改
		onNavigationBarButtonTap(e) {
			uni.reLaunch({
				url: "Examine"
			})
		},
		methods: {
			materList() {
				uni.request({
					url: this.url + "/WebApiInterface/SaleBill/GetInfo",
					method: "post",
					data: {
						id: this.$store.saveid
					},
					success: (res) => {
						this.materialForm = res.data.Data.saleStatementsEntity;
						this.materData = res.data.Data.details;
						if (this.materialForm.F_Files) {
							this.imgsrclist = this.materialForm.F_Files.split(',')
						}
					},
				});
			},
			// 点击图片放大查看
			clickImg() {
				let arr = []
				this.imgsrclist.forEach(item => {
					arr.push('http://purchase.zhroot.com' + item)
				})
				console.log(arr, '放大图片')
				wx.previewImage({
					urls: arr, //需要预览的图片http链接列表，多张的时候，url直接写在后面就行了
					current: '', // 当前显示图片的http链接，默认是第一个
					success: function(res) {},
					fail: function(res) {},
					complete: function(res) {},
				})
			},
			//拒绝  1   通过   2
			cancell(type) {
				console.log(type, 'type')
				this.data = {
					"id": this.$store.saveid, // [必填]销售单主键ID
					"type": "approval", //[必填]类型 （submit 提交， approval 审批） 
					"explain": "", //[可选] 审批驳回时说明
					"approvalType": '通过', //[可选]审批类型  审批时必填（通过  拒绝）
					"userId": uni.getStorageSync('userid') //[必填]用户ID
				}
				if (type == 1) {
					this.$refs.popup.open()
				} else {
					this.submit(this.data)
				}
			},
			//弹出层   确定
			dialogConfirm(data) {
				this.data.approvalType = '拒绝'
				this.data.explain = this.explain
				this.submit(this.data)
				this.$refs.popup.close();
			},
			submit(data) {
				console.log(data, 'data')
				uni.request({
					url: this.url + '/WebApiInterface/SaleBill/Approval',
					method: 'POST',
					data: data,
					success: (res) => {
						if (res.data.StatusCode == 200) {
							this.$refs.popup.close();
							uni.reLaunch({
								url: "./Examine"
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.Info
							})
						}
					}
				})
			},
			//弹出层   取消
			dialogClose() {
				this.explain = ""
				this.$refs.popup.close();
			}
		},
	};
</script>

<style lang="scss" scoped>
	.page {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		// ---------------------  需求计划  ----------------
		.header {
			width: 93%;
			height: auto;
			background-color: #ffffff;
			margin-top: 30rpx;
			border-radius: 9rpx;

			.heamid {
				width: 92%;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				padding: 30rpx;

				.heatop {
					height: 38rpx;
					// font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: bold;
					line-height: 38rpx;
					margin: 0 0rpx 30rpx 0rpx;
					color: #262626;

					.borbom {
						margin: 20rpx 0rpx;
						height: 1px;
						background: #fafafa;
						opacity: 1;
					}
				}
			}
		}

		.headop {
			.upimg {
				image {
					display: inline-block;
					width: 180rpx;
					height: 180rpx;
					margin-right: 20rpx;
					border-radius: 9rpx;
				}
			}

			.heaadd1 {
				display: flex;
				flex-direction: column;
				width: 100%;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #666666;

				text:nth-child(1) {
					height: 90rpx;
					line-height: 90rpx;
					border-bottom: 1rpx solid #fafafa;
				}

				.texnl {
					width: 100%;
				}

				.texnl2 {
					width: 100%;
					height: 200rpx;
					word-wrap: break-word;
					word-break: normal;
				}

				// text:nth-child(2) {
				// 	margin-top: 20rpx;
				// 	width: 100%;
				// 	height: 200rpx;
				// 	border-bottom: 1rpx solid #fafafa;
				// 	word-wrap: break-word;
				// 	word-break: normal;
				// }

			}

			.placeinput {
				text-align: right;
			}
		}

		.heaadd {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #666666;
			height: 90rpx;
			border-bottom: 1rpx solid #fafafa;

			input {
				text-align: right;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
			}

			.texjj {
				width: 70%;
				text-align: right;
				margin-right: -12rpx;
			}

			.pickright {
				image {
					width: 24rpx;
					height: 46rpx;
				}
			}
		}


		// ------------------  询价记录   -------------------
		.materbomm {
			width: 93%;
			background-color: #ffffff;
			margin-top: 30rpx;
			border-radius: 9rpx;

			.sale {
				padding: 30rpx;

				.salehead {
					margin-bottom: 30rpx;

					.salete {
						font-size: 32rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #262626;
					}

					image {
						width: 172rpx;
						height: 60rpx;
					}
				}

				.marginsale {
					width: 100%;
					display: flex;
					flex-direction: row;
					justify-content: space-around;

					.righttext {
						width: 70%;
						text-align: right;

						.rigxj {
							font-size: 26rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #808080;

							.riguse {
								font-size: 26rpx;
								font-family: PingFang SC;
								font-weight: 400;
								color: #333333;
							}
						}
					}
				}

				.saleheadop {
					height: 60rpx;
					font-size: 28rpx;
					line-height: 60rpx;
					font-family: PingFang SC;
					display: flex;
					flex-direction: row;
					justify-content: space-around;
					position: relative;
					padding: 0 20rpx;
					color: #FFFFFF;
					font-size: 24rpx;
					font-family: PingFang SC;
				}

				.saleheadop::before {
					content: '';
					position: absolute;
					display: inline-block;
					width: 0;
					height: 0;
					right: -30rpx;
					top: 0;
					border-top: 30rpx solid #4D6CE9;
					border-right: 30rpx solid transparent;
				}

				.saleheadop::after {
					content: '';
					position: absolute;
					display: inline-block;
					width: 0;
					height: 0;
					right: -30rpx;
					bottom: 0;
					border-bottom: 30rpx solid #4D6CE9;
					border-right: 30rpx solid transparent;
				}

				.saleheadop.saleheadop1 {
					background: #4D6CE9;
				}

				.saleheadop.saleheadop1::before {
					border-top-color: #4D6CE9;
				}

				.marginmid {
					padding: 30rpx;

					.supptext {
						font-size: 30rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #262626;
					}

					.suppcon {
						display: flex;
						flex-direction: row;
						justify-content: space-between;
						margin-bottom: 20rpx;
						width: 100%;

						text {
							width: calc(33%);
							font-size: 26rpx;
							font-family: PingFang SC;
							font-weight: 400;
						}

						text:nth-child(1) {
							width: 45%;
							color: #808080;
						}

						text:nth-child(2) {
							width: 55%;
							color: #333333;
						}

						view:nth-child(1) {
							width: 45%;
						}

					}

					.suppjg {
						width: 100%;
						height: 120rpx;
						background: rgba(39, 152, 253, 0.05);
						display: flex;
						flex-direction: row;
						justify-content: space-around;
						margin-bottom: 12rpx;

						.supbj {
							display: flex;
							flex-direction: column;
							justify-content: center;
							align-items: center;

							.supptop {
								font-size: 32rpx;
								font-family: PingFang SC;
								font-weight: bold;
								color: #2798fd;

								.small {
									font-size: 20rpx;
									font-family: PingFang SC;
									font-weight: 400;
									color: #2798fd;
								}
							}

							.suppbom {
								font-size: 22rpx;
								font-family: PingFang SC;
								font-weight: 400;
								color: rgba(39, 152, 253, 0.6);
							}
						}
					}
				}
			}
		}

		.bom {
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 160rpx;
			background-color: #FFFFFF;
			display: flex;
			justify-content: space-around;
			align-items: center;
			padding: 0 10rpx;

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
				border: 1rpx solid rgba(255, 100, 100, 1);
				box-shadow: 0rpx 5rpx 10rpx rgba(255, 100, 100, 0.4);
			}

			.prbtn {
				font-size: 32rpx;
				font-family: PingFang SC;
				border: 1rpx solid #2798FD;
				box-shadow: 0rpx 5rpx 10rpx rgba(39, 152, 253, 0.4);
			}
		}

		.submitj {
			width: 95%;
			border: 1rpx solid #fafafa;
			border-radius: 9rpx;
			font-size: 28rpx;

			textarea {
				width: 100%;
			}

			.placeinput {
				font-size: 28rpx;
			}
		}

		.matsupbom {
			width: 100%;
			height: 200rpx;
		}

		.matsup {
			width: 100%;
			height: 60rpx;
		}
	}
</style>
