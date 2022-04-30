import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		tabBar: [{
				"pagePath": "/pages/notice",
				'icon': '/static/tabIcon01.png',
				'activeIcon': '/static/tabIcon01_1.png',
				"num": 0,
				"isDot": false,
				"verify": true
			},
			{
				"pagePath": "/pages/index",
				'icon': '/static/tabIcon02.png',
				'activeIcon': '/static/tabIcon02_1.png',
				"hump": true,
				"verify": true,
			},
			{
				"pagePath": "/pages/materialRanking/materialClassification2",
				'icon': '/static/tabIcon03.png',
				'activeIcon': '/static/tabIcon03_1.png',
				"verify": true
			},
			{
				"pagePath": "/pages/my",
				'icon': '/static/tabIcon04.png',
				'activeIcon': '/static/tabIcon04_1.png',
				"verify": true
			}
		],
		tabBarIndex: 1
	},
	mutations: {
		changeTabBar(state, payload) {
			if (payload) {
				state.tabBarIndex = payload.index
			}
		}
	},
	actions: {

	}
})

export default store
