<template>
  <view class="page">
    <view class="header">
      <view class="heamid">
        <text class="heatop">
          提交报价
          <view class="borbom"></view>
        </text>

        <view class="headop">
          <view class="heaadd">
            <text>物资名称</text>
            {{ materialInfo.F_MaterialName }}
          </view>
          <view class="borbom"></view>
        </view>
        <view class="headop">
          <view class="heaadd">
            <text>需求数量</text>
            {{ materialInfo.F_DemandNum }}{{ materialInfo.F_Unit }}
          </view>
          <view class="borbom"></view>
        </view>

        <view class="headop">
          <view class="heaadd">
            <text>供应商<text class="xh">*</text></text>
            <input v-model="supptype" placeholder="请输入" @click="onsupin" />

            <!-- <picker @change="suppxiala" :value="index" :range="suppList" :range-key="'name'">
							<view class="pickright">
								<view style="padding-top: -20rpx;" class="placeinput">{{ supptype }}</view>
								<view class="iopmg"></view>
							</view>
						</picker> -->
          </view>
          <view class="borbom"></view>
        </view>
        <view class="headop">
          <view class="heaadd">
            <text>联系人</text>
            <input
              v-model="supplierFrom.F_Contacts"
              placeholder="请输入联系人"
              placeholder-class="placeinput"
              maxlength="15"
            />
          </view>
          <view class="borbom"></view>
        </view>
        <view class="headop">
          <view class="heaadd">
            <text>联系电话</text>
            <input
              type="number"
              v-model="supplierFrom.F_MoiblePhone"
              :placeholder="numphone"
              placeholder-class="placeinput"
              maxlength="11"
            />
          </view>
          <view class="borbom"></view>
        </view>

        <view class="headop">
          <view class="heaadd">
            <!--  @blur="F_TaxRate()" -->
            <!-- 	@blur="supplierFrom.F_TaxRate =Math.floor(Number(supplierFrom.F_TaxRate) * 100) / 100
						" -->
            <text>税率<text class="xh">*</text></text>
            <view class="supsl">
              <input
                type="number"
                v-model="supplierFrom.F_TaxRate"
                :placeholder="numplace"
                placeholder-class="placetax"
                maxlength="3"
                @blur="F_TaxRate"
              />
              <text>%</text>
            </view>
          </view>
          <view class="borbom"></view>
        </view>

        
        <view class="headop">
          <view class="heaadd">
            <!--      @change="
              inquiryAdd.F_Price =
                Math.floor(Number(inquiryAdd.F_Price) * 100) / 100
            " -->
            <!-- @blur="F_Price()" -->
            <text>单价 (含税)<text class="xh">*</text></text>
            <input
              type="number"
              v-model="supplierFrom.F_Price"
              :placeholder="numplacehs"
              placeholder-class="placeinput"
              maxlength="10"
              @blur="djhs"
            />
          </view>
          <view class="borbom"></view>
        </view>
        <view class="headop">
          <view class="heaadd">
            <!-- @blur="
              supplierFrom.F_LogisticsPrice =
                Math.floor(Number(supplierFrom.F_LogisticsPrice) * 100) / 100
            " -->
            <!-- @blur="F_LogisticsPrice()" -->
            <text>运费<text class="xh">*</text></text>
            <input
              type="number"
              v-model="supplierFrom.F_LogisticsPrice"
              :placeholder="numplaceyf"
              placeholder-class="placeinput"
              maxlength="10"
              @blur="yf"
            />
          </view>
          <view class="borbom"></view>
        </view>

        <view class="headtarea">
          <view class="heaadd">
            <text>备注</text>
            <!-- <scroll-view class="scroll-view-box" scroll-y="true" style="height: 260rpx;"> -->
            <textarea
              v-model="supplierFrom.F_Description"
              placeholder="请输入备注"
              placeholder-class="placeinput"
              maxlength="100"
            />
            <!-- </scroll-view> -->
            <!-- <input v-model="supplierFrom.F_Description" placeholder="请输入备注"
							placeholder-class="placeinput" /> -->
          </view>
          <view class="borbom"></view>
        </view>
        <view class="headtarea">
          <view class="heaadd2">
            <text>附件</text>
            <uploadImg @uploadImg="getUploadImgs"></uploadImg>
          </view>
          <view class="borbom"></view>
        </view>
      </view>
    </view>
    <view class="matsupbom"></view>
    <view class="bom">
      <button
        type="primary"
        plain="true"
        :disabled="isdisabled"
        class="plabtn"
        @click="cancell()"
      >
        取消
      </button>
      <button
        type="primary"
        class="prbtn"
        :disabled="isdisabled"
        @click="materialAdd()"
      >
        保存
      </button>
    </view>

    <u-mask :show="show">
      <view class="warp">
        <u-loading mode="circle" :show="show" size="50"></u-loading>
      </view>
    </u-mask>
  </view>
