<template lang="pug">
el-card.receipt-card(v-bind:body-style="{display: [open ? 'block' : 'none']}")
  .receipt-card__header(slot="header")
    el-row
      el-col(:span="18")
        span.h-lh20(@click="open = !open") {{receipt.time,'YYYY-MM-DD HH:mm' | timeFormat}}&nbsp;&nbsp;{{receipt.name}}{{receipt.type | businessDealType}}
      el-col(:span="6")
        span.va-middle {{receipt.type, receipt.money | businessDealMoney}}
        el-button.right-btn.color-grey2.ml60(type="text" @click="open = !open")
          i.el-icon-caret-bottom(v-if="!open")
          i.el-icon-caret-top(v-else)
        span.pull-right {{receipt.status | businessDealStatus}}
  .receipt-card__body
    el-row
      el-col(:span="24")
        table.wfull.text-center
          tr
            th 流水号
            th 付款方
            th 收款方
            th 联系电话
            th 订单金额
            th 说明
            th 来源
          tr
            td.pt10 {{receipt.serialNumber}}
            td.pt10 {{receipt.payer}}
            td.pt10 {{receipt.payee}}
            td.pt10 {{receipt.payeePhone}}
            td.pt10 {{receipt.money}}
            td.pt10 {{receipt.desc}}
            td.pt10 {{receipt.from | businessDealFrom}}
</template>

<script>
export default {
  data () {
    return {
      /**
       * 是否展开
       * @type {Object}
       */
      open: false
    }
  },
  props: {
    /**
     * 交易信息
     * @type {Object}
     */
    receipt: {
      type: Object,
      default: null
    }
  }
}
</script>
