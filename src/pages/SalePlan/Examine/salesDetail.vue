<template>
	<view class="content">
		<view class="header" v-if="infoList.length !=0">
			<!-- v-if="info.F_SaleType == 1 || info.F_SaleType == 3 || info.F_SaleType == 4 || info.F_SaleType == 5" -->
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
		<view v-show="click == 0">
			<view class="detail">
				<view class="cg_a" v-if="infoList.length != 0"></view>
			<!-- 	<view
					v-if="info.F_SaleType == 1 || info.F_SaleType == 3 || info.F_SaleType == 4 || info.F_SaleType == 5"
					class="cg_a"></view> -->
				<view class="code">
					<text>销售明细</text>
				</view>
				<view class="name">
					<view>销售项目</view>
					<view>{{info.F_Remark2}}-{{info.F_Remark1}}</view>
				</view>
				<view class="name">
					<view>销售日期</view>
					<view>{{info.F_SaleDate|moment}}</view>
				</view>
				<view class="name">
					<view>物资编号</view>
					<view>{{info.F_MaterialCode}}</view>
				</view>
				<view class="name">
					<view>物资名称</view>
					<view>{{info.F_MaterialName}}</view>
				</view>
				<view class="name">
					<view>规格</view>
					<view>{{info.F_Model}}</view>
				</view>
				<view class="name">
					<view>单位</view>
					<view>{{info.F_Unit}}</view>
				</view>
				<view class="name">
					<view>销售数量</view>
					<view>{{info.F_SaleNum}}</view>
				</view>
				<view class="name">
					<view>单价</view>
					<view>{{info.F_Price}}</view>
				</view>
				<view class="name">
					<view>税率(%)</view>
					<view>{{info.F_TaxRate}}</view>
				</view>
				<view class="name">
					<view>税额</view>
					<view>{{info.F_TaxAamount}}</view>
				</view>
				<view class="name">
					<view>销售金额(含税)</view>
					<view>{{info.F_SaleTotalPrice}}</view>
				</view>
				<view class="name">
					<view>其他成本</view>
					<view>{{info.F_OtherCost}}</view>
				</view>
				<view class="name">
					<view>送货位置</view>
					<view>{{info.F_Location}}</view>
				</view>
				<view class="name">
					<view>备注</view>
					<view>{{info.F_Description}}</view>
				</view>
				<view class="name1">
					<view>销售凭证</view>
					<!-- <view class="imageinfo" v-if="info.F_Files == null">
						<image src="http://purchase.zhroot.com/attached/appImgs/saleplan/%E7%BB%84%204887.png">
						</image>
					</view> -->
					<view class="image" v-if="info.F_Files != null">
						<view v-for="(item,index) in fileImg" :key="index">
							<image :src="item" @click="clickImg">
							</image>
						</view>
					</view>
					<!-- <view>{{info.F_Files}}</view> -->
				</view>
			</view>
		</view>
		<view v-show="click == 1">
			<!-- <view
				v-if="info.F_SaleType == 1 || info.F_SaleType == 3 || info.F_SaleType == 4 || info.F_SaleType == 5"
				class="cg_a"></view> -->
				<view class="cg_a" v-if="infoList.length != 0"></view>
			<view class="record" v-if="infoList.length>0">
			
			<view class="title">
				销售物资清单
			</view>
			<view class="list" v-for="(item,index) in infoList" :key="index">
				<view class="subhead">
					<view class="name">
						物资编码:<span style="color: #000000;margin-left: 20rpx;">{{item.F_MaterialCode}}</span>
					</view>
				</view>
				<view class="subhead">
					<view class="name">
						物资名称:<span style="color: #000000;margin-left: 20rpx;">{{item.F_MaterialName}}</span>
					</view>
				</view>
				<view class="subhead">
					<view class="name">
						出库仓库:<span style="color: #000000;margin-left: 20rpx;">({{item.F_Remark}})</span>
					</view>
				</view>
				<view class="contact">
					<view class="son">
						<view class="people">
							规格:
						</view>
						<view class="peoples" style="color: rgb(50,157,253);">
							{{item.F_Model}}
						</view>
					</view>
					<view class="son">
						<view class="people">
							单位:
						</view>
						<view class="peoples">
							{{item.F_Unit}}
						</view>
					</view>
					<view class="son">
						<view class="people">
							出库数量:
						</view>
						<view class="peoples">
							{{item.F_OutStockNum}}
						</view>
					</view>
				</view>
			</view>
		</view>
		</view>
		
		<!-- v-if="info.F_Status=='1'" -->
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
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import uniPopupDialog from "@/components/uni-popup-dialog/uni-popup-dialog.vue"
	export default {
		data() {
			return {
				click: 0,
				info: {}, //详情
				infoList: [],
				msgtype: "warn", //弹出层的类型
				explain: "", //审批驳回时说明
				data:{},
				fileImg:[],
				status:""
			}
		},
		onLoad(option) {
			this.status = option.status
			this.GetInfo()
		},
		components: {
			uniPopup,
			uniPopupDialog
		},
		created() {},
		//顶部导航按钮-----修改
		onNavigationBarButtonTap(e) {
			uni.reLaunch({
				url: "Examine"
			})
		},
		//物理返回键
		onBackPress(options) {
			uni.reLaunch({
				url: "Examine"
			})
			return true
		},
		methods: {
			spanClick(type) {
				this.click = type
			},
			// 销售详情
			GetInfo: function(e) {
				// var formdata = e.detail.value
				uni.request({
					url: this.url + '/WebApiInterface/Sale/GetInfo',
					method: 'POST',
					// header: {
					// 	Authorization: uni.getStorageSync('Authorization')
					// },
					data: {
						"id": this.$store.saleid //[必填]销售单ID   
					},
					success: (res) => {
						console.log(res.data.Data, '销售详情');
						this.info = res.data.Data.sale
						if(this.info.F_Files){
							var fileList = this.info.F_Files.split(",")
							this.fileImg = fileList.map((item)=>{return this.url +  item})
						}
						this.infoList = res.data.Data.saleDetails
						console.log(this.info, '销售单信息');
						console.log(this.infoList, '销售单明细');
					}
				});
			},
			//拒绝  1   通过   2
			cancell(type) {
				console.log(type, 'type')
				this.data = {
					"id": this.$store.saleid, // [必填]销售单主键ID
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
					url: this.url + '/WebApiInterface/Sale/SaleSubmit',
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
		padding: 30rpx 0 180rpx 0;
		width: 100%;
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
		.cg {
			margin-top: 0rpx;
		}
		
		.cg_a {
			margin-top: 100rpx;
		}
		.detail {
			overflow: hidden;
			margin: 0 30rpx;
			.code {
				// height: 160rpx;
				background: #FFFFFF;
				padding: 30rpx;
				border-bottom: 1rpx solid #FAFAFA;

				text {
					font-family: PingFang SC;
					font-weight: bold;
					line-height: 48rpx;
					color: #262626;
				}
			}

			.name {
				display: flex;
				justify-content: space-between;
				height: 90rpx;
				background: #FFFFFF;
				font-size: 28rpx;
				font-family: PingFang SC;
				line-height: 90rpx;
				color: #666666;
				padding: 0 30rpx;
				border-bottom: 1rpx solid #FAFAFA;
			}
			.name1 {
				background: #FFFFFF;
				font-size: 28rpx;
				font-family: PingFang SC;
				color: #666666;
				padding: 30rpx;
			}
		}

		.record {
			background: #FFFFFF;
			margin: 30rpx 30rpx 0 30rpx;
			overflow: hidden;

			.title {
				// margin: 39rpx 0 0 30rpx;
				margin:  30rpx;
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
						background-image: url(http://purchase.zhroot.com/attached/appImgs/saleplan/%E8%B7%AF%E5%BE%84%208883.png);
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
	}
</style>
