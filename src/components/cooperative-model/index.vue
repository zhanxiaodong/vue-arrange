<template lang="pug">
.cooperative-model
  el-row
    el-col.d-if(:span="24")
      ol.selected-model-list
        li.selected-model-item(v-for="item in selectedModelList" v-bind:key="item.id")
          img(v-bind:src="item.avatar")
          p {{item.name}}
      .btn-add-model(@click="openDialog()")
        i.el-icon-plus
        .btn-add-model__text 选择模特

  el-dialog(
    v-bind:title="dialog.title"
    v-bind:visible.sync="dialog.visible"
    width="60%"
  )
    el-row.model-list.mt20.mb20
      el-col.model-item(
        v-for="item in modelList"
        v-bind:key="item.id"
        v-bind:span="6"
        v-bind:class="[selectedModelIdList.indexOf(item.id) >= 0 ? 'active' :'']")
        img.w100.h100(v-bind:src="item.avatar" @click="selectModel(item)")
        i.select-icon.el-icon-check.color-blue3
        p {{item.name}}

    footer(slot="footer")
      el-button(type="success" plain @click="closeDialog()") 取消
      el-button(type="success" @click="submit()") 确定
</template>

<script>
export default {
  data () {
    return {
      /**
       * 对话框
       * @type {Object}
       */
      dialog: {
        // 标题
        title: null,
        // 对话框可见性
        visible: false
      },
      /**
       * 模特列表
       * @type {Array}
       */
      modelList: [],
      /**
       * 选中模特
       * @type {Array}
       */
      selectedModelList: []
    }
  },
  computed: {
    /**
     * 选中模特的ID列表
     * @function [selectedModelIdList]
     * @returns {Array}
     */
    selectedModelIdList () {
      const array = []
      this.selectedModelList.forEach((item) => {
        array.push(item.id)
      })
      return array
    }
  },
  methods: {
    /**
     * 打开对话框
     * @function [openDialog]
     */
    openDialog () {
      this.dialog.title = '选择模特'
      this.dialog.visible = true
    },
    /**
     * 关闭对话框
     * @function [closeDialog]
     */
    closeDialog () {
      this.dialog.title = null
      this.dialog.visible = false
      this.selectedModelList = []
    },
    /**
     * 提交
     * @function [submit]
     */
    submit () {
      this.$emit('selectedModel', this.selectedModelIdList)
      this.dialog.title = null
      this.dialog.visible = false
    },
    /**
     * 选择模特
     * @function [selectModel]
     * @param {Object} model -模特信息
     */
    selectModel (model) {
      // 检查模特是否存在
      const noModel = this.selectedModelList.every((item, index) => {
        // 如果模特存在从数组中删除模特，并且返回false
        if (item.id === model.id) {
          this.selectedModelList.splice(index, 1)
          return false
        }
        // 如果模特不存在返回true
        return true
      })

      // 模特不存在就增加模特到数组中
      if (noModel) {
        this.selectedModelList.push(model)
      }
    },
    /**
     * 获取合作模特
     * @function [getCooperativeModel]
     */
    getCooperativeModel () {
      this.$axios.get(this.$apis.model.getCooperativeModel, {
        params: {
          shopId: this.$store.state.user.userId,
          isPre: false
        }
      }).then((res) => {
        if (res.code === '1') {
          this.modelList = res.data
        } else {
          this.$message.error(res.message)
        }
      }).catch((errRes) => {
        this.$message.error(errRes.message)
      })
    }
  },
  mounted () {
    this.getCooperativeModel()
  }
}
</script>
