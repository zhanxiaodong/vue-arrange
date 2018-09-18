<template lang="pug">
.input-other-info
  .form
    .left
      .name
        h1 BIONG
        p 市场营销资源服务
    .right
      h2.text-center 验证用户信息
      el-form.w350(
        v-bind:model="account"
        v-bind:rules="accountRules"
        ref="account"
        label-position="left"
        label-width="80px")
        el-form-item(label="用户类型" required)
          el-radio-group(v-model="account.type")
            el-radio(v-for="item in accountType" v-bind:key="item.name" v-bind:label="item.name") {{ item.text }}
        el-form-item(label="企业名称" prop="companyName")
          el-input(v-model="account.companyName" placeholder="请输入企业名称")
        el-form-item(label="网店名称" prop="shopName")
          el-input(v-model="account.shopName" placeholder="请输入网店名称")
        el-form-item(label="网店链接" prop="shopLink")
          el-input(v-model="account.shopLink" placeholder="请输入网店链接")
        el-form-item(label="联系人" prop="contact")
          el-input(v-model="account.contact" placeholder="请输入联系人")
        el-form-item(label="QQ" prop="qq")
          el-input(v-model="account.qq" placeholder="请输入QQ号")
      //- p.text-center
        router-link(v-bind:to="{name: 'user-info-submit-success', query: {phone: account.phone, type: 'register'}}") 跳过此步骤 >>
      p.mt20
        el-button.wfull(v-bind:plain="true" type="success" @click="check()") 提交验证
</template>

<script>
import { ACCOUNT_TYPE } from '@/common/constants'

export default {
  data () {
    return {
      /**
       * 账户信息
       * @type {Object}
       */
      account: {
        type: 'company',
        companyName: null,
        shopName: null,
        shopLink: null,
        contact: null,
        qq: null,
        phone: this.$route.query.phone
      },
      /**
       * 其他信息输入规则
       * @type {Object}
       */
      accountRules: {
        companyName: [
          { required: true, message: '请输入企业名称', trigger: 'blur' }
        ],
        shopName: [
          { required: true, message: '请输入网店名称', trigger: 'blur' }
        ],
        shopLink: [
          { required: true, message: '请输入网店链接', trigger: 'blur' }
        ],
        contact: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        qq: [
          { required: true, message: '请输入QQ号', trigger: 'blur' }
        ]
      },
      /**
       * 账户类型
       * @type {Array}
       */
      accountType: ACCOUNT_TYPE
    }
  },
  methods: {
    /**
     * 提交验证
     * @function [check]
     */
    check () {
      if (!this.account.companyName) {
        this.$message.error('请输入企业名称')
        return
      }
      if (!this.account.shopName) {
        this.$message.error('请输入网店名称')
        return
      }
      if (!this.account.shopLink) {
        this.$message.error('请输入网店链接')
        return
      }
      if (!this.account.contact) {
        this.$message.error('请输入联系人')
        return
      }
      if (!this.account.qq) {
        this.$message.error('请输入QQ号')
        return
      }
      this.$axios.post(this.$apis.account.checkShop, {
        id: this.$route.query.id,
        companyName: this.account.companyName,
        type: this.account.type,
        qqInfo: this.account.qq,
        contactName: this.account.contact,
        link: this.account.shopLink,
        shopName: this.account.shopName
      }).then((res) => {
        if (res.code === '1') {
          this.$router.push({
            name: 'user-info-submit-success',
            query: {
              phone: this.account.phone,
              type: 'checkShop'
            }
          })
        } else {
          this.$message.error(res.message)
        }
      }).catch(() => {
        this.$message.error('提交审核失败！')
      })
    }
  }
}
</script>
