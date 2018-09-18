<template lang="pug">
.my-invoice-index
  el-row.header
    el-col(:span="3")
      el-checkbox.ml20(v-model="selectAll" :indeterminate="isIndeterminate" @change="changeAll") 全选
    el-col(:span="8")
      span 订单
    el-col.text-center(:span="3")
      span 价格
    el-col.text-center(:span="3")
      span 数量
    el-col.text-center(:span="3")
      span 发票状态
    el-col.text-center(:span="4")
      span 订单操作
  ul.order-list 
    li.order-item(
      v-for="(item,$index) in orderList"
      v-bind:key="item.id")
      el-row.order-item__top
        el-col(:span="11")
          el-checkbox.ml20(v-model="item.select" v-bind:disabled="item.invoicingStatus !== 0" @change="changeOne($index,$event)")
            b.mr10 {{item.createTime,'YYYY-MM-DD' | timeFormat}}
            span 订单号:{{item.orderNo}}
        el-col.text-center(:span="3")
          span {{item.model}}
        el-col.text-center(:span="3")
          el-tag(type="gray") {{item.type | orderClass}}
      el-row.order-item__bottom.mt15.mb15
        el-col(:span="11")
          img.w80.h80.ml42.mr10.pull-left(v-bind:src="item.img")
          span.pull-left {{item.name}}
        el-col.text-center(:span="3")
          span ￥ {{item.amount}}
        el-col.text-center(:span="3")
          span {{item.num}}
        el-col.text-center(:span="3")
          span {{item.invoicingStatus | orderInvoicingStatus}}
        el-col.text-center(:span="4")
          ul.btn-list
            li(v-if="item.status === 1")
              el-button.btn-list__item(type="text") 查看详情
            li
              el-button.btn-list__item(type="text") 删除
  .footer.p-fx.l200.r0.b0.bc-white.z1
    el-button.pull-right(type="success" @click="findInvoices") 开票
  el-dialog.model(title="选择开票信息" v-bind:visible.sync="invoice.dialogVisible" width="50%")
    el-row
      el-col(:span="24")
        i.el-icon-information.mr10.color-blue3
        span 提示: 新增开票信息在“开票信息”中添加
    el-row.mt20
      el-col(:span="24")
        el-select.wfull(v-model="invoicingInfo.invoiceId" value-key="id" placeholder="请选择")
          el-option(
            v-for="item in invoice.list"
            v-bind:key="item.id"
            v-bind:label="item.title"
            v-bind:value="item.id")
    footer(slot="footer")
      el-button(@click="invoice.dialogVisible = false") 取 消
      el-button(type="success" @click="invoicing") 确 定
</template>

<script>
export default {
  data () {
    return {
      isIndeterminate: false,
      selectAll: false,
      /**
       * 订单列表˙
       * @type {Array}
       */
      orderList: [
        {
          id: '123',
          select: false,
          invoicingStatus: 0,
          orderNo: '123456',
          name: '潮流童装春秋儿童',
          amount: '55.00',
          num: 1,
          type: 'invited-model',
          createTime: '2017-10-10',
          model: '年糕妈妈',
          img: 'https://user-gold-cdn.xitu.io/2017/9/25/f3abf1ed9ec6283d5e705987abaa1986?imageView2/1/w/120/h/120/q/85/interlace/1'
        }
      ],
      /**
       * 发票列表
       * @type {Array}
       */
      invoice: {
        list: [
          {
            id: '123',
            // 发票抬头
            title: null,
            // 纳税识别号
            identNum: null,
            // 注册
            // 企业注册地址
            regAddress: null,
            // 企业注册电话
            regTel: null,
            // 企业开户银行
            regBank: null,
            // 企业银行账户
            regBankNum: null,
            // 企业地址
            province: null,
            city: null,
            country: null,
            address: null,
            code: null,
            // 联系人
            contactName: null,
            // 联系电话
            contactTel: null
          }
        ],
        dialogVisible: false
      },
      /**
       * 开票信息
       * @type {JSON}
       */
      invoicingInfo: {
        orderNos: [],
        invoiceId: null
      }
    }
  },
  methods: {
    /**
     * 全选操作
     * @function [changeAll]
     */
    changeAll (val) {
      this.invoicingInfo.orderNos = []
      let orderNoArr = []
      this.isIndeterminate = false
      this.orderList.forEach(function (item) {
        item.select = val
        if (val) {
          orderNoArr.push(item.orderNo)
        }
      })
      this.invoicingInfo.orderNos = orderNoArr
    },
    /**
     * 单选操作
     * @function [changeOne]
     */
    changeOne (index, event) {
      this.updateOrder(index, event)
      let checkedCount = this.invoicingInfo.orderNos.length
      this.selectAll = checkedCount === this.orderList.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.orderList.length
    },
    /**
     * 单选更新隐藏数组
     * @function [updateOrder]
     */
    updateOrder (index, event) {
      let orderInfo = this.orderList[index]
      if (event) {
        this.invoicingInfo.orderNos.push(orderInfo.orderNo)
      } else {
        let index = 0
        this.invoicingInfo.orderNos.forEach(function (item, i) {
          if (item === orderInfo.orderNo) {
            index = i
          }
        })
        this.invoicingInfo.orderNos.splice(index, 1)
      }
    },
    /**
     * 查看订单发票
     * @function [findOrderInvoice]
     */
    findOrderInvoice () {
      this.$axios.get(this.$apis.order.findOrderInvoice, {
        params: {
          // 商户id
          shopId: this.$store.state.user.userId,
          rderStatus: 'COMPLETE',
          invoicingStatus: '0'
        }
      }).then((res) => {
        if (res.code === '1') {
          this.orderList = res.data
        } else {
          this.$message.error(res.message)
        }
      }).catch((errRes) => {
        this.$message.error(errRes.message)
      })
    },
    /**
     * 查看发票列表
     * @function [findInvoices]
     */
    findInvoices () {
      if (this.invoicingInfo.orderNos.length === 0) {
        this.$message.error('请选择开票订单')
      } else {
        this.invoice.dialogVisible = true
        this.$axios.get(this.$apis.invoice.findInvoices, {
          params: {
            // 商户id
            shopId: this.$store.state.user.userId
          }
        }).then((res) => {
          if (res.code === '1') {
            this.invoice.list = res.data
          } else {
            this.$message.error(res.message)
          }
        }).catch((errRes) => {
          this.$message.error(errRes.message)
        })
      }
    },
    /**
     * 开票
     * @function [invoicing]
     */
    invoicing () {
      this.$confirm('发票将在5个工作日内寄出，请注意查收', {
        confirmButtonText: '确定'
      }).then(() => {
        this.invoice.dialogVisible = false
        this.$axios.post(this.$apis.invoice.excuteOrderInvoices, this.invoicingInfo).then((res) => {
          if (res.code === '1') {
            this.findOrderInvoice()
            this.$message({
              type: 'success',
              message: '已进入开票流程,详情请进开票记录中查询'
            })
          } else {
            this.$message.error(res.message)
          }
        }).catch((errRes) => {
          this.$message.error(errRes.message)
        })
      })
    }
  },
  mounted () {
    this.findOrderInvoice()
  }
}
</script>
