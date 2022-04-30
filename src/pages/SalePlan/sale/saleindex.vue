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
					<input class="see" type="text" v-model="searcinput" @input="searchSale" placeholder="请输入搜索内容"
						placeholder-class="placeinput"></input>
				</view>
				<view class="screen" @click="showleftpro('showLeft')">
					<view class="icon">
						<image
							src="http://purchase.zhroot.com/attached/appImgs/Cslices/icon%EF%BC%8F%E7%AD%9B%E9%80%89@2x.png">
						</image>
					</view>
					筛选
				</view>
			</view>
		</view>


		<!-- 卡片部分 -->
		<view class="containersale" v-for="(item,index) in cardata" :key="index">
			<view @click="saleInfo(item.F_Id)">
				<view class="saletop">
					<view :class="['headleft','headleft'+item.F_BillStatus]">
						<text>{{item.F_BillStatus == 1?'已出账单':item.F_BillStatus ==2?'待出账单':item.F_BillStatus==3?'待提交':item.F_BillStatus==4?'待审批':item.F_BillStatus==5?'已拒绝':'--'}}</text>
					</view>
					<view class="headright">
						<text>销售日期：
							<text>{{item.F_SaleDate | moment}}
								<image
									src="http://purchase.zhroot.com/attached/appImgs/proslices/%E7%AE%AD%E5%A4%B4.png">
								</image>
							</text>
						</text>
					</view>
				</view>
				<view class="salebom">
					<view class="salemid">
						<text>{{item.F_Remark1}}</text>
					</view>
					<view class="salecard">
						<text class="salegay">物&emsp;&emsp;资：
							<text>{{item.F_MaterialName}}（{{item.F_MaterialCode}}）</text>
						</text>
					</view>
					<view class="salecard">
						<text class="salegay">规&emsp;&emsp;格：
							<text>{{item.F_Model}}</text>
						</text>
					</view>
					<view class="salecard">
						<text class="salegay">合计金额：
							<text class="hjprice" v-if="item.F_SaleTotalPrice != null">{{item.F_SaleTotalPrice}}元</text>
							<text class="hjprice" v-if="item.F_SaleTotalPrice == null">待确定</text>
						</text>
					</view>
				</view>
			</view>

		</view>
		<view class="nullcop"></view>

		<view class="cyko">
			<view class="cyclo" @click="Addsale()">
				<view class="cto"></view>
				<view class="cbom"></view>
			</view>
		</view>
		<uni-drawer ref="showLeft" mode="right" :width="260">
			<view class="close">
				<!-- <view class="word-btn" hover-class="word-btn--hover" :hover-start-time="20" :hover-stay-time="70"
					@click="closeDrawer('showLeft')"><text class="word-btn-white">×</text>
				</view> -->
				<view class="" style="display: flex;justify-content: space-between;padding:60rpx 26rpx;">
					<view class="" style="font-weight: 700;font-siez:40rpx">筛选</view>
					<view class="word-btn" hover-class="word-btn--hover" :hover-start-time="20" :hover-stay-time="70"
						@click="closeDrawer('showLeft')"><text class="word-btn-white"></text>
					</view>
				</view>
				<view class="bigdialog">
					<view class="selectContent">
						<view class="selectBox">
							<view class="selectTitle">对账状态</view>
							<view class="list">
								<view :class="{'btn':true,'this':stateId == item.id}" v-for="item in stateArr"
									@click="changeState(item)">{{item.label}}</view>
							</view>
						</view>
					</view>
					<view class="dialoginput">
						<button type="primary" plain="true" @click="czselect()">重置</button>
						<button type="primary" @click="sxelect()">查询</button>
					</view>
				</view>

			</view>

		</uni-drawer>

	</view>
</template>

