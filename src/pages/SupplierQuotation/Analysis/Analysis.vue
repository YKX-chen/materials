<template>
	<view class="page">
		<view class="header">
			<view class="top">
				<view class="mid" @click="selNav(1)">
					<image
						src="http://purchase.zhroot.com/attached/appImgs/indexslices/icon_%E9%A1%B9%E7%9B%AE%E5%BB%BA%E8%AE%BE%E6%83%85%E5%86%B5.png">
					</image>
					<text :class="[ header == 1?'co':'' ]">项目建设情况</text>
				</view>
				<view class="mid" @click="selNav(2)">
					<image
						src="http://purchase.zhroot.com/attached/appImgs/indexslices/icon_%E9%87%87%E8%B4%AD%E9%9C%80%E6%B1%82%E6%83%85%E5%86%B5.png">
					</image>
					<text :class="[ header == 2?'co':'' ]">采购需求情况</text>
				</view>
				<view class="mid" @click="selNav(3)">
					<image
						src="http://purchase.zhroot.com/attached/appImgs/indexslices/icon_%E9%87%87%E8%B4%AD%E5%AE%8C%E6%88%90%E6%83%85%E5%86%B5.png">
					</image>
					<text :class="[ header == 3?'co':'' ]">采购完成情况</text>
				</view>
			</view>
			<view class="top">
				<view class="mid" @click="selNav(4)">
					<image
						src="http://purchase.zhroot.com/attached/appImgs/indexslices/icon_%E5%BA%93%E5%AD%98%E6%83%85%E5%86%B5.png">
					</image>
					<text :class="[ header == 4?'co':'' ]">库存情况</text>
				</view>
				<view class="mid" @click="selNav(5)">
					<image
						src="http://purchase.zhroot.com/attached/appImgs/indexslices/icon_%E9%94%80%E5%94%AE%E6%83%85%E5%86%B5.png">
					</image>
					<text :class="[ header == 5?'co':'' ]">销售情况</text>
				</view>
				<view class="mid" @click="selNav(6)">
					<image
						src="http://purchase.zhroot.com/attached/appImgs/indexslices/icon_%E7%89%A9%E8%B5%84%E9%94%80%E5%94%AE%E6%8E%92%E5%90%8D.png">
					</image>
					<text :class="[ header == 6?'co':'' ]">物资销售排名</text>
				</view>
			</view>
		</view>
		<view class="toplo"></view>
		<view class="two">
			<view class="xmjsqk">
				<view class="midtop">
					<view class="kcqk">
						<text>项目建设</text>
					</view>
				</view>
				<!-- <view id="chart1" style="width: 100%;height: 300rpx;"></view> -->
				<qiun-data-charts type="column"
					:opts="{dataLabel:false,enableScroll:true,xAxis:{itemCount:4,disableGrid:true},color:['#2798FD','#FFAA00'],extra:{column:{width:15,seriesGap:5,barBorderRadius: [25,25,0,0],}}}"
					:ontouch="true" :chartData="chartData" />
			</view>

		</view>
		<view class="two">
			<view class="midtop">
				<view class="kcqk">
					<text>采购需求</text>
				</view>
			</view>
			<!-- dataLabel:false,  是否显示图表区域内数据点上方的数据文案  scrollShow:true, 显示滚动条-->
			<qiun-data-charts type="line"
				:opts="{dataLabel:false,color:['#2798FD','#FFAA00'],enableScroll:true,xAxis:{itemCount:4,disableGrid:true}}"
				:chartData="chartData1" :ontouch="true" />
			<!-- <view id="chart2" style="width: 100%;height: 300rpx;"></view> -->
		</view>
		<view class="two">
			<view class="midtop">
				<view class="kcqk">
					<text>采购完成</text>
					<text>(单位：万元)</text>
				</view>
			</view>
			<!-- <view id="chart3" style="width: 100%;height: 300rpx;"></view> -->
			<qiun-data-charts type="area"
				:opts="{dataLabel:false,color:['#2798FD','#FFAA00'],enableScroll:true,xAxis:{itemCount:3,disableGrid:true}}"
				:chartData="chartData2" :ontouch="true" />
		</view>
		<view class="two">
			<view class="midtop">
				<view class="kcqk">
					<text>库存情况</text>
					<text>(单位：元)</text>
				</view>
				<view class="tabkc">
					<view class="new-tab">
						<text>物资编号</text>
						<text>物资名称</text>
						<text>库存数量</text>
						<text>库存成本</text>
					</view>
					<scroll-view scroll-y="true" style="height: 200rpx;">
						<view class="new-tid" v-for="(item,index) in carData.stockInfo">
							<text>{{item.materialCode}}</text>
							<text>{{item.materialName}}</text>
							<text>{{item.currentNum}}</text>
							<text>{{item.cost}}</text>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
		<view class="two">
			<view class="midtop">
				<view class="kcqk">
					<text>销售情况</text>
					<text>销售总额：万元</text>
				</view>
			</view>
			<!-- <view id="chart4" style="width: 100%;height: 300rpx;"></view> -->
			<qiun-data-charts type="line"
				:opts="{dataLabel:false,color:['#2798FD'],enableScroll:true,xAxis:{itemCount:4,disableGrid:true}}"
				:chartData="chartData3" :ontouch="true" />
		</view>
		<view class="two">
			<view class="nav">
				<view class="navheader">
					<text>物资销售额排名</text>
				</view>
				<view class="navtop">
					<view :class="['navbar',click==0?'inv-h-se':'']" @click="spanClick(0)">
						物资销售额排名
					</view>
					<view :class="['navbar',click==1?'inv-h-se':'']" @click="spanClick(1)">
						物资销售利润排名
					</view>
				</view>
				<view v-show="click == 0">
					<view class="tabkc">
						<view class="new-tab">
							<text>物资编号</text>
							<text>物资名称</text>
							<text>销售额</text>
							<text>名次</text>
						</view>
						<scroll-view scroll-y="true" style="height: 200rpx;">
							<view class="new-tid" v-for="(item,index) in carData.saleAmoutInfo">
								<text>{{item.materialCode}}</text>
								<text>{{item.materialName}}</text>
								<text>{{item.saleAmount}}</text>
								<text>{{index+1}}</text>
							</view>
						</scroll-view>
					</view>
				</view>
				<view v-show="click == 1">
					<view class="tabkc">
						<view class="new-tab">
							<text>物资编号</text>
							<text>物资名称</text>
							<text>名次</text>
						</view>
						<scroll-view scroll-y="true" style="height: 200rpx;">
							<view class="new-tid" v-for="(item,index) in carData.saleProfit">
								<text>{{item.materialCode}}</text>
								<text>{{item.materialName}}</text>
								<text>{{index+1}}</text>
							</view>
						</scroll-view>
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
				click: 0,
				header: 1,
				carData: {},
				chartData: {},
				chartData1: {},
				chartData2: {},
				chartData3: {},
			}
		},
		onLoad() {
			this.carDep()
			this.chartDep()
		},
		//物理返回键
		onBackPress(options) {
			uni.reLaunch({
				url: "../../index"
			})
			return true
		},
		//顶部导航按钮-----修改
		onNavigationBarButtonTap(e) {
			uni.reLaunch({
				url: "../../index"
			})
		},
		methods: {
			selNav(index) {
				if (index === 1 || index === 2 || index === 3 || index === 4 || index === 5 || index === 6) {
					this.header = index;
				}
				const query = uni.createSelectorQuery().select('.two');
				query.boundingClientRect(data => {
					console.log(data.height * 2 + 20, data, 'gaodu')
					if (index == 1) {
						uni.pageScrollTo({
							scrollTop: 0
						})
					}
					if (index == 2) {
						uni.pageScrollTo({
							scrollTop: data.height + 10
						})
					}
					if (index == 3) {
						uni.pageScrollTo({
							scrollTop: data.height * 2 + 20
						})
					}
					if (index == 4) {
						uni.pageScrollTo({
							scrollTop: data.height * 3 + 30
						})
					}
					if (index == 5) {
						uni.pageScrollTo({
							scrollTop: data.height * 3.8
						})
					}
					if (index == 6) {
						uni.pageScrollTo({
							scrollTop: data.height * 6
						})
					}
				}).exec();


			},
			spanClick(type) {
				this.click = type
			},
			carDep() {
				uni.request({
					url: this.url + '/WebApiInterface/Screen/ProjectScreen',
					method: 'POST',
					data: {
						proId: uni.getStorageSync('proid')
					},
					success: (res) => {
						this.carData = res.data.Data
						let ru1 = res.data.Data.purchaseDemand.map((item) => {
							return item.month.split("-")[0] + "年" + "-" + item.month.split("-")[1] +
								"月"
						})
						let wo1 = res.data.Data.purchaseDemand.map((item) => {
							return item.data.addNum
						})
						let op1 = res.data.Data.purchaseDemand.map((item) => {
							return item.data.completeNum
						})
						let Column1 = {
							categories: ru1,
							series: [{
								name: "新增数量",
								data: wo1
							}, {
								name: "完成数量",
								data: op1
							}]
						}
						this.chartData1 = Column1
						let ru2 = res.data.Data.purchaseComplete.map((item) => {
							return item.month.split("-")[0] + "年" + "-" + item.month.split("-")[1] +
								"月"
						})
						let wo2 = res.data.Data.purchaseComplete.map((item) => {
							return item.data.inquiryNum
						})
						let op2 = res.data.Data.purchaseComplete.map((item) => {
							return (item.data.totalMoney/10000).toFixed(2)
						})
						let ro2 = res.data.Data.purchaseComplete.map((item) => {
							return item.data.purchaseNum
						})
						let Column2 = {
							categories: ru2,
							series: [{
									name: "询价次数",
									data: wo2
								}, {
									name: "采购总额",
									data: op2
								},
								{
									name: "智能采购次数",
									data: ro2
								}
							]
						}
						this.chartData2 = Column2
						console.log(this.carData, '数据分析')
					}
				})
			},
			chartDep() {
				uni.request({
					url: this.url + '/WebApiInterface/Screen/CompositeScreen',
					method: 'POST',
					data: {},
					success: (res) => {
						let ru = res.data.Data.proBuild.map((item) => {
							return item.month.split("-")[0] + "年" + "-" + item.month.split("-")[1] +
								"月"
						})
						let wo = res.data.Data.proBuild.map((item) => {
							return item.data.addNum
						})
						let op = res.data.Data.proBuild.map((item) => {
							return item.data.stayNum
						})
						let Column = {
							categories: ru,
							series: [{
								name: "新增数量",
								data: wo
							}, {
								name: "在建数量",
								data: op
							}]
						}
						console.log(Column, 'col')
						this.chartData = Column
						// let ru1 = res.data.Data.purchaseDemand.map((item) => {
						// 	return item.month.split("-")[0] + "年" + "-" + item.month.split("-")[1] +
						// 		"月"
						// })
						// let wo1 = res.data.Data.purchaseDemand.map((item) => {
						// 	return item.data.addNum
						// })
						// let op1 = res.data.Data.purchaseDemand.map((item) => {
						// 	return item.data.completeNum
						// })
						// let Column1 = {
						// 	categories: ru1,
						// 	series: [{
						// 		name: "新增数量",
						// 		data: wo1
						// 	}, {
						// 		name: "完成数量",
						// 		data: op1
						// 	}]
						// }
						// this.chartData1 = Column1
						console.log(this.chartData1, '11')
						// let ru2 = res.data.Data.purchaseComplete.map((item) => {
						// 	return item.month.split("-")[0] + "年" + "-" + item.month.split("-")[1] +
						// 		"月"
						// })
						// let wo2 = res.data.Data.purchaseComplete.map((item) => {
						// 	return item.data.inquiryNum
						// })
						// let op2 = res.data.Data.purchaseComplete.map((item) => {
						// 	return item.data.totalMoney
						// })
						// let ro2 = res.data.Data.purchaseComplete.map((item) => {
						// 	return item.data.purchaseNum
						// })
						// let Column2 = {
						// 	categories: ru2,
						// 	series: [{
						// 			name: "询价次数",
						// 			data: wo2
						// 		}, {
						// 			name: "采购总额",
						// 			data: op2
						// 		},
						// 		{
						// 			name: "智能采购次数",
						// 			data: ro2
						// 		}
						// 	]
						// }
						// this.chartData2 = Column2
						let ru3 = res.data.Data.saleList.map((item) => {
							return item.month.split("-")[0] + "年" + "-" + item.month.split("-")[1] +
								"月"
						})
						let wo3 = res.data.Data.saleList.map((item) => {
							let op = ""
							if(item.saleAmount != 0){
								op = (item.saleAmount / 10000).toFixed(2)
							}else{
								op = item.saleAmount
							}
							return op
						})
						let Column3 = {
							categories: ru3,
							series: [{
								name: "销售金额",
								data: wo3
							}]
						}
						this.chartData3 = Column3
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		.co {
			color: #2798FD;
		}

		.header {
			width: 100%;
			// height: 260rpx;
			// margin-top: 20rpx;
			background-color: #FFFFFF;
			padding: 30rpx 30rpx 0rpx 30rpx;
			margin-bottom: 20rpx;
			position: fixed;
			top: var(--window-top);
			z-index: 99;

			.top {
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				margin: auto;
				margin-bottom: 30rpx;

				.mid {
					width: calc(33.1% - 20rpx);
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					image {
						width: 54rpx;
						height: 54rpx;
					}

					text {
						font-size: 22rpx;
						font-family: PingFang SC;
						font-weight: 400;
						line-height: 30px;
					}
				}
			}
		}

		.toplo {
			width: 100%;
			height: 320rpx;
			margin-bottom: 30rpx;
		}

		.two {
			width: 100%;
			height: auto;
			background-color: #FFFFFF;
			margin-top: 20rpx;
			padding-bottom: 40rpx;

			text {
				font-size: 34rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #262626;
			}

			.xmjsqk {
				width: 100%;
			}

			.xmjs {
				padding: 30rpx;
				// position: absolute;
				// top: 370rpx;
				// left: 30rpx;
			}

			.cgxq {
				// position: absolute;
				// top: 730rpx;
				// left: 30rpx;
			}

			.midtop {
				padding: 30rpx;

				.kcqk {
					width: 100%;
					margin: auto;
					display: flex;
					justify-content: space-between;
					align-items: center;

					text:nth-child(1) {
						font-size: 34rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #262626;
					}

					text:nth-child(2) {
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #333333;
					}
				}


			}

			.nav {
				padding: 30rpx;

				.navheader {
					font-size: 34rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #333333;
					margin-bottom: 30rpx;
				}

				.navtop {
					width: 100%;
					margin: auto;
					display: flex;
					flex-direction: row;
					justify-content: space-around;
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;

					.navbar {
						display: flex;
						justify-content: center;
						align-items: center;
					}
				}

			}
		}

		.tabkc {
			width: 100%;
			margin-top: 40rpx;

			.new-tab {
				background: rgba(0, 122, 255, 0.09);
				display: flex;
				flex-direction: row;
				justify-content: space-around;
				align-items: center;
				height: 74rpx;

				text {
					width: calc(25% - 20rpx);
					font-size: 28rpx;
					text-align: center;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
				}
			}

			.new-tid {
				display: flex;
				flex-direction: row;
				justify-content: space-around;
				align-items: center;
				height: 74rpx;
				border-bottom: 1rpx solid #f1f1f1;

				text {
					width: calc(25% - 20rpx);
					font-size: 26rpx;
					text-align: center;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
				}
			}
		}

		.inv-h-se {
			height: 61rpx;
			background: #2798FD;
			border-radius: 36rpx;
			padding: 0 20rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
		}
	}
</style>
