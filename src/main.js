// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import echarts from 'echarts'

import './plugins/index'
import './filters/index'
import './components/index'
import './assets/styles/global.styl'
import 'element-ui/lib/theme-chalk/index.css'
import htmlToPdf from '@/utils/htmlToPdf'

import App from './App'
import router from './router'
import store from './store'

Vue.use(ElementUI)
Vue.use(htmlToPdf)
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
