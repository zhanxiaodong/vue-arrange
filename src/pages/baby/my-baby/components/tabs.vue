<style lang="stylus" scoped>
.my-baby-tabs
  position relative
  
  .select
    position absolute
    right 260px
    width 160px
    bottom 25px
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
  el-select.select(v-model="level" placeholder="请选择用户等级" clearable @change="search()")
    el-option(v-for="item in levelType" v-bind:key="item.name" v-bind:label="item.text" v-bind:value="item.name")
  el-input.input(
    v-model="keyword"
    placeholder="顾客名称或微信昵称或手机号"
    @keyup.enter.native="search()")
    i.el-icon-search.input__icon(
      slot="suffix"
      @click="search()")
</template>

<script>
export default {
  data () {
    return {
      /**
       * 搜索关键词
       * @type {String}
       */
      keyword: null,
      level: null,
      levelType: [
        {name:0,text:'访客用户'},
        {name:10,text:'注册用户'},
        {name:20,text:'体验用户'},
        {name:40,text:'年度会员'},
        {name:50,text:'迷你会员'},
      ]
    }
  },
  methods: {
    /**
     * 搜索
     * @function [search]
     * @param {String} keyword -关键词
     */
    search () {
      var keyword = this.keyword
      var level = this.level
      this.$emit('search', keyword,level)
    }
  }
}
</script>
