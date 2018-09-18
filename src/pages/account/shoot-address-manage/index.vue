<template lang="pug">
.shoot-address-manage.pl15.pr15
  el-row
    el-col(:span="24")
      el-button.pull-right(type="success" @click="edit({}, 'add')") 新建拍摄地址
  el-row.mt20
    el-col(:span="24")
      shoot-address-card.mb20(
        v-for="item in addressList"
        v-bind:key="item.id"
        v-bind:address="item"
        @isDefault="isDefault"
        @edit="edit"
        @del="del")
  el-dialog(
    v-bind:title="editAddress.title"
    v-bind:visible.sync="editAddress.dialogVisible"
    width="60%")
    el-row(v-if="editAddress.showMap")
      el-col(:span="24")
        place-search-by-map(
          v-bind:defaultAddress="editAddress.address"
          @address="selectAddress")
    el-row(v-if="!editAddress.showMap")
      el-col(v-bind:span="16"
        v-bind:offset="4")
        h3.text-center
          span.mr5 {{editAddress.address.province.name}}
          span.mr5 {{editAddress.address.city.name}}
          span.mr5 {{editAddress.address.district.name}}
          span.mr5 {{editAddress.address.street.name}}
          span {{editAddress.address.detailed}}
        el-form.mt20(
          v-bind:model="editAddress"
          v-bind:rules="editAddressRules"
          ref="editAddressForm"
          label-position="left"
          label-width="100px")
          el-form-item(label="联系人" prop="contactName")
            el-input(v-model="editAddress.contactName" placeholder="联系人")
          el-form-item(label="联系电话" prop="contactPhone")
            el-input(v-model="editAddress.contactPhone" placeholder="联系电话")
          el-form-item(label="备注")
            el-input(type="textarea" v-model="editAddress.remark" placeholder="备注")
    span(slot="footer" v-if="!editAddress.showMap")
      el-button(v-bind:plain="true" type="success" @click="cancel") 取 消
      el-button(type="success" v-if="editAddress.type === 'add'" @click="save") 确 定
      el-button(type="success" v-if="editAddress.type === 'edit'" @click="update") 更 新
</template>

<script>
import { validatePhone } from '@/common/rules'

