<template lang="pug">
el-card.brand-card(v-bind:body-style="{display: [open ? 'block' : 'none']}")
  .brand-card__header(slot="header")
    span.h-lh20(@click="open = !open") {{ brand.name }}
    el-button.right-btn.color-grey2.ml60(type="text" @click="open = !open")
      i.el-icon-caret-bottom(v-if="!open")
      i.el-icon-caret-top(v-else)
    el-button.right-btn.color-grey1(type="text" @click="del") 删除
    el-button.right-btn.color-grey1(type="text" @click="edit") 编辑
  .brand-card__body
    table.text-left
      tr
        th.w20p Logo
        th.w20p 品牌名称
      tr
        td.pt10
          img.w80.h80(v-bind:src="brand.avatar")
        td.pt10 {{brand.name}}

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
    brand: {
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
      this.$emit('edit', this.brand)
    },
    /**
     * 删除
     * @function [del]
     */
    del () {
      this.$emit('del', this.brand)
    }
  }
}
</script>
