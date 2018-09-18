export default [
  {
    path: '/',
    component: () => import('@/pages/home/index.vue'),
    children: [{
      name: 'home',
      path: '',
      meta: {
        title: '首页',
        requiredLogin: true
      },
      component: () => import('@/pages/home/index/index.vue')
    }]
  }
]