</template>

<script>
import uploadImg from "../../components/uploadImg.vue";
export default {
  data() {
    return {
      isdisabled: false,
      show: false,
      showsup: false,
      indicatorStyle: `height: 50px;`,
      fid: "", //接收上个页面的参数
      suppList: [], //供应商
      supplierData: [],
      payimg: [], //附件
      index: 0,
      modindex: [0, 0, 0], //用途下拉下标
      supplierFrom: {
        F_Price: "",
        F_TaxRate: "1",
        F_LogisticsPrice: "0",
      },
      materF_Date: "",
      numplace: "1",
      numplaceyf: "0",
      numphone: "请输入联系电话",
      numplacehs: "请输入单价",
      numplacejg: "请输入价格",
      supptype: "请选择", //供应商名称
      suppId: "", //供应商id
      secoindex: 0,
      selectmaterial: {},
      value: [1],
      chulinum: "",
      suppin: {},
      materialInfo: {},
    };
  },
  components: {
    uploadImg,
  },
  onLoad(option) {
    if (option.data != undefined) {
      this.selectmaterial = JSON.parse(option.data);
      console.log(this.selectmaterial, "option");
    }
    if (option.suppin != undefined) {
      this.suppin = JSON.parse(option.suppin);
      this.supptype = this.suppin.F_SupplierName;
      this.supplierFrom.F_Contacts = this.suppin.F_Contacts;
      this.supplierFrom.F_MoiblePhone = this.suppin.F_MoiblePhone;
      this.suppId = this.suppin.F_Id;
    }
    console.log(this.suppin, "供应商");
    console.log(this.selectmaterial, "option");
    this.materdate();
    this.suppDep();
    this.getMaterialInfo();
  },
  //顶部导航按钮-----修改
  onNavigationBarButtonTap(e) {
    uni.reLaunch({
      url: "../SalePlan/Saleplan",
    });
  },
  //物理返回键
  onBackPress(options) {
    uni.reLaunch({
      url: "../SalePlan/Saleplan",
    });
    return true;
  },
  methods: {
    getMaterialInfo() {
      uni.request({
        url: this.url + "/WebApiInterface/SalePlan/GetSalePlanInfo",
        method: "post",
        data: {
          id: this.$store.supmatid, //需求计划ID
        },
        success: (res) => {
          this.materialInfo = res.data.Data;
          console.log(this.materialInfo, "呵呵哒");
        },
      });
    },
    onsupin() {
      uni.reLaunch({
        url: "supper",
      });
    },
    // 单价(含税)
    djhs: function (event) {
      var value = event.target.value;
      console.log(event.target.value, "输入的值");
      value = value.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
      value = value.replace(/\.{2,}/g, "."); //保证只有出现一个.而没有多个.
      value = value.replace(/^\./g, ""); //必须保证第一个为数字而不是.
      value = value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
      value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
      value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3"); //只能输入两个小数
      if (value.indexOf(".") < 0 && value != "") {
        //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
        value = parseFloat(value);
      }
      this.$set(this.supplierFrom, "F_Price", Number(value));
      if (value == 0) {
        this.supplierFrom.F_Price = 1;
      }
    },
    yf: function (event) {
      var value = event.target.value;
      console.log(event.target.value, "输入的值");
      value = value.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
      value = value.replace(/\.{2,}/g, "."); //保证只有出现一个.而没有多个.
      value = value.replace(/^\./g, ""); //必须保证第一个为数字而不是.
      value = value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
      value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
      value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3"); //只能输入两个小数
      if (value.indexOf(".") < 0 && value != "") {
        //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
        value = parseFloat(value);
      }
      this.$set(this.supplierFrom, "F_LogisticsPrice", Number(value));
      if (value == 0) {
        this.supplierFrom.F_Price = 1;
      }
    },
    // 运费
    F_LogisticsPrice() {
      this.clearNoNum(this.supplierFrom.F_LogisticsPrice.toString());
      this.supplierFrom.F_LogisticsPrice = this.chulinum;
      // this.$set(this.supplierFrom, 'F_LogisticsPrice', this.chulinum)
      // console.log(this.supplierFrom.F_LogisticsPrice, '运费')
    },
    // 税率
    F_TaxRate: function (event) {
      var value = parseInt(event.target.value);
      this.supplierFrom.F_TaxRate = value;
      console.log(event.target.value, "输入的值");
      if (value > 100) {
        this.supplierFrom.F_TaxRate = 100;
      }
      if (value < 0) {
        this.supplierFrom.F_TaxRate = 0;
      }
      if (isNaN(value)) {
        this.supplierFrom.F_TaxRate = 0;
      }
      console.log(this.supplierFrom, "税率");
    },

    //供应商下拉列表
    suppDep() {
      console.log(this.supinty, "输入的");
      uni.request({
        // url: this.url + '/WebApiInterface/Supplier/GetSupplierList_I',
        url: this.url + "/WebApiInterface/Supplier/GetSupplierList",
        method: "post",
        data: {
          userId: uni.getStorageSync("userid"), //string[必填]人员ID
        },
        success: (res) => {
          this.supplierData = res.data.Data;
          this.supplierData.forEach((item) => {
            this.suppList.push({
              name: item.F_SupplierName,
            });
          });
          // this.supplierFrom.F_LogisticsPrice = 0
          // this.supplierFrom.F_TaxRate = '1'
          console.log(this.suppList, "物资下拉");
        },
      });
    },
    //供应商下拉选择
    suppxiala: function (e) {
      this.index = e.target.value;
      console.log(this.index, "index");
      this.supptype = this.suppList[this.index];
      for (let a = 0; a < this.supplierData.length; a++) {
        if (a == this.index) {
          this.supptype = this.supplierData[a].F_SupplierName;
          this.suppId = this.supplierData[a].F_Id;
          this.supplierFrom.F_Contacts = this.supplierData[a].F_Contacts;
          this.supplierFrom.F_MoiblePhone = this.supplierData[a].F_MoiblePhone;
        }
      }
      console.log(this.supptype, this.suppId, "ii");
    },
    // 附件
    getUploadImgs(res) {
      // let arr = []
      // res.forEach(item => {
      // 	let url = item.split('8080')
      // 	arr.push(url[1])
      // })
      this.payimg = res;
      console.log(this.payimg, "附件");
    },
    //新增需求计划
    materialAdd() {
      let payimg = this.payimg.join();
      var Form = {
        // F_SalePlanId: this.selectmaterial.F_Id, //string [必填]需求计划ID
        F_SalePlanId: this.$store.supmatid,
        F_SupplierId: this.suppId, //string[可选]供应商ID(如果是手动填写的供应商此字段为空)
        F_SupplierName: this.supptype, //string[必填]供应商名称
        F_Contacts: this.supplierFrom.F_Contacts, //string[必填]联系人
        F_MoiblePhone: this.supplierFrom.F_MoiblePhone, //string[必填]手机号
        F_Price: this.supplierFrom.F_Price, //decimal[必填]价格
        F_LogisticsPrice: this.supplierFrom.F_LogisticsPrice, //decimal[必填]运费(物流价格) （默认为0）
        F_TaxRate: this.supplierFrom.F_TaxRate, //decimal[必填]税率(%) （默认为1）
        F_Files: payimg, //string[可选]附件
        F_Description: this.supplierFrom.F_Description, //string[可选]说明(300字)
        F_CreatorUserId: uni.getStorageSync("userid"), //string[可选]用户ID
      };
      console.log(Form, "form");
      if (
        (this.supptype == "请选择") |
        !Form.F_Contacts |
        !Form.F_MoiblePhone |
        !Form.F_Price |
        !Form.F_LogisticsPrice |
        (Form.F_TaxRate == null)
      ) {
        uni.showToast({
          icon: "none",
          title: "信息不完整",
        });
      } else {
        this.show = true;
        this.isdisabled = true;

        uni.request({
          url: this.url + "/WebApiInterface/Inquiry/AddOrModify",
          method: "post",
          data: Form,
          success: (res) => {
            if (res.data.StatusCode == 200) {
              uni.showToast({
                icon: "none",
                title: res.data.Info,
              });
              this.supplierFrom.F_Contacts = "";
              this.supplierFrom.F_MoiblePhone = "";
              this.supplierFrom.F_Price = "";
              this.supplierFrom.F_Description = "";
              this.suppId = "";
              this.supptype = "请选择";
              uni.reLaunch({
                url: "../SalePlan/Saleplan",
              });
            }
          },
        });
        console.log(this.materialForm);
      }
    },
    cancell() {
      this.supplierFrom = {};
      var data = JSON.stringify(this.proid);
      uni.reLaunch({
        // url:"../index?proid="+data
        url: "../SalePlan/Saleplan?proid=" + data,
      });
    },
    //当前时间
    materdate() {
      var now = new Date();
      var year = now.getFullYear(); //得到年份
      var month = now.getMonth(); //得到月份
      var date = now.getDate(); //得到日期
      month = month + 1;
      month = month.toString().padStart(2, "0");
      date = date.toString().padStart(2, "0");
      this.materF_Date = `${year}-${month}-${date}`;
      console.log(this.materF_Date, "data");
    },
  },
};
</script>

