// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import vuex from 'vuex'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(vuex)
/* eslint-disable no-new */
var store = new vuex.Store({
  state: {
    show: false
  }
})
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  render: h => h(App)
})
Vue.filter('gettime',
  // <!-- value 格式为13位unix时间戳 -->
  // <!-- 10位unix时间戳可通过value*1000转换为13位格式 -->
  function (value) {
    var date = new Date(value)
    var Y = date.getFullYear()
    var m = date.getMonth() + 1
    var d = date.getDate()
    var H = date.getHours()
    var i = date.getMinutes()
    var s = date.getSeconds()
    if (m < 10) {
      m = '0' + m
    }
    if (d < 10) {
      d = '0' + d
    }
    if (H < 10) {
      H = '0' + H
    }
    if (i < 10) {
      i = '0' + i
    }
    if (s < 10) {
      s = '0' + s
    }
    var t = Y + '-' + m + '-' + d + ' ' + H + ':' + i + ':' + s
    return t
  })
