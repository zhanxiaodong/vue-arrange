export default [
  {
    path: '/appeal',
    component: () => import('@/pages/appeal/index.vue'),
    children: [
      {
        name: 'appeal',
        path: '',
        meta: {
          title: '投诉',
          requiredLogin: true
        },
        component: () => import('@/pages/appeal/index/index.vue')
      },
      {
        path: 'start-appeal',
        alias: '/start-appeal',
        component: () => import('@/pages/appeal/start-appeal/index.vue'),
        children: [
          {
            name: 'start-appeal',
            path: '',
            meta: {
              title: '我的订单',
              requiredLogin: true
            },
            component: () => import('../../pages/appeal/start-appeal/index/index.vue')
          },
          {
            name: 'start-appeal-details',
            path: 'details',
            alias: '/details',
            meta: {
              title: '订单详情',
              requiredLogin: true
            },
            component: () => import('../../pages/appeal/start-appeal/details/index.vue')
          }
        ]
      },
      {
        name: 'appeal-manage',
        path: 'appeal-manage',
        alias: '/appeal-manage',
        meta: {
          title: '投诉管理',
          requiredLogin: true
        },
        component: () => import('@/pages/appeal/appeal-manage/index.vue')
      }
    ]
  }
]
