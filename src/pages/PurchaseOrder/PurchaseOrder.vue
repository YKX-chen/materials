<template>
	<view class="box">
		<!-- 导航栏 -->
		<view class="header">
			<view class="nav">
				
				<!-- <view :class="['navbar',click==0?'inv-h-se':'']" @click="nav(0)" v-if="roleMark=='proManager'"> -->
					<view :class="['navbar',click==0?'inv-h-se':'']" @click="nav(0)" v-if="order_assignment">
					待分派
					<view :class="['navbarxhx',click==0?'inv-h-sexhx':'']" @click="click=0"></view>
				</view>
				<view :class="['navbar',click==1?'inv-h-se':'']" @click="nav(1)">
					待采购
					<view :class="['navbarxhx',click==1?'inv-h-sexhx':'']" @click="click=1"></view>
				</view>
				<view :class="['navbar',click==2?'inv-h-se':'']" @click="nav(2)">
					待验收
					<view :class="['navbarxhx',click==2?'inv-h-sexhx':'']" @click="click=2"></view>
				</view>
        	<view :class="['navbar',click==2?'inv-h-se':'']" @click="nav(3)">
					已办结
					<view :class="['navbarxhx',click==3?'inv-h-sexhx':'']" @click="click=3"></view>
				</view>
			</view>
			<view class="search">
				<view class="input">
					<view class="icon">
						<image src="http://purchase.zhroot.com/attached/appImgs/proslices/ico%E6%90%9C%E7%B4%A2.png">
						</image>
					</view>
					<input class="see" v-model="code" type="text" placeholder="请输入采购单编号" @input="search"></input>
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


		<!-- 待分派 -->
		<!-- <view class="content" v-show="click==0" v-if="roleMark=='proManager'"> -->
			<view class="content" v-show="click==0" v-if="order_assignment">
			<view class="blank" v-if="GetOrderPageList.length<=	0">
				暂无数据
			</view>
			<view class="main" v-for="(item,index) in GetOrderPageList" :key='index'>
				<view class="main1" @click="details(item)">
					<view class="code">
						<view class="purchasecode">
							<view class="xqj">
								<view class="purjj">采购单号:</view>
								<view class="pusinput">{{item.F_Remark1}}</view>
							</view>
						</view>
						<view class="icon">
							<image src="http://purchase.zhroot.com/attached/appImgs/proslices/%E7%AE%AD%E5%A4%B4.png">
							</image>
						</view>
					</view>

					<view class="plancode">
						{{item.F_SalePlanId}}
					</view>

					<view class="name">
						<view class="left">
							<text>{{item.F_Remark2}}</text>
							<text>联系人:{{item.gyslxr}}</text>
						</view>
						<view class="right">
							<view class="icon">
								<image
									src="http://purchase.zhroot.com/attached/appImgs/saleplan/%E9%9C%80%E6%B1%82.png">
								</image>
							</view>
							<view class="price">
								{{item.F_TotalPrice||0}}
								<view style="color: #2798FD;font-size: 18rpx;display: inline-block;">
									元
								</view>
							</view>
						</view>
					</view>

					<view class="bottom">
						<text>{{item.gysMobile}}</text>
						<text>{{item.F_CreatorTime | moment}}</text>
					</view>
				</view>
				<view class="but" v-if="order_assignment" @click="people(item)">
					<view class="submit">
						分派
					</view>
				</view>
			</view>
		</view>

		<!-- 待采购 -->
		<view class="content" v-show="click==1">
			<view class="blank" v-if="GetOrderPageList.length<=	0">
				暂无数据
			</view>
			<view class="main" v-for="(item,index) in GetOrderPageList" :key="index">
				<view class="main1" @click="details(item)">
					<view class="code">
						<view class="purchasecode">
							<view class="xqj">
								<view class="purjj">采购单号:</view>
								<view class="pusinput">{{item.F_Remark1}}</view>
							</view>
						</view>
						<view class="icon">
							<image src="http://purchase.zhroot.com/attached/appImgs/proslices/%E7%AE%AD%E5%A4%B4.png">
							</image>
						</view>
					</view>

					<view class="plancode">
						{{item.F_SalePlanId}}
					</view>

					<view class="name">
						<view class="left">
							<text>{{item.F_Remark2}}</text>
							<text>联系人:{{item.gyslxr}}</text>
						</view>
						<view class="right">
							<view class="icon">
								<image
									src="http://purchase.zhroot.com/attached/appImgs/saleplan/%E9%9C%80%E6%B1%82.png">
								</image>
							</view>
							<view class="price">
								{{item.F_TotalPrice||0}}
								<view style="color: #2798FD;font-size: 18rpx;display: inline-block;">
									元
								</view>
							</view>
						</view>
					</view>

					<view class="bottom">
						<text>{{item.gysMobile}}</text>
						<text>{{item.F_CreatorTime | moment}}</text>
					</view>
				</view>

				<view class="but" @click="completePurchase(item)">
					<view class="submit">
						完成采购
					</view>
				</view>
			</view>
		</view>

		<!-- 待验收 -->
		<view class="content" v-show="click==2">
			<view class="blank" v-if="GetOrderPageList.length<=	0">
				暂无数据
			</view>
			<view class="main" v-for="(item,index) in GetOrderPageList" :key='index'>
				<view class="main1" @click="details(item)">
					<view class="code">
						<view class="purchasecode">
							<view class="xqj">
								<view class="purjj">采购单号:</view>
								<view class="pusinput">{{item.F_Remark1}}</view>
							</view>
						</view>
						<view class="icon">
							<image src="http://purchase.zhroot.com/attached/appImgs/proslices/%E7%AE%AD%E5%A4%B4.png">
							</image>
						</view>
					</view>

					<view class="plancode">
						{{item.F_SalePlanId}}
					</view>

					<view class="name">
						<view class="left">
							<text>{{item.F_Remark2}}</text>
							<text>联系人:{{item.gyslxr}}</text>
						</view>
						<view class="right">
							<view class="icon">
								<image
									src="http://purchase.zhroot.com/attached/appImgs/saleplan/%E9%9C%80%E6%B1%82.png">
								</image>
							</view>
							<view class="price">
								{{item.F_TotalPrice||0}}
								<view style="color: #2798FD;font-size: 18rpx;display: inline-block;">
									元
								</view>
							</view>
						</view>
					</view>

					<view class="bottom">
						<text>{{item.gysMobile}}</text>
						<text>{{item.F_CreatorTime | moment}}</text>
					</view>
				</view>

				<view class="but">
					<view class="submit" @click="submit(item)">
						提交
					</view>
					<view class="complete" @click="submit(item,1)">
						提交并完成
					</view>
				</view>
			</view>
		</view>

	<!-- 已办结 -->
		<view class="content" v-show="click==3">
			<view class="blank" v-if="GetOrderPageList.length<=	0">
				暂无数据
			</view>
			<view class="main" v-for="(item,index) in GetOrderPageList" :key='index'>
				<view class="main1" @click="details(item)">
					<view class="code">
						<view class="purchasecode">
							<view class="xqj">
								<view class="purjj">采购单号:</view>
								<view class="pusinput">{{item.F_Remark1}}</view>
							</view>
						</view>
						<view class="icon">
							<image src="http://purchase.zhroot.com/attached/appImgs/proslices/%E7%AE%AD%E5%A4%B4.png">
							</image>
						</view>
					</view>

					<view class="plancode">
						{{item.F_SalePlanId}}
					</view>

					<view class="name">
						<view class="left">
							<text>{{item.F_Remark2}}</text>
							<text>联系人:{{item.gyslxr}}</text>
						</view>
						<view class="right">
							<view class="icon">
								<image
									src="http://purchase.zhroot.com/attached/appImgs/saleplan/%E9%9C%80%E6%B1%82.png">
								</image>
							</view>
							<view class="price">
								{{item.F_TotalPrice||0}}
								<view style="color: #2798FD;font-size: 18rpx;display: inline-block;">
									元
								</view>
							</view>
						</view>
					</view>

					<view class="bottom">
						<text>{{item.gysMobile}}</text>
						<text>{{item.F_CreatorTime | moment}}</text>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
