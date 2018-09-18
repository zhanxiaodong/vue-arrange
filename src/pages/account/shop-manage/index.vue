<template lang="pug">
.shop-manage.pl15.pr15
  el-row
    el-col(:span="24")
      el-button.pull-right(type="success" @click="edit({}, 'add')") 新建店铺
  el-row.mt20
    el-col(:span="24")
      shop-card.mb20(
        v-for="item in shopList"
        v-bind:key="item.id"
        v-bind:shop="item"
        @edit="edit"
        @del="del")
  el-dialog.edit-shop(
    v-bind:title="editShop.title"
    v-bind:visible.sync="editShop.dialogVisible"
    width="40%")
    el-form(
      label-position="left"
      ref="editShop"
      v-bind:model="editShop"
      label-width="100px")
      el-form-item(label="平台选择")
        el-radio-group(v-model="editShop.platform")
          el-radio(
            v-for="item in platform"
            v-bind:key="item.name"
            v-bind:label="item.name"
            v-if="item.name !== 'brand'") {{ item.text }}
        el-tooltip(content="平台选择" placement="top")
          a.el-icon-information.color-grey2.p-as.ml10
      el-form-item(label="品牌店铺")
        el-input.w194(v-model="editShop.name")
      el-form-item(label="Logo")
        upload-avatar(@url="showLogo" v-bind:defaultUrl="editShop.logo")

    span(slot="footer")
      el-button(:plain="true" type="success" @click="initEditShop") 取 消
      el-button(v-if="editShop.type === 'add'" type="success" @click="save") 确 定
      el-button(v-if="editShop.type === 'update'" type="success" @click="update") 更 新
</template>

<script>
import { EB_PLATFORM } from '@/common/constants'

export default {
  data () {
    return {
      /**
       * 编辑店铺
       * @type {Object}
       */
      editShop: {
        // id
        id: null,
        // 电商平台
        platform: null,
        // 名称
        name: null,
        // logo
        logo: null,
        // 对话框可见性
        dialogVisible: false,
        // 对话框标题
        title: null,
        // 编辑类型 -add 新建; -update 更新
        type: null
      },
      /**
       * 电商平台
       * @type {Array}
       */
      platform: EB_PLATFORM,
      /**
       * 店铺列表
       * @type {Array}
       */
      shopList: []
    }
  },
  methods: {
    /**
     * 编辑
     * @function [edit]
     * @param {Object} shopInfo
     * @param {String} type
     */
    edit (shopInfo, type) {
      this.editShop.dialogVisible = true

      if (type === 'add') {
        this.editShop.title = '新建店铺'
        this.editShop.id = null
        this.editShop.platform = null
        this.editShop.name = null
        this.editShop.logo = null
        this.editShop.type = 'add'
      } else {
        this.editShop.title = '编辑店铺'
        this.editShop.id = shopInfo.id
        this.editShop.platform = shopInfo.platform
        this.editShop.name = shopInfo.name
        this.editShop.logo = shopInfo.avatar
        this.editShop.type = 'update'
      }
    },
    /**
     * 获取店铺列表
     * @function [getShopList]
     */
    getShopList () {
      this.$axios.get(this.$apis.shop.getShopList, {
        params: {
          shopId: this.$store.state.user.userId
        }
      }).then((res) => {
        if (res.code === '1') {
          this.shopList = res.data
        } else {
          this.$message.error(res.message)
        }
      }).catch((errRes) => {
        this.$message.error(errRes.message)
      })
    },
    /**
     * 保存店铺
     * @function [save]
     */
    save () {
      if (!this.editShop.name) {
        this.$message.error('请输入店铺名称')
        return
      }
      if (!this.editShop.platform) {
        this.$message.error('请选择电商平台')
        return
      }
      if (!this.editShop.logo) {
        this.$message.error('请上传店铺logo')
        return
      }
      this.$axios.post(this.$apis.shop.addShop, {
        shopId: this.$store.state.user.userId,
        name: this.editShop.name,
        platform: this.editShop.platform,
        avatar: this.editShop.logo
      }).then((res) => {
        if (res.code === '1') {
          this.initEditShop()
          this.getShopList()
          this.$message({
            type: 'success',
            message: '创建成功'
          })
        } else {
          this.$message.error(res.message)
        }
      }).catch((errRes) => {
        this.$message.error(errRes.message)
      })
    },
    /**
     * 更新店铺
     * @function [update]
     */
    update () {
      if (!this.editShop.name) {
        this.$message.error('请输入店铺名称')
        return
      }
      if (!this.editShop.platform) {
        this.$message.error('请选择电商平台')
        return
      }
      if (!this.editShop.logo) {
        this.$message.error('请上传店铺logo')
        return
      }
      this.$axios.post(this.$apis.shop.editShop, {
        id: this.editShop.id,
        shopId: this.$store.state.user.userId,
        name: this.editShop.name,
        platform: this.editShop.platform,
        avatar: this.editShop.logo
      }).then((res) => {
        if (res.code === '1') {
          this.initEditShop()
          this.getShopList()
          this.$message({
            type: 'success',
            message: '更新成功'
          })
        } else {
          this.$message.error(res.message)
        }
      }).catch((errRes) => {
        this.$message.error(errRes.message)
      })
    },
    /**
     * 删除店铺
     * @function [del]
     * @param {Object} shopInfo -店铺信息
     */
    del (shopInfo) {
      this.$confirm(`确定删除 ${shopInfo.platform}${shopInfo.name} 店铺？`, '删除店铺', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.delete(this.$apis.shop.delShop, {
          params: {
            id: shopInfo.id
          }
        }).then((res) => {
          if (res.code === '1') {
            this.getShopList()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          } else {
            this.$message.error(res.message)
          }
        }).catch((errRes) => {
          this.$message.error(errRes.message)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    /**
     * 初始化编辑店铺
     * @function [initEditShop]
     */
    initEditShop () {
      this.editShop.title = null
      this.editShop.id = null
      this.editShop.platform = null
      this.editShop.name = null
      this.editShop.logo = null
      this.editShop.type = null
      this.editShop.dialogVisible = false
    },
    /**
     * 显示店铺logo
     * @function showLogo
     * @param {String} url -url
     */
    showLogo (url) {
      this.editShop.logo = url
    }
  },
  mounted () {
    this.getShopList()
  }
}
</script>
