<template lang="pug">
  el-menu.navbar(
    mode="horizontal"
  )
    .menu.pull-right
      el-menu-item.menu__item(
        v-for="item in menu" 
        v-bind:key="item.name"
        v-bind:index="item.name"
        v-bind:default-active="activeIndex"
        @click="select(item)") {{ item.text }}
</template>

<script>
import { NAVBAR_MENU } from '@/common/constants'
import { getUserInfo } from '@/utils/index'

export default {
  data () {
    return {
      /**
       * 当前索引值
       * @type {Int}
       */
      activeIndex: null,
      /**
       * 菜单
       * @type {Array}
       */
      menu: NAVBAR_MENU
    }
  },
  methods: {
    /**
     * 菜单选择
     * @function [select]
     * @param {Object} item
     */
    select (item) {
      if (item.name === 'back') {
        this.$router.go(-1)
        return
      }
      if (item.name === 'logout') {
        this.logout()
        return
      }
      this.activeIndex = item.name
      this.$router.push({
        name: item.name
      })
    },
    /**
     * 登出
     * @function [logout]
     */
    logout () {
      this.$store.dispatch('user/delUserInfo').then(() => {
        this.$router.push({
          name: 'user-login'
        })
      })
    }
  },
  created () {
    getUserInfo().then((res) => {
      this.menu[1].text = '退出登录'
    })
  }
}
</script>
