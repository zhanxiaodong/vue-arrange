<template lang="pug">
.select-address
  el-button(type="success" size="small" @click="openDialog()") 选择地址
  
  el-dialog(
    v-bind:title="dialog.title"
    v-bind:visible.sync="dialog.visible"
    width="60%"
  )
    el-row
      el-col(:span="24")
        h2.color-green1.text-center 当前地址
        h3.text-center.mt10 {{address.address.province.name}} {{address.address.city.name}} {{address.address.district.name}} {{address.address.street.name}} {{address.address.detailed}}

    el-row.mt20
      el-col(:span="24")
        shipping-address-card.mb20(
          v-if="type === 'shipping'"
          v-for="item in addressList"
          v-bind:key="item.id"
          v-bind:address="item"
          v-bind:isSelect="true"
          @select="select")
        shoot-address-card.mb20(
          v-if="type === 'shoot'"
          v-for="item in addressList"
          v-bind:key="item.id"
          v-bind:address="item"
          v-bind:isSelect="true"
          @select="select")
    footer(slot="footer")
      el-button(type="success" plain @click="closeDialog()") 取消
      el-button(type="success" @click="submit()") 确定
</template>

<script>
export default {
  data () {
    return {
      /**
       * 当前地址
       * @type {Object}
       */
      address: {
        address: {
          province: {
            name: null
          },
          city: {
            name: null
          },
          street: {
            name: null
          },
          district: {
            name: null
          },
          detailed: null
        }
      },
      /**
       * 地址列表
       * @type {Array}
       */
      addressList: [],
      /**
       * 对话框
       */
      dialog: {
        // 标题
        title: null,
        // 对话框可见性
        visible: false
      }
    }
  },
  props: {
    /**
     * 地址类型
     * @type {Object}
     * shipping - 邮寄地址；shoot - 拍摄地址
     */
    type: {
      type: String,
      default: null
    }
  },
  methods: {
    /**
     * 打开地址对话框
     * @function [openDialog]
     */
    openDialog () {
      if (this.type === 'shipping') {
        this.dialog.title = '选择邮寄地址'
      } else {
        this.dialog.title = '选择拍摄地址'
      }
      this.dialog.visible = true
    },
    /**
     * 关闭地址对话框
     * @function [closeDialog]
     */
    closeDialog () {
      this.dialog.title = null
      this.dialog.visible = false
    },
    /**
     * 获取地址
     * @function [getAddress]
     */
    getAddress () {
      this.$axios.get(this.$apis.address.findAddressByShopId, {
        params: {
          shopId: this.$store.state.user.userId,
          type: this.type === 'shipping' ? 'RETURN' : 'SHOT'
        }
      }).then((res) => {
        if (res.code === '1') {
          this.addressList = res.data
        } else {
          this.$message.error(res.message)
        }
      }).catch((errRes) => {
        this.$message.error(errRes.message)
      })
    },
    /**
     * 选择地址
     * @function [select]
     * @param {Object} address -address
     */
    select (address) {
      this.address = address
    },
    /**
     * 获取默认地址
     * @function [getDefaultAddress]
     */
    getDefaultAddress () {
      this.$axios.get(this.$apis.address.findDefaultAddressByShopId, {
        params: {
          shopId: this.$store.state.user.userId,
          type: this.type === 'shipping' ? 'RETURN' : 'SHOT'
        }
      }).then((res) => {
        if (res.code === '1') {
          this.address = res.data
        } else {
          this.$message.error(res.message)
        }
      }).catch((errRes) => {
        this.$message.error(errRes.message)
      })
    },
    /**
     * 提交地址
     * @function [submit]
     */
    submit () {
      this.$emit('address', this.address)
      this.dialog.title = null
      this.dialog.visible = false
    }
  },
  mounted () {
    this.getDefaultAddress()
    this.getAddress()
  }
}
</script>
