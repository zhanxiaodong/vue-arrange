export default [{
  path: '/baby',
  component: () => import('@/pages/baby/index.vue'),
  children: [
    {
      name: 'baby',
      path: '',
      meta: {
        title: '',
        requiredLogin: true
      },
      component: () => import('@/pages/baby/my-baby/index.vue'),
      children: [
        {
          name: 'my-baby',
          path: '/my-baby',
          meta: {
            title: '我的顾客',
            requiredLogin: true
          },
          component: () => import('../../pages/baby/my-baby/index/index.vue')
        },
        {
          name: 'baby-details',
          path: 'details',
          alias: '/details',
          meta: {
            title: '孩子详情',
            requiredLogin: true
          },
          component: () => import('../../pages/baby/my-baby/details/index.vue')
        }
      ]
    },
    {
      name: 'all-baby',
      path: '/all-baby',
      meta: {
        title: '所有顾客',
        requiredLogin: true
      },
      component: () => import('@/pages/baby/all-baby/index.vue')
    }
  ]
}]
