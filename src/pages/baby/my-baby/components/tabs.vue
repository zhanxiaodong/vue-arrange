<style lang="stylus" scoped>
.my-baby-tabs
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
.my-baby-tabs
  el-input.input(
    v-model="keyword"
    placeholder="顾客名称或微信昵称或手机号"
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
       * 搜索关键词
       * @type {String}
       */
      keyword: null
    }
  },
  methods: {
    /**
     * 搜索
     * @function [search]
     * @param {String} keyword -关键词
     */
    search (keyword) {
      this.$emit('search', keyword)
    }
  }
}
</script>
