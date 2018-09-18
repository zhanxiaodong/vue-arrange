<template lang="pug">
.account-funds
  el-row
    el-col(:span="24")
      h2
        i.el-icon-document.mr5
        span 账户资金
  el-row.mt20
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
export default {
  data () {
    return {
      /**
       * 当前路由
       * @type {String}
       */
      activeRoute: this.$route.name,
      /**
       * 账户资金菜单
       * @type {Array}
       */
      tabPane: [
        {
          name: 'account-funds',
          text: '账户状况'
        },
        {
          name: 'account-coupon',
          text: '优惠券'
        },
        {
          name: 'account-transaction-record',
          text: '交易记录'
        }
      ]
    }
  },
  methods: {
    /**
     * 跳转路由
     * @function [handleClick]
     * @param {Object} tab -标签页信息
     */
    handleClick (tab) {
      this.$router.push({
        name: tab.name
      })
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
