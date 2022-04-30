<template>
  <view class="login">
    <view class="loginTitle">
      <view>工程物资智能采购</view>
      <view style="text-align: center">管理平台</view>
    </view>
    <view class="form">
      <view class="loginInput">
        <image
          src="http://purchase.zhroot.com/attached/appImgs/Cslices/%E6%88%91%E7%9A%84@2x.png"
          class="userimg"
        >
        </image>
        <view class="iunputBox"
          ><input
            type="text"
            name="username"
            v-model="username"
            placeholder-class="placeholder"
            placeholder="请输入用户名"
        /></view>
      </view>
      <view class="loginInput">
        <image
          src="http://purchase.zhroot.com/attached/appImgs/Cslices/%E5%AF%86%E7%A0%81@2x.png"
          class="userimg"
        >
        </image>
        <view class="iunputBox"
          ><input
            :type="pwdFlag"
            name="password"
            v-model="password"
            placeholder-class="placeholder"
            placeholder="请输入密码"
        /></view>
        <view v-show="seen" @click="changeSeen">
          <image
            src="http://purchase.zhroot.com/attached/appImgs/Cslices/%E7%9C%BC%E5%AD%90.png"
            class="pwdicon"
          >
          </image>
        </view>
        <view v-show="!seen" @click="changeSeen">
          <image
            src="http://purchase.zhroot.com/attached/appImgs/Cslices/%E7%9E%8E%E5%AD%90.png"
            class="pwdicon"
          >
          </image>
        </view>
      </view>
      <view class="btnLine">
        <button plain class="submit" form-type="submit" @click="btnlogin()">
          登录
        </button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      time: 60,
      btntxt: "获取验证码",
      seen: false,
      pwdFlag: "password",
      proData: [],
      zhbcz: "",
      pwdcw: "",
      dlcg: "",
      proid: "",
    };
  },
  onLoad() {},
  created() {
    console.log(this.url);
  },
  methods: {
    changeSeen() {
      if ((this.seen = !this.seen)) {
        this.pwdFlag = "text";
      } else {
        this.pwdFlag = "password";
      }
    },
    btnlogin() {
      if (this.username == "" || this.password == "") {
        uni.showToast({
          icon: "none",
          title: "请输入账户和密码",
        });
      } else {
        this.login();
      }
    },
    login() {
      console.log(this.username, "username");
      console.log(
        this.url + "/WebApiInterface/ApiLogin/CheckLogin",
        "/WebApiInterface/ApiLogin/CheckLogin"
      );
      uni.request({
        url: this.url + "/WebApiInterface/ApiLogin/CheckLogin",
        method: "post",
        data: {
          username: this.username, //  [必填] 账号
          password: this.password, //  [密码] 密码
        },
        success: (res) => {
          // console.log(res, '登录登录登录登录登录登录')
          if (res.data.Info == "登录失败：密码不正确，请重新输入") {
            this.pwdcw = "密码错误,请重新输入";
          }
          if (res.data.Info == "登录失败：账户不存在，请重新输入") {
            this.zhbcz = "账号不存在,请重新输入";
          }
          if (res.data.Info == "登录成功") {
            this.dlcg = "登录成功";
          }
          if (res.data.StatusCode == 200) {
            let loginDate = new Date();
            let loginDateStr=(loginDate.getFullYear()+'-'+(loginDate.getMonth()+1)+'-'+loginDate.getDate())
            uni.setStorageSync("loginTime", loginDateStr);
            uni.setStorageSync("userData", res.data.Data);
            uni.setStorageSync("userid", res.data.Data.F_Id);
            uni.setStorageSync("token", res.data.Data.Token);
            uni.setStorageSync("version", res.data.Data.Version);
            uni.setStorageSync("roleMark", res.data.Data.roleMark); //角色标识
            this.cDep();
            this.getData();
            console.log(
              uni.getStorageSync("userid"),
              uni.getStorageSync("headicon", res.data.Data.headIcon),
              "这是一个用户ID"
            );
			console.log( uni.getStorageSync("loginTime"),'zbssz')
          } else {
            uni.showLoading({
              // title: this.pwdcw || this.zhbcz
            });
            var that = this;
            setTimeout(function () {
              uni.showToast({
                icon: "none",
                title: that.pwdcw || that.zhbcz,
              });
            }, 500);
            // this.username = ''
            // this.password = ''
            // setTimeout(function() {
            // 	uni.hideLoading();
            // }, 500);
          }
        },
      });
    },
    cDep() {
      uni.request({
        url: this.url + "/WebApiInterface/User/UpdateCid",
        method: "POST",
        data: {
          userId: uni.getStorageSync("userid"), //  [必填]用户ID
          cid: uni.getStorageSync("cid"), //        [必填]App的用户唯一标识
        },
        success: (res) => {
          console.log(res, "res");
          console.log(uni.getStorageSync("cid"), "uni.getStorageSync");
        },
      });
    },
    getData() {
      uni.request({
        url: this.url + "/WebApiInterface/Project/GetProjectPageList",
        method: "post",
        data: {
          rows: 10, // 每页行数
          page: 1, //当前页
          sidx: "F_CreatorTime", //排序列
          sord: "asc", //排序类型
          userId: uni.getStorageSync("userid"), //人员id
          proName: this.proinput, //项目名称/项目编号
          proTypeId: "", //项目类型ID
          type: "", //项目状态
          status: "", //审批状态
          managerId: "", //项目经理ID
        },
        success: (res) => {
          this.proData = res.data.Data;
          this.proData.forEach((item) => {
            this.proid = item.F_Id;
          });
          console.log(this.proid, "proid");
          console.log(this.proData.length, "sl");
          if (this.proData.length == 0) {
            uni.showLoading({
              title: "没有参与任何项目",
            });
            setTimeout(function () {
              uni.hideLoading();
            }, 1000);
          } else {
            if (this.proData.length > 1) {
              uni.showToast({
                title: this.dlcg,
                duration: 1000,
              });

              setTimeout(function () {
                uni.reLaunch({
                  url: "homepro/choice",
                });
              }, 1000);
            } else if (this.proData.length == 1) {
              uni.showToast({
                title: this.dlcg,
                duration: 1000,
              });
              console.log(this.proid, "ooooo");
              console.log(
                JSON.stringify(this.proid),
                "JSON.stringify(this.proid)"
              );
              var data = JSON.stringify(this.proid);

              uni.setStorageSync("proid", res.data.Data[0].F_Id);
              setTimeout(function () {
                uni.reLaunch({
                  url: "./index?proid=" + res.data.Data[0].F_Id,
                });
              }, 1000);
            }
          }
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  display: -webkit-flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  background: url(http://purchase.zhroot.com/attached/appImgs/Cslices/bg.png)
    top center;
  background-size: cover;
  justify-content: center;
  align-items: center;

  .loginTitle {
    color: #fff;
    font-size: 48rpx;
    letter-spacing: 4rpx;
    margin-bottom: 150rpx;
    margin-top: -200rpx;
  }

  .form {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    margin-top: -60rpx;
    width: 86vw;

    .loginInput {
      display: flex;
      display: -webkit-flex;
      box-sizing: border-box;
      align-items: center;
      padding: 10rpx 0;
      margin-bottom: 40rpx;
      width: 100%;
      height: 98rpx;
      color: #fff;
      // justify-content: space-between;
      background: linear-gradient(
        9deg,
        rgba(0, 0, 0, 0.1) 0%,
        rgba(0, 0, 0, 0.1) 1%,
        rgba(0, 0, 0, 0.1) 100%
      );
      box-shadow: 28rpx 30rpx 81rpx rgba(255, 255, 255, 0.16);
      box-shadow: 9px 8px 16px 0px rgba(0, 0, 0, 0.15) inset;
      opacity: 0.8;

      .placeholder {
        color: rgba(255, 255, 255, 0.5);
        opacity: 0.4;
      }

      .userimg {
        width: 42.32rpx;
        height: 43rpx;
        margin-top: 15rpx;
        padding: 50rpx 30rpx;
      }

      .pwdicon {
        width: 42.32rpx;
        height: 43rpx;
        margin-top: 15rpx;
        margin-left: 100rpx;
        padding: 50rpx 30rpx;
      }

      .iunputBox {
        display: flex;
        display: -webkit-flex;
        flex: 1;
        -webkit-box-flex: 1;

        input {
          width: 100%;
          height: 64rpx;
          font-size: 32rpx;
          color: #fff;
          padding: 10rpx 0;
        }
      }
    }

    .inputheader {
      font-size: 36rpx;
    }

    .btnLine {
      display: flex;
      display: -webkit-flex;
      width: 100%;
      margin-top: 50rpx;
      background-color: #2798fd;

      .submit {
        width: 100%;
        // background: linear-gradient(90deg, #D6B681, #E1C495);
        // background-color: #2798fd;

        border: none;
        border: 1rpx solid rgba(255, 255, 255, 0.2);
        height: 90rpx;
        line-height: 90rpx;
        color: #fff;
        font-size: 32rpx;
        // border-radius: 70rpx;
        font-weight: bold;
      }
    }

    .pwdtext {
      display: flex;
      justify-content: center;
      margin-top: 30rpx;
      font-size: 30rpx;
      color: #2798fd;
    }
  }
}
</style>
