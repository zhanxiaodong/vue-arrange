<template lang="pug">
.input-user-info
  .form
    .left
      .name
        h1 MINIANYS
        p 迷你王国小仙女
    .right
      el-form.w350(
        v-bind:model="userInfo"
        v-bind:rules="userInfoRules"
        ref="userInfo"
        label-position="left"
        label-width="80px")
        el-form-item(label="账号名称" prop="username")
          el-input(v-model="userInfo.username" placeholder="请输入登录账号")
        el-form-item(label="邮箱地址" prop="email")
          el-input(v-model="userInfo.email" placeholder="请输入邮箱地址")
        el-form-item(label="登录密码" prop="pwd")
          el-input(v-model="userInfo.pwd" type="password" placeholder="请输入登录密码")
        el-form-item(label="确认密码" prop="pwdTwo")
          el-input(v-model="userInfo.pwdTwo" type="password" placeholder="请再次输入登录密码")
      p.text-center.mb20
        span 提交注册申请视为同意
        span.color-green1 《BIONG注册协议》
      p
        el-button.wfull(v-bind:plain="true" type="success" @click="registered()") 注册
</template>

<script>
export default {
  data () {
    // 验证二次输入密码
    var checkPwdTwo = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请再次输入密码'))
      } else if (value !== this.userInfo.pwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      /**
       * 用户信息
       * @type {Object}
       */
      userInfo: {
        username: null,
        email: null,
        pwd: null,
        pwdTwo: null
      },
      /**
       * 用户信息输入规则
       * @type {Object}
       */
      userInfoRules: {
        username: [
          { required: true, message: '请输入账号名称', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
        ],
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
     * 注册
     * @function [registered]
     */
    registered () {
      if (!this.userInfo.username) {
        this.$message.error('请输入账户名称')
        return
      }
      if (!this.userInfo.email) {
        this.$message.error('请输入邮箱地址')
      }
      if (!this.userInfo.pwd) {
        this.$message.error('请输入登录密码')
      }
      if (!this.userInfo.pwdTwo) {
        this.$message.error('请再次输入密码')
      }
      if (this.userInfo.pwd !== this.userInfo.pwdTwo) {
        this.$message.error('密码不一致')
      }
      this.$axios.post(this.$apis.account.register, {
        tel: this.$route.query.phone,
        userName: this.userInfo.username,
        email: this.userInfo.email,
        password: this.userInfo.pwd
      }).then((res) => {
        if (res.code === '1') {
          this.$router.push({
            name: 'input-other-info',
            query: {
              id: res.data.id,
              phone: res.data.tel
            }
          })
        } else {
          this.$message.error(res.message)
        }
      }).catch(() => {
        this.$message.error('注册失败请重新注册！')
      })
    }
  }
}
</script>
