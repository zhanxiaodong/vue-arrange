export default [
  {
    path: '/trash',
    component: () => import('@/pages/trash/index.vue'),
    children: [
      {
        name: 'trash',
        path: '',
        meta: {
          title: '回收站',
          requiredLogin: true
        },
        component: () => import('@/pages/trash/index/index.vue')
      }
    ]
  }
]
