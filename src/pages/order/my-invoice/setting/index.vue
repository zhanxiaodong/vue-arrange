<template lang="pug">
.my-invoice-setting
  el-row.mt20
    el-col(:span="24")
      el-button.pull-right(type="success" @click="add") 添加
  el-row.mt20
    el-col(:span="24")
      invoice-card.mb20(
        v-for="item in invoices"
        v-bind:key="item.id"
        v-bind:invoice="item"
        @del="del")
  el-dialog.model(title="添加发票" v-bind:visible.sync="editInvoices.dialogVisible" width="60%")
    el-row
      el-col(:span="24")
        ul.model__desc
          li 1.发票审核完成后不可修改，若因填写错误导致开具、寄送问题，将无法重开。
          li 2.增值税普票为定额发票，不显示发票抬头；电子发票和增值税转票抬头均为公司全称。
          li 3.审核完成后，纸质发票将在5个工作日内寄出。
          li 4.增值税发票按票面点数+3%加收手续费
    el-row.mt20
      el-col(:span="24")
        el-form(
          ref="form"
          v-bind:model="editInvoices"
          label-width="100px"
          label-position="left")
          el-form-item(label="发票抬头")
            el-input(v-model="editInvoices.title")
          el-form-item(label="纳税识别号")
            el-input(v-model="editInvoices.identNum")
            p.h-lh20.mt10 请填写15位/17/18或者20位税务登记好，如超过位数则无法开具发票。
            p.h-lh20 因开具信息错误将无法重新开具。
          el-form-item(label="企业注册地址")
            el-input(v-model="editInvoices.regAddress")
            p.h-lh20.mt10 与税务登记证一致
          el-form-item(label="企业注册电话")
            el-input(v-model="editInvoices.regTel")
          el-form-item(label="企业开户银行")
            el-input(v-model="editInvoices.regBank")
            p.h-lh20.mt10 与银行开户证明一致
          el-form-item(label="企业银行账户")
            el-input(v-model="editInvoices.regBankNum")
            p.h-lh20.mt10 与银行开户证明一致
          el-form-item(label="邮寄地址")
            el-input(v-model="editInvoices.address")
            p.h-lh20 目前只支持中国大陆地区的邮寄
          el-form-item(label="邮政编码")
            el-input(v-model="editInvoices.code")
          el-form-item(label="联系人")
            el-input(v-model="editInvoices.contactName")
          el-form-item(label="联系电话")
            el-input(v-model="editInvoices.contactTel")
    footer(slot="footer")
      el-button(@click="editInvoices.dialogVisible = false") 取 消
      el-button(type="success" @click="save") 确 定
</template>

<script>
export default {
  data () {
    return {
      /**
       * 编辑发票
       * @type {Object}
       */
      editInvoices: {
        // 对话框可见性
        dialogVisible: false,
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
        contactTel: null,
        shopId: this.$store.state.user.userId
      },
      /** @argument
       * @type {Array}
       * 发票列表
       */
      invoices: [
        {
          id: '123',
          title: '杭州小聪聪有限公司',
          identNum: '05215165165222BJ',
          regAddress: '杭州市滨江区江陵路119号',
          regTel: '13900000000',
          regBank: '杭州银行',
          regBankNum: '1000000000000',
          province: '浙江省',
          city: '杭州市',
          country: '滨江区',
          address: '江陵路119号',
          code: '310000',
          contactName: '小聪聪',
          contactTel: '13600000000'
        }
      ]
    }
  },
  methods: {
    /**
     * 查看发票列表
     * @function [findInvoices]
     */
    findInvoices () {
      this.$axios.get(this.$apis.invoice.findInvoices, {
        params: {
          // 商户id
          shopId: this.$store.state.user.userId
        }
      }).then((res) => {
        if (res.code === '1') {
          this.invoices = res.data
        } else {
          this.$message.error(res.message)
        }
      }).catch((errRes) => {
        this.$message.error(errRes.message)
      })
    },
    /**
     * 添加
     * @function [add]
     */
    add () {
      this.editInvoices.dialogVisible = true
      this.editInvoices.title = null
      this.editInvoices.identNum = null
      this.editInvoices.regAddress = null
      this.editInvoices.regTel = null
      this.editInvoices.regBank = null
      this.editInvoices.regBankNum = null
      this.editInvoices.province = null
      this.editInvoices.city = null
      this.editInvoices.country = null
      this.editInvoices.address = null
      this.editInvoices.code = null
      this.editInvoices.contactName = null
      this.editInvoices.contactTel = null
    },
    /**
     * 编辑框
     * @function [save]
     */
    save () {
      this.$confirm(`确定保存发票 ${this.editInvoices.title}`, '保存', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.editInvoices.dialogVisible = false
        this.saveInvoice()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消保存'
        })
      })
    },
    /**
     * 保存发票信息
     * @function [saveInvoice]
     */
    saveInvoice () {
      this.$axios.post(this.$apis.invoice.saveInvoice, this.editInvoices).then((res) => {
        if (res.code === '1') {
          this.findInvoices()
          this.$message({
            type: 'success',
            message: '保存成功'
          })
        } else {
          this.$message.error(res.message)
        }
      }).catch((errRes) => {
        this.$message.error(errRes.message)
      })
    },
    /**
     * 删除
     * @function [del]
     * @param {Object} invoice -发票信息
     */
    del (invoice) {
      this.$confirm(`确定删除发票 ${invoice.title}`, '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteInvoiceById(`${invoice.id}`)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    /**
     * 删除发票信息
     * @function [deleteInvoiceById]
     */
    deleteInvoiceById (id) {
      this.$axios.delete(this.$apis.invoice.deleteInvoiceById, {
        params: {
          // 发票id
          id: id
        }
      }).then((res) => {
        if (res.code === '1') {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.findInvoices()
        } else {
          this.$message.error(res.message)
        }
      }).catch((errRes) => {
        this.$message.error(errRes.message)
      })
    }
  },
  mounted () {
    this.findInvoices()
  }
}
</script>
