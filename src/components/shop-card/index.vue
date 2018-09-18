<template lang="pug">
el-card.shop-card(v-bind:body-style="{display: [open ? 'block' : 'none']}")
  .shop-card__header(slot="header")
    span.h-lh20(@click="open = !open") {{ shop.name }}
    el-button.right-btn.color-grey2.ml60(type="text" @click="open = !open")
      i.el-icon-caret-bottom(v-if="!open")
      i.el-icon-caret-top(v-else)
    el-button.right-btn.color-grey1(type="text" @click="del") 删除
    el-button.right-btn.color-grey1(type="text" @click="edit") 编辑
  .shop-card__body
    table.text-left
      tr
        th.w20p Logo
        th.w20p 业务平台
        th.w20p 品牌店铺
      tr
        td.pt10
          img.w80.h80(v-bind:src="shop.avatar")
        td.pt10 {{shop.platform | ebPlatform}}
        td.pt10 {{shop.name}}

</template>

<script>
export default {
  data () {
    return {
      /**
       * 是否展开
       * @type {Boolean}
       */
      open: false
    }
  },
  props: {
    /**
     * 店铺信息
     * @type {Object}
     */
    shop: {
      type: Object,
      default: null
    }
  },
  methods: {
    /**
     * 编辑
     * @function [edit]
     */
    edit () {
      this.$emit('edit', this.shop)
    },
    /**
     * 删除
     * @function [del]
     */
    del () {
      this.$emit('del', this.shop)
    }
  }
}
</script>
