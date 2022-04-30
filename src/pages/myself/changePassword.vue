<template>
	<view class="changePassword">
		<view class="midop">
			<!-- <view class="originalPassword">
				<input type="text" :class="['navbarxhx',click==1?'inv-h-se':'']" @focus="click=1" v-model="opop.yuan"
					placeholder="请输入原密码" placeholder-class="placeinput" />
			</view> -->
			<view class="pwd">
				您可以使用设置的新密码，登录工程物资查询
			</view>
			<!-- :class="['navbarxhx',click==1?'inv-h-se':'']"   -->
			<view class="originalPassword" v-show="!seen">
				<input type="text" class="navbarxhx" :class="{'inv-h-se':click === 1 }" @focus="click=1"
					v-model="opop.password" maxlength="20" @blur="pwd" :placeholder="inputs"
					placeholder-class="placeinput" border />
			</view>
			<view class="originalPassword" v-show="seen1">
				<input type="text" class="navbarxhx1" v-model="opop.password" @blur="pwd" :placeholder="inputs"
					placeholder-class="placeinput" maxlength="20" border />
			</view>
			<text class="textyo" v-show="seen2">请输入6-20位登录密码</text>
			<view class="originalPassword" v-show="!pwdsen">
				<input type="text" class="navbarxhx" :class="{'inv-h-se':click === 2 }" @focus="click=2"
					v-model="opop.loginpwd" maxlength="20" @blur="logpwd" :placeholder="inputwo" placeholder-class="placeinput"
					border />
			</view>
			<view class="originalPassword" v-show="pwdsen1">
				<input type="text" class="navbarxhx1" maxlength="20" v-model="opop.loginpwd" @blur="logpwd" :placeholder="inputwo"
					placeholder-class="placeinput" border />
			</view>
			<!-- <text class="textyo" v-show="pwdsen3">请再次确认登录密码</text> -->
			<text class="textyo" v-show="pwdsen2">{{logtext}}</text>
			<view class="submit">
				<button type="primary" @click="submit">提交修改</button>
				<!-- <view class="forgetPassw">
					忘记密码?
				</view> -->
			</view>

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				opop: {},
				click: 0,
				seen: false,
				seen1: false,
				seen2: false,
				pwdsen: false,
				pwdsen1: false,
				pwdsen2: false,
				pwdsen3:false,//请再次确认登录密码
				inputs: "请设置6-20位登录密码",
				inputwo: "请再次确认登录密码",
				logtext:"两次输入的密码不一致"
			}
		},
		//顶部导航按钮-----修改
		onNavigationBarButtonTap(e) {
			uni.reLaunch({
				url: "index"
			})
		},
		methods: {
			//第一次输入密码
			pwd() {
				let pwd = this.opop.password
				if (pwd != undefined && pwd.length < 6) {
					this.seen1 = true
					this.seen = true
					this.seen2 = true
				}
				if (pwd == !undefined || pwd.length > 6 || pwd.length == 6) {
					this.seen = false
					this.seen1 = false
					this.seen2 = false
				}
				console.log(pwd.length, this.seen, '输入的密码')
			},
			//再次确认密码
			logpwd() {
				let log = this.opop.loginpwd
				let pwd = this.opop.password
				if (log != undefined && log != pwd) {
					this.pwdsen = true
					this.pwdsen1 = true
					this.pwdsen2 = true
					return;
				}
				if (log == pwd) {
					this.pwdsen = false
					this.pwdsen1 = false
					this.pwdsen2 = false
				}
				console.log(log.length, this.pwdsen, '输入的密码')
			},
			submit() {
				let data = {
					"id": uni.getStorageSync('userid'), //   [必填]用户主键ID
					"userPassword": this.opop.password //     [必填]密码
				}
				console.log(this.opop.password, '输入的')
				let log = this.opop.loginpwd
				let pwd = this.opop.password
				if(pwd == undefined && log == undefined){
					this.logtext = '请再次输入登录密码'
					this.seen1 = true
					this.seen = true
					this.seen2 = true
					this.pwdsen = true
					this.pwdsen1 = true
					this.pwdsen2 = true
					return;
				}
				//第一次输入的密码 不等于空  并且 小于6 变红
				if (pwd == undefined || pwd.length < 6) {
					this.seen1 = true
					this.seen = true
					this.seen2 = true
					return;
				}
				//两次输入的密码不一致
				if (log != pwd) {
					this.logtext = '两次输入的密码不一致'
					this.pwdsen = true
					this.pwdsen1 = true
					this.pwdsen2 = true
					return;
				}
				// if (!this.opop.password | !this.opop.loginpwd) {
				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: '信息不完整'
				// 	});
				// } 
				else {
					uni.request({
						url: this.url + '/WebApiInterface/User/RevisePassword',
						method: 'POST',
						data: data,
						success: (res) => {
							uni.showToast({
								title: res.data.Info,
								duration: 1000
							});
							setTimeout(function() {
								uni.reLaunch({
									url: "../login"
								})
							}, 1000);
						}
					})
				}

			},
		}
	}
</script>
<style lang="scss">
	.changePassword {
		width: 100%;
		height: 100vh;
		flex-direction: column;
		background: #fff;
		margin-top: 20rpx;
		overflow: hidden;

		.midop {
			width: 90%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin: auto;

			.pwd {
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 400;
				margin-top: 50rpx;
				width: 100%;
				// line-height: 91px;
				color: #333333;
			}

			.originalPassword {
				width: 100%;
				height: 91rpx;
				margin-top: 36rpx;

				.placeinput {
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(0, 0, 0, 0.3);
				}

				.navbarxhx {
					height: 100%;
					padding-left: 27rpx;
					color: #000000;
					font-size: 30rpx;
					line-height: 91px;
					border: 1rpx solid rgba(204, 204, 204, 0.5);
					border-radius: 9rpx;
				}

				.navbarxhx1 {
					height: 100%;
					padding-left: 27rpx;
					color: #000000;
					font-size: 30rpx;
					line-height: 91px;
					border: 1rpx solid rgba(255, 0, 0, 1);
					border-radius: 9rpx;
				}

				.inv-h-se {
					border: 1rpx solid #2798FD;
				}

				.inv-h-se1 {
					border: 1rpx solid rgba(255, 0, 0, 1);
				}
			}

			.textyo {
				color: rgba(255, 0, 0, 1);
				font-size: 26rpx;
				text-align: left;
				width: 100%;
				margin-top: 20rpx;
			}

			.submit {
				width: 100%;
				margin-top: 50rpx;

				// margin-top: 120rpx;
				button {
					width: 100%;
					height: 91rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					background: #2798FD;
					box-shadow: 0rpx 5rpx 10rpx rgba(39, 152, 253, 0.4);
					border-radius: 5rpx;
					color: #fff;
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: 400;
				}

				.forgetPassw {
					text-align: center;
					margin-top: 30rpx;
					font-size: 24rpx;
					font-family: PingFang-SC-Bold;
					color: #0380FE;
					opacity: 1;
				}
			}
		}

	}
</style>
