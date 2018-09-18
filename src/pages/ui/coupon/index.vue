<template lang="pug">
.ui-coupon
  el-row
    el-col(:span="24")
      h1 ui coupon
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
       * 优惠券
       * @type {Array}
       */
      coupons: [
        {
          id: '1',
          money: '10',
          day: '2099-10-17',
          num: '1'
        },
        {
          id: '1',
          money: '10',
          day: '2099-10-18',
          num: '1'
        },
        {
          id: '2',
          money: '15',
          day: '2099-11-10',
          num: '5'
        },
        {
          id: '3',
          money: '20',
          day: '2099-11-10',
          num: '3'
        }
      ]
    }
  }
}
</script>
