<template>
  <view class="page">
    <view class="header">
      <view class="detail">
        <view class="code">
          <view class="title"> 采购单 </view>
        </view>
        <view class="name">
          <view>采购单编号</view>
          <view>{{ GetInfoByIdData.F_Code }}</view>
        </view>
        <view class="name">
          <view>供应商名称</view>
          <view>{{ GetInfoByIdData.F_SupplierName }}</view>
        </view>
        <view class="name">
          <view>供应商联系人</view>
          <view>{{ GetInfoByIdData.F_Contacts }}</view>
        </view>
        <view class="name">
          <view>供应商联系电话</view>
          <view>{{ GetInfoByIdData.F_MoiblePhone }}</view>
        </view>
        <view class="name">
          <view>采购员</view>
          <view>{{ GetInfoByIdData.F_PurchaseId }}</view>
        </view>
        <view class="name">
          <view>采购员联系电话</view>
          <view>{{ GetInfoByIdData.F_Remark }}</view>
        </view>
        <view class="name">
          <view>备注</view>
          <view>{{ GetInfoByIdData.F_Description }}</view>
        </view>
        <view class="name">
          <view
            >是否先收后付<span style="color: red; margin-left: 8rpx"
              >*</span
            ></view
          >
          <view>
            <view class="uni-list">
              <radio-group @change="PayTypeChange">
                <label
                  class="uni-list-cell uni-list-cell-pd"
                  v-for="(item, index) in items"
                  :key="item.value"
                >
                  <view>
                    <radio
                      style="transform: scale(0.8); margin-left: 30rpx"
                      :value="item.value"
                      :checked="index == '1'"
                    />
                  </view>
                  <view>{{ item.name }}</view>
                </label>
              </radio-group>
            </view>
          </view>
        </view>
      </view>
      <view class="record" v-if="GetInfoByIdList.length > 0">
        <view class="title"> 采购单明细 </view>
        <view
          class="list"
          v-for="(item, index) in GetInfoByIdList"
          :key="index"
        >
          <view class="subhead">
            <view class="date date1">
              <!-- 制单日期 -->
              {{ GetInfoByIdData.F_Register | moment }}
            </view>
            <view class="name">
              物资编码：
              <text>{{ item.F_MaterialCode || "-" }}</text>
            </view>
          </view>
          <view class="material">
            <view class="opwid">物资名称:{{ item.F_MaterialName }}</view>
            <view class="contact">
              <view class="people">
                规格：
                <text>{{ item.F_Model }}</text>
              </view>
              <view class="phone">
                材质：
                <text>{{ item.F_Material }}</text>
              </view>
              <view class="phone">
                单位：
                <text>{{ item.F_Unit }}</text>
              </view>
            </view>
            <view class="suppjg">
              <view class="supbj">
                <text class="supptop">
                  {{ item.F_TotalPrice }}
                  <text class="small">元</text>
                </text>
                <text class="suppbom">采购金额(含税)</text>
              </view>
              <view class="supbj">
                <text class="supptop">
                  {{ item.F_Price || 0 }}
                  <text class="small">元</text>
                </text>
                <text class="suppbom">单价(含税)</text>
              </view>
              <view class="supbj">
                <text class="supptop">
                  {{ item.F_PurchaseNum }}
                </text>
                <text class="suppbom">采购数量</text>
              </view>
            </view>
          </view>
        </view>
      </view>
      <!-- 采购信息 -->
      <view class="heamid" v-if="PayType == 2">
        <text class="heatop"> 采购信息 </text>
        <view class="headop">
          <view class="heaadd">
            <text
              >运费<span style="color: red; margin-left: 8rpx">*</span></text
            >
            <input
              type="digit"
              v-model="purchaseForm.F_LogisticsPrice"
              placeholder="请输入运费"
              placeholder-class="placeinput"
              maxlength="10"
              @blur="F_LogisticsPrice"
            />
          </view>
        </view>
        <view class="headop">
          <view class="heaadd">
            <text
              >其它金额<span style="color: red; margin-left: 8rpx"
                >*</span
              ></text
            >
            <input
              type="digit"
              v-model="purchaseForm.F_OtherMoney"
              placeholder="请输入其它金额"
              placeholder-class="placeinput"
              maxlength="10"
              @blur="F_OtherMoney"
            />
          </view>
        </view>
        <view class="headop">
          <view class="heaadd">
            <text
              >合计金额<span style="color: red; margin-left: 8rpx"
                >*</span
              ></text
            >
            <text v-model="F_TotalMoney">{{ F_TotalMoney }}</text>
          </view>
        </view>
        <view class="headop">
          <view class="heaadd">
            <text
              >折扣金额<span style="color: red; margin-left: 8rpx"
                >*</span
              ></text
            >
            <input
              type="digit"
              v-model="purchaseForm.F_DiscountMoney"
              placeholder="请输入折扣金额"
              placeholder-class="placeinput"
              maxlength="10"
              @blur="F_DiscountMoney"
            />
          </view>
        </view>
        <view class="headop">
          <view class="heaadd">
            <text
              >实际金额<span style="color: red; margin-left: 8rpx"
                >*</span
              ></text
            >
            <text v-model="F_ActualMoney">{{ F_ActualMoney }}</text>
          </view>
        </view>
        <view class="headop">
          <view class="heaadd1">
            <text
              >采购凭证<span style="color: red; margin-left: 8rpx"
                >*</span
              ></text
            >
          </view>
        </view>
        <view class="upimg">
          <uploadImgs @uploadImg="getUploadImg"></uploadImgs>
        </view>
        <view class="headtarea">
          <view class="heaadd">
            <text style="font-size: 28rpx">备注</text>
            <!-- <scroll-view class="scroll-view-box" scroll-y="true" style="height: 260rpx;"> -->
            <textarea
              v-model="purchaseForm.F_Description"
              placeholder="请输入备注"
              placeholder-class="placeinput"
              maxlength="100"
            />
            <!-- </scroll-view> -->
          </view>
        </view>
        <!-- <view class="headop">
					<view class="heaadd">
						<text>采购金额<span style="color:red;margin-left: 8rpx;">*</span></text>
						<text v-model="F_TotalPrice">{{F_TotalPrice}}</text>
					</view>
					<view class="borbom"></view>
				</view> -->
        <view class="payment">
          <view class="payments">
            <text style="font-size: 28rpx"
              >是否支付<span style="color: red; margin-left: 8rpx"
                >*</span
              ></text
            >
            <view class="uni-list">
              <radio-group @change="radioChange">
                <label
                  style="font-size: 28rpx"
                  class="uni-list-cell uni-list-cell-pd"
                  v-for="(item, index) in items"
                  :key="item.value"
                  @click="radioClick(item.value)"
                >
                  <view>
                    <radio
                      :disabled="radisabled"
                      style="transform: scale(0.8); margin-left: 30rpx"
                      :value="item.value"
                      :checked="index == raindex"
                    />
                  </view>
                  <view>{{ item.name }}</view>
                </label>
              </radio-group>
            </view>
          </view>
          <view class="borbom"></view>
        </view>

        <view class="payment" v-if="pay == '1'">
          <text class="heatop"> 支付信息 </text>
          <view class="payments">
            <text style="font-size: 28rpx"
              >支付方式<span style="color: red; margin-left: 8rpx"
                >*</span
              ></text
            >
            <view class="uni-list">
              <radio-group @change="radioChanges">
                <label
                  style="font-size: 28rpx"
                  class="uni-list-cell uni-list-cell-pd"
                  v-for="(item, index) in paitems"
                  :key="item.value"
                >
                  <view>
                    <radio
                      style="transform: scale(0.8); margin-left: 25rpx"
                      :value="item.value"
                      :checked="index === current"
                    />
                  </view>
                  <view>{{ item.name }}</view>
                </label>
              </radio-group>
            </view>
          </view>
        </view>
        <view class="headop" v-if="pay == '1'">
          <view class="heaadd">
            <text
              >支付金额<span style="color: red; margin-left: 8rpx"
                >*</span
              ></text
            >
            <input
              type="number"
              v-model="purchaseForm.payMoney"
              placeholder="请输入支付金额"
              placeholder-class="placeinput"
              maxlength="10"
              @blur="payMoneys"
            />
          </view>
        </view>
        <view class="headtarea" v-if="pay == '1'">
          <view class="heaadd">
            <text style="font-size: 28rpx">支付备注</text>
            <!-- <scroll-view class="scroll-view-box" scroll-y="true" style="height: 260rpx;"> -->
            <textarea
              style="font-size: 28rpx"
              v-model="purchaseForm.payRemark"
              placeholder="请输入支付备注"
              placeholder-class="placeinput"
              maxlength="100"
            />
            <!-- </scroll-view> -->
          </view>
        </view>
        <view class="headop" v-if="pay == '1'">
          <view class="heaadd1">
            <text
              >支付凭证<span style="color: red; margin-left: 8rpx"
                >*</span
              ></text
            >
          </view>
        </view>
        <!-- 		<view class="headtarea" style="overflow: hidden;" v-if="pay=='1'">
					<view class="upimgs">
						<view class="">
							支付凭证<span style="color:red;margin-left: 8rpx;">*</span>
						</view>
					</view>
				</view> -->
        <view class="upimg" v-if="pay == '1'">
          <uploadImgs @uploadImg="getUploadImgs"></uploadImgs>
        </view>
      </view>
    </view>
    <view class="bom">
      <button type="primary" plain="true" class="plabtn" @click="cancell()">
        取消
      </button>
      <button type="primary" class="prbtn" @click="materialAdd()">保存</button>
    </view>
  </view>