<script>
	let page = 1,
		rows = 10;
	import uniDrawer from "../../../components/uni-drawer/uni-drawer.vue";
	export default {
		data() {
			const beginDate = this.getDate("begin")
			const currentDate = this.getDate({
				format: true,
			})
			return {
				click: 0,
				cardata: [],
				carycgData: [],
				searcinput: "", //搜索
				materstatus: [0, 1],
				proid: "",
				requestMore: true, //是否还有数据
				showLeft: false,
				beginDate: "", //开始时间
				beginendDate: "", //结束时间
				materList: ['已发布', '已询价'], //状态
				index: 0,
				matertype: "请选择",
				page: 1,
				stateId: "", //审批状态
				stateArr: [{
					id: 1,
					label: '已出账单'
				}, {
					id: 2,
					label: '待出账单'
				}, {
					id: 3,
					label: '待提交'
				},
				// {
				// 	id: 4,
				// 	label: '待审批'
				// },
				]
				// beginDate: beginDate, //开始时间  默认当天
				// cookie:document.Cookies.get('.AspNetCore.Session'),
			};
		},
		// components: {
		// 	uniDrawer,
		// },
		onLoad() {
			this.materdcg(this.page, false);
		},
		created() {},
		onReachBottom() {
			if (this.requestMore) {
				this.page++
				this.materdcg(this.page, false)
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
			//点击跳转详情页
			saleInfo(fid) {
				console.log(fid, 'fid')
				// uni.setStorageSync('saleinfo', fid)
				this.$store.saleinfo = fid
				uni.reLaunch({
					url: "./saleInfo"
				})
			},

			// 销售单
			materdcg: function(page, requestMore) {
				var data = {
					"rows": 5, // 每页行数
					"page": page, //当前页
					"sidx": "F_CreatorTime", //排序列
					"sord": "desc", //排序类型（例:"asc"或者"desc"）
					"billStatus": "", //对账状态(1已对账 2未对账)(多个,号隔开)
					"userId": uni.getStorageSync('userid'), //人员ID
					"keyword": "", //查询关键字(项目名称/编号)
					"keyword1": "", //查询关键字(物资编码/物资名称)
					"sTime": "", //起始时间
					"eTime": "" //结束时间
				};
				uni.request({
					url: this.url + "/WebApiInterface/Sale/GetPageList",
					method: "POST",
					data: data,
					success: (res) => {
						console.log(res, "cardata采购单分页列表(移动端)");
						if (res.data.total <= page) {
							this.requestMore = requestMore;
						}
						this.cardata = this.cardata.concat(res.data.Data)
					},
				});
			},
			showleftpro(e) {
				this.$refs[e].open();
			},
			// 关闭窗口
			closeDrawer(e) {
				this.$refs[e].close();
				console.log(e, 'e')
			},
			//新增需求计划
			Addsale() {
				// var data = JSON.stringify(this.proid)
				uni.reLaunch({
					// url:"addsaleplan?proid="+data
					url: "./saleAdd",
				});
			},
			//搜索
			searchSale(val) {
				console.log(val, "输入的内容");
				var data = {
					"rows": 5, // 每页行数
					"page": page, //当前页
					"sidx": "F_CreatorTime", //排序列
					"sord": "desc", //排序类型（例:"asc"或者"desc"）
					"billStatus": "", //对账状态(1已对账 2未对账)(多个,号隔开)
					"userId": uni.getStorageSync('userid'), //人员ID
					"keyword": "", //查询关键字(项目名称/编号)
					"keyword1": this.searcinput, //查询关键字(物资编码/物资名称)
					"sTime": "", //起始时间
					"eTime": "" //结束时间
				};
				uni.request({
					url: this.url + "/WebApiInterface/Sale/GetPageList",
					method: "POST",
					data: data,
					success: (res) => {
						console.log(res, "cardata采购单分页列表(移动端)");
						this.cardata = res.data.Data
					},
				});
			},
			//查看需求计划详情
			salelook(fid) {
				console.log(fid, "fid");
				uni.reLaunch({
					url: "saleLook?fid=" + fid,
				});
			},
			//开始时间
			bindDateChange(e) {
				this.beginDate = e.target.value
			},
			//结束时间
			bindendDateChange(e) {
				this.beginendDate = e.target.value
			},
			//状态
			materxiala: function(e) {
				this.index = e.target.value
				this.matertype = this.materList[this.index]
				if (this.matertype == '已采购') {
					this.index = 2
				}
				if (this.matertype == '已提交') {
					this.index = 3
				}
				console.log(this.index, 'index')
				console.log(this.matertype, this.index, 'ii')
			},
			changeState(item) {
				this.stateId = item.id
			},
			//点击查询
			sxelect() {
				this.cardata = []
				var data = {
					"rows": 5, // 每页行数
					"page": page, //当前页
					"sidx": "F_CreatorTime", //排序列
					"sord": "desc", //排序类型（例:"asc"或者"desc"）
					"billStatus": this.stateId, //对账状态(1已对账 2未对账)(多个,号隔开)
					"userId": uni.getStorageSync('userid'), //人员ID
					"keyword1": "", //查询关键字(物资编码/物资名称)
					"sTime": "", //起始时间
					"eTime": "" //结束时间
				};
				uni.request({
					url: this.url + "/WebApiInterface/Sale/GetPageList",
					method: "POST",
					data: data,
					success: (res) => {
						console.log(res, "cardata采购单分页列表(移动端)");
						this.$refs['showLeft'].close()
						this.cardata = res.data.Data
						if (res.data.total == page) {
							this.requestMore = false
						}
					},
				});
			},
			//点击重置
			czselect() {
				this.materdcg(this.page, false)
				this.matertype = '请选择'
				this.beginDate = ''
				this.beginendDate = ''
				this.stateId = ""
				this.$refs['showLeft'].close();
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
		flex-direction: column;
		background: #f3f3f3;

		.bigdialog {
			// margin-top: 120rpx;
			padding: 0 20rpx;

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


		.header {
			width: 100%;
			height: 120rpx;
			background: #ffffff;
			font-size: 16rpx;
			text-align: center;
			position: sticky;
			top: var(--window-top);
			z-index: 99;

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
					margin: 20rpx 0 0 30rpx;
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
							margin-top: -2rpx;
						}
					}

					.see {
						width: 565rpx;
						height: 78rpx;
						border-radius: 40rpx;
						font-size: 24rpx;
						font-family: PingFang SC;
						color: #737373;
						background: #f7f7f7;
						text-align: left;
						padding-left: 90rpx;

						.placeinput {
							font-size: 24rpx;
							font-family: PingFang SC;
							font-weight: 400;
							line-height: 33rpx;
							color: #737373;
							margin-left: 9rpx;
						}
					}
				}

				// 筛选按钮
				.screen {
					margin: 41rpx 0 0 30rpx;
					font-size: 26rpx;
					font-family: PingFang SC;

					.icon {
						margin-top: 4rpx;
						margin-right: 10rpx;
						display: inline-block;
						height: 31rpx;
						width: 28rpx;

						// background-color: #999999;
						image {
							height: 31rpx;
							width: 28rpx;
						}
					}
				}
			}
		}

		// ---------------------------- 卡片部分 -------------------
		.containersale {
			position: relative;
			background-color: #FFFFFF;
			width: 90%;
			height: 400rpx;
			margin: auto;
			margin-top: 30rpx;
			border-radius: 9rpx;

			.saletop {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				margin: 40rpx 20rpx;

				.headleft {
					display: flex;
					justify-content: space-around;
					position: relative;
					padding: 0 20rpx 0 10rpx;
					// align-items: center;
					color: #FFFFFF;
					// width: 172rpx;
					height: 60rpx;
					line-height: 60rpx;

					// background-image: url(http://purchase.zhroot.com/attached/appImgs/saleplan/%E8%B7%AF%E5%BE%84%208883.png);
					// background-size: 100% 100%;

					text {
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 400;
						margin-left:20rpx;
						margin-right: 10rpx;
						// z-index: 99;
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
					border-top: 60rpx solid red;
					border-right: 60rpx solid transparent;
				}

				.headleft::after {
					content: '';
					position: absolute;
					display: inline-block;
					width: 0;
					height: 0;
					right: -30rpx;
					top: 0;
					border-bottom: 60rpx solid red;
					border-right: 60rpx solid transparent;
				}
				// 已拒绝
				.headleft.headleft5 {
					background-color: #F65B5B;
				}

				.headleft.headleft5::before {
					border-top-color: #F65B5B;
				}

				.headleft.headleft5::after {
					border-bottom-color: #F65B5B;
				}
				// 待审批
				.headleft.headleft4 {
					background-color: #FF9933;
				}

				.headleft.headleft4::before {
					border-top-color: #FF9933;
				}

				.headleft.headleft4::after {
					border-bottom-color: #FF9933;
				}
				// 已出账单
				.headleft.headleft1 {
					background-color: #31D5A2;
				}

				.headleft.headleft1::before {
					border-top-color: #31D5A2;
				}

				.headleft.headleft1::after {
					border-bottom-color: #31D5A2;
				}
				// 待提交
				.headleft.headleft3 {
					background-color: #FF4444;
				}

				.headleft.headleft3::before {
					border-top-color: #FF4444;
				}

				.headleft.headleft3::after {
					border-bottom-color: #FF4444;
				}

				// .headleft.headleft4 {
				// 	background-color: #B3B3B3;
				// }

				// .headleft.headleft4::before {
				// 	border-top-color: #B3B3B3;
				// }

				// .headleft.headleft4::after {
				// 	border-bottom-color: #B3B3B3;
				// }
				//待出账单
				.headleft.headleft2 {
					background-color: #FFBB33;
				}

				.headleft.headleft2::before {
					border-top-color: #FFBB33;
				}

				.headleft.headleft2::after {
					border-bottom-color: #FFBB33;
				}

				.headright {
					color: #333333;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;

					image {
						float: right;
						width: 24rpx;
						height: 46rpx;
						margin: -6rpx 20rpx;
					}
				}

			}

			.salebom {
				margin: 12rpx 40rpx;
				display: flex;
				flex-direction: column;

				.salemid {
					text {
						font-size: 36rpx;
						font-family: PingFang SC;
						font-weight: bold;
						letter-spacing: 6rpx;
					}
				}

				.salecard {
					margin-top: 6rpx;

					.salegay {
						color: #888888;
						font-size: 26rpx;

						text {
							color: #000000;
						}

						.hjprice {
							color: #2898fd;
							font-family: PingFang SC;
							font-weight: bold;
							font-size: 36rpx;
						}
					}

				}
			}

		}

		.nullcop {
			width: 100%;
			height: 50rpx;
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

		.selectContent {
			display: flex;
			width: 100%;
			flex-direction: column;

			.selectBox {
				display: flex;
				width: 100%;
				flex-direction: column;

				.selectTitle {
					width: 100%;
					font-weight: bold;
					font-size: 32rpx;
					line-height: 60rpx;
					margin-bottom: 20rpx;
				}

				.list {
					display: flex;
					width: 100%;
					flex-wrap: wrap;

					.btn {
						width: calc(46% - 20rpx);
						background: #f6f8fa;
						color: #888888;
						height: 70rpx;
						line-height: 70rpx;
						font-size: 26rpx;
						margin-right: 30rpx;
						text-align: center;
						margin-bottom: 30rpx;
						border-radius: 8rpx;
					}

					.btn:nth-child(4n) {
						margin-right: 0;
					}

					.btn.this {
						background: #2798fd;
						color: #fff;
					}
				}
			}
		}
	}
</style>
