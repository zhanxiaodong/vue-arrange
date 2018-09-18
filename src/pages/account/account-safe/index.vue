<template lang="pug">
.account-safe.pl15.pr15
  el-row
    el-col(v-bind:span="18")
      div.pull-left
        h3 帐号密码
        span 用于保护帐号信息和登录安全
      el-button.pull-right.mt4(type="success" @click="pwd.dialogVisible = true") 修改
  el-row.mt40
    el-col(v-bind:span="18")
      div.pull-left
        h3 安全手机 {{phone.old | asterisk}}
        span 安全手机可以用于重置密码等安全验证
      el-button.pull-right.mt4(type="success" @click="phone.dialogVisible = true") 修改

  el-dialog(title="修改密码" v-bind:visible.sync="pwd.dialogVisible" width="30%")
    el-form(
      label-position="top"
      v-bind:model="pwd"
      v-bind:rules="pwdRules")
      el-form-item(label="原密码" prop="old")
        el-input(v-model="pwd.old" type="password" placeholder="请输入原密码")
      el-form-item(label="新密码" prop="new")
        el-input(v-model="pwd.new" type="password" placeholder="请输入新密码")
      el-form-item(prop="newTwo")
        el-input(v-model="pwd.newTwo" type="password" placeholder="再次输入新密码")
    span(slot="footer")
      el-button(v-bind:plain="true" type="success" @click="cancelModifyPwd") 取 消
      el-button(type="success" @click="modifyPwd") 确 定
  
  el-dialog.dialog-min-w(
    title="修改手机号"
    width="30%"
    v-bind:visible.sync="phone.dialogVisible"
    v-bind:close-on-click-modal="false"
    @close="cancelEditPhone")
    .pl10.pr10(v-if="phone.step === 0")
      h4.text-center 为了保护帐号安全，需要验证手机有效性
      p.text-center.mt10 
        span 点击发送短信按钮，将会发送一条有验证码的短信至手机 
        span.color-green1 {{phone.old | asterisk}}
      p.text-center.mt20
        el-button(type="success" @click="sendCode") 发送验证码
    .pl10.pr10(v-else-if="phone.step === 1")
      h4.text-center
        span 请使用安全手机
        span.color-green1 {{phone.old | asterisk}}
        span 获取验证码短信
      p.code-input.p-rl
        el-input(v-model="phone.code" placeholder="请输入验证码")
        el-button.p-as.r10.color-grey1.z1(type="text" v-bind:disabled="msgCodeBtn.disabled" @click="getMsgCode") {{ msgCodeBtn.text }}
      p.text-center.mt20
        el-button(type="success" @click="verifyCode('old')") 确定
    .pl10.pr10(v-else-if="phone.step === 2")
      h4.text-center 请输入安全手机号码
      p.m-0a.w300.p-rl.mt10
        el-input(v-model="phone.new" placeholder="请输入新的安全手机号")
      p.m-0a.w300.p-rl.mt10(v-if="!phone.showCodeInput")
        slide-unlock(@unlock="phone.showCodeInput = true")
      p.code-input.w300.p-rl(v-if="phone.showCodeInput")
        el-input(v-model="phone.code" placeholder="请输入验证码")
        el-button.p-as.r10.color-grey1.z1(type="text" v-bind:disabled="msgCodeBtn.disabled" @click="getMsgCode") {{ msgCodeBtn.text }}
      p.text-center.mt20(v-if="phone.showCodeInput")
        el-button(type="success" @click="updatePhone") 确定
    .pl10.pr10(v-else-if="phone.step === 3")
      p.text-center.mt20
        i.el-icon-circle-check.color-green1.ft50
      p.text-center.mt10
        span 成功
      p.text-center.mt20
        el-button(type="success" @click="cancelEditPhone") 确定

</template>

