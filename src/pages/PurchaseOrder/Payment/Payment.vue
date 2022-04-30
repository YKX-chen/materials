<template>
	<view class="box">
		<!-- 导航栏 -->
		<view class="header">
			<view class="nav">
				<view :class="['navbar',click==0?'inv-h-se':'']" @click="nav(0)">
					应付款项
					<view :class="['navbarxhx',click==0?'inv-h-sexhx':'']" @click="click=0"></view>
				</view>
				<view :class="['navbar',click==1?'inv-h-se':'']" @click="nav(1)">
					应收款项
					<view :class="['navbarxhx',click==1?'inv-h-sexhx':'']" @click="click=1"></view>
				</view>
			</view>
			<view class="search">
				<view class="input">
					<view class="icon">
						<image src="http://purchase.zhroot.com/attached/appImgs/proslices/ico%E6%90%9C%E7%B4%A2.png">
						</image>
					</view>
					<input class="see" v-model="search" type="text" :placeholder="placeholder"
						@input="searchs()"></input>
				</view>
				<view class="screen" @click="showleftpro('showLeft')">
					<!-- -->
					<view class="icon">
						<image
							src="http://purchase.zhroot.com/attached/appImgs/Cslices/icon%EF%BC%8F%E7%AD%9B%E9%80%89@2x.png">
						</image>
					</view>
					筛选
				</view>
			</view>
		</view>


		<!-- 应付款项 -->
		<view class="content" style="margin-top: 200rpx;" v-if="click==0">
			<view class="containersale" v-for="(item,index) in sales" :key="index">
				<view class="saletop" @click="detail(item)">
					<view class="mian">
						<view class="headleft">
							<text>{{item.orderProName}}({{item.orderProCode}})</text>
						</view>
						<view class="headright">
							<view>
								<text v-if="item.F_Status==1">待支付</text>
								<text class="jq" v-if="item.F_Status==2">结清</text>
								<text class="zf" v-if="item.F_Status==3">作废</text>
								<text class="dsp" v-if="item.F_Status==4">待审批</text>
								<text class="dkp" v-if="item.F_Status==5">待开票</text>
							</view>

							<image src="http://purchase.zhroot.com/attached/appImgs/proslices/%E7%AE%AD%E5%A4%B4.png">
							</image>
						</view>
					</view>

				</view>
				<view class="salebom" @click="detail(item)">
					<view class="money">
						<text class="salegay">账单编号：
							<text>{{item.F_Code}}</text>
						</text>
						<text class="salegay">账单日期：
							<text>{{item.F_Date|moment}}</text>
						</text>
					</view>
					<view class="salecard">
						<text class="salegay">供&nbsp;&nbsp;应&nbsp;商：
							<text>{{item.F_Supplier}}</text>
						</text>
					</view>
					<view class="salecard">
						<text class="salegay">应付日期：
							<text class="hjprice">{{item.F_DueDate|moment}}</text>
						</text>
					</view>
					<view class="money">
						<view class="salegay">应付金额：
							<text class="hjprice">{{item.F_ActualPayMoney||0}}元</text>
						</view>
						<view class="salegay" style="">已付金额：
							<text>{{item.F_PaidMoney||0}}元</text>
						</view>
					</view>
				</view>
				<view class="bottombut">
					<button v-if="item.F_Status == 1" type="primary" @click="gopayment(item)">去支付</button>
					<button v-if="item.F_Status == 5" type="primary" @click="gopayments(item)">开票</button>
				</view>
			</view>
			<view class='noMOreTips'></view>
		</view>

		<!-- 应收款项 -->
		<view class="content" style="margin-top: 200rpx;" v-if="click==1">
			<view class="containersale" v-for="(item,index) in CollectionList" :key="index">
				<view class="saletop" @click="detail(item)">
					<view class="mian">
						<view class="headleft">
							<text>{{item.proName}}({{item.proCode}})</text>
						</view>
						<view class="headright">
							<view>
								<text v-if="item.F_Status==1">待收款</text>
								<text class="jq" v-if="item.F_Status==2">已结清</text>
								<text class="zf" v-if="item.F_Status==3">作废</text>
								<text class="dsp" v-if="item.F_Status==4">待审批</text>
								<text class="dkp" v-if="item.F_Status==5">待开票</text>
							</view>
							<image class="img" src="http://purchase.zhroot.com/attached/appImgs/proslices/%E7%AE%AD%E5%A4%B4.png">
							</image>
						</view>
					</view>
					
				</view>
				<view class="salebom" @click="detail(item)">
					<view class="money">
						<text class="salegay">账单编号：
							<text>{{item.F_Code}}</text>
						</text>
						<text class="salegay">账单日期：
							<text>{{item.F_Date|moment}}</text>
						</text>
					</view>
					<view class="salecard">
						<text class="salegay">客&emsp;&emsp;户：
							<text>{{item.F_Customer}}</text>
						</text>
					</view>
					<view class="salecard">
						<text class="salegay">应付日期：
							<text class="hjprice">{{item.F_DueDate|moment}}</text>
						</text>
					</view>
					<view class="money">
						<view class="salegay">应付金额：
							<text class="hjprice">{{item.F_ActualPayMoney||0}}元</text>
						</view>
						<view class="salegay" style="">已付金额：
							<text>{{item.F_PaidMoney||0}}元</text>
						</view>
					</view>
				</view>
				<view class="bottombut">
					<button v-if="item.F_Status == 1" type="primary" @click="gocollection(item)">去收款</button>
					<button v-if="item.F_Status == 5" type="primary" @click="gocollections(item)">开票</button>
				</view>
			</view>
			<view class='noMOreTips'></view>
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
					<view class="dialoginput">
						<text>开始时间：</text>
						<picker mode="date" :end="beginendDate" :value="beginDate" @change="bindDateChange">
							<view class="uni-input">{{beginDate}}</view>
						</picker>
					</view>
					<view class="dialoginput">
						<text>结束时间：</text>
						<picker mode="date" :start="beginDate" :value="beginendDate" @change="bindendDateChange">
							<view class="uni-input">{{beginendDate}}</view>
						</picker>
					</view>
					<view class="dialoginput">
						<text>状态：</text>
						<picker @change="materxiala" :value="index" :range="materList" :range-key="'name'">
							<view class="pickright">
								<view style="padding-top: -20rpx;">{{ matertype }}</view>
								<view class="iopmg"></view>
							</view>
						</picker>
					</view>
					<view class="dialoginput2">
						<button type="primary" plain="true" @click="czselect()">重置</button>
						<button type="primary" @click="sxelect()">查询</button>
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
      butclick: "", //筛选状态查询
      search: "", //搜索
      click: 0,
      requestMore: true, //是否还有数据(待办工作)
      requestMore1: true, //是否还有数据(已办工作)
      page: 1,
      page1: 1,
      materstatus: [1, 2, 4],
      materstatusx: [1, 2, 4],
      sales: [], //应付列表
      CollectionList: [], //应收列表
      showLeft: false,
      index: "",
      beginDate: "", //开始时间
      beginendDate: "", //结束时间
      // materList: ['待支付', '结清','待开票'], //状态
      materList: [
        { name: "待支付", value: 1 },
        { name: "结清", value: 2 },
        { name: "待审批", value: 4 },
      ],
      matertype: "请选择",
      placeholder: "请输入供应商名称",
    };
  },
  components: {
    uniDrawer,
  },
  onLoad(option) {
    if (this.click == 0) {
      this.PayListDep(this.page, false);
    } else if (this.click == 1) {
      this.CollectionListDep(this.page1, false);
    }
    // this.PayListDep(this.page, false)
    // this.CollectionListDep(this.page1, false)
  },
  created() {},
  onReachBottom() {
    // console.log(this.click, 'this.click')
    if (this.click == 0) {
      if (this.requestMore) {
        this.page++;
        this.PayListDep(this.page, false);
      }
    } else if (this.click == 1) {
      if (this.requestMore1) {
        this.page1++;
        this.CollectionListDep(this.page1, false);
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
    // 查询
    searchs() {
      // console.log(this.search, '查询')
      this.sales = [];
      if (this.click == 0) {
        this.page = 1;
        this.PayListDep(this.page, false);
      } else if (this.click == 1) {
        this.page1 = 1;
        this.CollectionListDep(this.page1, false);
      }
    },

    nav(num) {
		this.czselect()
      if (num != this.click) {
        (this.sales = []), (this.CollectionList = []);
      }
      this.click = num;
      // this.butclick = ""//筛选查询状态
      if (num == 0) {
        this.placeholder = "请输入供应商名称";
        this.materList = [
          { name: "待支付", value: 1 },
          { name: "结清", value: 2 },
          { name: "待审批", value: 4 },
        ];
        this.page = 1;
        this.PayListDep(this.page, false);
      }
      if (num == 1) {
        this.placeholder = "请输入客户名称";
        //this.materList = ['待收款', '结清','待开票']
        this.materList = [
          { name: "待收款", value: 1 },
          { name: "结清", value: 2 },
          { name: "待开票", value: 3 },
        ];
        this.index = "";
        this, (this.matertype = "请选择");
        this.page1 = 1;
        this.CollectionListDep(this.page1, false);
      }
    },

    // 应付列表
    PayListDep(page, requestMore, type) {
      var data = {
        rows: 5, // 每页行数
        page: page, //当前页
        // "page": 1, //当前页
        sidx: "F_Status", //排序列
        sord: "asc", //排序类型
        supplierKeyword: this.search, //供应商名称
        projectKeyword: "", //项目名称/项目编号
        purchaseCode: "", //采购单号
        sTime: this.beginDate, //账单日期(开始日期)
        eTime: this.beginendDate, //账单日期(结束日期)
        status: this.index, //状态(1待收款 2已结清 3作废)
      };
      uni.request({
        url: this.url + "/WebApiInterface/Payment/PayList",
        method: "POST",
        data: data,
        success: (res) => {
          console.log(res.data, "应付列表");
          if (res.data.total <= page) {
            this.requestMore = requestMore;
          }
          if (!!type) {
            this.sales = res.data.Data;
            this.$refs["showLeft"].close();
          } else this.sales = this.sales.concat(res.data.Data);
        },
      });
    },

    // 应收列表
    CollectionListDep(page, requestMore, type) {
      var data = {
        rows: 5, // 每页行数
        page: page, //当前页
        // "page": 1, //当前页
        sidx: "F_Status", //排序列
        sord: "asc", //排序类型
        supplierKeyword: this.search, //供应商名称
        projectKeyword: "", //项目名称/项目编号
        purchaseCode: "", //采购单号
        sTime: this.beginDate, //账单日期(开始日期)
        eTime: this.beginendDate, //账单日期(结束日期)
        status: this.index, //状态(1待收款 2已结清 3作废)
      };
      uni.request({
        url: this.url + "/WebApiInterface/Collection/CollectionList",
        method: "POST",
        data: data,
        success: (res) => {
          console.log(res.data, "应收列表");
          if (res.data.total <= page) {
            this.requestMore = requestMore;
          }
          if (!!type) {
            this.CollectionList = res.data.Data;
			 this.$refs["showLeft"].close();
          } else
            this.CollectionList = this.CollectionList.concat(res.data.Data);
        },
      });
    },

    // 去支付
    gopayment(item) {
      console.log(item, "本条");
      this.$store.paymentid = item.F_Id;
      uni.reLaunch({
        url: "./gopayment",
      });
    },
    // 应付款项-----开票
    gopayments(item) {
      console.log(item, "本条");
      this.$store.paymentid = item.F_Id;
      uni.reLaunch({
        url: "./payInvoicing",
      });
    },

    // 去收款
    gocollection(item) {
      this.$store.collectionid = item.F_Id;
      uni.reLaunch({
        url: "./gocollection",
      });
    },
    // 应收款项----开票
    gocollections(item) {
      this.$store.collectionid = item.F_Id;
      uni.reLaunch({
        url: "./Invoicing",
      });
    },
    //开始时间
    bindDateChange(e) {
      this.beginDate = e.target.value;
    },
    //结束时间
    bindendDateChange(e) {
      this.beginendDate = e.target.value;
    },
    //状态
    materxiala: function (e) {
      console.log(e, "sasas");
      this.index = this.materList[e.target.value].value;
      this.matertype = this.materList[e.target.value].name;
      console.log(this.index, "index");
      console.log(this.matertype, this.index, "ii");
    },
    // 项目详情
    detail(item) {
      console.log(item, "本人");
      if (this.click == 0) {
        //应付款
        this.$store.paymentid = item.F_Id;
        uni.reLaunch({
          url: "./paymentDetails",
        });
      } else {
        this.$store.collectionid = item.F_Id;
        uni.reLaunch({
          //应收款
          url: "./collectionDetails",
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
      this.butclick = name; // console.log(name,'名字')
    },
    //应付不带分页
    yfkx() {
      let index = "";
      if (this.index == 0) {
        index == "";
      } else if (this.matertype == "待开票") {
        index = 5;
      } else {
        index = this.index + 1;
      }
      var data = {
        rows: 10, // 每页行数
        page: this.page, //当前页
        // "page": 1, //当前页
        sidx: "F_CreatorTime", //排序列
        sord: "desc", //排序类型
        supplierKeyword: this.search, //供应商名称
        projectKeyword: "", //项目名称/项目编号
        purchaseCode: "", //采购单号
        sTime: this.beginDate, //账单日期(开始日期)
        eTime: this.beginendDate, //账单日期(结束日期)
        status: this.index, //状态(1待收款 2已结清 3作废)
      };
      uni.request({
        url: this.url + "/WebApiInterface/Payment/PayList",
        method: "POST",
        data: data,
        success: (res) => {
          console.log(res.data, "应付列表");
          // if (res.data.total <= page) {
          // 	this.requestMore = requestMore;
          // }
          // this.sales = this.sales.concat(res.data.Data)
          this.sales = res.data.Data;
          this.$refs["showLeft"].close();
        },
      });
    },
    yskx() {
      let index = "";
      if (this.index == 0) {
        index == "";
      } else if (this.matertype == "待开票") {
        index = 5;
      } else {
        index = this.index + 1;
      }
      var data = {
        rows: 10, // 每页行数
        page: this.page1, //当前页
        // "page": 1, //当前页
        sidx: "F_CreatorTime", //排序列
        sord: "desc", //排序类型
        customerKeyword: this.search, //客户名称
        projectKeyword: "", //项目名称/项目编号
        saleCode: "", //销售单号
        sTime: this.beginDate, //账单日期(开始日期)
        eTime: this.beginendDate, //账单日期(结束日期)
        status: index, //状态(1待收款 2已结清 3作废)
      };
      uni.request({
        url: this.url + "/WebApiInterface/Collection/CollectionList",
        method: "POST",
        data: data,
        success: (res) => {
          console.log(res.data, "应收列表");
          // if (res.data.total <= this.page1) {
          // 	this.requestMore = false;
          // }
          this.CollectionList = res.data.Data;
          // this.CollectionList = this.CollectionList.concat(res.data.Data)
          this.$refs["showLeft"].close();
        },
      });
    },
    // 点击确定查询
    sxelect() {
      if (this.click == 0) {
        console.log(this.index + 1, "选中");
        // this.page++
        // this.yfkx()
        this.page = 1;
        this.PayListDep(this.page, false, "seach");
      } else {
        //this.yskx();
        this.page = 1;
        this.CollectionListDep(this.page, false, "seavh");
      }
    },
    //点击重置
    czselect() {
      //点击重置
      if (this.click == 0) {
        this.matertype = "请选择";
        this.beginDate = "";
        this.beginendDate = "";
        this.index = "";
        this.yfkx();
        this.$refs["showLeft"].close();
      } else {
        this.matertype = "请选择";
        this.beginDate = "";
        this.beginendDate = "";
        this.index = "";
        this.yskx();
        this.$refs["showLeft"].close();
      }
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
            margin-top: -2rpx;
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

  .bigdialog {
    // margin-top: 120rpx;
    padding: 0 20rpx;

    .dialoginput {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      margin-bottom: 60rpx;

      text {
        width: 42%;
        font-size: 36rpx;
      }

      picker {
        width: 56%;
        height: 60rpx;
        line-height: 60rpx;
        border-radius: 50rpx;
        background-color: #f7f7f7;
        color: #737373;
        font-size: 24rpx;
        padding-left: 20rpx;
      }

      button {
        width: 36%;
        height: 60rpx;
        font-size: 26rpx;
        line-height: 60rpx;
        border-radius: 50rpx;
      }
    }

    .dialoginput2 {
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
    height: 100%;

    .containersale {
      position: relative;
      background-color: #ffffff;
      width: 92%;
      // height: 440rpx;
      margin: auto;
      margin-top: 30rpx;
      border-radius: 9rpx;
      padding-bottom: 20rpx;
      overflow: hidden;

      .saletop {
        .mian {
          width: 90%;
          margin: auto;
          margin-top: 30rpx;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;

          .headleft {
            width: 100%;
            text {
              font-size: 32rpx;
              font-family: PingFang SC;
              font-weight: 700;
            }
          }

          .headright {
            color: #666666;
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 30%;
            view {
              text {
                width: 90rpx;
                height: 44rpx;
                line-height: 36rpx;
                display: flex;
                justify-content: center;
                font-size: 24rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: #7464ff;
                background: rgba(116, 100, 255, 0.07);
                border: 1px solid #7464ff;
                border-radius: 6px;
              }
              .jq {
                color: #31d5a2;
                background: rgba(49, 213, 162, 0.07);
                border: 1px solid #31d5a2;
              }
              .dsp {
                color: #ffbb33;
                background: rgba(255, 187, 51, 0.07);
                border: 1px solid #ffbb33;
              }
              .zf {
                color: #b3b3b3;
                background: rgba(179, 179, 179, 0.07);
                border: 1px solid #b3b3b3;
              }
              .dkp {
                color: #ff9933;
                background: rgba(255, 153, 51, 0.07);
                border: 1px solid #ff9933;
              }
            }
            image {
              float: right;
              width: 24rpx;
              height: 46rpx;
              margin: -1rpx 20rpx;
            }
            .img {
              width: 24rpx;
              height: 46rpx;
            }
          }
        }
      }

      .salebom {
        margin: 12rpx 40rpx;
        display: flex;
        flex-direction: column;
        padding-bottom: 20rpx;

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

        .money {
          margin-top: 20rpx;
          display: flex;

          .salegay {
            color: #999999;
            font-size: 26rpx;
            width: 50%;
            overflow: hidden;
            text-overflow: ellipsis;
            -o-text-overflow: ellipsis;
            -webkit-text-overflow: ellipsis;
            -moz-text-overflow: ellipsis;
            white-space: nowrap;

            text {
              color: #000000;
            }

            .hjprice {
              font-family: PingFang SC;
              font-size: 22rpx;
            }
          }
        }

        .salecard {
          margin-top: 6rpx;
          overflow: hidden;
          text-overflow: ellipsis;
          -o-text-overflow: ellipsis;
          -webkit-text-overflow: ellipsis;
          -moz-text-overflow: ellipsis;
          white-space: nowrap;

          .salegay {
            color: #999999;
            font-size: 26rpx;
            width: 300rpx;
            overflow: hidden;
            text-overflow: ellipsis;
            -o-text-overflow: ellipsis;
            -webkit-text-overflow: ellipsis;
            -moz-text-overflow: ellipsis;
            white-space: nowrap;

            text {
              color: #000000;
            }

            .hjprice {
              font-family: PingFang SC;
              font-size: 22rpx;
            }
          }
        }
      }

      .nullcop {
        width: 100%;
        height: 50rpx;
      }

      .bottombut {
        margin: 20rpx 30rpx;
        // height: 100rpx;
        // padding-top: 20rpx;
        // padding-bottom: 10rpx;

        button {
          background-color: rgba(39, 152, 253, 1);
          font-size: 32rpx;
          height: 80rpx;
          line-height: 80rpx;
          padding-bottom: 20rpx;
        }
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

  .noMOreTips {
    text-align: center;
    margin-top: 30rpx;
    font-size: 24rpx;
    color: #c0c4cc;
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
