<template lang="pug">
.place-search-by-map.h500
  .map.wh-full.p-rl(ref="map")
    .map__address
      el-row.z1(:gutter="10")
        el-col(:span="4")
          el-select(
            placeholder="请选择省"
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
            placeholder="请选择市"
            v-model="address.city"
            value-key="adcode"
            @visible-change="districtSearch(address.province, 'province', 1)"
            @change="selectCity")
            el-option(
              v-for="item in options"
              v-bind:key="item.adcode"
              v-bind:label="item.name"
              v-bind:value="item")
        el-col(:span="4")
          el-select(
            placeholder="请选择区"
            v-model="address.district"
            value-key="adcode"
            @visible-change="districtSearch(address.city, 'city', 1)"
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
          .map__address__street-list(v-if="streetAddrList")
            ul
              li(
                v-for="item in streetAddrList"
                v-bind:key="item.id"
                @click="selectStreet(item)") {{item.name}}
      el-row.mt10
        el-col.p-rl(:span="24")
          el-input(
            placeholder="请输入门牌号"
            v-model="address.detailed"
            @keyup.enter.native="save")
          el-button.p-as.r10(type="success" size="small" @click="save") 选择地址
</template>

<script>
import amap from '@/utils/amap.js'

export default {
  props: {
    /**
     * 默认地址信息
     * @type {Object}
     */
    defaultAddress: {
      type: Object,
      default: null
    }
  },
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
       * 还原地址
       * @type {Boolean}
       */
      isRecoverAddress: true,
      /**
       * 地址选项
       * @type {Array}
       */
      options: [],
      /**
       * 地图
       * @type {Object}
       */
      map: null,
      /**
       * 高德
       * @type {Object}
       */
      amap: null,
      /**
       * 搜索关键词
       * @type {Object}
       */
      keyword: null,
      /**
       * 区域地址列表
       * @type {Object}
       */
      streetAddrList: null,
      /**
       * 标记点
       * @type {Object}
       */
      marker: null
    }
  },
  methods: {
    /**
     * 初始化地图
     * @function [initAmap]
     */
    initAmap () {
      amap.ready((AMap) => {
        this.amap = AMap
        this.map = new AMap.Map(this.$refs.map, {
          resizeEnable: true,
          center: [120.137, 30.253],
          zoom: 10
        })
      })
    },
    /**
     * 区域搜索
     * @function [districtSearch]
     * @param {String} keyword - 搜索关键词
     * @param {String} level - 要查询的关键字对应的行政级别或商圈(可选值：country、province、city、district、biz_area)
     * @param {Int} subdistrict - 期望返回多少级下级行政区信息(可选值：0、1、2、3)
     */
    districtSearch (keyword, level, subdistrict) {
      console.log('districSearch----' + level)
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
      if (!this.isRecoverAddress) {
        this.keyword = null
        this.address.city = null
        this.address.district = null
        this.address.street = null
        this.address.detailed = null
        if (this.address.province.center) {
          this.setMapCenter(this.address.province.center)
        }
      }
    },
    /**
     * 选择城市
     * @function [selectCity]
     */
    selectCity () {
      if (!this.isRecoverAddress) {
        this.keyword = null
        this.address.district = null
        this.address.street = null
        this.address.detailed = null
        if (this.address.city) {
          this.setMapCenter(this.address.city.center)
        }
      }
    },
    /**
     * 选择区域（区、县、镇...）
     * @function [selectDistrict]
     */
    selectDistrict () {
      if (!this.isRecoverAddress) {
        this.keyword = null
        this.address.street = null
        this.address.detailed = null
        if (this.address.district) {
          this.setMapCenter(this.address.district.center)
        }
      }
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
      if (this.address.street) {
        this.setMapCenter(this.address.street.location)
        this.addMarker(this.address.street.location.lng, this.address.street.location.lat)
      }
    },
    /**
     * 设置地图中心点
     * @function [setMapCenter]
     * @param {Object} center - 中心点
     */
    setMapCenter (center) {
      if (!center) {
        return
      }
      this.clearMarker()
      setTimeout(() => {
        this.map.setCenter(center)
        this.map.setFitView()
      }, 500)
    },
    /**
     * 清除标记点
     * @function [clearMarker]
     */
    clearMarker () {
      if (this.marker) {
        this.marker.setMap(null)
        this.marker = null
      }
    },
    /**
     * 绘制地图中心点
     * @function [addMarker]
     * @param {String} lng -经度
     * @param {String} lat -纬度
     */
    addMarker (lng, lat) {
      const AMap = this.amap
      if (!AMap) {
        return
      }
      this.clearMarker()
      const marker = this.marker = new AMap.Marker({
        icon: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
        position: [lng, lat]
      })
      marker.setMap(this.map)
      this.map.setFitView()
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
    },
    /**
     * 还原地址
     * @function [recoverAddress]
     */
    recoverAddress () {
      return new Promise((resolve) => {
        this.isRecoverAddress = true
        if ((this.defaultAddress && this.defaultAddress.street === null) || !this.defaultAddress) {
          this.address.province = null
          this.address.city = null
          this.address.district = null
          this.address.street = null
          this.address.detailed = null
          this.keyword = null
          this.clearMarker()
          this.setMapCenter([120.137, 30.253])
          resolve()
        } else {
          this.address.province = this.defaultAddress.province
          this.address.city = this.defaultAddress.city
          this.address.district = this.defaultAddress.district
          this.address.street = this.defaultAddress.street
          this.address.detailed = this.defaultAddress.detailed
          this.keyword = this.defaultAddress.street.name
          this.districtSearch('中国', 'country', 1)
          this.districtSearch(this.defaultAddress.province, 'province', 1)
          this.districtSearch(this.defaultAddress.city, 'city', 1)
          this.setMapCenter(this.defaultAddress.street.location)
          this.addMarker(this.defaultAddress.street.location.lng, this.defaultAddress.street.location.lat)
          resolve()
        }
      })
    },
    /**
     * 初始化地址
     * @function [initAddress]
     */
    initAddress () {
      this.recoverAddress().then(() => {
        // 还原地址成功
        this.isRecoverAddress = false
      })
    }
  },
  created () {
    this.initAmap()
    this.initAddress()
  },
  watch: {
    defaultAddress: {
      deep: true,
      /**
       * 监听对象变化
       */
      handler () {
        this.initAddress()
      }
    }
  }
}
</script>

