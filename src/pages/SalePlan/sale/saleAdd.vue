<template>
	<view class="page">
		<view class="header">
			<view class="headerop">
				<uni-steps :options="list" :active="active" active-color="#007aff"></uni-steps>
			</view>
		</view>
		<view class="midlo" v-if="active === 0">
			<view class="headertop">
				<view class="xzwz">
					<view class="texinput">
						<text>选择销售物资</text>
					</view>
					<view class="bomsale">
						<view class="left">销售类型</view>
						<view class="right">
							<radio-group class="radio-group" @change="radioChanges">
								<label class="radio" v-for="(item, index) in items" :key="item.value">
									<radio :value="item.value" :checked="index == current" />{{item.name}}
								</label>
							</radio-group>
						</view>
					</view>
				</view>
				<view class="headermid" v-for="(item,index) in saleData" :key="index">
					<view class="left">
						<checkbox-group @change="checkio">
							<checkbox :value="item.F_MaterialId" :checked="saleList.includes(String(item.F_MaterialId))" @click="checksale(item,index)">
							</checkbox>
						</checkbox-group>
					</view>
					<view class="right">
						<view class="top">
							<text class="rightlo">物资编号：<text>({{item.F_MaterialCode}})</text></text>
							<text class="rightlo">物资名称：<text>{{item.F_MaterialName}}</text></text>
							<text class="rightlo">仓&emsp;&emsp;库：<text>{{item.F_Name}}</text></text>
						</view>
						<view class="bom">
							<view class="mid">
								<text>规格</text>
								<text class="gg">{{item.F_Model}}</text>
							</view>
							<view class="mid">
								<text>单位</text>
								<text class="gg">{{item.F_Unit}}</text>
							</view>
							<view class="mid">
								<text>库存数量</text>
								<text class="gg2">{{item.F_CurrentNum}}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="opbtn"></view>
			</view>
		</view>
		<view class="midlo" v-if="active === 1">
			<view class="headertop">
				<!-- 销售明细 -->
				<view class="xsmx">
					<view class="mx">
						<text class="tou">
							销售明细
							<view class="bom"></view>
						</text>
						<view class="headop">
							<view class="heaadd">
								<text>销售项目<text class="xh">*</text></text>
								<text>{{procode}}-{{proName}}</text>
								<!-- <input v-model="proName" disabled /> -->
							</view>
							<view class="borbom"></view>
						</view>
						<view class="headop">
							<view class="heaadd">
								<text>销售日期</text>
								<input v-model="saledate" disabled />
							</view>
							<view class="borbom"></view>
						</view>
						<view class="headop">
							<view class="heaadd">
								<text>销售内容<text class="xh">*</text></text>
								<input v-model="materForm.F_MaterialName" :disabled="disabled" placeholder="请输入销售内容"
									placeholder-class="placeinput" />
							</view>
							<view class="borbom"></view>
						</view>
						<view class="headop">
							<view class="heaadd">
								<text>规格<text class="xh">*</text></text>
								<input v-model="materForm.F_Model" :disabled="disabled" placeholder="请输入规格"
									placeholder-class="placeinput" />
							</view>
							<view class="borbom"></view>
						</view>
						<view class="headop">
							<view class="heaadd">
								<text>单位<text class="xh">*</text></text>
								<input v-model="materForm.F_Unit" :disabled="disabled" placeholder="请输入单位"
									placeholder-class="placeinput" />
							</view>
							<view class="borbom"></view>
						</view>
						<view class="headop">
							<view class="heaadd">
								<text>销售数量<text class="xh">*</text></text>
								<input type="digit" v-model="materForm.F_SaleNum" placeholder="请输入销售数量" maxlength="10"
									@blur="salenum" placeholder-class="placeinput" />
							</view>
							<view class="borbom"></view>
						</view>
						<view class="headop">
							<view class="heaadd">
								<text>单价<text class="xh">*</text></text>
								<input type="number" v-model="materForm.F_Price" placeholder="请输入单价" maxlength="10"
									@blur="costname" placeholder-class="placeinput" />
							</view>
							<view class="borbom"></view>
						</view>
						<view class="headop">
							<view class="heaadd">
								<text>税率（%）<text class="xh">*</text></text>
								<input type="number" v-model="materForm.F_TaxRate" @blur="taxrate" placeholder="请输入"
									maxlength="3" placeholder-class="placeinput" />
							</view>
							<view class="borbom"></view>
						</view>
						<view class="headop">
							<view class="heaadd">
								<text>税额<text class="xh">*</text></text>
								<input v-model="F_TaxAamount" disabled placeholder="请输入"
									placeholder-class="placeinput" />
							</view>
							<view class="borbom"></view>
						</view>
						<view class="headop">
							<view class="heaadd">
								<text>销售金额（含税）</text>
								<input v-model="F_SaleTotalPrice" disabled placeholder="请输入"
									placeholder-class="placeinput" />
							</view>
							<view class="borbom"></view>
						</view>
						<view class="headop">
							<view class="heaadd">
								<text>其他成本</text>
								<input type="number" v-model="materForm.F_OtherCost" placeholder="请输入" maxlength="10"
									@blur="cost" placeholder-class="placeinput" />
							</view>
							<view class="borbom"></view>
						</view>
						<view class="headop">
							<view class="heaadd">
								<text>送货位置</text>
								<input v-model="materForm.F_Location" placeholder="请输入" maxlength="30"
									placeholder-class="placeinput" />
							</view>
							<view class="borbom"></view>
						</view>
						<view class="headtarea">
							<view class="heaadd">
								<text>备注</text>
								<textarea v-model="materForm.F_Description" placeholder="请输入备注"
									placeholder-class="placeinput" maxlength="100" />
							</view>
							<!-- <view class="bom"></view> -->
						</view>
						<view class="headtarear">
							<view class="heaadd">
								<text>销售凭证</text>
								<uploadImgs @uploadImg="getUploadImgs"></uploadImgs>
							</view>
							<view class="borbom"></view>
						</view>
					</view>
				</view>
				<!-- <view class="bomppo" v-if="current == 0">
					<view class="top">
						<text class="op">
							销售物资清单
							<view class="bomm"></view>
						</text>
						<view>
							<view class="right">
								<view class="tope">
									<text class="rightlo">物资编号：<text>({{materData.F_MaterialCode}})</text></text>
									<text class="rightlo">物资名称：<text>{{materData.F_MaterialName}}</text></text>
									<text class="rightlo">仓&emsp;&emsp;库：<text>{{materData.F_Name}}</text></text>
								</view>
								<view class="bom">
									<view class="mid">
										<text>规格</text>
										<text class="gg">{{materData.F_Model}}</text>
									</view>
									<view class="xian"></view>
									<view class="mid">
										<text>单位</text>
										<text class="gg">{{materData.F_Unit}}</text>
									</view>
									<view class="xian"></view>
									<view class="mide">
										<text>库存数量</text>
										<text class="gg">{{materData.F_CurrentNum}}</text>
									</view>
								</view>
							</view>
							<view class="bomer"></view>
						</view>
					</view>
				</view> -->
				<view class="opbtn"></view>
			</view>
		</view>
		<view class="bombtn" v-if="active == 0">
			<button type="" plain="true" class="plabtn" @click="cancell()">取消</button>
			<button type="primary" class="prbtn" @click="materialAdd()">保存</button>
		</view>
		<view class="bombtno" v-if="active == 1">
			<button type="" plain="true" class="plabtn" @click="cancell()">取消</button>
			<button type="" plain="true" class="plabtn" @click="saleIsSubmit()">保存</button>
			<button type="primary" class="prbtn" @click="saleIsSubmit('1')">保存并提交</button>
		</view>
	</view>
