<template lang="pug">
.my-invoice-recording
  el-row.header
    el-col.text-center(:span="6")
      span 订单号
    el-col.text-center(:span="6")
      span 开票金额
    el-col.text-center(:span="6")
      span 进度
    el-col.text-center(:span="6")
      span 开票时间
  el-row
  el-row
    el-col(:span="24")
      invoice-record-card.mb20(
        v-for="item in invoices"
        v-bind:key="item.id"
        v-bind:invoice="item")
</template>

<script>
export default {
  data () {
    return {
      invoices: [
        {
          id: '123',
          title: '杭州小聪聪有限公司',
          invoiceType: '增值税专用发票',
          invoicingStatus: 0,
          orderNo: '123456',
          amount: 55,
          province: '浙江省',
          city: '杭州市',
          country: '滨江区',
          address: '江陵路119号',
          code: '310000',
          contactName: '小聪聪',
          contactTel: '13600000000',
          createTime: '2017-11-11 11:22:30'
        }
      ]
    }
  },
  methods: {
    /**
     * 查看订单发票
     * @function [findOrderInvoice]
     */
    findOrderInvoice () {
      this.$axios.get(this.$apis.order.findOrderInvoice, {
        params: {
          // 商户id
          shopId: this.$store.state.user.userId,
          rderStatus: 'COMPLETE',
          invoicingStatus: '1, 2, 3, 4, 5, 6'
        }
      }).then((res) => {
        if (res.code === '1') {
          this.invoices = res.data
        } else {
          this.$message.error(res.message)
        }
      }).catch((errRes) => {
        this.$message.error(errRes.message)
      })
    }
  },
  mounted () {
    this.findOrderInvoice()
  }
}
</script>
