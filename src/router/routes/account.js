export default [{
  path: '/account',
  component: () => import('@/pages/account/index.vue'),
  children: [
    {
      name: 'account',
      path: '',
      meta: {
        title: '账户中心',
        requiredLogin: true
      },
      component: () => import('@/pages/account/account-index/index.vue')
    },
    {
      name: 'account-info',
      path: 'account-info',
      alias: '/account-info',
      meta: {
        title: '账户信息',
        requiredLogin: true
      },
      component: () => import('@/pages/account/account-info/index.vue')
    },
    {
      path: 'account-funds',
      alias: '/account-funds',
      component: () => import('@/pages/account/account-funds/index.vue'),
      children: [
        {
          name: 'account-funds',
          path: '',
          meta: {
            title: '账户资金',
            requiredLogin: true
          },
          component: () => import('@/pages/account/account-funds/account-funds-index/index.vue')
        },
        {
          name: 'account-coupon',
          path: 'coupon',
          meta: {
            title: '优惠券',
            requiredLogin: true
          },
          component: () => import('@/pages/account/account-funds/account-coupon/index.vue')
        },
        {
          name: 'account-transaction-record',
          path: 'transaction-record',
          meta: {
            title: '交易记录',
            requiredLogin: true
          },
          component: () => import('@/pages/account/account-funds/account-transaction-record/index.vue')
        }
      ]
    },
    {
      name: 'account-safe',
      path: 'account-safe',
      alias: '/account-safe',
      meta: {
        title: '账户安全',
        requiredLogin: true
      },
      component: () => import('@/pages/account/account-safe/index.vue')
    },
    {
      name: 'shop-manage',
      path: 'shop-manage',
      alias: '/shop-manage',
      meta: {
        title: '店铺管理',
        requiredLogin: true
      },
      component: () => import('@/pages/account/shop-manage/index.vue')
    },
    {
      name: 'brand-manage',
      path: 'brand-manage',
      alias: '/brand-manage',
      meta: {
        title: '品牌管理',
        requiredLogin: true
      },
      component: () => import('@/pages/account/brand-manage/index.vue')
    },
    {
      name: 'shipping-address-manage',
      path: 'shipping-address-manage',
      alias: '/shipping-address-manage',
      meta: {
        title: '邮寄地址管理',
        requiredLogin: true
      },
      component: () => import('@/pages/account/shipping-address-manage/index.vue')
    },
    {
      name: 'shoot-address-manage',
      path: 'shoot-address-manage',
      alias: '/shoot-address-manage',
      meta: {
        title: '拍摄地址管理',
        requiredLogin: true
      },
      component: () => import('@/pages/account/shoot-address-manage/index.vue')
    }
  ]
}]
