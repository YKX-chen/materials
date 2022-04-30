<template>
  <view class="content">
    <view class="detail">
      <view class="code">
        <view class="title"> 供应商 </view>
        <view class="purchasecode">
          <view>供应商名称</view>
          <view>{{ info.F_SupplierName }}</view>
        </view>
      </view>
      <view class="name">
        <view>公司简称</view>
        <view>{{ info.F_Abbreviation }}</view>
      </view>
      <view class="name">
        <view>联系人</view>
        <view>{{ info.F_Contacts }}</view>
      </view>
      <view class="name">
        <view>联系方式</view>
        <view>{{ info.F_MoiblePhone }}</view>
      </view>
      <view class="name">
        <view>户名</view>
        <view>{{ info.F_AccountName }}</view>
      </view>
      <view class="name">
        <view>营业执照附件</view>
      </view>
      <view class="upimg" v-if="info.F_BusinessLicenseFile != null">
        <image
          v-for="(item, index) in imgsrclist"
          :key="index"
          :src="'http://purchase.zhroot.com' + item"
          mode=""
          @click="clickImg"
        ></image>
      </view>
      <!-- <view class="upimgs" v-if="info.F_BusinessLicenseFile == null">
				<image src="http://purchase.zhroot.com/attached/appImgs/saleplan/%E7%BB%84%204887.png">
				</image>
			</view> -->
      <view class="name">
        <view>银行账号</view>
        <view>{{ info.F_BankAccount }}</view>
      </view>
      <view class="name">
        <view>营业执照号</view>
        <view>{{ info.F_BusinessLicense }}</view>
      </view>
      <view class="name">
        <view>开户银行</view>
        <view>{{ info.F_BankDeposit }}</view>
      </view>
      <view class="name">
        <view>省/市/区</view>
        <view>{{ info.F_Province }}</view>
      </view>
      <view class="name">
        <view>付款方式</view>
        <view v-if="info.F_PaymentType == 1">现结</view>
        <view v-if="info.F_PaymentType == 2">欠款</view>
      </view>
      <view class="name">
        <view>负责人</view>
        <view>{{ info.F_Responsible }}</view>
      </view>
      <view class="name">
        <view>详细地址</view>
        <view>{{
          info.F_Address.length > 10
            ? info.F_Address.substring(0, 10) + "..."
            : info.F_Address
        }}</view>
      </view>
      <view class="name">
        <view>结算周期</view>
        <view>{{ info.F_Cycle }}</view>
      </view>
      <view class="name">
        <view>坐标</view>
        <view>{{ info.F_Remark2 }}</view>
      </view>
      <view class="name">
        <view>是否厂家</view>
        <view v-if="info.F_IsFactory == 1">是</view>
        <view v-if="info.F_IsFactory == 2">否</view>
      </view>
      <view class="name">
        <view>主营范围</view>
        <view>{{ info.F_MainBusinessScope }}</view>
      </view>
      <view class="name">
        <view>收录日期</view>
        <view v-if="info.F_IncludedTime">{{
          info.F_IncludedTime | moment
        }}</view>
      </view>
      <!-- <view class="name">
        <view>备注说明</view>
        <view>{{ info.F_Description }}</view>
      </view> -->
      <view class="headtarea">
        <view class="heaadd1">
          <text style="width: 20%">备注</text>
          <text v-if="info.F_Description == null"></text>
          <text v-if="info.F_Description != null">{{
            info.F_Description
          }}</text>
          <!-- <input v-model="materialForm.F_Description" disabled /> -->
          <!-- <textarea v-model="materialForm.F_Description" placeholder-class="placeinput" disabled /> -->
        </view>
      </view>
    </view>

    <!-- <view class="bom" v-if="this.info.F_Status=='1'">
			<button type="warn" class="plabtn" @click="showleftpro('showLeft')">拒绝</button>
			<button type="primary" class="prbtn" @click="materialAdd()">通过</button>
		</view> -->
    <view class="bom" v-if="status == 1">
      <button type="warn" class="plabtn" @click="cancell(1)">拒绝</button>
      <button type="primary" class="prbtn" @click="cancell(2)">通过</button>
    </view>
    <!-- 弹出层begin -->
    <uni-popup ref="popup" type="dialog">
      <uni-popup-dialog
        :type="msgtype"
        title="驳回说明"
        :before-close="true"
        @confirm="dialogConfirm"
        @close="dialogClose"
      >
        <view class="submitj">
          <textarea
            v-model="explain"
            placeholder="请输入内容"
            placeholder-class="placeinput"
            maxlength="100"
          />
        </view>
      </uni-popup-dialog>
    </uni-popup>
    <!-- 弹出层end -->

    <!-- <uni-drawer ref="showLeft" mode="right" :width="260">
			<view class="close">
				<view class="word-btn" hover-class="word-btn--hover" :hover-start-time="20" :hover-stay-time="70"
					@click="closeDrawer('showLeft')"><text class="word-btn-white">×</text></view>
				<view class="bigdialog">
					<view class="title">
						驳回说明
					</view>
					<view class="cont">
						<input type="text" value="" />
					</view>
					<view class="dialoginput">
						<button type="primary" plain="true" @click="czselect()">重置</button>
						<button type="primary" @click="sxelect()">确认</button>
					</view>
				</view>
			</view>
		</uni-drawer> -->

   <uni-load-more :status="more"></uni-load-more>

  </view>
