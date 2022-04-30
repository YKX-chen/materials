<template>
  <view class="page">
    <view class="content">
      <view class="xsmx">
        <view class="mx">
          <text class="tou">
            销售明细
            <view class="bom"></view>
          </text>
          <view class="headop">
            <view class="heaadd">
              <text>销售项目</text>
              <!-- <input v-model="materForm.F_Remark1" disabled /> -->
              <text
                v-if="
                  materForm.F_Remark2 != null || materForm.F_Remark1 != null
                "
                >{{ materForm.F_Remark2 }}-{{ materForm.F_Remark1 }}</text
              >
              <text
                v-if="
                  materForm.F_Remark2 == null || materForm.F_Remark1 == null
                "
              ></text>
            </view>
            <view class="borbom"></view>
          </view>
          <view class="headop">
            <view class="heaadd">
              <text>销售日期</text>
              <picker
                mode="date"
                v-model="beginDate"
                :value="beginDate"
                @change="bindDateChange"
              >
                <view class="uni-input"
                  >{{ beginDate }}
                  <icon class="iconfont icon-xiala"></icon>
                </view>
              </picker>
              <!-- <input v-model="materForm.F_SaleDate"  /> -->
            </view>
            <view class="borbom"></view>
          </view>
          <view class="headop">
            <view class="heaadd">
              <text>销售内容</text>
              <input v-model="xsnr" />
            </view>
            <view class="borbom"></view>
          </view>
          <view class="headop">
            <view class="heaadd">
              <text>规格</text>
              <input v-model="materForm.F_Model" />
            </view>
            <view class="borbom"></view>
          </view>
          <view class="headop">
            <view class="heaadd">
              <text>单位</text>
              <input v-model="materForm.F_Unit" />
            </view>
            <view class="borbom"></view>
          </view>
          <view class="headop">
            <view class="heaadd">
              <text>销售数量</text>
              <input
                @blur="salenum"
                maxlength="10"
                v-model="materForm.F_SaleNum"
              />
            </view>
            <view class="borbom"></view>
          </view>
          <view class="headop">
            <view class="heaadd">
              <text>单价</text>
              <input
                @blur="costname"
                maxlength="10"
                v-model="materForm.F_Price"
              />
            </view>
            <view class="borbom"></view>
          </view>
          <view class="headop">
            <view class="heaadd">
              <text>税率（%）</text>
              <input
                @blur="taxrate"
                maxlength="10"
                v-model="materForm.F_TaxRate"
              />
            </view>
            <view class="borbom"></view>
          </view>
          <view class="headop">
            <view class="heaadd">
              <text>税额</text>
              <input v-model="F_TaxAamount" disabled />
            </view>
            <view class="borbom"></view>
          </view>
          <view class="headop">
						<view class="heaadd">
							<text>销售金额（不含税）</text>
							{{F_SaleTotalPrice-F_TaxAamount}}
						</view>
						<view class="borbom"></view>
					</view>
          <view class="headop">
            <view class="heaadd">
              <text>销售金额（含税）</text>
              <input v-model="F_SaleTotalPrice" disabled />
            </view>
            <view class="borbom"></view>
          </view>
          <view class="headop">
            <view class="heaadd">
              <text>其他成本</text>
              <input
                @blur="cost"
                maxlength="10"
                v-model="materForm.F_OtherCost"
              />
            </view>
            <view class="borbom"></view>
          </view>
          <view class="headop">
            <view class="heaadd">
              <text>送货位置</text>
              <input v-model="materForm.F_Location" maxlength="30" />
            </view>
            <view class="borbom"></view>
          </view>
          <view class="headtarea">
            <view class="heaadd">
              <text>备注</text>
              <textarea v-model="materForm.F_Description" maxlength="100" />
            </view>
            <view class="bom"></view>
          </view>
          <view class="headtarear">
            <view class="heaadd">
              <text>销售凭证</text>
            </view>
            <view class="image-list" v-if="materForm.F_Files != null">
              <view v-for="(item, index) in fileImg" :key="index">
                <view class="image">
                  <image :src="item" @tap="onPreviewImage(index)"> </image>
                  <image
                    class="shanchu"
                    @tap="onDelImage"
                    :data-index="index"
                    src="https://gqy-bucket-clk.oss-cn-beijing.aliyuncs.com/app-static/delete.png"
                    mode="aspectFill"
                  ></image>
                </view>
              </view>
              <!-- 选择图片 -->
              <view
                class="image-wrap selectphoto"
                v-show="selectPhoto"
                @tap="onChangeAva"
              >
                <image
                  src="http://purchase.zhroot.com/attached/appImgs/saleplan/%E7%BB%84%205688.png"
                  mode=""
                >
                </image>
              </view>
              <!-- <image :src="imgsrc" @click="onChangeAva">
							</image> -->
            </view>
            <view class="image-list" v-if="materForm.F_Files == null">
              <!-- <image :src="imgsrcno" @click="onChangeAva" >
							</image> -->
              <uploadImgs @uploadImg="getUploadImgs"></uploadImgs>
            </view>
            <view class="borbom"></view>
          </view>
        </view>
      </view>
      <!-- <view class="bomppo" v-if="materForm.F_SaleType == 1">
				<view class="top">
					<text class="op">
						销售物资清单
						<view class="bomm"></view>
					</text>
					<view>
						<view class="right" v-for="(item,index) in materData" :key="index">
							<view class="tope">
								<text class="rightlo">物资编号：<text>({{item.F_MaterialCode}})</text></text>
								<text class="rightlo">物资名称：<text>{{item.F_MaterialName}}</text></text>
								<text class="rightlo">仓&emsp;&emsp;库：<text>{{item.F_Name}}</text></text>
							</view>
							<view class="bom">
								<view class="mid">
									<text>规格</text>
									<text class="gg">{{item.F_Model || "-"}}</text>
								</view>
								<view class="mid">
									<text>单位</text>
									<text class="gg">{{item.F_Unit || "-"}}</text>
								</view>
								<view class="mid">
									<text>库存数量</text>
									<text class="gg">{{item.F_StockNum || "-"}}</text>
								</view>
							</view>
						</view>
						<view class="bomer"></view>
					</view>
				</view>
			</view> -->
      <view class="nullcop"></view>
	  
    </view>
	<view class="seize"></view>
	
    <view class="bombtno">
      <button type="" plain="true" class="plabtn" @click="cancell()">
        取消
      </button>
      <button type="" plain="true" class="plabtn" @click="saleIsSubmit()">
        保存
      </button>
      <button type="primary" class="prbtn"   @click="saleIsSubmit('1')">
        保存并提交
      </button>
	  	
    </view>

    <u-mask :show="show">
		<view class="warp">
		 <u-loading mode="circle" :show="show" size="50" ></u-loading>
		</view>
	</u-mask>

  </view>
