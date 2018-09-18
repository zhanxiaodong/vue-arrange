<template lang="pug">
.account-transaction-record
  el-row
    el-col(:span="24")
      ol.menu
        li(v-for="(item, index) in menu"
           v-bind:key="index"
           @click="selectMenu(item.name)")
          el-button(
            type="text"
            v-bind:class="[activeMenu === item.name ? 'color-black1' : 'color-grey2']") {{item.text}}
          span.ml10.mr10.color-grey4(v-if="index+1 !== menu.length") |
  el-row.mt20
    el-col(:span="24")
      receipt-card.mb20(
        v-for="item in receipts"
        v-bind:key="item.id"
        v-bind:receipt="item")
</template>

<script>
export default {
  data () {
    return {
      /**
       * @type {Array}
       * 菜单
       */
      menu: [
        {
          name: 'all',
          text: '所有交易记录'
        },
        {
          name: 'recent',
          text: '最近交易记录'
        },
        {
          name: 'recharge',
          text: '充值记录'
        },
        {
          name: 'drawing',
          text: '提现记录'
        },
        {
          name: 'pay',
          text: '支付记录'
        }
      ],
      /**
       * 当前菜单
       * @type {Int}
       */
      activeMenu: null,
      /**
       * 交易记录
       * @type {Array}
       */
      receipts: [
        {
          // id
          id: '1',
          // 交易名称
          name: '账户余额',
          // 付款方
          payer: '歪歪',
          // 收款方
          payee: '杭州小聪聪科技有限公司',
          // 收款方联系电话
          payeePhone: '13600000000',
          // 流水号
          serialNumber: '123',
          // 订单金额
          money: '100',
          // 说明
          desc: '账户充值',
          // 来源 -credit 信誉金；-bail 保证金；-BALANCE 账户余额；-ALIPAY 支付宝
          from: 'ALIPAY',
          // 类型 -recharge 充值；-drawing 提现; -blocked 冻结； -unfreeze 解冻；-pay 支付； -indemnity 赔付
          type: 'recharge',
          // 交易状态 -success交易成功；-doing 交易中；-wait 等待交易
          status: 'success',
          // 交易时间
          time: '2017-10-10 10:10'
        }
      ]
    }
  },
  methods: {
    /**
     * 选择菜单
     * @function [selectMenu]
     * @param {String} item -item
     */
    selectMenu (item) {
      this.activeMenu = item
      this.$router.replace({
        name: 'account-transaction-record',
        query: {
          type: item
        }
      })
    },
    /**
     * 初始化menu
     * @function [initMenu]
     */
    initMenu () {
      const type = this.$route.query.type
      if (!type) {
        this.activeMenu = 'all'
        this.selectMenu('all')
      }
      this.findRecord()
    },
    /**
     * 获取交易记录
     * @function [findRecord]
     */
    findRecord () {
      this.$axios.get(this.$apis.account.findRecord, {
        params: {
          // 账户类型
          type: this.$route.query.type,
          // 商户id
          userId: this.$store.state.user.userId
        }
      }).then((res) => {
        if (res.code === '1') {
          this.receipts = res.data
        } else {
          this.$message.error(res.message)
        }
      }).catch((errRes) => {
        this.$message.error(errRes.message)
      })
    }
  },
  watch: {
    '$route.query.type' () {
      this.initMenu()
    }
  },
  created () {
    this.initMenu()
  }
}
</script>