</template>

<script>
	import uploadImgs from "../../../components/uploadImgs.vue"
	import uniSteps from '../../../components/uni-steps/uni-steps.vue'
	export default {
		data() {
			return {
				active: 0, //当前步骤
				isChecked: false,
				saleData: [],
				saleList: [],
				materData: {},
				materForm: {
					F_SaleNum: "",
					F_OtherCost:""
				},
				payimg: [], //附件
				xsnr: "", //销售内容
				disabled: true,
				proName: "", //项目名称
				procode: "", //项目编号
				saledate: "",
				index: 1,
				list: [{
						title: '选择销售物资'
					},
					{
						title: '新增'
					}
				],
				current: "0",
				items: [{
						value: '1',
						name: '物资销售'
					},
					{
						value: '2',
						name: '非物资销售'
					}
				],
			}
		},
		components: {
			uniSteps,
			uploadImgs
		},
		onLoad() {
			this.proName = uni.getStorageSync('proname')
			this.procode = uni.getStorageSync('procode')
			if (this.current == 0) {
				this.saleDep()
			}
			this.getDate()
		},
		computed: {
			//销售金额
			F_SaleTotalPrice() {
				if (this.materForm.F_Price) {
					console.log(this.materForm.F_TaxRate, 'opoppoppp')
					if (this.materForm.F_TaxRate == null || this.materForm.F_TaxRate == undefined) {
						let num = ""
						return "";
					}
					if(isNaN(this.materForm.F_TaxRate)){
						let num = this.materForm.F_Price * this.materForm.F_SaleNum
						return Number(num).toFixed(2) || ""
					}
					else {
						let num = this.materForm.F_Price * this.materForm.F_SaleNum * (this.materForm.F_TaxRate / 100 + 1)
						return Number(num).toFixed(2) || "";
					}
					// let num = this.materForm.F_Price * this.materForm.F_SaleNum * (this.materForm.F_TaxRate / 100 + 1)
					// return Number(num).toFixed(2) || "";
				}
			},
			//税额
			F_TaxAamount() {
				if (this.materForm.F_Price) {
					if (this.materForm.F_TaxRate == null || this.materForm.F_TaxRate == undefined) {
						let num = ""
						return "";
					}
					if(isNaN(this.materForm.F_TaxRate)){
						let num = 0
						return Number(num).toFixed(2) || "";
					}
					 else {
						let num = this.materForm.F_Price * this.materForm.F_SaleNum * (this.materForm.F_TaxRate / 100)
						return Number(num).toFixed(2) || "";
					}
					// let num = this.materForm.F_Price * this.materForm.F_SaleNum * (this.materForm.F_TaxRate / 100)
					// return Number(num).toFixed(2) || "";
				}
			},
		},
		//顶部导航按钮-----修改
		onNavigationBarButtonTap(e) {
			uni.reLaunch({
				url: "saleindex"
			})
		},
		//物理返回键
		onBackPress(options) {
			uni.reLaunch({
				url: "saleindex"
			})
			return true
		},
		methods: {
			saleDep() {
				let data = {
					proId: uni.getStorageSync('proid'), // string[必填] 项目ID
					id: "", // string[可选] 销售单ID
					selStr: "", // string[可选] 已选择的采购明细ID
				}
				uni.request({
					url: this.url + '/WebApiInterface/Sale/GetStockInfo',
					method: 'POST',
					data: data,
					success: (res) => {
						this.saleData = res.data.Data
						console.log(this.saleData,'销售数量')
					}
				})
			},
			//保存   ----------   下一步
			materialAdd() {
				console.log(this.saleList.length, '表单')
				if (this.saleList.length != 0 || this.current == 1) {
					if (this.active++ > 0) {
						this.active = 1;
					}
					this.materForm.F_OtherCost = 0
				} else {
					uni.showToast({
						icon: 'none',
						title: '请勾选销售物资'
					});
				}

			},
			//取消    ------------   上一步
			cancell() {
				--this.active;
				if (this.active == 0) {
					this.active = 0
					this.saleList = []
					this.materData = {}
					this.materForm = {}
				}
				if (this.active < 0) {
					uni.reLaunch({
						url: "./saleindex"
					})
				}
			},
			//单选
			radioChanges: function(evt) {
				this.current = evt.detail.value - 1
				if (this.current == 0) {
					this.saleDep()
					this.disabled = true
				} else {
					this.saleData = []
					this.disabled = false
				}
				console.log(this.current, 'op')
			},
			//税率限制 0-100
			taxrate: function(event) {
				var value = parseInt(event.target.value)
				this.materForm.F_TaxRate = value
				console.log(event.target.value, '输入的值')
				if (value > 100) {
					this.materForm.F_TaxRate = 100
				}
				if (value < 0 || value == undefined) {
					this.materForm.F_TaxRate = 0
				}
			},
			//销售数量
			salenum: function(event) {
				var value = event.detail.value
				console.log(event.detail.value, '输入的值')
				value = value.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
				value = value.replace(/\.{2,}/g, "."); //保证只有出现一个.而没有多个.
				value = value.replace(/^\./g, ""); //必须保证第一个为数字而不是.
				value = value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
				value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
				value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3"); //只能输入两个小数
				if (value.indexOf(".") < 0 && value != "") {
					//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
					value = parseFloat(value);
				}
				this.$set(this.materForm, 'F_SaleNum', Number(value))
				if (value == 0) {
					this.materForm.F_SaleNum = 1
				}
				if(value > this.materData.F_CurrentNum){
					this.materForm.F_SaleNum = this.materData.F_CurrentNum
				}
				console.log(this.materData.F_CurrentNum,'this.materData.F_CurrentNum')
			},
			cost: function(event) {
				var money = this.materForm.F_OtherCost
				money = String(money).replace(/[^\d.]/g,'')//过滤到非数字  //清除“数字”和“.”以外的字符
				money = String(money).replace(/^\./g, "")//必须保证第一个为数字而不是.
				money = String(money).replace(/\.{2,}/g, ".")//只保留第一个. 清除多余的
				money = String(money).replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
				money = String(money).replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3"); //只能输入两个小数
				// money = parseInt(money)
				if(isNaN(money)){
					money = 0
				}
				this.$set(this.materForm,'F_OtherCost',Number(money))
				console.log(money,'输入')

			},
			costname: function(event) {
				var money = this.materForm.F_Price
				money = String(money).replace(/[^\d.]/g,'')//过滤到非数字  //清除“数字”和“.”以外的字符
				money = String(money).replace(/^\./g, "")//必须保证第一个为数字而不是.
				money = String(money).replace(/\.{2,}/g, ".")//只保留第一个. 清除多余的
				money = String(money).replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
				money = String(money).replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3"); //只能输入两个小数
				// money = parseInt(money)
				if(isNaN(money)){
					money = 0
				}
				this.$set(this.materForm,'F_Price',Number(money).toFixed(2))
				console.log(money,'输入')
			
			},
			//多选
			checksale(item, index) {
				this.materData = item
				this.materForm.F_MaterialName = [item.F_MaterialCode, item.F_MaterialName].join("-")
				this.materForm.F_SaleNum = this.materData.F_CurrentNum
				this.materForm.F_Model = this.materData.F_Model
				this.materForm.F_Unit = this.materData.F_Unit
				// this.materForm.F_TaxRate = 1
				this.materForm.F_OtherCost = 0
				console.log(item, 'op')
			},
			checkio: function(e) {
				this.saleList = e.detail.value
				console.log(this.saleList,'item')
			},
			//保存并提交
			saleIsSubmit(IsSubmit) {
				let payimg = this.payimg.join()
				let arr = []
				let data = {}
				arr.push({
					"F_WarehouseId": this.materData.F_WarehouseId, //仓库ID
					"F_MaterialId": this.materData.F_MaterialId, //材料ID
					"F_MaterialCode": this.materData.F_MaterialCode, //材料编码
					"F_MaterialName": this.materData.F_MaterialName, //材料名称
					"F_Model": this.materData.F_Model, //規格
					"F_Material": this.materData.F_Material, //材质
					"F_Unit": this.materData.F_Unit, //单位
					"F_StockNum": this.materData.F_CurrentNum, //库存数量
					"F_OutStockNum": this.materForm.F_SaleNum, //出库数量
					"F_OutStockCost": this.materForm.F_SaleNum * this.materData.F_Cost, //出库成本
					"F_Cost": this.materData.F_Cost
				})
				if (this.current == 0) {
					console.log(arr, 'arr')
					let one = {
						IsSubmit: "", //是否保存并提交(1是)
						F_Id: "", //销售单ID  
						F_ProId: uni.getStorageSync('proid'), //项目ID
						F_SaleDate: this.saledate, //销售日期
						F_SaleType: 1, //销售类型
						F_MaterialId: this.materData.F_MaterialId, //材料ID
						F_MaterialCode: this.materData.F_MaterialCode, //材料编号
						F_MaterialName: this.materData.F_MaterialName, //材料名称  
						F_Model: this.materData.F_Model, //规格
						F_Material: this.materData.F_Material, //材质
						F_Unit: this.materData.F_Unit, //单位
						F_SaleNum: this.materForm.F_SaleNum, //销售数量
						F_StockNum: this.materData.F_CurrentNum, //库存数量
						F_WarehouseName: this.materData.F_Name, //仓库名称
						F_SaleTotalPrice: Number(this.F_SaleTotalPrice), //销售金额(总价 含税)
						F_Price: Number(this.materForm.F_Price), //销售价格(单价 不含税)
						F_TaxRate: Number(this.materForm.F_TaxRate), //税率(%)
						F_TaxAamount: Number(this.F_TaxAamount), //税额
						F_OtherCost: this.materForm.F_OtherCost, //其它成本
						F_Location: this.materForm.F_Location, //送货位置
						F_Description: this.materForm.F_Description, //备注 
						F_SupplierName: this.materData.F_Remark, //供应商名称
						F_CreatorUserId: uni.getStorageSync('userid'), //用户ID
						F_Files: payimg, //销售凭证
						saleDetails: arr
					}
					data = one
					console.log(data, '保存并提交')
				} else {
					let two = {
						IsSubmit: 1, //是否保存并提交(1是)
						F_Id: "", //销售单ID  
						F_ProId: uni.getStorageSync('proid'), //项目ID
						F_SaleDate: this.saledate, //销售日期
						F_SaleType: 2, //销售类型
						F_MaterialName: this.materForm.F_MaterialName, //材料名称  
						F_Model: this.materForm.F_Model, //规格
						F_Unit: this.materForm.F_Unit, //单位
						F_SaleNum: this.materForm.F_SaleNum, //销售数量
						F_StockNum: this.materForm.F_SaleNum, //库存数量
						F_SaleTotalPrice: Number(this.F_SaleTotalPrice), //销售金额(总价 含税)
						F_Price: Number(this.materForm.F_Price), //销售价格(单价 不含税)
						F_TaxRate: Number(this.materForm.F_TaxRate), //税率(%)
						F_TaxAamount: Number(this.F_TaxAamount), //税额
						F_OtherCost: this.materForm.F_OtherCost, //其它成本
						F_Location: this.materForm.F_Location, //送货位置
						F_Description: this.materForm.F_Description, //备注 
						F_CreatorUserId: uni.getStorageSync('userid'), //用户ID
						F_Files: payimg, //销售凭证
					}
					data = two
				}
				console.log(data, 'two')
				if (!data.F_SaleNum | this.materForm.F_TaxRate == null | !data.F_Price) {
					uni.showToast({
						icon: 'none',
						title: '信息不完整'
					});
					return
				} else {
					uni.request({
						url: this.url + '/WebApiInterface/Sale/AddOrModify',
						method: 'POST',
						data: data,
						success: (res) => {
							this.materData = {}
							this.materForm = {}
							uni.reLaunch({
								url: "./saleindex"
							})
						}
					})
				}


			},
			// 附件
			getUploadImgs(res) {
				this.payimg = res
				console.log(this.payimg, '附件')
			},
			//当前时间
			getDate() {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				this.saledate = [year, month, day].join("-")
				return `${year}-${month}-${day}`;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		.header {
			width: 100%;
			height: 160rpx;
			background-color: #FFFFFF;
			border-top: 1rpx solid #f2f2f2;
			position: fixed;
			top: var(--window-top);
			z-index: 99;
			font-size: 38rpx;

			.headerop {
				height: 160rpx;
				background-color: #FFFFFF;
				display: flex;
				justify-content: center;
				align-items: center;
			}

		}

		.midlo {
			.headertop {
				width: 90%;
				margin: auto;
				margin-top: 190rpx;
				border-radius: 9rpx;

				//新增页面  -------  销售明细
				.xsmx {
					input {
						font-size: 28rpx;
					}

					background-color: #FFFFFF;
					border-radius: 9rpx;

					.mx {
						margin: 30rpx;
						padding-top: 30rpx;
						background-color: #FFFFFF;

						.tou {
							font-size: 34rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #262626;

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
								line-height: 48rpx;
								margin: 20rpx 0rpx;
								color: #666666;

								.xh {
									color: #FF0000;
									margin-left: 9rpx;
								}

								input {
									text-align: right;
								}

								.texjj {
									width: 70%;
									text-align: right;
									margin-right: -12rpx;

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
							}

							.placeinput {
								color: #B3B3B3;
								font-size: 28rpx;
							}
						}

						.headtarear {
							font-size: 28rpx;
							font-family: PingFang SC;
							font-weight: 400;
							margin: 20rpx 0rpx;
							padding-bottom:30rpx;
							color: #666666;
						}

						.bom {
							margin: 20rpx 0rpx;
							height: 1px;
							background: #FAFAFA;
							opacity: 1;
						}
					}
				}

				.bomppo {
					background-color: #FFFFFF;
					border-radius: 9rpx;

					.top {
						margin: 30rpx;
						padding-top: 30rpx;

						.op {
							font-size: 34rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #262626;
						}

						.right {
							.tope {
								display: flex;
								flex-direction: column;

								.rightlo {
									font-size: 28rpx;
									color: #888888;
								}

								text {
									margin-bottom: 20rpx;
									font-size: 28rpx;
									color: #000000;
								}
							}

							.bom {
								display: flex;
								flex-direction: row;
								justify-content: space-between;
								align-items: center;
								width: 90%;
								margin: auto;
								color: #999999;

								.mid {
									display: flex;
									flex-direction: column;
									justify-content: space-between;
									align-items: center;
									margin-top: 9rpx;
									font-size: 26rpx;
									width: 180rpx;

									.gg {
										color: #333333;
									}

									text {
										margin-top: 6rpx;
										font-size: 28rpx;

									}
								}

								.mide {
									display: flex;
									flex-direction: column;
									justify-content: space-between;
									margin-top: 9rpx;
									font-size: 26rpx;
									width: 180rpx;

									.gg {
										color: #333333;
									}

									text {
										margin-top: 6rpx;
										font-size: 28rpx;
									}
								}

								.xian {
									width: 1rpx;
									height: 80rpx;
									margin-top: 20rpx;
									border-right: 1rpx solid #f2f2f2;
								}
							}
						}

						.bomer {
							margin: 30rpx 0;
							height: 1px;
							background: #FAFAFA;
							opacity: 1;
						}

						.bomm {
							margin: 20rpx 0;
							height: 1px;
							background: #FAFAFA;
							opacity: 1;
						}
					}
				}

				// 选择销售物资
				.xzwz {
					height: 220rpx;
					background-color: #FFFFFF;
					border-radius: 9rpx;

					.texinput {
						width: 90%;
						height: 100rpx;
						margin-left: 40rpx;
						padding-top: 20rpx;
						border-bottom: 1rpx solid #f2f2f2;
						display: flex;
						align-items: center;
						font-size: 38rpx;
						font-family: PingFang SC;
						font-weight: bold;
					}

					.bomsale {
						display: flex;
						flex-direction: row;
						justify-content: space-between;
						align-items: center;
						width: 90%;
						height: 100rpx;
						margin: auto;

						.left {
							font-size: 26rpx;
							color: #666666;
						}

						.right {
							font-size: 26rpx;

							radio {
								transform: scale(0.6);
								margin-left: 20rpx;
							}
						}
					}
				}

				.headermid {
					// height: 300rpx;
					background-color: #FFFFFF;
					margin-top: 30rpx;
					border-radius: 9rpx;
					padding: 20rpx;
					display: flex;
					flex-direction: row;

					.left {
						width: 10%;
						height: 300rpx;

						checkbox {
							transform: scale(0.6)
						}
					}

					.right {
						width: 85%;

						.top {
							display: flex;
							flex-direction: column;
							margin-top: 10rpx;
							border-bottom: 1rpx solid #f2f2f2;

							.rightlo {
								color: #888888;
							}

							text {
								margin-bottom: 20rpx;
								font-size: 28rpx;
								color: #000000;
							}
						}

						.bom {
							display: flex;
							flex-direction: row;
							justify-content: space-between;
							align-items: center;
							color: #999999;

							.mid {
								display: flex;
								flex-direction: column;
								width: calc(33.1% - 20rpx);
								align-items: center;
								margin-top: 9rpx;
								font-size: 26rpx;
								.gg {
									width: 100%;
									color: #333333;
									text-align: center;
									word-wrap: break-word;
									word-break: normal;
								}
								.gg2{
									width: 70%;
									color: #333333;
									text-align: left;
								}
								
								text {
									margin-top: 6rpx;
									font-size: 28rpx;

								}
							}
							.mid:nth-child(2){
								border-right: 1rpx solid #f2f2f2;
								border-left: 1rpx solid #f2f2f2;
							}
							.mide {
								display: flex;
								flex-direction: column;
								justify-content: space-between;
								margin-top: 9rpx;
								font-size: 26rpx;

								.gg {
									color: #333333;
								}

								text {
									margin-top: 6rpx;
									font-size: 28rpx;
								}
							}

							.xian {
								width: 1rpx;
								height: 80rpx;
								margin-top: 20rpx;
								border-right: 1rpx solid #f2f2f2;
							}
						}

					}

				}

				.opbtn {
					width: 100%;
					height: 200rpx;
				}
			}
		}


		.bombtn {
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
				width: 30%;
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
				// box-shadow: 0rpx 5rpx 10rpx rgba(39, 152, 253, 0.4);
				color: #2798FD;
			}

			.prbtn {
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 400;
				background-color: #2798FD;
				border: 1rpx solid #2798FD;
				box-shadow: 0rpx 5rpx 10rpx rgba(39, 152, 253, 0.4);
			}
		}
	}
</style>
