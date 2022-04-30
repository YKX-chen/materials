<template>
  <view class="page">
    <view class="head">
      <view class="heamid">
        <text class="heatop">
          需求计划
          <!-- <view class="borbom"></view> -->
        </text>
         <view class="headop">
          <view class="heaadd">
            <text>项目</text>
            {{materialForm.F_Remark2+'-'+materialForm.F_Remark1}}
          </view>
        </view>
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
        <!-- <view class="headop">
          <view class="heaadd">
            <text>入库仓库</text>
            <text>{{ materialForm.F_Remark }}</text>
          
          </view>
        </view> -->
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

      <view class="top"> 询价记录 </view>
      <view class="main" v-for="(item, index) in saleplanData">
        <view class="topp">
          <view class="left">
            <checkbox-group @change="checkio">
              <checkbox
                :value="item.F_Id"
                :checked="saleList.includes(String(item.F_Id))"
                @click="checksale(item, index)"
              >
              </checkbox>
            </checkbox-group>
          </view>
          <view class="right">
            <view class="rtop">
              <view class="saleheadop saleheadop1">
                <text>{{ item.F_CreatorTime | moment }}</text>
              </view>
              <view>
                <text>询价人：</text>
                <text>{{item.F_CreatorUserId}}</text>
              </view>
            </view>
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
    </view>
    <u-modal
      class="umod"
      v-model="saleshow"
      :mask-close-able="false"
      show-cancel-button
      @confirm="saleReject"
      title="拒绝原因"
    >
      <textarea v-model="saletext" placeholder="请输入拒绝原因"></textarea>
    </u-modal>
    <u-toast ref="uToast" />
	<view class="topbom"></view>
    <view class="bombtn" v-if="status == 1">
      <button type="warn" class="plabtn" @click="salebtn(1)">拒绝</button>
      <button type="primary" class="prbtn" @click="salebtn(2)">项目自采</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      saleplanData: [], //询价记录
      status: "", //判断是待办还已办
      saleList: [], //多选
      saleform: {},
      saleshow: false, //驳回
      saletext: "",
	  materialForm: {},
    };
  },
  //顶部导航按钮-----修改
  onNavigationBarButtonTap(e) {
    uni.reLaunch({
      url: "./Examine",
    });
  },
  //物理返回键
  onBackPress(options) {
    uni.reLaunch({
      url: "./Examine",
    });
    return true;
  },
  onLoad(option) {
    if (option.status) {
      this.status = option.status;
    }
    this.saleDep();
	this.salePlanForm()
  },
  methods: {
    saleDep() {
      uni.request({
        url: this.url + "/WebApiInterface/Inquiry/GetInquiryListById",
        method: "POST",
        data: {
          salePlanId: this.$store.saleplanid,
        },
        success: (res) => {
          this.saleplanData = res.data.Data;
        },
      });
    },
	 salePlanForm() {
     
      uni.request({
        url: this.url + "/WebApiInterface/Inquiry/GetInquiryList",
        method: "post",
        data: {
          userId: uni.getStorageSync("userid"),
          salePlanId: this.$store.saleplanid,
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
        
        },
      });
    },
    //多选
    checksale(item, index) {
      this.saleform = item;
      console.log(item, "op");
    },
    checkio: function (e) {
      this.saleList = e.detail.value;
      console.log(this.saleList, "item");
    },
    //点击按钮  1 驳回  2 项目自采
    salebtn(index) {
      if (index == 1) {
        this.saleshow = true;
      } else {
        if (this.saleList.length == 0) {
          this.$refs.uToast.show({
            title: "请勾选要自采的询价记录",
            type: "error",
          });
        } else {
          let data = {
            salePlanId: this.$store.saleplanid,
            inquiryId: this.saleform.F_Id,
            userId: uni.getStorageSync("userid"),
            taskId: this.$store.taskId,
          };
          uni.request({
            url: this.url + "/WebApiInterface/OrderPurchase/ProPurchase",
            method: "POST",
            data: data,
            success: (res) => {
              console.log(res.data.Data, "提交");
              this.$refs.uToast.show({
                title: res.data.Data,
                type: "success",
              });
              setTimeout(() => {
                uni.reLaunch({
                  url: "Examine",
                });
              }, 1000);
            },
          });
        }
      }
    },
    saleReject() {
      if (this.saletext.length == 0) {
        this.$refs.uToast.show({
          title: "请输入拒绝原因",
          type: "error",
        });
        this.saleshow = true;
      } else {
        let data = {
          salePlanId: this.$store.saleplanid,
          userId: uni.getStorageSync("userid"),
          explain: this.saletext,
          taskId: this.$store.taskId,
        };
        uni.request({
          url: this.url + "/WebApiInterface/Inquiry/SalePlanReject",
          method: "POST",
          data: data,
          success: (res) => {
            this.$refs.uToast.show({
              title: res.data.Info,
              type: "success",
            });
            setTimeout(() => {
              uni.reLaunch({
                url: "Examine",
              });
            }, 1000);
          },
        });
      }
      console.log(this.saletext.length, "saletext");
    },
  },
};
</script>

<style lang="scss">
.page {
  .head {
    width: 97%;
    margin: auto;
	height: auto;
    margin-top: 1rpx;
    padding: 30rpx;
    border-radius: 9rpx;
    // background-color: #ffffff;
   

    .top {
		margin-top: 30rpx;
       padding: 30rpx;
      font-size: 32rpx;
      font-family: PingFang SC;
      font-weight: bold;
      color: #262626;
	  background-color: #ffffff;
    }

    .main {
		background-color: #ffffff;
      .topp {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
 padding: 30rpx;
 
        .left {
          width: 10%;

          checkbox {
            transform: scale(0.6);
          }
        }

        .right {
          width: 90%;
          display: flex;
          flex-direction: column;

          .rtop {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;

            view:nth-child(2) {
              font-size: 26rpx;
              color: #808080;

              text:nth-child(2) {
                color: #333333;
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
        }
      }

      .marginmid {
        padding: 30rpx 0;

        .supptext {
          font-size: 30rpx;
          font-family: PingFang SC;
          font-weight: bold;
          color: #262626;
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

          view:nth-child(1) {
            width: 45%;
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

  .bombtn {
    width: 100%;
    position: fixed;
    bottom: 0;
    height: 160rpx;
    background-color: #ffffff;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    button {
      width: 45%;
      height: 80rpx;
      border: none;
      outline: none;
    }

    .plabtn {
      font-size: 32rpx;
      font-family: PingFang SC;
      border: 1rpx solid rgba(255, 100, 100, 1);
      box-shadow: 0rpx 5rpx 10rpx rgba(255, 100, 100, 0.4);
    }

    .prbtn {
      font-size: 32rpx;
      font-family: PingFang SC;
      border: 1rpx solid #2798fd;
      box-shadow: 0rpx 5rpx 10rpx rgba(39, 152, 253, 0.4);
    }
  }
.topbom{
	height: 160rpx;
}
  .umod {
    width: 100%;

    textarea {
      width: 90%;
      margin: auto;
      margin-top: 20rpx;
      border: 1rpx solid #f1f2f3;
      font-size: 26rpx;
    }
  }

  .heamid {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 30rpx;
    background-color: #ffffff;

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
  }
}
</style>
