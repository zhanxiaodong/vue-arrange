export default [{
    path: '/operation',
    component: () => import('@/pages/operation/index.vue'),
    children: [
      {
        name: 'stylist',
        path: '/stylist',
        meta: {
          title: '搭配师',
          requiredLogin: true
        },
        component: () => import('@/pages/operation/stylist/index.vue'),
      },
      {
        name: 'profit',
        path: '/profit',
        meta: {
          title: '盈利状态',
          requiredLogin: true
        },
        component: () => import('@/pages/operation/profit/index.vue')
      }
    ]
  }]
  