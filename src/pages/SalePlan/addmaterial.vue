<template>
	<view class="box">
		<view class="header">
			<view class="search">
				<view class="input">
					<view class="icon">
						<image src="http://purchase.zhroot.com/attached/appImgs/proslices/ico%E6%90%9C%E7%B4%A2.png">
						</image>
					</view>
					<input class="see" type="text" v-model="searcinput" @input="searchSale" placeholder="请输入搜索内容"
						placeholder-class="placeinput"></input>
				</view>
				<!-- 		<view class="screen">
					<view class="icon">
						<image
							src="http://purchase.zhroot.com/attached/appImgs/Cslices/icon%EF%BC%8F%E7%AD%9B%E9%80%89@2x.png">
						</image>
					</view>
					筛选
				</view> -->
			</view>
		</view>

		<!-- 列表 -->
		<view class="maximum">
			<view class="uni-list">
				<radio-group>
					<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" v-if="index<showNum" :key="item.value"
						style="display: flex;border-bottom: 1rpx solid rgba(128, 128, 128, 0.1)"
						@click="radioChange(item)">
						<view>
							<radio :value="item.F_Id" :checked="index === current" style="transform:scale(0.7)" />
						</view>
						<!-- <view class="name" style="line-height: 60rpx;margin-left: 10rpx;flex:1">{{item.F_Code}}
						</view>
						<view class="name" style="line-height: 60rpx;flex:1">{{item.F_MaterialName}}</view> -->
						<!-- <view class="name" style="line-height: 60rpx;flex:1">{{item.F_Model}}</view> -->
						<view class="all">
							<view class="left">
								<text>{{item.F_Code}}</text>
							</view>
							<view class="right">
								<text>{{item.F_MaterialName}} ({{item.F_Model}})</text>
							</view>
						</view>
					</label>
				</radio-group>
			</view>


			
		</view>
		<view class="bom">
			<button type="primary" plain="true" class="plabtn" @click="cancell()">取消</button>
			<button type="primary" class="prbtn" @click="submit()">保存</button>
		</view>
	</view>
</template>

<script>
export default {
  data() {
    return {
      searcinput: "", //搜索

      items: [
        {
          value: "USA",
          name: "美国",
        },
      ],
      current: "",

      materialList: [],
      material: {}, //选中物资
      showNum: 50,
	  headerHeight:0,
	  maximunmHeight:0,
	  bomHeight:0
    };
  },
  onLoad(option) {
    this.GetMaterialListDep();
  },
  //顶部导航按钮-----修改
  onNavigationBarButtonTap(e) {
    uni.reLaunch({
      url: "addsaleplan",
    });
  },
  //物理返回键
  onBackPress(options) {
    uni.reLaunch({
      url: "addsaleplan",
    });
    return true;
  },
  onReachBottom() {
    this.showNum = this.showNum + 50;
  },
  methods: {
    // 单选
    radioChange: function (e) {
      console.log(e, "物资");
      this.material = e;
    },

    // 搜索
    searchSale(val) {
      console.log(val.detail.value, "输入");
      this.GetMaterialListDep(val.detail.value);
    },

    // 获取物资列表
    GetMaterialListDep(src) {
      console.log(12132131);
      uni.request({
        url: this.url + "/WebApiInterface/Material/GetMaterialList",
        method: "post",
        data: {
          classId: "", // [可选]分类ID
          name: src, // [可选]物资名称/编码
        },
        success: (res) => {
          this.items = res.data.Data;
          console.log(res, "选择物资列表");
        },
      });
    },
    // 取消
    cancell() {
      uni.reLaunch({
        url: "addsaleplan",
      });
    },
    // 保存
    submit() {
      // this.$store.material = this.material//选中物资
      // uni.setStorageSync('material',this.material)
      let data = JSON.stringify(this.material);
      uni.reLaunch({
        url: "./addsaleplan?material=" + data,
      });
    },
  },
  mounted() {
    uni.getSystemInfo({
      success: function (res) {
       console.log(123)
     
	   console.log(res.windowHeight)
     console.log(document.getElementsByClassName('maximum').length)
	  //  document.getElementsByClassName('maximum')[0].style.height=(res.windowHeight-126-160)+'rep'
    //  console.log(getElementsByClassName('maximum').style.height,'123123123')
      },
    });
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  list-style: none;
}

.box {
  display: flex;
  width: 100%;
  flex-direction: column;
  background: #f3f3f3;

  .header {
    width: 100%;
    height: 126rpx;
    background: #ffffff;
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
        width: 100%;
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
          width: 100%;
          height: 78rpx;
          border-radius: 40rpx;
          font-size: 24rpx;
          font-family: PingFang SC;
          color: #737373;
          background: #f7f7f7;
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

      // 筛选按钮
      .screen {
        margin: 41rpx 0 0 30rpx;
        font-size: 26rpx;
        font-family: PingFang SC;

        .icon {
          margin-top: 4rpx;
          margin-right: 10rpx;
          display: inline-block;
          height: 31rpx;
          width: 28rpx;

          // background-color: #999999;
          image {
            height: 31rpx;
            width: 28rpx;
          }
        }
      }
    }
  }

  .maximum {
    // display: flex;
    // display: -webkit-flex;
    // width: 100%;
    // height: 100vh;
    // flex-direction: column;
    // position: fixed;
    padding-bottom: 80px;
    background: #fff;
    // margin-top: 30rpx;

    .name {
      font-size: 30rpx;
    }
    .all {
      text {
        font-size: 30rpx;
      }
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .right {
        display: flex;
        width: 66%;
        justify-content: flex-start;
      }
    }
  }
  .bom {
     position: fixed;
    bottom: 0;
    width: 100%;
    height: 160rpx;
    background-color: #ffffff;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
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
      border: 1rpx solid #2798fd;
      box-shadow: 0rpx 5rpx 10rpx rgba(39, 152, 253, 0.4);
      color: #2798fd;
    }

    .prbtn {
      font-size: 32rpx;
      font-family: PingFang SC;
      font-weight: 400;
      border: 1rpx solid #2798fd;
      box-shadow: 0rpx 5rpx 10rpx rgba(39, 152, 253, 0.4);
    }
  }
}
</style>