</template>

<script>
import uploadImgs from "../../../components/uploadImgs.vue";
const MAX_IMG_NUM = 3;
export default {
  data() {
    return {
     
      show: false,
      click: 0,
      materForm: {},
      materData: [],
      xsnr: "",
      imgsrc: "", //不为空时
      imgsrcno:
        "http://purchase.zhroot.com/attached/appImgs/saleplan/%E7%BB%84%205688.png",
      beginDate: "", //开始时间
      payimg: [],
      fileImg: [],
      selectPhoto: false,
    };
  },
  components: {
    uploadImgs,
  },
  onLoad() {
    this.spaninfo();
  },
  computed: {
    //销售金额
    F_SaleTotalPrice() {
      if (this.materForm.F_Price) {
        console.log(this.materForm.F_TaxRate, "opoppoppp");
        if (
          this.materForm.F_TaxRate == null ||
          this.materForm.F_TaxRate == undefined
        ) {
          let num = "";
          return "";
        }
        if (isNaN(this.materForm.F_TaxRate)) {
          let num = this.materForm.F_Price * this.materForm.F_SaleNum;
          return Number(num).toFixed(2) || "";
        } else {
          let num =
            this.materForm.F_Price *
            this.materForm.F_SaleNum *
            (this.materForm.F_TaxRate / 100 + 1);
          console.log(num, "num");
          return Number(num).toFixed(2) || "";
        }
        // let num = this.materForm.F_Price * this.materForm.F_SaleNum * (this.materForm.F_TaxRate / 100 + 1)
        // return Number(num).toFixed(2) || "";
      }
    },
    //税额
    F_TaxAamount() {
      if (this.materForm.F_Price) {
        if (
          this.materForm.F_TaxRate == null ||
          this.materForm.F_TaxRate == undefined
        ) {
          let num = "";
          return "";
        }
        if (isNaN(this.materForm.F_TaxRate)) {
          let num = 0;
          return Number(num).toFixed(2) || "";
        } else {
          let num =
            this.materForm.F_Price *
            this.materForm.F_SaleNum *
            (this.materForm.F_TaxRate / 100);
          return Number(num).toFixed(2) || "";
        }
        // let num = this.materForm.F_Price * this.materForm.F_SaleNum * (this.materForm.F_TaxRate / 100)
        // return Number(num).toFixed(2) || "";
      }
    },
  },
  //顶部导航按钮-----修改
  onNavigationBarButtonTap(e) {
    uni.reLaunch({
      url: "saleInfo",
    });
  },
  //物理返回键
  onBackPress(options) {
    uni.reLaunch({
      url: "saleInfo",
    });
    return true;
  },
  methods: {
    // 预览图片
    onPreviewImage(e) {
      console.log(e, "index");
      uni.previewImage({
        urls: this.fileImg,
        current: e,
      });
    },
    spaninfo() {
      console.log(this.$store.saleinfo, "uni.getStorageSync");
      uni.request({
        url: this.url + "/WebApiInterface/Sale/GetInfo",
        method: "POST",
        data: {
          id: this.$store.saleinfo,
        },
        success: (res) => {
          this.materForm = res.data.Data.sale;
          this.materData = res.data.Data.saleDetails;
          if (this.materForm.F_Files) {
            var fileList = this.materForm.F_Files.split(",");
            this.fileImg = fileList.map((item) => {
              return this.url + item;
            });
            console.log(this.fileImg, "pp");
            this.payimg = fileList;
          }
          if (this.fileImg.length < 3) {
            this.selectPhoto = true;
          }

          // this.imgsrc = this.url + this.materForm.F_Files
          this.beginDate = this.materForm.F_SaleDate.slice(0, 10);
          console.log(this.materData, "this.materData");
          this.materForm.F_SaleDate = this.materForm.F_SaleDate.slice(0, 10);
          this.xsnr = [
            this.materForm.F_MaterialCode,
            this.materForm.F_MaterialName,
          ].join("-");
        },
      });
    },
    // 更换头像
    onChangeAva() {
      let max = MAX_IMG_NUM - this.fileImg.length;
      uni.chooseImage({
        count: max,
        sizeType: ["original", "compressed"],
        sourceType: ["album"],
        success: (res) => {
          console.log(res, "1");
          const tempFilePaths = res.tempFilePaths;
          uni.uploadFile({
            url: this.url + "/WebApiInterface/AFileManage/FileUpload",
            filePath: tempFilePaths[0],
            name: "file",
            success: (res) => {
              const str = res.data;
              const strobj = JSON.parse(str);
              console.log(strobj.Data, "strobjstrobj");
              // this.imgsrc = this.url + strobj.Data
              // this.imgsrcno = this.url + strobj.Data
              var fileList = strobj.Data.split(",");
              console.log(strobj.Data, "op");
              // this.fileImg = fileList.map((item)=>{return this.url +  item})
              this.fileImg.push(this.url + strobj.Data);
              this.payimg.push(strobj.Data);
              max = MAX_IMG_NUM - this.fileImg.length;
              this.selectPhoto = max <= 0 ? false : true;
              this.$emit("uploadImg", this.fileImg);
              console.log(this.fileImg, "this.fileImg");
              console.log(this.payimg, "this.payimg");
            },
          });
        },
      });
    },
    //销售数量
    salenum: function (event) {
      var value = event.detail.value;
      console.log(event.detail.value, "输入的值");
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
      this.$set(this.materForm, "F_SaleNum", Number(value));
      if (value == 0) {
        this.materForm.F_SaleNum = 1;
      }
      if (value > this.materData.F_CurrentNum) {
        this.materForm.F_SaleNum = this.materData.F_CurrentNum;
      }
      console.log(this.materData.F_CurrentNum, "this.materData.F_CurrentNum");
    },
    //其他成本
    cost: function (event) {
      var money = this.materForm.F_OtherCost;
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
      this.$set(this.materForm, "F_OtherCost", Number(money));
      console.log(money, "输入");
    },
    //税率限制 0-100
    taxrate: function (event) {
      var value = parseInt(event.target.value);
      this.materForm.F_TaxRate = value;
      console.log(event.target.value, "输入的值");
      if (value > 100) {
        this.materForm.F_TaxRate = 100;
      }
      if (isNaN(value)) {
        this.materForm.F_TaxRate = "";
      }
      if (value < 0 || value == undefined) {
        this.materForm.F_TaxRate = 0;
      }
    },
    //单价
    costname: function (event) {
      var money = this.materForm.F_Price;
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
      this.$set(this.materForm, "F_Price", Number(money).toFixed(2));
      console.log(money, "输入");
    },
    // 附件
    getUploadImgs(res) {
      this.payimg = res;
      console.log(this.payimg, "附件");
    },
    // 删除图片
    onDelImage(e) {
      console.log(e.target, "删除照片");
      // console.log(this.images)
      console.log(this.fileImg);
      var index = e.target.dataset.index;
      var array = this.fileImg.splice(index, 1);
      this.fileImg = this.fileImg;
      var arrays = this.payimg.splice(index, 1);
      this.payimg = this.payimg;
      console.log(this.fileImg, "fileImg");
      console.log(this.payimg, "payimg");
      if (this.fileImg.length < 3) {
        this.selectPhoto = true;
      }
    },
    //开始时间
    bindDateChange(e) {
      this.beginDate = e.target.value;
    },
    //取消
    cancell() {
      uni.reLaunch({
        url: "./saleInfo",
      });
    },
    saleIsSubmit(IsSubmit) {
      let payimg = this.payimg.join();
      let arr = [];
      let data = {};
      let mater = {};
      this.materData.forEach((item) => {
        arr.push({
          F_WarehouseId: item.F_WarehouseId, //仓库ID
          F_MaterialId: item.F_MaterialId, //材料ID
          F_MaterialCode: item.F_MaterialCode, //材料编码
          F_MaterialName: item.F_MaterialName, //材料名称
          F_Model: item.F_Model, //規格
          F_Material: item.F_Material, //材质
          F_Unit: item.F_Unit, //单位
          F_StockNum: item.F_StockNum, //库存数量
          F_OutStockNum: item.F_OutStockNum, //出库数量
          // "F_OutStockCost": item.F_OutStockNum * item.F_Cost || 0 ,//出库成本
          F_OutStockCost: item.F_OutStockCost, //出库成本
          F_Cost: item.F_Cost,
        });
        mater = {
          F_MaterialId: item.F_MaterialId,
          F_MaterialCode: item.F_MaterialCode,
		  F_MaterialName:item.F_MaterialName,
          F_Model: item.F_Model,
          F_Material: item.F_Material,
          F_Unit: item.F_Unit,
          F_CurrentNum: item.F_CurrentNum,
          F_Name: item.F_Name,
          F_Remark: item.F_Remark,
        };
      });
      if (
        this.materForm.F_SaleType == 1 ||
        this.materForm.F_SaleType == 3 ||
        this.materForm.F_SaleType == 4 ||
        this.materForm.F_SaleType == 5
      ) {
        console.log(arr, "arr");
        let one = {
          IsSubmit: IsSubmit || "", //是否保存并提交(1是)
          F_Id: uni.getStorageSync("saleinfo"), //销售单ID
          F_ProId: uni.getStorageSync("proid"), //项目ID
          F_SaleDate: this.beginDate, //销售日期
          F_SaleType: this.materForm.F_SaleType, //销售类型
          F_MaterialId: mater.F_MaterialId, //材料ID
          F_MaterialCode: mater.F_MaterialCode, //材料编号
          F_MaterialName: mater.F_MaterialName, //材料名称
          F_Model: mater.F_Model, //规格
          F_Material: mater.F_Material, //材质
          F_Unit: mater.F_Unit, //单位
          F_SaleNum: this.materForm.F_SaleNum, //销售数量
          F_StockNum: mater.F_CurrentNum, //库存数量
          F_WarehouseName: mater.F_Name, //仓库名称
          F_SaleTotalPrice: Number(this.F_SaleTotalPrice), //销售金额(总价 含税)
          F_Price: Number(this.materForm.F_Price), //销售价格(单价 不含税)
          F_TaxRate: Number(this.materForm.F_TaxRate), //税率(%)
          F_TaxAamount: Number(this.F_TaxAamount), //税额
          F_OtherCost: this.materForm.F_OtherCost, //其它成本
          F_Location: this.materForm.F_Location, //送货位置
          F_Description: this.materForm.F_Description, //备注
          F_SupplierName: mater.F_Remark, //供应商名称
          F_CreatorUserId: uni.getStorageSync("userid"), //用户ID
          F_Files: payimg, //销售凭证
          saleDetails: arr,
        };
        data = one;
      } else {
        let two = {
          IsSubmit: IsSubmit || "", //是否保存并提交(1是)
          F_Id: uni.getStorageSync("saleinfo"), //销售单ID
          F_ProId: uni.getStorageSync("proid"), //项目ID
          F_SaleDate: this.beginDate, //销售日期
          F_SaleType: this.materForm.F_SaleType, //销售类型
          F_MaterialName: this.materForm.F_MaterialName, //材料名称
          F_Model: this.materForm.F_Model, //规格
          F_Unit: this.materForm.F_Unit, //单位
          F_SaleNum: this.materForm.F_SaleNum, //销售数量
          F_StockNum: this.materForm.F_SaleNum, //库存数量
          F_SaleTotalPrice: Number(this.F_SaleTotalPrice), //销售金额(总价 含税)
          F_Price: Number(this.materForm.F_Price), //销售价格(单价 不含税)
          F_TaxRate: Number(this.materForm.F_TaxRate), //税率(%)
          F_TaxAamount: Number(this.F_TaxAamount), //税额
          F_OtherCost: this.materForm.F_OtherCost, //其它成本
          F_Location: this.materForm.F_Location, //送货位置
          F_Description: this.materForm.F_Description, //备注
          F_CreatorUserId: uni.getStorageSync("userid"), //用户ID
          F_Files: payimg, //销售凭证
        };
        data = two;
      }
      console.log(data, "two");
      if (
        !data.F_SaleNum |
        (this.materForm.F_TaxRate == null) |
        !data.F_Price
      ) {
        uni.showToast({
          icon: "none",
          title: "信息不完整",
        });
        return;
      } else {
        this.show = true;

        uni.request({
          url: this.url + "/WebApiInterface/Sale/AddOrModify",
          method: "POST",
          data: data,
          success: (res) => {
            console.log(res.data.StatusCode, "这是一个返回消息");
			 uni.showToast({
                icon: "none",
                title: res.data.Info,
              });
            if (res.data.StatusCode == 500) {
                this.show=false
            } else {
              this.materForm = {};
              uni.reLaunch({
                url: "./saleindex",
              });
            }
          },
        });
      }
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


.seize{
	height: 3rpx;
}

.page {
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

  .content {
    width: 90%;
    height: auto;
    // background-color: #FFFFFF;
    margin: auto;
    margin-top: 30rpx;
    border-radius: 9rpx;

    .nullcop {
      width: 100%;
      height: 20rpx;
      margin-bottom: 200rpx;
    }

    .imageinfo {
      width: 190rpx;
      height: 190rpx;
      background-color: rgba(245, 248, 255, 0.9);
      border-radius: 5rpx;
      margin-top: 20rpx;
      display: flex;
      justify-content: center;
      align-items: center;

      image {
        width: 122rpx;
        height: 84rpx;
      }
    }

    .xsmx {
      input {
        font-size: 28rpx;
      }

      background-color: #ffffff;
      border-radius: 9rpx;

      .mx {
        margin: 30rpx;
        padding-top: 30rpx;
        background-color: #ffffff;

        .tou {
          font-size: 34rpx;
          font-family: PingFang SC;
          font-weight: bold;
          color: #262626;
        }

        .headop {
          .heaadd {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            height: 38rpx;
            font-size: 28rpx;
            font-family: PingFang SC;
            font-weight: 400;
            line-height: 38rpx;
            margin: 20rpx 0rpx;
            color: #666666;

            input {
              text-align: right;
            }

            .texjj {
              width: 70%;
              text-align: right;
              margin-right: -12rpx;
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
            color: #b3b3b3;
            font-size: 28rpx;
          }
        }

        .headtarea {
          height: 200rpx;
          font-size: 28rpx;
          font-family: PingFang SC;
          font-weight: 400;
          margin: 20rpx 0rpx;
          color: #666666;
          padding-bottom: 60rpx;

          textarea {
            font-size: 28rpx;
            height: 160rpx;
            display: block;
            margin-top: 30rpx;
            overflow: hidden;
          }

          .placeinput {
            color: #b3b3b3;
            font-size: 28rpx;
          }
        }

        .headtarear {
          font-size: 28rpx;
          font-family: PingFang SC;
          font-weight: 400;
          margin: 20rpx 0rpx;
          color: #666666;
          padding-bottom: 30rpx;
        }

        .bom {
          margin: 20rpx 0rpx;
          height: 1px;
          background: #fafafa;
          opacity: 1;
        }

        .right {
          .tope {
            display: flex;
            flex-direction: column;

            .rightlo {
              font-size: 28rpx;
              color: #888888;
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
      }
    }
  }

  .bomppo {
    background-color: #ffffff;
    border-radius: 9rpx;

    .top {
      margin: 30rpx;
      padding-top: 30rpx;

      .op {
        font-size: 34rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #262626;
      }

      .right {
        .tope {
          display: flex;
          flex-direction: column;

          .rightlo {
            font-size: 28rpx;
            color: #888888;
          }

          text {
            margin-bottom: 20rpx;
            font-size: 28rpx;
            color: #000000;
          }
        }

        .bom {
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
            border-right: 1rpx solid #f2f2f2;

            .gg {
              color: #333333;
            }

            text {
              margin-top: 6rpx;
              font-size: 28rpx;
            }
          }

          .mid:nth-child(3n) {
            margin-right: 0;
          }

          .mid:nth-last-child(1) {
            border-right: none;
          }
        }
      }

      .bomer {
        margin: 30rpx 0;
        height: 1px;
        background: #fafafa;
        opacity: 1;
      }

      .bomm {
        margin: 20rpx 0;
        height: 1px;
        background: #fafafa;
        opacity: 1;
      }
    }
  }

  .image-list {
    display: flex;

    // flex-wrap: wrap;
    .selectphoto {
      // border: 2rpx dashed #cbd1d7;
      background: rgba(245, 248, 255, 0.9);
      margin-top: 20rpx;
      border-radius: 5rpx;
      // position: relative;
      display: flex;
      justify-content: center;
      align-items: center;

      image {
        width: 190rpx;
        height: 190rpx;
      }
    }
  }

  .image {
    width: 190rpx;
    height: 190rpx;
    margin-right: 20rpx;
    border-radius: 5rpx;
    margin-top: 20rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    display: inline-block;

    image {
      width: 190rpx;
      height: 190rpx;
      margin-right: 20rpx;
      border-radius: 9rpx;
    }

    .shanchu {
      position: absolute;
      top: -12rpx;
      right: -26rpx;
      width: 40rpx !important;
      height: 40rpx !important;
      background-color: #000;
      color: #fff;
      text-align: center;
      line-height: 40rpx;
      font-size: 38rpx;
      font-weight: bolder;
      border-radius: 50%;
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

  .bombtno {
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
      width: 30%;
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
      // box-shadow: 0rpx 5rpx 10rpx rgba(39, 152, 253, 0.4);
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