export default {
  data() {
    return {
      click: "",
      code: "",
      GetOrderPageList: [],
      GetInfoById: {},
      GetInfoByIdList: [],
      // cookie:document.Cookies.get('.AspNetCore.Session'),

      requestMore: true, //是否还有数据(待分派)
      requestMore1: true, //是否还有数据(待采购)
      requestMore2: true, //是否还有数据(待验收)
      order_assignment: false, // 分派权限
      page: 1,
      page1: 1,
      page2: 1,
      page3: 1,
      roleMark: "", //角色标识
    };
  },
  onLoad() {
    this.roleMark = uni.getStorageSync("roleMark");
    this.order_assignment = this.$hasBtnPermission("order_assignment");

    // if (this.roleMark == 'proManager') {
    if (this.order_assignment) {
      this.click = 0;
      if (this.click == 0) {
        this.M_GetOrderPageList(this.page, false);
      } else if (this.click == 1) {
        this.M_GetOrderPageList(this.page1, false);
      } else {
        this.M_GetOrderPageList(this.page2, false);
      }
    } else {
      this.click = 1;
      if (this.click == 1) {
        this.M_GetOrderPageList(this.page1, false);
      } else {
        this.M_GetOrderPageList(this.page2, false);
      }
    }
  },
  created() {},
  onReachBottom() {
    // console.log(this.click)
    if (this.click == 0) {
      if (this.requestMore) {
        this.page++;
        this.M_GetOrderPageList(this.page, false);
      }
    } else if (this.click == 1) {
      if (this.requestMore1) {
        this.page1++;
        this.M_GetOrderPageList(this.page1, false);
      }
    } else {
      if (this.requestMore2) {
        this.page2++;
        this.M_GetOrderPageList(this.page2, false);
      }
    }
  },
  //顶部导航按钮-----修改
  onNavigationBarButtonTap(e) {
    uni.reLaunch({
      url: "../index",
    });
  },
  //物理返回键
  onBackPress(options) {
    uni.reLaunch({
      url: "../index",
    });
    return true;
  },
  methods: {
    nav(num) {
      this.click = num;
      this.GetOrderPageList = [];
      if (this.click == 0) {
        this.page = 1;
        this.M_GetOrderPageList(this.page, false);
      } else if (this.click == 1) {
        this.page1 = 1;
        this.M_GetOrderPageList(this.page1, false);
      } else if (this.click == 2) {
        this.page2 = 1;
        this.M_GetOrderPageList(this.page2, false);
      } else {
        this.page3 = 1;
        this.M_GetOrderPageList(this.page3, false);
      }
    },

    M_GetOrderPageList: function (page, requestMore) {
      uni.request({
        url: this.url + "/WebApiInterface/OrderPurchase/M_GetOrderPageList",
        method: "POST",
        data: {
          rows: 5,
          page: page,
          sidx: "F_CreatorTime",
          sord: "desc",
          userId: uni.getStorageSync("userid"),
          sTime: "",
          eTime: "",
          status: this.click, //状态
          keyword: "",
          code: this.code, //采购单编号
          supplierName: "",
          proId: uni.getStorageSync("proid"), //项目id
        },
        success: (res) => {
          // console.log(res, '采购单分页列表(移动端)');
          if (res.data.total <= page) {
            this.requestMore = requestMore;
          }
          res.data.Data.forEach((item) => {
            item.F_TotalPrice = item.F_TotalPrice + item.F_LogisticsPrice;
            if (item.gyslxr.length > 10) {
              item.gyslxr = item.gyslxr.slice(0, 10) + "..";
            }
          });
          this.GetOrderPageList = this.GetOrderPageList.concat(res.data.Data);
          // this.GetOrderPageList.forEach(item => {
          // 	console.log(item.F_Remark1)
          // 	console.log(item.F_TotalPrice)
          // 	console.log(item.F_LogisticsPrice)
          // 	item.F_TotalPrice = item.F_TotalPrice + item.F_LogisticsPrice

          // 	if (item.gyslxr.length > 10) {
          // 		item.gyslxr = item.gyslxr.slice(0, 10) + '..'
          // 	}
          // 	// if (this.click == 0) {
          // 	// 	item.F_TotalPrice = item.F_TotalPrice + item.F_LogisticsPrice
          // 	// 	item.gyslxr = item.gyslxr.slice(0,10)+'..'
          // 	// } else if (this.click == 1) {
          // 	// 	item.F_TotalPrice = item.F_TotalPrice + item.F_LogisticsPrice
          // 	// 	item.gyslxr = item.gyslxr.slice(0,10)+'..'
          // 	// }
          // })
          console.log(this.GetOrderPageList, "采购单分页列表");
        },
      });
    },

    // 分派
    people(item) {
      this.$store.PurchaseId = item.F_OrderId; //采购单id
      uni.reLaunch({
        url: "./PurchasePeople",
      });
    },

    // 完成采购
    completePurchase(item) {
      this.$store.PurchaseId = item.F_OrderId; //采购单id
      uni.reLaunch({
        url: "./PurchaseComplete",
      });
    },

    // 根据采购单ID获取采购信息
    GetInfoByIdDep(id) {
      uni.request({
        url: this.url + "/WebApiInterface/OrderPurchase/GetInfoById",
        method: "POST",
        data: {
          id: id, //采购单id
        },
        success: (res) => {
          // console.log(res, '根据采购单ID获取采购信息');
          this.GetInfoById = res.data.Data;
          this.GetInfoByIdList = res.data.Data.orderPurchaseDetailsEntity; //采购单明细
          console.log(this.GetInfoById, "根据采购单ID获取采购信息");
          console.log(this.GetInfoByIdList, "根据采购单ID获取采购信息");
        },
      });
    },

    // 验收
    submit(item, type) {
      this.$store.PurchaseId = item.F_OrderId; //采购单id
      this.$store.type = type;
      uni.reLaunch({
        url: "./PurchaseOver",
      });
    },

    // 查询
    search() {
      //this.GetOrderPageList
      // if (this.roleMark == 'proManager') {
      // 	this.click = 0
      // 	if (this.click == 0) {
      // 		this.M_GetOrderPageList(this.page, false)
      // 	} else if (this.click == 1) {
      // 		this.M_GetOrderPageList(this.page1, false)
      // 	} else {
      // 		this.M_GetOrderPageList(this.page2, false)
      // 	}
      // } else {
      // 	this.click = 1
      // 	if (this.click == 1) {
      // 		this.M_GetOrderPageList(this.page1, false)
      // 	} else {
      // 		this.M_GetOrderPageList(this.page2, false)
      // 	}
      // }
      // this.GetOrderPageListDep()
      this.GetOrderPageList = [];
      if (this.click == 0) {
        this.page = 1;
        this.M_GetOrderPageList(this.page, false);
      } else if (this.click == 1) {
        this.page1 = 1;
        this.M_GetOrderPageList(this.page1, false);
      } else {
        this.page2 = 1;
        this.M_GetOrderPageList(this.page2, false);
      }
    },

    // 跳转详情页
    details(item) {
      this.$store.PurchaseId = item.F_OrderId;
      // console.log(this.$store, item.F_OrderId)
      uni.reLaunch({
        // url: "./PurchaseDetails?PurchaseId" + PurchaseId
        url: "./PurchaseDetails",
      });
    },
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

element.style {
  margin-top: 0;
}

.box {
  display: flex;
  width: 100%;
  flex-direction: column;
  background: #f3f3f3;

  .header {
    width: 100%;
    height: 204rpx;
    background: #ffffff;
    font-size: 16rpx;
    text-align: center;
    position: fixed;
    z-index: 1;

    .nav {
      height: 82rpx;
      display: flex;

      .navbar {
        flex: 1;
        line-height: 82rpx;
        font-size: 30rpx;
      }
    }

    .search {
      width: 100%;
      height: 118rpx;
      display: flex;

      .input {
        margin: 20rpx 0 0 30rpx;
        position: relative;
        width: 95%;
        margin: auto;

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
          }
        }

        .see {
          // width: 565rpx;
          text-align: left;
          padding-left: 90rpx;
          height: 78rpx;
          border-radius: 40rpx;
          font-size: 24rpx;
          font-family: PingFang SC;
          color: #737373;
          background: #f7f7f7;
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

  // 待采购
  .content {
    position: relative;
    margin-top: 200rpx;
    padding: 0 30rpx;

    .blank {
      width: 100%;
      height: 419rpx;
      background: #ffffff;
      border-radius: 9rpx;
      margin-top: 30rpx;
      text-align: center;
      line-height: 419rpx;
      color: rgba(153, 153, 153, 0.5);
      overflow: hidden;
    }

    .main {
      margin-top: 30rpx;
      width: 100%;
      background: #ffffff;
      border-radius: 9rpx;
      overflow: hidden;

      // padding: 30rpx 30rpx 0;
      .main1 {
        padding: 30rpx;
      }

      .code {
        // margin-top: 30rpx;
        display: flex;
        justify-content: space-between;
        width: 100%;

        .purchasecode {
          // width: 56%;
          .xqj {
            width: auto;
            background: #ebedff;
            border-radius: 24rpx;
            color: #4d6ce9;
            font-size: 22rpx;
            padding: 9rpx 0;
            padding-right: 20rpx;
            font-family: PingFang SC;
            display: flex;
            flex-direction: row;

            .purjj {
              margin: 0 20rpx;
            }
          }
        }

        .icon {
          width: 40%;
          height: 44rpx;

          image {
            float: right;
            width: 24rpx;
            height: 46rpx;
          }
        }
      }

      .plancode {
        margin-top: 20rpx;
        // height: 33rpx;
        font-size: 24rpx;
        font-family: PingFang SC;
        line-height: 33rpx;
        color: #999999;
      }

      .name {
        margin-top: 12rpx;
        display: flex;
        justify-content: space-between;

        .left {
          font-size: 36rpx;
          font-family: PingFang SC;
          color: #262626;
          display: flex;
          flex-direction: column;

          text:nth-child(1) {
            font-weight: bold;
          }

          text:nth-child(2) {
            margin-top: 9rpx;
            font-size: 30rpx;
            color: #262626;
          }
        }

        .right {
          display: flex;
          align-items: center;

          .icon {
            width: 29rpx;
            height: 40rpx;

            image {
              width: 40rpx;
              height: 40rpx;
            }
          }

          .price {
            margin-left: 12rpx;
            color: #2798fd;
            font-size: 30rpx;
          }
        }
      }

      .bottom {
        display: flex;
        justify-content: space-between;
        margin-top: 20rpx;

        text {
          width: calc(50%);
          font-size: 26rpx;
          font-family: PingFang SC;
          font-weight: 400;
        }

        text:nth-child(1) {
          color: #262626;
        }

        text:nth-child(2) {
          text-align: right;
          color: #999999;
        }
      }

      .but {
        display: flex;
        margin-top: 32rpx;
        width: 100%;
        height: 90rpx;
        line-height: 90rpx;
        text-align: center;
        color: #2798fd;
        border-top: 1rpx solid rgba(0, 0, 0, 0.1);
        font-size: 34rpx;
        font-family: PingFangSC-Medium;

        .submit {
          flex: 1;
        }

        .complete {
          flex: 1;
          color: #1adfc7;
          border-left: 1rpx solid rgba(0, 0, 0, 0.1);
        }
      }
    }
  }

  // 已采购--------------------------------------------------------
  .contents {
  }

  .inv-h-se {
    color: #2798fd;
    // border-bottom: 1px solid #2798FD;
  }

  .inv-h-sexhx {
    width: 47rpx;
    height: 8rpx;
    background-color: #2798fd;
    border-radius: 12rpx;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 45rpx;
    color: #2798fd;
    border-bottom: 1rpx solid #2798fd;
    margin: auto;
  }

  .invfn {
    background-color: #debc8d;
  }
}
</style>
