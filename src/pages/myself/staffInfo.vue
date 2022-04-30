<template>
	<view class="main">
		<view class="heard">
			<view class="top">
				成员
			</view>
			<view class="crumbs">
				<text @click="organization()" style="color: #447EFE; margin-right: 10rpx;">{{section}} > </text>
				<text v-if="section2 != null"> {{section2}}</text>
				<text> {{ staffdata.F_FullName}}</text>
			</view>
		</view>
		<view class="mainInfo" v-if="staffInfoData.length == 0">
			<view class="nullpep">暂无成员</view>
		</view>
		<view class="mainInfo">
				<view class="info_item" v-for="(item,index) in staffInfoData">
					<view class="item_img">
						<view v-if="item.F_RealName.length == 2">{{item.F_RealName}}</view>
						<view v-if="item.F_RealName.length == 3">{{item.F_RealName.slice(1)}}</view>
						<view v-if="item.F_RealName.length == 4">{{item.F_RealName.slice(2)}}</view>
						<view v-if="item.F_RealName.length > 5 || item.F_RealName.length == 5">{{item.F_RealName.slice(3,6)}}</view>
					</view>
					<view class="item_info">
						<view class="item_name">
							{{item.F_RealName}}
							<text>
								{{item.F_Gender == 0 ?"女":"男"}}
							</text>
						</view>
						<view class="item_tell">
							联系电话：{{item.F_MobilePhone}}
						</view>

					</view>
					<view class="item_position">
						{{item.F_RoleId}}
					</view>
				</view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				staffdata: [],
				staffInfoData: [],
				section: "",
				section2:"",
				depId: "",
				requestMore: true,
				page: 1
			};
		},
		onLoad(e) {
			console.log(e)
			this.staffdata = JSON.parse(e.data);
			this.section = JSON.parse(e.section)
			if(e.section2 != null ){
				this.section2 = JSON.parse(e.section2)
			}
			this.depId = this.staffdata.F_Id
			this.staffInfo(this.page, false)
		},
		created() {},
		onReachBottom() {
			if (this.requestMore) {
				this.page++;
				this.staffInfo(this.page, false)
			}
		},
		onNavigationBarButtonTap(e) {
			uni.reLaunch({
				url: "organization"
			})
		},
		//物理返回键
		onBackPress(options){
			uni.reLaunch({
				url:"organization"
			})
			return true
		},
		methods: {
			staffInfo: function(page, requestMore) {
				uni.request({
					url: this.url + "/WebApiInterface/User/GetUserPageList",
					data: {
						"rows": 10,
						"page": page,
						"sidx": "F_CreatorTime",
						"sord": "asc",
						"name": "",
						"roleId": "",
						"depId": this.depId,
						"enableMark": ""
					},
					method: "POST",
					success: (res) => {
						console.log(res)
						if (res.data.total <= page) {
							this.requestMore = requestMore;
						}
						this.staffInfoData = this.staffInfoData.concat(res.data.Data)
					},
				});
			},

			organization() {
				uni.reLaunch({
					url: "organization"
				})
			}

		},

	};
</script>

<style lang="scss" scoped>
	.main {
		margin: auto;
		width: 90%;
		height: 100%;
		min-height: 88vh;
		margin-top: 30rpx;
		border-radius: 9rpx;
		background-color: #FFFFFF;

	}

	.heard {
		width: 100%;
		margin-bottom: 10rpx;
	}

	.top {
		padding: 35rpx 30rpx;
		font-size: 34rpx;
		font-family: PingFang SC;
		font-weight: 600;
		color: #262626;
		border-bottom: 1rpx solid #fafafa;
	}

	.crumbs {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 400;
		border-bottom: 1rpx solid #fafafa;
		padding: 30rpx 30rpx;
	}

	.mainInfo {
		padding: 10rpx 30rpx;
		height: 100%;
		.nullpep{
			height: 360rpx;
			font-size: 26rpx;
			color: #666666;
			display: flex;
			justify-content: center;
			align-items: center;
		}

	}

	.info_item {
		font-size: 30rpx;
		padding: 5rpx;
		margin-bottom: 50rpx;
		display: flex;
		align-items: center;
	}

	.item_img {
		float: left;
		height: 83rpx;
		width: 83rpx;
		border-radius: 50%;
		background-color: #447EFE;
		color: #FFFFFF;
		font-family: mao;
		font-size: 26rpx;
		line-height: 83rpx;
		text-align: center;
		// text-overflow: ellipsis;
		// white-space: nowrap;
	}

	.item_info {
		width: 58%;
		display: inline-block;
		margin-left: 20rpx;
	}

	.item_name {
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;

		text {
			font-size: 20rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
			margin-left: 20rpx;
		}
	}

	.item_tell {
		margin-top: 15rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #666666;
	}

	.item_position {
		height: 28rpx;
		line-height: 28rpx;
		font-size: 20rpx;
		padding: 8rpx;
		color: #2798FD;
		margin-top: 40rpx;
		border: 1rpx solid #2798FD;
		float: right;
		border-radius: 10rpx;
	}
</style>
