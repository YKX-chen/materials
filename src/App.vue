<script>
export default {
  onLaunch: function () {
    // #ifdef APP-PLUS
    // setTimeout(() => {
    // 	plus.navigator.closeSplashscreen();
    // }, 100)
    console.log("保存的token：", uni.getStorageSync("userid"));
    let loginDate;
    let timeDate = new Date();
    let cacheDate = uni.getStorageSync("loginTime");
    // debugger
    // if (!!cacheDate) {
    //   loginDate = new Date(cacheDate);
    //   let interval = timeDate - loginDate;
    //   let days = Math.floor(interval / (24 * 3600 * 1000)); // 计算出天数
    //   console(days, "间隔天数");
    //   if (days > 7) {
    //     setTimeout(() => {
    //       plus.navigator.closeSplashscreen();
    //     }, 1000);
    //   } else {
    //     setTimeout(() => {
    //       plus.navigator.closeSplashscreen();
    //     }, 1000);
    //     uni.reLaunch({
    //       url: "/pages/index",
    //     });
    //   }
    // } else {
    //   setTimeout(() => {
    //     plus.navigator.closeSplashscreen();
    //   }, 1000);
    // }

    console.log(uni.getStorageSync("loginTime"), "zbssz");
    //判断进入APP的时候是否有存储的token
    if (uni.getStorageSync("userid")) {
      setTimeout(() => {
        plus.navigator.closeSplashscreen();
      }, 1000);
      uni.reLaunch({
        url: "/pages/index",
      });
    } else {
      setTimeout(() => {
        plus.navigator.closeSplashscreen();
      }, 1000);
    }

    //判断客户端
    var clent = uni.getSystemInfoSync().platform;
    plus.push.setAutoNotification(true);

    let pinf = plus.push.getClientInfo();
    let cid = (pinf && pinf.clientid) || ""; //客户端标识
    console.log("cid：" + cid);
    uni.setStorageSync("cid", cid);
    //----------原本的------
    //var op = {}
    var that = this;
    //这块打印出来看你需要什么值再进行赋值
    //判断客户端
    var clent = uni.getSystemInfoSync().platform;
    plus.push.setAutoNotification(true);
    const _self = this;
    //收到透传消息
    //只有APP在线时，才会触发receive事件，透传消息不会触发系统消息,需要创建本地消息
    plus.push.addEventListener(
      "receive",
      function (msg) {
        console.log("接收到新消息");
        var clent = uni.getSystemInfoSync().platform;
        console.log("(receive):" + JSON.stringify(msg));
        if (clent == "ios") {
          //如果是IOS
          var payload = msg.payload;
          //【APP离线】收到消息，但没有提醒（发生在一次收到多个离线消息时，只有一个有提醒，但其他的没有提醒）
          //【APP在线】收到消息，不会触发系统消息,需要创建本地消息，但不能重复创建。必须加msg.type验证去除死循环
          if (msg.aps == null && msg.type == "receive") {
            var messageTitle = payload.title;
            var messageContent = payload.content;
            //创建本地消息,发送的本地消息也会被receive方法接收到，但没有type属性，且aps是null
            plus.push.createMessage(messageContent, JSON.stringify(payload), {
              title: messageTitle,
            });
          }
          // else{
          //  var payload = JSON.parse(msg.payload);
          //  plus.push.createMessage(payload.messageContent, JSON.stringify(payload.payload), {title: payload.messageTitle});
          // }
        }
        if (clent == "android") {
          //title content payload 会被dcloud自动创建成了通知消息，通知消息不会触发receive事件(如果需要触发receive事件,需要推送的时候修改这三个参数名称)
          //如果是Android，当APP在线时，收到透传消息不会进入系统消息，需要发送本地提醒。
          console.log(msg, "安卓");
          // var payload = JSON.parse(msg.payload);
          // var messageTitle = payload.messageTitle;
          // var messageContent = payload.messageContent;
          // plus.push.createMessage(messageContent, msg.payload, {
          // 	title: messageTitle
          // });
          //plus.runtime.setBadgeNumber(1)
        }
      },
      false
    );
    //---------上面-----------
    // //点击系统通知的推送跳转到指定的界面
    plus.push.addEventListener(
      "click",
      function (msg) {
        console.log(msg, "触发click事件");
        var clent = uni.getSystemInfoSync().platform;
        console.log("(click):" + JSON.stringify(msg));
        var op;

        if (clent == "ios") {
          //如果是IOS
          var payload;
          if (msg.type == "click") {
            //APP离线点击包含click属性，这时payload是JSON对象
            payload = msg.payload;
          } else {
            //APP在线，收到消息不会包含type属性,这时的payload是JSON字符串，需要转为JSON对象
            payload = JSON.parse(msg.payload);
          }
          op = payload;
        }
        if (clent == "android") {
          op = msg.payload;
          console.log("msg.payload:" + msg.payload);
        }

        if (op != null || op != undefined) {
          setTimeout(function () {
            // uni.reLaunch({
            // 	url:'/pages/SalePlan/Saleplan'
            // })
            if (op.msgType === 1) {
              // setTimeout(function() {
              that.$store.saleid = op.linkId;
              uni.reLaunch({
                url: "/pages/SalePlan/saleLook",
              });
              // }, 1000)
            }
            if (op.msgType === 2) {
              that.$store.saleid = op.linkId;
              console.log(op.linkId, ";op.linkId");
              uni.reLaunch({
                url: "/pages/SalePlan/saleLook",
              });
            }
            if (msgType == 3) {
              this.$store.saleid = op.linkId;
              if (op.type == 1) {
                uni.reLaunch({
                  url: "/pages/SalePlan/Examine/saleplaninfo",
                });
              } else {
                uni.reLaunch({
                  url: "/pages/SalePlan/Examine/saleplaninfo?status=" + 1,
                });
              }
            }
            if (op.msgType === 4) {
              if (op.type === 1) {
                uni.reLaunch({
                  url: "/pages/PurchaseOrder/PurchaseOrder",
                });
              } else {
                that.$store.saleinfo = op.linkId;
                uni.reLaunch({
                  url: "/pages/SalePlan/sale/saleInfo",
                });
              }
            }
            if (op.msgType === 5) {
              that.$store.PurchaseId = op.linkId;
              uni.reLaunch({
                url: "/pages/PurchaseOrder/PurchaseComplete",
              });
            }
            if (op.msgType === 6) {
              that.$store.PurchaseId = op.linkId;
              uni.reLaunch({
                url: "/pages/PurchaseOrder/PurchaseDetails",
              });
            }
            if (op.msgType === 7) {
              that.$store.PurchaseId = op.linkId;
              uni.reLaunch({
                url: "/pages/PurchaseOrder/PurchaseDetails",
              });
            }
            if (op.msgType === 8) {
              that.$store.saleinfo = op.linkId;
              uni.reLaunch({
                url: "/pages/SalePlan/sale/saleInfo",
              });
            }
            if (op.msgType === 11) {
              that.$store.paymentid = op.linkId;
              uni.reLaunch({
                url: "/pages/PurchaseOrder/Payment/paymentDetails",
              });
            }
            if (op.msgType === 12) {
              that.$store.collectionid = op.linkId;
              uni.reLaunch({
                url: "/pages/PurchaseOrder/Payment/collectionDetails",
              });
            }
            if (op.msgType === 13) {
              that.$store.paymentid = op.linkId;
              uni.reLaunch({
                url: "/pages/PurchaseOrder/Payment/paymentDetails",
              });
            }
            if (op.msgType === 14) {
              that.$store.collectionid = op.linkId;
              uni.reLaunch({
                url: "/pages/PurchaseOrder/Payment/collectionDetails",
              });
            }
            if (op.msgType === 15) {
              that.$store.projectid = op.linkId;
              uni.reLaunch({
                url: "/pages/SalePlan/Examine/projectDetail",
              });
            }
            if (op.msgType === 16) {
              that.$store.proid = op.linkId;
              uni.reLaunch({
                url: "/pages/projectManagment/projectInfo",
              });
            }
            if (op.msgType === 17) {
              that.$store.saleid = op.linkId;
              uni.reLaunch({
                url: "/pages/SalePlan/saleLook",
              });
            }
            if (op.msgType === 18) {
              that.$store.supplierid = op.linkId;
              uni.reLaunch({
                url: "/pages/SalePlan/Examine/supplierDetail",
              });
            }
            //跳转到应付账单详情
            if (op.msgType === 20) {
              that.$store.paymentid = op.linkId;
              uni.reLaunch({
                url: "/pages/PurchaseOrder/Payment/paymentDetails",
              });
            }
            if (op.msgType === 21) {
              if (item.F_Type == 1) {
                that.$store.paymentid = op.linkId;
                uni.reLaunch({
                  url: "/pages/PurchaseOrder/Payment/gopayment",
                });
              } else {
                that.$store.paymentid = op.linkId;
                uni.reLaunch({
                  url: "/pages/PurchaseOrder/Payment/paymentDetails",
                });
              }
            }
            if (op.msgType === 22) {
              that.$store.collectionid = op.linkId;
              uni.reLaunch({
                url: "/pages/PurchaseOrder/Payment/collectionDetails",
              });
            }
            if (op.msgType === 23) {
              if (item.F_Type == 1) {
                that.$store.collectionid = op.linkId;
                uni.reLaunch({
                  url: "/pages/PurchaseOrder/Payment/gocollection",
                });
              } else {
                that.$store.collectionid = op.linkId;
                uni.reLaunch({
                  url: "/pages/PurchaseOrder/Payment/collectionDetails",
                });
              }
            }
            //对账审批 ---  通知对象--总经理
            if (op.msgType === 24) {
              that.$store.saveid = op.linkId;
              uni.reLaunch({
                url: "/pages/SalePlan/Examine/saveInfo",
              });
            }
            //应付账单开票
            if (op.msgType === 26) {
              that.$store.paymentid = op.linkId;
              uni.reLaunch({
                url: "/pages/PurchaseOrder/Payment/paymentDetails",
              });
            }
            //应收账单开票
            if (op.msgType === 26) {
              that.$store.collectionid = op.linkId;
              uni.reLaunch({
                url: "/pages/PurchaseOrder/Payment/collectionDetails",
              });
            }
          }, 1000);
        }
      },
      false
    );
    // #endif
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
  methods: {},
};
</script>
<style lang="scss">
@import "uview-ui/index.scss";
@import "./static/fonts/font.css";
</style>
<style>
/*每个页面公共css */
page {
  background-color: #f3f3f3;
}

/* // 禁用时样式 */
button[disabled] {
  background-color: #000;
  color: #666;
}

uni-tabbar.uni-tabbar-bottom .uni-tabbar {
  background-color: #f3f3f3;
  /* box-shadow: 0 0 1px rgba(0, 0, 0, 0.4); */
  box-shadow: 0px -1px 1px rgba(0, 0, 0, 0.1);
  border-top: 0;
  /* border-top-left-radius: 20px;
		border-top-right-radius: 20px */
}

uni-tabbar .uni-tabbar-border {
  height: 0px;
}

.uni-tabbar__bd {
  height: 120rpx !important;
}

uni-button:after {
  border: none;
  border: 0;
}
</style>
