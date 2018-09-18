<template lang="pug">
.my-invoice
  el-row
    el-col(:span="24")
      el-tabs(v-model="activeRoute" @tab-click="handleClick")
        el-tab-pane(
          v-for="item in tabPane"
          v-bind:key="item.name"
          v-bind:label="item.text"
          v-bind:name="item.name")
  el-row
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
          name: 'my-invoice',
          text: '按订单开票'
        },
        {
          name: 'my-invoice-recording',
          text: '开票记录'
        },
        {
          name: 'my-invoice-setting',
          text: '开票设置'
        },
        {
          name: 'my-invoice-desc',
          text: '开票说明'
        }
      ]
    }
  },
  methods: {
    /**
     * 跳转路由
     * @function [handleClick]
     * @param {Object} tab -tab
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
