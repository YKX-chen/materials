<template>
	<view class="content">
		<view class="header">
			<view class="nav">
				<view :class="['navbar',click==0?'inv-h-se':'']" @click="nav(0)">
					账单明细
					<view :class="['navbarxhx',click==0?'inv-h-sexhx':'']" @click="click=0"></view>
				</view>
				<view :class="['navbar',click==1?'inv-h-se':'']" @click="nav(1)">
					付款明细
					<view :class="['navbarxhx',click==1?'inv-h-sexhx':'']" @click="click=1"></view>
				</view>
				<view :class="['navbar',click==2?'inv-h-se':'']" @click="nav(2)">
					支付信息
					<view :class="['navbarxhx',click==2?'inv-h-sexhx':'']" @click="click=2"></view>
				</view>
			</view>
		</view>

		<!-- 账单 -->
		<view class="detail" v-if="click==0">
			<view class="code">
				<view class="title"> 账单 </view>
				<view class="purchasecode" style="font-weight: 400;">
					<view>账单编号</view>
					<view>{{ GetInfoByIdData.F_Code }}</view>
				</view>
			</view>
			<view class="name">
				<view>账单日期</view>
				<view>{{ GetInfoByIdData.F_Date|moment }}</view>
			</view>
			<view class="name">
				<view>状态</view>
				<view class="dzf" v-if=" GetInfoByIdData.F_Status==1">待支付</view>
				<view class="jq" v-if=" GetInfoByIdData.F_Status==2">结清</view>
				<view v-if=" GetInfoByIdData.F_Status==3">废弃</view>
				<view v-if=" GetInfoByIdData.F_Status==4">待审批</view>
			</view>
			<view class="name">
				<view>供应商名称</view>
				<view>{{ GetInfoByIdData.F_Supplier }}</view>
			</view>
			<view class="name">
				<view style="width: 120rpx;">地址</view>
				<view class="textmax">{{ GetInfoByIdData.supAddress }}</view>
			</view>
			<view class="name">
				<view>联系人</view>
				<view>{{ GetInfoByIdData.supContacts }}</view>
			</view>
			<view class="name">
				<view>联系电话</view>
				<view>{{ GetInfoByIdData.supMoiblePhone }}</view>
			</view>
			<view class="name">
				<view>采购单号</view>
				<view>{{ GetInfoByIdData.orderpurchaseCode }}</view>
			</view>
			<view class="name">
				<view>采购项目</view>
				<view>{{GetInfoByIdData.orderProCode}}-{{ GetInfoByIdData.orderProName }}</view>
			</view>
			<view class="name">
				<view>应付日期</view>
				<view>{{ GetInfoByIdData.F_DueDate |moment}}</view>
			</view>
			<view class="name">
				<view>账单金额</view>
				<view>{{ GetInfoByIdData.F_ActualPayMoney }}元</view>
			</view>
			<view class="name">
				<view>已付金额</view>
				<view>{{ GetInfoByIdData.F_PaidMoney }}元</view>
			</view>
			<view class="name">
				<view>税率(%)</view>
				<view>{{ GetInfoByIdData.F_Taxrate }}</view>
			</view>
			<view class="name">
				<view>税额</view>
				<view>{{ GetInfoByIdData.F_TaxAamount }}</view>
			</view>
			<view class="name">
				<view>备注</view>
				<view>{{ GetInfoByIdData.F_Description }}</view>
			</view>
		</view>

		<!-- 付款明细 -->
		<view class="detail" v-if="click==1">
			<view class="codes" style="border-bottom: 0;">
				<text> 付款明细 </text>
			</view>
			<view class="list">
				<view class="son">费用类型</view>
				<view class="son">备注</view>
				<view class="son">金额</view>
			</view>
			<view class="listson" v-for="(item,index) in GetBillList" :key="index">
				<view class="sonson" v-if="item.F_CostType==1">采购费</view>
				<view class="sonson" v-if="item.F_CostType==2">物流费</view>
				<view class="sonson" v-if="item.F_CostType==3">其它费用</view>
				<view class="sonson" v-if="item.F_CostType==4"></view>
				<view class="description">{{item.F_Description}}</view>
				<view class="sonson">¥{{item.F_CostMoney}}元</view>
			</view>
		</view>

		<!-- 支付信息 -->
		<view class="record" v-if="click==2&&payVoucher.length>0">
			<view class="title">
				支付信息
			</view>
			<view class="list" v-for="(item,index) in payVoucher" :key="index">
				<view class="subhead" v-if="item.F_PayMethod==2">
					<view class="name">
						付款账号:<span
							style="color: #000000;margin-left: 20rpx;">{{item.F_PayAccount}}/{{item.F_PayAccountName}}</span>
					</view>
				</view>
				<view class="subhead" v-if="item.F_PayMethod==2">
					<view class="name">
						收款账号:<span
							style="color: #000000;margin-left: 20rpx;">{{item.F_ColAccount}}/{{item.F_ColBankDeposit}}</span>
					</view>
				</view>
				<view class="subhead">
					<view class="name">
						经办人:<span style="color: #000000;margin-left: 20rpx;">{{item.F_CreatorUserId}}</span>
					</view>
				</view>
				<view class="contact">
					<view class="son">
						<view class="people">
							支付方式:
						</view>
						<view v-if="item.F_PayMethod==1" class="peoples" style="color: rgb(50,157,253);">
							现金
						</view>
						<view v-if="item.F_PayMethod==2" class="peoples" style="color: rgb(50,157,253);">
							转账
						</view>
					</view>
					<view class="son">
						<view class="people">
							付款金额:
						</view>
						<view class="peoples">
							{{item.F_PayMoney}}元
						</view>
					</view>
					<view class="son">
						<view class="people">
							付款日期:
						</view>
						<view class="peoples" v-if="item.F_Date">
							{{item.F_Date|moment}}
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="record" v-if="click==2&&payVoucher.length==0">
			<view class="title">
				支付信息
			</view>
			<view class="nurec">暂无支付信息</view>
		</view>
		<view class="bom" v-if="status == 1">
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
	</view>
