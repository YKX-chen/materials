<template>
  <view class="page">
    <!-- 需求计划详情部分 -->
    <view class="header">
      <view class="heamid">
        <text class="heatop">
          需求计划
          <!-- <view class="borbom"></view> -->
        </text>
        <view class="headop">
          <view class="heaadd">
            <text>物资编号</text>
            <input v-model="materialForm.F_MaterialCode" disabled />
          </view>
        </view>
        <view class="headop">
          <view class="heaadd">
            <text>物资名称</text>
            <input v-model="materialForm.F_MaterialName" disabled />
          </view>
        </view>
        <view class="headop">
          <view class="heaadd">
            <text>规格</text>
            <input v-model="materialForm.F_Model" disabled />
          </view>
        </view>
        <view class="headop">
          <view class="heaadd">
            <text>单位</text>
            <input v-model="materialForm.F_Unit" disabled />
          </view>
        </view>
        <view class="headop">
          <view class="heaadd">
            <text>需求数量</text>
            <input type="number" v-model="materialForm.F_DemandNum" disabled />
          </view>
        </view>
        <view class="headop">
          <view class="heaadd">
            <text>入库仓库</text>
            <text>{{ materialForm.F_Remark }}</text>
            <!-- <input v-model="materialForm.F_Remark" disabled /> -->
          </view>
        </view>
        <view class="headop">
          <view class="heaadd">
            <text style="width: 20%">用途</text>
            <input v-model="materialForm.F_Purpose" disabled />
          </view>
        </view>
        <view class="headtarea">
          <view class="heaadd1">
            <text style="width: 20%">备注</text>
            <text v-if="materialForm.F_Description == null"></text>
            <text v-if="materialForm.F_Description != null">{{
              materialForm.F_Description
            }}</text>
            <!-- <input v-model="materialForm.F_Description" disabled /> -->
            <!-- <textarea v-model="materialForm.F_Description" placeholder-class="placeinput" disabled /> -->
          </view>
        </view>
      </view>
    </view>
    <!-- 询价记录 -->
    <view class="materbomm">
      <view class="sale">
        <!-- 头部文字 -->
        <view class="salehead">
          <text class="salete">询价记录</text>
        </view>
        <view class="salehead">
          <text
            v-if="materData.length <= 0"
            class="salete"
            style="color: rgba(0, 0, 0, 0.5)"
            >别看了,当前无询价记录</text
          >
        </view>
        <view v-for="(item, index) in materData" :key="index">
          <!-- 日期和询价人 -->
          <view class="marginsale">
            <view class="saleheadop saleheadop1">
              <text class="opsale">{{ item.F_RegisterDate | moment }}</text>
            </view>
            <view class="righttext">
              <text class="rigxj"
                >询价人：<text class="riguse">{{
                  item.F_CreatorUserId
                }}</text></text
              ><!-- 采购员 -->
            </view>
          </view>
          <!-- 供应商 -->
          <view class="marginmid">
            <view class="supptext">
              <text
                >供应商：<text>{{ item.F_SupplierName }}</text></text
              >
            </view>
            <view class="suppcon">
              <view>
                <text>联系人：</text>
                <text>{{ item.F_Contacts }}</text>
              </view>
              <view>
                <text>联系电话：</text>
                <text>{{ item.F_MoiblePhone }}</text>
              </view>
            </view>
			 <view class="remark">
              <view>
                <text>备注：</text>
                <text>{{ item.F_Description }}</text>
              </view>
            </view>
            <view class="suppjg">
              <view class="supbj">
                <text class="supptop">
                  {{ item.F_Price }}
                  <text class="small">元</text>
                </text>
                <text class="suppbom">报价</text>
              </view>
              <view class="supbj">
                <text class="supptop">
                  {{ item.F_LogisticsPrice }}
                  <text class="small">元</text>
                </text>
                <text class="suppbom">物流费</text>
              </view>
              <view class="supbj">
                <text class="supptop">
                  {{ item.F_TaxRate }}
                  <text class="small">%</text>
                </text>
                <text class="suppbom">税率</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="process">
      <view class="probod">
        <view class="salehead">
          <text class="salete">流程明细</text>
        </view>
        <view class="probox" v-for="(item, index) in processList">
          <view class="tree"></view>
          <view class="rightpro">
            <view class="protop">
              <text v-if="item.type == 1">发布需求计划</text>
              <text v-if="item.type == 2">询价</text>
              <text v-if="item.type == 3">申请采购</text>
              <text v-if="item.type == 4">采购审批</text>
              <text>{{
                item.info.length > 0 ? item.info[0].OperterTime : ""
              }}</text>
            </view>
            <view class="textop" v-show="item.info.length != 0">
              <text
                >{{
                  item.info.length > 0 ? item.info[0].Description : ""
                }}操作人是 【
                {{ item.info.length > 0 ? item.info[0].Operter : "" }} 】</text
              >
            </view>
            <view
              class="probom"
              v-for="(items, index) in item.info"
              v-show="index != 0"
            >
              <view class="tree2"></view>
              <view class="toptitle">
                <text>{{ items.OperterTime }}</text>
              </view>
              <view class="midpro">
                <text
                  >{{ items.Description }}操作人是 【{{ items.Operter }}】</text
                >
              </view>
            </view>
            <view class="probom" v-if="item.info.length == 0">
              <view class="midpro">
                <text>暂未开始</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="matsupbom"></view>
  </view>
