import Vue from 'vue'
import Router from 'vue-router'
import CompMain from '../components/CompMain'
import CompCharge from '../components/CompCharge'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CompMain',
      component: CompMain
    },
    {
      path: '/paying',
      name: 'CompCharge',
      component: CompCharge
    }
  ]
})