</template>

<script>
import uploadImgs from "../../components/uploadImgs.vue";
export default {
  data() {
    return {
      purchaseForm: {
        F_DiscountMoney: "0",
        // F_OtherMoney:"0",
        payMoney: "",
      },
      heakp: false, //开票信息
      quopayMoney: "", //获取的付款限额
      current: 0,
      raindex: 1, //是否支付
      checked: false,
      payimg: [], //支付凭证
      purimg: [], //采购凭证

      PayType: "2", //是否先收后付
      item: [
        {
          value: "1",
          name: "是",
        },
        {
          value: "2",
          name: "否",
        },
      ],
      pay: "2", //是否支付
      items: [
        {
          value: "1",
          name: "是",
        },
        {
          value: "2",
          name: "否",
        },
      ],
      paitems: [
        {
          value: "1",
          name: "储备金",
        },
        {
          value: "2",
          name: "个人垫付",
        },
      ],
      paymethod: "1", //支付方式

      GetInfoByIdData: {},
      GetInfoByIdList: [],
      // F_LogisticsPrice: 0, //运费
      F_TotalPrice: 0, //采购金额
      // F_TotalMoney: 0, //合计金额
      // F_ActualMoney: 0, //实际金额

      GetInfoByIdData: {},
      radisabled: false, //单选禁用
    };
  },
  onLoad(option) {
    // this.proid = this.$store.proid
    // this.proid = JSON.parse(option.proid)
    this.GetInfoByIdDep();
    this.quotaSet();
  },
  onShow() {},
  computed: {
    //合计金额
    F_TotalMoney() {
      // if (this.purchaseForm.F_OtherMoney) {
      //   let cont =
      //     Number(this.purchaseForm.F_LogisticsPrice) +
      //     Number(this.F_TotalPrice) +
      //     Number(this.purchaseForm.F_OtherMoney);
      //   return cont.toFixed(2);
      // } else {
      //   let cont =
      //     Number(this.purchaseForm.F_LogisticsPrice) +
      //     Number(this.F_TotalPrice);
      //   return cont.toFixed(2);
      // }

      let otherMoney = this.purchaseForm.F_OtherMoney | 0;
      let logisticsPrice = this.purchaseForm.F_LogisticsPrice | 0;
      let totalPrice = this.F_TotalPrice | 0;
      let cont =
        Number(otherMoney) + Number(logisticsPrice) + Number(totalPrice);
      return cont.toFixed(2);
    },
    // 实际金额
    F_ActualMoney() {
      let otherMoney = this.purchaseForm.F_OtherMoney | 0;
      let logisticsPrice = this.purchaseForm.F_LogisticsPrice | 0;
      let totalPrice = this.F_TotalPrice | 0;
      let disscountMoney = this.purchaseForm.F_DiscountMoney;
      let cont =
        Number(otherMoney) +
        Number(logisticsPrice) +
        Number(totalPrice) -
        Number(disscountMoney);

      this.purchaseForm.payMoney = cont.toFixed(2);
      if (cont > this.quopayMoney) {
        this.raindex = 1;
        this.pay = 0;
        this.radisabled = true;
        console.log(cont, this.radisabled, "F_ActualMoney");
      } else {
        this.radisabled = false;
      }
      return cont.toFixed(2);

      // if (
      //   (isNaN(this.purchaseForm.F_OtherMoney) &&
      //     this.purchaseForm.F_DiscountMoney) ||
      //   (this.purchaseForm.F_OtherMoney && this.purchaseForm.F_DiscountMoney)
      // ) {
      //   let op = "";
      //   if (isNaN(this.purchaseForm.F_OtherMoney)) {
      //     op = 0;
      //   } else {
      //     op = this.purchaseForm.F_OtherMoney;
      //   }
      //   let cont =
      //     Number(this.purchaseForm.F_LogisticsPrice) +
      //     Number(this.F_TotalPrice) +
      //     Number(op) -
      //     Number(this.purchaseForm.F_DiscountMoney);
      //   this.purchaseForm.payMoney = cont.toFixed(2);
      //   if (cont > this.quopayMoney) {
      //     this.raindex = 1;
      //     this.pay = 0;
      //     this.radisabled = true;
      //     console.log(cont, this.radisabled, "F_ActualMoney");
      //   } else {
      //     this.radisabled = false;
      //   }
      //   return cont.toFixed(2);
      // } else {
      //   let cont =
      //     Number(this.purchaseForm.F_LogisticsPrice) +
      //     Number(this.F_TotalPrice);
      //   this.purchaseForm.payMoney = cont.toFixed(2);
      //   this.acmoney = cont.toFixed(2);
      //   if (cont > this.quopayMoney) {
      //     this.radisabled = true;
      //     console.log(cont, this.radisabled, "F_ActualMoney");
      //   } else {
      //     this.radisabled = false;
      //   }
      //   return cont.toFixed(2);
      // }
    },
  },
  components: {
    uploadImgs,
  },
  //顶部导航按钮-----修改
  onNavigationBarButtonTap(e) {
    uni.reLaunch({
      url: "./PurchaseOrder",
    });
  },
  //物理返回键
  onBackPress(options) {
    uni.reLaunch({
      url: "./PurchaseOrder",
    });
    return true;
  },
  methods: {
    // 是否先收后付
    PayTypeChange(evt) {
      // console.log(evt.detail.value, '是否先收后付')
      this.PayType = evt.detail.value;
      // if (this.PayType == 1) {
      // 	this.heakp = true
      // } else {
      // 	this.heakp = false
      // }
      console.log(this.PayType, "是否先收后付");
    },

    // 改变金额保留两位小数
    F_LogisticsPrice(e) {
      // console.log(e.detail.value, '填金额')
      this.purchaseForm.F_LogisticsPrice = Number(e.detail.value).toFixed(2);
    },
    F_OtherMoney(e) {
      var money = this.purchaseForm.F_OtherMoney;
      money = String(money).replace(/[^\d.]/g, ""); //过滤到非数字  //清除“数字”和“.”以外的字符
      money = String(money).replace(/^\./g, ""); //必须保证第一个为数字而不是.
      money = String(money).replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
      money = String(money)
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", ".");
      money = String(money).replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3"); //只能输入两个小数
      // money = parseInt(money)
      if (isNaN(money)) {
        money = 0;
      }
      this.$set(this.purchaseForm, "F_OtherMoney", Number(money));
    },
    //折扣金额
    F_DiscountMoney(e) {
      var money = this.purchaseForm.F_DiscountMoney;
      money = String(money).replace(/[^\d.]/g, ""); //过滤到非数字  //清除“数字”和“.”以外的字符
      money = String(money).replace(/^\./g, ""); //必须保证第一个为数字而不是.
      money = String(money).replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
      money = String(money)
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", ".");
      money = String(money).replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3"); //只能输入两个小数
      // money = parseInt(money)
      if (isNaN(money)) {
        money = 0;
      }
      this.$set(this.purchaseForm, "F_DiscountMoney", Number(money));
      console.log(
        this.purchaseForm.F_DiscountMoney,
        "this.purchaseForm.F_DiscountMoney"
      );
    },

    // 根据采购单ID获取采购信息
    GetInfoByIdDep: function (e) {
      uni.request({
        url: this.url + "/WebApiInterface/OrderPurchase/GetInfoById",
        method: "POST",
        data: {
          id: this.$store.PurchaseId, //采购单id
        },
        success: (res) => {
          // console.log(res, '根据采购单ID获取采购信息');
          this.GetInfoByIdData = res.data.Data.orderPurchaseEntity; //采购单
          this.GetInfoByIdList = res.data.Data.orderPurchaseDetailsEntity; //采购单明细
          let arr = []; //运费数组
          let brr = []; //采购金额数组
          this.GetInfoByIdList.forEach((item) => {
            arr.push(item.F_LogisticsPrice);
            brr.push(item.F_TotalPrice);
          });
          let F_LogisticsPrice = arr.reduce((x, y) => x + y);
          this.purchaseForm.F_LogisticsPrice = this.$set(
            this.purchaseForm,
            "F_LogisticsPrice",
            Number(F_LogisticsPrice)
          ); // 运费和
          this.F_TotalPrice = brr.reduce((x, y) => x + y); // 采购金额和
        },
      });
    },
    //获取付款限额
    quotaSet() {
      uni.request({
        url: this.url + "/WebApiInterface/Payment/GetQuotaSet",
        method: "POST",
        data: {
          payMoney: "",
        },
        success: (res) => {
          console.log(res, "获取的付款限额");
          this.quopayMoney = res.data.Data.payMoney;
        },
      });
    },

    // 是否支付单选框
    radioChange: function (evt) {
      // console.log(evt.detail.value, '是否支付单选框')
      this.pay = evt.detail.value;
      if (this.pay == "1") {
        this.purchaseForm.payMoney = this.F_ActualMoney;
      } else {
        this.purchaseForm.payMoney = "";
      }
    },

    // 支付方式
    radioChanges: function (evt) {
      // console.log(evt.detail.value, '支付方式')
      this.paymethod = evt.detail.value;
    },
    //是否支付点击事件
    radioClick(value) {
      if (value == 1 && this.radisabled) {
        console.log(value, "11111");
        uni.showToast({
          icon: "none",
          title: "金额超过系统限额",
        });
      }
    },
    // 支付金额
    payMoneys() {
      var money = this.purchaseForm.payMoney;
      money = String(money).replace(/[^\d.]/g, ""); //过滤到非数字  //清除“数字”和“.”以外的字符
      money = String(money).replace(/^\./g, ""); //必须保证第一个为数字而不是.
      money = String(money).replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
      money = String(money)
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", ".");
      money = String(money).replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3"); //只能输入两个小数
      // money = parseInt(money)
      if (isNaN(money) || money == 0) {
        money = 0.01;
      }
      if (this.purchaseForm.payMoney > this.F_ActualMoney) {
        money = this.F_ActualMoney;
        console.log(this.purchaseForm.payMoney, "支付金额");
      }
      this.$set(this.purchaseForm, "payMoney", Number(money));
    },

    //完成采购
    Add(Form) {
      uni.request({
        url: this.url + "/WebApiInterface/OrderPurchase/CompletePurchase",
        method: "post",
        data: Form,
        success: (res) => {
          // console.log(res, '完成采购')
          if (res.data.StatusCode == 200) {
            uni.reLaunch({
              url: "./PurchaseOrder",
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
    materialAdd() {
      let purimg = this.purimg.join();
      let payimg = this.payimg.join();
      var Form = {
        userId: uni.getStorageSync("userid"),
        id: this.$store.PurchaseId,
        F_LogisticsPrice: this.purchaseForm.F_LogisticsPrice,
        F_OtherMoney: this.purchaseForm.F_OtherMoney,
        F_TotalMoney: this.F_TotalMoney, //合计金额
        F_DiscountMoney: this.purchaseForm.F_DiscountMoney,
        F_ActualMoney: this.F_ActualMoney, //实际金额
        F_Files: purimg, //采购凭证
        F_Description: this.purchaseForm.F_Description,
        F_PurchaseMoney: this.F_TotalPrice, //采购金额
        F_IsPay: this.pay,
        payType: this.paymethod,
        payMoney: this.purchaseForm.payMoney,
        payRemark: this.purchaseForm.payRemark,
        payFiles: payimg, //支付凭证
        F_PayType: this.PayType, //是否先收后付
      };
      var Forms = {
        userId: uni.getStorageSync("userid"),
        id: this.$store.PurchaseId,
        F_PayType: this.PayType, //是否先收后付
      };
      console.log(Form, "formformform");
      if (this.PayType == 1) {
        this.Add(Forms);
      } else {
        if (Form.F_IsPay == "1") {
          if (
            this.purchaseForm.F_OtherMoney == null ||
            this.purchaseForm.F_DiscountMoney == null ||
            (this.purchaseForm.F_LogisticsPrice == null) |
              !Form.F_TotalMoney |
              !Form.F_ActualMoney |
              !Form.F_Files |
              !Form.F_PurchaseMoney |
              !Form.payMoney |
              !Form.payFiles
          ) {
            uni.showToast({
              icon: "none",
              title: "带红色星号的是必填项,请填写完整",
            });
          } else {
            this.Add(Form);
          }
        } else {
          if (
            (this.purchaseForm.F_LogisticsPrice == null) |
              (this.purchaseForm.F_OtherMoney == null) ||
            (this.purchaseForm.F_DiscountMoney == null) |
              !Form.F_TotalMoney |
              !Form.F_ActualMoney |
              !Form.F_Files |
              !Form.F_PurchaseMoney
          ) {
            uni.showToast({
              icon: "none",
              title: "带红色星号的是必填项,请填写完整",
            });
          } else {
            this.Add(Form);
          }
        }
      }
    },
    // 取消
    cancell() {
      uni.reLaunch({
        url: "./PurchaseOrder",
      });
    },
    // 采购凭证
    getUploadImg(res) {
      console.log(res, "采购凭证");
      this.purimg = res;
      // console.log(arr, '采购凭证arr')
      // console.log(this.purimg, '采购凭证')
    },
    // 支付凭证
    getUploadImgs(res) {
      console.log(res, "支付凭证");
      this.payimg = res;
      // console.log(this.payimg, '支付凭证')
    },
    //当前时间
    // materdate() {
    // 	var now = new Date()
    // 	var year = now.getFullYear(); //得到年份
    // 	var month = now.getMonth(); //得到月份
    // 	var date = now.getDate(); //得到日期
    // 	month = month + 1;
    // 	month = month.toString().padStart(2, "0");
    // 	date = date.toString().padStart(2, "0");
    // 	this.materF_Date = `${year}-${month}-${date}`;
    // 	console.log(this.materF_Date, 'data')
    // }
  },
};
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  list-style: none;
}

.page {
  display: flex;
  // flex-direction: column;
  justify-content: center;
  align-items: center;

  .header {
    width: 93%;
    height: auto;
    // background-color: #FFFFFF;
    margin-top: 30rpx;

    margin-bottom: 190rpx;

    .detail {
      width: 100%;
      overflow: hidden;
      background-color: #ffffff;
      border-radius: 9rpx;
      padding: 30rpx;

      .code {
        // height: 194rpx;
        background: #ffffff;
        margin-bottom: 10rpx;

        .title {
          font-family: PingFang SC;
          font-weight: bold;
          line-height: 48rpx;
          color: #262626;
        }
      }

      .name {
        display: flex;
        justify-content: space-between;
        height: 90rpx;
        border-bottom: 1rpx solid #fafafa;
        font-size: 28rpx;
        font-family: PingFang SC;
        line-height: 90rpx;
        color: #666666;
      }
    }
    .record {
      background: #ffffff;
      margin-top: 20rpx;
      // overflow: hidden;
      border-radius: 9rpx;
      display: flex;
      flex-direction: column;
      .title {
        margin: 39rpx 0 0 30rpx;
        font-size: 32rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #262626;
      }

      .list {
        padding: 30rpx;
        border-bottom: 1rpx solid #fafafa;

        .subhead {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .date {
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

          .date::before {
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

          .date::after {
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

          .date.date1 {
            background: #4d6ce9;
          }

          .date.date1::before {
            border-top-color: #4d6ce9;
          }

          .name {
            font-size: 26rpx;
            font-family: PingFang SC;
            line-height: 37rpx;
            color: #808080;

            text {
              color: #333333;
            }
          }
        }

        .material {
          width: 100%;
          margin-top: 30rpx;
          .opwid {
            font-family: PingFang SC;
            font-weight: bold;
            line-height: 45rpx;
            color: #262626;
            font-size: 30rpx;
          }
          .contact {
            width: 100%;
            display: flex;
            justify-content: space-between;
            margin-top: 20rpx;
            font-size: 26rpx;
            font-family: PingFang SC;
            line-height: 37rpx;
            color: #808080;

            text {
              color: #333333;
            }
          }
          .suppjg {
            width: 100%;
            height: 120rpx;
            background: rgba(39, 152, 253, 0.05);
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            margin-top: 20rpx;

            .supbj {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              width: calc(33.1%-20rpx);
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

        .number {
          // margin: auto;
          // margin-top: 19rpx;
          // width: 565rpx;
          // height: 104rpx;
          // background: rgba(39, 152, 253, 0.05);
          // display: flex;
          // justify-content: space-between;
          width: 85%;
          margin: auto;
          height: 120rpx;
          background: rgba(39, 152, 253, 0.05);
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          margin-bottom: 12rpx;

          .purchasemoney {
            text-align: center;

            .son {
              margin: 14rpx 0 8rpx 0;
              font-size: 30rpx;
              font-family: PingFang SC;
              font-weight: bold;
              line-height: 28rpx;
              color: #2798fd;
              opacity: 0.6;
            }

            .money {
              font-size: 22rpx;
              font-family: PingFang SC;
              color: #2798fd;
              opacity: 0.6;
            }
          }
        }
      }
    }
    .heamid {
      // width: 92%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding: 30rpx;
      background-color: #ffffff;
      margin-top: 20rpx;
      border-radius: 9rpx;
      .heatop {
        height: 38rpx;
        font-size: 32rpx;
        font-family: PingFang SC;
        font-weight: bold;
        line-height: 38rpx;
        // margin: 0 0rpx 30rpx 0rpx;
        margin-bottom: 30rpx;
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

  .payment {
    .payments {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      font-size: 32rpx;
      font-family: PingFang SC;
      line-height: 38rpx;
      height: 90rpx;
      line-height: 90rpx;
      border-bottom: 1rpx solid #fafafa;
      // margin: 20rpx 0rpx;
      color: #666666;
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
      height: 90rpx;
      line-height: 90rpx;
      border-bottom: 1rpx solid #fafafa;
      color: #666666;

      input {
        text-align: right;
        font-size: 28rpx;
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

    .heaadd1 {
      color: #666666;
      font-size: 28rpx;
      height: 90rpx;
      line-height: 90rpx;

      textarea {
        margin-top: 20rpx;
        font-size: 28rpx;
        height: 200rpx;
      }

      .placeinput1 {
        text-align: left;
      }
    }

    // .borbom {
    // 	margin-top: 30rpx;
    // 	height: 1px;
    // 	background: #FAFAFA;
    // 	opacity: 1;
    // }

    .placeinput {
      text-align: right;
    }
  }

  .headtarea {
    margin-top: 20rpx;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #666666;
    border-bottom: 1rpx solid #fafafa;

    .heaadd {
      width: 100%;
    }

    textarea {
      width: 100%;
      height: 200rpx;
      margin: 20rpx 0;
      font-size: 28rpx;
    }

    .upimgs {
      width: 90%;
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
    // justify-content: center;
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

uni-radio-group {
  display: flex;
  margin-left: 100rpx;
}

uni-view {
  display: inline-block;
}
</style>
