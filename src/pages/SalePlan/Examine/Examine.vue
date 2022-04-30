<template>
	<view class="box">
		<!-- 导航栏 -->
		<view class="header">
			<view class="nav">
				<view :class="['navbar',click==0?'inv-h-se':'']" @click="nav(0)">
					待办工作
					<view :class="['navbarxhx',click==0?'inv-h-sexhx':'']" @click="click=0"></view>
				</view>
				<view :class="['navbar',click==1?'inv-h-se':'']" @click="nav(1)">
					已办工作
					<view :class="['navbarxhx',click==1?'inv-h-sexhx':'']" @click="click=1"></view>
				</view>
			</view>
			<view class="search">
				<view class="input">
					<view class="icon">
						<image src="http://purchase.zhroot.com/attached/appImgs/proslices/ico%E6%90%9C%E7%B4%A2.png">
						</image>
					</view>
					<input class="see" v-model="search" type="text" placeholder="请输入搜索内容" @input="sxelect"  />
				</view>
				<view class="screen" @click="showleftpro('showLeft')">
					<view class="icon">
						<image
							src="http://purchase.zhroot.com/attached/appImgs/Cslices/icon%EF%BC%8F%E7%AD%9B%E9%80%89@2x.png">
						</image>
					</view>
					筛选
				</view>
			</view>
		</view>


		<!-- 卡片部分 -->
		<!-- 项目审批 -->
		<!-- <view class="content" v-show="click == 0" v-if="cardata.length == 0 ">
			<view class="containersale">
				<view class="nullda">当前状态无数据</view>
			</view>
		</view>
		<view class="content" v-show="click == 1" v-if="cardata.length == 0 ">
			<view class="containersale">
				<view class="nullda">当前状态无数据</view>
			</view>
		</view> -->
		<view class="content">
			<view v-for="(item,index) in cardata">
				<!-- 项目审批 -->
				<view class="containersale" v-if="item.type == 1" @click="detail(item)">
					<view class="saletop">
						<view class="headleft headleft1">
							<text>项目审批</text>
						</view>
						<view class="headright">
							<image src="http://purchase.zhroot.com/attached/appImgs/proslices/%E7%AE%AD%E5%A4%B4.png">
							</image>
						</view>
					</view>
					<view class="salebom">
						<view class="salemid">
							<text>{{item.name}}（{{item.code}}）</text>
						</view>
						<view class="salecard">
							<text class="salegay">项目经理：
								<text>{{item.proManage}}</text>
							</text>
							<text class="salegay" style="margin-left: 212rpx;">客户：
								<text>{{item.customerName}}</text>
							</text>
						</view>
						<view class="salecard">
							<text class="salegay">项目成员：
								<text>{{item.proUser}}</text>
							</text>
						</view>
						<view class="salecard">
							<text class="salegay">项目地址：
								<text class="hjprice2">{{item.address}}</text>
							</text>
						</view>
						<view class="salecard">
							<text class="salegay">项目周期：
								<text class="hjprice2">{{item.sTime|moment}} 至 {{item.eTime|moment}}</text>
							</text>
						</view>
						<view class="salecard">
							<text class="salegay">项目类型：
								<text class="hjprices">{{item.proType}}</text><text class="hjpricess">在建</text>
							</text>
						</view>
					</view>
				</view>
				<!-- 销售审批 -->
				<view class="containersale" v-if="item.type == 2" @click="detail(item)">
					<view class="saletop">
						<view class="headleft headleft3">
							<text>销售审批</text>
						</view>
						<view class="headright">
							<image src="http://purchase.zhroot.com/attached/appImgs/proslices/%E7%AE%AD%E5%A4%B4.png">
							</image>
						</view>
					</view>
					<view class="salebom">
						<view class="salemid">
							<text>{{item.name}}（{{item.code}}）</text>
						</view>
						<view class="salecard">
							<text class="salegay">物资名称：
								<text
									v-if="item.materialCode != null">{{item.materialName}}({{item.materialCode}})</text>
								<text v-if="item.materialCode == null">{{item.materialName}}</text>
							</text>
						</view>
						<view class="salecard">
							<text class="salegay">规&emsp;&emsp;格：
								<text>{{item.model}}</text>
							</text>
						</view>
						<view class="salecard">
							<text class="salegay">合计金额：
								<text class="hjprice" v-if="item.totalMoney != null">{{item.totalMoney}}万元</text>
								<text class="hjprice" v-if="item.totalMoney == null">{{item.totalMoney}}</text>
							</text>
						</view>
						<view class="salecard">
							<text class="salegay">销售日期：
								<text class="hjprice2" v-if="item.saleDate">{{item.saleDate|moment}}</text>
							</text>
						</view>
					</view>
				</view>
				<!-- 供应商审批 -->
				<view class="containersale" v-if="item.type == 3" @click="detail(item)">
					<view class="saletop">
						<view class="headleft headleft2">
							<text>供应商审批</text>
						</view>
						<view class="headright">
							<image src="http://purchase.zhroot.com/attached/appImgs/proslices/%E7%AE%AD%E5%A4%B4.png">
							</image>
						</view>
					</view>
					<view class="salebom">
						<view class="salemid">
							<text>{{item.name}}</text>
						</view>
						<view class="salecard" style="display: flex;justify-content: space-between;">
							<view class="salegay">联&nbsp;&nbsp;系&nbsp;人：
								<text>{{item.contacts}}</text>
							</view>
							<view class="salegay">联系方式：
								<text>{{item.moiblePhone}}</text>
							</view>
						</view>
						<view class="salecard">
							<text class="salegay">资质等级：
								<text class="hjpricess" v-if="item.level==1">优质</text>
								<text class="hjpricess" v-if="item.level==2">一般</text>
								<text class="hjpricess" v-if="item.level==3">差</text>
								<text class="hjpricess" v-if="item.level==4">弃用</text>
							</text>
						</view>
					</view>
				</view>
				<!-- 应付账单审批 -->
				<view class="containersale" v-if="item.type == 4" @click="detail(item)">
					<view class="saletop">
						<view class="headleft headleft4">
							<text>应付账单审批</text>
						</view>
						<view class="headright">
							<image src="http://purchase.zhroot.com/attached/appImgs/proslices/%E7%AE%AD%E5%A4%B4.png">
							</image>
						</view>
					</view>
					<view class="salebom">
						<view class="salemid">
							<text>{{item.name}}（{{item.code}}）</text>
						</view>
						<view class="salecard">
							<text class="salegay">供应商名称：
								<text>{{item.billSupplier}}</text>
							</text>
						</view>
						<view class="salecard">
							<text class="salegay">应&nbsp;付&nbsp;金&nbsp;额：
								<text class="hjprice">{{item.billMoney}}元</text>
							</text>
						</view>
						<view class="salecard">
							<text class="salegay">账&nbsp;单&nbsp;日&nbsp;期：
								<text class="hjprice2" v-if="item.billDate">{{item.billDate|moment}}</text>
							</text>
						</view>
					</view>
				</view>
				<!-- 应收账单审批 -->
				<view class="containersale" v-if="item.type == 5" :key="index" @click="detail(item)">
					<view class="saletop">
						<view class="headleft headleft4">
							<text>应收账单审批</text>
						</view>
						<view class="headright">
							<image src="http://purchase.zhroot.com/attached/appImgs/proslices/%E7%AE%AD%E5%A4%B4.png">
							</image>
						</view>
					</view>
					<view class="salebom">
						<view class="salemid">
							<text>{{item.name}}（{{item.code}}）</text>
						</view>
						<view class="salecard">
							<text class="salegay">客户名称：
								<text>{{item.billSupplier}}</text>
							</text>
						</view>
						<view class="salecard">
							<text class="salegay">应收金额：
								<text class="hjprice">{{item.billMoney}}元</text>
							</text>
						</view>
						<view class="salecard">
							<text class="salegay">账单日期：
								<text class="hjprice2" v-if="item.billDate">{{item.billDate|moment}}</text>
							</text>
						</view>
					</view>
				</view>
				<!-- 对账审批 -->
				<view class="containersale" v-if="item.type == 6" @click="detail(item)">
					<view class="saletop">
						<view class="headleft headleft5">
							<text>对账审批</text>
						</view>
						<view class="headright">
							<image src="http://purchase.zhroot.com/attached/appImgs/proslices/%E7%AE%AD%E5%A4%B4.png">
							</image>
						</view>
					</view>
					<view class="salebom">
						<view class="salemid">
							<text>{{item.name}}（{{item.code}}）</text>
						</view>
						<view class="salecard">
							<text class="salegay">账单金额：
								<text class="hjprice">{{item.billMoney}}元</text>
							</text>
						</view>
						<view class="salecard">
							<text class="salegay">账单周期：
								<text>{{item.sTime|moment}} 至 {{item.eTime|moment}}</text>
							</text>
						</view>

						<view class="salecard">
							<text class="salegay">账单日期：
								<text class="hjprice2" v-if="item.billDate">{{item.billDate|moment}}</text>
							</text>
						</view>
					</view>
				</view>
				<!-- 采购审批 -->
				<view class="containersale" v-if="item.type == 7" @click="detail(item)">
					<view class="saletop">
						<view class="headleft headleft6">
							<text>采购审批({{item.planCode}})</text>
						</view>
						<view class="headright">
							<image src="http://purchase.zhroot.com/attached/appImgs/proslices/%E7%AE%AD%E5%A4%B4.png">
							</image>
						</view>
					</view>
					<view class="salebom">
						
	                    <!-- <view class="salemid">
							<text>{{item.name}}（{{item.code}}）</text>
						</view> -->

						<view class="salemid">
							<text>{{item.materialName}}（{{item.code+'-'+item.name}}）</text>
						</view>
						<view class="salecard">
							<text class="salegay">数&emsp;&emsp;量：
								<text class="hjprice">{{item.num}}{{item.unit}}</text>
							</text>
						</view>
						<view class="salecard">
							<text class="salegay">日期：
								<text>{{item.create_time|moment}}</text>
							</text>
						</view>
					</view>
				</view>
			</view>
		</view>



		<!-- 筛选 -->
		<uni-drawer ref="showLeft" mode="right" :width="260">
			<view class="close">
				<view class="" style="display: flex;justify-content: space-between;padding:60rpx 26rpx;">
					<view class="" style="font-weight: 700;font-siez:40rpx">筛选</view>
					<view class="word-btn" hover-class="word-btn--hover" :hover-start-time="20" :hover-stay-time="70"
						@click="closeDrawer('showLeft')"><text class="word-btn-white"></text>
					</view>
				</view>
				<!-- <view class="word-btn" hover-class="word-btn--hover" :hover-start-time="20" :hover-stay-time="70"
					@click="closeDrawer('showLeft')"><text class="word-btn-white">×</text></view> -->
				<view class="bigdialog">
					<!-- <view class="selectTitle">审批类型</view>
					<view class="type">
						<button type="default" :class="[butclick=='project'?'but-h-se':'']"
							@click="butclicks('project')">项目审批</button>
						<button type="default" :class="[butclick=='sale'?'but-h-se':'']"
							@click="butclicks('sale')">销售审批</button>
						<button type="default" :class="[butclick=='supplier'?'but-h-se':'']"
							@click="butclicks('supplier')">供应商审批</button>
						<button type="default" :class="[butclick=='pay'?'but-h-se':'']"
							@click="butclicks('pay')">应付账单审批</button>
						<button type="default" :class="[butclick=='collection'?'but-h-se':'']"
							@click="butclicks('collection')">应收账单审批</button>
						<button type="default" :class="[butclick=='accountStatement'?'but-h-se':'']"
							@click="butclicks('accountStatement')">对账审批</button>
						<button type="default" :class="[butclick=='salePlan'?'but-h-se':'']"
							@click="butclicks('salePlan')">采购审批</button>
					</view> -->
					<view class="selectContent">
						<view class="selectBox">
							<view class="selectTitle">审批类型</view>
							<view class="list">
								<view :class="{'btn':true,'this':butclick == item.id}" v-for="item in stateArr"
									@click="butclicks(item.id)">{{item.label}}</view>
							</view>
						</view>
					</view>
					<view class="dialoginput">
						<button type="primary" plain="true" @click="czselect()">重置</button>
						<button type="primary" @click="sxelect()">确认</button>
					</view>
				</view>
			</view>
		</uni-drawer>

	</view>
