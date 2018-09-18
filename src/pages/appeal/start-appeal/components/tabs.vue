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
    placeholder="款号"
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
          name: 'ALL',
          text: '所有商品'
        },
        {
          name: 'TEMP',
          text: '未发布'
        },
        {
          name: 'RELEASE',
          text: '已发布'
        },
        {
          name: 'CLEAR',
          text: '已清算'
        },
        {
          name: 'DISABLED',
          text: '售罄'
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
        name: 'start-appeal',
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
        this.activeStatus = 'ALL'
        this.handleClick({name: 'ALL'})
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
