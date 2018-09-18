<template lang="pug">
.account-coupon
  el-row
    el-col(:span="24")
      .coupon-exchange
        input.coupon-exchange__input(v-model="exchangeCode" placeholder="请输入兑换码")
        button.coupon-exchange__btn(@click="exchangeCoupon") 兑换
  el-row.mt10
    el-col(:span="24")
      .w370.color-grey4
        p.pull-left
          span 您有
          span.color-green1 {{overNum}}
          span 个优惠券即将过期
        p.pull-right
          span.mr5 优惠说明
          el-tooltip(content="优惠说明" placement="top")
            i.el-icon-information
  el-row.mt20
    el-col(:span="24")
      coupon.mb20(v-for="item in coupons"
        v-bind:key="item.id"
        v-bind:coupon="item")
</template>

<script>
export default {
  data () {
    return {
      /**
       * 优惠券兑换码
       * @type {String}
       */
      exchangeCode: null,
      /**
       * 将过期的优惠券数量
       * @type {String}
       */
      overNum: '1',
      /**
       * 优惠券
       * @type {Array}
       */
      coupons: []
    }
  },
  methods: {
    /**
     * 获取账户优惠券信息
     * @function [findCouponInfo]
     */
    findCouponInfo () {
      this.$axios
        .get(this.$apis.coupon.findCouponInfo, {
          params: {
            // 商户id
            shopId: this.$store.state.user.userId
          }
        })
        .then(res => {
          if (res.code === '1') {
            this.overNum = res.data.overNum
            this.coupons = res.data.dataList
          } else {
            this.$message.error(res.message)
          }
        })
        .catch(errRes => {
          this.$message.error(errRes.message)
        })
    },
    /**
     * 商户兑换优惠券
     * @function [exchangeCoupon]
     */
    exchangeCoupon () {
      this.$axios
        .get(this.$apis.coupon.exchangeCoupon, {
          params: {
            // 商户id
            shopId: this.$store.state.user.userId,
            code: this.exchangeCode
          }
        })
        .then(res => {
          if (res.code === '1') {
            this.findCouponInfo()
          } else {
            this.$message.error(res.message)
          }
        })
        .catch(errRes => {
          this.$message.error(errRes.message)
        })
    }
  },
  mounted () {
    this.findCouponInfo()
  }
}
</script>
