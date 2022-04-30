<template>
	<view class="box">
		<!-- 导航栏 -->
		<view class="header">
			<view class="nav">
				<view :class="['navbar',click==0?'inv-h-se':'']" @click="spanClick(0)">
					待询价
					<view :class="['navbarxhx',click==0?'inv-h-sexhx':'']"></view>
				</view>
				<view :class="['navbar',click==1?'inv-h-se':'']" @click="spanClick(1)">
					历史需求
					<view :class="['navbarxhx',click==1?'inv-h-sexhx':'']"></view>
				</view>
			</view>
			<view class="search">
				<view class="input">
					<view class="icon">
						<image src="http://purchase.zhroot.com/attached/appImgs/proslices/ico%E6%90%9C%E7%B4%A2.png">
						</image>
					</view>
					<input class="see" type="text" v-model="searcinput" @input="searchSale()" placeholder="请输入搜索内容"
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
		<view class="content" v-show="click==0">
			<view class="mainycg" v-if="cardata.length == 0">
				<view class="nullda">当前状态无数据</view>
			</view>
			<view class="main" v-for="(item,index) in cardata" :key="index">
				<view @click='salelook(item)'>
					<view class="code">
						<view class="purchasecode">
							<view class="xqj">
								<view class="purjj">计划编号:</view>
								<view class="pusinput">{{item.F_Code}}</view>
							</view>
						</view>
						<view class="icon">
							<image src="http://purchase.zhroot.com/attached/appImgs/proslices/%E7%AE%AD%E5%A4%B4.png">
							</image>
						</view>
					</view>

					<view class="plancode">
						{{item.F_MaterialCode}}
					</view>

					<view class="name">
						<view class="left">
							<view class="supplier">
								<!-- 物资名称 -->
								{{item.F_MaterialName}}
							</view>
							<!-- 材质 -->
							<!-- <view class="people">
								
								{{item.F_Material}}
							</view> -->
						</view>
						<view class="right">
							<!-- <view class="icon" @click="leftindex()">
								<image
									src="http://purchase.zhroot.com/attached/appImgs/saleplan/%E9%9C%80%E6%B1%82.png">
								</image>
							</view> -->
							<view class="price">
								<!-- 需求数量 50 -->
								{{item.F_DemandNum}}
								<view class="pricenum">
									<!-- 单位 件 -->
									{{item.F_Unit}}
								</view>
							</view>
						</view>
					</view>

					<view class="bottom">
						<view class="phone">
							<!-- 规格 120*160mm -->
							{{item.F_Model}}
						</view>
						<view class="date">
							<!-- 日期 2021-7-22 -->
							<!-- {{item.F_Date | moment}} -->
								{{item.F_Date }}
						</view>
					</view>
				</view>
				<view class="but">
					<button type="" plain="true" :class="(item.F_Status==0||item.F_Status==1)?'bj':'bj_disable' "
						@click="Addquo(item)">报价</button>
					<button type="" v-if="authority_apply" plain="true"  :class="item.F_Status==1?'sqcg':'bj_disable'"
						@click="Applysale(item)">申请采购</button>
				</view>
			</view>
			<!-- <div v-if='!requestMore' class='noMOreTips'>到底了</div> -->
			<view class='noMOreTips'></view>
		</view>

		<!-- 已采购 -->
		<view class="content" v-show="click==1">
			<view class="mainycg" v-if="carycgData.length == 0">
				<view class="nullda">当前状态无数据</view>
			</view>
			<view class="main" v-for="(item,index) in carycgData" :key="index">
				<view @click='salelook(item)'>
					<view class="code">
						<view class="purchasecode">
							<view class="xqj">
								<view class="purjj">计划编号:</view>
								<view class="pusinput">{{item.F_Code}}</view>
							</view>
						</view>
						<view class="icon">
							<image src="http://purchase.zhroot.com/attached/appImgs/proslices/%E7%AE%AD%E5%A4%B4.png">
							</image>
						</view>
					</view>

					<view class="plancode">
						{{item.F_MaterialCode}}
					</view>

					<view class="name">
						<view class="left">
							<view class="supplier">
								<!-- 物资名称 -->
								{{item.F_MaterialName}}
							</view>
							<!-- 材质 -->
							<!-- <view class="people">
								
								{{item.F_Material}}
							</view> -->
						</view>
						<view class="right">
							<!-- <view class="icon" @click="leftindex()">
								<image
									src="http://purchase.zhroot.com/attached/appImgs/saleplan/%E9%9C%80%E6%B1%82.png">
								</image>
							</view> -->
							<view class="price">
								<!-- 需求数量 50 -->
								{{item.F_DemandNum}}
								<view class="pricenum">
									<!-- 单位 件 -->
									{{item.F_Unit}}
								</view>
							</view>
						</view>
					</view>

					<view class="bottom">
						<view class="phone">
							<!-- 规格 120*160mm -->
							{{item.F_Model}}
						</view>
						<view class="date">
							<!-- 日期 2021-7-22 -->
							<!-- {{item.F_Date | moment}} -->
							{{item.F_Date }}
						</view>
					</view>

					<!-- <view class="but">
					<button type="primary" plain="true" class="bjs">报价</button>
				</view> -->
				</view>
			</view>
			<view class='noMOreTips'></view>
			<!-- <div v-if='!requestMore' class='noMOreTips'>到底了</div> -->
		</view>

		<view class="cyko" v-if="F_Status!='0'">
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
				<!-- <view class="word-btn" hover-class="word-btn--hover" :hover-start-time="20" :hover-stay-time="70"
					@click="closeDrawer('showLeft')"><text class="word-btn-white">×</text></view> -->
				<view class="bigdialog">
					<view class="dialoginput">
						<text>开始时间：</text>
						<picker mode="date" :end="beginendDate" :value="beginDate" @change="bindDateChange">
							<view class="uni-input">{{beginDate}}</view>
						</picker>
					</view>
					<view class="dialoginput">
						<text>结束时间：</text>
						<picker mode="date" :start="beginDate" :value="beginendDate" @change="bindendDateChange">
							<view class="uni-input">{{beginendDate}}</view>
						</picker>
					</view>
					<view class="dialoginput">
						<text>状态：</text>
						<picker @change="materxiala" :value="index" :range="materList" :range-key="'name'">
							<view class="pickright">
								<view style="padding-top: -20rpx;">{{ matertype }}</view>
								<view class="iopmg"></view>
							</view>
						</picker>
					</view>
					<view class="dialoginput2">
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
	let page1 = 1,
		rows1 = 10;
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
				beginDate: "", //开始时间
				beginendDate: "", //结束时间
				materList: ['已发布', '已询价'], //状态
				index: 0,
				userData: uni.getStorageSync('userData'),
				roleMark: uni.getStorageSync('roleMark'),
				matertype: "请选择",
				// beginDate: beginDate, //开始时间  默认当天
				// cookie:document.Cookies.get('.AspNetCore.Session'),

				F_Status: "",
				 authority_apply: false,//申请采购按钮权限
			};
		},
		components: {
			uniDrawer,
		},
		onLoad(option) {
			page=1
			page1=1
			this.F_Status = uni.getStorageSync('F_Status') //项目状态
			console.log(this.F_Status, '项目状态')
			// this.proid = JSON.parse(option.proid)
			this.materdcg();
			// this.materycg();
			  this.authority_apply = this.$hasBtnPermission("salePlan_apply");
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
			return true
		},
		created() {},
		onReachBottom() {
			if (this.click == 0) {
				if (this.requestMore) {
					page++;
					var data = {
						rows, // int[必填] 每页行数（ 例: 20）
						page: page, // int[必填] 当前页（ 例: 1）
						sidx: "F_CreatorTime", // string[必填] 排序列（ 例 F_CreatorTime）
						sord: "desc", // string[必填] 排序类型（ 例: "asc"或者 "desc"）
						userId: uni.getStorageSync("userid"), // string[必填] 人员ID
						materialCode: this.searcinput, // string[可选] 材料编码
						sTime: "", // string[可选] 需求开始日期
						eTime: "", // string[可选] 需求结束日期
						proId: uni.getStorageSync('proid'), // string[可选] 项目ID
						keyword: "", // string[可选] 物资名称 / 备注 / 项目名称
						status: this.materstatus.join(), // string[可选] 状态(0 已发布 1 已询价 2 已采购) 多个,号分隔
					};
					uni.request({
						url: this.url + "/WebApiInterface/SalePlan/GetSalePlanPageList",
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
			} else {
				if (this.requestMore1) {
					page1++;
					var data = {
						rows: 10, // int[必填] 每页行数（ 例: 20）
						page: page1, // int[必填] 当前页（ 例: 1）
						sidx: "F_CreatorTime", // string[必填] 排序列（ 例 F_CreatorTime）
						sord: "desc", // string[必填] 排序类型（ 例: "asc"或者 "desc"）
						userId: uni.getStorageSync("userid"), // string[必填] 人员ID
						materialCode: this.searcinput, // string[可选] 材料编码
						sTime: "", // string[可选] 需求开始日期
						eTime: "", // string[可选] 需求结束日期
						proId: uni.getStorageSync('proid'), // string[可选] 项目ID
						keyword: this.searcinput, // string[可选] 物资名称 / 备注 / 项目名称
						status: this.materstatusx.join(), // string[可选] 状态(0 已发布 1 已询价 2 已采购) 多个,号分隔
					};
					uni.request({
						url: this.url + "/WebApiInterface/SalePlan/GetSalePlanPageList",
						method: "POST",
						data: data,
						success: (res) => {
							if (res.data.total <= page1) {
								this.requestMore1 = false;
							}
							this.carycgData = this.carycgData.concat(res.data.Data);
							console.log(this.carycgData, "采购单分页列表(移动端)");
						},
					});
				}
			}
		},
		methods: {
			begin() {
				const self = this;
				return {
					disabledDate(time) {
						if (self.beginendDate) {
							//如果结束时间不为空，则小于结束时间
							return new Date(self.beginendDate).getTime() < time.getTime();
						} else {
							//             return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
						}
					},
				};
			},
			processDate() {
				const self = this;
				return {
					disabledDate(time) {
						if (self.beginDate) {
							//如果开始时间不为空，则结束时间大于开始时间
							return (
								new Date(self.beginDate).getTime() > time.getTime()
							);
						} else {
							//             return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
						}
					},
				};
			},
			//待采购  已采购  标签点击事件
			spanClick(type) {
				page=1
				page1=1
				if (type != this.click) {
					(this.cardata = []), (this.carycgData = []);
				}
				this.click = type;
				if (type == 0) {
					this.materdcg()
					this.materList = ['已发布', '已询价']
					this.matertype = '请选择'
				}
				if (type == 1) {
					this.materycg()
					this.materList = ['已采购', '已提交']
					this.matertype = '请选择'
				}
				// if (type == 0) this.materdcg();
				// if (type == 1) this.materycg();
			},

			// 需求计划待采购
			materdcg() {
				var data = {
					rows: 10, // int[必填] 每页行数（ 例: 20）
					page: page, // int[必填] 当前页（ 例: 1）
					sidx: "F_CreatorTime", // string[必填] 排序列（ 例 F_CreatorTime）
					sord: "desc", // string[必填] 排序类型（ 例: "asc"或者 "desc"）
					userId: uni.getStorageSync("userid"), // string[必填] 人员ID
					materialCode: "", // string[可选] 材料编码
					sTime: "", // string[可选] 需求开始日期
					eTime: "", // string[可选] 需求结束日期
					proId: uni.getStorageSync('proid'), // string[可选] 项目ID
					m_keyword: this.searcinput, // string[可选] 物资名称 / 备注 / 项目名称
					status: this.materstatus.join(), // string[可选] 状态(0 已发布 1 已询价 2 已采购) 多个,号分隔
				};
				uni.request({
					url: this.url + "/WebApiInterface/SalePlan/GetSalePlanPageList",
					method: "POST",
					data: data,
					success: (res) => {
						console.log(res, "cardata采购单分页列表(移动端)");
						this.cardata = res.data.Data;
						if (res.data.total == page) {
							this.requestMore = false;
						}
					},
				});
			},
			//需求计划已采购
			materycg() {
				var data = {
					rows: 10, // int[必填] 每页行数（ 例: 20）
					page: page1, // int[必填] 当前页（ 例: 1）
					sidx: "F_CreatorTime", // string[必填] 排序列（ 例 F_CreatorTime）
					sord: "desc", // string[必填] 排序类型（ 例: "asc"或者 "desc"）
					userId: uni.getStorageSync("userid"), // string[必填] 人员ID
					materialCode: "", // string[可选] 材料编码
					sTime: "", // string[可选] 需求开始日期
					eTime: "", // string[可选] 需求结束日期
					proId: uni.getStorageSync('proid'), // string[可选] 项目ID
					m_keyword: this.searcinput, // string[可选] 物资名称 / 备注 / 项目名称
					status: this.materstatusx.join(), // string[可选] 状态(0 已发布 1 已询价 2 已采购) 多个,号分隔
				};
				uni.request({
					url: this.url + "/WebApiInterface/SalePlan/GetSalePlanPageList",
					method: "POST",
					data: data,
					success: (res) => {
						console.log(res, "采购单分页列表(移动端)");
						this.carycgData = res.data.Data;
						if (res.data.total == page1) {
							this.requestMore1 = false;
						}
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
					url: "addsaleplan",
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
					this.$store.supmatid = item.F_Id
					console.log(this.$store.supmatid,item.F_Id)
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
				if (this.click == 0) {
					this.page = 1
					this.materdcg();
					// this.searcinput = "";
				} else {
					this.page1 = 1
					this.materycg();
				}
			},
			//查看需求计划详情
			salelook(item) {
				console.log(item, "本条");
				this.$store.status = item.F_Status
				this.$store.saleid = item.F_Id
				uni.reLaunch({
					url: "saleLook",
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
			//点击查询
			sxelect() {
				console.log(this.click, this.index, 'op')
				let index = ""
				if (this.index == 0) {
					index == ""
				} else {
					index = this.index
				}
				if (this.click == 0) {
					var data = {
						rows: 3, // int[必填] 每页行数（ 例: 20）
						page: page, // int[必填] 当前页（ 例: 1）
						sidx: "F_CreatorTime", // string[必填] 排序列（ 例 F_CreatorTime）
						sord: "desc", // string[必填] 排序类型（ 例: "asc"或者 "desc"）
						userId: uni.getStorageSync("userid"), // string[必填] 人员ID
						materialCode: this.searcinput, // string[可选] 材料编码
						sTime: this.beginDate, // string[可选] 需求开始日期
						eTime: this.beginendDate, // string[可选] 需求结束日期
						proId: uni.getStorageSync('proid'), // string[可选] 项目ID
						keyword: "", // string[可选] 物资名称 / 备注 / 项目名称
						status: index || this.materstatus.join(), // string[可选] 状态(0 已发布 1 已询价 2 已采购) 多个,号分隔
					};
					uni.request({
						url: this.url + "/WebApiInterface/SalePlan/GetSalePlanPageList",
						method: "POST",
						data: data,
						success: (res) => {
							console.log(res, "采购单分页列表(移动端)");
							this.cardata = res.data.Data;
							if (res.data.total == page) {
								this.requestMore = false;
							}
							this.$refs['showLeft'].close();
						},
					});
				} else {
					var data = {
						rows: 3, // int[必填] 每页行数（ 例: 20）
						page: page1, // int[必填] 当前页（ 例: 1）
						sidx: "F_CreatorTime", // string[必填] 排序列（ 例 F_CreatorTime）
						sord: "desc", // string[必填] 排序类型（ 例: "asc"或者 "desc"）
						userId: uni.getStorageSync("userid"), // string[必填] 人员ID
						materialCode: "", // string[可选] 材料编码
						sTime: this.beginDate, // string[可选] 需求开始日期
						eTime: this.beginendDate, // string[可选] 需求结束日期
						proId: uni.getStorageSync('proid'), // string[可选] 项目ID
						keyword: "", // string[可选] 物资名称 / 备注 / 项目名称
						status: index || this.materstatusx.join(), // string[可选] 状态(0 已发布 1 已询价 2 已采购) 多个,号分隔
					};
					console.log(index, 'index')
					uni.request({
						url: this.url + "/WebApiInterface/SalePlan/GetSalePlanPageList",
						method: "POST",
						data: data,
						success: (res) => {
							console.log(res, "采购单分页列表(移动端)");
							this.carycgData = res.data.Data;
							if (res.data.total == page1) {
								this.requestMore1 = false;
							}
							this.$refs['showLeft'].close();
						},
					});
				}
			},
			//点击重置
			czselect() {
				if (this.click == 0) {
					this.materdcg()
					this.matertype = '请选择'
					this.beginDate = ''
					this.beginendDate = ''
					this.index = ""
					this.$refs['showLeft'].close();
				} else {
					this.materycg()
					this.matertype = '请选择'
					this.beginDate = ''
					this.beginendDate = ''
					this.index = ""
					this.$refs['showLeft'].close();
				}
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
				margin-bottom: 60rpx;

				text {
					width: 42%;
					font-size: 36rpx;
				}

				picker {
					width: 56%;
					height: 60rpx;
					line-height: 60rpx;
					border-radius: 50rpx;
					background-color: #F7F7F7;
					color: #737373;
					font-size: 24rpx;
					padding-left: 20rpx;
				}

				button {
					width: 36%;
					height: 60rpx;
					font-size: 26rpx;
					line-height: 60rpx;
					border-radius: 50rpx;
				}
			}

			.dialoginput2 {
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
			height: 204rpx;
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

			.mainycg {
				// margin: 30rpx 36rpx 0 24rpx;
				margin: auto;
				margin-top: 30rpx;
				background-color: #00979d;
				width: 690rpx;
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
			}

			.main {
				margin: auto;
				margin: 30rpx;
				background: #ffffff;
				border-radius: 9rpx;
				overflow: hidden;

				.code {
					margin-top: 30rpx;
					display: flex;
					justify-content: space-between;

					.purchasecode {
						margin-left: 30rpx;

						// width: 56%;
						.xqj {
							width: auto;
							background: #ebedff;
							border-radius: 24rpx;
							color: #4d6ce9;
							font-size: 22rpx;
							padding: 9rpx 0;
							padding-right: 20rpx;
							font-family: PingFang SC;
							display: flex;
							flex-direction: row;

							.purjj {
								margin: 0 20rpx;
							}
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
						padding-bottom: 30rpx;
						font-size: 36rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #262626;

						.supplier {
							overflow: hidden;
							height: 50rpx;
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
						padding-top: 12rpx;
						display: flex;
						justify-content: center;

						.icon {
							width: 50rpx;
							height: 40rpx;
							margin-right: -100rpx;
							image {
								width: 43rpx;
								height: 43rpx;
							}
						}

						.price {
							margin-top: -16rpx;
							font-size: 48rpx;
							font-family: Nirmala UI;
							font-weight: bold;
							width: 260rpx;
							text-align: right;
							margin-right: 42rpx;
							color: #2798fd;

							.pricenum {
								color: #2798FD;
								font-size: 18rpx;
								display: inline-block;
							}
						}
					}
				}

				.bottom {
					// margin: 13rpx 0 0 36rpx;
					margin-left: 36rpx;
					margin-bottom: 36rpx;
					display: flex;

					.phone {
						// width: 151rpx;
						width: 30%;
						// height: 37rpx;
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
					justify-content: space-between;
					align-items: center;
					border-top: 1rpx solid rgba(0, 0, 0, 0.1);

					button {
						border: none;
						border-radius: 0rpx;
						font-size: 34rpx;
						font-family: PingFangSC-Medium;
						// width: calc(49%);
						flex: 1;
						width: 1rpx;
					}
					.bj {
						color: #2798fd;
						border-right: 1rpx solid rgba(0, 0, 0, 0.1);
					}

					.bj_disable {
						color: #6c6c6d;
					}

					.sqcg {
						color: #1adfc7;
					}

					.sqcg_disable {
						color: #6c6c6d;
					}
				}
			}
		}

		.noMOreTips {
			text-align: center;
			margin-top: 30rpx;
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
	}
</style>
