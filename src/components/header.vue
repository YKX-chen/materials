<template>
	<!-- 头部 -->
	<div class="pageHeader">
		<div v-if="hasBack" class="back" @click="back">
			<image src="https://gqy-bucket-clk.oss-cn-beijing.aliyuncs.com/app-static/back%402x.png" mode=""></image>
		</div>
		<div class="title" :style="{'padding':!hasBack?'0 40rpx':'0'}">{{title}}</div>
		<view class="right">
			<slot name="rightBtn"></slot>
		</view>
	</div>
</template>

<script>
	export default {
		name: "tabBar",
		props: {
			title:{
				type:String,
				default:''
			},
			hasBack:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
			};
		},
		watch: { 
			$route(to,from) {
				// var pages = getCurrentPages();
				// console.log(pages.length)
				// if(pages.length > 1){
				// 	this.hasBack = true;
				// }
				// else{
				// 	this.hasBack = false;
				// }
				
			} 
		},
		created() {
			var pages = getCurrentPages();
			var page = pages[pages.length - 1];
			// #ifdef APP-PLUS
			var currentWebview = page.$getAppWebview();
			console.log(currentWebview.id);//获得当前webview的id
			console.log(currentWebview.isVisible());//查询当前webview是否可见
			console.log(pages.length)
			// #endif
		},
		onLoad() {
		},
		methods: {
			back(){
				uni.navigateBack()
			},
			tabbarSwitch(index, pagePath, verify) {
				console.log(pagePath)
				if (verify) {
					this.changeTabBar({
						index: index
					})
					uni.switchTab({
						url: pagePath
					})
				} else {
					this.$emit("click", {
						index: index,
						pagePath: pagePath,
						verify: verify
					})
				}

			}
		}
	}
</script>

<style lang="scss" scoped>
	.pageHeader{
		height: 90rpx;
		width: 100%;
		background-color: #FFFFFF;
		overflow: hidden;
		display: flex;
		padding-top: var(--status-bar-height);
		align-items: center;
		justify-content: center;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99;
		.back {
			display: flex;
			display: -webkit-flex;
			align-items: center;
			justify-content: center;
			width: 90rpx;
			height: 90rpx;
			image {
				width: 40rpx;
				height: 30rpx;
			}
		}
	
		.title {
			display: flex;
			display: -webkit-flex;
			align-items: center;
			flex: 1;
			-webkit-box-flex:1;
			font-size: 40rpx;
			color: #000;
			font-family: PingFang SC;
			line-height: 56rpx;
		}
		.right{
			display: flex;
			display: -webkit-flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>
