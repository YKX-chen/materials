<!-- @name: 上传图片组件 -->
<!-- @author: Miraitowa -->
<!-- @version: 1.0 -->
<!-- @dataTime: 2020-1-2 -->
<template>
	<div class="box">
		<view class="image-list">
			<!-- 显示图片 -->
			<block v-for="(item,index) in images" :key="item">
				<view class="image-wrap">
					<image class="image" :src="item" mode="aspectFill" @tap="onPreviewImage" :data-imgsrc="item">
					</image>
					<image class="shanchu" @tap="onDelImage" :data-index="index"
						src="https://gqy-bucket-clk.oss-cn-beijing.aliyuncs.com/app-static/delete.png"
						mode="aspectFill"></image>
				</view>
			</block>

			<!-- 选择图片 -->
			<view class="image-wrap selectphoto" v-show="selectPhoto" @tap="onChooseImage">
				<!-- <i class="iconfont icon-21"></i> -->
				<image src="http://purchase.zhroot.com/attached/appImgs/saleplan/%E7%BB%84%205688.png" mode="">
				</image>
			</view>
		</view>
	</div>
</template>
<script>
	// 输入文字最大的个数
	const MAX_WORDS_NUM = 140
	// 最大上传图片数量
	const MAX_IMG_NUM = 3
	export default {
		data() {
			return {
				// 当前图片数量
				images: [],
				selectPhoto: true,
				summitData: {}, //提交数据
				imagelist: [],
				// pingjiaSrc: "http://purchase.zhroot.com/WebApiInterface/AFileManage/FileUpload",
				pingjiaSrc: this.url + '/WebApiInterface/AFileManage/FileUpload'
			}
		},
		methods: {
			// 选择图片
			onChooseImage() {
				let max = MAX_IMG_NUM - this.images.length
				uni.chooseImage({
					count: max,
					sizeType: ['compressed'],
					sourceType: ['album', 'camera'],
					success: (res) => {
						// console.log(res, '123456')
						var tempFiles = res.tempFiles
						var tempFilePaths = res.tempFilePaths;
						var urls = []
						uni.uploadFile({
							url: this.url + '/WebApiInterface/AFileManage/FileUpload',
							filePath: tempFilePaths[0],
							name: 'file',
							success: (res) => {
								const str = res.data
								const strobj = JSON.parse(str)
								console.log(strobj, 'strobjstrobj')
								if (strobj.StatusCode == 200) {
									this.imagelist.push(strobj.Data)
								}

								console.log(this.imagelist, '图片')
							}
						});
						this.images = this.images.concat(res.tempFilePaths)
						// console.log(res.tempFilePaths,'res.tempFilePaths')
						// 还能再选几张图片
						max = MAX_IMG_NUM - this.images.length
						this.selectPhoto = max <= 0 ? false : true
						this.$emit('uploadImg', this.imagelist)
					},
				})
			},
			// 删除图片
			onDelImage(e) {
				console.log(e.target, '删除照片')
				// console.log(this.images)
				console.log(this.imagelist)
				var index = e.target.dataset.index
				var array = this.images.splice(index, 1)
				this.images = this.images
				// this.$emit('uploadImg', this.images)

				var arrays = this.imagelist.splice(index, 1)
				this.imagelist = this.imagelist
				this.$emit('uploadImg', this.imagelist)
				if (this.imagelist.length < MAX_IMG_NUM) {
					this.selectPhoto = true
				}
			},
			// 预览图片
			onPreviewImage(e) {
				// console.log(e, '4534656464')
				uni.previewImage({
					urls: this.images,
					current: e.target.dataset.imgsrc
				})
			},

		}
	}
</script>

<style lang="scss">
	/* 图片样式 */
	.box {}

	.image-list {	
		// width: 20rpx;
		display: flex;
		// flex-wrap: wrap;
		// background-color: #FFFFFF;
		// margin-top: 20rpx;
	}

	.image-wrap {
		width: 190rpx;
		height: 190rpx;
		margin: 0 20rpx 0rpx 0;
		position: relative;
		display: inline-block;

		image {
			width: 190rpx;
			height: 190rpx;
		}
	}

	.image {
		width: 100%;
		height: 100%;
		margin-top: 20rpx;
		border-radius: 9rpx;
	}

	.shanchu {
		position: absolute;
		top: -12rpx;
		right: -12rpx;
		width: 40rpx !important;
		height: 40rpx !important;
		background-color: #000;
		color: #fff;
		text-align: center;
		line-height: 40rpx;
		font-size: 38rpx;
		font-weight: bolder;
		border-radius: 50%;
	}

	.selectphoto {
		// border: 2rpx dashed #cbd1d7;
		background: rgba(245, 248, 255, 0.9);
		margin-top: 20rpx;
		border-radius: 5rpx;
		// position: relative;
		display: flex;
		justify-content: center;
		align-items: center;

		image {
			width: 190rpx;
			height: 190rpx;
		}
	}

	.icon-21 {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: #cbd1d7;
		font-size: 60rpx;
	}
</style>
