<template>
	<view class="bod">
		<view class="header">
			<view class="toux">
				<view class="img" v-if="userData.headIcon == null">
					<view>{{nameimg}}</view>
				</view>
				<view class="img" v-if="userData.headIcon != null">
					<image :src="headimg"></image>
				</view>
				<view class="left">
					<view class="top">
						<text class="gongh">工号：{{jobnum || ""}}<text class="role">{{rolename}}</text></text>
						<text class="namebom">{{username}}<text class="phonebom">
								<image src="../../static/image/phone.png"></image>
								{{phone || ""}}
							</text></text>
					</view>
				</view>
			</view>
			<view class="bom">
				<view class="left" @click="project()">
					<image src="http://purchase.zhroot.com/attached/appImgs/myselfslices/%E8%B7%AF%E5%BE%84%208945.png">
					</image>
					<text>我的项目</text>
				</view>
				<view class="mid"  @click="organization()">
					<image src="http://purchase.zhroot.com/attached/appImgs/myselfslices/%E8%B7%AF%E5%BE%84%208948.png">
					</image>
					<text>组织架构</text>
				</view>
				<view class="right" @click="updatepwd()">
					<image
						src="http://purchase.zhroot.com/attached/appImgs/myselfslices/%E4%BF%AE%E6%94%B9%E5%AF%86%E7%A0%81.png">
					</image>
					<text>修改密码</text>
				</view>
			</view>
		</view>
		<view class="bomko"></view>
		<view class="clear">
			<view class="leftclear">
				<!-- <image src="http://purchase.zhroot.com/attached/appImgs/myselfslices/%E8%B7%AF%E5%BE%84%208946.png">
				</image> -->
				<text>版本信息：</text>
			</view>

			<text class="huanc">{{versionStr}}</text>
		</view>
		<view class="bomk"></view>
		<view class="btnbom">
			<button type="primary" @click="outlogin()">退出登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userData: uni.getStorageSync('userData'),
				username: "",
				rolename: "",
				jobnum: "",
				phone: "",
				nameimg: "",
				headimg: "",
				versionStr:''
			}
		},
		onLoad() {
			this.username = this.userData.F_RealName
			this.rolename = this.userData.F_RoleName
			this.jobnum = this.userData.F_JobNum
			this.phone = this.userData.F_MobilePhone
			if (this.userData.headIcon != null) {
				this.headimg = this.url + this.userData.headIcon
				console.log(this.headimg, '头像')
			} else {
				if (this.username.length == 2) {
					this.nameimg = this.username
				}
				if (this.username.length == 3) {
					this.nameimg = this.username.slice(1)
				}
				if (this.username.length == 4) {
					this.nameimg = this.username.slice(2)
				}
				if (this.username.length > 3) {
					this.nameimg = this.username.slice(2, 4) //截取‘系统管理员’2-4之间的字
				}
			}
			this.versionStr=  uni.getStorageSync("version"),
			// this.nameimg = this.username.slice(0,1)
			console.log(this.nameimg, '名字')
		},
		methods: {
			// 我的项目
			project() {
				uni.reLaunch({
					url: "prolist"
				})
			},
			// 组织架构
			organization(){
				uni.reLaunch({
					url:"organization"
				})
			},
			outlogin() {
				console.log()
				uni.request({
					url: this.url + '/WebApiInterface/ApiLogin/OutLogin',
					method: 'POST',
					data: {
						userId: uni.getStorageSync('userid')
					},
					success: (res) => {
						if (res.data.StatusCode == 200) {
							uni.removeStorageSync('token')
							uni.removeStorageSync('userid')
							uni.removeStorageSync('userData')
							uni.showToast({
								title: "退出成功",
								duration: 1000
							});
							setTimeout(function() {
								uni.reLaunch({
									url: "../login"
								})
							}, 1000);

						}
					}
				})
			},
			// 修改密码
			updatepwd() {
				uni.reLaunch({
					url: "changePassword"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	* {
		box-sizing: border-box;
		padding: 0;
		margin: 0;
		list-style: none;
	}

	.bod {
		width: 100%;
		min-height: 100vh;
		background-color: #FFFFFF;
		.op{
			color: #D08770;
		}
		.header {
			width: 100%;
			height: auto;
			margin: auto;
			background-color: #FFFFFF;
			padding-bottom: 50rpx;

			.toux {
				display: flex;
				flex-direction: row;
				align-items: center;
				width: 90%;
				margin: auto;
				padding-top: 100rpx;

				.img {
					width: 30%;

					view {
						display: flex;
						justify-content: center;
						align-items: center;
						color: #FFFFFF;
						width: 167rpx;
						height: 167rpx;
						font-family: mao;
						font-size: 46rpx;
						background-color: #447EFE;
						border-radius: 50%;
					}

					image {
						width: 167rpx;
						height: 167rpx;
						border-radius: 50%;
					}
				}

				.left {
					width: 70%;

					.top {
						display: flex;
						flex-direction: column;

						.gongh {
							font-size: 28rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #A1A1A1;

							.role {
								border: 1rpx solid #447EFE;
								color: #447EFE;
								padding: 3rpx 10rpx;
								border-radius: 30rpx;
								margin-left: 10rpx;
							}
						}

						.namebom {
							font-size: 48rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #000000;
							margin-top: 20rpx;

							.phonebom {
								font-size: 28rpx;
								font-family: PingFang SC;
								font-weight: 400;
								color: #A2A2A2;
								margin-left: -20rpx;

								image {
									width: 25rpx;
									height: 25rpx;
									margin: 0 10rpx 0 50rpx;
								}
							}
						}
					}
				}

			}

			.bom {
				display: flex;
				flex-direction: row;
				justify-content: space-around;
				margin-top: 60rpx;
				width: 100%;

				.left {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					align-items: center;

					image {
						width: 39rpx;
						height: 35rpx;
					}
				}

				.mid {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					align-items: center;

					image {
						width: 42rpx;
						height: 38rpx;
					}
				}

				.right {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					align-items: center;

					image {
						width: 31rpx;
						height: 36rpx;
					}
				}

				text {
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #666666;
					margin-top: 10rpx;
				}

			}
		}

		.bomko {
			width: 100%;
			height: 20rpx;
			background-color: #F3F3F3;
		}

		.bomk {
			width: 100%;
			height: 3rpx;
			background-color: #F3F3F3;
		}

		.clear {
			display: flex;
			align-items: center;
			justify-content: space-around;
			padding: 30rpx;
			background-color: #FFFFFF;

			.leftclear {
				width: 80%;
				display: flex;
				flex-direction: row;
				align-items: center;

				image {
					width: 32rpx;
					height: 32rpx;
				}

				text {
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					// line-height: 48rpx;
					color: #000000;
					margin-left: 20rpx;
				}
			}

			.huanc {
				width: 20%;
				text-align: right;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #999999;
			}


		}

		.btnbom {
			padding: 30rpx;
			margin-top: 32%;
			background-color: #FFFFFF;

			button {
				border: none;
				height: 100rpx;
				line-height: 100rpx;
				background-color: #2798FD;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				box-shadow: 0px 3px 5px rgba(39, 152, 253, 0.4);
			}
		}
	}
</style>
