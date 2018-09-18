<template lang="pug">
.ui-amap
  el-row
    el-col(:span="24")
      h3 {{address}}
  el-row
    el-col(:span="24")
      place-search-by-map(@address="showAddress")
  el-row.mt40
    el-col(:span="24")
      h3 {{address2}}
  el-row.mt10
    el-col(:span="24")
      place-search(@address="showAddress2")
</template>

<script>
export default {
  data () {
    return {
      /**
       * 地址信息
       * @type {Object}
       */
      address: null,
      /**
       * 地址信息
       * @type {Object}
       */
      address2: null
    }
  },
  methods: {
    /**
     * 显示地址
     * @function [showAddress]
     * @param {Object} address -地址信息
     */
    showAddress (address) {
      this.address = address
    },
    /**
     * 显示地址
     * @function [showAddress2]
     * @param {Object} address -地址信息
     */
    showAddress2 (address) {
      this.address2 = address
    }
  }
}
</script>

