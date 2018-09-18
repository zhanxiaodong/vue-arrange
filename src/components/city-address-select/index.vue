<template lang="pug">
.city-address-select.pull-left
  el-row
    el-col(:span="24")
      el-select.w150.mr10(
        placeholder="请选择"
        v-model="area.province"
        value-key="adcode"
        @visible-change="districtSearch('中国', 'country', 1)"
        @change="area.city = null")
        el-option(
          v-for="item in options"
          v-bind:key="item.adcode"
          v-bind:label="item.name"
          v-bind:value="item")
      el-select.w150.mr10(
        placeholder="请选择"
        v-model="area.city"
        value-key="adcode"
        @visible-change="districtSearch(area.province.name, 'province', 1)"
        @change="area.district = null")
        el-option(
          v-for="item in options"
          v-bind:key="item.adcode"
          v-bind:label="item.name"
          v-bind:value="item")
      el-select.w150.mr10(
        placeholder="请选择"
        v-model="area.district"
        value-key="adcode"
        @visible-change="districtSearch(area.city.name, 'city', 1)"
        @change="handleChange")
        el-option(
          v-for="item in options"
          v-bind:key="item.adcode"
          v-bind:label="item.name"
          v-bind:value="item")
</template>

<script>
import amap from '@/utils/amap.js'
export default {
  data () {
    return {
      /**
       * 地区
       * @type {Object}
       */
      area: {
        // 省
        province: null,
        // 市
        city: null,
        // 区
        district: null
      },
      /**
       * 地址选项
       * @type {Array}
       */
      options: []
    }
  },
  methods: {
    /**
     * 行政区信息信息搜索
     * @function [districtSearch]
     * @param {String} keyword - 搜索关键词
     * @param {String} level - 要查询的关键字对应的行政级别或商圈(可选值：country、province、city、district、biz_area)
     * @param {Int} subdistrict - 期望返回多少级下级行政区信息(可选值：0、1、2、3)
     */
    districtSearch (keyword, level, subdistrict) {
      amap.districtSearch(keyword, level, subdistrict)
        .then((res) => {
          this.options = res[0].districtList
        })
    },
    /**
     * 处理地址改变结果
     * @function [handleChange]
     */
    handleChange () {
      this.$emit('city', this.area)
    }
  }
}
</script>
