export default [
  {
    path: '/order',
    component: () => import('@/pages/order/index.vue'),
    children: [
      {
        name: 'order',
        path: '',
        meta: {
          title: '订单',
          requiredLogin: true
        },
        component: () => import('@/pages/order/index/index.vue')
      },
      {
        path: 'my-order',
        alias: '/my-order',
        component: () => import('@/pages/order/my-order/index.vue'),
        children: [
          {
            name: 'my-order',
            path: '',
            meta: {
              title: '我的订单',
              requiredLogin: true,
              keepAlive: false
            },
            component: () => import('../../pages/order/my-order/index/index.vue')
          },
          {
            name: 'my-order-details',
            path: 'details',
            alias: '/details',
            meta: {
              title: '订单详情',
              requiredLogin: true
            },
            component: () => import('../../pages/order/my-order/details/index.vue')
          }
        ]
      },
      {
        path: 'my-invoice',
        alias: '/my-invoice',
        component: () => import('@/pages/order/my-invoice/index.vue'),
        children: [
          {
            name: 'my-invoice',
            path: '',
            meta: {
              title: '按订单开票',
              requiredLogin: true
            },
            component: () => import('@/pages/order/my-invoice/index/index.vue')
          },
          {
            name: 'my-invoice-recording',
            path: 'recording',
            alias: '/recording',
            meta: {
              title: '开票记录',
              requiredLogin: true
            },
            component: () => import('@/pages/order/my-invoice/recording/index.vue')
          },
          {
            name: 'my-invoice-setting',
            path: 'setting',
            alias: '/setting',
            meta: {
              title: '开票设置',
              requiredLogin: true
            },
            component: () => import('@/pages/order/my-invoice/setting/index.vue')
          },
          {
            name: 'my-invoice-desc',
            path: 'desc',
            alias: '/desc',
            meta: {
              title: '开票说明',
              requiredLogin: true
            },
            component: () => import('@/pages/order/my-invoice/desc/index.vue')
          }
        ]
      }
    ]
  }
]