<style lang="scss" scoped>
.warp {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

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
      height: 38rpx;
      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 38rpx;
      margin: 20rpx 0rpx;
      color: #666666;

      .xh {
        color: #ff0000;
        margin-left: 9rpx;
      }

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
        display: flex;
        flex-direction: row;

        .iopmg {
          width: 24rpx;
          height: 46rpx;
          background-image: url(http://purchase.zhroot.com/attached/appImgs/proslices/%E7%AE%AD%E5%A4%B4.png);
          background-size: 100% 100%;
        }

        image {
          width: 24rpx;
          height: 46rpx;
        }
      }
    }

    .borbom {
      margin-top: 30rpx;
      height: 1px;
      background: #fafafa;
      opacity: 1;
    }

    .placeinput {
      text-align: right;
      font-size: 28rpx;
      // color: #B3B3B3;
    }

    .placetax {
      text-align: right;
      font-size: 28rpx;
    }

    .supsl {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
  }

  .headtarea {
    // height: 260rpx;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: 400;
    margin: 20rpx 0rpx;
    color: #666666;

    .heaadd {
      textarea {
        height: 220rpx;
        margin-top: 30rpx;
        font-size: 28rpx;
        width: 100%;
      }
    }

    .heaadd2 {
      height: 230rpx;
    }

    text {
      font-size: 28rpx;
    }

    .placeinput {
      font-size: 28rpx;
      // color: #B3B3B3;
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

  .matsupbom {
    width: 100%;
    height: 200rpx;
  }

  .picker-view {
    width: 100%;
    height: 600rpx;
    // margin-top: 70rpx;
    position: absolute;
    bottom: 0;
    left: 0;
  }

  .item {
    height: 50px;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
}
</style>
