<template lang="pug">
.account-funds-index
  el-row
    el-col(:span="24")
      el-form(ref="form" label-position="left" label-width="100px")
        el-form-item(label="账户状态")
          span.mr10 {{account.name}}
          span.mr5(v-bind:class="[account.status === 10 ? 'color-green1' : 'color-grey1']") 正常
          span.mr5 /
          span(v-bind:class="[account.status === 20 ? 'color-green1' : 'color-grey1']") 封禁
        el-form-item(label="当前试用余量")
          span.color-green1.mr10 {{account.trial}}
          span 试用
          el-tooltip(content="试用" placement="top")
            a.el-icon-information.color-grey2.p-as.ml10
        el-form-item(label="保证金")
          span.color-green1.mr10 {{account.deposit}}
          span 元
          el-tooltip(content="试用" placement="top")
            a.el-icon-information.color-grey2.p-as.ml10
        el-form-item(label="账户余额")
          span.color-green1.mr10 {{account.balanceAmount}}
          span.mr20 元
          span.color-green1.mr10 {{account.balanceIntegral}}
          span.mr20 积分
          el-button(type="success" size="small" @click="recharge.dialogVisible = true") 充值
          el-button(type="success" size="small" @click="withdraw.dialogVisible = true") 提现
        el-form-item(label="冻结金额")
          span.color-red1.mr10 {{account.freezeAmount}}
          span.mr20 元
          span.color-red1.mr10 {{account.freezeIntegral}}
          span 积分
          el-tooltip(content="冻结金额" placement="top")
            a.el-icon-information.color-grey2.p-as.ml10
  el-dialog.recharge(title="账户充值" v-bind:visible.sync="recharge.dialogVisible")
    el-row
      el-col(:span="24")
        h3 充值金额
    el-row.mt20(v-if="recharge.monery.active === 'other'")
      el-col(:span="24")
        el-input.recharge__other-monery(v-model="recharge.monery.num" placeholder="手动输入充值金额")
    el-row.mt20(:gutter="20")
      el-col(v-for="item in recharge.monery.list"
        v-bind:key="item.id"
        v-bind:span="12")    
        .recharge__monery(
          v-bind:class="[recharge.monery.active === item.id ? 'active' : '']"
          @click="selectRechargeMonery(item)")
          h3 充值{{item.num}}元
          h5 附赠{{item.integral}}积分
      el-col(v-bind:span="12")
        .recharge__monery(
          v-bind:class="[recharge.monery.active === 'other' ? 'active' : '']"
          @click="selectRechargeMonery('other')")
          h3.lh40 其他金额
    el-row.mt40
      el-col(:span="24")
        h3 充值方式
    el-row.mt20
      el-col(:span="24")
        ul.recharge__payment
          li(v-for="item in recharge.payment.list"
            v-bind:key="item.name"
            @click="selectPayment(item)")
            img(v-bind:src="item.img")
            h5 {{item.text}}
            i.el-icon-circle-check(v-if="recharge.payment.active === item.name")
    footer.ml10.mr10.mb10(slot="footer")
      el-row
        el-col(:span="24")
          el-button.h-lh50.wfull(type="success" @click="recharging") 立即充值
      el-row.mt20
        el-col(:span="24")  
          h5.text-center.ft14
            el-checkbox(v-model="recharge.read")
              span 我已经阅读并同意
            a.color-red1() 《充值协议》
  el-dialog(title="账户提现" v-bind:visible.sync="withdraw.dialogVisible")
    el-row.mt20
      el-col(:span="24")
        el-form(
          ref="form"
          v-bind:model="withdraw"
          label-width="100px"
          label-position="left")
          el-form-item(label="支付宝账号")
            el-input(v-model="withdraw.info.accountName")
          el-form-item(label="支付宝姓名")
            el-input(v-model="withdraw.info.realName")
          el-form-item(label="提现金额")
            el-input(v-model="withdraw.info.amount")
    span(slot="footer")
      el-button(@click="withdraw.dialogVisible = false") 取消
      el-button(type="primary" @click="withDrawing") 确定
</template>

