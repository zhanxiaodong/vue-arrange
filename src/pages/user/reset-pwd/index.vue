<template lang="pug">
.reset-pwd
  .form
    .left
      .name
        h1 BIONG
        p 市场营销资源服务
    .right(v-if="!resetSuccess")
      h3.mb20.text-center 修改密码
      el-form.w300(
        v-bind:model="form"
        v-bind:rules="formRules"
        ref="form"
      )
        el-form-item(prop="pwd")
          el-input(v-model="form.pwd" type="password" placeholder="请输入密码")
        el-form-item(prop="pwdTwo")
          el-input(v-model="form.pwdTwo" type="password" placeholder="请再次输入密码")
        el-form-item.mb0
          el-button.wfull(v-bind:plain="true" type="success" @click="reset()") 下一步
      p.text-center.mt20
        router-link(:to="{ name: 'user-login' }") 返回登录
    .right.pull-left.p40(v-if="resetSuccess")
      .w300
        h4.text-center.h-lh170 密码修改成功，请重新登录
        p.text-center.mt20
          el-button.wfull(v-bind:plain="true" type="success" @click="toLogin()") 返回登录
</template>

<script>
import apis from '@/common/apis'

export default {
  data () {
    // 验证二次输入密码
    const checkPwdTwo = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请再次输入密码'))
      } else if (value !== this.form.pwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      /**
       * 密码信息
       * @type {Object}
       */
      form: {
        pwd: null,
        pwdTwo: null
      },
      /**
       * 修改成功
       * @type {Boolean}
       */
      resetSuccess: false,
      /**
       * 用户信息输入规则
       * @type {Object}
       */
      formRules: {
        pwd: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 8, max: 30, message: '密码长度在 8 到 30 个字符', trigger: 'blur' }
        ],
        pwdTwo: [
          { required: true, validator: checkPwdTwo, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    /**
     * 修改密码
     * @function [reset]
     */
    reset () {
      if (!this.form.pwd) {
        this.$message.error('请输入登录密码')
        return
      }
      if (!this.form.pwdTwo) {
        this.$message.error('请再次输入密码')
        return
      }
      if (this.form.pwd !== this.form.pwdTwo) {
        this.$message.error('密码不一致')
      }
      this.$axios.post(apis.account.resetPassNoCheck, {
        tel: this.$route.query.phone,
        password: this.form.pwd,
        lng: this.$store.state.location.lng,
        lat: this.$store.state.location.lat,
        address: this.$store.state.location.address,
        systemName: this.$store.state.location.systemName
      }).then((res) => {
        if (res.code === '1') {
          this.resetSuccess = true
        } else {
          this.$message.error(res.message)
        }
      }).catch(() => {
        this.$message.error('重置密码失败')
      })
    },
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
