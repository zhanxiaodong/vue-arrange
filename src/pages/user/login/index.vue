<template lang="pug">
  .login
    .form
      .left
        .name
          h1 MINIANYS
          p 迷你王国小仙女
      .right
        el-form.w300(
          v-bind:model="loginInfo"
          v-bind:rules="loginInfoRules"
          ref="loginInfo")
          el-form-item(prop="phone")
            el-input(v-model="loginInfo.phone" placeholder="手机号")
          el-form-item(prop="pwd")
            el-input(
              type="password"
              placeholder="密码"
              v-model="loginInfo.pwd"
              @keyup.enter.native="login()")
          el-form-item.mb0
            el-button.wfull(v-bind:plain="true" type="success" @click="login()") LOGIN
        p.text-center.mt20
          span 忘记密码点此领盒饭
</template>

<script>
import { validatePhone } from '@/common/rules'

export default {
  data () {
    return {
      /**
       * 登录信息
       * @type {Object}
       */
      loginInfo: {
        phone: null,
        pwd: null
      },
      /**
       * 登录信息验证
       * @type {Object}
       */
      loginInfoRules: {
        phone: [
          { validator: validatePhone, trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    /**
     * 登录
     * @function [login]
     */
    login () {
      if (!this.loginInfo.phone) {
        this.$message.error('请输入手机号')
        return
      }

      if (!this.loginInfo.pwd) {
        this.$message.error('请输入密码')
        return
      }
      this.$axios.post(this.$apis.account.loginByPassword, {
        tel: this.loginInfo.phone,
        password: this.loginInfo.pwd
      }).then((res) => {
        if (res.code === '1') {
          this.$store.dispatch('user/setUserInfo', {
            userName: res.data.userName,
            userId: res.data.shopId,
            img: res.data.avatar,
            phone: res.data.tel,
            token: res.data.token
          }).then(() => {
            this.$axios.defaults.headers.common['Authorization'] = `token ${res.data.token}`
            let redirect = decodeURIComponent(this.$route.query.redirect || '/')
            this.$router.push({
              path: redirect
            })
            this.$message({
              type: 'success',
              message: '登录成功'
            })
          })
        } else {
          this.$message.error(res.message)
        }
      })
    },
    /**
     * 定位当前位置
     * @function [location]
     */
    location () {
      this.$store.dispatch('location/setLocation').then(() => {
        this.$message({
          type: 'success',
          message: '定位成功'
        })
      }).catch(() => {
        this.$message.error('定位失败')
      })
    }
  },
  mounted () {
    this.location()
  }
}
</script>
