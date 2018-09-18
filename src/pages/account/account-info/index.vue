<template lang="pug">
.account-info
  .show-info(v-if="!account.edit")
    el-form.pl15.pr15(
      label-position="left"
      ref="showAccountInfo"
      label-width="100px")
      el-form-item(label="账户名称")
        span {{account.username}}
      el-form-item(label="账户logo")
        img.w120.h120(v-bind:src="account.logo")
      el-form-item(label="邮箱地址")
        span {{account.email}}
      el-form-item(label="用户类型")
        span {{account.type === 'company' ? '企业' : '个人'}}
      el-form-item(label="企业名称")
        span {{account.companyName}}
      el-form-item(label="联系人")
        span {{account.contact}}
      el-form-item(label="QQ")
        span {{account.qq}}
      el-form-item(label="手机号")
        span {{account.phone | asterisk}}
      el-form-item
        el-button(type="success" @click="edit") 编 辑
  .edit-info(v-else)
    el-form.pl15.pr15(
      label-position="left"
      ref="editAccountInfo"
      label-width="100px")
      el-form-item(label="账户名称")
        span {{account.username}}
      el-form-item(label="账户logo")
        upload-avatar(@url="showLogo" v-bind:defaultUrl="account.logo")
      el-form-item(label="邮箱地址")
        el-input.mr20.w194(v-model="account.email")
      el-form-item(label="用户类型")
        el-radio-group(v-model="account.type")
          el-radio(v-for="item in accountType" v-bind:key="item.name" v-bind:label="item.name") {{ item.text }}
      el-form-item(label="企业名称")
        el-input.mr20.w194(v-model="account.companyName")
      el-form-item(label="联系人")
        el-input.mr20.w194(v-model="account.contact")
      el-form-item(label="QQ")
        el-input.mr20.w194(v-model="account.qq")
      el-form-item(label="手机号")
        span.mr10 {{account.phone | asterisk}}
        span.color-red1 手机号在账户安全中修改
      el-form-item
        el-button(type="success" @click="save") 保 存
</template>

<script>
import { ACCOUNT_TYPE } from '@/common/constants'

export default {
  data () {
    return {
      /**
       * 账户信息
       * @type {JSON}
       */
      account: {
        // 是否编辑
        edit: false,
        // 用户名称
        username: null,
        // logo
        logo: null,
        // 邮箱地址
        email: null,
        // 账户类型
        type: null,
        // 公司名称
        companyName: null,
        // 联系人
        contact: null,
        // 手机号
        phone: null,
        // qq号
        qq: null
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
     * 编辑账号信息
     * @function [edit]
     */
    edit () {
      this.account.edit = true
    },
    /**
     * 保存账户信息
     * @function [save]
     */
    save () {
      this.$axios.post(this.$apis.account.updateShop, {
        id: this.$store.state.user.userId,
        companyName: this.account.companyName,
        type: this.account.type,
        qqInfo: this.account.qq,
        contactName: this.account.contact,
        avatar: this.account.logo
      }).then((res) => {
        if (res.code === '1') {
          this.account.edit = false
          this.getUserInfo()
          this.$message({
            type: 'success',
            message: '更新账户信息成功'
          })
        } else {
          this.$message.error(res.message)
        }
      }).catch((errRes) => {
        this.$message.error(errRes.message)
      })
    },
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
          this.account.username = res.data.userName
          this.account.logo = res.data.avatar
          this.account.email = res.data.email
          this.account.type = res.data.type
          this.account.companyName = res.data.companyName
          this.account.contact = res.data.contactName
          this.account.phone = res.data.tel
          this.account.qq = res.data.qqInfo
        } else {
          this.$message.error('获取用户信息失败')
        }
      }).catch(() => {
        this.$message.error('获取用户信息失败')
      })
    },
    /**
     * 显示logo
     * @function [showLogo]
     * @param {Object} url
     */
    showLogo (url) {
      this.account.logo = url
    }
  },
  mounted () {
    this.getUserInfo()
  }
}
</script>
