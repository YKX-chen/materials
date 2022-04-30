<template>
	<view class="page">
		<view class="header">
			<view class="promid">
				<view class="protop">
					<text>项目</text>
				</view>
				<view class="probom">
					<view class="lis">
						<text>项目名称</text>
						<text>{{projectData.F_Name || prolistinfo.F_Name}}</text>
					</view>
					<view class="lis">
						<text>项目简称</text>
						<text>{{projectData.F_Abbreviation || prolistinfo.F_Abbreviation}}</text>
					</view>
					<view class="lis">
						<text>客户</text>
						<text>{{projectData.F_Customer || prolistinfo.F_Customer}}</text>
					</view>
					<view class="lis">
						<text>项目类型</text>
						<text>{{projectData.F_ProType || prolistinfo.F_ProType}}</text>
					</view>
					<view class="lis">
						<text>项目规模（万元）</text>
						<text>{{projectData.F_ProScale || prolistinfo.F_ProScale}}</text>
					</view>
					<view class="lis">
						<text>工期起始时间</text>
						<text>{{projectData.F_StartTime || prolistinfo.F_StartTime}}</text>
					</view>
					<view class="lis">
						<text>工期结束时间</text>
						<text>{{projectData.F_EndTime || prolistinfo.F_EndTime}}</text>
					</view>
					<view class="lis">
						<text>坐标点</text>
						<text>{{projectData.F_Remark2 || prolistinfo.F_Remark2}}</text>
					</view>
					<view class="lis">
						<text>项目经理</text>
						<text>{{projectData.F_ProManage || prolistinfo.F_ProManage}}</text>
					</view>
					<view class="lis">
						<text>项目成员</text>
						<text>{{prolistinfo.F_Remark1 || prolistinfo.F_Remark}}</text>
					</view>
					<view class="lis">
						<text>省/市/区</text>
						<text v-if="projectData.F_Province != null || prolistinfo.F_Province">{{ssq || prossq}}</text>
						<text v-if="projectData.F_Province == null || prolistinfo.F_Province"></text>
					</view>
					<view class="lis">
						<text>对接人</text>
						<text>{{projectData.F_DockUser || prolistinfo.F_DockUser}}</text>
					</view>
					<view class="lis">
						<text>对接电话</text>
						<text>{{projectData.F_DockPhone || prolistinfo.F_DockPhone}}</text>
					</view>
					<view class="lis">
						<text>详细地址</text>
						<text>{{projectData.F_Address || prolistinfo.F_Address}}</text>
					</view>
					<view class="list">
						<text>项目介绍</text>
						<!-- <view v-if="projectData.F_ProIntroduction != null || prolistinfo.F_ProIntroduction != null">
							<textarea v-model="projectData.F_ProIntroduction" placeholder="请输入项目介绍"
								placeholder-class="placeinput" disabled maxlength="100" />
						</view> -->
						<text  v-if="projectData.F_ProIntroduction != null || prolistinfo.F_ProIntroduction != null">{{projectData.F_ProIntroduction || prolistinfo.F_ProIntroduction}}</text>
						<text v-if="projectData.F_ProIntroduction == null"></text>
					</view>
				</view>
			</view>
		</view>
		<view class="fot"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				projectData: {},
				prolistinfo: {},
				ssq: "",
				prossq:""
			}
		},
		onLoad(options) {
			this.projectData = JSON.parse(options.data)
			if (this.projectData.F_EndTime != null || this.projectData.F_StartTime != null || this.projectData.F_Province != null) {
				this.projectData.F_StartTime = this.projectData.F_StartTime.slice(0, 10)
				this.projectData.F_EndTime = this.projectData.F_EndTime.slice(0, 10)
				this.ssq = this.projectData.F_Province + '/' + this.projectData.F_City + '/' + this.projectData.F_Area
			}
			this.proinfo()
		},
		//顶部导航按钮-----修改
		onNavigationBarButtonTap(e) {
			if (e.index == 1) {
				uni.reLaunch({
					url: "projectList"
				})
			} else {
				var pro = JSON.stringify(this.projectData)
				this.$store.F_Remark1 = this.prolistinfo.F_Remark || this.prolistinfo.F_Remark1 //项目成员
				console.log(this.$store.F_Remark1,'项目成员')
				uni.reLaunch({
					url: "projectEdit?pro=" + pro
				})
			}

		},
		//物理返回键
		onBackPress(options) {
			uni.reLaunch({
				url: "projectList"
			})
			return true
		},
		methods: {
			proinfo() {
				uni.request({
					url: this.url + '/WebApiInterface/Project/ProjectAppRovalInfo',
					method: "POST",
					data: {
						id: this.$store.proid
					},
					success: (res) => {
						this.prolistinfo = res.data.Data
						console.log(this.prolistinfo, '详情')
						this.prolistinfo.F_StartTime = this.prolistinfo.F_StartTime.slice(0, 10)
						this.prolistinfo.F_EndTime = this.prolistinfo.F_EndTime.slice(0, 10)
						this.prossq = this.prolistinfo.F_Province + '/' + this.prolistinfo.F_City + '/' + this.prolistinfo.F_Area
						this.projectData.F_Remark2 = this.prolistinfo.F_Remark2
						// if (this.projectData.F_Province) {
						// 	this.projectData.F_Province = this.projectData.F_Province + '/' + this.projectData
						// 		.F_City + '/' + this.projectData.F_Area
						// }
						// console.log(this.projectData, '详情projectData')
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.page {
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
				width: 90%;
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

					.lis {
						display: flex;
						flex-direction: row;
						justify-content: space-around;
						padding: 20rpx 0;
						border-bottom: 1rpx solid #fafafa;

						text:nth-child(1) {
							width: 40%;
						}

						text:nth-child(2) {
							width: 60%;
							text-align: right;
							color: #333333;
						}
					}

					.list {
						display: flex;
						flex-direction: column;
						margin-top: 20rpx;
						// padding-bottom: 120rpx;
						width: 100%;

						text:nth-child(2) {
							margin-top: 20rpx;
							width: 100%;
							word-wrap: break-word;
							word-break: normal;
						}

						textarea {
							width: 100%;
							font-size: 28rpx;
							font-family: PingFang SC;
							font-weight: 400;
							margin-top: 20rpx;
						}
					}

				}
			}
		}

		.fot {
			width: 100%;
			height: 50rpx;
		}
	}
</style>
