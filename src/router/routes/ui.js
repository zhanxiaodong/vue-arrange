export default [{
  path: '/ui',
  component: () => import('@/pages/ui/index.vue'),
  children: [
    {
      name: 'ui',
      path: '',
      meta: {
        title: 'ui',
        requiredLogin: true
      },
      component: () => import('@/pages/ui/index/index.vue')
    },
    {
      name: 'ui-cascader',
      path: 'cascader',
      alias: '/cascader',
      meta: {
        title: '级联选择器',
        requiredLogin: true
      },
      component: () => import('@/pages/ui/cascader/index.vue')
    },
    {
      name: 'ui-slide-unlock',
      path: 'slide-unlock',
      alias: '/slide-unlock',
      meta: {
        title: '滑动解锁',
        requiredLogin: true
      },
      component: () => import('@/pages/ui/slide-unlock/index.vue')
    },
    {
      name: 'ui-card',
      path: 'card',
      alias: '/card',
      meta: {
        title: '卡片',
        requiredLogin: true
      },
      component: () => import('@/pages/ui/card/index.vue')
    },
    {
      name: 'ui-amap',
      path: 'amap',
      alias: '/amap',
      meta: {
        title: '地图',
        requiredLogin: true
      },
      component: () => import('@/pages/ui/amap/index.vue')
    },
    {
      name: 'ui-coupon',
      path: 'coupon',
      alias: '/coupon',
      meta: {
        title: '优惠券',
        requiredLogin: true
      },
      component: () => import('../../pages/ui/coupon/index.vue')
    },
    {
      name: 'ui-menu',
      path: 'menu',
      alias: '/menu',
      meta: {
        title: '菜单',
        requiredLogin: true
      },
      component: () => import('../../pages/ui/menu/index.vue')
    },
    {
      name: 'ui-address',
      path: 'address',
      alias: '/address',
      meta: {
        title: '地址',
        requiredLogin: true
      },
      component: () => import('../../pages/ui/address/index.vue')
    },
    {
      name: 'ui-cooperative-model',
      path: 'cooperative-model',
      alias: '/cooperative-model',
      meta: {
        title: '合作模特',
        requiredLogin: true
      },
      component: () => import('../../pages/ui/cooperative-model/index.vue')
    },
    {
      name: 'ui-upload-avatar',
      path: 'upload-avatar',
      alias: '/upload-avatar',
      meta: {
        title: '上传头像',
        requiredLogin: true
      },
      component: () => import('../../pages/ui/upload-avatar/index.vue')
    }
  ]
}]
