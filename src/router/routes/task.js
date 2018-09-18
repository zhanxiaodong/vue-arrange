export default [{
  path: '/',
  component: () => import('@/pages/task/index.vue'),
  children: [
    {
      name: 'new-task',
      path: '',
      meta: {
        title: '新建盒子',
        requiredLogin: true,
        keepAlive: false
      },
      component: () => import('@/pages/task/new-task/index.vue')
    },
    {
      name: 'new-task-details',
      path: 'taskdetail',
      alias: '/taskdetail',
      meta: {
        title: '订单详情',
        requiredLogin: true
      },
      component: () => import('../../pages/task/taskdetail/index.vue')
    },
    {
      path: 'task',
      alias: '/task',
      component: () => import('@/pages/task/index/index.vue'),
      children: [
        {
          name: 'task',
          path: '',
          meta: {
            title: '订单请求',
            requiredLogin: true
          },
          component: () => import('../../pages/task/index/index.vue')
        }
      ]
    },
    {
      name: 'all-box',
      path: 'all-box',
      meta: {
        title: '所有订单',
        requiredLogin: true
      },
      component: () => import('@/pages/task/all-box/index.vue')
    },
    {
      name: 'invited-model',
      path: 'invited-model',
      alias: '/invited-model',
      meta: {
        title: '模特邀约',
        requiredLogin: true
      },
      component: () => import('@/pages/task/index/index.vue')
    },
    {
      name: 'booking-model',
      path: 'booking-model',
      alias: '/booking-model',
      meta: {
        title: '模特预约',
        requiredLogin: true
      },
      component: () => import('@/pages/task/index/index.vue')
      // component: () => import('@/pages/task/booking-model/index.vue')
    },
    {
      name: 'marketing-task',
      path: 'marketing-task',
      alias: '/marketing-task',
      meta: {
        title: '营销任务',
        requiredLogin: true
      },
      component: () => import('@/pages/task/index/index.vue')
      // component: () => import('@/pages/task/marketing-task/index.vue')
    }
  ]
}]
