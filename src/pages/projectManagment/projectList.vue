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


		<!-- 待采购 -->
		<view class="content">
			<view class="projectList" v-if="cardata.length == 0">
				<view class="nullda">当前状态无数据</view>
			</view>
			<view class="main" v-for="(item,index) in cardata" :key="index">
				<view @click='salelook(item)'>
					<view class="code">
						<view :class="['state','state'+item.F_Type]">
							<view class="text">{{item.F_Type == 0?'在建':item.F_Type == 1?'完工':'--'}}</view>
						</view>
						<view class="icon">
							<image src="http://purchase.zhroot.com/attached/appImgs/proslices/%E7%AE%AD%E5%A4%B4.png">
							</image>
						</view>
					</view>
					<view class="projectMes">
						<view class="name">{{item.F_Name}}({{item.F_Code}})</view>
					</view>
					<view class="line oneLine">
						<view class="line">
							<text>项目经理：</text>{{item.F_ProManage}}
						</view>
						<!-- 	<view class="line">
							<text>客户：</text>{{item.F_Customer}}
						</view> -->
					</view>
					<!-- 		<view class="line">
						<text>项目成员：</text>{{item.F_Remark2}}
					</view> -->
					<view class="line">
						<text>项目地址：</text>{{item.F_Address}}
					</view>
					<!-- 		<view class="line">
						<text>项目周期：</text>{{item.F_StartTime | moment}} ~ {{item.F_EndTime | moment}}
					</view> -->
					<view class="line">
						<text>项目类型：</text>{{item.F_ProType}}
					</view>
				</view>
				<view class="img0">
					<image v-if="item.F_Status==0" src="http://purchase.zhroot.com/attached/appImgs/项目管理审批图/未提交.png">
					</image>
					<image v-if="item.F_Status==1" src="../../static/image/status.png"></image>
					<image v-if="item.F_Status==2" src="http://purchase.zhroot.com/attached/appImgs/项目管理审批图/已通过.png">
					</image>
					<image v-if="item.F_Status==3" src="http://purchase.zhroot.com/attached/appImgs/项目管理审批图/已拒绝.png">
					</image>
					<image v-if="item.F_Status==4" src="http://purchase.zhroot.com/attached/appImgs/项目管理审批图/已作废.png">
					</image>
					<image v-if="item.F_Status==5" src="http://purchase.zhroot.com/attached/appImgs/项目管理审批图/审批中.png">
					</image>
				</view>
			</view>
			<!-- <div v-if='!requestMore' class='noMOreTips'>到底了ψ(｀∇´)ψ</div> -->
		</view>

		<view class="cyko">
			<view class="cyclo" @click="Addsale()">
				<view class="cto"></view>
				<view class="cbom"></view>
			</view>
		</view>
		<uni-drawer ref="showLeft" mode="right" :width="260">
			<view class="close">
				<view class="" style="display: flex;justify-content: space-between;padding:60rpx 26rpx;">
					<view class="" style="font-weight: 700;font-siez:40rpx">筛选</view>
					<view class="word-btn" hover-class="word-btn--hover" :hover-start-time="20" :hover-stay-time="70"
						@click="closeDrawer('showLeft')"><text class="word-btn-white"></text>
					</view>
				</view>
				<view class="bigdialog">
					<view class="selectContent">
						<view class="selectBox">
							<view class="selectTitle">项目状态</view>
							<view class="list">
								<view :class="{'btn':true,'this':typeId == item.id}" v-for="item in typeArr"
									@click="changeType(item)">{{item.label}}</view>
							</view>
						</view>
						<view class="selectBox">
							<view class="selectTitle">审批状态</view>
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
		rows = 5;
	import uniDrawer from "../../components/uni-drawer/uni-drawer.vue";
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
				materstatusx: [3, 2],
				proid: "",
				requestMore: true, //是否还有数据(待询价)
				requestMore1: true, //是否还有数据(已采购)
				showLeft: false,
				typeId: "", //项目状态
				stateId: "", //审批状态
				index: 0,
				matertype: "请选择",
				typeArr: [{
					id: 1,
					label: '在建'
				}, {
					id: 2,
					label: '完工'
				}],
				stateArr: [{
						id: 1,
						label: '未提交'
					}, {
						id: 2,
						label: '待审批'
					}, {
						id: 3,
						label: '已通过'
					}, {
						id: 4,
						label: '已拒绝'
					}, {
						id: 5,
						label: '审批中'
					},
					// {
					// 	id: 5,
					// 	label: '已作废'
					// },
				]
				// beginDate: beginDate, //开始时间  默认当天
				// cookie:document.Cookies.get('.AspNetCore.Session'),
			};
		},
		components: {
			uniDrawer,
		},
		onLoad(option) {
			this.getProjectPageList();
			this.$forceUpdate()
		},
		created() {},
		onReachBottom() {
			if (this.requestMore) {
				page++;
				var data = {
					page,
					proName: this.searcinput,
					proTypeId: "",
					rows,
					sidx: "F_CreatorTime",
					sord: "desc",
					status: "",
					type: "",
					userId: uni.getStorageSync("userid"), // string[必填] 人员ID
				};
				uni.request({
					url: this.url + "/WebApiInterface/Project/GetProjectPageList",
					method: "POST",
					data: data,
					success: (res) => {
						if (res.data.total <= page) {
							this.requestMore = false;
						}
						this.cardata = this.cardata.concat(res.data.Data);
						console.log(this.cardata, "采购单分页列表(移动端)");
						// this.cardata = res.data.Data
					},
				});
			}
		},
		//顶部导航按钮-----修改
		onNavigationBarButtonTap(e) {
			uni.reLaunch({
				url: "../index"
			})
		},
		//物理返回键
		onBackPress(options) {
			uni.reLaunch({
				url: "../index"
			})
			console.log(options.from, 'op')
			return true
		},
		methods: {
			// 项目列表获取
			getProjectPageList() {
				var data = {
					page: 1,
					proName: this.searcinput,
					proTypeId: "",
					rows: 10,
					sidx: "F_CreatorTime",
					sord: "desc",
					status: "",
					type: "",
					userId: uni.getStorageSync("userid"), // string[必填] 人员ID
				};
				uni.request({
					url: this.url + "/WebApiInterface/Project/GetProjectPageList",
					method: "POST",
					data: data,
					success: (res) => {
						console.log(res.data.Data, "cardata采购单分页列表(移动端)");
						this.cardata = res.data.Data;

						// this.ProjectSubmit(this.cardata)
					},
				});
			},

			// 提交审批
			ProjectSubmit(arr) {
				arr.forEach(itme => {
					if (itme.F_Status == 0) {
						var data = {
							"id": itme.F_Id, // [必填]项目主键ID
							"type": "submit", // [必填]类型 （submit 提交， approval 审批 ，complete 完工 ） 
							"explain": "", // [可选] 审批驳回时说明
							"approvalType": "", //[可选]审批类型  项目审批时必填（通过  拒绝）
							userId: uni.getStorageSync("userid"), // string[必填] 人员ID
						};
						uni.request({
							url: this.url + "/WebApiInterface/Project/ProjectSubmit",
							method: "POST",
							data: data,
							success: (res) => {
								console.log(res, "提交");
								// this.cardata = res.data.Data;
							},
						});
					}
				})
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
					url: "projectAdd",
				});
			},
			//点击报价
			Addquo(item) {
				if (item.F_Status != 0 && item.F_Status != 1) {
					uni.showToast({
						icon: "none",
						title: "当前不可操作",
					});
				} else {
					uni.setStorageSync("materialId", item.F_MaterialId);
					uni.setStorageSync("materialName", item.F_MaterialName);
					var fid = item.F_MaterialId;
					let data = JSON.stringify(item);
					console.log(item, "v");
					uni.reLaunch({
						url: "../SupplierQuotation/quotation?data=" + data,
						// url:"../SupplierQuotation/quotation"
					});
				}
			},
			//点击申请采购
			Applysale(item) {
				var that = this;
				console.log(item.F_Status, "状态");
				if (item.F_Status != 1) {
					uni.showToast({
						icon: "none",
						title: "还未询价，不允许申请采购。",
					});
				} else {
					uni.showModal({
						title: "",
						content: "是否申请采购",
						success: function(res) {
							if (res.confirm) {
								uni.request({
									url: that.url + "/WebApiInterface/SalePlan/ApplyPurchase",
									method: "post",
									data: {
										salePlanId: item.F_Id, //[必填]需求计划主键ID
										userId: uni.getStorageSync("userid"), //[必填]用户ID
									},
									success: (res) => {
										uni.showToast({
											icon: "none",
											title: res.data.Info,
										});
										that.materdcg();
									},
								});
							} else if (res.cancel) {
								console.log("用户点击取消");
							}
						},
					});
				}
			},
			//搜索
			searchSale(val) {
				console.log(val, "输入的内容");
				this.getProjectPageList();
			},
			//查看项目详情
			salelook(item) {
				console.log(item, "fid");
				let data = JSON.stringify(item)
				this.$store.proid = item.F_Id
				uni.reLaunch({
					url: "projectInfo?data=" + data
				});
			},
			//开始时间
			changeType(item) {
				this.typeId = item.id
				console.log(this.typeId - 1, 'op')
			},
			//结束时间
			changeState(item) {
				this.stateId = item.id
				console.log(this.stateId - 1, 'op')
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
			//点击查询
			sxelect() {
				this.cardata = [];
				console.log(this.typeId,this.stateId,'op')
				let status = ""
				let typeid = ""
				if (this.typeId == "") {
					typeid = ""
				} 
				if(this.stateId == ""){
					status = ""
				}
				if(this.stateId != "") {
					status = this.stateId-1
				}
				if(this.typeId != ""){
					typeid = this.typeId-1
				}

				var data = {
					page: 1,
					proName: "",
					proTypeId: "",
					rows: 10,
					sidx: "F_CreatorTime",
					sord: "desc",
					status: status,
					type: typeid,
					userId: uni.getStorageSync("userid"), // string[必填] 人员ID
				};
				uni.request({
					url: this.url + "/WebApiInterface/Project/GetProjectPageList",
					method: "POST",
					data: data,
					success: (res) => {
						console.log(res.data.Data, "cardata采购单分页列表(移动端)");
						this.$refs['showLeft'].close();
						this.cardata = res.data.Data;
						if (res.data.total == page) {
							this.requestMore = false;
						}
					},
				});
			},
			//点击重置
			czselect() {
				this.typeId = ''
				this.stateId = ''
				this.sxelect()
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

			.selectContent {
				// margin-top: 10rpx;
				padding: 0 20rpx;
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


		.header {
			width: 100%;
			height: 122rpx;
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

		// 待采购
		.content {
			position: relative;
			display: flex;
			flex-direction: column;
			padding: 0 30rpx;
			margin-top: 30rpx;

			.projectList {
				// margin: 30rpx 36rpx 0 24rpx;
				margin: auto;
				margin-top: 30rpx;
				background-color: #00979d;
				width: 100%;
				height: 360rpx;
				background: #ffffff;
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

				.code {
					margin-top: 30rpx;
					display: flex;
					justify-content: space-around;

					.state {
						margin-left: 16rpx;
						width: 50%;
						height: 44rpx;
						background: #ebedff;
						border-radius: 24rpx;
						color: #4d6ce9;
						font-size: 22rpx;
						line-height: 44rpx;
						font-family: PingFang SC;
						display: flex;
						flex-direction: row;
						justify-content: space-around;

						.text {
							color: #fff;
							font-size: 22rpx;
						}
					}

					.icon {
						width: 40%;
						height: 44rpx;

						image {
							float: right;
							width: 24rpx;
							height: 46rpx;
							margin-right: 30rpx;
						}
					}
				}

				.plancode {
					margin: 32rpx 0 0 36rpx;
					width: 183rpx;
					height: 33rpx;
					font-size: 24rpx;
					font-family: PingFang SC;
					line-height: 33rpx;
					color: #999999;
				}

				.name {
					margin: 6rpx 0 0 36rpx;
					display: flex;

					.left {
						width: 426rpx;
						height: 100rpx;
						font-size: 36rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #262626;

						.supplier {
							overflow: hidden;
							height: 50rpx;
							overflow: hidden;
							word-break: break-all;
							/* break-all(允许在单词内换行。) */
							text-overflow: ellipsis;
							/* 超出部分省略号 */
							display: -webkit-box;
							/** 对象作为伸缩盒子模型显示 **/
							-webkit-box-orient: vertical;
							/** 设置或检索伸缩盒对象的子元素的排列方式 **/
							-webkit-line-clamp: 1;
							/** 显示的行数 **/
						}

						.people {
							overflow: hidden;
							height: 50rpx;
							overflow: hidden;
							word-break: break-all;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 1;
						}
					}

					.right {
						height: 100rpx;
						padding-top: 12rpx;
						// margin-left: 36rpx;
						display: flex;
						justify-content: center;

						.icon {
							width: 50rpx;
							height: 40rpx;
							margin-right: -30rpx;

							// background-color: #999999;
							image {
								width: 43rpx;
								height: 43rpx;
								// margin-right: 10rpx;
							}
						}

						.price {
							margin-top: -16rpx;
							// margin-left: 12rpx;
							font-size: 48rpx;
							font-family: Nirmala UI;
							font-weight: bold;
							// line-height: 64rpx;
							color: #2798fd;
							width: 160rpx;
							text-align: right;
							margin-right: 42rpx;

							.pricenum {
								color: #2798FD;
								font-size: 18rpx;
								display: inline-block;
							}
						}
					}
				}

				.bottom {
					margin: 13rpx 0 0 36rpx;
					display: flex;

					.phone {
						// width: 151rpx;
						width: 30%;
						height: 37rpx;
						font-size: 26rpx;
						font-family: PingFang SC;
						// line-height: 37px;
						color: #262626;
					}

					.date {
						// margin-left: 311rpx;
						width: 63%;
						text-align: right;
						height: 37rpx;
						// line-height: 37px;
						font-size: 26rpx;
						font-family: PingFang SC;
						color: #999999;
					}
				}

				.but {
					margin-top: 32rpx;
					width: 100%;
					// height: 91rpx;
					color: #2798fd;
					display: flex;
					flex-direction: row;
					border-top: 1rpx solid rgba(0, 0, 0, 0.1);

					.bj {
						width: 49%;
						border: none;
						height: 93rpx;
						color: #2798fd;
						font-size: 34rpx;
						font-family: PingFangSC-Medium;
					}

					.bj_disable {
						width: 49%;
						border: none;
						height: 93rpx;
						color: #6c6c6d;
						font-size: 34rpx;
						font-family: PingFangSC-Medium;
					}

					.bjs {
						width: 100%;
						text-align: center;
						border: none;
						height: 93rpx;
						color: #2798fd;
						font-size: 34rpx;
						font-family: PingFangSC-Medium;
					}

					.btnleft {
						width: 1px;
						height: 90px;
						background: rgba(0, 0, 0, 0.1);
						opacity: 1;
					}

					.sqcg {
						width: 49%;
						border: none;
						font-size: 34rpx;
						font-family: PingFangSC-Medium;
						color: #1adfc7;
						letter-spacing: 5rpx;
					}

					.sqcg_disable {
						width: 49%;
						border: none;
						font-size: 34rpx;
						font-family: PingFangSC-Medium;
						color: #6c6c6d;
						letter-spacing: 5rpx;
					}
				}
			}

			.main {
				position: relative;
				margin-bottom: 30rpx;
				background: #ffffff;
				border-radius: 9rpx;
				overflow: hidden;
				padding: 0 30rpx;
				padding-bottom: 30rpx;
				// background-image: url();

				.img {}

				.img0 {
					position: absolute;
					right: 59rpx;
					top: 100rpx;

					image {
						width: 200rpx;
						height: 200rpx;
					}
				}

				.code {
					margin-top: 30rpx;
					display: flex;
					justify-content: space-between;
					margin-bottom: 30rpx;

					.state {
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
						}
					}

					.state::before {
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

					.state::after {
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

					.state.state0 {
						background: #ff9933;
					}

					.state.state0::before {
						border-top-color: #ff9933;
					}

					.state.state0::after {
						border-bottom-color: #ff9933;
					}

					.state.state1 {
						background: #31d5a2;
					}

					.state.state1::before {
						border-top-color: #31d5a2;
					}

					.state.state1::after {
						border-bottom-color: #31d5a2;
					}

					.icon {
						width: 40%;
						height: 44rpx;

						image {
							float: right;
							width: 24rpx;
							height: 46rpx;
						}
					}
				}

				.projectMes {
					display: flex;
					font-size: 32rpx;
					font-weight: bold;

					.name {
						display: block;
						width: 100%;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
					}
				}

				.line {
					display: box;
					display: -webkit-box;
					flex: 1;
					width: 100%;
					font-size: 30rpx;
					line-height: 60rpx;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
					height: 60rpx;
					overflow: hidden;
					text-overflow: ellipsis;

					text {
						color: #888888;
					}
				}

				.line.oneLine {
					-webkit-box-orient: horizontal;
				}

				.name {
					display: flex;
				}

				.bottom {
					margin: 13rpx 0 0 36rpx;
					display: flex;

					.phone {
						// width: 151rpx;
						width: 30%;
						height: 37rpx;
						font-size: 26rpx;
						font-family: PingFang SC;
						// line-height: 37px;
						color: #262626;
					}

					.date {
						// margin-left: 311rpx;
						width: 63%;
						text-align: right;
						height: 37rpx;
						// line-height: 37px;
						font-size: 26rpx;
						font-family: PingFang SC;
						color: #999999;
					}
				}

				.but {
					margin-top: 32rpx;
					width: 100%;
					// height: 91rpx;
					color: #2798fd;
					display: flex;
					flex-direction: row;
					border-top: 1rpx solid rgba(0, 0, 0, 0.1);

					.bj {
						width: 49%;
						border: none;
						height: 93rpx;
						color: #2798fd;
						font-size: 34rpx;
						font-family: PingFangSC-Medium;
					}

					.bj_disable {
						width: 49%;
						border: none;
						height: 93rpx;
						color: #6c6c6d;
						font-size: 34rpx;
						font-family: PingFangSC-Medium;
					}

					.bjs {
						width: 100%;
						text-align: center;
						border: none;
						height: 93rpx;
						color: #2798fd;
						font-size: 34rpx;
						font-family: PingFangSC-Medium;
					}

					.btnleft {
						width: 1px;
						height: 90px;
						background: rgba(0, 0, 0, 0.1);
						opacity: 1;
					}

					.sqcg {
						width: 49%;
						border: none;
						font-size: 34rpx;
						font-family: PingFangSC-Medium;
						color: #1adfc7;
						letter-spacing: 5rpx;
					}

					.sqcg_disable {
						width: 49%;
						border: none;
						font-size: 34rpx;
						font-family: PingFangSC-Medium;
						color: #6c6c6d;
						letter-spacing: 5rpx;
					}
				}
			}

		}

		.noMOreTips {
			text-align: center;
			margin-top: 10rpx;
			font-size: 24rpx;
			color: #c0c4cc;
		}

		// 已采购--------------------------------------------------------
		.contents {}

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
		}

		.invfn {
			background-color: #debc8d;
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
						width: calc(33.1% - 20rpx);
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
