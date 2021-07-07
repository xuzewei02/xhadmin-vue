import Vue from 'vue'

import App from './App' // 原为import App from './App.vue'
import store from './store'
import router from './router/routers' // 原为:import router from './router'

import Cookies from 'js-cookie' // 某些网站为了辨别用户身份、进行 session 跟踪而储存在用户本地终端上的数据（通常经过加密）。

import 'normalize.css/normalize.css'

import Element from 'element-ui' // element-ui
import 'element-ui/lib/theme-chalk/index.css'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import dict from './components/Dict' // 数据字典  待引入

import checkPer from '@/utils/permission' // 权限指令 均已引入，暂无调用
import permission from './components/Permission'
import './assets/styles/element-variables.scss'

import './assets/styles/index.scss' // global css

import VueHighlightJS from 'vue-highlightjs'
import 'highlight.js/styles/atom-one-dark.css'

import './assets/icons' // icon

import './router/index' // permission control
import 'echarts-gl'

import axios from 'axios' // axios
Vue.prototype.$axios = axios

Vue.use(checkPer)
Vue.use(VueHighlightJS)
Vue.use(mavonEditor)
Vue.use(permission)
Vue.use(dict)
Vue.use(Element, {
  size: Cookies.get('size') || 'small' // set element-ui default size  原为 Vue.use(Element)
})
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

/*
原为如下，不知区别在哪...
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
*/
