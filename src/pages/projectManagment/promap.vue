<template>
	<view class="page">
		<!-- <map class="map" scale="14" :markers="markers" @markertap="makertap"></map> -->
		<view class="map_container">
			<map @click="dianji" id="map" @markertap="markertap" @tap="tap" @controltap="bindControltap"
				:controls="controls" style="width: 100%;height: 90vh;" :markers="markers" :scale="15"
				:latitude="latitude" :show-location="true" :longitude="longitude">
			</map>
			<view v-for="(item,index) in markers">坐标：{{item.latitude}}</view>
			<button type="primary" @click="frmark">确定</button>
		</view>
	</view>
</template>

<script>
	import amap from '../../store/amap-wx.130.js'
	export default {
		data() {
			return {
				// subNVue: '',
				// subNVueShowDetail: '',
				// msg: '',

				id: 0, // 使用 marker点击事件 需要填写id
				title: 'map',
				// // longitude: 116.39742,  // 默认的是北京经纬度
				// // latitude: 39.909,
				longitude: "114.32312",
				latitude: "30.580748",
				op: "",
				controls: [{
					id: 111, //控件id
					iconPath: '../../static/image/dingwei.png', //显示的图标   
					position: { //控件在地图的位置
						left: 0,
						top: 0,
						width: 60,
						height: 60,
					},
					clickable: true

				}],
				markers: [
					// 	{
					// 	id: 'gyqy',
					// 	latitude: '29.595587852178966',
					// 	longitude: '106.22169495575275',
					// 	title: '企业',
					// 	iconPath:"../"
					// }, 
				]
			}
		},
		//顶部导航按钮-----修改
		onNavigationBarButtonTap(e) {
			uni.reLaunch({
				url: "projectAdd"
			})
		},
		//物理返回键
		onBackPress(options) {
			uni.reLaunch({
				url: "projectAdd"
			})
			return true
		},
		onLoad() {
			this.getDeviceLocation()
			// var amapFile = require('store/amap-wx.130.js');
			// var that = this;
			// var myAmapFun = new amapFile.AMapWX({
			// 	key: '1e3e8bc48290cc4a349f43c36a783a4e'
			// });
			// myAmapFun.getPoiAround({
			// 	success: function(data) {
			// 		//成功回调
			// 	},
			// 	fail: function(info) {
			// 		//失败回调
			// 		console.log(info,'失败')
			// 	}
			// })
		},
		onReady() {
			this.createMap() //地图创建在页面中需要在onReady调用
		},
		methods: {
			// 创建地图
			createMap() {
				let mapContext = uni.createMapContext('map')
				mapContext.$getAppMap().showUserLocation() //显示用户位置
				let screenWidth = uni.getSystemInfoSync().screenWidth
				var coefficient = screenWidth / 750
				this.controls = [{
					id: "mapType",
					controlId: "mapType",
					position: {
						width: 72 * coefficient,
						height: 72 * coefficient,
						left: 658 * coefficient,
						top: 110 * coefficient
					},
					iconPath: "./logo.png",
					clickable: true
				}]

			},
			// 获取设备位置
			getDeviceLocation() {
				let that = this
				plus.geolocation.getCurrentPosition(function(p) {
					let longitude = p.coords.longitude
					let latitude = p.coords.latitude
					console.log(`经度:${longitude} 纬度:${latitude}`)
					// this.longitude = longitude
					// this.latitude = latitude
					that.markers = [{
						id: 0,
						longitude: longitude,
						latitude: latitude,
						iconPath: "http://purchase.zhroot.com/attached/appImgs/proslices/%E5%9C%B0%E5%9D%80.png"
					}]
					console.log(that.markers, 'biaoji ')
				}, function(e) {
					console.log('Geolocation error: ' + e);
				}, {
					"enableHighAccuracy": "true", // 是否高精确度获取位置信息
					"provider": "system", // 优先使用的定位模块
				});
			},
			bindControltap(e) {
				console.log(e)
			},
			tap(e) {
				console.log("===你点击了地图点===", e)
			},
			markertap(e) {
				console.log("===你点击了标记点===")
			},
			//确定
			frmark(){
				console.log(this.longitude,'选择的')
				uni.reLaunch({
					url:'projectAdd?remark='+this.longitude
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		.map {
			width: 750rpx;
			height: 750rpx;
		}

		.map_container {
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;

			.img {
				width: 20.52rpx;
				height: 25.76rpx;
				margin-right: 12rpx;
			}
		}

	}
</style>
