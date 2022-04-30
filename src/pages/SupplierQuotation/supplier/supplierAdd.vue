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
						<text>供应商名称<text class="xh">*</text></text>
						<input v-model="supplierForm.F_SupplierName" placeholder="请输入供应商名称"
							placeholder-class="placeinput" />
					</view>
					<view class="borbom"></view>
				</view>
				<view class="headop">
					<view class="heaadd">
						<text>供应商简称<text class="xh">*</text></text>
						<input v-model="supplierForm.F_Abbreviation" placeholder="请输入供应商简称"
							placeholder-class="placeinput" />
					</view>
					<view class="borbom"></view>
				</view>
				<view class="headop">
					<view class="heaadd">
						<text>联系人<text class="xh">*</text></text>
						<input v-model="supplierForm.F_Contacts" placeholder="请输入联系人" placeholder-class="placeinput" />
					</view>
					<view class="borbom"></view>
				</view>
				<view class="headop">
					<view class="heaadd">
						<text>联系方式<text class="xh">*</text></text>
						<input type="number" v-model="supplierForm.F_MoiblePhone" placeholder="请输入联系方式"
							placeholder-class="placeinput" 	@blur="blurphone(supplierForm.F_MoiblePhone)" maxlength="11"  />
					</view>
					<view class="borbom"></view>
				</view>
				<view class="headop">
					<view class="heaadd">
						<text>供应商资质<text class="xh">*</text></text>
						<picker @change="pickxiala" :value="index" :range="pickList" :range-key="'name'">
							<view class="pickright">
								<view style="padding-top: 5rpx;">{{picktype}}</view>
								<view class="iopmg"></view>
							</view>
						</picker>
					</view>
					<view class="borbom"></view>
				</view>
				<view class="headtarea">
					<view class="heaadd2">
						<text>营业执照附件</text>
						<uploadImg @uploadImg="getUploadImgs"></uploadImg>
					</view>
					<view class="borbom"></view>
				</view>
				<view class="headop">
					<view class="heaadd">
						<text>户名<text class="xh"></text></text>
						<input  v-model="supplierForm.F_AccountName" placeholder="请输入户名"
							placeholder-class="placeinput" @input="numInput" />
					</view>
					<view class="borbom"></view>
				</view>
				<view class="headop">
					<view class="heaadd">
						<text>开户银行<text class="xh"></text></text>
						<input type="text" v-model="supplierForm.F_BankDeposit" placeholder="请输入开户银行"
							placeholder-class="placeinput" @input="numInput" />
					</view>
					<view class="borbom"></view>
				</view>
				<view class="headop">
					<view class="heaadd">
						<text>银行账号<text class="xh"></text></text>
						<input type="number" v-model="supplierForm.F_BankAccount" placeholder="请输入银行账号"
							placeholder-class="placeinput" @input="numInput" />
					</view>
					<view class="borbom"></view>
				</view>
				<view class="headop">
					<view class="heaadd">
						<text>付款方式<text class="xh"></text></text>
						<picker @change="payxiala" :value="indexpay" :range="payList" :range-key="'name'">
							<view class="pickright">
								<view style="padding-top: 5rpx;">{{paytype}}</view>
								<view class="iopmg"></view>
							</view>
						</picker>
					</view>
					<view class="borbom"></view>
				</view>
				<view class="headop">
					<view class="heaadd">
						<text>营业执照号</text>
						<input v-model="supplierForm.F_BusinessLicense" placeholder="请输入营业执照号"
							placeholder-class="placeinput" @input="numInput" />
					</view>
					<view class="borbom"></view>
				</view>
				<view class="headop">
					<view class="heaadd">
						<text>详细地址<text class="xh">*</text></text>
						<input v-model="supplierForm.F_Address" placeholder="请输入详细地址"
							placeholder-class="placeinput" @input="numInput" />
					</view>
					<view class="borbom"></view>
				</view>
				<view class="headop">
					<view class="heaadd">
						<text>省/市/区</text>
						<picker mode="multiSelector" :range="citypro" :value="proindex"
							@columnchange="pickerColumnchange" @change='onSelectCity'>
							<view class="pickright">
								<view style="padding-top: -20rpx;">{{ select }}</view>
								<view class="iopmg"></view>
							</view>
						</picker>
					</view>
				</view>
				<view class="headop">
					<view class="heaadd">
						<text>坐标<text class="xh">*</text></text>
						<input @click="remarkmap" v-model="supplierForm.F_Remark2" placeholder="请输入坐标点"
							placeholder-class="placeinput" />
					</view>
				</view>
				<view class="headop">
					<view class="heaadd">
						<text>负责人<text class="xh">*</text></text>
						<input v-model="supplierForm.F_Responsible" placeholder="请输入负责人"
							placeholder-class="placeinput" @input="numInput" />
					</view>
					<view class="borbom"></view>
				</view>
				<view class="headop">
					<view class="heaadd">
						<text>主营范围<text class="xh"></text></text>
						<input v-model="supplierForm.F_MainBusinessScope" placeholder="请输入主营范围"
							placeholder-class="placeinput" @input="numInput" />
					</view>
					<view class="borbom"></view>
				</view>
				<view class="headop">
					<view class="heaadd">
						<text>结算周期<text class="xh"></text></text>
						<input v-model="supplierForm.F_Cycle" placeholder="请输入结算周期"
							placeholder-class="placeinput" @input="numInput" />
					</view>
					<view class="borbom"></view>
				</view>
				<view class="headop">
					<view class="heaadd">
						<text>收录日期</text>
						<picker mode="date" :value="beginDate" @change="bindDateChange">
							<view class="pickright">
								<view style="padding-top: -20rpx;">{{ beginDate }}</view>
								<view class="iopmg"></view>
							</view>
						</picker>
					</view>
				</view>
				<view class="headop">
					<view class="heaadd">
						<text>是否厂家<text class="xh">*</text></text>
						<u-radio-group v-model="F_IsFactory">
							<u-radio @change="radioChange" v-for="(item, index) in items" :key="index" :name="item.name"
								:disabled="item.disabled">
								{{item.name}}
							</u-radio>
						</u-radio-group>
					</view>
				</view>
				<view class="headtarea">
					<view class="heaadd">
						<text>说明</text>
						<textarea v-model="supplierForm.F_Description" placeholder="请输入说明"
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
	import cityData from "../../../store/city.js"
	import uploadImg from '../../../components/uploadImgs.vue'
	export default {
		data() {
			return {
				noClick:true,
				index: 0,
				supplierForm: {
					F_Remark2: ""
				},
				picktype: "请选择", //供应商资质
				pickId: "", //供应商资质id
				pickList: [{
						id: '1',
						name: '优质'
					},
					{
						id: '2',
						name: '一般'
					},
					{
						id: '3',
						name: '差'
					},
					{
						id: '1',
						name: '弃用'
					}
				],
				indexpay: 0, //支付方式
				payId: "", //支付id
				paytype: '请选择',
				payList: [{
						id: '1',
						name: '现结'
					},
					{
						id: '2',
						name: '欠款'
					},
				],
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
				disabled: false,


				currentCity: cityData.data, //省市区
				select: '请选择', //省市区
				select1: "",
				select2: "",
				select3: "",
				citypro: [
					[],
					[],
					[]
				], //省市区下拉
				proindex: [0, 0, 0],
				payimg: [],
				beginDate: "请选择", //开始时间
				items: [{
						name: "是",
						disabled: false
					},
					{
						name: "否",
						disabled: false
					}
				],
				F_IsFactory: "否"
			}
		},
		onLoad() {

			// this.wzbh()
			this.materdate()
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
		//顶部导航按钮-----修改
		onNavigationBarButtonTap(e) {
			uni.reLaunch({
				url: "./index"
			})
		},
		//物理返回键
		onBackPress(options) {
			uni.reLaunch({
				url: "./index"
			})
			return true
		},
		components: {
			uploadImg
		},
		methods: {
			// 过滤input框多余的0
			numInput(e) {
				console.log(e.detail.value, "e.detail.value");

				//正则表达试
				e.detail.value = (e.detail.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null
				//重新赋值给input
				this.$nextTick(() => {
					this.supplierForm.F_DemandNum = e.detail.value
				})
			},
			//获取坐标点
			remarkmap() {
				var that = this
				uni.chooseLocation({
					success: function(res) {
						console.log('位置名称：' + res.name);
						console.log('详细地址：' + res.address);
						console.log('纬度：' + res.latitude);
						console.log('经度：' + res.longitude);
						let op = [res.longitude, res.latitude].join()
						that.supplierForm.F_Remark2 = op
						console.log(that.supplierForm.F_Remark2, 'op')
					}
				});
			},
			// 附件
			getUploadImgs(res) {
				this.payimg = res
				console.log(this.payimg, '附件')
			},
			//供应商资质  下拉选择
			pickxiala: function(e) {
				this.index = e.target.value
				this.picktype = this.pickList[this.index]
				for (let a = 0; a < this.pickList.length; a++) {
					if (a == this.index) {
						this.picktype = this.pickList[a].name
						this.pickId = this.pickList[a].id
					}
				}
			},
			//付款方式  下拉选择
			payxiala: function(e) {
				this.indexpay = e.target.value
				this.paytype = this.payList[this.indexpay]
				for (let i = 0; i < this.payList.length; i++) {
					if (i == this.indexpay) {
						this.paytype = this.payList[i].name
						this.payId = this.payList[i].id
					}
				}
			},
			//是否厂家
			radioChange(e) {
				this.F_IsFactory = e
				console.log(this.F_IsFactory, 'F_IsFactory')
			},

			//新增供应商
			materialAdd() {
				let F_IsFactory = ""
				if (this.F_IsFactory == '是') {
					F_IsFactory = 1
				} else {
					F_IsFactory = 2
				}
				var Form = {
					"F_SupplierName": this.supplierForm.F_SupplierName, // 供应商名称
					"F_Abbreviation": this.supplierForm.F_Abbreviation, //供应商简称
					"F_Contacts": this.supplierForm.F_Contacts, //联系人
					"F_MoiblePhone": this.supplierForm.F_MoiblePhone, //联系方式
					"F_AccountName": this.supplierForm.F_AccountName, //户名
					"F_BankDeposit": this.supplierForm.F_BankDeposit, //开户银行
					"F_BankAccount": this.supplierForm.F_BankAccount, //银行账号  
					"F_PaymentType": this.payId, //付款方式
					"F_BusinessLicense": this.supplierForm.F_BusinessLicense, //营业执照号
					"F_BusinessLicenseFile": this.payimg.join(), //营业执照附件
					"F_Responsible": this.supplierForm.F_Responsible, //负责人
					"F_Province": this.select1, //省
					"F_City": this.select2, //市
					"F_Area": this.select3, //区
					"F_Address": this.supplierForm.F_Address, //详细地址
					"F_Cycle": this.supplierForm.F_Cycle, //结算周期
					"F_IncludedTime": this.supplierForm.beginDate, //收录日期  
					"F_MainBusinessScope": this.supplierForm.F_MainBusinessScope, //主营范围   
					"F_Description": this.supplierForm.F_Description, //说明
					"F_CreatorUserId": uni.getStorageSync('userid'), //用户ID
					"F_Type": this.pickId, //状态（1优质 2一般 3差 4弃用）
					"F_IsFactory": F_IsFactory, //是否厂家(1是 2否)
					"F_Remark2": this.supplierForm.F_Remark2, //坐标点
					"F_StrRemark":"app"
				}
				console.log(Form, 'form')
				if (this.beginDate == '请选择' | !Form.F_SupplierName | !Form.F_Abbreviation | !Form.F_Contacts | !Form
					.F_MoiblePhone | this.picktype == '请选择' | !Form.F_Address | !Form.F_Remark2) {
					uni.showToast({
						icon: 'none',
						title: '信息不完整'
					});
				} else {
					uni.request({
						url: this.url + '/WebApiInterface/Supplier/AddOrModify',
						method: 'post',
						data: Form,
						success: (res) => {
							if (res.data.StatusCode == 200) {
								uni.showToast({
									icon: 'none',
									title: res.data.Info
								});
								uni.reLaunch({
									url: "./index"
								})

							}

						}
					})
					console.log(this.supplierForm)
				}
			},
			//取消
			cancell() {
				this.supplierForm = {}
				// var data = JSON.stringify(this.proid)
				uni.reLaunch({
					// url: "Saleplan?proid=" + data
					url: "./index"
				})
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
			},
			//开始时间
			bindDateChange(e) {
				this.beginDate = e.target.value
			},
			//当前时间
			materdate() {
				var now = new Date()
				var year = now.getFullYear(); //得到年份
				var month = now.getMonth(); //得到月份
				var date = now.getDate(); //得到日期
				month = month + 1;
				month = month.toString().padStart(2, "0");
				date = date.toString().padStart(2, "0");
				this.materF_Date = `${year}-${month}-${date}`;
				console.log(this.materF_Date, 'data')
			},
				//校验手机号
			blurphone(phone) {
				if (phone) {
					var reg = /^1[3456789]\d{9}$/;
					if (!reg.test(phone)) {
						uni.showToast({
							icon: "none",
							title: '请输入有效的手机号码',
						});
						this.supplierForm.F_MoiblePhone = ""
						
					}
				}
			},
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
			margin-bottom: 200rpx;

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
			// height: 200rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			margin: 20rpx 0rpx;
			color: #666666;
			// padding-bottom: 10rpx;

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
