import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: '登录',
    component: ()=> import('../components/vLogin.vue')
  },
  {
    path: '/goodsList',
    name: '商品列表',
    component: ()=> import('../components/vGoodsList.vue')
  },
  {
    path: '/cart',
    name: '购物车',
    component: ()=> import('../components/vCart.vue')
  },
  {
    path: '/addGoods',
    name: '商品入库',
    component: ()=> import('../components/vAddGoods.vue')
  },
  {
    path: '/cashRecord',
    name: '收银记录',
    component: ()=> import('../components/vCashRecord.vue')
  },
  {
    path: '/announcement',
    name: '消息通知',
    component: ()=> import('../components/vAnnouncement.vue')
  },
  {
    path: '/collegueList',
    name: '员工列表',
    component: ()=> import('../components/vCollegueList.vue')
  },
  {
    path: '/addCollegue',
    name: '添加员工',
    component: ()=> import('../components/vAddCollegue.vue')
  },
  {
    path: '/dataStatistics',
    name: '数据统计',
    component: ()=> import('../components/vDataStatistics.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