<script>
export default {
  data () {
    return {
      /**
       * 资金账户信息
       * @type {JSON}
       */
      account: {
        name: 'KA商家',
        // 账户状态 - 10(正常) -20(封禁)
        status: 10,
        // 试用余量
        trial: '100',
        // 保证金
        deposit: '1000',
        // 账户余额
        balanceAmount: '100',
        // 账户余额积分
        balanceIntegral: '200',
        // 冻结金额
        freezeAmount: '100',
        // 冻结积分
        freezeIntegral: '300'
      },
      /**
       * 账户充值
       * @type {JSON}
       */
      recharge: {
        dialogVisible: false,
        // 充值金额
        monery: {
          list: [
            {
              id: '1',
              num: '100',
              integral: '50'
            },
            {
              id: '2',
              num: '500',
              integral: '300'
            },
            {
              id: '3',
              num: '1000',
              integral: '1000'
            },
            {
              id: '4',
              num: '10000',
              integral: '2000'
            }
          ],
          active: '1',
          num: '100'
        },
        // 选中的充值金额
        active: null,
        // 充值金额
        num: null,
        // 支付渠道
        payment: {
          list: [
            {
              name: 'ALIPAY',
              text: '支付宝支付',
              img: require('@/assets/img/zhifubao.png')
            },
            {
              name: 'WECHATPAY',
              text: '微信支付',
              img: require('@/assets/img/wecaht.png')
            }
          ],
          active: null
        },
        // 已读协议
        read: false
      },
      /**
       * 账户提现
       * @type {JSON}
       */
      withdraw: {
        dialogVisible: false,
        info: {
          userId: this.$store.state.user.userId,
          accountName: 'rfgecl7687@sandbox.com',
          realName: '沙箱环境',
          amount: 2.00
        }
      }
    }
  },
  methods: {
    /**
     * 选择充值金额
     * @function [selectRechargeMonery]
     * @param {JSON} -金额
     */
    selectRechargeMonery (monery) {
      if (monery === 'other') {
        this.recharge.monery.active = 'other'
        this.recharge.monery.num = null
        return
      }
      this.recharge.monery.active = monery.id
      this.recharge.monery.num = monery.num
    },
    /**
     * 选择支付渠道
     * @function [selectPayment]
     * @param {JSON} -支付渠道
     */
    selectPayment (payment) {
      this.recharge.payment.active = payment.name
    },
    /**
     * 获取账户信息
     * @function [getAccountInfo]
     */
    getAccountInfo () {
      this.$axios.get(this.$apis.account.getAccountInfo, {
        params: {
          // 账户类型
          type: 'SHOP',
          // 商户id
          shopId: this.$store.state.user.userId
        }
      }).then((res) => {
        if (res.code === '1') {
          this.account = res.data
          let level = res.data.level
          if (level > 10) {
            this.account.name = 'KA商家'
          } else {
            this.account.name = '普通商家'
          }
        } else {
          this.$message.error(res.message)
        }
      }).catch((errRes) => {
        this.$message.error(errRes.message)
      })
    },
    /**
     * 充值确认框
     * @function [confirmRecharge]
     */
    confirmRecharge () {
      this.$confirm(`充值 ${this.recharge.monery.num}`, '充值', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.recharge()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消充值'
        })
      })
    },
    /**
     * 充值
     * @function [recharging]
     */
    recharging () {
      this.recharge.dialogVisible = false
      this.$axios.get(this.$apis.account.rechargeBalance, {
        params: {
          shopId: this.$store.state.user.userId,
          channelType: 'ALIPAY',
          payServiceType: 'web',
          amount: this.recharge.monery.num
        }
      }).then((res) => {
        this.jumpAli(res)
      }).catch((errRes) => {
        this.$message.error(errRes.message)
      })
    },
    /**
     * 跳转支付宝页面
     * @function [recharging]
     * @param {String} -支付宝返回htmlstr
     */
    jumpAli (res) {
      const div = document.createElement('div')
      const length = document.forms.length
      div.innerHTML = res
      document.body.appendChild(div)
      document.forms[length].setAttribute('target', '_blank')
      document.forms[length].submit()
      document.body.removeChild(div)
    },
    /**
     * 提现
     * @function [withDrawing]
     */
    withDrawing () {
      this.withdraw.dialogVisible = false
      this.$axios.post(this.$apis.account.withdraw, this.withdraw.info).then((res) => {
        if (res.code === '1') {
          this.getAccountInfo()
          this.$message({
            type: 'success',
            message: '提现成功'
          })
        } else {
          this.$message.error(res.message)
        }
      }).catch((errRes) => {
        this.$message.error(errRes.message)
      })
    }
  },
  mounted () {
    this.getAccountInfo()
  }
}
</script>
