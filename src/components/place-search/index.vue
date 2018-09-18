<template lang="pug">
.place-search
  el-row(:gutter="10")
    el-col(:span="4")
      el-select(
        placeholder="请选择"
        v-model="address.province"
        value-key="adcode"
        @visible-change="districtSearch('中国', 'country', 1)"
        @change="selectProvince")
        el-option(
          v-for="item in options"
          v-bind:key="item.adcode"
          v-bind:label="item.name"
          v-bind:value="item")
    el-col(:span="4")
      el-select(
        placeholder="请选择"
        v-model="address.city"
        value-key="adcode"
        @visible-change="districtSearch(address.province.name, 'province', 1)"
        @change="selectCity")
        el-option(
          v-for="item in options"
          v-bind:key="item.adcode"
          v-bind:label="item.name"
          v-bind:value="item")
    el-col(:span="4")
      el-select(
        placeholder="请选择"
        v-model="address.district"
        value-key="adcode"
        @visible-change="districtSearch(address.city.name, 'city', 1)"
        @change="selectDistrict")
        el-option(
          v-for="item in options"
          v-bind:key="item.adcode"
          v-bind:label="item.name"
          v-bind:value="item")
    el-col.p-rl(:span="12")
      el-input(
        placeholder="请输入街道地址"
        v-model="keyword"
        @change="search"
        @keyup.enter.native="search")
      .street-addr-list(v-if="streetAddrList")
        ul
          li(
            v-for="item in streetAddrList"
            v-bind:key="item.id"
            @click="selectStreet(item)") {{item.name}}
  el-row.mt10
    el-col(:span="24")
      el-input(
        placeholder="请输入门牌号"
        v-model="address.detailed"
        @keyup.enter.native="save")
      el-button.p-as.r10.t5(type="success" size="small" @click="save") 选择地址
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
      address: {
        // 省
        province: null,
        // 市
        city: null,
        // 区域（区、县、镇...）
        district: null,
        // 街道
        street: null,
        // 门牌号
        detailed: null
      },
      /**
       * 地址选项
       * @type {Array}
       */
      options: [],
      /**
       * 搜索关键词
       * @type {Object}
       */
      keyword: null,
      /**
       * 区域地址列表
       * @type {Object}
       */
      streetAddrList: null
    }
  },
  methods: {
    /**
     * 区域搜索
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
     * 搜索地址
     * @function [search]
     */
    search () {
      if (!this.address.city) {
        this.$message.error('请选择城市')
        return
      }
      amap.placeSearch(this.keyword, {
        city: this.address.district.adcode,
        pageIndex: '1',
        pageSize: '20'
      })
        .then((res) => {
          this.streetAddrList = res.pois
        })
    },
    /**
     * 选择省
     * @function [selectProvince]
     */
    selectProvince () {
      this.keyword = null
      this.address.city = null
      this.address.district = null
      this.address.street = null
      this.address.detailed = null
    },
    /**
     * 选择城市
     * @function [selectCity]
     */
    selectCity () {
      this.keyword = null
      this.address.district = null
      this.address.street = null
      this.address.detailed = null
    },
    /**
     * 选择区域（区、县、镇...）
     * @function [selectDistrict]
     */
    selectDistrict () {
      this.keyword = null
      this.address.street = null
      this.address.detailed = null
    },
    /**
     * 选择街道
     * @function [selectStreet]
     * @param {Object} item - 街道信息
     */
    selectStreet (item) {
      this.address.street = item
      this.keyword = item.name
      this.streetAddrList = null
      this.address.detailed = null
    },
    /**
     * 保存地址
     * @function [save]
     */
    save () {
      if (!this.address.street) {
        this.$message.error('请完善地址')
      }
      this.$emit('address', this.address)
    }
  }
}
</script>
