<template>
	<view class="page">
		<view class="header">
			<image src="http://purchase.zhroot.com/attached/appImgs/proslices/ico%E6%90%9C%E7%B4%A2.png"></image>
			<view class="inputTop">
				<input placeholder="请输入项目名称/项目编号" placeholder-class="headerinput" v-model="searcinput" @input="prochoice" />
			</view>
		</view>
		<view class="midpro" v-for="(item,index) in proData" :key="index">
			<view class="bod" @click="leftindex(item.F_Id,item)">
				<view class="midtop">
					<text class="titleb">
						<!-- 某某某项目 -->
						{{item.F_Name}}
						<view class="titlevie"></view>
					</text>
					<view class="imgleft">
						<text class="titlem">
							<!-- R20106000068 -->
							{{item.F_Code}}
						</text>
						<image src="http://purchase.zhroot.com/attached/appImgs/proslices/%E7%AE%AD%E5%A4%B4.png">
						</image>
					</view>
				</view>
				<view class="midmid">
					<text class="titleb">
						项目经理：
						<text>
							<!-- 张三 -->
							{{item.F_ProManage}}
						</text>
					</text>
					<text class="titleb">
						电话：
						<text>
							<!-- 12345678911 -->
							{{item.F_DockPhone}}
						</text>
					</text>
				</view>
				<view class="midbom">
					<text class="titleb">
						项目地址：
						<text>
							<image v-if="item.F_Address != null" src="http://purchase.zhroot.com/attached/appImgs/proslices/%E5%9C%B0%E5%9D%80.png">
							</image>
							<!-- 武汉市武昌区某某某有限公司 -->
							{{item.F_Address}}
						</text>
					</text>
				</view>
			</view>

		</view>
		<view class="bompro"></view>
		<!-- <page-pagination :total="page.total" :pageSize="page.pageSize" :currentPage="page.currentPage" ></page-pagination> -->
	</view>
</template>

