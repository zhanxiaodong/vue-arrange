<template lang="pug">
el-upload.upload-avatar(
  ref="upload"
  drag
  v-bind:action="qiniu.actionHttp"
  v-bind:data="form"
  v-bind:show-file-list="false"
  v-bind:before-upload="beforeAvatarUpload"
  v-bind:on-success="handleAvatarSuccess")
  img.avatar(v-bind:src="imgUrl" v-if="imgUrl")
  div(v-else)
    i.el-icon-plus.avatar-uploader-icon
    .el-upload__text 将图片拖拽至此
</template>

<script>
import qiniu from '@/common/qiniu'

export default {
  props: {
    /**
     * 默认链接
     * @type {String}
     */
    defaultUrl: {
      default: String,
      type: null
    }
  },
  mounted () {
    this.imgUrl = this.defaultUrl
  },
  watch: {
    /**
     * 监听默认链接变化
     */
    defaultUrl: {
      deep: true,
      handler () {
        this.imgUrl = this.defaultUrl
      }
    }
  },
  data () {
    return {
      /**
       * 七牛相关参数
       * @type {Object}
       */
      qiniu: qiniu,
      /**
       * 文件上传表单
       * @type {Object}
       */
      form: null,
      /**
       * 图片链接
       * @type {String}
       */
      imgUrl: null
    }
  },
  methods: {
    /**
     * 上传头像前处理
     * @function [beforeAvatarUpload]
     * @param {Object} file -文件
     */
    beforeAvatarUpload (file) {
      const isType = ['image/jpg', 'image/png', 'image/jpeg', 'image/gif'].indexOf(file.type) >= 0
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isType) {
        this.$message.error('上传图片只能是 JPG、PNG、GIF 格式!')
        return false
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
        return false
      }

      return new Promise((resolve, reject) => {
        this.$axios.get(this.$apis.koa2.upload, {
          params: {
            fileName: file.name,
            systemName: 'WEB'
          }
        }).then((res) => {
          if (res.code !== '1') {
            reject(new Error(res.message))
            return false
          }
          this.form = {
            name: file.name,
            key: res.data.fileNameKey,
            token: res.data.uploadToken
          }
          resolve(true)
        }).catch((errRes) => {
          reject(new Error('上传图片失败'))
          return false
        })
      })
    },
    /**
     * 头像上传成功处理
     * @function [handleAvatarSuccess]
     * @param {Object} res -上传成功返回
     */
    handleAvatarSuccess (res) {
      this.imgUrl = `${qiniu.domain}${res.key}`
      this.$emit('url', this.imgUrl)
    }
  }
}
</script>
