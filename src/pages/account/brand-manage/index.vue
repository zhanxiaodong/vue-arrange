<template lang="pug">
.brand-manage.pl15.pr15
  el-row
    el-col(:span="24")
      el-button.pull-right(type="success" @click="edit({}, 'add')") 新建品牌
  el-row.mt20
    el-col(:span="24")
      brand-card.mb20(
        v-for="item in brandList"
        v-bind:key="item.id"
        v-bind:brand="item"
        @edit="edit"
        @del="del")
  el-dialog.edit-brand(
    v-bind:title="editBrand.title"
    v-bind:visible.sync="editBrand.dialogVisible"
    width="40%")
    el-form(
      label-position="left"
      ref="editBrand"
      v-bind:model="editBrand"
      label-width="100px")
      el-form-item(label="品牌名称")
        el-input.w194(v-model="editBrand.name")
      el-form-item(label="Logo")
        upload-avatar(@url="showLogo" v-bind:defaultUrl="editBrand.logo")

    span(slot="footer")
      el-button(:plain="true" type="success" @click="initEditBrand") 取 消
      el-button(v-if="editBrand.type === 'add'" type="success" @click="save") 确 定
      el-button(v-if="editBrand.type === 'update'" type="success" @click="update") 更 新
</template>

<script>
export default {
  data () {
    return {
      /**
       * 编辑品牌
       * @type {Object}
       */
      editBrand: {
        // id
        id: null,
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
       * 品牌列表
       * @type {Array}
       */
      brandList: []
    }
  },
  methods: {
    /**
     * 编辑
     * @function [edit]
     */
    edit (brandInfo, type) {
      this.editBrand.dialogVisible = true

      if (type === 'add') {
        this.editBrand.title = '新建品牌'
        this.editBrand.id = null
        this.editBrand.name = null
        this.editBrand.logo = null
        this.editBrand.type = 'add'
      } else {
        this.editBrand.title = '编辑品牌'
        this.editBrand.id = brandInfo.id
        this.editBrand.name = brandInfo.name
        this.editBrand.logo = brandInfo.avatar
        this.editBrand.type = 'update'
      }
    },
    /**
     * 获取品牌列表
     * @function [getBrandList]
     */
    getBrandList () {
      this.$axios.get(this.$apis.brand.getBrandListById, {
        params: {
          shopId: this.$store.state.user.userId
        }
      }).then((res) => {
        if (res.code === '1') {
          this.brandList = res.data
        } else {
          this.$message.error(res.message)
        }
      }).catch((errRes) => {
        this.$message.error(errRes.message)
      })
    },
    /**
     * 保存品牌
     * @function [save]
     */
    save () {
      if (!this.editBrand.name) {
        this.$message.error('请输入品牌名称')
        return
      }
      if (!this.editBrand.logo) {
        this.$message.error('请上传品牌logo')
        return
      }
      this.$axios.post(this.$apis.brand.addBrand, {
        shopId: this.$store.state.user.userId,
        name: this.editBrand.name,
        avatar: this.editBrand.logo
      }).then((res) => {
        if (res.code === '1') {
          this.initEditBrand()
          this.getBrandList()
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
     * 更新品牌
     * @function [update]
     */
    update () {
      if (!this.editBrand.name) {
        this.$message.error('请输入品牌名称')
        return
      }
      if (!this.editBrand.logo) {
        this.$message.error('请上传品牌logo')
        return
      }
      this.$axios.post(this.$apis.brand.editBrand, {
        id: this.editBrand.id,
        shopId: this.$store.state.user.userId,
        name: this.editBrand.name,
        avatar: this.editBrand.logo
      }).then((res) => {
        if (res.code === '1') {
          this.initEditBrand()
          this.getBrandList()
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
     * 删除品牌
     * @function [del]
     * @param {Object} brandInfo -品牌信息
     */
    del (brandInfo) {
      this.$confirm(`确定删除 ${brandInfo.name} 品牌？`, '删除品牌', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.delete(this.$apis.brand.delBrand, {
          params: {
            id: brandInfo.id
          }
        }).then((res) => {
          if (res.code === '1') {
            this.getBrandList()
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
     * 初始化编辑品牌
     * @function [initEditBrand]
     */
    initEditBrand () {
      this.editBrand.title = null
      this.editBrand.id = null
      this.editBrand.name = null
      this.editBrand.logo = null
      this.editBrand.type = null
      this.editBrand.dialogVisible = false
    },
    /**
     * 显示品牌logo
     * @function [showLogo]
     * @param {String} url -url
     */
    showLogo (url) {
      this.editBrand.logo = url
    }
  },
  mounted () {
    this.getBrandList()
  }
}
</script>
