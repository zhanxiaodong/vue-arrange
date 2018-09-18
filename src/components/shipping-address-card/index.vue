<template lang="pug">
el-card.shipping-address-card(v-bind:body-style="{display: [open ? 'block' : 'none']}")
  .shipping-address-card__header(slot="header")
    span.h-lh20.mr10(@click="open = !open") {{address.address.province.name}} {{address.address.city.name}} {{address.address.district.name}} {{address.address.street.name}} {{address.address.detailed}}
    el-tag(type="success" v-if="address.isDefault") 默认地址
    el-button.right-btn.color-grey2.ml60(type="text" @click="open = !open")
      i.el-icon-caret-bottom(v-if="!open")
      i.el-icon-caret-top(v-else)
    el-button.right-btn(type="text" v-if="!address.isDefault && !isSelect" @click="del") 删除
    el-button.right-btn(type="text" v-if="!isSelect" @click="edit") 编辑
    el-button.right-btn(type="text" v-if="!address.isDefault && !isSelect" @click="isDefault") 设为默认

    el-button.right-btn(type="text" v-if="isSelect" @click="select") 选择地址
  .shipping-address-card__body
    table.wfull.text-center
      tr
        th 收件人
        th 所在地区
        th 详细地址
        th 邮编
        th 联系电话
        th 备注
      tr
        td.pt10 {{address.name}}
        td.pt10 {{address.address.province.name}} {{address.address.city.name}}
        td.pt10 {{address.address.district.name}} {{address.address.street.name}} {{address.address.detailed}}
        td.pt10 {{address.code}}
        td.pt10 {{address.tel}}
        td.pt10 {{address.remark}}
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
     * 地址信息
     * @type {Object}
     */
    address: {
      type: Object,
      default: null
    },
    /**
     * 选择地址
     * @type {Object}
     */
    isSelect: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    /**
     * 删除地址
     * @function [del]
     */
    del () {
      this.$emit('del', this.address)
    },
    /**
     * 编辑地址
     * @function [edit]
     */
    edit () {
      this.$emit('edit', this.address)
    },
    /**
     * 默认地址
     * @function [isDefault]
     */
    isDefault () {
      this.$emit('isDefault', this.address)
    },
    /**
     * 选择地址
     * @function [select]
     */
    select () {
      this.$emit('select', this.address)
    }
  }
}
</script>
