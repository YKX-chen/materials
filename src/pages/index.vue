<template>
	<view class="page">
		<view class="headerimg">
			<!-- <image class="headerImg" src="http://purchase.zhroot.com/attached/appImgs/homeslices/headerimg.png"></image> -->
			<view class="headertitle">
				<view class="heatt">
					<text>项目编号：<text>{{proList.F_Code}}</text></text>
				</view>
				<view class="heatpro">
					<text>{{proList.F_Name}}</text>
				</view>
				<!-- <view class="heatt">
					<text>
						<image src="http://purchase.zhroot.com/attached/appImgs/Cslices/%E5%A4%B4%E5%83%8F.png"
							class="toux"></image>
						项目经理：<text>{{proList.F_ProManage}}</text>
					</text>
					<text class="titright">电话：<text>{{proList.F_DockPhone}}</text></text>
				</view> -->
				<view class="heatta">
					<text>
						<!-- <image src="http://purchase.zhroot.com/attached/appImgs/proslices/%E5%9C%B0%E5%9D%80.png">
						</image> -->
						{{proList.F_Address}}
					</text>
				</view>
			</view>
			<view class="headerleft" @click="qhxm()">切换项目
				<view class="headeright"></view>
			</view>
		</view>
		<view class="midHome1">
			<view class="midone1" v-for="(item,index) in routes" :key="item.index">
				<view class="mid1" @click="xmgl(item.name)">
					<!-- 项目管理 -->
					<image v-if="item.code == 'project'"
						src="http://purchase.zhroot.com/attached/appImgs/homeslices/icon_%E9%A1%B9%E7%9B%AE%E7%AE%A1%E7%90%86.png">
					</image>
					<!-- 需求计划 -->
					<image v-if="item.code == 'salePlan'"
						src="http://purchase.zhroot.com/attached/appImgs/homeslices/icon_%E9%9C%80%E6%B1%82%E8%AE%A1%E5%88%92.png">
					</image>
					<!-- 应收应付 -->
					<image v-if="item.name == '应付款项'"
						src="http://purchase.zhroot.com/attached/appImgs/homeslices/icon_%E8%B4%B9%E7%94%A8%E7%BB%93%E7%AE%97.png">
					</image>
					<!-- 采购单 -->
					<image v-if="item.code == 'order'"
						src="http://purchase.zhroot.com/attached/appImgs/homeslices/icon_%E9%87%87%E8%B4%AD.png">
					</image>
					<!-- 待办 -->
					<image v-if="item.code == 'approval'"
						src="http://purchase.zhroot.com/attached/appImgs/homeslices/icon_%E5%AE%A1%E6%89%B9.png">
					</image>
					<!-- 销售 -->
					<image v-if="item.code == 'sale'"
						src="http://purchase.zhroot.com/attached/appImgs/homeslices/icon_%E9%94%80%E5%94%AE%E5%8D%95.png">
					</image>
					<!-- 仓库库存 -->
					<image v-if="item.code == 'stock'"
						src="http://purchase.zhroot.com/attached/appImgs/homeslices/icon_%E7%89%A9%E8%B5%84%E5%BA%93%E5%AD%98.png">
					</image>
					<!-- 供应商管理 -->
					<image v-if="item.name == '供应商查看'"
						src="http://purchase.zhroot.com/attached/appImgs/Cslices/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20211018103516.png">
					</image>
					<text v-if="item.code == 'stock'">物资库存</text>
					<text v-if="item.code == 'sale'">销售单</text>
					<text v-if="item.code == 'approval'">审批</text>
					<text v-if="item.code == 'order'">采购单</text>
					<text v-if="item.name == '应付款项'">费用结算</text>
					<text v-if="item.code == 'salePlan'">需求计划</text>
					<text v-if="item.code == 'project'">项目管理</text>
					<text v-if="item.name == '供应商查看'">供应商管理</text>
				</view>
				<!-- <view class="mid1" @click="sjfx()">
					<image v-if="userData.F_RoleName == '公司领导'"
						src="http://purchase.zhroot.com/attached/appImgs/homeslices/icon_%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90.png">
					</image>
					<text v-if="userData.F_RoleName == '公司领导'">数据分析</text>
				</view> -->
			</view>
			<!-- 数据分析 -->
			<view class="midone1">
				<view class="mid1" @click="sjfx()">
					<image v-if="roleMark == 'leader' || roleMark == 'administrators'"
						src="http://purchase.zhroot.com/attached/appImgs/homeslices/icon_%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90.png">
					</image>
					<text v-if="roleMark == 'leader' || roleMark == 'administrators'">数据分析</text>
				</view>
			</view>
		</view>
		<!-- <view class="midHome"  v-for="(item,index) in routes" :key="item.index">
			<view class="midone">
				<view class="mid1" @click="xmgl()">
					<image
						src="http://purchase.zhroot.com/attached/appImgs/homeslices/icon_%E9%A1%B9%E7%9B%AE%E7%AE%A1%E7%90%86.png">
					</image>
					<text>项目管理</text>
				</view>
				<view class="mid1" @click="wzkc()">
					<image
						src="http://purchase.zhroot.com/attached/appImgs/homeslices/icon_%E7%89%A9%E8%B5%84%E5%BA%93%E5%AD%98.png">
					</image>
					<text>物资库存</text>
				</view>
			</view>
			<view class="midone">
				<view class="mid1" @click="xqjh()">
					<image
						src="http://purchase.zhroot.com/attached/appImgs/homeslices/icon_%E9%9C%80%E6%B1%82%E8%AE%A1%E5%88%92.png">
					</image>
					<text>需求计划</text>
				</view>
				<view class="mid1" @click="payment()">
					<image
						src="http://purchase.zhroot.com/attached/appImgs/homeslices/icon_%E8%B4%B9%E7%94%A8%E7%BB%93%E7%AE%97.png">
					</image>
					<text>费用结算</text>
				</view>
			</view>
			<view class="midone">
				<view class="mid1" @click="cgd()">
					<image src="http://purchase.zhroot.com/attached/appImgs/homeslices/icon_%E9%87%87%E8%B4%AD.png">
					</image>
					<text>采购单</text>
				</view>
				<view class="mid1" @click="Examine()">
					<image src="http://purchase.zhroot.com/attached/appImgs/homeslices/icon_%E5%AE%A1%E6%89%B9.png">
					</image>
					<text>审批</text>
				</view>
			</view>
			<view class="midone">
				<view class="mid1" @click="xsd()">
					<image
						src="http://purchase.zhroot.com/attached/appImgs/homeslices/icon_%E9%94%80%E5%94%AE%E5%8D%95.png">
					</image>
					<text>销售单</text>
				</view>
				<view class="mid1" @click="sjfx()">
					<image
						src="http://purchase.zhroot.com/attached/appImgs/homeslices/icon_%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90.png">
					</image>
					<text>数据分析</text>
				</view>
			</view>
		</view> -->
		<!-- 销售信息 -->
		<view class="midHomexs">
			<view class="midspan">
				<view class="midxsspan"></view>
				<text>
					销售信息
				</text>
			</view>
			<view class="Homecard">
				<view class="card1">
					<view class="cardtext">
						<text class="toptext">{{numFilter(indexlist.xsje)}}<text class="toptextB">(万元)</text></text>
						<text class="bomtext">销售金额</text>
					</view>
				</view>
				<view class="card2">
					<view class="cardtext">
						<text class="toptext">{{numFilter(indexlist.xscb)}}<text class="toptextB">(万元)</text></text>
						<text class="bomtext">销售毛利</text>
					</view>
				</view>
				<view class="card3">
					<view class="cardtext">
						<text class="toptext">{{numFilter(indexlist.lrl)}}<text class="toptextB">(%)</text></text>
						<text class="bomtext">利润率</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 采购信息 -->
		<view class="midHomecg">
			<view class="midspan">
				<view class="midxsspan"></view>
				<text>
					采购信息
				</text>
			</view>
			<view class="Homecard">
				<view class="card1">
					<view class="cardtext">
						<text class="toptext">{{indexlist.xqjhzsl}}<text class="toptextB">(种)</text></text>
						<text class="bomtext">需求计划</text>
					</view>
				</view>
				<view class="card2">
					<view class="cardtext">
						<text class="toptext">{{numFilter(indexlist.xmcgzje)}}<text class="toptextB">(万元)</text></text>
						<text class="bomtext">采购成本</text>
					</view>
				</view>
				<view class="card3">
					<view class="cardtext">
						<text class="toptext">{{numFilter(indexlist.wzzlsl)}}<text class="toptextB">(种)</text></text>
						<text class="bomtext">采购物资</text>
					</view>
				</view>
			</view>
		</view>

		<!-- <tab-bar></tab-bar> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				proid: "", //接收上个页面的参数
				indexlist: {},
				proList: {},
				listnum: "",
				routes: [],
				roleMark: uni.getStorageSync('roleMark'),
				imgsrc: "",
				row: 3,
				userData: uni.getStorageSync('userData')
			}
		},
		onLoad(option) {
			// this.proid = JSON.parse(option.proid)
			// console.log(this.proid, 'proid12')
			this.role()
			this.getData(); //首页列表
			this.proData() //项目详情
			this.progetDep() //项目列表
		},
		methods: {
			//角色权限
			role() {
				let roleid = this.userData.F_RoleId
				console.log(this.userData, '人员')
				uni.request({
					url: this.url + '/WebApiInterface/Role/GetAuthority',
					method: 'POST',
					data: {
						id: roleid
					},
					success: (res) => {
						const arr = res.data.Data.menuData
						uni.setStorageSync('buttonAuthority', JSON.stringify(res.data.Data.buttonData));

						arr.forEach((item) => {
							const arrs = item.childList;
							if (item.checkstate > 0) {
								let arr = arrs.filter((item) => {
									return item.checkstate > 0;
								});
								item.childList = arr;
								arr.forEach((items) => {
									if (items.code != null) {
										if (items.name != '应收款项' && items.name != '供应商添加') {
											this.routes.push(items)
										}
									}
								})
							}
						});
						console.log(this.routes, 'routes')
					}
				})
			},
			//首页列表
			getData() {
				uni.request({
					url: this.url + '/WebApiInterface/Index/MoveIndex',
					method: 'post',
					data: {
						// proId: this.proid
						proId: uni.getStorageSync('proid')
					},
					success: (res) => {
						this.indexlist = res.data.Data
					}
				})
			},
			// 费用结算
			payment() {
				uni.reLaunch({
					url: "PurchaseOrder/Payment/Payment"
				})
			},
			// 审批
			Examine() {
				uni.reLaunch({
					// url:"SalePlan/Saleplan?proid="+data
					url: "SalePlan/Examine/Examine"
				})
			},
			//点击切换项目
			qhxm() {
				if (this.listnum > 1) {
					setTimeout(function() {
						uni.reLaunch({
							url: "homepro/choice"
						})
					}, 1000);
				} else {
					uni.showLoading({
						title: "您只有一个项目"
					});
					setTimeout(function() {
						uni.hideLoading();
					}, 1000);
				}
				this.proData()
			},
			//点击需求计划
			xqjh() {
				// var data = JSON.stringify(this.proid)
				uni.reLaunch({
					// url:"SalePlan/Saleplan?proid="+data
					url: "SalePlan/Saleplan"
				})
			},
			//点击物资库存
			wzkc() {
				uni.reLaunch({
					url: "SupplierQuotation/examine/warehouse"
				})
			},
			//点击采购单
			cgd() {
				uni.reLaunch({
					url: "PurchaseOrder/PurchaseOrder"
				})
			},
			//点击切换销售单
			xsd() {
				uni.reLaunch({
					url: "SalePlan/sale/saleindex"
				})
			},
			//点击切换项目管理
			xmgl(item) {
				// uni.reLaunch({
				// 	url: "projectManagment/projectList"
				// })
				console.log(item, item)
				if (item == '立项申请') {
					uni.reLaunch({
						url: "projectManagment/projectList"
					})
				}
				if (item == '待办工作') {
					uni.reLaunch({
						url: "SalePlan/Examine/Examine"
					})
				}
				if (item == '需求计划') {
					uni.reLaunch({
						url: "SalePlan/Saleplan"
					})
				}
				if (item == '采购单') {
					uni.reLaunch({
						url: "PurchaseOrder/PurchaseOrder"
					})
				}
				if (item == '销售登账') {
					uni.reLaunch({
						url: "SalePlan/sale/saleindex"
					})
				}
				if (item == '仓库库存管理') {
					uni.reLaunch({
						url: "SupplierQuotation/examine/warehouse"
					})
				}
				if (item == '应付款项' || item == '应收款项') {
					uni.reLaunch({
						url: "PurchaseOrder/Payment/Payment"
					})
				}
				if (item == '供应商查看' || item == '供应商添加') {
					uni.reLaunch({
						url: "SupplierQuotation/supplier/index"
					})
				}
			},
			//点击切换数据分析
			sjfx() {
				uni.reLaunch({
					url: "SupplierQuotation/Analysis/Analysis"
				})
			},
			numFilter(value) {
				// 截取当前数据到小数点后两位
				let realVal = parseFloat(value).toFixed(2)
				return realVal
			},
			//项目详情
			proData() {
				uni.request({
					url: this.url + '/WebApiInterface/Project/ProjectAppRovalInfo',
					method: 'post',
					data: {
						id: uni.getStorageSync('proid')
					},
					success: (res) => {
						this.proList = res.data.Data
						console.log(this.proList.F_Name, this.proList.F_Address, 'this.proList.F_Name')

						if (this.proList.F_Name) {
							if (this.proList.F_Name.length > 9) {
								this.proList.F_Name = this.proList.F_Name.slice(0, 9)
							}
						}
						if (this.proList.F_Address) {
							if (this.proList.F_Address.length > 16) {
								this.proList.F_Address = this.proList.F_Address.slice(0, 16) + '...'
							}
						}
						console.log(this.proList.F_Name, '项目')
					}
				})
			},
			//项目列表
			progetDep() {
				console.log(uni.getStorageSync('userid'), '11')
				uni.request({
					url: this.url + '/WebApiInterface/Project/GetProjectPageList',
					method: 'post',
					data: {
						rows: 10, // 每页行数
						page: 1, //当前页
						sidx: "F_CreatorTime", //排序列
						sord: "asc", //排序类型
						userId: uni.getStorageSync('userid'), //人员id
						proName: this.proinput, //项目名称/项目编号
						proTypeId: "", //项目类型ID
						type: "", //项目状态
						status: "", //审批状态 
						managerId: "" //项目经理ID
					},
					success: (res) => {
						this.listnum = res.data.records
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.page {

		// background-color: #F3F3F3;
		.headerimg {
			width: 750rpx;
			height: 303rpx;
			// background-image: url(http://purchase.zhroot.com/attached/appImgs/Cslices/index_bg.png);
			background-image: url(../static/image/indexhome.png);
			background-color: #FFFFFF;
			background-size: 100% 100%;
			display: flex;
			display: -webkit-flex;
			color: rgba(255, 255, 255, 0.9);

			.headertitle {
				display: flex;
				flex-direction: column;
				// justify-content: center;
				padding: 30rpx 0rpx 0rpx 50rpx;

				.heatpro {
					// font-family: mao;
					font-size: 48rpx;
					// letter-spacing: 15rpx;
					letter-spacing: 5rpx;
					margin: 0rpx 9rpx;
				}

				.heatt {
					font-size: 24rpx;
					margin: 9rpx;
					margin-top: 12rpx;

					.titright {
						margin-left: 12rpx;
					}

					.toux {
						width: 28rpx;
						height: 28rpx;
					}

					image {
						width: 24rpx;
						height: 30rpx;
						margin-right: 12rpx;
					}
				}

				.heatta {
					font-size: 26rpx;
					margin: 9rpx;
					// margin-top: 9rpx;
					color: rgba(255, 255, 255, 0.75);

					.titright {
						margin-left: 12rpx;
					}

					.toux {
						width: 28rpx;
						height: 28rpx;
					}

					image {
						width: 24rpx;
						height: 30rpx;
						margin-right: 12rpx;
					}
				}
			}

			.headerImg {
				width: 750rpx;
				height: 303rpx;
			}

			.headerleft {
				position: absolute;
				top: 218rpx;
				left: 0;
				margin-left: 56rpx;
				width: 132rpx;
				height: 35rpx;
				line-height: 35rpx;
				background: #FEBA02;
				border-radius: 25rpx;
				font-size: 22rpx;
				font-family: PingFang SC;
				font-weight: 400;
				padding-left: 20rpx;
				color: #FFFFFF;
			}

			.headeright {
				position: absolute;
				top: 10rpx;
				right: 0;
				width: 0;
				height: 0;
				margin-right: 20rpx;
				border-top: 10rpx solid transparent;
				border-left: 12rpx solid #FFFFFF;
				border-bottom: 10rpx solid transparent;
			}
		}

		.midHome1 {
			background-color: #FFFFFF;
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-start;
			text-align: justify;

			.midone1 {
				width: 25%;

				.mid1 {
					display: inline;
					display: flex;
					flex-direction: column;
					align-items: center;
					font-size: 30rpx;
					margin-bottom: 20rpx;

					image {
						width: 90rpx;
						height: 90rpx;
						margin-bottom: 12rpx;
					}
				}
			}
		}

		.midHome {
			background-color: #FFFFFF;
			display: flex;
			flex-direction: row;
			justify-content: space-around;

			.midone {
				padding: 36rpx 0rpx 10rpx 0rpx;

				.mid1 {
					display: flex;
					flex-direction: column;
					align-items: center;
					font-size: 30rpx;
					margin-bottom: 20rpx;

					image {
						width: 90rpx;
						height: 90rpx;
						margin-bottom: 12rpx;
					}
				}
			}

			.midmulu {

				padding: 36rpx 0rpx 10rpx 0rpx;

				.mid1 {
					display: flex;
					flex-direction: column;
					align-items: center;
					font-size: 30rpx;
					margin-bottom: 20rpx;

					image {
						width: 90rpx;
						height: 90rpx;
						margin-bottom: 12rpx;
					}
				}
			}
		}

		// 销售信息
		.midHomexs {
			margin-top: 20rpx;
			background-color: #FFFFFF;
			padding: 30rpx;

			.midspan {
				width: 100%;
				display: flex;
				flex-direction: row;
				align-items: center;

				.midxsspan {
					width: 6rpx;
					height: 30rpx;
					background-color: #2798FD;
					border: 1rpx solid #2798FD;
					border-radius: 12rpx;
					margin-right: 20rpx;
				}

				text {
					font-size: 34rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #262626;
				}
			}


			.Homecard {
				display: flex;
				flex-direction: row;
				justify-content: space-around;
				margin: 30rpx 0rpx 10rpx 0;

				.card1 {
					width: 210rpx;
					height: 164rpx;
					// background-image: url(../static/homeslices/紫色.png);
					// background-image: url(http://purchase.zhroot.com/attached/appImgs/homeslices/%E7%B4%AB%E8%89%B2.png);
					background-size: 100% 100%;

					.cardtext {
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						height: 164rpx;

						.toptext {
							font-size: 40rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #5A5EF6;

							.toptextB {
								font-size: 20rpx;
								font-family: PingFang SC;
								font-weight: 400;
								line-height: 28px;
								color: #5A5EF6;
								opacity: 0.5;
							}
						}

						.bomtext {
							font-size: 26rpx;
							font-family: PingFang SC;
							font-weight: 400;
							// color: #5A5EF6;
							color: rgba(153, 153, 153, 0.6);
						}
					}
				}

				.card2 {
					width: 210rpx;
					height: 164rpx;
					// background-image: url(../static/homeslices/蓝色.png);
					// background-image: url(http://purchase.zhroot.com/attached/appImgs/homeslices/%E8%93%9D%E8%89%B2.png);
					background-size: 100% 100%;

					.cardtext {
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						height: 164rpx;

						.toptext {
							font-size: 40rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #41BBFF;

							.toptextB {
								font-size: 20rpx;
								font-family: PingFang SC;
								font-weight: 400;
								line-height: 28px;
								color: #41BBFF;
								opacity: 0.5;
							}
						}

						.bomtext {
							font-size: 26rpx;
							font-family: PingFang SC;
							font-weight: 400;
							// color: #41BBFF;
							color: rgba(153, 153, 153, 0.6);
						}
					}
				}

				.card3 {
					width: 210rpx;
					height: 164rpx;
					// background-image: url(../static/homeslices/绿色.png);
					// background-image: url(http://purchase.zhroot.com/attached/appImgs/homeslices/%E7%BB%BF%E8%89%B2.png);
					background-size: 100% 100%;

					.cardtext {
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						height: 164rpx;

						.toptext {
							font-size: 40rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #2FCBAC;

							.toptextB {
								font-size: 20rpx;
								font-family: PingFang SC;
								font-weight: 400;
								line-height: 28px;
								color: #2FCBAC;
								opacity: 0.5;
							}
						}

						.bomtext {
							font-size: 26rpx;
							font-family: PingFang SC;
							font-weight: 400;
							// color: #2FCBAC;
							color: rgba(153, 153, 153, 0.6);
						}
					}
				}

			}

		}

		// 采购信息
		.midHomecg {
			margin-top: 20rpx;
			background-color: #FFFFFF;
			padding: 30rpx;

			.midspan {
				width: 100%;
				display: flex;
				flex-direction: row;
				align-items: center;

				.midxsspan {
					width: 6rpx;
					height: 30rpx;
					background-color: #2798FD;
					border: 1rpx solid #2798FD;
					border-radius: 12rpx;
					margin-right: 20rpx;
				}

				text {
					font-size: 34rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #262626;
				}
			}

			.Homecard {
				display: flex;
				flex-direction: row;
				justify-content: space-around;
				margin: 30rpx 0rpx 10rpx 0;

				.card1 {
					width: 210rpx;
					height: 164rpx;
					// background-image: url(http://purchase.zhroot.com/attached/appImgs/homeslices/%E7%BA%A2%E8%89%B2.png); //红色
					background-size: 100% 100%;

					.cardtext {
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						height: 164rpx;

						.toptext {
							font-size: 40rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #FD524C;

							.toptextB {
								font-size: 20rpx;
								font-family: PingFang SC;
								font-weight: 400;
								line-height: 28px;
								color: #FD524C;
								opacity: 0.5;
							}
						}

						.bomtext {
							font-size: 26rpx;
							font-family: PingFang SC;
							font-weight: 400;
							// color: #FD524C;
							color: rgba(153, 153, 153, 0.6);
						}
					}
				}

				.card2 {
					width: 210rpx;
					height: 164rpx;
					// background-image: url(http://purchase.zhroot.com/attached/appImgs/homeslices/%E6%A9%99%E8%89%B2.png); //橙色
					background-size: 100% 100%;

					.cardtext {
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						height: 164rpx;

						.toptext {
							font-size: 40rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #FA5F37;

							.toptextB {
								font-size: 20rpx;
								font-family: PingFang SC;
								font-weight: 400;
								line-height: 28px;
								color: #FA5F37;
								opacity: 0.5;
							}
						}

						.bomtext {
							font-size: 26rpx;
							font-family: PingFang SC;
							font-weight: 400;
							// color: #FA5F37;
							color: rgba(153, 153, 153, 0.6);
						}
					}
				}

				.card3 {
					width: 210rpx;
					height: 164rpx;
					// background-image: url(http://purchase.zhroot.com/attached/appImgs/homeslices/%E9%BB%84%E8%89%B2.png); //黄色
					background-size: 100% 100%;

					.cardtext {
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						height: 164rpx;

						.toptext {
							font-size: 40rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #FF7923;

							.toptextB {
								font-size: 20rpx;
								font-family: PingFang SC;
								font-weight: 400;
								line-height: 28px;
								color: #FF7923;
								opacity: 0.5;
							}
						}

						.bomtext {
							font-size: 26rpx;
							font-family: PingFang SC;
							font-weight: 400;
							// color: #FF7923;
							color: rgba(153, 153, 153, 0.6);
						}
					}
				}

			}

		}


	}
</style>
