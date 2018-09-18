<template lang="pug">
.ui-upload-avatar
  el-row
    el-col(:span="24")
      h3 {{url}}
  el-row.mt20
    el-col(:span="24")
      h4.mb10 无默认图片
      upload-avatar(@url="showUrl")
  el-row.mt20
    el-col(:span="24")
      h4.mb10 有默认图片
      upload-avatar(@url="showUrl" v-bind:defaultUrl="defaultUrl")
</template>

<script>
export default {
  data () {
    return {
      /**
       * 链接
       * @type {String}
       */
      url: null,
      /**
       * 默认图片地址
       * @type {String}
       */
      defaultUrl: 'http://qiniu.bananayc.com/1510302558586_WEB_fd236dcad829af9.png'
    }
  },
  methods: {
    /**
     * 显示图片
     * @function [showUrl]
     * @param {String} url -图片链接
     */
    showUrl (url) {
      this.url = url
    }
  }
}
</script>
