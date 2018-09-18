<style lang="stylus" scoped>
.my-order-tabs
  position relative

  .input
    position absolute
    right 0
    width 240px
    bottom 25px
</style>


<template lang="pug">
.my-order-tabs
  el-tabs(v-model="activeStatus" @tab-click="handleClick")
    el-tab-pane(
      v-for="item in tabPane"
      v-bind:key="item.name"
      v-bind:label="item.text"
      v-bind:name="item.name")
</template>

<script>
export default {
  data () {
    return {
      /**
       * 当前路由
       * @type {String}
       */
      activeStatus: this.$route.query.status,
      /**
       * 账户资金菜单
       * @type {Array}
       */
      tabPane: [
        {
          name: 'inform',
          text: '通知'
        },
        {
          name: 'notice',
          text: '公告'
        },
        {
          name: 'privateMsg',
          text: '私信'
        }
      ]
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
        name: 'msg-center',
        query: {
          status: tab.name
        }
      })
    },
    /**
     * 初始化tabs
     * @function [initTabs]
     */
    initTabs () {
      const status = this.$route.query.status
      if (!status) {
        this.activeStatus = 'inform'
        this.handleClick({name: 'inform'})
      }
    }
  },
  watch: {
    '$route.query.status' () {
      this.initTabs()
    }
  },
  created () {
    this.initTabs()
  }
}
</script>
