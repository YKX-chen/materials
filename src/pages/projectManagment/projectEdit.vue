<template>
	<view class="page">
		<view class="header">
			<view class="promid">
				<view class="protop">
					<text>项目</text>
				</view>
				<view class="probom">
					<view class="lis">
						<text>项目名称<text class="xh">*</text></text>
						<input v-model="projectData.F_Name" placeholder="请输入项目名称" placeholder-class="placeinput"
							maxlength="20" />
					</view>
					<view class="lis">
						<text>项目简称</text>
						<input v-model="projectData.F_Abbreviation" placeholder="不填写则自动采用全称"
							placeholder-class="placeinput" maxlength="20" />
					</view>
					<view class="lis">
						<text>客户<text class="xh">*</text></text>
						<picker @change="suppxiala" :value="index" :range="suppList" :range-key="'name'">
							<view class="pickright">
								<view style="padding-top: -20rpx;">{{ supptype }}</view>
								<view class="iopmg"></view>
							</view>
						</picker>
						<!-- <input v-model="projectData.F_Customer" placeholder="客户" placeholder-class="placeinput" /> -->
					</view>
					<view class="lis">
						<text>项目类型<text class="xh">*</text></text>
						<picker @change="ptyxiala" :value="index" :range="ptyList" :range-key="'name'">
							<view class="pickright">
								<view style="padding-top: -20rpx;">{{ protype }}</view>
								<view class="iopmg"></view>
							</view>
						</picker>
						<!-- <input v-model="projectData.F_ProType" placeholder="项目类型" placeholder-class="placeinput" /> -->
					</view>
					<view class="lis">
						<text>项目规模（万元）<text class="xh">*</text></text>
						<input v-model="projectData.F_ProScale" placeholder="请输入项目规模" placeholder-class="placeinput"
							maxlength="11" />
					</view>
					<view class="lis">
						<text>工期起始时间<text class="xh">*</text></text>
						<picker mode="date" :value="beginDate" @change="bindDateChange">
							<view class="pickright">
								<view style="padding-top: -20rpx;">{{ beginDate }}</view>
								<view class="iopmg"></view>
							</view>
						</picker>
						<!-- <input v-model="projectData.F_StartTime" placeholder="工期起始时间" placeholder-class="placeinput" /> -->
					</view>
					<view class="lis">
						<text>工期结束时间<text class="xh">*</text></text>
						<picker mode="date" :value="beginendDate" @change="bindendDateChange">
							<view class="pickright">
								<view style="padding-top: -20rpx;">{{ beginendDate }}</view>
								<view class="iopmg"></view>
							</view>
						</picker>
						<!-- <input v-model="projectData.F_EndTime" placeholder="工期结束时间" placeholder-class="placeinput" /> -->
					</view>
					<view class="lis">
						<text>坐标点<text class="xh">*</text></text>
						<input @click="remarkmap" v-model="projectData.F_Remark2" placeholder="请输入坐标点" placeholder-class="placeinput" />
					</view>
					<view class="lis">
						<text>项目经理<text class="xh">*</text></text>
						<picker @change="manxiala" :value="index" :range="manList" :range-key="'name'">
							<view class="pickright">
								<view style="padding-top: -20rpx;">{{ mantype }}</view>
								<view class="iopmg"></view>
							</view>
						</picker>
						<!-- <input v-model="projectData.F_ProManage" placeholder="请输入项目经理" placeholder-class="placeinput" /> -->
					</view>
					<view class="lis">
						<text>项目成员</text>
						<input v-model="F_Remark1" @click="remark('showLeft')" placeholder="请输入项目成员"
							placeholder-class="placeinput" />
					</view>
					<view class="lis">
						<text>省/市/区</text>
						<picker mode="multiSelector" :range="citypro" :value="proindex"
							@columnchange="pickerColumnchange" @change='onSelectCity'>
							<view class="pickright">
								<view style="padding-top: -20rpx;">{{ select }}</view>
								<view class="iopmg"></view>
							</view>
						</picker>
						<!-- <input v-model="projectData.F_Province" placeholder="请输入省/市/区" placeholder-class="placeinput" /> -->
					</view>
					<view class="lis">
						<text>对接人</text>
						<input v-model="projectData.F_DockUser" placeholder="请输入对接人" placeholder-class="placeinput"
							maxlength="20" />
					</view>
					<view class="lis">
						<text>对接电话</text>
						<input v-model="projectData.F_DockPhone" placeholder="请输入对接电话" placeholder-class="placeinput"
							maxlength="11" />
					</view>
					<view class="lis">
						<text>详细地址</text>
						<input v-model="projectData.F_Address" placeholder="请输入详细地址" placeholder-class="placeinput"
							maxlength="50" />
					</view>
					<view class="list">
						<text>项目介绍</text>
						<textarea v-model="projectData.F_ProIntroduction" placeholder="请输入项目介绍"
							placeholder-class="placeinput" maxlength="100" />
					</view>
				</view>
			</view>
		</view>
		<view class="fot"></view>
		<view class="bombtno">
			<button type="primary" plain="true" class="plabtn" @click="cancell()">取消</button>
			<button type="primary" @click="saleIsSubmit()">保存</button>
		</view>
		<uni-drawer ref="showLeft" mode="right" :width="260" style="height: 100%;">
			<scroll-view class="scroll-view-box" scroll-y="true">
				<view class="close">
					<view class="word-btn" hover-class="word-btn--hover" :hover-start-time="20" :hover-stay-time="70"
						@click="closeDrawer('showLeft')"><text class="word-btn-white">×</text>
					</view>
					<view class="bigdialog">
						<view class="showhead">
							<checkbox-group @change="checkuser">
								<view class="showmid" v-for="(item,index) in userData" :key="index">
									<view class="op">
										<checkbox :value="JSON.stringify(item)" :checked="item.checked" />
										<view class="hid">
											<text>姓名：{{item.F_RealName}}</text>
											<text>手机号：{{item.F_MobilePhone}}</text>
											<text>{{item.F_OrganizeId}}--{{item.F_RoleId}}</text>
										</view>
									</view>
								</view>
							</checkbox-group>
						</view>
						<view class="dialoginput">
							<button type="primary" plain="true" @click="czselect()">重置</button>
							<button type="primary" @click="sxelect()">确定</button>
						</view>
					</view>
				</view>
			</scroll-view>
		</uni-drawer>
	</view>