</template>

<script>
let page = 1,
  rows = 10;
export default {
  data() {
    return {
      // saleid: "",
      materialForm: {},
      materData: [],
      numplace: "请输入数量",
      requestMore: true, //是否还有数据
      processList: [],
    };
  },
  onLoad(option) {
    // this.saleid = option.fid;
    // console.log(this.saleid, "saleid");
    this.materList();
    this.processDep();
  },
  //物理返回键
  onBackPress(options) {
    uni.reLaunch({
      url: "Saleplan",
    });
    return true;
  },
  //顶部导航按钮-----修改
  onNavigationBarButtonTap(e) {
    if (e.index == 1) {
      uni.reLaunch({
        url: "Saleplan",
      });
    } else {
      console.log(this.materialForm, "this.saleid");
      let data = JSON.stringify(this.materialForm);
      if (this.$store.status != 2) {
        uni.reLaunch({
          url: "../SupplierQuotation/quotation?data=" + data,
        });
      } else {
        uni.showToast({
          icon: "none",
          title: "已采购的数据不允许再询价",
        });
      }
    }
  },
  methods: {
    materList() {
      console.log(this.$store.saleid, "this.$store.saleid");
      uni.request({
        url: this.url + "/WebApiInterface/Inquiry/GetInquiryList",
        method: "post",
        data: {
          userId: uni.getStorageSync("userid"),
          salePlanId: this.$store.saleid,
        },
        success: (res) => {
          this.materialForm = res.data.Data.salePlan;
          this.materData = res.data.Data.inquiryEntities;
          let op = this.materialForm.F_Purpose.split(",");
          let a = JSON.stringify(op);
          let last = JSON.parse(a).pop(); //获取最后一项
          this.materialForm.F_Purpose = last;
          if (this.materialForm.F_Remark.length > 20) {
            this.materialForm.F_Remark =
              this.materialForm.F_Remark.slice(0, 20) + "...";
          }
          console.log(
            this.materialForm.F_Remark.length,
            "materialForm.F_Remark"
          );
          // debugger;
          //   if (!!this.materialForm.F_Purpose) {
          // 	  var list=this.materialForm.F_Purpose.split(',');

          // 	  this.materialForm.F_Purpose=list[list.length-1]
          //   }
        },
      });
    },
    //流程明细
    processDep() {
      uni.request({
        url: this.url + "/WebApiInterface/SalePlan/GetProProcess",
        method: "POST",
        data: {
          salePlanId: this.$store.saleid,
        },
        success: (res) => {
          this.processList = res.data.Data;
          console.log(this.processList, "流程明细列表");
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  // ---------------------  需求计划  ----------------
  .header {
    width: 93%;
    height: auto;
    background-color: #ffffff;
    margin-top: 30rpx;
    border-radius: 9rpx;

    .heamid {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding: 30rpx;

      .heatop {
        height: 38rpx;
        // font-size: 32rpx;
        font-family: PingFang SC;
        font-weight: bold;
        line-height: 38rpx;
        margin: 0 0rpx 30rpx 0rpx;
        color: #262626;

        .borbom {
          margin: 20rpx 0rpx;
          height: 1px;
          background: #fafafa;
          opacity: 1;
        }
      }
    }
  }

  .headop {
    .heaadd {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: 400;
      // margin: 20rpx 0rpx;
      color: #666666;
      height: 90rpx;
      border-bottom: 1rpx solid #fafafa;

      input {
        text-align: right;
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: 400;
      }

      .texjj {
        width: 70%;
        text-align: right;
        margin-right: -12rpx;
      }

      .pickright {
        image {
          width: 24rpx;
          height: 46rpx;
        }
      }
    }

    .borbom {
      // margin-top: 30rpx;
      height: 1px;
      background: #fafafa;
      opacity: 1;
    }

    .placeinput {
      text-align: right;
    }
  }

  .headtarea {
    // height: 200rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 400;
    margin: 20rpx 0rpx;
    color: #666666;
    padding-bottom: 30rpx;

    .heaadd {
      textarea {
        width: 100%;
        margin-top: 30rpx;
        height: 230rpx;
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: 400;
      }
    }

    .heaadd1 {
      display: flex;
      flex-direction: column;
      margin-top: 20rpx;
      // padding-bottom: 120rpx;
      width: 100%;

      text:nth-child(2) {
        margin-top: 20rpx;
        width: 100%;
        word-wrap: break-word;
        word-break: normal;
      }
    }
  }

  // ------------------  询价记录   -------------------
  .materbomm {
    width: 93%;
    background-color: #ffffff;
    margin-top: 30rpx;
    border-radius: 9rpx;

    .sale {
      padding: 30rpx;

      .salehead {
        margin-bottom: 30rpx;

        .salete {
          font-size: 32rpx;
          font-family: PingFang SC;
          font-weight: bold;
          color: #262626;
        }

        image {
          width: 172rpx;
          height: 60rpx;
        }
      }

      .marginsale {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;

        .righttext {
          width: 70%;
          text-align: right;

          .rigxj {
            font-size: 26rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #808080;

            .riguse {
              font-size: 26rpx;
              font-family: PingFang SC;
              font-weight: 400;
              color: #333333;
            }
          }
        }
      }

      .saleheadop {
        height: 60rpx;
        font-size: 28rpx;
        line-height: 60rpx;
        font-family: PingFang SC;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        position: relative;
        padding: 0 20rpx;
        color: #ffffff;
        font-size: 24rpx;
        font-family: PingFang SC;
      }

      .saleheadop::before {
        content: "";
        position: absolute;
        display: inline-block;
        width: 0;
        height: 0;
        right: -30rpx;
        top: 0;
        border-top: 30rpx solid #4d6ce9;
        border-right: 30rpx solid transparent;
      }

      .saleheadop::after {
        content: "";
        position: absolute;
        display: inline-block;
        width: 0;
        height: 0;
        right: -30rpx;
        bottom: 0;
        border-bottom: 30rpx solid #4d6ce9;
        border-right: 30rpx solid transparent;
      }

      .saleheadop.saleheadop1 {
        background: #4d6ce9;
      }

      .saleheadop.saleheadop1::before {
        border-top-color: #4d6ce9;
      }

      .marginmid {
        padding: 30rpx;

        .supptext {
          font-size: 30rpx;
          font-family: PingFang SC;
          font-weight: bold;
          color: #262626;
		  margin-bottom: 9px;
        }

        .suppcon {
          display: flex;
          flex-direction: row;
          margin-bottom: 20rpx;
          width: 100%;

          text {
            font-size: 26rpx;
            font-family: PingFang SC;
            font-weight: 400;
          }

          text:nth-child(1) {
            width: 45%;
            color: #808080;
          }

          text:nth-child(2) {
            width: 55%;
            color: #333333;
          }

		//    text:nth-child(3) {
        //     width: 95%;
        //     color: #333333;
        //   }

          view:nth-child(1) {
            width: 45%;
          }
        }
		.remark{
			 display: flex;
          flex-direction: row;
          margin-bottom: 20rpx;
          width: 100%;
		  text {
            font-size: 26rpx;
            font-family: PingFang SC;
            font-weight: 400;
          }
		   text:nth-child(1) {
            width: 95%;
            color: #808080;
          }
		}

        .suppjg {
          width: 100%;
          height: 120rpx;
          background: rgba(39, 152, 253, 0.05);
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          margin-bottom: 12rpx;

          .supbj {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .supptop {
              font-size: 32rpx;
              font-family: PingFang SC;
              font-weight: bold;
              color: #2798fd;

              .small {
                font-size: 20rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: #2798fd;
              }
            }

            .suppbom {
              font-size: 22rpx;
              font-family: PingFang SC;
              font-weight: 400;
              color: rgba(39, 152, 253, 0.6);
            }
          }
        }
      }
    }
  }

  // ------------------   流程明细样式   ---------------
  .process {
    background-color: #fff;
    width: 93%;
    margin: 30rpx;
    border-radius: 9rpx;

    .probod {
      padding: 30rpx;

      .salehead {
        margin-bottom: 30rpx;

        .salete {
          font-size: 32rpx;
          font-family: PingFang SC;
          font-weight: bold;
          color: #262626;
        }
      }

      .probox {
        border-left: 1rpx solid #f2f2f2;
        display: flex;
        flex-direction: row;
        padding-bottom: 20rpx;

        .tree {
          width: 26rpx;
          height: 26rpx;
          background-color: #2798fd;
          border-radius: 50%;
          position: relative;
          left: -12rpx;
        }

        .rightpro {
          width: 100%;
          font-size: 22rpx;
          .textop {
            margin-top: 9rpx;
          }
          margin-top: -9rpx;
          .tree2 {
            width: 12rpx;
            height: 12rpx;
            background-color: #e4e7ed;
            border-radius: 50%;
            position: relative;
            left: -32rpx;
            top: 30rpx;
          }
          .protop {
            font-size: 22rpx;
            color: #2798fd;

            text:nth-child(1) {
              font-size: 26rpx;
              font-family: PingFang SC;
              font-weight: bold;
              margin-right: 20rpx;
            }
          }
          .toptitle {
            font-size: 22rpx;
            color: #2798fd;
            margin-top: 9rpx;
          }
          .midooo {
            font-size: 24rpx;
            text {
              margin: 12rpx 0;
            }
            margin-bottom: 20rpx;
          }

          .midpro {
            font-size: 24rpx;
            // margin: 12rpx 0;
            width: 100%;
            display: flex;
            flex-direction: column;
            text {
              margin: 9rpx 0;
            }
          }
        }
      }
    }
  }

  .matsupbom {
    width: 100%;
    height: 60rpx;
  }
}
</style>
