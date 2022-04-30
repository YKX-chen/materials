<template>
	<view class="content">
		<view class="detail">
			<view class="code">
				<view class="title">
					项目
				</view>
				<view class="purchasecode">
					<view>项目名称</view>
					<view>{{info.F_Name}}</view>
				</view>
			</view>
			<view class="name">
				<view>项目简称</view>
				<view>{{info.F_Abbreviation}}</view>
			</view>
			<view class="name">
				<view>对接人</view>
				<input v-model="info.F_DockUser" disabled />
				<!-- <view>{{info.F_DockUser}}</view> -->
			</view>
			<view class="name">
				<view>对接人电话</view>
				<view>{{info.F_DockPhone}}</view>
			</view>
			<view class="name">
				<view>客户</view>
				<view>{{info.F_Customer}}</view>
			</view>
			<view class="name">
				<view>项目类型</view>
				<view>{{info.F_ProType}}</view>
			</view>
			<view class="name">
				<view>工期起始时间</view>
				<view>{{info.F_StartTime|moment}}</view>
			</view>
			<view class="name">
				<view>工期结束时间</view>
				<view>{{info.F_EndTime|moment}}</view>
			</view>
			<view class="name">
				<view>项目经理</view>
				<view>{{info.F_ProManage}}</view>
			</view>
			<view class="name">
				<view>项目成员</view>
				<input v-model="info.F_Remark" disabled />
				<!-- <view>{{info.F_Remark}}</view> -->
			</view>
			<view class="name">
				<view>省/市/区</view>
				<view>{{info.F_Province}}</view>
			</view>
			<view class="name">
				<view>坐标点</view>
				<input v-model="info.F_Remark2" disabled />
				<!-- <view>{{info.F_Remark2}}</view> -->
			</view>
			<view class="name">
				<view>项目规模(万元)</view>
				<view>{{info.F_ProScale}}</view>
			</view>
			<view class="name">
				<view>详细地址</view>
				<input v-model="info.F_Address" disabled />
				<!-- <view>{{info.F_Address}}</view> -->
			</view>
			<!-- 		<view class="name">
				<view>状态</view>
				<view v-if="info.F_Status==1">待采购</view>
				<view v-if="info.F_Status==2">待验收</view>
				<view v-if="info.F_Status==3">已采购</view>
			</view> -->

			<!-- <view class="name">
				<view>项目介绍</view>
				<view>{{info.F_ProIntroduction}}</view>
			</view> -->
			<view class="heaadd">
				<text>项目介绍</text>
				<text class="texnl">{{info.F_ProIntroduction}}</text>
			</view>
		</view>

		<!-- v-if="GetInfoByIdList.length<=0" -->
		<!-- <view class="noway"></view> -->
		<!-- <view class="bom" v-if="this.info.F_Status=='1'">
			<button type="warn" class="plabtn" @click="cancell()">拒绝</button>
			<button type="primary" class="prbtn" @click="adopt('通过')">通过</button>
		</view> -->
		<view class="bom" v-if="status == 1">
			<button type="warn" class="plabtn" @click="cancell(1)">拒绝</button>
			<button type="primary" class="prbtn" @click="cancell(2)">通过</button>
		</view>
		<!-- 弹出层begin -->
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog :type="msgtype" title="驳回说明" :before-close="true" @confirm="dialogConfirm"
				@close="dialogClose">
				<view class="submitj">
					<textarea v-model="explain" placeholder="请输入内容" placeholder-class="placeinput" maxlength="100" />
				</view>
			</uni-popup-dialog>
		</uni-popup>
		<!-- 弹出层end -->
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import uniPopupDialog from "@/components/uni-popup-dialog/uni-popup-dialog.vue"
	export default {
		data() {
			return {
				info: {}, //详情
				msgtype: "warn", //弹出层的类型
				explain: "", //审批驳回时说明
				data:{},
				status:""
			}
		},
		components: {
			uniPopup,
			uniPopupDialog
		},
		onLoad(option) {
			this.status = option.status
			this.ProjectAppRovalInfo()
		},
		created() {},
		//顶部导航按钮-----修改
		onNavigationBarButtonTap(e) {
			uni.reLaunch({
				url: "Examine"
			})
		},
		//物理返回键
		onBackPress(options){
			uni.reLaunch({
				url:"Examine"
			})
			return true
		},
		methods: {
			// 项目审批详情
			ProjectAppRovalInfo: function(e) {
				// var formdata = e.detail.value
				uni.request({
					url: this.url + '/WebApiInterface/Project/ProjectAppRovalInfo',
					method: 'POST',
					// header: {
					// 	Authorization: uni.getStorageSync('Authorization')
					// },
					data: {
						"id": this.$store.projectid //[必填]项目主键ID   
					},
					success: (res) => {
						// console.log(res.data.Data, '项目审批详情');
						this.info = res.data.Data //{{info.F_Province}}/{{info.F_City}}/{{info.F_Area}}
						if (this.info.F_Province) {
							this.info.F_Province = this.info.F_Province + '/' + this.info.F_City + '/' +
								this.info.F_Area
						}
						console.log(this.info, '项目审批详情');
					}
				});
			},


			// // 通过
			// adopt(type) {
			// 	uni.request({
			// 		url: this.url + '/WebApiInterface/Project/ProjectSubmit',
			// 		method: 'POST',
			// 		// header: {
			// 		// 	Authorization: uni.getStorageSync('Authorization')
			// 		// },
			// 		data: {
			// 			"type": "approval", //[必填]类型 （submit 提交， approval 审批 ，complete 完工 ） 
			// 			"explain": "", //[可选] 审批驳回时说明
			// 			"approvalType": type, //[可选]审批类型  项目审批时必填（通过  拒绝）
			// 			"userId": uni.getStorageSync('userid'), //[必填]用户ID
			// 			"id": this.$store.projectid //[必填]项目主键ID   
			// 		},
			// 		success: (res) => {
			// 			console.log(res, '通过');
			// 			if (res.data.StatusCode == 200) {
			// 				uni.reLaunch({
			// 					url: "./Examine"
			// 				})
			// 			} else {
			// 				uni.showToast({
			// 					icon: 'none',
			// 					title: res.data.Info
			// 				})
			// 			}
			// 		}
			// 	});
			// },

			//拒绝  1   通过   2
			cancell(type) {
				console.log(type, 'type')
				this.data = {
					"id": this.$store.projectid, // [必填]销售单主键ID
					"type": "approval", //[必填]类型 （submit 提交， approval 审批） 
					"explain": "", //[可选] 审批驳回时说明
					"approvalType": '通过', //[可选]审批类型  审批时必填（通过  拒绝）
					"userId": uni.getStorageSync('userid') //[必填]用户ID
				}
				if (type == 1) {
					this.$refs.popup.open()
				} else {
					this.submit(this.data)
				}
			},
			//弹出层   确定
			dialogConfirm(data) {
				this.data.approvalType = '拒绝'
				this.data.explain = this.explain
				this.submit(this.data)
				this.$refs.popup.close();
			},
			submit(data){
				console.log(data,'data')
				uni.request({
					url: this.url + '/WebApiInterface/Project/ProjectSubmit',
					method: 'POST',
					data: data,
					success: (res) => {
						if (res.data.StatusCode == 200) {
							this.$refs.popup.close();
							uni.reLaunch({
								url: "./Examine"
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.Info
							})
						}
					}
				})
			},
			//弹出层   取消
			dialogClose() {
				this.explain = ""
				this.$refs.popup.close();
			}

		}
	}
