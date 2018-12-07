export default [{
    path: '/sales',
    component: () => import('@/pages/sales/index.vue'),
    children: [
      {
        name: 'arrange',
        path: '/arrange',
        meta: {
          title: '营销管理',
          requiredLogin: true
        },
        component: () => import('@/pages/sales/arrange/index.vue'),
      },
      {
        name: 'strategy',
        path: '/strategy',
        meta: {
          title: '营销策略',
          requiredLogin: true
        },
        component: () => import('@/pages/sales/strategy/index.vue')
      }
    ]
  }]
  