<template lang="pug">
.account-center
  el-row(v-if="menuVisible")
    el-col(:span="24")
      h2
        i.el-icon-document.mr5
        span 账户中心
  el-row.mt20(v-if="menuVisible")
    el-col(:span="24")
      el-tabs(v-model="activeRoute" @tab-click="handleClick")
        el-tab-pane(
          v-for="item in tabPane"
          v-bind:key="item.name"
          v-bind:label="item.text"
          v-bind:name="item.name")
  el-row.mt20
    el-col(:span="24")
      router-view
</template>

<script>

/**
 * 不显示菜单的路由
 * @type {Array}
 */
const noMenuRoutes = [
  'account-funds',
  'account-coupon',
  'account-transaction-record'
]

export default {
  data () {
    return {
      /**
       * 当前路由
       * @type {String}
       */
      activeRoute: this.$route.name,
      /**
       * 账户中心菜单
       * @type {Array}
       */
      tabPane: [
        {
          name: 'account-info',
          text: '账户信息'
        },
        {
          name: 'shop-manage',
          text: '店铺管理'
        },
        {
          name: 'brand-manage',
          text: '品牌管理'
        },
        {
          name: 'shipping-address-manage',
          text: '邮寄地址管理'
        },
        {
          name: 'shoot-address-manage',
          text: '拍摄地址管理'
        },
        {
          name: 'account-safe',
          text: '账户安全'
        }
      ]
    }
  },
  computed: {
    /**
     * 菜单可见性
     * @function [menuVisible]
     * @returns {Bpplean}
     */
    menuVisible () {
      return this.checkRoute(noMenuRoutes)
    }
  },
  methods: {
    /**
     * 跳转路由
     * @function [handleClick]
     * @param {Object} tab -标签信息
     */
    handleClick (tab) {
      this.$router.push({
        name: tab.name
      })
    },
    /**
     * 检查路由
     * @function [checkRoute]
     * @param {Array} arr 路由name数组
     * @return {Boolean}
     */
    checkRoute (arr) {
      const route = this.$route
      if (!(arr instanceof Array)) return false
      return route && route.name ? arr.indexOf(route.name) === -1 : false
    }
  },
  watch: {
    '$route.name' () {
      this.activeRoute = this.$route.name
      this.handleClick({name: this.$route.name})
    }
  }
}
</script>

