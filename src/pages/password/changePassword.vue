<template>
	<view class="changePassword">
		<view class="originalPassword">
			<input type="text" value="" placeholder="请输入原密码" border />
		</view>
		<view class="originalPassword" style="margin-top: 34rpx;">
			<input type="text" value="" placeholder="请设置6-20位登录密码" border />
		</view>
		<view class="originalPassword" style="margin-top: 34rpx;">
			<input type="text" value="" placeholder="请再次确认登录密码" border />
		</view>
		<view class="submit" style="margin-top: 34rpx;">
			提交修改
			<!-- 	<input type="text" value="" placeholder="请再次确认登录密码" border /> -->
		</view>
		<view class="forgetPassw">
			忘记密码?
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.changePassword {
		width: 100%;
		height: 100vh;
		flex-direction: column;
		background: #fff;
		margin-top: 20rpx;
		overflow: hidden;

		.originalPassword {
			margin: 67rpx 0 0 55rpx;
			width: 640rpx;
			height: 91rpx;
			border: 1rpx solid rgba(204, 204, 204, 0.5);
			border-radius: 5rpx;

			input {
				padding-left: 27rpx;
				width: 640rpx;
				height: 91rpx;
				color: #000000;
				font-size: 30rpx;
				line-height: 91px;
			}
		}

		.submit {
			margin: 67rpx 0 0 55rpx;
			width: 640rpx;
			height: 91rpx;
			background: #2798FD;
			box-shadow: 0rpx 5rpx 10rpx rgba(39, 152, 253, 0.4);
			border-radius: 5rpx;
			color: #fff;
			text-align: center;
			line-height: 91rpx;
		}

		.forgetPassw {
			margin: 153rpx 0 0 315rpx;
			font-size: 24rpx;
			font-family: PingFang-SC-Bold;
			color: #0380FE;
			opacity: 1;
		}

	}
</style>
