import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//某些网站为了辨别用户身份、进行 session 跟踪而储存在用户本地终端上的数据（通常经过加密）。
import Cookies from 'js-cookie'

import 'normalize.css/normalize.css'

//element-ui
import Element from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

// 数据字典  待引入
//import dict from './components/Dict'

// 权限指令
import checkPer from '@/utils/permission'
import permission from './components/Permission'
import './assets/styles/element-variables.scss'
// global css
import './assets/styles/index.scss'

//代码高亮
import VueHighlightJS from 'vue-highlightjs'


//axios
import axios from 'axios'
Vue.prototype.$axios = axios




Vue.use(Element)
Vue.use(mavonEditor)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
