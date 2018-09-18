import Vue from 'vue'
import VueRouter from 'vue-router'

import { getUserInfo } from '../utils/index'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

// 拦截需要登录的页面
router.beforeEach((to, from, next) => {
  if (to.meta.requiredLogin) {
    getUserInfo().then((res) => {
      const token = res.token
      if (token) {
        next()
      } else {
        next({
          name: 'user-login',
          query: { redirect: to.fullPath }
        })
      }
    }).catch((err) => {
      next({
        name: 'user-login',
        query: { redirect: to.fullPath }
      })
      global.console.error(err)
    })
  } else {
    next()
  }
})

export default router