export default {
  data () {
    return {
      /**
       * 编辑地址
       * @type {Object}
       */
      editAddress: {
        // 地址id
        id: null,
        // 联系人姓名
        contactName: null,
        // 联系人电话
        contactPhone: null,
        // 公司地址
        address: {
          // 省
          province: null,
          // 市
          city: null,
          // 区域（区、县、镇...）
          district: null,
          // 街道
          street: null,
          // 门牌号
          detailed: null
        },
        // 备注
        remark: null,
        // 对话框可见性
        dialogVisible: false,
        // 对话框标题
        title: null,
        // 显示地图
        showMap: true,
        // 编辑类型 -add 新建；-edit 编辑
        type: null
      },
      /**
       * 地址列表
       * @type {Array}
       */
      addressList: null,
      /**
       * 地址编辑规则
       * @type {Object}
       */
      editAddressRules: {
        // 联系人名称
        contactName: [
          { required: true, message: '请输入联系人名称', trigger: 'blur' }
        ],
        // 联系人手机号
        contactPhone: [
          { required: true, validator: validatePhone, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    /**
     * 设置默认地址
     * @function [isDefault]
     * @param {Object} address -地址信息
     */
    isDefault (address) {
      this.$confirm(`确定将 ${address.address.province.name} ${address.address.city.name} ${address.address.district.name} ${address.address.street.name} ${address.address.detailed} 设为默认地址？`, '设置默认地址', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$axios.get(this.$apis.address.setDefaultAddress, {
          params: {
            id: address.id,
            isDefault: true
          }
        }).then((res) => {
          if (res.code === '1') {
            this.getAddress()
            this.$message({
              type: 'success',
              message: '设置成功!'
            })
          } else {
            this.$message.error('设置默认地址失败')
          }
        }).catch(() => {
          this.$message.error('设置默认地址失败')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消设置'
        })
      })
    },
    /**
     * 编辑地址
     * @function [edit]
     * @param {Object} address -地址信息
     * @param {String} type -编辑类型
     */
    edit (address, type) {
      if (!address) {
        return
      }
      if (type === 'add') {
        this.editAddress.type = 'add'
        this.editAddress.title = '新建拍摄地址'
        this.editAddress.id = null
        this.editAddress.contactName = null
        this.editAddress.contactPhone = null
        this.editAddress.remark = null
        this.editAddress.address.province = null
        this.editAddress.address.city = null
        this.editAddress.address.district = null
        this.editAddress.address.street = null
        this.editAddress.address.detailed = null
      } else {
        this.editAddress.type = 'edit'
        this.editAddress.title = '编辑拍摄地址'
        this.editAddress.id = address.id
        this.editAddress.contactName = address.name
        this.editAddress.contactPhone = address.tel
        this.editAddress.remark = address.remark
        this.editAddress.address.province = address.address.province
        this.editAddress.address.city = address.address.city
        this.editAddress.address.district = address.address.district
        this.editAddress.address.street = address.address.street
        this.editAddress.address.detailed = address.address.detailed
      }

      this.editAddress.dialogVisible = true
    },
    /**
     * 选择地址
     * @function [selectAddress]
     * @param {Object} address -地址信息
     */
    selectAddress (address) {
      if (!address.street) {
        return
      }
      this.editAddress.address = address
      this.editAddress.showMap = false
    },
    /**
     * 获取拍摄地址
     * @function [getAddress]
     */
    getAddress () {
      this.$axios.get(this.$apis.address.findAddressByShopId, {
        params: {
          shopId: this.$store.state.user.userId,
          type: 'SHOT'
        }
      }).then((res) => {
        if (res.code === '1') {
          this.addressList = res.data
        } else {
          this.$message.error('获取拍摄地址失败')
        }
      })
    },
    /**
     * 保存地址
     * @function [save]
     */
    save () {
      if (!this.editAddress.contactName) {
        this.$message.error('请输入联系人名称')
        return
      }
      if (!this.editAddress.contactPhone) {
        this.$message.error('请输入联系人手机号')
        return
      }
      this.$axios.post(this.$apis.address.addAddress, {
        shopId: this.$store.state.user.userId,
        type: 'SHOT',
        address: this.editAddress.address,
        name: this.editAddress.contactName,
        tel: this.editAddress.contactPhone,
        remark: this.editAddress.remark,
        lng: this.editAddress.address.street.location.lng,
        lat: this.editAddress.address.street.location.lat
      }).then((res) => {
        if (res.code === '1') {
          this.editAddress.address.province = null
          this.editAddress.address.city = null
          this.editAddress.address.district = null
          this.editAddress.address.street = null
          this.editAddress.address.detailed = null
          this.editAddress.contactName = null
          this.editAddress.contactPhone = null
          this.editAddress.remark = null
          this.editAddress.showMap = true
          this.editAddress.dialogVisible = false
          this.getAddress()
          this.$message({
            type: 'success',
            message: '新建地址成功'
          })
        } else {
          this.$message.error('新建地址失败')
        }
      }).catch(() => {
        this.$message.error('新建地址失败')
      })
    },
    /**
     * 更新地址
     * @function [update]
     */
    update () {
      if (!this.editAddress.contactName) {
        this.$message.error('请输入联系人名称')
        return
      }
      if (!this.editAddress.contactPhone) {
        this.$message.error('请输入联系人手机号')
        return
      }
      this.$axios.post(this.$apis.address.editAddress, {
        shopId: this.$store.state.user.userId,
        type: 'SHOT',
        id: this.editAddress.id,
        address: this.editAddress.address,
        name: this.editAddress.contactName,
        tel: this.editAddress.contactPhone,
        remark: this.editAddress.remark,
        lng: this.editAddress.address.street.location.lng,
        lat: this.editAddress.address.street.location.lat
      }).then((res) => {
        if (res.code === '1') {
          this.editAddress.id = null
          this.editAddress.address.province = null
          this.editAddress.address.city = null
          this.editAddress.address.district = null
          this.editAddress.address.street = null
          this.editAddress.address.detailed = null
          this.editAddress.contactName = null
          this.editAddress.contactPhone = null
          this.editAddress.remark = null
          this.editAddress.showMap = true
          this.editAddress.dialogVisible = false
          this.getAddress()
          this.$message({
            type: 'success',
            message: '更新地址成功!'
          })
        } else {
          this.$message.error('更新地址失败')
        }
      }).catch(() => {
        this.$message.error('更新地址失败')
      })
    },
    /**
     * 取消编辑
     * @function [cancel]
     */
    cancel () {
      this.editAddress.id = null
      this.editAddress.address.province = null
      this.editAddress.address.city = null
      this.editAddress.address.district = null
      this.editAddress.address.street = null
      this.editAddress.address.detailed = null
      this.editAddress.contactName = null
      this.editAddress.contactPhone = null
      this.editAddress.remark = null
      this.editAddress.showMap = true
      this.editAddress.dialogVisible = false
    },
    /**
     * 删除
     * @function [del]
     * @param {Object} address -地址信息
     */
    del (address) {
      this.$confirm(`确定删除地址 ${address.address.province.name} ${address.address.city.name} ${address.address.district.name} ${address.address.street.name} ${address.address.detailed} ？`, '删除地址', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.delete(this.$apis.address.deleteAddressById, {
          params: {
            id: address.id
          }
        }).then((res) => {
          if (res.code === '1') {
            this.getAddress()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          } else {
            this.$message.error('删除失败')
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  mounted () {
    this.getAddress()
  }
}
</script>