</script>

<style lang="scss">
	* {
		box-sizing: border-box;
		padding: 0;
		margin: 0;
		list-style: none;
	}

	.content {
		background: #F3F3F3;
		padding: 30rpx 0 180rpx 0;
		width: 100%;

		.detail {
			overflow: hidden;
			margin: 0 30rpx;
			background: #FFFFFF;
			.code {
				height: 180rpx;
				background: #FFFFFF;
				padding: 40rpx 30rpx 0 30rpx;
				border-bottom: 1rpx solid #FAFAFA;

				.title {
					font-family: PingFang SC;
					font-weight: bold;
					line-height: 48rpx;
					color: #262626;
				}

				.purchasecode {
					display: flex;
					margin-top: 40rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					color: #666666;
					justify-content: space-between;
				}
			}

			.name {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 90rpx;
				// background: #FFFFFF;
				font-size: 28rpx;
				font-family: PingFang SC;
				line-height: 90rpx;
				color: #666666;
				padding: 0 30rpx;
				border-bottom: 1rpx solid #FAFAFA;
				input{
					width: 70%;
					text-align: right;
					font-size: 28rpx;
				}
			}
			.heaadd{
				font-size: 28rpx;
				font-family: PingFang SC;
				color: #666666;
				padding: 0 30rpx;
				display: flex;
				flex-direction: column;
				text:nth-child(1){
					height: 90rpx;
					line-height: 90rpx;
				}
				.texnl{
					width: 100%;
					height: auto;
					padding-bottom: 20rpx;
					word-wrap: break-word;
					word-break: normal;
				}
				textarea{
					font-size: 28rpx;
					width: 100%;
				}
			}
		}

		.noway {
			width: 690rpx;
			height: 419rpx;
			background: #FFFFFF;
			border-radius: 9rpx;
			text-align: center;
			margin-top: 30rpx;
			line-height: 419rpx;
			color: rgba(153, 153, 153, 0.5);
		}

		.bom {
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 160rpx;
			background-color: #FFFFFF;
			display: flex;
			justify-content: space-around;
			align-items: center;
			padding: 0 10rpx;

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
				border: 1rpx solid rgba(255, 100, 100, 1);
				box-shadow: 0rpx 5rpx 10rpx rgba(255, 100, 100, 0.4);
			}

			.prbtn {
				font-size: 32rpx;
				font-family: PingFang SC;
				border: 1rpx solid #2798FD;
				box-shadow: 0rpx 5rpx 10rpx rgba(39, 152, 253, 0.4);
			}
		}
		.submitj {
			width: 95%;
			border: 1rpx solid #fafafa;
			border-radius: 9rpx;
			font-size: 28rpx;
		
			textarea {
				width: 100%;
			}
		
			.placeinput {
				font-size: 28rpx;
			}
		}
	}
</style>
