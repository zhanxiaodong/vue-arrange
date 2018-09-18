<template lang="pug">
.model-request-cascader
  el-cascader(
    ref="modelRequestCascader"
    expand-trigger="hover"
    v-model="selectOptions"
    v-bind:options="options"
    v-bind:props="props"
    @change="handleChange"
    size="small"
    clearable)
</template>

<script>
import { CLOTHING } from './clothing'

export default {
  data () {
    return {
      /**
       * 选中的数据
       * @type {Array}
       */
      selectOptions: null,
      /**
       * 可选项数据源
       * @type {Array}
       */
      options: CLOTHING,
      /**
       * 配置选项
       * @type {Object}
       */
      props: {
        value: 'label'
      }
    }
  },
  methods: {
    /**
     * 处理选择结果
     * @function [handleChange]
     * @param {Array} value
     */
    handleChange (value) {
      this.$emit('request', value)
    }
  }
}
</script>
