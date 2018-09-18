<template lang="pug">
el-card.invoice-card(v-bind:body-style="{display: [open ? 'block' : 'none']}")
  .invoice-card__header(slot="header")
    span.h-lh20(@click="open = !open") {{ invoice.title }} {{invoice.identNum}} {{invoice.province}}{{invoice.city}}{{invoice.address}}{{invoice.address.details}}
    el-button.right-btn.color-grey2.ml60(type="text" @click="open = !open")
      i.el-icon-caret-bottom(v-if="!open")
      i.el-icon-caret-top(v-else)
    el-button.right-btn(type="text" @click="del") 删除
  .invoice-card__body
    el-row
      el-col(:span="24")
        table.wfull.text-center
          tr
            th 发票抬头
            th 纳税识别号
            th 企业注册地址
            th 注册电话
            th 企业开户银行
            th 企业银行账户
          tr
            td.pt10 {{invoice.title}}
            td.pt10 {{invoice.identNum}}
            td.pt10 {{invoice.regAddress}}
            td.pt10 {{invoice.regTel}}
            td.pt10 {{invoice.regBank}}
            td.pt10 {{invoice.regBankNum}}
          tr
            th.pt20 邮寄地址
            th.pt20 邮政编码
            th.pt20 联系人
            th.pt20 联系电话
          tr
            td.pt10 {{invoice.province}}{{invoice.city}}{{invoice.country}}{{invoice.address}}
            td.pt10 {{invoice.code}}
            td.pt10 {{invoice.contactName}}
            td.pt10 {{invoice.contactTel}}
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
     * 发票信息
     * @type {Object}
     */
    invoice: {
      type: Object,
      default: null
    }
  },
  methods: {
    /**
     * 删除
     * @function [del]
     */
    del () {
      this.$emit('del', this.invoice)
    }
  }
}
</script>
