<template lang="pug">
.ui-cooperative-model
  el-row
    el-col(:span="24")
      h3 {{modelList}}
  el-row.mt10
    el-col(:span="24")
      cooperative-model(@selectedModel="show")
</template>

<script>
export default {
  data () {
    return {
      /**
       * 模特列表
       * @type {Array}
       */
      modelList: null
    }
  },
  methods: {
    /**
     * 显示模特
     * @function [show]
     * @param {Array} 模特列表
     */
    show (modelList) {
      this.modelList = modelList
    }
  }
}
</script>
