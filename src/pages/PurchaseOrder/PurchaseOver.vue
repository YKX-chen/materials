<template>
  <view class="page">
    <view class="header">
      <view class="nav">
        <view
          :class="['navbar', click == 0 ? 'inv-h-se' : '']"
          @click="spanClick(0)"
        >
          采购单
          <view :class="['navbarxhx', click == 0 ? 'inv-h-sexhx' : '']"></view>
        </view>
        <view
          :class="['navbar', click == 1 ? 'inv-h-se' : '']"
          @click="spanClick(1)"
        >
          采购明细
          <view :class="['navbarxhx', click == 1 ? 'inv-h-sexhx' : '']"></view>
        </view>
      </view>
    </view>
    <view class="content" v-show="click == 0">
      <view class="detail">
        <view class="derop">
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
        </view>
      </view>

      <!-- 采购单明细 -->
      <view
        class="detail"
        v-for="(item, index) in GetInfoByIdList"
        :key="index"
      >
        <view class="derop">
          <view class="code">
            <view class="title"> 采购单明细 </view>
          </view>
          <view class="name">
            <view>物资</view>
            <view>{{ item.F_MaterialCode }} - {{ item.F_MaterialName }}</view>
          </view>
           <view class="name">
            <view>单价</view>
            <view>{{ item.F_Price }}</view>
          </view>
          <!-- 	<view class="name">
				<view>到货数量</view>
				<view>{{item.F_ArrivalNum}}</view>
			</view> -->
          <view class="name">
            <view>到货/采购数量</view>
            <view
              >{{ item.F_ArrivalNum || 0 }} /
              {{ item.F_PurchaseNum || 0 }}</view
            >
          </view>
          <!-- <view class="name">
						<view>本次收货数量<span style="color: red; margin-left: 8rpx">*</span></view>
						<input type="number" v-model="purchaseForm.bcshslnum" placeholder="请输入本次收货数量"
							placeholder-class="placeinput" @blur="bcshsl" maxlength="10"
							style="text-align: right; height: 90rpx; font-size: 28rpx" />
					</view> -->
          <view class="name">
            <view
              >本次收货数量<span style="color: red; margin-left: 8rpx"
                >*</span
              ></view
            >
            <input
              type="number"
              v-model="item.F_StrRemark"
              placeholder="请输入本次收货数量"
              placeholder-class="placeinput"
              @blur="bcshsl(item.F_Id)"
              maxlength="10"
              style="text-align: right; height: 90rpx; font-size: 28rpx"
            />
          </view>
          <view class="name">
            <view
              >销售数量<span style="color: red; margin-left: 8rpx"
                >*</span
              ></view
            >
            <input
              type="number"
              v-model="item.F_Remark3"
              placeholder="请输入销售数量"
              placeholder-class="placeinput"
              @blur="bcshsl(item.F_Id)"
              maxlength="10"
              style="text-align: right; height: 90rpx; font-size: 28rpx"
            />
          </view>
        </view>
      </view>

      <!-- 采购信息 -->
      <view class="detail" v-if="GetInfoByIdData.F_PayType == 1">
        <view class="derop">
          <view class="code">
            <view class="title"> 采购信息 </view>
          </view>
          <view class="name">
            <view
              >运费<span style="color: red; margin-left: 8rpx">*</span></view
            >
            <input
              type="digit"
              v-model="purchaseForm.F_LogisticsPrice"
              placeholder="请输入运费"
              placeholder-class="placeinput"
              style="text-align: right; height: 90rpx; font-size: 28rpx"
              maxlength="10"
              @blur="F_LogisticsPrice"
            />
          </view>
          <view class="payment">
            <view class="payments">
              <view
                >物流费是否单独开票<span style="color: red; margin-left: 8rpx"
                  >*</span
                ></view
              >
              <view class="uni-list" style="display: inline-block; width: 50%">
                <radio-group @change="PayTypeChange" style="float: right">
                  <label
                    class="uni-list-cell uni-list-cell-pd"
                    v-for="(item, index) in itemlist"
                    :key="item.value"
                    style="display: inline-block"
                  >
                    <view>
                      <radio
                        style="transform: scale(0.6); margin-left: 20rpx"
                        :value="item.value"
                        :checked="index == '1'"
                      />
                      <text>{{ item.name }}</text>
                    </view>
                  </label>
                </radio-group>
              </view>
            </view>
          </view>
          <view class="name" v-show="heself">
            <view
              >物流费开票信息<span style="color: red; margin-left: 8rpx"
                >*</span
              ></view
            >
          </view>
          <view class="text" v-show="heself">
            <textarea
              v-model="purchaseForm.payRemarks"
              placeholder="请输入物流开票信息"
              placeholder-class="placeinput"
              maxlength="300"
            />
          </view>
          <view class="name">
            <view
              >采购金额<span style="color: red; margin-left: 8rpx"
                >*</span
              ></view
            >
            <text>{{ F_PurchaseMoney }}</text>
          </view>
          <view class="name">
            <view
              >其它金额<span style="color: red; margin-left: 8rpx"
                >*</span
              ></view
            >
            <input
              type="number"
              v-model="purchaseForm.F_OtherMoney"
              placeholder="请输入其它金额"
              @blur="othermoney"
              placeholder-class="placeinput"
              maxlength="10"
              style="text-align: right; height: 90rpx; font-size: 28rpx"
            />
          </view>
          <view class="name">
            <view
              >合计金额<span style="color: red; margin-left: 8rpx"
                >*</span
              ></view
            >
            <text v-model="F_TotalMoney">{{ F_TotalMoney }}</text>
          </view>
          <view class="name">
            <view
              >折扣金额<span style="color: red; margin-left: 8rpx"
                >*</span
              ></view
            >
            <input
              @blur="dismoney"
              type="number"
              v-model="purchaseForm.F_DiscountMoney"
              placeholder="请输入折扣金额"
              maxlength="10"
              placeholder-class="placeinput"
              style="text-align: right; height: 90rpx; font-size: 28rpx"
            />
          </view>
          <view class="name">
            <view
              >实际金额<span style="color: red; margin-left: 8rpx"
                >*</span
              ></view
            >
            <text v-model="F_ActualMoney">{{ F_ActualMoney }}</text>
          </view>
          <view class="hed">
            <view
              >采购凭证<span style="color: red; margin-left: 8rpx"
                >*</span
              ></view
            >
          </view>
          <view class="upimg">
            <uploadImgs @uploadImg="getUploadImg"></uploadImgs>
          </view>
          <view class="hed">
            <view>备注</view>
          </view>
          <view class="text">
            <textarea
              v-model="purchaseForm.F_Description"
              placeholder="请输入备注"
              placeholder-class="placeinput"
              maxlength="100"
            />
          </view>
          <view class="payment">
            <view class="payments">
              <view
                >是否支付<span style="color: red; margin-left: 8rpx"
                  >*</span
                ></view
              >
              <view class="uni-list" style="display: inline-block">
                <radio-group @change="radioChange">
                  <label
                    class="uni-list-cell uni-list-cell-pd"
                    v-for="(item, index) in items"
                    :key="item.value"
                    @click="radioClick(item.value)"
                    style="display: inline-block; width: 150rpx"
                  >
                    <view>
                      <radio
                        :disabled="radisabled"
                        style="transform: scale(0.7); margin-left: 60rpx"
                        :value="item.value"
                        :checked="index == '1'"
                      />
                      <text>{{ item.name }}</text>
                    </view>

                    <!-- <view>{{item.name}}</view> -->
                  </label>
                </radio-group>
              </view>
            </view>
          </view>
          <view class="payment" v-if="pay == '1'">
            <view class="payments">
              <view
                >支付方式<span style="color: red; margin-left: 8rpx"
                  >*</span
                ></view
              >
              <view class="uni-list" style="display: inline-block">
                <radio-group @change="radioChanges">
                  <label
                    class="uni-list-cell uni-list-cell-pd"
                    v-for="(item, index) in paitems"
                    :key="item.value"
                    style="display: inline-block; width: 230rpx"
                  >
                    <view>
                      <radio
                        style="transform: scale(0.7); margin-left: 60rpx"
                        :value="item.value"
                        :checked="index === current"
                      />
                      <text>{{ item.name }}</text>
                    </view>

                    <!-- <view>{{item.name}}</view> -->
                  </label>
                </radio-group>
              </view>
            </view>
          </view>
          <view class="name" v-if="pay == '1'">
            <view
              >支付金额<span style="color: red; margin-left: 8rpx"
                >*</span
              ></view
            >
            <input
              type="number"
              v-model="purchaseForm.payMoney"
              placeholder="请输入支付金额"
              @blur="paymoney"
              placeholder-class="placeinput"
              maxlength="10"
              style="text-align: right; height: 90rpx; font-size: 28rpx"
            />
          </view>
          <view class="name" v-if="pay == '1'">
            <view>支付备注</view>
          </view>
          <view class="text" v-if="pay == '1'">
            <textarea
              v-model="purchaseForm.payRemark"
              placeholder="请输入备注"
              placeholder-class="placeinput"
              maxlength="100"
            />
          </view>
          <view class="name" v-if="pay == '1'">
            <view
              >支付凭证<span style="color: red; margin-left: 8rpx"
                >*</span
              ></view
            >
          </view>
          <view class="upimg" v-if="pay == '1'">
            <uploadImgs @uploadImg="getUploadImgs"></uploadImgs>
          </view>
        </view>
      </view>
    </view>
    <view class="content" v-show="click == 1">
      <view class="detail">
        <view class="derop">
          <view class="code">
            <view class="title"> 采购单明细 </view>
          </view>
          <view
            class="right"
            v-for="(item, index) in GetInfoByIdList"
            :key="index"
          >
            <view class="tope">
              <text class="rightlo"
                >物资编号：<text>{{ item.F_MaterialCode }}</text></text
              >
              <text class="rightlo"
                >物资名称：<text>{{ item.F_MaterialName }}</text></text
              >
              <text class="rightlo"
                >采购金额：<text>{{ item.F_TotalPrice }}</text></text
              >
              <text class="rightlo2"
                >备&emsp;&emsp;注：<text>{{ item.F_Description }}</text></text
              >
            </view>
            <view class="bomm">
              <view class="mid">
                <text>规格</text>
                <text class="gg">{{ item.F_Model || "" }}</text>
              </view>
              <view class="mid">
                <text>单价</text>
                <text class="gg">{{ item.F_Price || "" }}</text>
              </view>
              <view class="mid">
                <text>税率</text>
                <text class="gg">{{ item.F_TaxRate || 0 }}%</text>
              </view>
            </view>
            <!-- <view class="bom"></view> -->
          </view>
        </view>
      </view>
    </view>
    <view class="bom">
      <button type="primary" plain="true" class="plabtn" @click="cancell()">
        取消
      </button>
      <button
        type="primary"
        class="prbtn"
        @click="$stopClick(submit)"
        style="margin-left: 30rpx"
      >
        保存
      </button>
    </view>
  </view>
