<template lang="pug">
.ui-address
  el-row
    el-col(:span="24")
     h3 {{address}}
  el-row.mt40
    el-col(:span="24")
      h3 选择拍摄地址
      select-address(v-bind:type="'shoot'" @address="show")
  el-row.mt40
    el-col(:span="24")
      h3 选择邮寄地址
      select-address(v-bind:type="'shipping'" @address="show")
</template>

<script>
export default {
  data () {
    return {
      /**
       * 地址
       * @type {Object}
       */
      address: null
    }
  },
  methods: {
    /**
     * 显示地址
     * @function [show]
     * @param {Object} address -地址信息
     */
    show (address) {
      this.address = address
    }
  }
}
</script>
