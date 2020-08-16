// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Plugin } from 'vue-fragment'

import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/css/index.css'
import '@/assets/font-awesome/css/all.css'
import '@/assets/js/JsBarcode.all.min.js'


Vue.config.productionTip = false
Vue.use(Plugin)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  data(){
    return {
      API_GATE: "http://localhost:3000",
      list_category: []
    }
  },
  methods: {
    loadCategory: function(){
      let vm = this;
      vm.axios({
        method: "GET",
        url: vm.$root.API_GATE + '/api/product-categories/',
        headers: {'auth-token': localStorage.getItem('token')}
      }).then(res => {
        let result = res.data;
        if(result.error){

        }else{
          vm.list_category = result.data;
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created: function(){
    this.loadCategory();
  }
})


