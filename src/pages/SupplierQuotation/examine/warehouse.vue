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
			<view class="matermid" @click="wzkc(item.F_Id)">
				<view class="mater">
					<text>{{item.F_Name}}</text>
					<view class="icon">
						<!-- <text class="right" v-if="item.F_Type == null">测试仓库</text> -->
						<view class="right">
							<text v-if="item.F_Type == 0">公共仓库</text>
							<text v-if="item.F_Type == 1">项目仓库</text>
						</view>
						<image src="http://purchase.zhroot.com/attached/appImgs/proslices/%E7%AE%AD%E5%A4%B4.png">
						</image>
					</view>
				</view>
				<view class="matercode">
					<text class="code">
						仓库地址：
						<text>{{item.F_Address}}</text>
					</text>
				</view>
			</view>
		</view>
		<view class="nullcop"></view>

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
							<view class="selectTitle">类型</view>
							<view class="list">
								<view :class="{'btn':true,'this':stateId == item.id}" v-for="item in stateArr"
									@click="changeState(item)">{{item.label}}</view>
							</view>
							<!-- <view class="selectTitle">类型</view>
							<view class="list2">
								<view :class="{'btn':true,'this':statusid == item.id}" v-for="item in status"
									@click="statuscg(item)">{{item.label}}</view>
							</view> -->
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
				index: 0,
				matertype: "请选择",
				page: 1,
				stateId: "", //类型
				stateArr: [{
					id: 1,
					label: '公共仓库'
				}, {
					id: 2,
					label: '项目仓库'
				}],
				statusid:"",//状态
				status:[
					{
						id: 0,
						label: '启用'
					}, {
						id: 1,
						label: '停用'
					},
					{
						id: 2,
						label: '禁用'
					}
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
			// if (this.requestMore) {
			// 	this.page++
			// 	this.materdcg(this.page, false)
			// }
		},
		//顶部导航按钮-----修改
		onNavigationBarButtonTap(e) {
			uni.reLaunch({
				url:"../../index"
			})
		},
		//物理返回键
		onBackPress(options){
			uni.reLaunch({
				url:"../../index"
			})
			return true
		},
		methods: {
			//点击跳转详情页
			saleInfo(fid) {
				console.log(fid, 'fid')
				uni.setStorageSync('saleinfo', fid)
				uni.reLaunch({
					url: "./saleInfo"
				})
			},

			// 物资库存
			materdcg: function(page, requestMore) {
				var data = {
					rows:5,// int[必填] 每页行数（ 例: 20）
					page:page,// int[必填] 当前页（ 例: 1）
					sidx:"F_CreatorTime",// string[必填] 排序列（ 例 F_CreatorTime）
					sord:"desc",// string[必填] 排序类型（ 例: "asc"或者 "desc"）
					keyword:"",// string[可选] 仓库名称
					type:"",// int[可选] 类型(0 公共仓库 1 项目仓库)
					status:"",// int[可选] 状态（ 0 启用 1 停用 2 禁用）
					m_proId:uni.getStorageSync('proid'),// string[必填] 项目ID
				};
				uni.request({
					url: this.url + "/WebApiInterface/Warehouse/M_GetWarehousePageList",
					method: "POST",
					data: data,
					success: (res) => {
						console.log(res, "cardata采购单分页列表(移动端)");
						if (res.data.total <= page) {
							this.requestMore = false
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
			//点击跳转物资库存
			wzkc(fid){
				uni.setStorageSync('warehouseid',fid)
				uni.reLaunch({
					url:"./examine"
				})
			},
			//搜索
			searchSale(val) {
				console.log(val, "输入的内容")
				var data = {
					rows:5,// int[必填] 每页行数（ 例: 20）
					page:page,// int[必填] 当前页（ 例: 1）
					sidx:"F_CreatorTime",// string[必填] 排序列（ 例 F_CreatorTime）
					sord:"desc",// string[必填] 排序类型（ 例: "asc"或者 "desc"）
					keyword:this.searcinput,// string[可选] 仓库名称
					type:"",// int[可选] 类型(0 公共仓库 1 项目仓库)
					status:"",// int[可选] 状态（ 0 启用 1 停用 2 禁用）
					m_proId:uni.getStorageSync('proid'),// string[必填] 项目ID
				};
				uni.request({
					url: this.url + "/WebApiInterface/Warehouse/M_GetWarehousePageList",
					method: "POST",
					data: data,
					success: (res) => {
						console.log(res, "cardata采购单分页列表(移动端)");
						if (res.data.total <= page) {
							this.requestMore = false
						}
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
			changeState(item) {
				this.stateId = item.id
				console.log(this.stateId,'op')
			},
			statuscg(item){
				this.statusid = item.id
			},
			//点击查询
			sxelect() {
				this.cardata = []
				let status = ""
				let typeid = ""
				if (this.stateId == "") {
					typeid = ""
				} 
				if(this.stateId != ""){
					typeid = this.stateId-1
				}
				var data = {
					rows:5,// int[必填] 每页行数（ 例: 20）
					page:page,// int[必填] 当前页（ 例: 1）
					sidx:"F_CreatorTime",// string[必填] 排序列（ 例 F_CreatorTime）
					sord:"desc",// string[必填] 排序类型（ 例: "asc"或者 "desc"）
					keyword:this.searcinput,// string[可选] 仓库名称
					type:typeid,// int[可选] 类型(0 公共仓库 1 项目仓库)
					// status:this.statusid || 0,// int[可选] 状态（ 0 启用 1 停用 2 禁用）
					status: "",// int[可选] 状态（ 0 启用 1 停用 2 禁用）
					m_proId:uni.getStorageSync('proid'),// string[必填] 项目ID
				};
				uni.request({
					url: this.url + "/WebApiInterface/Warehouse/M_GetWarehousePageList",
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
				// this.materdcg(this.page, false);
				this.stateId = ""
				this.statusid = ""
				this.$refs['showLeft'].close();
				this.sxelect()
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
					// width: 95%;
					margin: 20rpx 0 0 30rpx;
					// margin: auto;
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

		.containersale {
			position: relative;
			display: flex;
			flex-direction: column;
			padding: 0 30rpx;

			.matermid {
				margin: auto;
				margin-top: 30rpx;
				background-color: #FFFFFF;
				width: 100%;
				// height: 180rpx;
				padding-bottom: 30rpx;
				border-radius: 9rpx;

				.mater {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					margin: 30rpx 0 10rpx 30rpx;

					text {
						font-size: 34rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #000000;
						width: 65%;
					}

					.icon {
						width: 30%;
						height: 44rpx;
						display: flex;
						flex-direction: row;
						justify-content: space-between;
						align-items: center;

						.right {
							
							text{
								font-size: 24rpx;
								font-family: PingFang SC;
								font-weight: 400;
								color: #7464FF;
								background: rgba(116, 100, 255, 0.07);
								border: 1rpx solid #7464FF;
								border-radius: 9rpx;
								padding: 6rpx 10rpx;
							}
						}

						image {
							float: right;
							width: 24rpx;
							height: 46rpx;
							margin-right: 40rpx;
						}
					}
				}

				.matercode {
					margin-left: 30rpx;
					margin-top: 10rpx;

					.code {
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #888888;
					}

					text {
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #000000;
					}
				}

			}
		}

		.nullcop {
			width: 100%;
			height: 50rpx;
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
				.list2 {
					display: flex;
					width: 100%;
					flex-wrap: wrap;
				
					.btn {
						width: calc(33.1% - 20rpx);
						background: #f6f8fa;
						color: #888888;
						height: 70rpx;
						line-height: 70rpx;
						font-size: 30rpx;
						margin-right: 30rpx;
						text-align: center;
						margin-bottom: 30rpx;
						border-radius: 8rpx;
					}
				
					.btn:nth-child(3n) {
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
