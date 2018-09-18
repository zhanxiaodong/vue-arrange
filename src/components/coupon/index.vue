<template lang="pug">
.coupon(v-if="days >= 0")
  .coupon__card.p-rl(v-bind:class="[days < 7 ? 'top-red' : 'top-green']")
    span.p-as.coupon__card__status(v-if="days < 7") 即将过期
    .coupon__card__left(v-bind:class="[days < 7 ? 'color-red1' : 'color-green1']")
      span.va-super.ft-bd ￥
      span.ft40.va-wk-baseline.ft-bd {{coupon.amount}}
    .coupon__card__right
      p 适用范围:
      p {{coupon.content}}
      p 有效期至: {{coupon.effectTime}}
  span.coupon__num.ft24.ml20.va-wk-baseline(v-bind:class="[days < 7 ? 'color-red1' : 'color-green1']") x{{coupon.num}}
</template>

<script>
export default {
  props: {
    /**
     * 地址信息
     * @type {Object}
     */
    coupon: {
      type: Object,
      default: null
    }
  },
  computed: {
    /**
     * 过期天数
     * @type {Int}
     * @returns {Int}
     */
    days () {
      const today = new Date()
      const date = new Date(this.coupon.effectTime)
      return Math.floor((date - today) / 24 / 3600 / 1000 + 1)
    }
  }
}
</script>
