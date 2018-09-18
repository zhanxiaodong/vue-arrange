<template lang="pug">
el-card.invoice-record-card(v-bind:body-style="{display: [open ? 'block' : 'none']}")
  .invoice-record-card__header(slot="header")
    el-row
      el-col.text-center(:span="6")
        span.h-lh20(@click="open = !open") {{invoice.orderNo}}
      el-col.text-center(:span="6")
        span.va-middle {{invoice.amount}}
      el-col.text-center(:span="6")
        span.va-middle  {{invoice.invoicingStatus | orderInvoicingStatus}}
      el-col.text-right(:span="5")
        span.va-middle  {{invoice.createTime,'YYYY-MM-DD HH:mm' | timeFormat}}&nbsp;&nbsp;&nbsp;&nbsp;
        span.right-btn(type="text" @click="open = !open")
            i.el-icon-caret-bottom(v-if="!open")
            i.el-icon-caret-top(v-else)
  .invoice-record-card__body
    el-row
      el-col(:span="24")
        table.wfull.text-center
          tr
            th 发票类型
            th 联系人姓名
            th 联系电话
            th 物流详情
          tr
            td.pt10 {{invoice.invoiceType}}
            td.pt10 {{invoice.contactName}}
            td.pt10 {{invoice.contactTel}}
            td.pt10 
              li {{invoice.contactTel}}
              li {{invoice.contactTel}}
          tr
            th.pt20 邮寄地址
            th.pt20 邮政编码
            th.pt20 挂号信单号
          tr
            td.pt10 {{invoice.province}}{{invoice.city}}{{invoice.country}}{{invoice.address}}
            td.pt10 {{invoice.code}}
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
