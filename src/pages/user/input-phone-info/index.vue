<template lang="pug">
  .input-phone-info
    .form
      .left(v-bind:class="[showAllInput ? 'h290' : 'h240']")
        .name
          h1 MINIANYS
          p 迷你王国小仙女
      .right(v-bind:class="[showAllInput ? 'h232' : 'h182']")
        h3.mb20.text-center 用户注册
        el-form.w300(
          v-bind:model="form"
          v-bind:rules="formRules"
          ref="loginInfo"
        )
          el-form-item(prop="phone")
            el-input(v-model="form.phone" placeholder="请输入手机号")
          el-form-item(v-if="!showAllInput")
            slide-unlock(@unlock="showAllInput = true")
          el-form-item.p-rl(prop="msgCode" v-if="showAllInput")
            el-button.p-as.r10.color-grey1.z1(type="text" v-bind:disabled="msgCodeBtn.disabled" @click="getMsgCode") {{ msgCodeBtn.text }}
            el-input(v-model="form.msgCode" placeholder="请输入短信验证码")
          el-form-item.mb0(v-if="showAllInput")
            el-button.wfull(v-bind:plain="true" type="success" @click="checkCode()") 下一步
        p.text-center.mt20
          router-link(:to="{ name: 'user-login' }") 已有账号? 登录
</template>

<script>
import apis from '@/common/apis'

export default {
  data () {
    // 验证手机号
    let validatePhone = (rule, value, callback) => {
      let phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
      if (value === '') {
        callback(new Error('请输入手机号'))
      } else if (!phoneReg.test(value)) {
        callback(new Error('请输入正确的手机号'))
      }
    }
    return {
      /**
       * 表单
       * @type {Object}
       */
      form: {
        phone: null,
        msgCode: null
      },
      /**
       * 请求短信Btn文本内容
       * @type {Object}
       */
      msgCodeBtn: {
        text: '获取短信验证码',
        wait: 60,
        disabled: false
      },
      /**
       * @type {Boolean}
       * 显示所有输入框
       */
      showAllInput: false,
      /**
       * 表单规则
       * @type {Object}
       */
      formRules: {
        phone: [
          { validator: validatePhone, trigger: 'blur' }
        ],
        msgCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    /**
     * 获取短信验证码
     * @function [getMsgCode]
     */
    getMsgCode () {
      if (!this.form.phone) {
        this.$message.error('请输入手机号')
        return
      }
      this.$axios.get(apis.common.sendCode, {
        params: {
          tel: this.form.phone
        }
      }).then((res) => {
        if (res.code === '1') {
          this.timeDown()
        } else {
          this.$message.error(res.message)
        }
      }).catch(() => {
        this.$message.error('获取验证码失败，请稍候在试！')
      })
    },
    /**
     * 60s倒计时
     * @function [timeDown]
     */
    timeDown () {
      if (this.msgCodeBtn.wait === 0) {
        this.msgCodeBtn.text = '获取短信验证码'
        this.msgCodeBtn.wait = 60
        this.msgCodeBtn.disabled = false
      } else {
        this.msgCodeBtn.text = `${this.msgCodeBtn.wait--}s`
        this.msgCodeBtn.disabled = true
        setTimeout(() => {
          this.timeDown()
        }, 1000)
      }
    },
    /**
     * 校验验证码
     * @function [checkCode]
     */
    checkCode () {
      this.$axios.post(apis.common.checkCode, {
        tel: this.form.phone,
        code: this.form.msgCode
      }).then((res) => {
        if (res.code === '1') {
          this.$router.push({
            name: 'input-user-info',
            query: {
              phone: this.form.phone
            }
          })
        } else {
          this.$message.error('无效验证码，请重新输入！')
        }
      }).catch(() => {
        this.message.error('无效验证码，请重新输入！')
      })
    }
  }
}
</script>
