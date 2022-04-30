<template>
	<view class="news">
		<view v-for="(item,index) in carData">
			<view class="list" @click="xqjh(item.F_MsgType,item)">
				<view class="left">
					<view class="icon">
						<view class="red" v-if="item.F_IsRemind == 1"></view>
						<image v-if="item.F_MsgType == 1" src="../../static/icon/sale.png">
						</image>
						<image v-if="item.F_MsgType == 2" src="../../static/icon/tjbj.png">
						</image>
						<image v-if="item.F_MsgType == 3" src="../../static/icon/sqcg.png">
						</image>
						<image v-if="item.F_MsgType == 4" src="../../static/icon/tycg.png">
						</image>
						<image v-if="item.F_MsgType == 5" src="../../static/icon/fprw.png">
						</image>
						<image v-if="item.F_MsgType == 6" src="../../static/icon/wccg.png">
						</image>
						<image v-if="item.F_MsgType == 7" src="../../static/icon/dhys.png">
						</image>
						<image v-if="item.F_MsgType == 8" src="../../static/icon/payment.png">
						</image>
						<image v-if="item.F_MsgType == 9" src="../../static/icon/xscz.png">
						</image>
						<image v-if="item.F_MsgType == 10" src="../../static/icon/xsdz.png">
						</image>
						<image v-if="item.F_MsgType == 11" src="../../static/icon/yfkx.png">
						</image>
						<image v-if="item.F_MsgType == 12" src="../../static/icon/yskx.png">
						</image>
						<image v-if="item.F_MsgType == 13" src="../../static/icon/yfk.png">
						</image>
						<image v-if="item.F_MsgType == 14" src="../../static/icon/ysk.png">
						</image>
						<image v-if="item.F_MsgType == 15" src="../../static/icon/lxsq.png">
						</image>
						<image v-if="item.F_MsgType == 16" src="../../static/icon/prolxsq.png">
						</image>
						<image v-if="item.F_MsgType == 17" src="../../static/icon/xjbh.png">
						</image>
						<image v-if="item.F_MsgType == 18" src="../../static/icon/suppersq.png">
						</image>
						<image v-if="item.F_MsgType == 19" src="../../static/icon/supper.png">
						</image>
						<image v-if="item.F_MsgType == 20" src="../../static/icon/fqyfzdsp.png">
						</image>
						<image v-if="item.F_MsgType == 21" src="../../static/icon/yfzdsp.png">
						</image>
						<image v-if="item.F_MsgType == 22" src="../../static/icon/fqyszdsp.png">
						</image>
						<image v-if="item.F_MsgType == 23" src="../../static/icon/yszdsp.png">
						</image>
					</view>
				</view>
				<view class="right">
					<view class="content">
						<view class="title">
							<text v-if="item.F_MsgType == 1">需求计划</text>
							<text v-if="item.F_MsgType == 2">提交报价</text>
							<text v-if="item.F_MsgType == 3">申请采购</text>
							<text v-if="item.F_MsgType == 4">采购审批</text>
							<text v-if="item.F_MsgType == 5">采购任务</text>
							<text v-if="item.F_MsgType == 6">完成采购</text>
							<text v-if="item.F_MsgType == 7">到货验收</text>
							<text v-if="item.F_MsgType == 8">销售登账</text>
							<text v-if="item.F_MsgType == 9">销售出账</text>
							<text v-if="item.F_MsgType == 10">销售对账</text>
							<text v-if="item.F_MsgType == 11">应付款项</text>
							<text v-if="item.F_MsgType == 12">应收款项</text>
							<text v-if="item.F_MsgType == 13">已付款</text>
							<text v-if="item.F_MsgType == 14">已收款</text>
							<text v-if="item.F_MsgType == 15">立项申请</text>
							<text v-if="item.F_MsgType == 16">立项审批</text>
							<text v-if="item.F_MsgType == 17">询价驳回</text>
							<text v-if="item.F_MsgType == 18">供应商申请</text>
							<text v-if="item.F_MsgType == 19">供应商审批</text>
							<text v-if="item.F_MsgType == 20">发起应付账单审批</text>
							<text v-if="item.F_MsgType == 21">应付账单审批</text>
							<text v-if="item.F_MsgType == 22">发起应收账单审批</text>
							<text v-if="item.F_MsgType == 23">应收账单审批</text>
							<text v-if="item.F_MsgType == 24">对账审批</text>
							<text v-if="item.F_MsgType == 25">对账审批</text>
							<text v-if="item.F_MsgType == 26">应付账单开票</text>
							<text v-if="item.F_MsgType == 27">应收账单开票</text>
						</view>
						<view class="data">
							<text>{{item.F_CreatorTime}}</text>
						</view>
					</view>
					<view class="cont">
						{{item.F_Content}}
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
				carData: []
			}
		},
		onLoad() {
			this.carDep()
		},
		//点击tab导航触发事件
		// onTabItemTap(e) {
		// 	console.log(e,'点击')
		// },
		//下拉刷新
		onPullDownRefresh() {
			uni.startPullDownRefresh({
				success: (res) => {
					this.carDep()
				}
			})
			//执行一次就刷新一次
			uni.stopPullDownRefresh()
			//setTimeout(function() {
				////暂停
				//uni.stopPullDownRefresh()
			//}, 1000)
		},
		methods: {
			carDep() {
				let data = {
					"rows": 20,
					"page": 1,
					"sidx": "F_CreatorTime",
					"sord": "asc",
					"userId": uni.getStorageSync('userid'), // [必填]人员ID
					"type": 1 // [可选]默认查询全部消息 1查询未读消息 2查询已读消息 3全部
				}
				uni.request({
					url: this.url + '/WebApiInterface/Work/GetMyMsg',
					method: 'POST',
					data: data,
					success: (res) => {
						this.carData = res.data.Data
						this.carData.forEach((item) => {
							if (item.F_CreatorTime) {
								item.F_CreatorTime = item.F_CreatorTime.slice(0, 16)
							}
							// if (item.F_Content.length > 20) {
							// 	item.F_Content = item.F_Content.slice(0, 20) + "..."
							// } else {
							// 	item.F_Content = item.F_Content
							// }

						})
					}
				})
			},
			xqjh(index, item) {

				uni.request({
					url: this.url + '/WebApiInterface/Work/UpdateMsgStatus',
					method: 'POST',
					data: {
						id: item.F_Id
					},
					success: (res) => {
						console.log(index, 'op')
						if (index === 1) {
							this.$store.saleid = item.F_LinkId
							uni.reLaunch({
								url: "../SalePlan/saleLook"
							})
						}
						if (index === 2) {
							this.$store.saleid = item.F_LinkId
							uni.reLaunch({
								url: "../SalePlan/saleLook"
							})
						}
						//申请采购
						if(index === 3){
							this.$store.saleid = item.F_LinkId
							if (item.F_Type == 1) {
								uni.reLaunch({
									url:"../SalePlan/Examine/saleplaninfo"
								})
							} else {
								uni.reLaunch({
									url:"../SalePlan/Examine/saleplaninfo?status="+1
								})
							}
							
						}
						if (index === 4) {
							if (item.F_Type == 1) {
								uni.reLaunch({
									url: "../PurchaseOrder/PurchaseOrder"
								})
							} else {
								this.$store.saleinfo = item.F_LinkId
								uni.reLaunch({
									url: "../SalePlan/sale/saleInfo"
								})
							}

						}
						if (index === 5) {
							this.$store.PurchaseId = item.F_LinkId
							uni.reLaunch({
								url: "../PurchaseOrder/PurchaseComplete"
							})
						}
						if (index === 6) {
							this.$store.PurchaseId = item.F_LinkId
							uni.reLaunch({
								url: "../PurchaseOrder/PurchaseDetails"
							})
						}
						if (index === 7) {
							this.$store.PurchaseId = item.F_LinkId
							uni.reLaunch({
								url: "../PurchaseOrder/PurchaseDetails"
							})
						}
						if (index === 8) {
							this.$store.saleinfo = item.F_LinkId
							uni.reLaunch({
								url: "../SalePlan/sale/saleInfo"
							})
						}
						if (index === 11) {
							this.$store.paymentid = item.F_LinkId
							uni.reLaunch({
								url: "../PurchaseOrder/Payment/paymentDetails"
							})
						}
						if (index === 12) {
							this.$store.collectionid = item.F_LinkId
							uni.reLaunch({
								url: "../PurchaseOrder/Payment/collectionDetails"
							})
						}
						if (index === 13) {
							this.$store.paymentid = item.F_LinkId
							uni.reLaunch({
								url: "../PurchaseOrder/Payment/paymentDetails"
							})
						}
						if (index === 14) {
							this.$store.collectionid = item.F_LinkId
							uni.reLaunch({
								url: "../PurchaseOrder/Payment/collectionDetails"
							})
						}
						if (index === 15) {
							this.$store.projectid = item.F_LinkId
							uni.reLaunch({
								url: "../SalePlan/Examine/projectDetail"
							})
						}
						if (index === 16) {
							this.$store.proid = item.F_LinkId
							uni.reLaunch({
								url: "../projectManagment/projectInfo"
							})
						}
						if (index === 17) {
							this.$store.saleid = item.F_LinkId
							uni.reLaunch({
								url: "../SalePlan/saleLook"
							})
						}
						if (index === 18) {
							this.$store.supplierid = item.F_LinkId
							uni.reLaunch({
								url: "../SalePlan/Examine/supplierDetail"
							})
						}
						//跳转到应付账单详情
						if (index === 20) {
							this.$store.paymentid = item.F_LinkId
							uni.reLaunch({
								url: "../PurchaseOrder/Payment/paymentDetails"
							})
						}
						if (index === 21) {
							if (item.F_Type == 1) {
								this.$store.paymentid = item.F_LinkId
								uni.reLaunch({
									url: "../PurchaseOrder/Payment/gopayment"
								})
							} else {
								this.$store.paymentid = item.F_LinkId
								uni.reLaunch({
									url: "../PurchaseOrder/Payment/paymentDetails"
								})
							}
						}
						if (index === 22) {
							this.$store.collectionid = item.F_LinkId
							uni.reLaunch({
								url: "../PurchaseOrder/Payment/collectionDetails"
							})
						}
						if (index === 23) {
							if (item.F_Type == 1) {
								this.$store.collectionid = item.F_LinkId
								uni.reLaunch({
									url: "../PurchaseOrder/Payment/gocollection"
								})
							} else {
								this.$store.collectionid = item.F_LinkId
								uni.reLaunch({
									url: "../PurchaseOrder/Payment/collectionDetails"
								})
							}
						}
						//对账审批 ---  通知对象--总经理 
						if (index === 24) {
							this.$store.saveid = item.F_LinkId
							let op = 2
							uni.reLaunch({
								url: "../SalePlan/Examine/saveInfo?status=" + op
							})
						}
						// //对账审批 ---  通知对象--对账单发起人
						// if (index === 25) {
						// 	this.$store.saveid = item.F_LinkId
						// 	uni.reLaunch({
						// 		url: "../SalePlan/Examine/saveInfo"
						// 	})
						// }
						//应付账单开票
						if (index === 26) {
							this.$store.paymentid = item.F_LinkId
							uni.reLaunch({
								url: "../PurchaseOrder/Payment/paymentDetails"
							})
						}
						//应收账单开票
						if (index === 26) {
							this.$store.collectionid = item.F_LinkId
							uni.reLaunch({
								url: "../PurchaseOrder/Payment/collectionDetails"
							})
						}
						this.carDep()
					}
				})

			}
		}
	}
