export default [
  {
    path: '/msg-center',
    component: () => import('@/pages/msg-center/index.vue'),
    children: [
      {
        name: 'msg-center',
        path: '',
        meta: {
          title: '消息中心',
          requiredLogin: true
        },
        component: () => import('@/pages/msg-center/index/index.vue')
      }
    ]
  }
]
