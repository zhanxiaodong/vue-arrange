<template lang="pug">
.common-form
  el-form.mt20(
    label-position="left"
    ref="form"
    v-bind:model="form"
    label-width="100px")
    el-form-item(label="任务名称")
      el-input.w400(v-model="form.name" placeholder="任务名称")
    el-form-item(label="平台选择")
      el-radio-group(v-model="form.platform" @change="selectPlatform")
        el-radio(v-for="item in platform" v-bind:key="item.name" v-bind:label="item.name") {{ item.text }}
      el-tooltip(content="平台选择" placement="top")
        a.el-icon-information.color-grey2.p-as.ml10
    el-form-item(label="品牌选择" v-if="form.platform === 'brand'")
      el-select(v-model="form.brand" value-key="id")
        el-option(v-for="item in brandList" v-bind:key="item.id" v-bind:label="item.name" v-bind:value="item")
      el-tooltip(content="品牌选择" placement="top")
        a.el-icon-information.color-grey2.p-as.ml10
    el-form-item(label="店铺选择" v-if="form.platform !== 'brand'")
      el-select(v-model="form.shop" value-key="id")
        el-option(v-for="item in shopList" v-bind:key="item.id" v-bind:label="item.name" v-bind:value="item")
      el-tooltip(content="店铺选择" placement="top")
        a.el-icon-information.color-grey2.p-as.ml10
    el-form-item(label="任务选择")
      el-radio-group(v-model="form.task")
        el-radio(v-for="item in task" v-bind:key="item.name" v-bind:label="item.name") {{ item.text }}
      el-tooltip(content="任务选择" placement="top")
        a.el-icon-information.color-grey2.p-as.ml10
</template>

<script>
import { EB_PLATFORM, TASK_TYPE } from '@/common/constants'

export default {
  data () {
    return {
      /**
       * 商铺列表
       * @type {Array}
       */
      shopList: [],
      /**
       * 品牌列表
       * @type {Array}
       */
      brandList: [],
      /**
       * 平台类型
       * @type {Array}
       */
      platform: EB_PLATFORM,
      /**
       * 任务类型
       * @type {Array}
       */
      task: TASK_TYPE,
      /**
       * 基础表单
       * @type {Object}
       */
      form: {
        // 任务名称
        name: null,
        // 平台
        platform: null,
        // 品牌
        brand: null,
        // 店铺
        shop: null,
        // 任务
        task: null
      }
    }
  },
  methods: {
    /**
     * 选择平台
     * @function [selectPlatform]
     * @param {String} value - 平台
     */
    selectPlatform (value) {
      this.form.brand = null
      this.form.shop = null
      if (value === 'brand') {
        this.getBrand()
        return
      }
      this.getShop(value)
    },
    /**
     * 获取店铺
     * @function [getShop]
     * @param {String} platform - 平台
     */
    getShop (platform) {
      this.$axios.get(this.$apis.shop.getShopList, {
        params: {
          shopId: this.$store.state.user.userId,
          platform: platform
        }
      }).then((res) => {
        if (res.code === '1') {
          this.shopList = res.data
        } else {
          this.$message.error(res.message)
        }
      }).catch((errRes) => {
        this.$message.error(errRes.message)
      })
    },
    /**
     * 获取平台
     * @function [getBrand]
     */
    getBrand () {
      this.$axios.get(this.$apis.brand.getBrandListById, {
        params: {
          shopId: this.$store.state.user.userId
        }
      }).then((res) => {
        if (res.code === '1') {
          this.brandList = res.data
        } else {
          this.$message.error(res.message)
        }
      }).catch((errRes) => {
        this.$message.error(errRes.message)
      })
    },
    /**
     * 改变form
     * @function [handleChangeForm]
     */
    handleChangeForm () {
      this.$emit('change', this.form)
    }
  },
  watch: {
    form: {
      deep: true,
      /**
       * 监听对象变化
       */
      handler () {
        this.handleChangeForm()
      }
    }
  }
}
</script>