</template>

<script>
	import uploadImg from "../../../components/uploadImg.vue";
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import uniPopupDialog from "@/components/uni-popup-dialog/uni-popup-dialog.vue"
	export default {
		data() {
			return {
				click: 0,

				GetInfoByIdData: {}, //账单信息
				GetBillList: [], //账单明细
				payVoucher: [], //支付信息
				msgtype: "warn", //弹出层的类型
				explain: "", //审批驳回时说明
				data:{},
				status:"",//判断是待办还是已办
			};
		},
		components: {
			uploadImg,
			uniPopup,
			uniPopupDialog
		},
		onLoad(option) {
			this.status = option.status
			this.GetInfoByIdDep();
		},
		created() {},
		computed: {},
		//顶部导航按钮-----修改
		onNavigationBarButtonTap(e) {
			uni.reLaunch({
				url: "./Examine"
			})
		},
		//物理返回键
		onBackPress(options) {
			uni.reLaunch({
				url: "./Examine"
			})
			return true
		},
		methods: {
			nav(num) {
				this.click = num
				// this.sales = []
				// this.CollectionList = []
			},

			// 根据账单ID获取账单信息
			GetInfoByIdDep: function(e) {
				uni.request({
					url: this.url + "/WebApiInterface/Payment/GetBillInfo",
					method: "POST",
					data: {
						voucherId: this.$store.paymentid, //id
					},
					success: (res) => {
						console.log(res, '根据账单ID获取账单信息');
						this.GetInfoByIdData = res.data.Data.vocuher; //账单信息
						this.GetBillList = res.data.Data.vocuher.voucherDetails; //账单明细
						this.payVoucher = res.data.Data.vocuher.payVoucher; //支付信息

						console.log(this.GetInfoByIdData, '账单信息');
						console.log(this.GetBillList, '账单明细');
						console.log(this.payVoucher, '支付信息');
					},
				});
			},
			//拒绝  1   通过   2
			cancell(type) {
				console.log(type, 'type')
				this.data = {
					"id": this.$store.paymentid, // [必填]销售单主键ID
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
			submit(data){
				console.log(data,'data')
				uni.request({
					url: this.url + '/WebApiInterface/Payment/Approval',
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

<style lang="scss">
	* {
		box-sizing: border-box;
		padding: 0;
		margin: 0;
		list-style: none;
	}

	.content {
		background: #f3f3f3;
		padding: 0rpx 0 30rpx 0;
		// margin: 0 30rpx;
		overflow: hidden;

		.header {
			width: 100%;
			height: 100rpx;
			background: #FFFFFF;
			font-size: 16rpx;
			text-align: center;
			position: fixed;
			z-index: 1;

			.nav {
				height: 82rpx;
				display: flex;

				.navbar {
					flex: 1;
					line-height: 82rpx;
					font-size: 30rpx;
				}
			}

		}

		.detail {
			width: 92%;
			margin: auto;
			margin-bottom: 200rpx;
			overflow: hidden;
			color: #666666;
			margin-top: 130rpx;
			background-color: #fff;

			.codes {
				font-family: PingFang SC;
				font-weight: bold;
				line-height: 48rpx;
				color: #262626;
				padding: 20rpx 20rpx 0 30rpx;
				margin-bottom: 30rpx;
			}

			.code {
				height: 180rpx;
				border-bottom: 1rpx solid #FAFAFA;

				.title {
					font-family: PingFang SC;
					font-weight: bold;
					line-height: 48rpx;
					color: #262626;
					padding: 20rpx 20rpx 0 30rpx;
				}

				.purchasecode {
					display: flex;
					margin-top: 40rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					justify-content: space-between;
					padding: 0 30rpx;
				}
			}

			.text {
				background-color: #fff;
				padding-left: 20rpx;
				font-size: 24rpx;
				height: 200rpx;
			}

			.name {
				display: flex;
				justify-content: space-between;
				height: 90rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				line-height: 90rpx;
				padding: 0 30rpx;
				border-bottom: 1rpx solid #FAFAFA;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;

				.dzf {
					color: #FF0000;
				}

				.jq {
					color: #31D5A2;
				}
			}

			.payment {
				.payments {
					height: 90rpx;
					line-height: 90rpx;
					display: flex;
					font-size: 28rpx;
					padding-left: 30rpx;
					// border-bottom: 1rpx solid #000000;
				}
			}

			.list {
				display: flex;
				font-size: 28rpx;
				justify-content: space-around;
				color: #333333;
				font-family: PingFang SC;
				padding-left: 20rpx;
				height: 60rpx;
				border-bottom: 1rpx solid #FAFAFA;

				.son {
					width: 30%;
					text-align: center;
				}
			}

			.listson {
				display: flex;
				font-size: 28rpx;
				justify-content: space-around;
				color: #333333;
				font-family: PingFang SC;
				padding-left: 20rpx;
				border-bottom: 1rpx solid #FAFAFA;

				.description {
					width: 30%;
					text-align: center;
					padding-bottom: 20rpx;
					// overflow: hidden;
					// word-break: break-all;
					// text-overflow: ellipsis;
					// display: -webkit-box;
					// -webkit-box-orient: vertical;
					// -webkit-line-clamp: 1;
				}

				.sonson {
					width: 30%;
					text-align: center;
					margin: 26rpx 0;
				}
			}
		}

		.record {
			background: #FFFFFF;
			margin: 130rpx 30rpx 0 30rpx;
			overflow: hidden;

			.nurec {
				height: 160rpx;
				line-height: 160rpx;
				text-align: center;
				margin: 30rpx;
				font-size: 28rpx;
				color: #808080;
			}

			.title {
				margin: 39rpx 0 0 30rpx;
				line-height: 48rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #262626;
			}

			.list {
				// margin-bottom: 30rpx;
				padding-bottom: 30rpx;
				border-bottom: 1px solid rgba(153, 153, 153, 0.1);

				.subhead {
					display: flex;
					justify-content: space-between;
					padding: 31rpx 47rpx 0 38rpx;


					.date {
						width: 172rpx;
						height: 60rpx;
						font-size: 24rpx;
						line-height: 60rpx;
						text-align: center;
						font-family: PingFang SC;
						color: #FFFFFF;
						// background-image: url(http://purchase.zhroot.com/attached/appImgs/saleplan/%E8%B7%AF%E5%BE%84%208883.png);
						background-size: 100% 100%;
					}

					.name {
						font-size: 26rpx;
						font-family: PingFang SC;
						line-height: 37rpx;
						color: #808080;

					}
				}

				.material {
					margin: 23rpx 30rpx 0 65rpx;
					font-family: PingFang SC;
					font-weight: bold;
					line-height: 45rpx;
					color: #262626;
					overflow: hidden;
					word-break: break-all;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
				}

				.contact {
					display: flex;
					justify-content: space-between;
					margin-top: 19rpx;
					margin-left: 40rpx;
					padding-right: 60rpx;
					font-size: 26rpx;
					font-family: PingFang SC;
					line-height: 37rpx;
					color: #808080;
					text-align: center;

					.son {
						flex: 1;

						&:nth-child(1) {
							border-right: 1rpx solid rgba(153, 153, 153, 0.2);
						}

						&:nth-child(2) {
							border-right: 1rpx solid rgba(153, 153, 153, 0.2);
						}

						.peoples {
							font-size: 28rpx;
							margin-top: 10rpx;
						}
					}
				}

				.number {
					margin: 19rpx 0 0 64rpx;
					width: 565rpx;
					height: 104rpx;
					background: rgba(39, 152, 253, 0.05);
					display: flex;
					justify-content: space-between;
					// padding: 12rpx 34rpx 0 30rpx;

					.purchasemoney {
						text-align: center;

						.son {
							margin: 14rpx 0 8rpx 0;
							font-size: 30rpx;
							font-family: PingFang SC;
							line-height: 28rpx;
							color: #2798FD;
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

		.inv-h-se {
			color: #2798FD;
			// border-bottom: 1px solid #2798FD;
		}

		.inv-h-sexhx {
			width: 47rpx;
			height: 8rpx;
			background-color: #2798FD;
			border-radius: 12rpx;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: bold;
			line-height: 45rpx;
			color: #2798FD;
			border-bottom: 1rpx solid #2798FD;
			margin: auto;
		}


		.invfn {
			background-color: #DEBC8D;
		}

		.textmax {
			overflow: hidden;
			word-break: break-all;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 1;
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
	}
</style>
