export default [
  {
    path: '/help',
    component: () => import('@/pages/help/index.vue'),
    children: [
      {
        name: 'help',
        path: '',
        meta: {
          title: '帮助',
          requiredLogin: true
        },
        component: () => import('@/pages/help/index/index.vue')
      }
    ]
  }
]
