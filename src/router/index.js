import Vue from 'vue'
import VueRouter from 'vue-router'
import Goods from '../pages/modules/Goods'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'goods',
    component: Goods
  },
  {
    path: '/evaluate',
    name: 'evaluate',
    component: () => import('../pages/modules/Evaluate')
  },
  {
    path: '/business',
    name: 'business',
    component: () => import('../pages/modules/Business')
  }
]

const router = new VueRouter({
  routes
})

export default router