</script>

<style lang="scss">
	.news {
		width: 100%;
		height: 100%;
		overflow-x: hidden; //隐藏横向滚动条
		display: flex;
		flex-direction: column;
		background: #fff;
		margin-top: 26rpx;

		.list {
			width: 100%;
			height: 134rpx;
			display: flex;
			border-bottom: 1rpx solid rgba(153, 153, 153, 0.1);

			.left {
				display: flex;
				align-items: center;
				margin: auto;
				margin-left: 35rpx;

				.icon {
					position: relative;
					display: flex;
					align-items: center;

					image {
						width: 92rpx;
						height: 92rpx;
					}

					.red {
						position: absolute;
						top: 0;
						right: 0;
						width: 20rpx;
						height: 20rpx;
						background-color: red;
						border-radius: 50%;
						z-index: 1;
					}
				}
			}

			.right {
				width: 85%;
				display: flex;
				flex-direction: column;
				margin-left: 12rpx;

				.cont {
					margin-top: 10rpx;
					font-size: 24rpx;
					font-family: PingFang SC;
					color: #999999;
					width: 80%;
					display: block;
					/*内联对象需加*/
					word-break: keep-all;
					/* 不换行 */
					white-space: nowrap;
					/* 不换行 */
					overflow: hidden;
					/* 内容超出宽度时隐藏超出部分的内容 */
					text-overflow: ellipsis;
					/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
				}

				.content {
					width: 100%;
					display: flex;
					flex-direction: row;
					justify-content: space-between;

					.title {
						width: 50%;
						margin-top: 23rpx;
						font-size: 32rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #000000;
					}

					.data {
						width: 40%;
						margin-top: 32rpx;
						font-size: 24rpx;
						font-family: PingFang SC;
						color: #999999;
					}

				}
			}




		}
	}
</style>
