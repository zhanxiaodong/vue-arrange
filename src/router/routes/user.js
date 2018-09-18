export default [{
  path: '/user',
  component: () => import('@/pages/user/index.vue'),
  children: [
    {
      name: 'user',
      path: '',
      meta: {
        title: '我的',
        requiredLogin: true
      },
      component: () => import('@/pages/user/index/index.vue')
    },
    {
      name: 'user-login',
      path: 'login',
      alias: '/login',
      meta: {
        title: '登录'
      },
      component: () => import('@/pages/user/login/index.vue')
    },
    {
      name: 'input-phone-info',
      path: 'input-phone-info',
      alias: '/input-phone-info',
      meta: {
        title: '验证手机号'
      },
      component: () => import('@/pages/user/input-phone-info/index.vue')
    },
    {
      name: 'user-info',
      path: 'user-info',
      alias: '/user-info',
      meta: {
        title: '用户信息',
        requiredLogin: true
      },
      component: () => import('@/pages/user/user-info/index.vue')
    },
    {
      name: 'input-user-info',
      path: 'input-user-info',
      alias: '/input-user-info',
      meta: {
        title: '完善用户信息'
      },
      component: () => import('@/pages/user/input-user-info/index.vue')
    },
    {
      name: 'user-info-submit-success',
      path: 'user-info-submit-success',
      alias: '/user-info-submit-success',
      meta: {
        title: '用户信息提交成功'
      },
      component: () => import('@/pages/user/user-info-submit-success/index.vue')
    },
    {
      name: 'input-other-info',
      path: 'input-other-info',
      alias: '/input-other-info',
      meta: {
        title: '完善基本信息'
      },
      component: () => import('@/pages/user/input-other-info/index.vue')
    },
    {
      name: 'user-forget-pwd',
      path: 'forget-pwd',
      alias: '/forget-pwd',
      meta: {
        title: '忘记密码'
      },
      component: () => import('@/pages/user/forget-pwd/index.vue')
    },
    {
      name: 'user-reset-pwd',
      path: 'reset-pwd',
      alias: '/reset-pwd',
      meta: {
        title: '修改密码'
      },
      component: () => import('@/pages/user/reset-pwd/index.vue')
    }
  ]
}]