</template>

<script>
// import uniDrawer from "../../../components/uni-drawer/uni-drawer.vue";
import uniPopup from "@/components/uni-popup/uni-popup.vue";
import uniPopupDialog from "@/components/uni-popup-dialog/uni-popup-dialog.vue";
export default {
  data() {
    return {
      info: {}, //详情
      imgsrclist: [], //附件回显
      msgtype: "warn", //弹出层的类型
      explain: "", //审批驳回时说明
      data: {},
      status: "",
    };
  },
  onLoad(option) {
    this.status = option.status;
    this.GetSupplierInfo();
  },
  created() {},
  components: {
    // uniDrawer,
    uniPopup,
    uniPopupDialog,
  },
  //顶部导航按钮-----修改
  onNavigationBarButtonTap(e) {
    uni.reLaunch({
      url: "Examine",
    });
  },
  //物理返回键
  onBackPress(options) {
    uni.reLaunch({
      url: "Examine",
    });
    return true;
  },
  methods: {
    // 点击图片放大查看
    clickImg() {
      let arr = [];
      this.imgsrclist.forEach((item) => {
        arr.push("http://purchase.zhroot.com" + item);
      });
      console.log(arr, "放大图片");
      wx.previewImage({
        urls: arr, //需要预览的图片http链接列表，多张的时候，url直接写在后面就行了
        current: "", // 当前显示图片的http链接，默认是第一个
        success: function (res) {},
        fail: function (res) {},
        complete: function (res) {},
      });
    },

    // 供应商详情
    GetSupplierInfo: function (e) {
      // var formdata = e.detail.value
      uni.request({
        url: this.url + "/WebApiInterface/Supplier/GetSupplierInfo",
        method: "POST",
        // header: {
        // 	Authorization: uni.getStorageSync('Authorization')
        // },
        data: {
          id: this.$store.supplierid, //[必填]供应商ID
        },
        success: (res) => {
          // console.log(res.data.Data, '供应商详情');
          this.info = res.data.Data;
          if (this.info.F_BusinessLicenseFile) {
            this.imgsrclist = this.info.F_BusinessLicenseFile.split(",");
          }

          if (this.info.F_Province) {
            this.info.F_Province =
              this.info.F_Province +
              "/" +
              this.info.F_City +
              "/" +
              this.info.F_Area;
          }
          console.log(this.imgsrclist, "附件");
          console.log(this.info, "供应商详情");
        },
      });
    },
    //拒绝  1   通过   2
    cancell(type) {
      this.data = {
        id: this.$store.supplierid, // [必填]销售单主键ID
        type: "approval", //[必填]类型 （submit 提交， approval 审批）
        explain: "", //[可选] 审批驳回时说明
        approvalType: "通过", //[可选]审批类型  审批时必填（通过  拒绝）
        userId: uni.getStorageSync("userid"), //[必填]用户ID
      };
      if (type == 1) {
        this.$refs.popup.open();
      } else {
        this.submit(this.data);
      }
    },
    //弹出层   确定
    dialogConfirm(data) {
      this.data.approvalType = "拒绝";
      this.data.explain = this.explain;
      this.submit(this.data);
      this.$refs.popup.close();
    },
    submit(data) {
      console.log(data, "data");
      uni.request({
        url: this.url + "/WebApiInterface/Supplier/Submit",
        method: "POST",
        data: data,
        success: (res) => {
          if (res.data.StatusCode == 200) {
            this.$refs.popup.close();
            uni.reLaunch({
              url: "./Examine",
            });
          } else {
            uni.showToast({
              icon: "none",
              title: res.data.Info,
            });
          }
        },
      });
    },
    //弹出层   取消
    dialogClose() {
      this.explain = "";
      this.$refs.popup.close();
    },
    // // 拒绝
    // // 侧边栏事件
    // showleftpro(e) {
    // 	this.$refs[e].open();
    // },
    // // 关闭窗口
    // closeDrawer(e) {
    // 	this.$refs[e].close();
    // 	console.log(e, 'e')
    // },
  },
};
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}