<script>
export default {
  data () {
    // 检查第二次输入的密码
    const checkNewPwdTwo = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请再次输入密码'))
      } else if (value !== this.pwd.new) {
        return callback(new Error('两次输入密码不一致!'))
      } else {
        return callback()
      }
    }

    return {
      /**
       * 手机号
       * @type {Object}
       */
      phone: {
        // 老手机号
        old: null,
        // 新手机号
        new: null,
        // 验证码
        code: null,
        // 对话框可见性
        dialogVisible: false,
        // 步骤
        step: 0,
        // 显示验证码输入框
        showCodeInput: false
      },
      /**
       * 密码
       * @type {Object}
       */
      pwd: {
        // 老密码
        old: null,
        // 新密码
        new: null,
        // 新密码2
        newTwo: null,
        // 对话框可见性
        dialogVisible: false
      },
      pwdRules: {
        old: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        new: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 8, max: 30, message: '密码长度在 8 到 30 个字符', trigger: 'blur' }
        ],
        newTwo: [
          { required: true, validator: checkNewPwdTwo, trigger: 'blur' }
        ]
      },
      /**
       * 请求短信Btn文本内容
       * @type {Object}
       */
      msgCodeBtn: {
        // 文案
        text: '获取短信验证码',
        // 等待时间
        wait: 60,
        // 是否禁用
        disabled: false,
        // 是否初始化
        init: true
      }
    }
  },
  methods: {
    /**
     * 获取账户信息
     * @function [getUserInfo]
     */
    getUserInfo () {
      this.$axios.get(this.$apis.account.getShopInfoById, {
        params: {
          id: this.$store.state.user.userId
        }
      }).then((res) => {
        if (res.code === '1') {
          this.phone.old = res.data.tel
        } else {
          this.$message.error('获取用户信息失败')
        }
      }).catch(() => {
        this.$message.error('获取用户信息失败')
      })
    },
    /**
     * 修改密码
     * @function [modifyPwd]
     */
    modifyPwd () {
      this.$axios.post(this.$apis.account.modifyPwdById, {
        shopId: this.$store.state.user.userId,
        oldPassword: this.pwd.old,
        newPassword: this.pwd.new,
        confirmPassword: this.pwd.newTwo
      }).then((res) => {
        if (res.code === '1') {
          this.pwd.old = null
          this.pwd.new = null
          this.pwd.newTwo = null
          this.pwd.dialogVisible = false
          this.$message({
            type: 'success',
            message: '修改密码成功'
          })
        } else {
          this.$message.error(res.message)
        }
      }).catch((errRes) => {
        this.$message.error(errRes.message)
      })
    },
    /**
     * 取消修改密码
     * @function [cancelModifyPwd]
     */
    cancelModifyPwd () {
      this.pwd.old = null
      this.pwd.new = null
      this.pwd.newTwo = null
      this.pwd.dialogVisible = false
    },
    /**
     * 发送验证码
     * @function [sendCode]
     */
    sendCode () {
      this.phone.step = 1
    },
    /**
     * 取消修改手机号
     * @function [cancelEditPhone]
     */
    cancelEditPhone () {
      this.phone.dialogVisible = false
      this.phone.code = null
      this.phone.step = 0
      this.phone.showCodeInput = false
      this.initTimeDown()
    },
    /**
     * 获取短信验证码
     * @function [getMsgCode]
     */
    getMsgCode () {
      this.$axios.get(this.$apis.common.sendCode, {
        params: {
          tel: this.phone.step === 1 ? this.phone.old : this.phone.new
        }
      }).then((res) => {
        if (res.code === '1') {
          this.msgCodeBtn.init = false
          this.timeDown()
        } else {
          this.$message.error(res.message)
        }
      }).catch((errRes) => {
        this.$message.error(errRes.message)
      })
    },
    /**
     * 验证验证码
     * @function [verifyCode]
     */
    verifyCode () {
      this.$axios.post(this.$apis.common.checkCode, {
        tel: this.phone.old,
        code: this.phone.code
      }).then((res) => {
        if (res.code === '1') {
          this.phone.step = 2
          this.phone.code = null
          this.initTimeDown()
        } else {
          this.$message.error(res.message)
        }
      }).catch((errRes) => {
        this.$message.error(errRes.message)
      })
    },
    /**
     * 更新手机号
     * @function [updatePhone]
     */
    updatePhone () {
      if (!this.phone.new) {
        this.$message.error('请输入新的安全手机号')
        return
      }
      if (!this.phone.code) {
        this.$message.error('请输入验证码')
        return
      }
      this.$axios.post(this.$apis.account.updatePhone, {
        shopId: this.$store.state.user.userId,
        tel: this.phone.new,
        code: this.phone.code
      }).then((res) => {
        if (res.code === '1') {
          this.phone.step = 3
          this.phone.code = null
          this.initTimeDown()
        } else {
          this.$message.error(res.message)
        }
      }).catch((errRes) => {
        this.$message.error(errRes.message)
      })
    },
    /**
     * 60s倒计时
     * @function [timeDown]
     */
    timeDown () {
      if (this.msgCodeBtn.wait === 0 || this.msgCodeBtn.init) {
        this.initTimeDown()
      } else {
        this.msgCodeBtn.text = `${this.msgCodeBtn.wait--}s`
        this.msgCodeBtn.disabled = true
        setTimeout(() => {
          this.timeDown()
        }, 1000)
      }
    },
    /**
     * 初始化60s倒计时
     * @function [initTimeDown]
     */
    initTimeDown () {
      this.msgCodeBtn.text = '获取短信验证码'
      this.msgCodeBtn.wait = 60
      this.msgCodeBtn.disabled = false
      this.msgCodeBtn.init = true
    }
  },
  mounted () {
    this.getUserInfo()
  }
}
</script>
