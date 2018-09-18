<style lang="stylus" scoped>
@import './assets/styles/common/color.styl'

#app
  .left
    overflow hidden
    z-index 1000
    position absolute
    width 200px
    top 0
    bottom 0
    left 0
    background-color $color-black3

    &__logo
      height 60px
      line-height 60px
      background-color $color-green3
      h1
        color $color-white
        text-align center

    &__body
      position fixed
      left 0
      top 180px
      bottom 0
      width 200px
      overflow-x hidden
      overflow-y auto
    
    &__new-task
      height 40px
      line-height 40px
      margin-top 30px

      &__btn
        position fixed
        top 130px
        left 20px
        height 40px
        line-height 40px
        width 150px
        padding-left 20px
        padding-right 20px
        font-size 16px
        background-color $color-blue3
        color $color-white

  .right
    position absolute
    top 0
    bottom 0
    right 0

    &__header
      position fixed
      top 0
      right 0
      left 200px
      z-index 1000

    &__body
      position absolute
      padding 40px 30px 80px 30px
      bottom 0
      right 0
      left 0
      overflow-x auto
      overflow-y auto
</style>

<template lang="pug">
  #app
    .left(v-if="menuVisible")
      .left__logo
        h1 MINIANYS
      .left__new-task
        router-link.left__new-task__btn(
          v-bind:to="{ name: 'new-task' }"
        ) 新建盒子
      .left__body
        sidebar
    .right(v-bind:class="[!menuVisible ? 'l0' : 'l200']")
      .right__header(v-if="menuVisible")
        navbar
      .right__body(
        v-bind:class="[!menuVisible ? 't0' : 't60']")
        router-view
</template>

<script>
/**
 * 不显示菜单的路由
 * @type {Array}
 */
const noMenuRoutes = [
  'user-login',
  'user-forget-pwd',
  'input-user-info',
  'input-phone-info',
  'input-other-info',
  'user-info-submit-success',
  'user-reset-pwd',
  '404'
]

export default {
  name: 'app',
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
     * 检查路由
     * @function [checkRoute]
     * @param {Array} arr 路由name数组
     * @return {Boolean}
     */
    checkRoute (arr) {
      const route = this.$route
      if (!(arr instanceof Array)) return false
      if (route && route.name && route.name.indexOf('ui') >= 0) return false
      return route && route.name ? arr.indexOf(route.name) === -1 : false
    }
  }
}
</script>
