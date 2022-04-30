<template>
	<view class="tabBar">
		<view class="barBox" v-for="(item,index) in tabBar">
			<view class="iconBox" @tap="tabbarSwitch(index,item.pagePath,item.verify)">
				<image v-if="index == active" :src="item.activeIcon" class="activeIcon" mode="heightFix"></image>
				<image v-else :src="item.icon" class="icon" mode="heightFix"></image>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		name: "tabBar",
		props: {
			// active:{
			// 	type:Number,
			// 	value:0
			// }
			// list:{
			// 	type:Array
			// }
		},
		computed: mapState(["tabBarIndex", "tabBar"]),
		watch: {
			tabBarIndex() {
				this.active = this.tabBarIndex
			}
		},
		data() {
			return {
				active: 1
			};
		},

		created() {
			this.active = this.tabBarIndex;
			this.tabbarSwitch(this.active,this.tabBar[this.active].pagePath,this.tabBar[this.active].verify)
		},
		methods: {
			...mapMutations(['changeTabBar']),
			tabbarSwitch(index, pagePath, verify) {
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

<style scoped>
	.tabBar {
		display: flex;
		display: -webkit-flex;
		width: 100%;
		height: 98rpx;
		position: fixed;
		bottom: var(--window-bottom);
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		background-color: rgb(255, 255, 255);
		box-shadow: 0 0 10px rgba(216, 184, 132, 0.27);
		border-top: 0;
		/* border-top-left-radius: 20px; */
		/* border-top-right-radius: 20px; */
	}

	.barBox {
		display: flex;
		display: -webkit-flex;
		width: 100%;
		height: 98rpx;
		justify-content: space-around;
		align-items: center;
	}

	.iconBox {
		display: flex;
		display: -webkit-flex;
		width: 98rpx;
		height: 98rpx;
		justify-content: center;
		align-items: center;
	}

	.icon {
		height: 40rpx;
	}

	.activeIcon {
		height: 116rpx;
	}
</style>