</template>

<script>
	import cityData from "../../store/city.js"
	import uniDrawer from "../../components/uni-drawer/uni-drawer.vue";
	export default {
		data() {
			return {
				projectData: {},
				currentCity: cityData.data, //省市区
				citypro: [
					[],
					[],
					[]
				], //省市区下拉
				proindex: [0, 0, 0],
				suppList: [], //客户下拉
				supplierData: [],
				select: "请选择",
				select1: "",
				select2: "",
				select3: "",
				supptype: "请选择",
				beginDate: "请选择", //开始时间
				beginendDate: "请选择", //结束时间
				index: 0,
				suppId: "", //客户id
				userid: [],
				username: [],
				ptyList: [],
				proData: [],
				proid: "",
				protype: "请选择",
				manList: [],
				mantype: "请选择",
				manData: [],
				manid: "",
				showLeft: false,
				userData: [],
				checkU: [],
				xmcy: [],
				F_Remark1: "",
				prolistinfo: {},
				requestMore1: true, //人员列表
				page1: 1,
			}
		},
		components: {
			uniDrawer,
		},
		onLoad(options) {
			this.projectData = JSON.parse(options.pro)
			// this.F_Remark1 = this.projectData.F_Remark2
			this.F_Remark1 = this.$store.F_Remark1
			this.beginDate = this.projectData.F_StartTime
			this.beginendDate = this.projectData.F_EndTime
			this.protype = this.projectData.F_ProType
			this.supptype = this.projectData.F_Customer
			this.mantype = this.projectData.F_ProManage
			if(this.projectData.F_Province == null || this.projectData.F_City == null || this.projectData.F_Area == null){
				this.select = '请选择'
			}else{
				this.select = [this.projectData.F_Province, this.projectData.F_City, this.projectData.F_Area].join("/")
			}
			console.log(this.projectData, 'opopopo')
			// if (options.Listu != undefined) {
			// 	let list = JSON.parse(options.Listu)
			// 	this.userid = list.map((item) => {
			// 		return item.F_Id
			// 	})
			// 	this.username = list.map(((item) => {
			// 		return item.F_RealName
			// 	}))
			// 	this.projectData.F_Remark1 = this.username.join("、")
			// 	console.log(JSON.parse(options.Listu), 'op')
			// 	console.log(this.userid, this.username, 'userid')
			// }

			this.proDep()
			this.suppDep()
			this.manDep()
			// this.userDep(this.page1, this.requestMore1)
			this.proinfo()
			//开始省市区默认数据
			var _this = this
			//省
			for (let i = 0; i < _this.currentCity.length; i++) {
				_this.citypro[0].push(_this.currentCity[i].name)
			}
			//市
			for (let i = 0; i < _this.currentCity[0].city.length; i++) {
				_this.citypro[1].push(_this.currentCity[0].city[i].name)
			}
			//区
			for (let i = 0; i < _this.currentCity[0].city[0].area.length; i++) {
				_this.citypro[2].push(_this.currentCity[0].city[0].area[i])
			}
		},
		onReachBottom() {
			if (this.requestMore1) {
				this.page1++
				this.userDep(this.page1, this.requestMore1)
			}
		},
		//顶部导航按钮-----修改
		onNavigationBarButtonTap(e) {
			uni.reLaunch({
				url: "projectList"
			})
		},
		//物理返回键
		onBackPress(options) {
			uni.reLaunch({
				url: "projectList"
			})
			return true
		},
		methods: {
			remarkmap() {
				// uni.reLaunch({
				// 	url:"promap"
				// })
				var that = this
				uni.chooseLocation({
				    success: function (res) {
				        console.log('位置名称：' + res.name);
				        console.log('详细地址：' + res.address);
				        console.log('纬度：' + res.latitude);
				        console.log('经度：' + res.longitude);
						let op = [res.longitude,res.latitude].join()
						that.projectData.F_Remark2 = op
						console.log(that.projectData.F_Remark2,'op')
				    }
				});
			},
			proinfo() {
				uni.request({
					url: this.url + '/WebApiInterface/Project/GetProjectInfo',
					method: "POST",
					data: {
						id: this.projectData.F_Id
					},
					success: (res) => {
						this.prolistinfo = res.data.Data
						this.projectData.F_Remark2 = this.prolistinfo.F_Remark2
					}
				})
			},
			//项目经理下拉列表
			manDep() {
				uni.request({
					url: this.url + '/WebApiInterface/Project/GetAllProManager',
					method: 'post',
					data: {},
					success: (res) => {
						this.manData = res.data.Data
						this.manData.forEach((item) => {
							this.manList.push({
								name: item.F_RealName,
							})
						})
						console.log(this.manList, '项目经理')
					}
				})
			},
			//项目类型下拉列表
			proDep() {
				uni.request({
					url: this.url + '/WebApiInterface/Project/GetProTypeList',
					method: 'post',
					data: {},
					success: (res) => {
						this.proData = res.data.Data
						this.proData.forEach((item) => {
							this.ptyList.push({
								name: item.F_Name,
							})
						})
						console.log(this.ptyList, '项目类型')
					}
				})
			},
			//客户下拉列表
			suppDep() {
				uni.request({
					url: this.url + '/WebApiInterface/Customer/GetCustomerList',
					method: 'post',
					data: {},
					success: (res) => {
						this.supplierData = res.data.Data
						this.supplierData.forEach((item) => {
							this.suppList.push({
								name: item.F_Name,
							})
						})
						console.log(this.suppList, '客户')
					}
				})
			},
			//客户下拉选择
			suppxiala: function(e) {
				this.index = e.target.value
				console.log(this.index, 'index')
				this.supptype = this.suppList[this.index]
				for (let a = 0; a < this.supplierData.length; a++) {
					if (a == this.index) {
						this.supptype = this.supplierData[a].F_Name
						this.suppId = this.supplierData[a].F_Id
					}
				}
				console.log(this.supptype, this.suppId, 'ii')
			},
			//项目经理下拉选择
			manxiala: function(e) {
				this.index = e.target.value
				console.log(this.index, 'index')
				this.mantype = this.manList[this.index]
				for (let a = 0; a < this.manData.length; a++) {
					if (a == this.index) {
						this.mantype = this.manData[a].F_RealName
						this.manid = this.manData[a].F_Id
					}
				}
				console.log(this.mantype, this.manid, 'ii')
			},
			//项目类型下拉选择
			ptyxiala: function(e) {
				this.index = e.target.value
				console.log(this.index, 'index')
				this.protype = this.ptyList[this.index]
				for (let a = 0; a < this.proData.length; a++) {
					if (a == this.index) {
						this.protype = this.proData[a].F_Name
						this.proid = this.proData[a].F_Id
					}
				}
				console.log(this.protype, this.proid, 'ii')
			},
			userDep(page, requestMore1) {
				let data = {
					"rows": 100,
					"page": page,
					"sidx": "F_CreatorTime",
					"sord": "desc",
					"name": "",
					"proId": ""
				}
				uni.request({
					url: this.url + '/WebApiInterface/Project/GetAlternateUser',
					method: 'POST',
					data: data,
					success: (res) => {
						if (requestMore1) {
							this.requestMore1 = false
						}
						this.userData = res.data.Data
						this.userData.forEach((item)=>{
							item.checked = false
							if(this.F_Remark1 == item.F_RealName){
								item.checked = true
							}
							for (var i = 0; i < this.xmcy.length; i++) {
								if(this.xmcy[i] == item.F_RealName){
									item.checked = true
								}
							}
						})
						console.log(this.userData,'usaerda')
					}
				})
			},
			// 关闭窗口
			closeDrawer(e) {
				this.$refs[e].close();
				console.log(e, 'e')
			},
			//项目成员跳转
			remark(e) {
				this.$refs[e].open();
				this.userDep(this.page1, this.requestMore1)
				console.log(this.F_Remark1,'打开时')
				// uni.reLaunch({
				// 	url: "projectremark"
				// })
			},
			//勾选项目成员
			checkuser(e) {
				this.checkU = e.target.value.map((item) => {
					return JSON.parse(item)
				})
				this.xmcy = e.target.value.map((item) => {
					return JSON.parse(item).F_RealName
				})
				this.userid = e.target.value.map((item) => {
					return JSON.parse(item).F_Id
				})
				this.F_Remark1 = this.xmcy.join("、")
				console.log(this.xmcy, 'xmcy')
				console.log(this.checkU, 'this.checkU')
			},
			//重置
			czselect() {
				this.$refs['showLeft'].close();
			},
			//确定
			sxelect() {
				this.F_Remark1 = this.xmcy.join("、")
				console.log(this.F_Remark1,'选中的')
				this.$refs['showLeft'].close();
			},
			//取消
			cancell() {
				uni.reLaunch({
					url: "projectList"
				})
			},
			//保存
			saleIsSubmit() {
				let Form = {
					F_Id: this.projectData.F_Id,
					F_Name: this.projectData.F_Name, //项目名称
					F_Abbreviation: this.projectData.F_Abbreviation, //项目简称
					F_Customer: this.suppId || this.prolistinfo.F_Customer, //客户id      
					F_DockUser: this.projectData.F_DockUser, //对接人
					F_DockPhone: this.projectData.F_DockPhone, //对接人电话                   
					F_ProType: this.proid || this.prolistinfo.F_ProType, //项目类型id      
					F_ProManage: this.manid || this.prolistinfo.F_ProManage, //项目经理id  
					F_StartTime: this.beginDate, //预设工期起始时间 
					F_EndTime: this.beginendDate, //预设工期结束时间  
					F_ProScale: this.projectData.F_ProScale, //项目规模(金额)
					F_Province: this.select1 || this.projectData.F_Province, //省
					F_City: this.select2 || this.projectData.F_City, //市
					F_Area: this.select3 || this.projectData.F_Area, //区
					F_Address: this.projectData.F_Address, //详细地址
					F_ProIntroduction: this.projectData.F_ProIntroduction, //项目介绍             
					// "F_Description": this.projectData.F_Description, //说明 
					F_CreatorUserId: uni.getStorageSync('userid'), //用户ID
					F_Remark: this.userid.join() || this.projectData.F_Remark, //项目成员ID 多个,号隔开
					F_Remark2: this.projectData.F_Remark2 || this.prolistinfo.F_Remark2 //坐标点
				}
				if (this.mantype == '请选择' | this.supptype == '请选择' | this.beginDate == '请选择' | this.beginendDate == '请选择' |
					this
					.protype == '请选择' | !Form.F_Name | !Form.F_ProScale | !Form.F_Remark2) {
					uni.showToast({
						icon: 'none',
						title: '信息不完整'
					});
				} else {
					uni.request({
						url: this.url + "/WebApiInterface/Project/AddOrModify",
						method: "POST",
						data: Form,
						success: (res) => {
							if (res.data.StatusCode == 200) {
								uni.showToast({
									icon: 'none',
									title: res.data.Info
								})
								if (this.projectData.F_Status == 0) {
									this.submit()
								}
								uni.reLaunch({
									url: "projectList"
								})
							}
						}
					})
				}
				console.log(Form, 'data')
			},
			//项目编辑时  状态为未提交时  提交
			submit() {
				let data = {
					"id": this.projectData.F_Id, // [必填]项目主键ID
					"type": "submit", //[必填]类型 （submit 提交， approval 审批 ，complete 完工 ） 
					"explain": "", //[可选] 审批驳回时说明
					"approvalType": "", //[可选]审批类型  项目审批时必填（通过  拒绝）
					"userId": uni.getStorageSync('userid') //[必填]用户ID
				}
				uni.request({
					url: this.url + '/WebApiInterface/Project/ProjectSubmit',
					method: 'POST',
					data: data,
					success: (res) => {

					}
				})
			},
			//开始时间
			bindDateChange(e) {
				this.beginDate = e.target.value
			},
			//结束时间
			bindendDateChange(e) {
				this.beginendDate = e.target.value
			},
			// 城市筛选
			onSelectCity: function(e) {
				var _this = this
				_this.proindex = e.detail.value
				_this.select =
					_this.citypro[0][_this.proindex[0]] + "/" +
					_this.citypro[1][_this.proindex[1]] + "/" +
					_this.citypro[2][_this.proindex[2]]
				_this.select1 = _this.citypro[0][_this.proindex[0]]
				_this.select2 = _this.citypro[1][_this.proindex[1]]
				_this.select3 = _this.citypro[2][_this.proindex[2]]
			},
			pickerColumnchange: function(e) {
				var _this = this
				//第一列滑动
				if (e.detail.column == 0) {
					_this.proindex[0] = e.detail.value
					//第二列更新相应的数据
					_this.citypro[1] = _this.currentCity[_this.proindex[0]].city.map((item, index) => {
						return item.name
					})
					if (_this.currentCity[_this.proindex[0]].city.length == 1) {
						_this.citypro[2] = _this.currentCity[_this.proindex[0]].city[0].area.map((item, index) => {
							return item
						})
					} else {
						_this.citypro[2] = _this.currentCity[_this.proindex[0]].city[_this.proindex[1]].area.map((item,
							index) => {
							return item
						})
					}
					//第一列滑动  第二列  第三列 都变为第一个
					_this.proindex.splice(1, 1, 0)
					_this.proindex.splice(2, 1, 0)
				}
				//第二列滑动
				if (e.detail.column == 1) {
					_this.proindex[1] = e.detail.value
					_this.citypro[2] = _this.currentCity[_this.proindex[0]].city[_this.proindex[1]].area.map((item,
						index) => {
						return item
					})
					_this.proindex.splice(2, 1, 0)
				}
				//第三列滑动
				if (e.detail.column == 2) {
					_this.proindex[2] = e.detail.value
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		.scroll-view-box {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 120rpx;
			left: 0;
		}

		.bigdialog {
			margin-top: 120rpx;

			.showhead {
				position: relative;
				display: flex;
				flex-direction: column;
				padding: 0 30rpx;
				height: 100%;

				.showmid {
					margin: auto;
					margin-top: 30rpx;
					background-color: #f2f2f2;
					width: 100%;
					height: 160rpx;
					border-radius: 9rpx;
					overflow: hidden;

					.op {
						display: flex;
						flex-direction: row;
						align-items: center;
						height: 160rpx;
						width: 100%;

						.hid {
							width: 100%;
							display: flex;
							flex-direction: column;
							font-size: 26rpx;
							color: #666666;

							text {
								width: 100%;
								margin-bottom: 6rpx;
							}

							.two {

								display: flex;
								justify-content: space-between;

								text:nth-child(2n) {
									width: 100%;
								}
							}
						}
					}

					checkbox {
						transform: scale(0.6);
					}

					label {
						font-size: 26rpx;
					}
				}
			}

			.dialoginput {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				position: fixed;
				bottom: 0;
				width: 100%;
				height: 120rpx;

				button {
					width: 45%;
					font-size: 26rpx;
				}
			}
		}

		.header {
			display: inline-block;
			display: flex;
			margin: auto;
			width: 90%;
			margin-top: 30rpx;
			border-radius: 9rpx;
			background-color: #FFFFFF;

			.promid {
				margin: 50rpx 30rpx;
				width: 100%;
				display: flex;
				flex-direction: column;

				.protop {
					padding-bottom: 20rpx;
					font-size: 34rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #262626;
					border-bottom: 1rpx solid #fafafa;
				}

				.probom {
					width: 100%;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #666666;

					.xh {
						color: #FF0000;
						margin-left: 9rpx;
					}

					.lis {
						display: flex;
						flex-direction: row;
						justify-content: space-around;
						padding: 20rpx 0;
						border-bottom: 1rpx solid #fafafa;

						input {
							width: 60%;
							text-align: right;
							font-size: 28rpx;
						}

						text:nth-child(1) {
							width: 40%;
						}

						picker {
							width: 60%;
							text-align: right;

							.pickright {
								display: flex;
								flex-direction: row;
								align-items: center;
								float: right;

								.iopmg {
									width: 24rpx;
									height: 46rpx;
									margin-left: 3rpx;
									background-image: url(http://purchase.zhroot.com/attached/appImgs/proslices/%E7%AE%AD%E5%A4%B4.png);
									background-size: 100% 100%;
								}

							}
						}

						.placeinput {
							font-size: 28rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #B3B3B3;
							text-align: right;
						}
					}

					.list {
						display: flex;
						flex-direction: column;
						margin-top: 20rpx;

						.placeinput {
							font-size: 28rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #B3B3B3;
						}

						// padding-bottom: 120rpx;
						text {
							width: 100%;
						}

						textarea {
							width: 100%;
							margin-top: 20rpx;
							font-size: 28rpx;
							font-family: PingFang SC;
							font-weight: 400;
						}
					}

				}
			}
		}

		.fot {
			width: 100%;
			height: 50rpx;
			margin-bottom: 200rpx;
		}

		.bombtno {
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 160rpx;
			background-color: #FFFFFF;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;

			button {
				width: 45%;
				height: 80rpx;
				line-height: 80rpx;
				border: none;
				outline: none;
				color: #FFFFFF;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 400;
			}

			.plabtn {
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 400;
				border: 1rpx solid #2798FD;
				// box-shadow: 0rpx 5rpx 10rpx rgba(39, 152, 253, 0.4);
				color: #2798FD;
			}

			.prbtn {
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 400;
				border: 1rpx solid #2798FD;
				box-shadow: 0rpx 5rpx 10rpx rgba(39, 152, 253, 0.4);
			}
		}
	}
</style>
