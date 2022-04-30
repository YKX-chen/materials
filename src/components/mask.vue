<!-- @name: 弹出层组件 -->
<!-- @author: Miraitowa -->
<!-- @version: 1.0 -->
<!-- @dataTime: 2020-1-2 -->
<template>
	<view >
		<div  v-if="maskShow" class="modal">
			<div class="panel">
				<slot>
					
				</slot>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		mounted() {
			console.log(this.maskShow)
		},
		props:['maskShow']
	}
</script>

<style scoped>
	.modal {
	  position: fixed;
	  top: 0;
	  right: 0;
	  bottom: 0;
	  left: 0;
	  z-index: 99;
	  background: rgba(0, 0, 0, 0.6);
	}
	
	.panel {
	  position: fixed;
	  width: 670rpx;
	  /* height: 400rpx; */
	  top: 50%;
	  left: 50%;
	  transform: translate(-50%,-50%);
	  box-sizing: border-box;
	  background-color: #f8f8f8;
	  text-align: left;
	  border-radius: 20rpx;
	 
	}
</style>
