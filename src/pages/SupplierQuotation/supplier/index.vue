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
					<input class="see" v-model="searchinput" type="text" placeholder="请输入公司名称/联系人" @input="search"></input>
				</view>
			</view>
		</view>


		<!-- 卡片部分 -->
		<view class="content" v-if="supplier.length == 0 ">
			<view class="containersale">
				<view class="nullda">当前状态无数据</view>
			</view>
		</view>
		<view class="content">
			<view class="containersale" v-for="(item,index) in supplier" :key="index" @click="detail(item)">
				<view class="saletop">
					<view :class="['headleft','headleft'+item.F_Type]">
						<view class="text">
							{{item.F_Type == 1?'优质':item.F_Type == 2?'一般':item.F_Type == 3?'差':item.F_Type == 4?'弃用':'--'}}
						</view>
					</view>
					<view class="headright">
						<image src="http://purchase.zhroot.com/attached/appImgs/proslices/%E7%AE%AD%E5%A4%B4.png">
						</image>
					</view>
				</view>
				<view class="salebom">
					<view class="salemid">
						<text>{{item.F_SupplierName}}</text>
					</view>
					<view class="salecard">
						<text class="salegay">联系人：
							<text>{{item.F_Contacts}}</text>
						</text>
						<text class="salegay">联系方式：
							<text>{{item.F_MoiblePhone}}</text>
						</text>
					</view>
					<view class="salecard">
						<text class="salegay">负责人：
							<text class="hjprice2">{{item.F_Responsible}}</text>
						</text>
					</view>
					<view class="salecard">
						<text class="salegay">是否厂家：
							<text class="hjprices">
								<text v-if="item.F_IsFactory == 1">是</text>
								<text v-if="item.F_IsFactory == 2">否</text>
							</text>
						</text>
					</view>
				</view>
			</view>
		</view>
		<view class="cyko">
			<view class="cyclo" @click="Addsale()">
				<view class="cto"></view>
				<view class="cbom"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			const beginDate = this.getDate("begin")
			const currentDate = this.getDate({
				format: true,
			})
			return {
				butclick: "",
				searchinput: "", //搜索
				click: 0,
				requestMore: true, //是否还有数据(待办工作)
				requestMore1: true, //是否还有数据(已办工作)
				page: 1,
				page1: 1,
				urls: "/WebApiInterface/PersonalCenter/M_MyUpcoming",
				supplier: [], //供应商
			};
		},
		onLoad(option) {
			this.M_MyUpcoming(this.page, false);
		},
		created() {},
		onReachBottom() {
			if (this.requestMore) {
				this.page++
				this.M_MyUpcoming(this.page, false)
			}

		},
		//顶部导航按钮-----修改
		onNavigationBarButtonTap(e) {
			uni.reLaunch({
				url: "../../index"
			})
		},
		//物理返回键
		onBackPress(options) {
			uni.reLaunch({
				url: "../../index"
			})
			return true
		},
		methods: {

			// 供应商管理
			M_MyUpcoming(page, requestMore) {
				var data = {
					"rows": 5,
					"page": page,
					"sidx": "F_CreatorTime",
					"sord": "desc",
					"name": "",
					"userId": uni.getStorageSync('userid')
				};
				uni.request({
					url: this.url + '/WebApiInterface/Supplier/GetSupplierPageList',
					method: "POST",
					data: data,
					success: (res) => {
						console.log(res, "我的");
						if (res.data.total <= page) {
							this.requestMore = requestMore;
						}
						this.supplier = this.supplier.concat(res.data.Data)

					},
				});
			},
			//筛选
			search() {
				this.supinfo()
			},
			supinfo(){
				var data = {
					"rows": 5,
					"page": 1,
					"sidx": "F_CreatorTime",
					"sord": "desc",
					"name": this.searchinput,
					"userId": uni.getStorageSync('userid')
				};
				uni.request({
					url: this.url + '/WebApiInterface/Supplier/GetSupplierPageList',
					method: "POST",
					data: data,
					success: (res) => {
						this.supplier = res.data.Data
					},
				});
			},
			//供应商添加
			Addsale() {
				uni.reLaunch({
					url: 'supplierAdd'
				})
			},
			// 项目详情
			detail(item) {
				this.$store.supdetail = item.F_Id
				uni.reLaunch({
					url: './supplierinfo'
				})
			},

			// 侧边栏事件
			showleftpro(e) {
				this.$refs[e].open();
			},
			// 关闭窗口
			closeDrawer(e) {
				this.$refs[e].close();
				console.log(e, 'e')
			},
			butclicks(name) {
				this.butclick = name // console.log(name,'名字')
			},
			// 点击确定查询
			sxelect() {
				this.project = []
				this.sales = []
				this.supplier = []
				this.payment = []
				this.receipt = []
				this.save = []
				this.page = 1
				this.page1 = 1
				if (this.click == 0) {
					this.M_MyUpcoming(this.page, false);
					this.$refs['showLeft'].close()
				} else {
					this.M_MyUpcoming(this.page1, false);
					this.$refs['showLeft'].close()
				}
			},
			//点击重置
			czselect() {
				this.project = []
				this.sales = []
				this.supplier = []
				this.payment = []
				this.receipt = []
				this.save = []
				this.butclick = ''
				if (this.click == 0) {
					this.M_MyUpcoming(this.page, false);
					this.$refs['showLeft'].close()
				} else {
					this.M_MyUpcoming(this.page1, false);
					this.$refs['showLeft'].close()
				}
			},

			//开始时间
			bindDateChange(e) {
				// this.beginDate = e.target.value
			},
			//结束时间
			bindendDateChange(e) {
				// this.beginendDate = e.target.value
			},

			getDate() {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
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

	.box {
		display: flex;
		width: 100%;
		height: 100%;
		flex-direction: column;
		background: #f3f3f3;

		.header {
			width: 100%;
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

			.search {
				width: 100%;
				height: 118rpx;
				display: flex;

				.input {
					width: 93%;
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
						}
					}

					.see {
						width: 100%;
						height: 78rpx;
						border-radius: 40rpx;
						font-size: 24rpx;
						font-family: PingFang SC;
						color: #737373;
						background: #F7F7F7;
						text-align: left;
						padding-left: 90rpx;
					}
				}


			}

		}

		.bigdialog {
			// margin-top: 120rpx;
			padding: 0 20rpx;

			.selectTitle {
				width: 100%;
				font-weight: bold;
				font-size: 32rpx;
				line-height: 60rpx;
				margin-bottom: 20rpx;
			}

			.type {
				display: flex;
				width: 100%;
				// justify-content: space-around;
				flex-wrap: wrap;

				button {
					// padding: 0 10rpx;
					width: calc(46% - 20rpx);
					background: #f6f8fa;
					color: #888888;
					height: 70rpx;
					line-height: 70rpx;
					font-size: 24rpx;
					margin-right: 30rpx;
					text-align: center;
					margin-bottom: 30rpx;
					border-radius: 8rpx;
				}

				.but-h-se {
					background-color: #2898fd;
					color: #FFFFFF;
				}
			}

			.dialoginput {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-around;
				position: fixed;
				bottom: 0;
				right: 0;
				height: 154rpx;
				width: 100%;

				text {
					width: 42%;
					font-size: 36rpx;
				}

				button {
					width: calc(45%);
					font-size: 31rpx;
				}
			}
		}

		// ---------------------------- 卡片部分 -------------------
		.content {
			margin-top: 120rpx;
			width: 100%;

			.containersale {
				position: relative;
				background-color: #FFFFFF;
				width: 92%;
				// height: 448rpx;
				padding-bottom: 20rpx;
				margin: auto;
				margin-top: 30rpx;
				border-radius: 9rpx;
				overflow: hidden;

				.nullda {
					height: 360rpx;
					font-size: 26rpx;
					color: #666666;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				.saletop {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					margin: 20rpx 20rpx;

					// .headleft {
					// 	display: flex;
					// 	align-items: center;
					// 	color: #FFFFFF;
					// 	width: 172rpx;
					// 	height: 60rpx;
					// 	background-image: url(http://purchase.zhroot.com/attached/appImgs/saleplan/%E8%B7%AF%E5%BE%84%208883.png);
					// 	background-size: 100% 100%;

					// 	text {
					// 		font-size: 28rpx;
					// 		font-family: PingFang SC;
					// 		font-weight: 400;
					// 		margin-left: 20rpx;
					// 	}
					// }
					.headleft {
						height: 60rpx;
						font-size: 28rpx;
						line-height: 60rpx;
						font-family: PingFang SC;
						display: flex;
						flex-direction: row;
						justify-content: space-around;
						position: relative;
						padding: 0 20rpx;

						.text {
							color: #fff;
							font-size: 28rpx;
							margin-left: 20rpx;
							margin-right: 10rpx;
						}
					}

					.headleft::before {
						content: '';
						position: absolute;
						display: inline-block;
						width: 0;
						height: 0;
						right: -30rpx;
						top: 0;
						border-top: 30rpx solid red;
						border-right: 30rpx solid transparent;
					}

					.headleft::after {
						content: '';
						position: absolute;
						display: inline-block;
						width: 0;
						height: 0;
						right: -30rpx;
						bottom: 0;
						border-bottom: 30rpx solid red;
						border-right: 30rpx solid transparent;
					}

					//项目审批
					.headleft.headleft2 {
						background: #7464FF;
					}

					.headleft.headleft2::before {
						border-top-color: #7464FF;
					}

					.headleft.headleft2::after {
						border-bottom-color: #7464FF;
					}

					//供应商审批
					.headleft.headleft1 {
						background: #2798FD;
					}

					.headleft.headleft1::before {
						border-top-color: #2798FD;
					}

					.headleft.headleft1::after {
						border-bottom-color: #2798FD;
					}

					//销售审批
					.headleft.headleft3 {
						background: #FF9933;
					}

					.headleft.headleft3::before {
						border-top-color: #FF9933;
					}

					.headleft.headleft3::after {
						border-bottom-color: #FF9933;
					}

					//应付账单审批
					.headleft.headleft4 {
						background: #FFBB33;
					}

					.headleft.headleft4::before {
						border-top-color: #FFBB33;
					}

					.headleft.headleft4::after {
						border-bottom-color: #FFBB33;
					}

					//应收账单审批
					.headleft.headleft5 {
						background: #FF5529;
					}

					.headleft.headleft5::before {
						border-top-color: #FF5529;
					}

					.headleft.headleft5::after {
						border-bottom-color: #FF5529;
					}

					.headright {
						color: #666666;
						font-size: 30rpx;

						image {
							float: right;
							width: 24rpx;
							height: 46rpx;
							margin: -1rpx 20rpx;
						}
					}

				}

				.salebom {
					margin: 12rpx 40rpx;
					display: flex;
					flex-direction: column;

					.salemid {
						width: 100%;
						overflow: hidden;
						text-overflow: ellipsis;
						-o-text-overflow: ellipsis;
						-webkit-text-overflow: ellipsis;
						-moz-text-overflow: ellipsis;
						white-space: nowrap;

						text {
							font-size: 36rpx;
							font-family: PingFang SC;
							font-weight: bold;
						}
					}

					.salecard {
						margin-top: 6rpx;
						display: flex;
						flex-direction: row;
						justify-content: space-between;

						.salegay {
							width: 50%;
							color: #999999;
							font-size: 26rpx;

							text {
								color: #000000;
							}

							.hjprice {
								font-family: PingFang SC;
								font-size: 22rpx;
								color: #007AFF;
							}

							.hjprice2 {
								font-family: PingFang SC;
								font-size: 22rpx;
							}

							.hjprices {
								border-radius: 5rpx;
								border: 1rpx solid rgba(99, 181, 254, 0.8);
								background-color: rgba(99, 181, 254, 0.1);
								padding: 0 15rpx;

								text {
									color: rgba(99, 181, 254, 0.8);
								}
							}

							.hjpricess {
								border-radius: 5rpx;
								color: rgba(90, 199, 108, 0.8);
								border: 1rpx solid rgba(90, 199, 108, 0.8);
								background-color: rgba(90, 199, 108, 0.1);
								padding: 0 15rpx;
								margin-left: 10rpx;
							}
						}

					}
				}

				.nullcop {
					width: 100%;
					height: 50rpx;
				}
			}

		}

		.cyko {
			width: 100%;
			display: flex;
			justify-content: flex-end;
			// position: sticky;
			position: fixed;
			bottom: 18%;
			right: 0;
			margin-right: 20rpx;
			z-index: 99;

			.cyclo {
				width: 110rpx;
				height: 110rpx;
				background: #2798fd;
				box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
				border-radius: 50%;

				.cto {
					width: 50rpx;
					height: 8rpx;
					background-color: #ffffff;
					right: 30rpx;
					position: absolute;
					/*绝对定位*/
					bottom: 46%;
					border-radius: 20rpx;
				}

				.cbom {
					width: 8rpx;
					height: 50rpx;
					background-color: #ffffff;
					right: 50rpx;
					position: absolute;
					/*绝对定位*/
					bottom: 26%;
					border-radius: 20rpx;
				}
			}
		}

		.close {
			padding-left: 20rpx;
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
	}
</style>
