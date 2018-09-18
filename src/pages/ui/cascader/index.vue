<template lang="pug">
.cascader
  el-row
    el-col(:span="24")
      h3.mb20 模特要求级联选择器
      model-request-cascader(@request="showRequest")
  el-row.mt20
    el-col(:span="24")
      h3 {{request}}
  el-row.mt20
    el-col(:span="24")
      h3.mb20 地区级联选择器
      city-address-select(@city="showCity")
  el-row.mt20
    el-col(:span="24")
      h3 {{city}}
</template>

<script>
export default {
  data () {
    return {
      /**
       * 模特要求
       * @type {Object}
       */
      request: null,
      /**
       * 城市
       * @type {Object}
       */
      city: null
    }
  },
  methods: {
    /**
     * @function [showRequest]
     * @param {Object} request -模特要求
     */
    showRequest (request) {
      this.request = request
    },
    /**
     * @function [showCity]
     * @param {Object} city -城市
     */
    showCity (city) {
      this.city = city
    }
  }
}
</script>