</template>

<script>
import uploadImgs from "../../components/uploadImgs.vue";
export default {
  data() {
    return {
      click: 0,
      noClick: true,
      GetInfoByIdData: {},
      GetInfoByIdList: [],
      heself: false, //物流费开票信息
      money: "", //本次收货数量
      quopayMoney: "", //获取的付款限额
      raindex: 1, //是否支付
      raindexlis: "2",
      // bcshslnum:"",
      purchaseForm: {
        bcshslnum: "",
        payMoney: "",
      },

      current: 0,
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
      itemlist: [
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
      payimg: [], //支付凭证
      purimg: [], //采购凭证
      radisabled: false, //单选禁用
      price: "", //单价
      saleNum: 0,
    };
  },
  components: {
    uploadImgs,
  },
  onLoad(option) {
    // console.log(this.id, '采购单id')
    this.GetInfoByIdDep();
    this.quotaSet();
  },
  created() {},
  computed: {
    //采购金额
    F_PurchaseMoney() {
      let cont = this.purchaseForm.bcshslnum * this.price; //本次收货数量 * 单价
      return cont.toFixed(2);
    },
    //合计金额
    F_TotalMoney() {
       let op = 0;
      this.GetInfoByIdList.forEach((x) => {
        op += Number(x.F_StrRemark) * Number(x.F_Price);
      });
      console.log(op, "ssssss");
      let logisticsPrice = this.purchaseForm.F_LogisticsPrice | 0;
      let otherMoney = this.purchaseForm.F_OtherMoney | 0;
      let cont = 0;
      cont =
        Number(logisticsPrice) +
        Number(op) +
        Number(otherMoney) ;
      return cont.toFixed(2);

      // let op = this.purchaseForm.bcshslnum * this.price; //本次收货数量 * 单价
      // if (isNaN(this.purchaseForm.F_OtherMoney)) {
      //   let cont = Number(this.purchaseForm.F_LogisticsPrice) + Number(op);
      //   return cont.toFixed(2);
      //   console.log(this.purchaseForm.F_OtherMoney, "其他金额");
      // } else {
      //   let cont =
      //     Number(this.purchaseForm.F_LogisticsPrice) +
      //     Number(op) +
      //     Number(this.purchaseForm.F_OtherMoney);
      //   return cont.toFixed(2);
      // }
    },
    // 实际金额
    F_ActualMoney() {
      let op = 0;
      this.GetInfoByIdList.forEach((x) => {
        op += Number(x.F_StrRemark) * Number(x.F_Price);
      });
      console.log(op, "ssssss");
      let logisticsPrice = this.purchaseForm.F_LogisticsPrice | 0;
      let otherMoney = this.purchaseForm.F_OtherMoney | 0;
      let disscountMoney = this.purchaseForm.F_DiscountMoney | 0;
      let cont = 0;
      cont =
        Number(logisticsPrice) +
        Number(op) +
        Number(otherMoney) -
        Number(disscountMoney);
      return cont.toFixed(2);

      // let op = this.purchaseForm.bcshslnum * this.price; //本次收货数量 * 单价
      // let cont = "";
      // //其他金额为空  折扣金额不为空
      // if (
      //   isNaN(this.purchaseForm.F_OtherMoney) &&
      //   this.purchaseForm.F_DiscountMoney
      // ) {
      //   cont =
      //     Number(this.purchaseForm.F_LogisticsPrice) +
      //     Number(op) +
      //     Number(0) -
      //     Number(this.purchaseForm.F_DiscountMoney);
      //   return cont.toFixed(2);
      // }
      // //其他金额不为空  折扣金额为空时
      // else if (
      //   this.purchaseForm.F_OtherMoney &&
      //   isNaN(this.purchaseForm.F_DiscountMoney)
      // ) {
      //   cont =
      //     Number(this.purchaseForm.F_LogisticsPrice) +
      //     Number(op) +
      //     Number(this.purchaseForm.F_OtherMoney);
      //   return cont.toFixed(2);
      // }
      // //其他金额  折扣金额都不为空时
      // else if (
      //   this.purchaseForm.F_OtherMoney &&
      //   this.purchaseForm.F_DiscountMoney
      // ) {
      //   cont =
      //     Number(this.purchaseForm.F_LogisticsPrice) +
      //     Number(op) +
      //     Number(this.purchaseForm.F_OtherMoney) -
      //     Number(this.purchaseForm.F_DiscountMoney);
      //   return cont.toFixed(2);
      // }
      // //其他金额  折扣金额都为空时
      // else {
      //   cont = Number(this.purchaseForm.F_LogisticsPrice) + Number(op);
      //   return cont.toFixed(2);
      // }
    },
  },
  //顶部导航按钮-----修改
  onNavigationBarButtonTap(e) {
    uni.reLaunch({
      url: "PurchaseOrder",
    });
  },
  //物理返回键
  onBackPress(options) {
    uni.reLaunch({
      url: "PurchaseOrder",
    });
    return true;
  },
  methods: {
    spanClick(type) {
      this.click = type;
    },
    // 是否先收后付
    PayTypeChange(evt) {
      console.log(evt.detail.value, "是否先收后付");
      this.raindexlis = evt.detail.value;
      if (this.raindexlis == 1) {
        this.heself = true;
        //	this.radisabled = true  物流费是否单独开票不影响是否支付
      } else {
        this.heself = false;
        //	this.radisabled = false 物流费是否单独开票不影响是否支付
      }
      console.log(this.raindexlis, "是否先收后付this.raindexlis");
    },
    // 改变金额保留两位小数
    F_LogisticsPrice: function (even) {
      // console.log(e.detail.value, '填金额')
      // this.purchaseForm.F_LogisticsPrice = Number(e.detail.value).toFixed(2);
      var money = this.purchaseForm.F_LogisticsPrice;
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
      this.$set(this.purchaseForm, "F_LogisticsPrice", Number(money));
      console.log(money, "输入");
    },
    //其它金额
    othermoney: function (even) {
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
      console.log(money, "输入");
    },
    // //本次收货数量
    // bcshsl: function(even) {
    // 	var money = this.purchaseForm.bcshslnum
    // 	money = String(money).replace(/[^\d.]/g, '') //过滤到非数字  //清除“数字”和“.”以外的字符
    // 	money = String(money).replace(/^\./g, "") //必须保证第一个为数字而不是.
    // 	money = String(money).replace(/\.{2,}/g, ".") //只保留第一个. 清除多余的
    // 	money = String(money).replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    // 	money = String(money).replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3"); //只能输入两个小数
    // 	// money = parseInt(money)
    // 	if (isNaN(money)) {
    // 		money = 0
    // 	}
    // 	this.$set(this.purchaseForm, 'bcshslnum', Number(money))
    // 	console.log(money, '输入')
    // },
    //本次收货数量
    bcshsl: function (id) {
      let money = 0;

      let details = this.GetInfoByIdList.filter((x) => x.F_Id == id);
      if (details.length > 0) {
        let sysl = details[0].F_PurchaseNum - details[0].F_ArrivalNum;
        let srsl = details[0].F_StrRemark;
        money = srsl;
        if (srsl > sysl) money = sysl;

        money = String(money).replace(/[^\d.]/g, ""); //过滤到非数字  //清除“数字”和“.”以外的字符
        money = String(money).replace(/^\./g, ""); //必须保证第一个为数字而不是.
        money = String(money).replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
        money = String(money)
          .replace(".", "$#$")
          .replace(/\./g, "")
          .replace("$#$", ".");
        money = String(money).replace(/^(\-)*(\d+)\.(\d\d\d).*$/, "$1$2.$3"); //只能输入两个小数
        // money = parseInt(money)
        if (isNaN(money)) {
          money = 0;
        }

        details[0].F_StrRemark = money;
        this.GetInfoByIdList.filter((x) => x.F_Id == id)[0].F_StrRemark = money;
      }
      console.log(this.GetInfoByIdList, "小陈啊");
      //   //   var money = this.purchaseForm.bcshslnum;
      //   money = String(money).replace(/[^\d.]/g, ""); //过滤到非数字  //清除“数字”和“.”以外的字符
      //   money = String(money).replace(/^\./g, ""); //必须保证第一个为数字而不是.
      //   money = String(money).replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
      //   money = String(money)
      //     .replace(".", "$#$")
      //     .replace(/\./g, "")
      //     .replace("$#$", ".");
      //   money = String(money).replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3"); //只能输入两个小数
      //   // money = parseInt(money)
      //   if (isNaN(money)) {
      //     money = 0;
      //   }
      //   this.$set(this.purchaseForm, "bcshslnum", Number(money));
      //   console.log(money, "输入");
    },
    //支付金额
    paymoney: function (even) {
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
      if (isNaN(money)) {
        money = 0;
      }
      this.$set(this.purchaseForm, "payMoney", Number(money));
      console.log(money, "输入payMoney");
    },
    //折扣金额
    dismoney: function (even) {
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
      console.log(money, "输入");
    },
    F_OtherMoney(e) {
      this.purchaseForm.F_OtherMoney = Number(e.detail.value).toFixed(2);
    },
    F_DiscountMoney(e) {
      //折扣金额
      this.purchaseForm.F_DiscountMoney = Number(e.detail.value).toFixed(2);
    },
    // 是否支付单选框
    radioChange: function (evt) {
      console.log(evt.detail.value, "是否支付单选框");
      this.pay = evt.detail.value;
    },

    // 支付方式
    radioChanges: function (evt) {
      console.log(evt.detail.value, "支付方式");
      this.paymethod = evt.detail.value;
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
            // item.money = item.F_PurchaseNum - item.F_ArrivalNum
            item.F_StrRemark = item.F_PurchaseNum - item.F_ArrivalNum;
            item.F_Remark3 = item.F_StrRemark;
            this.purchaseForm.bcshslnum =
              item.F_PurchaseNum - item.F_ArrivalNum;
            this.price = item.F_Price;
            arr.push(item.F_LogisticsPrice);
            brr.push(item.F_TotalPrice);
            if (item.F_PayStatus == 1) {
              this.radisabled = true;
            }
          });
          let F_LogisticsPrice = arr.reduce((x, y) => x + y);
          this.purchaseForm.F_LogisticsPrice = this.$set(
            this.purchaseForm,
            "F_LogisticsPrice",
            Number(F_LogisticsPrice)
          ); // 运费和
          this.F_TotalPrice = brr.reduce((x, y) => x + y); // 采购金额和

          console.log(this.GetInfoByIdData, "采购单");
          console.log(this.GetInfoByIdList, "采购单明细");
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
    // 验收
    Add(Form) {
      let urls = "";
      if (this.GetInfoByIdData.F_PayType == 1) {
        urls = "/WebApiInterface/OrderPurchase/ReceivingGoods_s";
      } else {
        urls = "/WebApiInterface/OrderPurchase/ReceivingGoods";
      }

      uni.request({
        url: this.url + urls,
        method: "POST",
        data: Form,
        success: (res) => {
          console.log(res, "验收");
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
    submit: function (e) {
      let arr = [];
      this.GetInfoByIdList.forEach((item) => {
        arr.push({
          detailsId: item.F_Id, //采购单明细ID
          // money: this.purchaseForm.bcshslnum, //本次收货数量
          money: item.F_StrRemark, //本次收货数量
          saleNum: item.F_Remark3, //本次销售数量
        });
      });
      // console.log(arr, 'arrrrrrrrrrrrrr')
      let purimg = this.purimg.join();
      let payimg = this.payimg.join();
      var Form = {
        userId: uni.getStorageSync("userid"),
        id: this.$store.PurchaseId, //采购单id
        type: this.$store.type || "", //完成验收
        details: arr,
        F_IsInvo: this.raindexlis, //是否单独开票   1是  2否
        F_BillInfo: this.purchaseForm.payRemarks, //物流费开票信息(如果物流费是否单独开票勾选，则必填)
        F_LogisticsPrice: this.purchaseForm.F_LogisticsPrice, //运费
        F_OtherMoney: this.purchaseForm.F_OtherMoney, //其它金额
        F_TotalMoney: this.F_TotalMoney, //合计金额
        F_DiscountMoney: this.purchaseForm.F_DiscountMoney, //折扣金额
        F_ActualMoney: this.F_ActualMoney, //实际金额
        F_Files: purimg, //采购凭证
        F_Description: this.purchaseForm.F_Description, //备注
        F_PurchaseMoney: this.F_TotalPrice, //采购金额
        F_IsPay: this.pay, //是否支付(1支付 2不支付)
      };
      var Forms = {
        userId: uni.getStorageSync("userid"),
        id: this.$store.PurchaseId, //采购单id
        type: this.$store.type || "", //完成验收
        details: arr,
      };
      console.log(Form, "forms");
      if (this.GetInfoByIdData.F_PayType == 1) {
        if (Form.F_IsPay == "1" || Form.F_IsInvo == "1") {
          if (
            this.purchaseForm.F_LogisticsPrice == null ||
            this.purchaseForm.F_OtherMoney == null ||
            !Form.F_TotalMoney | (this.purchaseForm.F_DiscountMoney == null) ||
            !Form.F_ActualMoney |
              !Form.F_Files |
              !Form.F_PurchaseMoney |
              !Form.F_BillInfo
          ) {
            uni.showToast({
              icon: "none",
              title: "带红色星号的是必填项,请填写完整",
            });
          } else {
            console.log(
              this.purchaseForm.bcshslnum,
              "this.purchaseForm.bcshslnum"
            );
            if (this.purchaseForm.bcshslnum == null) {
              uni.showToast({
                icon: "none",
                title: "请填写完整本次收货数量",
              });
            } else {
              this.Add(Form);
            }
          }
        } else {
          if (
            this.purchaseForm.F_LogisticsPrice == null ||
            this.purchaseForm.F_OtherMoney == null ||
            !Form.F_TotalMoney | (this.purchaseForm.F_DiscountMoney == null) ||
            !Form.F_ActualMoney | !Form.F_Files | !Form.F_PurchaseMoney
          ) {
            uni.showToast({
              icon: "none",
              title: "带红色星号的是必填项,请填写完整",
            });
          } else {
            console.log(
              this.purchaseForm.bcshslnum,
              "this.purchaseForm.bcshslnum"
            );
            if (this.purchaseForm.bcshslnum == null) {
              uni.showToast({
                icon: "none",
                title: "请填写完整本次收货数量",
              });
            } else {
              this.Add(Form);
            }
          }
        }
      } else {
        if (this.purchaseForm.bcshslnum == null) {
          uni.showToast({
            icon: "none",
            title: "请填写完整本次收货数量",
          });
        } else {
          this.Add(Forms);
        }
      }
    },
    //是否支付点击事件
    radioClick(value) {
      if (value == 1 && this.radisabled) {
        console.log(value, "11111");
        uni.showToast({
          icon: "none",
          title: "当前单据不允许支付",
        });
      }
    },
    // 取消
    cancell() {
      uni.navigateBack();
    },
  },
};
</script>

<style lang="scss">
* {
  // box-sizing: border-box;
  padding: 0;
  margin: 0;
  list-style: none;
}

.header {
  width: 100%;
  height: 90rpx;
  padding-top: 20rpx;
  background: #ffffff;
  text-align: center;
  position: fixed;
  top: var(--window-top);
  z-index: 99;

  .nav {
    height: 110rpx;
    display: flex;

    .navbar {
      flex: 1;
      font-size: 30rpx;
    }
  }
}

.inv-h-se {
  width: 47rpx;
  font-size: 32rpx;
  font-family: PingFang SC;
  font-weight: bold;
  line-height: 45rpx;
  color: #2798fd;
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
  margin-top: 16rpx;
}

.content {
  background: #f3f3f3;
  padding: 130rpx 0 170rpx 0;
  width: 100%;

  .detail {
    width: 92%;
    overflow: hidden;
    color: #666666;
    margin: auto;
    margin-bottom: 30rpx;
    border-radius: 9rpx;
    background-color: #ffffff;

    .derop {
      padding: 30rpx;
    }

    .code {
      // height: 150rpx;
      // padding: 40rpx 30rpx 0 30rpx;
      // padding: 30rpx 0 0 30rpx;
      padding-bottom: 20rpx;

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
        justify-content: space-between;
      }
    }

    .text {
      width: 100%;

      textarea {
        width: 100%;
        font-size: 28rpx;
        height: 230rpx;
        margin-top: 20rpx;
        border-bottom: 1rpx solid #fafafa;
      }
    }

    .placeinput {
      font-size: 28rpx;
    }

    .name {
      display: flex;
      justify-content: space-between;
      height: 90rpx;
      background: #ffffff;
      font-size: 28rpx;
      font-family: PingFang SC;
      line-height: 90rpx;
      // padding: 0 30rpx;
      border-bottom: 1rpx solid #fafafa;
    }

    .hed {
      display: flex;
      justify-content: space-between;
      height: 90rpx;
      background: #ffffff;
      font-size: 28rpx;
      font-family: PingFang SC;
      line-height: 90rpx;
    }

    .upimg {
      // margin-left: 30rpx;
      // padding-bottom: 30rpx;
    }

    .payment {
      .payments {
        height: 90rpx;
        line-height: 90rpx;
        border-bottom: 1rpx solid #fafafa;
        display: flex;
        justify-content: space-between;
        background-color: #fff;
        font-size: 28rpx;
      }
    }
  }

  .record {
    background: #ffffff;
    margin-top: 30rpx;
    overflow: hidden;

    .title {
      margin: 39rpx 0 0 30rpx;
      line-height: 48rpx;
      font-family: PingFang SC;
      font-weight: bold;
      color: #262626;
    }

    .list {
      margin-bottom: 30rpx;

      .subhead {
        display: flex;
        justify-content: space-between;
        padding: 31rpx 47rpx 0 38rpx;

        .date {
          width: 172rpx;
          height: 60rpx;
          font-size: 24rpx;
          line-height: 60rpx;
          text-align: center;
          font-family: PingFang SC;
          color: #ffffff;
          background-image: url(http://purchase.zhroot.com/attached/appImgs/saleplan/%E8%B7%AF%E5%BE%84%208883.png);
          background-size: 100% 100%;
        }

        .name {
          font-size: 26rpx;
          font-family: PingFang SC;
          line-height: 37rpx;
          color: #808080;

          input {
            text-align: right;
          }
        }
      }

      .material {
        margin: 23rpx 30rpx 0 75rpx;
        font-family: PingFang SC;
        font-weight: bold;
        line-height: 45rpx;
        color: #262626;
        overflow: hidden;
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
      }

      .contact {
        display: flex;
        justify-content: space-between;
        margin: 19rpx 0 0 76rpx;
        font-size: 26rpx;
        font-family: PingFang SC;
        line-height: 37rpx;
        color: #808080;

        .phone {
          // margin-right: 99rpx;
        }
      }

      .number {
        margin: 19rpx 0 0 78rpx;
        width: 565rpx;
        height: 104rpx;
        background: rgba(39, 152, 253, 0.05);
        display: flex;
        justify-content: space-between;
        // padding: 12rpx 34rpx 0 30rpx;

        .purchasemoney {
          text-align: center;

          .son {
            margin: 14rpx 0 8rpx 0;
            font-size: 30rpx;
            font-family: PingFang SC;
            line-height: 28rpx;
            color: #2798fd;
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
}

.bom {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 160rpx;
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: center;
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
    border: 1rpx solid #2798fd;
    box-shadow: 0rpx 5rpx 10rpx rgba(39, 152, 253, 0.4);
    color: #2798fd;
  }

  .prbtn {
    font-size: 32rpx;
    font-family: PingFang SC;
    border: 1rpx solid #2798fd;
    box-shadow: 0rpx 5rpx 10rpx rgba(39, 152, 253, 0.4);
  }
}
.right {
  .tope {
    display: flex;
    flex-direction: column;

    .rightlo {
      font-size: 28rpx;
      color: #888888;
    }
    .rightlo2 {
      font-size: 28rpx;
      color: #888888;
      word-wrap: break-word;
      word-break: normal;
    }

    text {
      margin-bottom: 20rpx;
      font-size: 28rpx;
      color: #000000;
    }
  }

  .bomm {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    margin: auto;
    color: #999999;

    .mid {
      width: calc(33.1% - 20rpx);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      margin-top: 9rpx;
      font-size: 26rpx;
      width: 180rpx;

      .gg {
        width: 100%;
        text-align: center;
        color: #333333;
        word-wrap: break-word;
        word-break: normal;
      }

      .gg1 {
        width: 60%;
        text-align: left;
        color: #333333;
      }

      text {
        margin-top: 6rpx;
        font-size: 28rpx;
      }
    }

    .mid:nth-child(2) {
      border-right: 1rpx solid #f2f2f2;
      border-left: 1rpx solid #f2f2f2;
    }

    .mide {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      margin-top: 9rpx;
      font-size: 26rpx;
      width: 180rpx;

      .gg {
        color: #333333;
      }

      text {
        margin-top: 6rpx;
        font-size: 28rpx;
      }
    }

    .xian {
      width: 1rpx;
      height: 80rpx;
      margin-top: 20rpx;
      border-right: 1rpx solid #f2f2f2;
    }
  }
}
</style>
