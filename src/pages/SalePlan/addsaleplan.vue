<template>
	<view class="page">
		<view class="header">
			<view class="heamid">
				<text class="heatop">
					信息
					<view class="borbom"></view>
				</text>
				<view class="headop">
					<view class="heaadd">
						<text>物资编号<text class="xh">*</text></text>
						<input v-model="materialForm.F_Code" placeholder="物资编号" placeholder-class="placeinput"
							@click="addmaterial" />
						<!-- :disabled="disabled" -->
						<!-- 	<picker @change="materxiala" :value="index" :range="materList" :range-key="'name'" >
							<view class="pickright">
								<view style="padding-top: -20rpx;">{{ matertype }}</view>
								<view class="iopmg"></view>
							</view>
						</picker> -->
					</view>
					<view class="borbom"></view>
				</view>
				<view class="headop">
					<view class="heaadd">
						<text>物资名称<text class="xh">*</text></text>
						<input v-model="materialForm.F_MaterialName" placeholder="请输入名称" placeholder-class="placeinput"
							disabled />
					</view>
					<view class="borbom"></view>
				</view>
				<view class="headop">
					<view class="heaadd">
						<text>规格<text class="xh">*</text></text>
						<input v-model="materialForm.F_Model" placeholder="请输入规格" placeholder-class="placeinput"
							disabled />
					</view>
					<view class="borbom"></view>
				</view>
				<view class="headop">
					<view class="heaadd">
						<text>单位<text class="xh">*</text></text>
						<input v-model="materialForm.F_Unit" placeholder="请输入单位" placeholder-class="placeinput"
							disabled />
					</view>
					<view class="borbom"></view>
				</view>
				<view class="headop">
					<view class="heaadd">
						<text>需求数量<text class="xh">*</text></text>
						<input type="number" v-model="materialForm.F_DemandNum" :placeholder="numplace"
							placeholder-class="placeinput" @input="numInput" />
					</view>
					<view class="borbom"></view>
				</view>
				<!-- <view class="headop">
					<view class="heaadd">
						<text>入库仓库</text>
						<picker @change="warexiala" :value="index" :range="warList" :range-key="'name'">
							<view class="pickright">
								<view style="padding-top: -20rpx;">{{ picktype }}</view>
								<view class="iopmg"></view>
							</view>

						</picker>
					</view>
					<view class="borbom"></view>
				</view> -->
				<view class="headop">
					<view class="heaadd">
						<text style="width: 20%;">用途<text class="xh">*</text></text>
						<picker mode="multiSelector" @change="modeytu" @columnchange="modechange" :value="modindex"
							:range="modelList" range-key="F_PurposeName">
							<view class="pickright">
								<view style="padding-top: 5rpx;font-size: 30rpx;">{{modeltype}}
								</view>
								<view class="iopmg"></view>
							</view>
						</picker>
					</view>
					<view class="borbom"></view>
				</view>
				<view class="headtarea">
					<view class="heaadd">
						<text>备注说明</text>
						<textarea v-model="materialForm.F_Description" placeholder="请输入说明"
							placeholder-class="placeinput" maxlength="100" />
					</view>
				</view>
			</view>
		</view>
		<view class="bom">
			<button type="primary" plain="true" class="plabtn" @click="cancell()">取消</button>
			<button type="primary" class="prbtn" @click="$stopClick(materialAdd)">保存</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				noClick: true,
				material: [], //物资
				wareData: [], //仓库
				modelData: [], //用途列表
				modelList: [
					[],
					[],
					[]
				], //用途下拉三级联动
				modelListid: [
					[],
					[],
					[]
				], //用途下拉三级联动id
				modelListcode: [
					[],
					[],
					[]
				], //用途下拉三级联动code
				warList: [],
				materList: [],
				index: 0,
				modindex: [0, 0, 0], //用途下拉下标
				materialForm: {},
				materF_Date: "",
				numplace: "请输入数量",
				picktype: "请选择", //入库仓库名称
				pickId: "", //入库仓库id
				modeltype: '请选择', //用途名称
				modelid: "", //材料用途id
				modercode: "", //web
				matertype: "请选择", //物资编号
				materId: "", //物资编号id
				secoindex: 0,

				F_Code: "",
				F_MaterialName: "",
				F_Model: "",
				F_Unit: "",
				selectmaterial: {},
				disabled: false,
			}
		},
		onLoad(option) {
			if (option.material != undefined) {
				this.selectmaterial = JSON.parse(option.material)
				console.log(this.selectmaterial, 'option')
				this.materialForm = this.selectmaterial
				this.materId = this.selectmaterial.F_Id
			}

			// this.wzbh()
			this.materdate()
			this.wareSelect()
			this.modelDep()
		},
		//顶部导航按钮-----修改
		onNavigationBarButtonTap(e) {
			uni.reLaunch({
				url: "Saleplan"
			})
		},
		//物理返回键
		onBackPress(options) {
			uni.reLaunch({
				url: "Saleplan"
			})
			return true
		},
		methods: {
			// 过滤input框多余的0
			numInput(e) {
				console.log(e.detail.value, "e.detail.value");

				//正则表达试
				e.detail.value = (e.detail.value.match(/^\d*(\.?\d{0,3})/g)[0]) || null
				//重新赋值给input
				this.$nextTick(() => {
					this.materialForm.F_DemandNum = e.detail.value
				})
			},

			// 跳转物资页面
			addmaterial() {
				// if (this.F_Code) {
				// 	this.disabled = true
				// } else {
				// 	uni.reLaunch({
				// 		url: "./addmaterial"
				// 	})
				// }
				uni.reLaunch({
					url: "./addmaterial"
				})
			},
			//物资编号下拉列表
			// wzbh() {
			// 	uni.request({
			// 		url: this.url + '/WebApiInterface/Material/GetMaterialList',
			// 		method: 'post',
			// 		data: {},
			// 		success: (res) => {
			// 			this.material = res.data.Data
			// 			this.material.forEach((item) => {
			// 				let op = [item.F_MaterialName, item.F_Code]
			// 				let data = op.join("-")
			// 				console.log(op.join("-"), 'op')
			// 				this.materList.push({
			// 					name: data,
			// 				})
			// 			})
			// 			console.log(this.materList, '物资下拉')
			// 		}
			// 	})
			// },
			//物资编号下拉选择
			// materxiala: function(e) {
			// 	this.index = e.detail.value
			// 	this.matertype = this.materList[this.index]
			// 	console.log(this.index, 'index')
			// 	for (let a = 0; a < this.material.length; a++) {
			// 		if (a == this.index) {
			// 			this.matertype = this.material[a].F_Code
			// 			this.materId = this.material[a].F_Id
			// 			this.materialForm.F_MaterialName = this.material[a].F_MaterialName
			// 			this.materialForm.F_Model = this.material[a].F_Model
			// 			this.materialForm.F_Unit = this.material[a].F_Unit
			// 		}
			// 	}
			// 	console.log(this.matertype, this.materId, 'ii')
			// },
			//仓库下拉列表
			wareSelect() {
				uni.request({
					url: this.url + '/WebApiInterface/Warehouse/WarehouseDropDown',
					method: 'post',
					data: {},
					success: (res) => {
						this.wareData = res.data.Data
						// this.wareData.forEach((item) => {
						// 	this.warList.push({
						// 		name: item.F_Name
						// 	})
						// })
						// console.log(this.warList, '仓库列表')
						for (let a = 0; a < this.wareData.length; a++) {
							if (uni.getStorageSync('proid') == this.wareData[a].F_ProId) {
								this.picktype = this.wareData[a].F_Name
								this.pickId = this.wareData[a].F_Id
							}
						}
					}
				})
			},
			//入库仓库的下拉选择
			warexiala: function(e) {
				this.index = e.detail.value - 1
				console.log(this.index, 'index')
				for (let a = 0; a < this.wareData.length; a++) {
					if (a == this.index) {
						this.picktype = this.wareData[a].F_Name
						this.pickId = this.wareData[a].F_Id
					}
				}
				console.log(this.picktype, this.pickId, 'ii')
			},
			//用途下拉列表
			modelDep() {
				uni.request({
					url: this.url + '/WebApiInterface/Material/GetMaterialPurposeList',
					method: 'post',
					data: {},
					success: (res) => {
						this.modelData = res.data.Data
						for (let i = 0; i < this.modelData.length; i++) {
							this.modelList[0].push(this.modelData[i].F_PurposeName)
							this.modelListid[0].push(this.modelData[i].F_Id)
							this.modelListcode[0].push(this.modelData[i].F_Code)
						}
						for (let i = 0; i < this.modelData[0].childList.length; i++) {
							this.modelList[1].push(this.modelData[0].childList[i].F_PurposeName)
							this.modelListid[1].push(this.modelData[0].childList[i].F_Id)
							this.modelListcode[1].push(this.modelData[0].childList[i].F_Code)
						}
						for (let i = 0; i < this.modelData[0].childList[0].childList.length; i++) {
							this.modelList[2].push(this.modelData[0].childList[0].childList[i].F_PurposeName)
							this.modelListid[2].push(this.modelData[0].childList[0].childList[i].F_Id)
							this.modelListcode[2].push(this.modelData[0].childList[0].childList[i].F_Code)
						}
						console.log(this.modelList, '列表')
					}
				})
			},
			//获取二级分类
			modechange(e) {
				console.log(e, 'ooo')
				if (e.detail.column == 0) {
					this.modindex[0] = e.detail.value
					if (this.modelData[this.modindex[0]].childList.length == 0) {
						this.modelList[1] = []
						this.modelList[2] = []
						this.modelListid[1] = []
						this.modelListid[2] = []
						this.modelListcode[1] = []
						this.modelListcode[2] = []
					} else {
						//App
						this.modelList[1] = this.modelData[this.modindex[0]].childList.map((item, index) => {
							return item.F_PurposeName
						})
						if (this.modelData[this.modindex[0]].childList.length == 1) {
							this.modelList[2] = this.modelData[this.modindex[0]].childList[0].childList.map((item,
								index) => {
								return item.F_PurposeName
							})
						} else {
							this.modelList[2] = this.modelData[this.modindex[0]].childList[this.modindex[1]].childList.map(
								(
									item, index) => {
									return item.F_PurposeName
								})
						}
						//web
						this.modelListid[1] = this.modelData[this.modindex[0]].childList.map((item, index) => {
							return item.F_Id
						})
						if (this.modelData[this.modindex[0]].childList.length == 1) {
							this.modelListid[2] = this.modelData[this.modindex[0]].childList[0].childList.map((item,
								index) => {
								return item.F_Id
							})
						} else {
							this.modelListid[2] = this.modelData[this.modindex[0]].childList[this.modindex[1]].childList
								.map(
									(
										item, index) => {
										return item.F_Id
									})
						}
						//web code 
						this.modelListcode[1] = this.modelData[this.modindex[0]].childList.map((item, index) => {
							return item.F_Code
						})
						if (this.modelData[this.modindex[0]].childList.length == 1) {
							this.modelListcode[2] = this.modelData[this.modindex[0]].childList[0].childList.map((item,
								index) => {
								return item.F_Code
							})
						} else {
							this.modelListcode[2] = this.modelData[this.modindex[0]].childList[this.modindex[1]].childList
								.map(
									(
										item, index) => {
										return item.F_Code
									})
						}
					}


					this.modindex.splice(1, 1, 0)
					this.modindex.splice(2, 1, 0)
				}
				if (e.detail.column == 1) {
					this.modindex[1] = e.detail.value
					this.modelList[2] = this.modelData[this.modindex[0]].childList[this.modindex[1]].childList.map((item,
						index) => {
						return item.F_PurposeName
					})
					//web
					this.modelListid[2] = this.modelData[this.modindex[0]].childList[this.modindex[1]].childList.map((item,
						index) => {
						return item.F_Id
					})
					this.modelListcode[2] = this.modelData[this.modindex[0]].childList[this.modindex[1]].childList.map((item,
						index) => {
						return item.F_Code
					})
					if (this.modelList[2].length == 0) {
						this.modelList[2] = []
					}
					if (this.modelListid[2].length == 0) {
						this.modelListid[2] = []
					}
					if (this.modelListcode[2].length == 0) {
						this.modelListcode[2] = []
					}
					this.modindex.splice(2, 1, 0)
				}
				if (e.detail.column == 2) {
					this.modindex[2] = e.detail.value
				}
			},
			//选择用途分类
			modeytu: function(e) {
				this.modindex = e.detail.value
				// if (this.modelList[0].length != 0) {
				// 	this.modeltype = this.modelList[0][this.modindex[0]]
				// }
				// if (this.modelList[1].length != 0) {
				// 	this.modeltype += ',' + this.modelList[1][this.modindex[1]]
				// }
				// if (this.modelList[2].length != 0) {
				// 	this.modeltype += ',' + this.modelList[2][this.modindex[2]]
				// }
				let a = this.modelListid[0][this.modindex[0]]
				let b = this.modelListid[1][this.modindex[1]]
				let c = this.modelListid[2][this.modindex[2]]
				let a1 = this.modelListcode[0][this.modindex[0]]
				let b1 = this.modelListcode[1][this.modindex[1]]
				let c1 = this.modelListcode[2][this.modindex[2]]
				let a2 = this.modelList[0][this.modindex[0]]
				let b2 = this.modelList[1][this.modindex[1]]
				let c2 = this.modelList[2][this.modindex[2]]
				if (this.modelList[1].length != 0) {
					this.modeltype = this.modelList[2][this.modindex[2]]
				}
				if (this.modelList[2].length == 0) {
					this.modeltype = this.modelList[1][this.modindex[1]]
				}
				if (this.modelList[1].length == 0) {
					this.modeltype = this.modelList[0][this.modindex[0]]
				}
				if (this.modelListid[1].length != 0) {
					this.modelid = c
					// let op = [a.F_Code + " " + a.F_PurposeName,a.F_Code + b.F_Code + " " + b.F_PurposeName,a.F_Code + b.F_Code + c.F_Code + " " + c.F_PurposeName]
					// this.modercode = op.join()
				}
				if (this.modelListid[2].length == 0) {
					this.modelid = b
				}
				if (this.modelListid[1].length == 0) {
					this.modelid = a
				}
				if (this.modelListcode[1].length != 0) {
					let op = [a1 + " " + a2, a1 + b1 + " " + b2, a1 + b1 + c1 + " " + c2]
					console.log(op, 'opopopop')
					this.modercode = op.join()
					// let op = [a.F_Code + " " + a.F_PurposeName,a.F_Code + b.F_Code + " " + b.F_PurposeName,a.F_Code + b.F_Code + c.F_Code + " " + c.F_PurposeName]
					// this.modercode = op.join()
				}
				if (this.modelListcode[2].length == 0) {
					let op = [a1 + " " + a2, a1 + b1 + " " + b2]
					console.log(op, 'opopopop2为0')
					this.modercode = op.join()
				}
				if (this.modelListcode[1].length == 0) {
					let op = [a1 + " " + a2]
					console.log(op, 'opopopop1为0')
					this.modercode = op.join()
				}
				console.log(this.modelListid, 'id选择')
				console.log(this.modeltype, this.modelid, this.modercode, '选择的数据')
			},
			//新增需求计划
			materialAdd() {
				var Form = {
					// F_Id //string[可选] 新增时不传， 修改时为需求计划主键ID
					F_ProId: uni.getStorageSync('proid'), //string[可选] 项目ID
					F_WarehouseId: this
						.pickId, //string[可选] 入库仓库ID(选择项⽬ 后， 默认为所选项⽬ 的项⽬ 仓， 可以修改为其他公共仓• 未选项⽬， 可以选择所有的公共仓)
					F_Date: this.materF_Date, //string[必填] 需求日期
					F_MaterialId: this.materId, //string[可选] 材料ID
					F_MaterialCode: this.materialForm.F_Code, //string[可选] 材料编号
					F_MaterialName: this.materialForm.F_MaterialName, //string[必填] 材料名称
					F_Model: this.materialForm.F_Model, //string[必填] 规格
					// F_Material:this.materialForm.F_Material, //string[可选] 材质
					F_Unit: this.materialForm.F_Unit, //string[必填] 单位
					F_DemandNum: this.materialForm.F_DemandNum, //int[必填] 需求数量
					F_Description: this.materialForm.F_Description, //string[可选] 备注
					F_CreatorUserId: uni.getStorageSync('userid'), //string[必填] 用户ID
					F_Purpose: this.modercode, //string[可选] 材料用途
					F_Mpurpose: this.modeltype, //[可选]材料用途App字段
					F_PurposeId: this.modelid //[可选]材料用途ID
				}
				console.log(Form, 'form')
				if (this.modeltype == '请选择' | !Form.F_MaterialName | !Form.F_Model | !Form.F_Unit | !Form.F_DemandNum) {
					uni.showToast({
						icon: 'none',
						title: '信息不完整'
					});
				} else {
					uni.request({
						url: this.url + '/WebApiInterface/SalePlan/AddOrModify',
						method: 'post',
						data: Form,
						success: (res) => {
							if (res.data.StatusCode == 200) {
								uni.showToast({
									icon: 'none',
									title: res.data.Info
								});
								uni.reLaunch({
									// url: "Saleplan?proid=" + data
									url: "Saleplan"
								})

							}

						}
					})
					console.log(this.materialForm)
				}
			},
			//取消
			cancell() {
				this.materialForm = {}
				// var data = JSON.stringify(this.proid)
				uni.reLaunch({
					// url: "Saleplan?proid=" + data
					url: "Saleplan"
				})
			},
			//当前时间
			materdate() {
				var now = new Date()
				var year = now.getFullYear(); //得到年份
				var month = now.getMonth(); //得到月份
				var date = now.getDate(); //得到日期
				var hour=now.getHours();//得到小时
				var minutes=now.getMinutes();//得到分钟
                var seconds=now.getSeconds();//得到秒钟

				month = month + 1;
				month = month.toString().padStart(2, "0");
				date = date.toString().padStart(2, "0");
				this.materF_Date = `${year}-${month}-${date} ${hour}:${minutes}:${seconds}`;
				console.log(this.materF_Date, 'data')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		display: flex;
		// flex-direction: column;
		justify-content: center;
		align-items: center;

		.header {
			width: 93%;
			height: auto;
			background-color: #FFFFFF;
			margin-top: 30rpx;
			border-radius: 9rpx;

			.heamid {
				width: 100%;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				padding: 30rpx;

				.heatop {
					height: 38rpx;
					// font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: bold;
					line-height: 38rpx;
					margin: 0 0rpx 30rpx 0rpx;
					color: #262626;

					.borbom {
						margin: 20rpx 0rpx;
						height: 1px;
						background: #FAFAFA;
						opacity: 1;
					}
				}



			}

		}

		.headop {
			.heaadd {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				height: 38rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				line-height: 38rpx;
				margin: 20rpx 0rpx;
				color: #666666;

				.xh {
					color: #FF0000;
					margin-left: 9rpx;
				}

				input {
					font-size: 28rpx;
					text-align: right;
				}

				.texjj {
					width: 70%;
					text-align: right;
					margin-right: -12rpx;

				}

				.pickright {
					display: flex;
					flex-direction: row;

					.iopmg {
						width: 24rpx;
						height: 46rpx;
						background-image: url(http://purchase.zhroot.com/attached/appImgs/proslices/%E7%AE%AD%E5%A4%B4.png);
						background-size: 100% 100%;
					}

					image {
						width: 24rpx;
						height: 46rpx;
					}

				}
			}

			.borbom {
				margin-top: 30rpx;
				height: 1px;
				background: #FAFAFA;
				opacity: 1;
			}

			.placeinput {
				text-align: right;
				color: #B3B3B3;
				font-size: 28rpx;
			}
		}

		.headtarea {
			height: 200rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			margin: 20rpx 0rpx;
			color: #666666;
			padding-bottom: 60rpx;

			textarea {
				height: 160rpx;
				display: block;
				margin-top: 30rpx;
				overflow: hidden;
				width: 100%;
			}

			.placeinput {
				color: #B3B3B3;
				font-size: 28rpx;
			}
		}

		.bom {
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
			}

			.plabtn {
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 400;
				border: 1rpx solid #2798FD;
				box-shadow: 0rpx 5rpx 10rpx rgba(39, 152, 253, 0.4);
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
