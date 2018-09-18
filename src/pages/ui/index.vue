<template lang="pug">
.ui
  el-row
    el-col(:span="24")
      el-button(type="text" @click="home") home
  el-row.mt20
    el-col(:span="24")
      el-tabs(v-model="$router.name" @tab-click="handleClick")
        el-tab-pane(
          v-for="item in tabPane"
          v-bind:key="item.name"
          v-bind:label="item.text"
          v-bind:name="item.name")
  el-row.mt40
    el-col(:span="24")
      router-view
</template>

<script>
export default {
  data () {
    return {
      /**
       * 标签页
       * @type {Array}
       */
      tabPane: [
        {
          name: 'ui-cascader',
          text: '级联选择器'
        },
        {
          name: 'ui-slide-unlock',
          text: '滑动解锁'
        },
        {
          name: 'ui-card',
          text: '卡片'
        },
        {
          name: 'ui-amap',
          text: '地图'
        },
        {
          name: 'ui-coupon',
          text: '优惠券'
        },
        {
          name: 'ui-menu',
          text: '菜单'
        },
        {
          name: 'ui-address',
          text: '地址'
        },
        {
          name: 'ui-cooperative-model',
          text: '合作模特'
        },
        {
          name: 'ui-upload-avatar',
          text: '上传头像'
        }
      ]
    }
  },
  methods: {
    /**
     * 前往首页
     * @function [home]
     */
    home () {
      this.$router.push({
        name: 'home'
      })
    },
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
  }
}
</script>
