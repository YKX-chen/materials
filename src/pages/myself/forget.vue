<template>
	<view class="bad">
		<view class="top">
			请您输入验证码
		</view>
		<view class="phone">
			验证码已发送到您的手机
		</view>
		<view class="number">
			+86 13659856985
		</view>
		<view class="six">
			6位数字验证码
		</view>
		<view class="inputbox">
			<input :class="['navbarxhx',click==0?'inv-h-se':'']" @focus="click=0" focus type="text" value="" />
			<input :class="['navbarxhx',click==1?'inv-h-se':'']" @focus="click=1" type="text" value="" />
			<input :class="['navbarxhx',click==2?'inv-h-se':'']" @focus="click=2" type="text" value="" />
			<input :class="['navbarxhx',click==3?'inv-h-se':'']" @focus="click=3" type="text" value="" />
			<input :class="['navbarxhx',click==4?'inv-h-se':'']" @focus="click=4" type="text" value="" />
			<input :class="['navbarxhx',click==5?'inv-h-se':'']" @focus="click=5" type="text" value="" />

			<!-- <input type="text" value="" />
			<input type="text" value="" />
			<input type="text" value="" />
			<input type="text" value="" />
			<input type="text" value="" /> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				click: 0
			}
		},
		//顶部导航按钮-----修改
		onNavigationBarButtonTap(e) {
			uni.reLaunch({
				url:"index"
			})
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	* {
		padding: 0;
		margin: 0;
	}

	.bad {
		width: 100%;
		height: 100vh;
		background-color: #FFFFFF;
		margin-top: 20rpx;
		overflow: hidden;

		.top {
			margin: 27rpx 0 0 50rpx;
			color: #333333;
			font-size: 40rpx;
			font-family: PingFang SC;
			font-weight: bold;
		}

		.phone {
			margin: 14rpx 0 0 50rpx;
			font-size: 24rpx;
			font-family: PingFang SC;
			color: #333333;
		}

		.number {
			margin: 14rpx 0 0 50rpx;
			font-size: 26rpx;
			font-family: PingFang SC;
			color: #333333;
		}

		.six {
			margin: 30rpx 0 0 50rpx;
			font-size: 22rpx;
			font-family: PingFang SC;
			color: #333333;
		}

		.inputbox {
			margin-top: 24rpx;
			width: 100%;
			height: 90rpx;
			display: flex;
			justify-content: space-around;

			.navbarxhx {
				width: 90rpx;
				height: 90rpx;
				border: 1rpx solid rgba(0, 0, 0, 0.2);
				text-align: center;
			}

			.inv-h-se {
				border: 1rpx solid #2798FD;
			}
		}
	}
</style>