<script>
	let page = 1,
		rows = 10;
	export default {
		data() {
			return {
				proData: [],
				proinput: "", //搜索
				proid: "", //项目id 
				requestMore: true,
				page:1,
				
				searcinput:"",
				// page:{
				//        total: 5,
				//        pageSize: 5,
				//        currentPage: 1
				//      }
			}
		},
		onLoad() {
			this.getData(this.page,false)
		},
		//顶部导航按钮-----修改
		onNavigationBarButtonTap(e) {
			uni.reLaunch({
				url:"../index"
			})
		
		},
		onReachBottom() {
			if (this.requestMore) {
				this.page++;
				this.getData(this.page,false)
				// var data = {
				// 	page,
				// 	proName: this.searcinput,
				// 	proTypeId: "",
				// 	rows,
				// 	sidx: "F_CreatorTime",
				// 	sord: "desc",
				// 	status: "",
				// 	type: "",
				// 	userId: uni.getStorageSync("userid"), // string[必填] 人员ID
				// };
				// uni.request({
				// 	url: this.url + "/WebApiInterface/Project/GetProjectPageList",
				// 	method: "POST",
				// 	data: data,
				// 	success: (res) => {
				// 		if (res.data.total <= page) {
				// 			this.requestMore = false;
				// 		}
				// 		this.proData = this.proData.concat(res.data.Data);
				// 		console.log(this.proData, "采购单分页列表(移动端)");
				// 		// this.cardata = res.data.Data
				// 	},
				// });
			}

		},
		methods: {
			//项目列表
			getData:function(page,requestMore) {
				var data = {
					page: page,
					proName: this.searcinput,
					proTypeId: "",
					rows: 10,
					sidx: "F_CreatorTime",
					sord: "desc",
					status: "2",
					type: "",
					userId: uni.getStorageSync("userid"), // string[必填] 人员ID
				};
				uni.request({
					url: this.url + "/WebApiInterface/Project/GetProjectPageList",
					method: "POST",
					data: data,
					success: (res) => {
						console.log(res.data.Data, "项目列表");
						// this.proData = res.data.Data;
						if (res.data.total <= page) {
							this.requestMore = requestMore;
						}
						this.proData = this.proData.concat(res.data.Data)
					},
				});
			},
			//搜索
			prochoice() {
				// console.log(this.searcinput, '输入的内容')
				this.proData=[]
				this.getData(this.page,false)
			},
			leftindex(fid,item) {
				// console.log(fid, 'proid')
				console.log(item, 'item')
				// var data = JSON.stringify(fid)
				// this.$store.proid = fid
				uni.setStorageSync('proid', fid)
				uni.setStorageSync('proname', item.F_Name)
				uni.setStorageSync('procode',item.F_Code)
				uni.setStorageSync('F_Status', item.F_Status)//项目状态
				console.log(uni.getStorageSync('proid'), '项目id')
				console.log(uni.getStorageSync('proname'), '项目名称')
				uni.reLaunch({
					// url:"../index?proid="+data
					url: "../index"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.header {
			width: 100%;
			height: 137rpx;
			background-color: #FFFFFF;
			position: sticky;
			top: var(--window-top);
			z-index: 99;
			display: flex;
			justify-content: center;
			align-items: center;

			image {
				width: 28rpx;
				height: 28rpx;
				position: absolute;
				left: 50rpx;
			}

			.inputTop {
				width: 93%;
				height: 78rpx;
				background-color: #F7F7F7;
				border-radius: 39rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				input {
					width: 80%;
					line-height: 78rpx;
					font-size: 24rpx;

					.headerinput {
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 400;
						line-height: 33rpx;
						color: #737373;
					}
				}
			}


		}

		.midpro {
			width: 93%;
			// height: 220rpx;
			background-color: #FFFFFF;
			margin-top: 30rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-around;

			.bod {
				padding: 30rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-around;

				.midtop {
					display: flex;
					flex-direction: row;
					width: 95%;
					margin-left: 20rpx;
					justify-content: space-between;
					margin-bottom: 20rpx;

					.titleb {
						// width: 400rpx;
						font-size: 38rpx;
						font-family: PingFang SC;
						font-weight: bold;
						line-height: 48rpx;
						color: #262626;
						// display: -webkit-box;
						// /** 对象作为伸缩盒子模型显示 **/
						// overflow: hidden;
						// word-break: break-all;
						// /* break-all(允许在单词内换行。) https://www.w3school.com.cn/cssref/pr_word-break.asp*/
						// text-overflow: ellipsis;
						// /* 超出部分省略号 */
						// -webkit-box-orient: vertical;
						// /** 设置或检索伸缩盒对象的子元素的排列方式 **/
						// -webkit-line-clamp: 1;

						/** 显示的行数 **/
						.titlevie {
							width: 167rpx;
							height: 12rpx;
							margin-top: -5rpx;
							background: linear-gradient(90deg, #2798FD 0%, #FFFFFF 100%);
							border-radius: 9rpx;
						}

					}

					

					.imgleft {
						display: flex;
						align-items: center;
						.titlem {
							font-size: 22rpx;
							font-family: PingFang SC;
							font-weight: 400;
							line-height: 48rpx;
							color: #171717;
							margin-right: 60rpx;
						}
						image {
							width: 24rpx;
							height: 46rpx;
							// position: absolute;
							// left: 50rpx;
						}
					}
				}

				.midmid {
					// width: 80%;
					margin-left: 20rpx;
					display: flex;
					flex-direction: row;
					margin-bottom: 20rpx;

					.titleb {
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 400;
						line-height: 40rpx;
						color: rgba(0, 0, 0, 0.5);
						margin-right: 50rpx;
					}
				}

				.midbom {
					margin-left: 20rpx;
					display: flex;
					flex-direction: row;

					.titleb {
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 400;
						line-height: 40rpx;
						color: rgba(0, 0, 0, 0.5);
						width: 600rpx;
						display: -webkit-box;
						/** 对象作为伸缩盒子模型显示 **/
						overflow: hidden;
						word-break: break-all;
						/* break-all(允许在单词内换行。) https://www.w3school.com.cn/cssref/pr_word-break.asp*/
						text-overflow: ellipsis;
						/* 超出部分省略号 */
						-webkit-box-orient: vertical;
						/** 设置或检索伸缩盒对象的子元素的排列方式 **/
						-webkit-line-clamp: 1;

						/** 显示的行数 **/
						image {
							width: 20.52rpx;
							height: 25.76rpx;
							margin-right: 12rpx;
						}
					}
				}
			}



		}

		.bompro {
			width: 100%;
			height: 100rpx;

		}
	}
</style>
