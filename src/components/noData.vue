<template>
	<view class="noData">
		<image src="https://gqy-bucket-clk.oss-cn-beijing.aliyuncs.com/app-static/noData.png" class="pic" mode="widthFix"></image>
		
	</view>
</template>

<script>
	export default {
		name:'noData',
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.noData{
		display: flex;
		display: -webkit-flex;
		width: 100%;
		height: 100%;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.pic{
			width: 60%;
			margin-bottom: 50rpx;
		}
	}

</style>
