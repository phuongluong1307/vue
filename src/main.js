// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Plugin } from 'vue-fragment'

import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/css/index.css'
import '@/assets/font-awesome/css/all.css'

Vue.config.productionTip = false
Vue.use(Plugin)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


