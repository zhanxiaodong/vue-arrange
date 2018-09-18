<template lang="pug">
.base-site
  el-form.mt20(
    label-position="left"
    ref="form"
    v-bind:model="form"
    v-bind:rules="formRules"
    label-width="100px")
    el-form-item(label="活动类型" required)
      el-radio-group(v-model="form.activityType")
        el-radio(v-for="item in activityType" v-bind:key="item.name" v-bind:label="item.name") {{ item.text }}
    el-form-item(label="活动对象" v-if="form.activityType === 'show'" required)
      el-form-item.pull-left.w194.mr10(prop="type")
        el-select(v-model="form.sex" placeholder="性别")
          el-option(v-for="item in sex" v-bind:key="item.name" v-bind:label="item.text" v-bind:value="item.name")
      el-form-item.pull-left.w194(prop="size_0")
        el-select(v-model="form.size[0]" placeholder="尺码")
          el-option(v-for="item in size" v-bind:key="item.num" v-bind:label="item.num" v-bind:value="item.num")
      span.ml10.mr10.pull-left ~
      el-form-item.pull-left.w194(prop="size_1")
        el-select(v-model="form.size[1]" placeholder="尺码")
          el-option(
            v-for="item in size"
            v-bind:key="item.num"
            v-bind:label="item.num"
            v-bind:value="item.num"
            v-bind:disabled="item.num <= form.size[0]")
    el-form-item(label="产品属性" required)
      el-form-item.pull-left.w194.mr10(prop="season")
        el-select.w194.mr20(v-model="form.season" placeholder="季节")
          el-option(v-for="item in season" v-bind:key="item.name" v-bind:label="item.text" v-bind:value="item.name")
      el-form-item.pull-left.w194.mr10(prop="style")
        el-select.w194(v-model="form.style" placeholder="风格")
          el-option(v-for="item in style" v-bind:key="item.name" v-bind:label="item.text" v-bind:value="item.name")
    el-form-item(label="拍摄类型" v-if="form.activityType === 'shoot'" required)
      el-form-item.pull-left.w194.mr10(prop="shootingType")
        el-select.w194.mr20(v-model="form.shootingType" placeholder="拍摄种类")
          el-option(v-for="item in shootingType" v-bind:key="item.name" v-bind:label="item.text" v-bind:value="item.name")
      el-form-item.pull-left.w194.mr10(prop="shootingScenes")
        el-select.w194(v-model="form.shootingScenes" placeholder="拍摄场景")
          el-option(v-for="item in shootingScenes" v-bind:key="item.name" v-bind:label="item.text" v-bind:value="item.name")
    el-form-item(label="拍摄数量" v-if="form.activityType === 'shoot'" prop="shootingNum")
      el-input.w194(type="number" v-model="form.shootingNum" placeholder="拍摄数量")
    el-form-item(label="走秀类型" v-if="form.activityType === 'show'" required)
      el-form-item.pull-left.w194.mr10(prop="showType")
        el-select.w194.mr20(v-model="form.showType" placeholder="走秀种类")
          el-option(v-for="item in showType" v-bind:key="item.name" v-bind:label="item.text" v-bind:value="item.name")
    el-form-item(label="走秀数量" v-if="form.activityType === 'show'" prop="showNum")
      el-input.w194(type="number" v-model="form.showNum" placeholder="走秀数量")
</template>

<script>
import {
  COMMODITY_TYPE,
  COMMODITY_SIZE,
  SHOW_TYPE,
  PRODUCT_SEASON,
  PRODUCT_STYLE,
  SHOOTING_TYPE,
  SHOOTING_SCENES,
  ACTIVITY_TYPE } from '@/common/constants'

export default {
  data () {
    return {
      /**
       * 基础设置表单
       * @type {Object}
       */
      form: {
        // 活动类型 -shoot 拍摄; -show 走秀
        activityType: 'shoot',
        // 活动对象性别
        sex: null,
        // 活动对象尺寸
        size: [null, null],
        // 季节
        season: null,
        // 风格
        style: null,
        // 拍摄种类
        shootingType: null,
        // 拍摄场景
        shootingScenes: null,
        // 拍摄数量
        shootingNum: null,
        // 走秀类型
        showType: null,
        // 走秀数量
        showNum: null
      },
      /**
       * 表单规则
       * @type {JSON}
       */
      formRules: {
        brand: [
          { required: true, message: '请输入品牌名称', trigger: 'blur' }
        ],
        season: [
          { required: true, message: '请选择产品季节', trigger: 'blur' }
        ],
        style: [
          { required: true, message: '请选择产品风格', trigger: 'blur' }
        ],
        shootingType: [
          { required: true, message: '请选择拍摄类型', trigger: 'blur' }
        ],
        shootingScenes: [
          { required: true, message: '请选择拍摄场景', trigger: 'blur' }
        ],
        shootingNum: [
          { required: true, message: '请输入拍摄数量', trigger: 'blur' }
        ],
        showNum: [
          { required: true, message: '请输入走秀数量', trigger: 'blur' }
        ]
      },
      /**
       * 活动类型
       * @type {Array}
       */
      activityType: ACTIVITY_TYPE,
      /**
       * 季节
       * @type {Array}
       */
      season: PRODUCT_SEASON,
      /**
       * 风格
       * @type {Array}
       */
      style: PRODUCT_STYLE,
      /**
       * 拍摄种类
       * @type {Array}
       */
      shootingType: SHOOTING_TYPE,
      /**
       * 拍摄场景
       * @type {Array}
       */
      shootingScenes: SHOOTING_SCENES,
      /**
       * 活动对象性别
       * @type {Array}
       */
      sex: COMMODITY_TYPE,
      /**
       * 活动对象尺寸
       * @type {Object}
       */
      size: COMMODITY_SIZE(),
      /**
       * 走秀类型
       * @type {Array}
       */
      showType: SHOW_TYPE
    }
  },
  methods: {
    /**
     * 改变from
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
