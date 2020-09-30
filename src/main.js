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
    },
    apiAxios: function(axios){
      const API_GATEWAY = 'http://localhost:3000';
      this._axios = axios;
      this.get = function(url,params){
        this.url = url;
        this.params = params;
        return this._axios({
          method: "GET",
          url: API_GATEWAY + this.url,
          headers: {'auth-token': localStorage.getItem('token')},
          params: this.params
        })
        .then(res => {
          return res
        })
        .catch(err => {
          console.log(err)
        })
      };
      this.getId = function(url,params, id){
        this.url = url;
        this.params = params;
        this.id = id;
        return this._axios({
          method: "GET",
          url: API_GATEWAY + this.url + this.id,
          headers: {'auth-token': localStorage.getItem('token')},
          params: this.params
        })
        .then(res => {
          return res
        })
        .catch(err => {
          console.log(err)
        })
      };
      this.post = function(url, data){
        this.data = data;
        this.url = url;
        return this._axios({
          method: "POST",
          url: API_GATEWAY + this.url,
          headers: {'auth-token': localStorage.getItem('token')},
          data: this.data
        })
        .then(res => {
          return res;
        })
        .catch(err => {
          console.log(err)
        })
      };
      this.delete = function(url, data){
        this.data = data;
        this.url = url;
        return this._axios({
          method: "DELETE",
          url: API_GATEWAY + this.url,
          headers: {'auth-token': localStorage.getItem('token')},
          data: this.data
        })
        .then(res => {
          return res;
        })
        .catch(err => {
          console.log(err)
        })
      };
      this.put = function(url, data){
        this.data = data;
        this.url = url;
        return this._axios({
          method: "PUT",
          url: API_GATEWAY + this.url,
          headers: {'auth-token': localStorage.getItem('token')},
          data: this.data
        })
        .then(res => {
          return res;
        })
        .catch(err => {
          console.log(err)
        })
      }
    }
  },
  created: function(){
    this.loadCategory();
  },
  filters: {
    
  }
})


