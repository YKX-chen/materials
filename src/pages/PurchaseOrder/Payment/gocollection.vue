<template>
	<view class="content">
		<view class="detail">
			<view class="code">
				<view class="title"> 账单 </view>
				<view class="purchasecode">
					<view>账单编号</view>
					<view>{{ GetInfoByIdData.F_Code }}</view>
				</view>
			</view>
			<view class="name">
				<view>账单日期</view>
				<view>{{ GetInfoByIdData.F_Date|moment }}</view>
			</view>
			<view class="name">
				<view>客户名称</view>
				<view>{{ GetInfoByIdData.F_Customer }}</view>
			</view>
			<view class="name">
				<view>销售单号</view>
				<view>{{ GetInfoByIdData.saleCode }}</view>
			</view>
			<view class="name">
				<view>销售项目</view>
				<view>{{ GetInfoByIdData.proName}}</view>
			</view>
			<view class="name">
				<view>应付金额</view>
				<view>{{ GetInfoByIdData.F_ActualPayMoney }}</view>
			</view>
			<view class="name">
				<view>已付金额</view>
				<view>{{ GetInfoByIdData.F_PaidMoney }}</view>
			</view>
		</view>

		<!-- 付款信息 -->
		<view class="detail">
			<view class="codes">
				付款信息
			</view>
			<view class="name">
				<view>收款金额<span style="color: red; margin-left: 8rpx">*</span></view>
				<input type="number" v-model="purchaseForm.F_PayMoney" maxlength="10" placeholder="请输入付款金额"
					placeholder-class="placeinput" style="text-align: right; height: 90rpx; font-size: 28rpx"
					@blur="moneyes()" />
			</view>
			<view class="name">
				<view>收款日期<span style="color: red; margin-left: 8rpx">*</span></view>
				<picker mode="date" :value="beginDate" @change="bindDateChange">
					<view class="uni-input">{{beginDate}}
					</view>
				</picker>
			</view>
			<view class="payment">
				<view class="payments">
					<view>支付方式<span style="color: red; margin-left: 8rpx">*</span></view>
					<view class="uni-list" style="display: inline-block;margin-left:60rpx">
						<radio-group @change="radioChange">
							<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items"
								:key="item.value" style="display: inline-block; width: 200rpx">
								<view>
									<radio style="transform: scale(0.7); margin-left: 60rpx" :value="item.value"
										:checked="index === current" />
									<text>{{ item.name }}</text>
								</view>
							</label>
						</radio-group>
					</view>
				</view>
			</view>
			<view class="name" v-if="F_PayMethod==2">
				<view>付款账户<span style="color: red; margin-left: 8rpx">*</span></view>
				<input type="text" v-model="purchaseForm.F_PayAccount" placeholder="请输入支付账户"
					placeholder-class="placeinput" style="text-align: right; height: 90rpx; font-size: 28rpx" />
			</view>
			<view class="name" v-if="F_PayMethod==2">
				<view>开户银行<span style="color: red; margin-left: 8rpx">*</span></view>
				<input type="text" v-model="purchaseForm.F_PayBankDeposit" placeholder="请输入开户银行"
					placeholder-class="placeinput" style="text-align: right; height: 90rpx; font-size: 28rpx" />
			</view>
			<view class="name" v-if="F_PayMethod==2">
				<view>付款户名<span style="color: red; margin-left: 8rpx">*</span></view>
				<input type="text" v-model="purchaseForm.F_PayAccountName" placeholder="请输入付款户名"
					placeholder-class="placeinput" style="text-align: right; height: 90rpx; font-size: 28rpx" />
			</view>
			<view class="name" v-if="F_PayMethod==2">
				<view>收款账户<span style="color: red; margin-left: 8rpx">*</span></view>
				<input type="text" v-model="purchaseForm.F_ColAccount" placeholder="请输入收款账户"
					placeholder-class="placeinput" style="text-align: right; height: 90rpx; font-size: 28rpx" />
			</view>
			<view class="name" v-if="F_PayMethod==2">
				<view>开户银行<span style="color: red; margin-left: 8rpx">*</span></view>
				<input type="text" v-model="purchaseForm.F_ColBankDeposit" placeholder="请输入开户银行"
					placeholder-class="placeinput" style="text-align: right; height: 90rpx; font-size: 28rpx" />
			</view>
			<view class="name" v-if="F_PayMethod==2">
				<view>收款户名<span style="color: red; margin-left: 8rpx">*</span></view>
				<input type="text" v-model="purchaseForm.F_ColAccountName" placeholder="请输入收款户名"
					placeholder-class="placeinput" style="text-align: right; height: 90rpx; font-size: 28rpx" />
			</view>

			<view class="name">
				<view>备注</view>
			</view>
			<view class="text">
				<textarea v-model="purchaseForm.F_Description" placeholder="请输入备注" placeholder-class="placeinput"
					maxlength="100" />
			</view>
			<view class="name">
				<view>支付凭证</view>
			</view>
			<view class="upimg">
				<uploadImgs @uploadImg="getUploadImg"></uploadImgs>
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
	import uploadImgs from "../../../components/uploadImgs.vue";
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

				F_PayMethod: "1", //支付方式
				current: 0,
				items: [{
						value: "1",
						name: "现金",
					},
					{
						value: "2",
						name: "转账",
					},
				],
			}
		},
		components: {
			uploadImgs,
		},
		onLoad(option) {
			this.GetBillInfo();
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
			// 收款金额
			moneyes() {
				console.log(this.purchaseForm.F_PayMoney, '收款金额')
				var money = this.purchaseForm.F_PayMoney
				money = String(money).replace(/[^\d.]/g, '') //过滤到非数字  //清除“数字”和“.”以外的字符
				money = String(money).replace(/^\./g, "") //必须保证第一个为数字而不是.
				money = String(money).replace(/\.{2,}/g, ".") //只保留第一个. 清除多余的
				money = String(money).replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
				money = String(money).replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3"); //只能输入两个小数
				// money = parseInt(money)
				if (isNaN(money)) {
					money = 0
				}
				var val = []
				val.push(this.purchaseForm.F_PayMoney)
				let num = Number(val.toString().split(".")[1])
				console.log(val, num, 'v')
				this.$set(this.purchaseForm, 'F_PayMoney', Number(money))
				console.log(money, '输入')
				// let num = this.GetInfoByIdData.F_ActualPayMoney - this.GetInfoByIdData.F_PaidMoney
				// if (Number(this.purchaseForm.F_PayMoney) > Number(num)) {
				// 	this.purchaseForm.F_PayMoney = num
				// 	// console.log('大大大大')
				// }
			},

			//  根据账单ID获取账单信息
			GetBillInfo: function(e) {
				uni.request({
					url: this.url + "/WebApiInterface/Collection/GetBillInfo",
					method: "POST",
					data: {
						voucherId: this.$store.collectionid, //id
					},
					success: (res) => {
						// console.log(res, ' 根据账单ID获取账单信息');
						this.GetInfoByIdData = res.data.Data.vocuher; //账单
						this.purchaseForm.F_ColAccount = res.data.Data.vocuher.colInfo.colAccount
						this.purchaseForm.F_ColBankDeposit = res.data.Data.vocuher.colInfo.colAccountName
						this.purchaseForm.F_ColAccountName = res.data.Data.vocuher.colInfo.colBankDeposit
						this.purchaseForm.F_PayAccount = res.data.Data.vocuher.colInfo.payAccount
						this.purchaseForm.F_PayBankDeposit = res.data.Data.vocuher.colInfo.payAccountName
						this.purchaseForm.F_PayAccountName = res.data.Data.vocuher.colInfo.payBankDeposit


						this.purchaseForm.F_PayMoney = this.GetInfoByIdData.F_ActualPayMoney - this
							.GetInfoByIdData.F_PaidMoney
						console.log(this.GetInfoByIdData, "账单");
					},
				});
			},





			// 付款提交
			PaySubmit(Data) {
				uni.request({
					url: this.url + "/WebApiInterface/Collection/PaySubmit",
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
				var Form = {
					"F_VoucherId": this.$store.collectionid, //账单表ID
					"F_PayMoney": this.purchaseForm.F_PayMoney, //收款金额
					"F_Date": this.beginDate, //收款日期
					"F_PayMethod": this.F_PayMethod, //支付方式(1.现金 2.转账) 
					"F_PayAccount": this.purchaseForm.F_PayAccount, //付款账户
					"F_PayBankDeposit": this.purchaseForm.F_PayBankDeposit, //付款开户银行
					"F_PayAccountName": this.purchaseForm.F_PayAccountName, //付款户名
					"F_ColAccount": this.purchaseForm.F_ColAccount, //收款账户
					"F_ColBankDeposit": this.purchaseForm.F_ColBankDeposit, //收款开户银行
					"F_ColAccountName": this.purchaseForm.F_ColAccountName, //收款户名
					"F_Description": this.purchaseForm.F_Description, //备注
					"F_Files": Files, //支付凭证
					"F_CreatorUserId": uni.getStorageSync('userid') //操作人
				};
				var list = {
					"F_VoucherId": this.$store.collectionid, //账单表ID
					"F_PayMoney": this.purchaseForm.F_PayMoney, //收款金额
					"F_Date": this.beginDate, //收款日期
					"F_PayMethod": this.F_PayMethod, //支付方式(1.现金 2.转账) 
					"F_Description": this.purchaseForm.F_Description, //备注
					"F_Files": Files, //支付凭证
					"F_CreatorUserId": uni.getStorageSync('userid') //操作人
				}
				console.log(Form,'提交的')
				console.log(list,'list')
				if (this.F_PayMethod == '1') {
					if (
						this.purchaseForm.F_PayMoney == null |
						!Form.F_Date |
						!Form.F_PayMethod
					) {
						uni.showToast({
							icon: "none",
							title: "带红色星号的是必填项,请填写完整",
						});
					}if(this.purchaseForm.F_PayMoney == 0){
							uni.showToast({
								icon: "none",
								title: "收款金额不能为0",
							});
						}
					 else {
						this.PaySubmit(list)
					}
				} else {
					if (
						this.purchaseForm.F_PayMoney == null | !Form.F_Date | !Form.F_PayMethod | !Form.F_PayAccount | !Form.F_PayBankDeposit |
						!Form.F_PayAccountName | !Form.F_ColAccount | !Form.F_ColBankDeposit | !Form.F_ColAccountName
					) {
						uni.showToast({
							icon: "none",
							title: "带红色星号的是必填项,请填写完整",
						});
					}
					if(this.purchaseForm.F_PayMoney == 0){
						uni.showToast({
							icon: "none",
							title: "收款金额不能为0",
						});
					}
					 else {
						this.PaySubmit(Form)
					}
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
				padding: 30rpx 0 20rpx 30rpx;
				font-family: PingFang SC;
				font-weight: bold;
				line-height: 48rpx;
				color: #262626;
			}

			.code {
				height: 150rpx;
				background: #ffffff;
				padding: 40rpx 30rpx 0 30rpx;

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
				padding: 0 30rpx;

				picker {
					// width: 22%;
					height: 60rpx;
					line-height: 60rpx;
					border-radius: 50rpx;
					// background-color: #F7F7F7;
					color: #737373;
					font-size: 28rpx;
					// padding-left: 20rpx;
				}
			}
			.upimg{
				margin-left: 30rpx;
				margin-top: -20rpx;
				padding-bottom: 30rpx;
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