</template>

<script>
import uniDrawer from "../../../components/uni-drawer/uni-drawer.vue";
export default {
  data() {
    const beginDate = this.getDate("begin");
    const currentDate = this.getDate({
      format: true,
    });
    return {
      butclick: "",
      search: "", //搜索
      click: 0,
      requestMore: true, //是否还有数据(待办工作)
      requestMore1: true, //是否还有数据(已办工作)
      page: 1,
      page1: 1,
      urls: "",
      cardata: [],
      status: "loadmore",
      stateArr: [
        {
          id: "project",
          label: "项目审批",
        },
        // {
        //   id: "sale",
        //   label: "销售审批",
        // },
        {
          id: "supplier",
          label: "供应商审批",
        },
        {
          id: "pay",
          label: "应付账单审批",
        },
        // {
        //   id: "collection",
        //   label: "应收账单审批",
        // },
        {
          id: "accountStatement",
          label: "对账审批",
        },
        {
          id: "salePlan",
          label: "采购审批",
        },
      ],
    };
  },
  components: {
    uniDrawer,
  },
  onLoad(option) {
    if (this.click == 0) {
      this.M_MyUpcoming(this.page, false);
    } else {
      this.M_MyUpcoming(this.page1, false);
    }
  },
  created() {},
  onReachBottom() {
    console.log(this.click, "this.click");
    if (this.click == 0) {
      if (this.requestMore) {
        this.page++;
        this.M_MyUpcoming(this.page, false);
      }
    } else {
      if (this.requestMore1) {
        this.page1++;
        this.M_MyUpcoming(this.page1, false);
      }
    }
  },
  //顶部导航按钮-----修改
  onNavigationBarButtonTap(e) {
    uni.reLaunch({
      url: "../../index",
    });
  },
  //物理返回键
  onBackPress(options) {
    uni.reLaunch({
      url: "../../index",
    });
    return true;
  },
  methods: {
    nav(num) {
      this.click = num;
      this.cardata = [];
      this.search=''
      this.butclick = "";
      if (this.click == 0) {
        this.page = 1;
        this.M_MyUpcoming(this.page, false);
      } else if (this.click == 1) {
        this.page1 = 1;
        this.M_MyUpcoming(this.page1, false);
      }
    },

    // 我的待办(APP)
    M_MyUpcoming(page, requestMore) {
      var data = {
        rows: 5,
        page: page,
        // page: 1,
        sidx: "F_CreatorTime",
        sord: "asc", //desc
        userId: uni.getStorageSync("userid"), //人员ID
        type: this.butclick, //审批状态
        billName:this.search
      };
      var urls = "";
      if (this.click == 0) {
        urls = "/WebApiInterface/PersonalCenter/M_MyUpcoming"; //待办
      } else {
        urls = "/WebApiInterface/PersonalCenter/M_MyDone"; //已办
      }

      uni.request({
        url: this.url + urls,
        method: "POST",
        data: data,
        success: (res) => {
          console.log(res, "我的");
          if (res.data.total <= page) {
            this.requestMore = requestMore;
          }
          this.cardata = this.cardata.concat(res.data.Data);
        },
      });
    },

    // 项目详情
    detail(item) {
      console.log(item, "本人");
      let op = "";
      if (this.click == 0) {
        op = 1;
      } else {
        op = 2;
      }
      if (item.type == 1) {
        this.$store.projectid = item.id;
        uni.reLaunch({
          url: "./projectDetail?status=" + op,
        });
      } else if (item.type == 2) {
        this.$store.saleid = item.id;
        uni.reLaunch({
          url: "./salesDetail?status=" + op,
        });
      } else if (item.type == 3) {
        this.$store.supplierid = item.id;
        uni.reLaunch({
          url: "./supplierDetail?status=" + op,
        });
      } else if (item.type == 4) {
        this.$store.paymentid = item.id;
        uni.reLaunch({
          url: "./paymentInfo?status=" + op,
        });
      } else if (item.type == 5) {
        this.$store.collectionid = item.id;
        uni.reLaunch({
          url: "./receipt?status=" + op,
        });
      } else if (item.type == 6) {
        this.$store.saveid = item.id;
        uni.reLaunch({
          url: "./saveInfo?status=" + op,
        });
      } else {
        this.$store.saleplanid = item.id;
        this.$store.taskId = item.taskId;
        uni.reLaunch({
          url: "./saleplaninfo?status=" + op,
        });
      }
    },

    // 侧边栏事件
    showleftpro(e) {
      this.$refs[e].open();
    },
    // 关闭窗口
    closeDrawer(e) {
      this.$refs[e].close();
      console.log(e, "e");
    },
    butclicks(name) {
      this.butclick = name;
      console.log(name, "名字");
    },
    // 点击确定查询
    sxelect() {
      this.cardata = [];
      this.page = 1;
      this.page1 = 1;
      if (this.click == 0) {
        this.M_MyUpcoming(this.page, false);
        this.$refs["showLeft"].close();
      } else {
        this.M_MyUpcoming(this.page1, false);
        this.$refs["showLeft"].close();
      }
    },
    //点击重置
    czselect() {
      this.cardata = [];
      this.butclick = "";
      if (this.click == 0) {
        this.M_MyUpcoming(this.page, false);
        this.$refs["showLeft"].close();
      } else {
        this.M_MyUpcoming(this.page1, false);
        this.$refs["showLeft"].close();
      }
    },

    //开始时间
    bindDateChange(e) {
      // this.beginDate = e.target.value
    },
    //结束时间
    bindendDateChange(e) {
      // this.beginendDate = e.target.value
    },

    getDate() {
      const date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      month = month > 9 ? month : "0" + month;
      day = day > 9 ? day : "0" + day;
      return `${year}-${month}-${day}`;
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

.box {
  display: flex;
  width: 100%;
  height: 100%;
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
          width: 565rpx;
          height: 78rpx;
          border-radius: 40rpx;
          font-size: 24rpx;
          font-family: PingFang SC;
          color: #737373;
          background: #f7f7f7;
          text-align: left;
          padding-left: 90rpx;
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

  .bigdialog {
    // margin-top: 120rpx;
    padding: 0 20rpx;

    .selectContent {
      display: flex;
      width: 100%;
      flex-direction: column;

      .selectBox {
        display: flex;
        width: 100%;
        flex-direction: column;

        .selectTitle {
          width: 100%;
          font-weight: bold;
          font-size: 32rpx;
          line-height: 60rpx;
          margin-bottom: 20rpx;
        }

        .list {
          display: flex;
          width: 100%;
          flex-wrap: wrap;

          .btn {
            width: calc(46% - 20rpx);
            background: #f6f8fa;
            color: #888888;
            height: 70rpx;
            line-height: 70rpx;
            font-size: 24rpx;
            margin-right: 30rpx;
            text-align: center;
            margin-bottom: 30rpx;
            border-radius: 8rpx;
          }

          // .btn:nth-child(3n) {
          // 	margin-right: 0;
          // }

          .btn.this {
            background: #2798fd;
            color: #fff;
          }
        }
      }
    }

    .selectTitle {
      width: 100%;
      font-weight: bold;
      font-size: 32rpx;
      line-height: 60rpx;
      margin-bottom: 20rpx;
    }

    .type {
      display: flex;
      width: 100%;
      // justify-content: space-around;
      flex-wrap: wrap;

      button {
        // padding: 0 10rpx;
        width: calc(46% - 20rpx);
        background: #f6f8fa;
        color: #888888;
        height: 70rpx;
        line-height: 70rpx;
        font-size: 24rpx;
        margin-right: 30rpx;
        text-align: center;
        margin-bottom: 30rpx;
        border-radius: 8rpx;
      }

      .but-h-se {
        background-color: #2898fd;
        color: #ffffff;
      }
    }

    .dialoginput {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      position: fixed;
      bottom: 0;
      right: 0;
      height: 154rpx;
      width: 100%;

      text {
        width: 42%;
        font-size: 36rpx;
      }

      button {
        width: calc(45%);
        font-size: 31rpx;
      }
    }
  }

  // ---------------------------- 卡片部分 -------------------
  .content {
    margin-top: 200rpx;
    width: 100%;

    .containersale {
      position: relative;
      background-color: #ffffff;
      width: 92%;
      // height: 448rpx;
      padding-bottom: 20rpx;
      margin: auto;
      margin-top: 30rpx;
      border-radius: 9rpx;
      overflow: hidden;

      .nullda {
        height: 360rpx;
        font-size: 26rpx;
        color: #666666;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .saletop {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin: 20rpx 20rpx;

        // .headleft {
        // 	display: flex;
        // 	align-items: center;
        // 	color: #FFFFFF;
        // 	width: 172rpx;
        // 	height: 60rpx;
        // 	background-image: url(http://purchase.zhroot.com/attached/appImgs/saleplan/%E8%B7%AF%E5%BE%84%208883.png);
        // 	background-size: 100% 100%;

        // 	text {
        // 		font-size: 28rpx;
        // 		font-family: PingFang SC;
        // 		font-weight: 400;
        // 		margin-left: 20rpx;
        // 	}
        // }
        .headleft {
          height: 60rpx;
          font-size: 28rpx;
          line-height: 60rpx;
          font-family: PingFang SC;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          position: relative;
          padding: 0 20rpx;

          text {
            color: #fff;
            font-size: 28rpx;
            margin-left: 20rpx;
            margin-right: 10rpx;
          }
        }

        .headleft::before {
          content: "";
          position: absolute;
          display: inline-block;
          width: 0;
          height: 0;
          right: -30rpx;
          top: 0;
          border-top: 30rpx solid red;
          border-right: 30rpx solid transparent;
        }

        .headleft::after {
          content: "";
          position: absolute;
          display: inline-block;
          width: 0;
          height: 0;
          right: -30rpx;
          bottom: 0;
          border-bottom: 30rpx solid red;
          border-right: 30rpx solid transparent;
        }

        //项目审批
        .headleft.headleft1 {
          background: #7464ff;
        }

        .headleft.headleft1::before {
          border-top-color: #7464ff;
        }

        .headleft.headleft1::after {
          border-bottom-color: #7464ff;
        }

        //供应商审批
        .headleft.headleft2 {
          background: #2798fd;
        }

        .headleft.headleft2::before {
          border-top-color: #2798fd;
        }

        .headleft.headleft2::after {
          border-bottom-color: #2798fd;
        }

        //销售审批
        .headleft.headleft3 {
          background: #ff9933;
        }

        .headleft.headleft3::before {
          border-top-color: #ff9933;
        }

        .headleft.headleft3::after {
          border-bottom-color: #ff9933;
        }

        //应付账单审批
        .headleft.headleft4 {
          background: #ffbb33;
        }

        .headleft.headleft4::before {
          border-top-color: #ffbb33;
        }

        .headleft.headleft4::after {
          border-bottom-color: #ffbb33;
        }

        //应收账单审批
        .headleft.headleft5 {
          background: #ff5529;
        }

        .headleft.headleft5::before {
          border-top-color: #ff5529;
        }

        .headleft.headleft5::after {
          border-bottom-color: #ff5529;
        }

        //采购审批
        .headleft.headleft6 {
          background: #64c8bc;
        }

        .headleft.headleft6::before {
          border-top-color: #64c8bc;
        }

        .headleft.headleft6::after {
          border-bottom-color: #64c8bc;
        }

        .headright {
          color: #666666;
          font-size: 30rpx;

          image {
            float: right;
            width: 24rpx;
            height: 46rpx;
            margin: -1rpx 20rpx;
          }
        }
      }

      .salebom {
        margin: 12rpx 40rpx;
        display: flex;
        flex-direction: column;

        .salemid {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          -o-text-overflow: ellipsis;
          -webkit-text-overflow: ellipsis;
          -moz-text-overflow: ellipsis;
          white-space: nowrap;

          text {
            font-size: 36rpx;
            font-family: PingFang SC;
            font-weight: bold;
          }
        }

        .salecard {
          margin-top: 6rpx;
          // overflow: hidden;
          // text-overflow: ellipsis;
          // -o-text-overflow: ellipsis;
          // -webkit-text-overflow: ellipsis;
          // -moz-text-overflow: ellipsis;
          // white-space: nowrap;

          .salegay {
            color: #999999;
            font-size: 26rpx;
            width: 300rpx;
            // overflow: hidden;
            // text-overflow: ellipsis;
            // -o-text-overflow: ellipsis;
            // -webkit-text-overflow: ellipsis;
            // -moz-text-overflow: ellipsis;
            white-space: nowrap;

            text {
              color: #000000;
            }

            .hjprice {
              font-family: PingFang SC;
              font-size: 22rpx;
              color: #007aff;
            }

            .hjprice2 {
              font-family: PingFang SC;
              font-size: 22rpx;
            }

            .hjprices {
              border-radius: 5rpx;
              color: rgba(99, 181, 254, 0.8);
              border: 1rpx solid rgba(99, 181, 254, 0.8);
              background-color: rgba(99, 181, 254, 0.1);
              padding: 0 15rpx;
            }

            .hjpricess {
              border-radius: 5rpx;
              color: rgba(90, 199, 108, 0.8);
              border: 1rpx solid rgba(90, 199, 108, 0.8);
              background-color: rgba(90, 199, 108, 0.1);
              padding: 0 15rpx;
              margin-left: 10rpx;
            }
          }
        }
      }

      .nullcop {
        width: 100%;
        height: 50rpx;
      }
    }
  }

  .cyko {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    // position: sticky;
    position: fixed;
    bottom: 18%;
    right: 0;
    margin-right: 20rpx;
    z-index: 99;

    .cyclo {
      width: 110rpx;
      height: 110rpx;
      background: #2798fd;
      box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
      border-radius: 50%;

      .cto {
        width: 50rpx;
        height: 8rpx;
        background-color: #ffffff;
        right: 30rpx;
        position: absolute;
        /*绝对定位*/
        bottom: 46%;
        border-radius: 20rpx;
      }

      .cbom {
        width: 8rpx;
        height: 50rpx;
        background-color: #ffffff;
        right: 50rpx;
        position: absolute;
        /*绝对定位*/
        bottom: 26%;
        border-radius: 20rpx;
      }
    }
  }

  .close {
    padding-left: 20rpx;
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
