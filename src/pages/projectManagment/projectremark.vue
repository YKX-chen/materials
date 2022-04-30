<template>
	<view class="page">
		<view class="header">
			<view class="showhead">
				<checkbox-group @change="checkuser">
					<view class="showmid" v-for="(item,index) in userData" :key="index">
						<view class="op">
							<checkbox :value="JSON.stringify(item)"  />
							<view class="hid">
								<text>姓名：{{item.F_RealName}}</text>
								<text>手机号：{{item.F_MobilePhone}}</text>
								<text>{{item.F_OrganizeId}}--{{item.F_RoleId}}</text>
							</view>
						</view>
					</view>
				</checkbox-group>
			</view>
		</view>
		<view class="bom">
			<button type="primary" plain="true" class="plabtn" @click="cancell()">取消</button>
			<button type="primary" class="prbtn" @click="materialAdd()">保存</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userData:[],
				searcinput:"",
				requestMore:true,
				page:1,
				checkU:[],
			}
		},
		onLoad() {
			this.userDep(this.page,false)
		},
		onReachBottom() {
			if (this.requestMore) {
				this.page++
				this.userDep(this.page, false)
			}
		},
		//顶部导航按钮-----修改
		onNavigationBarButtonTap(e) {
			uni.reLaunch({
				url:"projectAdd"
			})
		},
		//物理返回键
		onBackPress(options){
			uni.reLaunch({
				url:"projectAdd"
			})
			return true
		},
		methods: {
			userDep:function(page,requestMore) {
				let data = {
					"rows": 10,
					"page": page,
					"sidx": "F_CreatorTime",
					"sord": "desc",
					"name": "",
					"proId": ""
				}
				uni.request({
					url: this.url + '/WebApiInterface/Project/GetAlternateUser',
					method: 'POST',
					data: data,
					success: (res) => {
						if (res.data.total <= page) {
							this.requestMore = requestMore;
						}
						this.userData = this.userData.concat(res.data.Data);
						// this.userData = res.data.Data
					}
				})
			},
			checkuser(e) {
				this.checkU = e.target.value.map((item)=> { return JSON.parse(item)})
				console.log(this.xmcy,'xmcy')
				console.log(this.checkU,'this.checkU')
			},
			materialAdd(){
				let data = JSON.stringify(this.checkU)
				uni.reLaunch({
					url:"projectAdd?Listu="+data
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.page{
	.headertop {
		width: 100%;
		height: 126rpx;
		background: #FFFFFF;
		font-size: 16rpx;
		text-align: center;
		position: sticky;
		top: var(--window-top);
		z-index: 99;
	
		.search {
			width: 100%;
			height: 56rpx;
			display: flex;
	
			.input {
				width: 90%;
				margin: 20rpx 0 0 20rpx;
				position: relative;
	
				.icon {
					position: absolute;
					left: 37rpx;
					top: 28rpx;
					width: 27rpx;
					height: 27rpx;
					// background-color: #999999;
	
					image {
						width: 29rpx;
						height: 29rpx;
						margin-top: -2rpx;
					}
				}
	
				.see {
					width: 90%;
					height: 78rpx;
					border-radius: 40rpx;
					font-size: 24rpx;
					font-family: PingFang SC;
					color: #737373;
					background: #F7F7F7;
					text-align: left;
					padding-left: 90rpx;
	
					.placeinput {
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 400;
						line-height: 33rpx;
						color: #737373;
						margin-left: 9rpx;
					}
				}
			}
	
		}
	}
	.header{
		.showhead {
			position: relative;
			display: flex;
			flex-direction: column;
			padding: 0 30rpx;
			height: 100%;
			.showmid {
				margin: auto;
				margin-top: 30rpx;
				background-color: #FFFFFF;
				width: 100%;
				height: 160rpx;
				border-radius: 9rpx;
				overflow: hidden;
		
				.op {
					display: flex;
					flex-direction: row;
					align-items: center;
					height: 160rpx;
		
					.hid {
						width: 100%;
						display: flex;
						flex-direction: column;
						font-size: 26rpx;
						color: #666666;
		
						text {
							margin-bottom: 6rpx;
						}
		
						.two {
							width: 100%;
							display: flex;
							justify-content: space-between;
		
							text:nth-child(2n) {
								width: 50%;
							}
						}
					}
				}
		
				checkbox {
					transform: scale(0.6);
				}
		
				label {
					font-size: 26rpx;
				}
			}
		}
	}
	.bom {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 160rpx;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	
		button {
			width: 45%;
			height: 80rpx;
			line-height: 80rpx;
			border: none;
			outline: none;
		}
	
		.plabtn {
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 400;
			border: 1rpx solid #2798FD;
			box-shadow: 0rpx 5rpx 10rpx rgba(39, 152, 253, 0.4);
			color: #2798FD;
		}
	
		.prbtn {
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 400;
			border: 1rpx solid #2798FD;
			box-shadow: 0rpx 5rpx 10rpx rgba(39, 152, 253, 0.4);
		}
	}
}
</style>
