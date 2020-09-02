// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Plugin } from 'vue-fragment'
import { MonthPicker } from 'vue-month-picker'
import { MonthPickerInput } from 'vue-month-picker'

import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/css/index.css'
import '@/assets/font-awesome/css/all.css'
import '@/assets/js/JsBarcode.all.min.js'
import io from 'socket.io-client';
 
Vue.use(MonthPicker)
Vue.use(MonthPickerInput)
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
      list_category: [],
      socket: io('http://localhost:3000')
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
    },
    formatMoney(amount, decimalCount = 0, decimal = ".", thousands = ",") {
      try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;

        return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
      } catch (e) {
        console.log(e)
      };
    }
  },
  created: function(){
    this.loadCategory();
  },
  filters: {
    
  }
})


