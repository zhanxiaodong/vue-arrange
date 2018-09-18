<style lang="stylus" scoped>
.my-order-tabs
  position relative

  .input
    position absolute
    right 0
    width 240px
    bottom 25px

    &__icon
      line-height 40px
      padding 0 5px
</style>


<template lang="pug">
.my-order-tabs
  el-tabs(v-model="activeStatus" @tab-click="handleClick")
    el-tab-pane(
      v-for="item in tabPane"
      v-bind:key="item.name"
      v-bind:label="item.text"
      v-bind:name="item.name")
  el-input.input(
    v-model="keyword"
    placeholder="会员名称或运单号"
    @keyup.enter.native="search(keyword)")
    i.el-icon-search.input__icon(
      slot="suffix"
      @click="search(keyword)")
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
       * 搜索关键词
       * @type {String}
       */
      keyword: null,
      /**
       * 账户资金菜单
       * @type {Array}
       */
      tabPane: [
        {
          name: 'LINK_UP',
          text: '已沟通'
        },
        {
          name: 'NOTIFY_EXPRESS',
          text: '已配货'
        },
        {
          name: 'DISPATCHING',
          text: '已发货'
        },
        {
          name: 'DELIVERY_COMPLETE',
          text: '待付款'
        },
        {
          name: 'RETURN_EXPRESS',
          text: '退件中'
        },
        {
          name: 'END',
          text: '已结单'
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
      this.keyword = null
      this.$router.push({
        name: 'my-order',
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
        this.activeStatus = 'LINK_UP'
        this.handleClick({name: 'LINK_UP'})
      }
    },
    /**
     * 搜索
     * @function [search]
     * @param {String} keyword -关键词
     */
    search (keyword) {
      this.$emit('search', keyword)
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