.content {
  background: #f3f3f3;
  padding: 30rpx 0 180rpx 0;
  width: 100%;

  .detail {
    overflow: hidden;
    margin: 0 30rpx;
    background-color: #fff;
    .code {
      height: 150rpx;
      background: #ffffff;
      padding: 40rpx 30rpx 0 30rpx;
      border-bottom: 1rpx solid #fafafa;

      .title {
        font-family: PingFang SC;
        font-weight: bold;
        line-height: 48rpx;
        color: #262626;
      }

      .purchasecode {
        display: flex;
        margin-top: 40rpx;
        font-size: 28rpx;
        font-family: PingFang SC;
        color: #666666;
        justify-content: space-between;
      }
    }

    .upimg {
      width: 100%;
      height: 200rpx;
      padding-left: 30rpx;
      image {
        display: inline-block;
        width: 180rpx;
        height: 180rpx;
        border-radius: 9rpx;
        margin-right: 20rpx;
      }
    }
    .upimgs {
      width: 190rpx;
      height: 190rpx;
      margin-left: 30rpx;
      background-color: rgba(245, 248, 255, 0.9);
      border-radius: 5rpx;
      margin-top: 20rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 9rpx;
      image {
        width: 122rpx;
        height: 84rpx;
      }
    }

    .name {
      display: flex;
      justify-content: space-between;
      height: 90rpx;
      background: #ffffff;
      font-size: 28rpx;
      font-family: PingFang SC;
      line-height: 90rpx;
      color: #666666;
      padding: 0 30rpx;
      border-bottom: 1rpx solid #fafafa;
    }
  }

  .noway {
    width: 690rpx;
    height: 419rpx;
    background: #ffffff;
    border-radius: 9rpx;
    text-align: center;
    margin-top: 30rpx;
    line-height: 419rpx;
    color: rgba(153, 153, 153, 0.5);
  }

  .bom {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 160rpx;
    background-color: #ffffff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 10rpx;

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

  .close {
    padding-left: 20rpx;
    overflow: hidden;

    .bigdialog {
      margin-top: 120rpx;
      padding: 0 20rpx;

      .title {
        font-size: 34rpx;
        font-family: PingFang SC;
        margin-bottom: 30rpx;
      }

      .cont {
        border: 1rpx solid #000000;
      }

      .type {
        display: flex;
        justify-content: space-around;

        button {
          padding: 0 10rpx;
          font-size: 26rpx;
          border-radius: 5rpx;
        }

        .but-h-se {
          background-color: #2898fd;
          color: #ffffff;
        }
      }

      .dialoginput {
        position: fixed;
        bottom: 40rpx;
        left: 0;
        display: flex;
        width: 100%;
        justify-content: space-around;

        text {
          font-size: 36rpx;
        }

        picker {
          height: 60rpx;
          line-height: 60rpx;
          border-radius: 50rpx;
          background-color: #f7f7f7;
          color: #737373;
          font-size: 24rpx;
        }

        button {
          width: 45%;
          height: 60rpx;
          font-size: 26rpx;
          line-height: 60rpx;
          border-radius: 5rpx;
        }
      }
    }
  }
  .submitj {
    width: 95%;
    border: 1rpx solid #fafafa;
    border-radius: 9rpx;
    font-size: 28rpx;

    textarea {
      width: 100%;
    }

    .placeinput {
      font-size: 28rpx;
    }
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
	  margin-left: 23rpx;
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
</style>
