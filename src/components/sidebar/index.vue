<template lang="pug">
  el-menu.sidebar(:default-active="activeItem")
    el-submenu.sidebar__second-menu(
      v-for="item in menu"
      v-bind:key="item.name"
      v-bind:index="item.name")
      template(slot="title")
        span {{ item.text }}
      el-menu-item(
        v-for="menuItem in item.secondMenu"
        v-bind:key="menuItem.name"
        v-bind:index="menuItem.name"
        @click="select(menuItem)")
          i.dit
          span {{ menuItem.text }}
</template>

<script>
import { SIDEBAR_MENU } from '../../common/constants.js'

export default {
  data () {
    return {
      /**
       * 菜单
       * @type {Array}
       */
      menu: SIDEBAR_MENU,
      /**
       * 当前索引值
       * @type {Int}
       */
      activeItem: null
    }
  },
  methods: {
    /**
     * 菜单选择
     * @function [select]
     * @param {Object} item
     */
    select (item) {
      this.activeItem = item.name
      this.$router.push({
        name: item.name
      })
    }
  },
  watch: {
    $route () {
      if (this.$route.name === 'new-task') {
        this.activeItem = null
      }
    }
  }
}
</script>
