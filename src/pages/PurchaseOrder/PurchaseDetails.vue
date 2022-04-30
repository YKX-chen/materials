<template>
	<view class="content">
		<view class="detail">
			<view class="derop">
				<view class="code">
					<view class="title">
						采购单
					</view>
				</view>
				<view class="name">
					<view>采购单编号</view>
					<view>{{GetInfoByIdData.F_Code}}</view>
				</view>
				<view class="name">
					<view>供应商名称</view>
					<view>{{GetInfoByIdData.F_SupplierName}}</view>
				</view>
				<view class="name">
					<view>供应商联系人</view>
					<view>{{GetInfoByIdData.F_Contacts}}</view>
				</view>
				<view class="name">
					<view>供应商联系电话</view>
					<view>{{GetInfoByIdData.F_MoiblePhone}}</view>
				</view>
				<view class="name">
					<view>采购员</view>
					<view>{{GetInfoByIdData.F_PurchaseId}}</view>
				</view>
				<view class="name">
					<view>采购员联系电话</view>
					<view>{{GetInfoByIdData.F_Remark}}</view>
				</view>
				<view class="name">
					<view>状态</view>
					<view v-if="GetInfoByIdData.F_Status==0">待分派</view>
					<view v-if="GetInfoByIdData.F_Status==1">待采购</view>
					<view v-if="GetInfoByIdData.F_Status==2">待验收</view>
					<view v-if="GetInfoByIdData.F_Status==3">已办结</view>
				</view>
				<view class="name">
					<view>备注</view>
					<view>{{GetInfoByIdData.F_Description}}</view>
				</view>
			</view>
		</view>

		<view class="record" v-if="GetInfoByIdList.length>0">
			<view class="title">
				采购单明细
			</view>
			<view class="list" v-for="(item,index) in GetInfoByIdList" :key="index">
				<view class="subhead">
					<view class="date date1">
						<!-- 制单日期 -->
						{{GetInfoByIdData.F_Register|moment}}
					</view>
					<view class="name">
						物资编码：
						<text>{{item.F_MaterialCode||"-"}}</text>
					</view>
				</view>
				<view class="material">
					<view class="opwid">物资名称:{{item.F_MaterialName}}</view>
					<view class="contact">
						<view class="people">
							规格：
							<text>{{item.F_Model}}</text>
						</view>
						<view class="phone">
							材质：
							<text>{{item.F_Material}}</text>
						</view>
						<!-- <view class="phone">
							单位：
							<text>{{item.F_Unit}}</text>
						</view> -->
					</view>
					<view class="contact">
						<view class="people" v-show="GetInfoByIdData.F_Status!=0&&GetInfoByIdData.F_Status!=1">
							到货/采购数量：
							<text>{{item.F_ArrivalNum}}/{{item.F_PurchaseNum}}</text>
						</view>
						<view class="phone">
							单位：
							<text>{{item.F_Unit}}</text>
						</view>
					</view>
					<view class="suppjg">
						<view class="supbj">
							<text class="supptop">
								{{ item.F_TotalPrice }}
								<text class="small">元</text>
							</text>
							<text class="suppbom">采购金额(含税)</text>
						</view>
						<view class="supbj">
							<text class="supptop">
								{{item.F_Price||0}}
								<text class="small">元</text>
							</text>
							<text class="suppbom">单价(含税)</text>
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
		<!-- v-if="GetInfoByIdList.length<=0" -->
		<!-- <view class="noway"></view> -->
		<view class="process">
			<view class="probod">
				<view class="salehead">
					<text class="salete">流程明细</text>
				</view>
				<view class="probox" v-for="(item,index) in processList">
					<view class="tree"></view>
					<view class="rightpro">
						<view class="protop">
							<text v-if="item.type == 1">分派采购单</text>
							<text v-if="item.type == 2">完成采购</text>
							<text v-if="item.type == 3">验收</text>
							<text v-if="item.type == 4">应付账单</text>
							<text v-if="item.type == 5">审批</text>
							<text v-if="item.type == 6">支付</text>
							<text>{{item.info.length>0?item.info[0].OperterTime:''}}</text>
						</view>
						<view class="textop" v-show="item.info.length != 0">
							<text>{{item.info.length > 0 ? item.info[0].Description : ""}}操作人是 【 {{item.info.length > 0 ? item.info[0].Operter : ""}} 】</text>
						</view>
						<view class="probom" v-for="(items,index) in item.info" v-show="index!=0">
							<view class="tree2"></view>
							<view class="toptitle">
								<text>{{items.OperterTime}}</text>
							</view>
							<view class="midpro">
								<text>{{items.Description}}操作人是 【 {{items.Operter}} 】</text>
							</view>
						</view>
						<view class="probom" v-if="item.info.length == 0">
							<view class="midpro">
								<text>暂未开始</text>
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
				GetInfoByIdData: {},
				GetInfoByIdList: [],
				fid: "",
				processList:[]
			}
		},
		onLoad(option) {
			// console.log(this.id, '采购单id')
			// this.fid = option.fid
			this.GetInfoByIdDep()
			this.processDep()
		},
		created() {},
		//顶部导航按钮-----修改
		onNavigationBarButtonTap(e) {
			uni.reLaunch({
				url: "PurchaseOrder"
			})
		},
		//物理返回键
		onBackPress(options) {
			uni.reLaunch({
				url: "PurchaseOrder"
			})
			return true
		},
		methods: {
			// 根据采购单ID获取采购信息
			GetInfoByIdDep: function(e) {
				// var formdata = e.detail.value
				uni.request({
					url: this.url + '/WebApiInterface/OrderPurchase/GetInfoById',
					method: 'POST',
					// header: {
					// 	Authorization: uni.getStorageSync('Authorization')
					// },
					data: {
						"id": this.$store.PurchaseId//采购单id
					},
					success: (res) => {
						// console.log(res, '根据采购单ID获取采购信息'); F_TotalPrice
						this.GetInfoByIdData = res.data.Data.orderPurchaseEntity //采购单
						this.GetInfoByIdList = res.data.Data.orderPurchaseDetailsEntity //采购单明细
						this.GetInfoByIdData.F_Register = this.GetInfoByIdData.F_Register.slice(0, 10)

						console.log(this.GetInfoByIdData, '采购单');
						console.log(this.GetInfoByIdList, '采购单明细');
					}
				});
			},
			//流程明细
			processDep(){
				uni.request({
					url:this.url + '/WebApiInterface/OrderPurchase/GetProProcess',
					method:'POST',
					data:{
						orderId:this.$store.PurchaseId
					},
					success: (res) => {
						this.processList = res.data.Data
						console.log(this.processList,'流程明细列表')
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	* {
		padding: 0;
		margin: 0;
	}

	.content {
		background: #F3F3F3;
		// padding: 30rpx;
		margin-top: 30rpx;

		.detail {
			width: 92%;
			overflow: hidden;
			margin: 0 30rpx;
			background-color: #FFFFFF;
			border-radius: 9rpx;

			.derop {
				padding: 30rpx;
			}

			.code {
				// height: 160rpx;
				// background: #FFFFFF;
				// padding: 40rpx 30rpx 0 30rpx;
				// border-bottom: 1rpx solid #FAFAFA;
				padding-bottom: 20rpx;

				.title {
					font-family: PingFang SC;
					font-weight: bold;
					line-height: 48rpx;
					color: #262626;
				}

				.purchasecode {
					display: flex;
					margin-top: 40rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					color: #666666;
					justify-content: space-between;
				}
			}

			.name {
				display: flex;
				justify-content: space-between;
				height: 90rpx;
				// background: #FFFFFF;
				font-size: 28rpx;
				font-family: PingFang SC;
				line-height: 90rpx;
				color: #666666;
				// padding: 0 30rpx;
				border-bottom: 1rpx solid #FAFAFA;
			}
		}

		.record {
			background: #FFFFFF;
			margin: 30rpx;
			overflow: hidden;
			border-radius: 9rpx;

			.title {
				margin: 39rpx 0 0 30rpx;
				line-height: 48rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #262626;
			}

			.list {
				// padding-bottom: 30rpx;
				padding: 30rpx;
				border-bottom: 1rpx solid #FAFAFA;

				.subhead {
					display: flex;
					justify-content: space-between;

					// padding: 31rpx 47rpx 0 38rpx;
					.date {
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

					.date::before {
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

					.date::after {
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

					.date.date1 {
						background: #4D6CE9;
					}

					.date.date1::before {
						border-top-color: #4D6CE9;
					}

					.name {
						font-size: 26rpx;
						font-family: PingFang SC;
						line-height: 37rpx;
						color: #808080;

						text {
							color: #333333;
						}
					}
				}

				.material {
					margin: 30rpx;

					.opwid {
						font-family: PingFang SC;
						font-weight: bold;
						line-height: 45rpx;
						color: #262626;
						font-size: 30rpx;
					}
					.contact {
						width: 100%;
						display: flex;
						justify-content: space-between;
						margin-top: 20rpx;
						font-size: 26rpx;
						font-family: PingFang SC;
						line-height: 37rpx;
						color: #808080;
					
						text {
							color: #333333;
						}
					}
					.suppjg {
						width: 100%;
						height: 120rpx;
						background: rgba(39, 152, 253, 0.05);
						display: flex;
						flex-direction: row;
						justify-content: space-around;
						margin-top: 20rpx;
					
						.supbj {
							display: flex;
							flex-direction: column;
							justify-content: center;
							align-items: center;
							width: calc(33.1%-20rpx);
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

				

				.number {
					// margin: auto;
					// margin-top: 19rpx;
					// width: 565rpx;
					// height: 104rpx;
					// background: rgba(39, 152, 253, 0.05);
					// display: flex;
					// justify-content: space-between;
					width: 85%;
					margin: auto;
					height: 120rpx;
					background: rgba(39, 152, 253, 0.05);
					display: flex;
					flex-direction: row;
					justify-content: space-around;
					margin-bottom: 12rpx;

					.purchasemoney {
						text-align: center;

						.son {
							margin: 14rpx 0 8rpx 0;
							font-size: 30rpx;
							font-family: PingFang SC;
							font-weight: bold;
							line-height: 28rpx;
							color: #2798FD;
							opacity: 0.6;
						}

						.money {
							font-size: 22rpx;
							font-family: PingFang SC;
							color: #2798FD;
							opacity: 0.6;
						}
					}
				}
			}

		}

		.noway {
			width: 690rpx;
			height: 419rpx;
			background: #FFFFFF;
			border-radius: 9rpx;
			text-align: center;
			margin-top: 30rpx;
			line-height: 419rpx;
			color: rgba(153, 153, 153, 0.5);
		}
		// ------------------   流程明细样式   ---------------
		.process {
			background-color: #fff;
			width: 93%;
			margin: 30rpx;
			border-radius: 9rpx;
		
			.probod {
				padding: 30rpx;
		
				.salehead {
					margin-bottom: 30rpx;
		
					.salete {
						font-size: 32rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #262626;
					}
				}
		
				.probox {
					border-left: 1rpx solid #f2f2f2;
					display: flex;
					flex-direction: row;
					padding-bottom: 20rpx;
		
					.tree {
						width: 26rpx;
						height: 26rpx;
						background-color: #2798fd;
						border-radius: 50%;
						position: relative;
						left: -12rpx;
					}
		
					.rightpro {
						width: 100%;
						margin-top: -9rpx;
						font-size: 22rpx;
						.textop{
							margin-top: 9rpx;
						}
						.tree2 {
							width: 12rpx;
							height: 12rpx;
							background-color: #e4e7ed;
							border-radius: 50%;
							position: relative;
							left: -32rpx;
							top: 30rpx;
						}
						.protop{
							font-size: 22rpx;
							color: #2798fd;
							
							text:nth-child(1) {
								font-size: 26rpx;
								font-family: PingFang SC;
								font-weight: bold;
								margin-right: 20rpx;
							}
						}
						.toptitle {
							font-size: 22rpx;
							color: #2798fd;
							margin-top: 9rpx;
						}
						.midooo{
							font-size: 24rpx;
							text{
								margin: 12rpx 0;
							}
							margin-bottom: 20rpx;
						}
		
						.midpro {
							font-size: 24rpx;
							// margin: 12rpx 0;
							width: 100%;
							display: flex;
							flex-direction: column;
							text{
								margin: 9rpx 0;
							}
						}
					}
				}
			}
		
		}
		.phone{
			width: 40%;
		}
		.people{
			width: 60%;
		}
	}
</style>
