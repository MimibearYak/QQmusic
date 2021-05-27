/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2021-03-04 13:27:28
 * @LastEditors: Seven
 * @LastEditTime: 2021-03-07 22:27:35
 */
import Vue from 'vue'
import App from './App'
import request from './utils/request'
import store from './store/idnex'
Vue.config.productionTip = false
//全局共享数据
Vue.prototype.request=request

App.mpType = 'app'

const app = new Vue({
  ...App,
  store 
})
app.$mount()
