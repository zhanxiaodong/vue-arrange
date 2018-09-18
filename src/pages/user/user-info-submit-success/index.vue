<template lang="pug">
.user-info-submit-success
  .form
      .left(v-bind:class="[type === 'register' ? 'h180' : 'h260']")
        .name
          h1 BIONG
          p 市场营销资源服务
      .right(v-bind:style="{height: [type === 'register' ? '122px' : '202px']}")
        .w300
          h2.text-center.color-green1(v-if="type === 'register'")  账户注册成功
          h2.text-center.color-green1(v-if="type === 'checkShop'")  审核信息提交成功
          p.text-center.mt40.ft14(v-if="type === 'checkShop'")
            span 我们将在一个工作日内将信息反馈至您的手机
            span.color-green1 {{phone}}，
            span 请注意查收。
          p.text-center.mt30
            el-button.wfull(v-bind:plain="true" type="success" @click="toLogin") 返回登录
          p.text-center.mt10 400-155-8888 紧急开通
</template>

<script>
export default {
  data () {
    return {
      /**
       * 页面类型
       * @type {String}
       * register -注册成功页，checkShop -审核信息提交成功页
       */
      type: this.$route.query.type,
      /**
       * 手机号
       * @type {String}
       */
      phone: this.$route.query.phone
    }
  },
  methods: {
    /**
     * 前往登录
     * @function [toLogin]
     */
    toLogin () {
      this.$router.push({
        name: 'user-login'
      })
    }
  }
}
</script>
