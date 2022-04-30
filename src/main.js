import Vue from 'vue'
import App from './App'
import store from './store/tabbar.js'
import tabBar from 'components/tabBar';
import header from 'components/header';
import noData from 'components/noData';
import moment from 'moment/moment';
import common from './store/common.js'
import uView from "uview-ui";

Vue.use(uView);
Vue.prototype.$stopClick = common.stopClick;
/**
 * 控制按钮是否显示
 */
Vue.prototype.$hasBtnPermission = function(permission) {
	const myBtns = uni.getStorageSync('buttonAuthority');
	const roleMark = uni.getStorageSync('roleMark')
	console.log(myBtns)
	const myBtnList = JSON.parse(myBtns)

	if (roleMark == 'administrators') {
		return true
	}
	return myBtnList.filter(item => item.code == permission && item.checkstate == 1).length > 0
}

// import * as echarts from 'echarts'
// Vue.prototype.$echarts = echarts
Vue.component("tab-bar", tabBar)
Vue.component("custom-head", header)
Vue.component("no-Data", noData)

Vue.filter('moment', function(value, formatString) {
	formatString = formatString || 'YYYY-MM-DD';
	return moment(value).format(formatString); // value可以是普通日期 20170723
	// return moment.unix(value).format(formatString); // 这是时间戳转时间
});



Vue.config.productionTip = false
//Vue.prototype.url = 'http://purchase.zhroot.com'
//Vue.prototype.mediaUrl = 'http://purchase.zhroot.com'
Vue.prototype.url = 'http://localhost:59399'
Vue.prototype.mediaUrl = 'http://localhost:59399'
//    Vue.prototype.url = 'http://121.5.178.7:8085'
//    Vue.prototype.mediaUrl = 'http://121.5.178.7:8085'
App.mpType = 'app';


const app = new Vue({
	store,
	...App
})
app.$mount()
