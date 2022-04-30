<template>
	<view class="page">
		<view class="Info">
			<view class="head">
				<text class="top">
					供应商
				</text>
				<view class="headop">
					<view class="heaadd">
						<text>供应商名称</text>
						<input v-model="supplierForm.F_SupplierName" disabled />
					</view>
				</view>
				<view class="headop">
					<view class="heaadd">
						<text>供应商简称</text>
						<input v-model="supplierForm.F_Abbreviation" disabled />
					</view>
				</view>
				<view class="headop">
					<view class="heaadd">
						<text>联系人</text>
						<input v-model="supplierForm.F_Contacts" disabled />
					</view>
				</view>
				<view class="headop">
					<view class="heaadd">
						<text>联系方式</text>
						<input v-model="supplierForm.F_MoiblePhone" disabled />
					</view>
				</view>
				<view class="headop">
					<view class="heaadd">
						<text>供应商资质</text>
						<text v-if="supplierForm.F_Type == 1">优质</text>
						<text v-if="supplierForm.F_Type == 2">一般</text>
						<text v-if="supplierForm.F_Type == 3">差</text>
						<text v-if="supplierForm.F_Type == 4">弃用</text>
					</view>
				</view>
				<view class="headtarear">
					<view class="heaadd">
						<text>营业执照附件</text>
					</view>
					<view class="image" v-if="supplierForm.F_BusinessLicenseFile != null">
						<view v-for="(item,index) in fileImg" :key="index">
							<image :src="item" @tap="onPreviewImage(index)">
							</image>
						</view>
					</view>
				</view>
				<view class="headop">
					<view class="heaadd">
						<text>户名</text>
						<input v-model="supplierForm.F_AccountName" disabled />
					</view>
				</view>
				<view class="headop">
					<view class="heaadd">
						<text>开户银行</text>
						<input v-model="supplierForm.F_BankDeposit" disabled />
					</view>
				</view>
				<view class="headop">
					<view class="heaadd">
						<text>银行账号</text>
						<input v-model="supplierForm.F_BankAccount" disabled />
					</view>
				</view>
				<view class="headop">
					<view class="heaadd">
						<text>付款方式</text>
						<text v-if="supplierForm.F_PaymentType == 1">现结</text>
						<text v-if="supplierForm.F_PaymentType == 2">欠款</text>
					</view>
				</view>
				<view class="headop">
					<view class="heaadd">
						<text>营业执照号</text>
						<input v-model="supplierForm.F_BusinessLicense" disabled />
					</view>
				</view>
				<view class="headop">
					<view class="heaadd">
						<text>详细地址</text>
						<input v-model="supplierForm.F_Address" disabled />
					</view>
				</view>
				<view class="headop">
					<view class="heaadd">
						<text>省/市/区</text>
						<text v-if="supplierForm.F_Province != null">{{supssq || ""}}</text>
					</view>
				</view>
				<view class="headop">
					<view class="heaadd">
						<text>坐标</text>
						<text>{{supplierForm.F_Remark2}}</text>
					</view>
				</view>
				<view class="headop">
					<view class="heaadd">
						<text>负责人</text>
						<text>{{supplierForm.F_Responsible}}</text>
					</view>
				</view>
				<view class="headop">
					<view class="heaadd">
						<text>主营范围</text>
						<text>{{supplierForm.F_MainBusinessScope}}</text>
					</view>
				</view>
				<view class="headop">
					<view class="heaadd">
						<text>结算周期</text>
						<text>{{supplierForm.F_Cycle}}</text>
					</view>
				</view>
				<view class="headop">
					<view class="heaadd">
						<text>收录日期</text>
						<text v-if="supplierForm.F_IncludedTime != null">{{supplierForm.F_IncludedTime | moment}}</text>
					</view>
				</view>
				<view class="headop">
					<view class="heaadd">
						<text>是否厂家</text>
						<text v-if="supplierForm.F_IsFactory == 1">是</text>
						<text v-if="supplierForm.F_IsFactory == 2">否</text>
					</view>
				</view>
				<view class="headtarea">
					<view class="heaadd">
						<text>说明</text>
						<text class="texnl">{{supplierForm.F_Description}}</text>
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
				supplierForm: {}, //详情
				fileImg : [] ,//营业执照附件
				supssq:""
			}
		},
		onLoad() {
			this.supplierInfo()
		},
		onNavigationBarButtonTap() {
			uni.reLaunch({
				url: './index'
			})
		},
		//物理返回键
		onBackPress(options) {
			uni.reLaunch({
				url: "./index"
			})
			return true
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
			supplierInfo() {
				let data = {
					id : this.$store.supdetail
				}
				console.log(uni.getStorageSync('userid'),'供应商')
				uni.request({
					url: this.url + '/WebApiInterface/Supplier/GetSupplierInfo',
					method:'POST',
					data:data,
					success: (res) => {
						this.supplierForm = res.data.Data
						if(this.supplierForm.F_BusinessLicenseFile){
							var fileList = this.supplierForm.F_BusinessLicenseFile.split(",")
							this.fileImg = fileList.map((item)=>{
								return this.url + item
							})
						}
						this.supssq = this.supplierForm.F_Province + '/' + this.supplierForm.F_City + '/' + this.supplierForm.F_Area
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.page {
		.Info {
			width: 93%;
			margin: auto;
			margin-top: 30rpx;
			background-color: #ffffff;
			border-radius: 9rpx;

			.head {
				width: 100%;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				padding: 30rpx;
				margin-bottom: 30rpx;
				.top {
					height: 38rpx;
					font-family: PingFang SC;
					font-weight: bold;
					line-height: 38rpx;
					color: #262626;
				}

				.headop {
					.heaadd {
						display: flex;
						flex-direction: row;
						justify-content: space-between;
						align-items: center;
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #666666;
						min-height: 90rpx;
						border-bottom: 1rpx solid #fafafa;

						input {
							text-align: right;
							font-size: 28rpx;
							font-family: PingFang SC;
							font-weight: 400;
						}
						text{
							width: 50%;
						}
						text:nth-child(2){
							text-align: right;
						}
					}

					.borbom {
						// margin-top: 30rpx;
						height: 1px;
						background: #fafafa;
						opacity: 1;
					}

					.placeinput {
						text-align: right;
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
				}
				.headtarear {
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					margin: 20rpx 0rpx;
					color: #666666;
					.image {
						border-radius: 5rpx;
						margin-top: 20rpx;
						display: flex;
						margin-left: 10rpx;
						align-items: center;
					
						image {
							width: 190rpx;
							height: 190rpx;
							margin-right: 20rpx;
							border-radius: 9rpx;
						}
					
					}
				}
			}
		}
	}
</style>
