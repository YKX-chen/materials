<template>
	<view class="content">
		<view class="detail">
			<view class="bianju">
				<view class="code">
					<view class="title"> 账单 </view>
				</view>
				<view class="name">
					<view>账单日期</view>
					<view>{{ GetInfoByIdData.F_Date|moment }}</view>
				</view>
				<view class="name">
					<view>供应商名称</view>
					<view>{{ GetInfoByIdData.F_Supplier }}</view>
				</view>
				<view class="name">
					<view>采购单号</view>
					<view>{{ GetInfoByIdData.orderpurchaseCode }}</view>
				</view>
				<view class="name">
					<view>采购项目</view>
					<view>{{ GetInfoByIdData.orderProName }}</view>
				</view>
				<view class="name">
					<view>账单金额</view>
					<view>{{ GetInfoByIdData.F_ActualPayMoney }}</view>
				</view>
			</view>
		</view>
		<!-- 付款信息 -->
		<view class="detail">
			<view class="bianju">
				<view class="codes">
					发票凭证
				</view>
				<view class="name1">
					<view>发票凭证<span style="color: red; margin-left: 8rpx">*</span></view>
				</view>
				<view class="upimg">
					<uploadImgt @uploadImg="getUploadImg"></uploadImgt>
				</view>
			</view>

		</view>
		<view class="bom">
			<button type="primary" class="prbtn" @click="submit()">
				保存
			</button>
		</view>
	</view>
</template>

