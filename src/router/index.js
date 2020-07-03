import Vue from 'vue'
import Router from 'vue-router'
import CompMain from '../components/CompMain'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CompMain',
      component: CompMain
    }
  ]
})
