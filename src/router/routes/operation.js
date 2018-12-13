export default [{
    path: '/operation',
    component: () => import('@/pages/operation/index.vue'),
    children: [
      {
        name: 'stylist-all',
        path: '/stylist-all',
        meta: {
          title: '搭配师-累计',
          requiredLogin: true
        },
        component: () => import('@/pages/operation/stylist-all/index.vue'),
      },
      {
        name: 'stylist-other',
        path: '/stylist-other',
        meta: {
          title: '搭配师-周、月、季度',
          requiredLogin: true
        },
        component: () => import('@/pages/operation/stylist-other/index.vue'),
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
  