<script>
	import uploadImgt from "../../../components/uploadImgt.vue";
	export default {
		data() {
			const beginDate = this.getDate("begin")
			return {
				GetInfoByIdData: {}, //采购单
				// GetInfoByIdList: [], //采购单明细

				purchaseForm: {
					F_PayMoney: ""
				},
				beginDate: beginDate, //付款日期
				F_Files: [],
				suppList: [], //公司下拉
				suppId: "",
				index: 0,
				supptype: "请选择",
				current: 0,
			}
		},
		components: {
			uploadImgt,
		},
		onLoad(option) {
			this.GetBillInfo();
			this.suppDep()
		},
		//顶部导航按钮-----修改
		onNavigationBarButtonTap(e) {
			uni.reLaunch({
				url: "./Payment"
			})
		},
		//物理返回键
		onBackPress(options) {
			uni.reLaunch({
				url: "./Payment"
			})
			return true
		},
		methods: {
			//公司下拉选择
			suppxiala: function(e) {
				this.index = e.target.value
				console.log(this.index, 'index')
				this.supptype = this.suppList[this.index]
				for (let a = 0; a < this.supplierData.length; a++) {
					if (a == this.index) {
						this.supptype = this.supplierData[a].F_Name
						this.suppId = this.supplierData[a].F_Id
					}
				}
				console.log(this.supptype, this.suppId, 'ii')
			},
			//  根据账单ID获取账单信息
			GetBillInfo: function(e) {
				uni.request({
					url: this.url + "/WebApiInterface/Payment/GetBillInfo",
					method: "POST",
					data: {
						voucherId: this.$store.paymentid, //id
					},
					success: (res) => {
						// console.log(res, ' 根据账单ID获取账单信息');
						this.GetInfoByIdData = res.data.Data.vocuher; //账单
						this.purchaseForm.F_ColAccount = res.data.Data.vocuher.payInfo.colAccount
						this.purchaseForm.F_ColBankDeposit = res.data.Data.vocuher.payInfo.colAccountName
						this.purchaseForm.F_ColAccountName = res.data.Data.vocuher.payInfo.colBankDeposit
						this.purchaseForm.F_PayAccount = res.data.Data.vocuher.payInfo.payAccount
						this.purchaseForm.F_PayBankDeposit = res.data.Data.vocuher.payInfo.payAccountName
						this.purchaseForm.F_PayAccountName = res.data.Data.vocuher.payInfo.payBankDeposit


						this.purchaseForm.F_PayMoney = this.GetInfoByIdData.F_ActualPayMoney - this
							.GetInfoByIdData.F_PaidMoney
						console.log(this.GetInfoByIdData, "账单");
					},
				});
			},
			//公司下拉列表
			suppDep() {
				uni.request({
					url: this.url + '/WebApiInterface/Company/GetCompanyList',
					method: 'post',
					data: {
						"name": "",
						"enableMark": "1",
					},
					success: (res) => {
						this.supplierData = res.data.Data
						this.supplierData.forEach((item) => {
							this.suppList.push({
								name: item.F_Name,
							})
						})
						console.log(this.suppList, '客户')
					}
				})
			},
			// 付款提交
			PaySubmit(Data) {
				uni.request({
					url: this.url + "/WebApiInterface/Payment/Invoicing",
					method: "POST",
					data: Data,
					success: (res) => {
						// console.log(res, ' 付款提交');
						if (res.data.StatusCode == 200) {
							uni.reLaunch({
								url: "./Payment"
							})
						} else {
							uni.showToast({
								icon: "none",
								title: res.data.Info,
							});
						}
					},
				});
			},
			submit() {
				var Files = this.F_Files.join()
				var list = {
					"voucherId": this.$store.paymentid, //账单表ID
					"ticketFiles": Files, //支付凭证
					"userId": uni.getStorageSync('userid')
				}
				console.log(list, 'list')
				if (!list.ticketFiles) {
					uni.showToast({
						icon: "none",
						title: "带红色星号的是必填项,请填写完整",
					});
				} else {
					this.PaySubmit(list)
				}
			},

			// 支付凭证
			getUploadImg(res) {
				// console.log(res, "res支付凭证");
				this.F_Files = res;
				// console.log(this.F_Files, 'F_Files支付凭证')
			},
			// 支付方式
			radioChange: function(evt) {
				// console.log(evt.detail.value, "支付方式");
				this.F_PayMethod = evt.detail.value;
				console.log(this.F_PayMethod, '支付方式')
			},

			// 付款日期
			bindDateChange(e) {
				this.beginDate = e.target.value
			},

			getDate() {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
		}
	}
</script>

<style lang="scss">
	* {
		padding: 0;
		margin: 0;
		list-style: none;
	}

	.content {
		background: #f3f3f3;
		padding: 30rpx 0 170rpx 0;
		width: 100%;

		.bianju {
			padding: 30rpx;
		}

		.detail {
			width: 92%;
			overflow: hidden;
			color: #666666;
			background: #fff;
			margin: auto;
			margin-bottom: 30rpx;
			border-radius: 9rpx;

			.codes {
				height: 54rpx;
				margin: 20rpx 0;
				// padding: 30rpx 0 20rpx 30rpx;
				font-family: PingFang SC;
				font-weight: bold;
				line-height: 48rpx;
				color: #262626;
			}

			.code {
				// height: 150rpx;
				margin-bottom: 20rpx;
				background: #ffffff;
				// padding: 40rpx 30rpx 0 30rpx;

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
					justify-content: space-between;
				}
			}

			.text {
				// background-color: #fff;
				// padding-left: 20rpx;
				width: 90%;
				margin: auto;
				// font-size: 24rpx;
				height: 260rpx;

				textarea {
					width: 100%;
					font-size: 28rpx;
				}
			}

			.name {
				display: flex;
				justify-content: space-between;
				height: 90rpx;
				background: #ffffff;
				font-size: 28rpx;
				font-family: PingFang SC;
				line-height: 90rpx;
				// padding: 0 30rpx;
				border-bottom: 1rpx solid #fafafa;

				picker {
					width: 60%;
					text-align: right;

					.pickright {
						display: flex;
						flex-direction: row;
						align-items: center;
						float: right;

						.iopmg {
							width: 24rpx;
							height: 46rpx;
							margin-left: 3rpx;
							background-image: url(http://purchase.zhroot.com/attached/appImgs/proslices/%E7%AE%AD%E5%A4%B4.png);
							background-size: 100% 100%;
						}

					}
				}
			}

			.name1 {
				display: flex;
				justify-content: space-between;
				height: 90rpx;
				background: #ffffff;
				font-size: 28rpx;
				font-family: PingFang SC;
				line-height: 90rpx;
			}

			.upimg {
				width: 100%;
				margin-top: -20rpx;
				word-wrap: break-word;
				word-break: normal;
			}

			.payment {
				.payments {
					height: 90rpx;
					line-height: 90rpx;
					display: flex;
					background-color: #fff;
					font-size: 28rpx;
					padding-left: 30rpx;
				}
			}
		}

		.placeinput {
			font-size: 28rpx;
		}


		.bom {
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 160rpx;
			background-color: #ffffff;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;

			button {
				width: 92%;
				height: 80rpx;
				line-height: 80rpx;
				border: none;
				outline: none;
			}

			.prbtn {
				font-size: 32rpx;
				font-family: PingFang SC;
				border: 1rpx solid #2798fd;
				box-shadow: 0rpx 5rpx 10rpx rgba(39, 152, 253, 0.4);
			}
		}
	}
</style>
