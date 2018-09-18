<template lang="pug">
.business-site
  el-form.mt20(
    label-position="left"
    ref="form"
    v-bind:model="form"
    v-bind:rules="formRules"
    label-width="100px")
    el-form-item(label="拍摄福利" required)
      el-checkbox(v-model="form.welfare.food") 美食
      el-checkbox(v-model="form.welfare.shuttle") 到站接送
      el-checkbox(v-model="form.welfare.sendClothes") 送衣服
      el-checkbox.mr10(v-model="form.welfare.other") 其他
      el-input.w194(v-if="form.welfare.other" v-model="form.welfare.otherText")
    el-form-item(label="费用约定")
      el-form-item.pull-left.w194.mr10(prop="price")
        el-input.w194(v-model="form.price" )
          template(slot="append") 元
      el-form-item.pull-left.w194.mr10(prop="salaryMethod")
        el-select.w194(v-model="form.salaryMethod" placeholder="薪酬方式")
          el-option(v-for="item in salaryMethod" v-bind:key="item.name" v-bind:label="item.text" v-bind:value="item.name")
    el-form-item(label="奖励金" prop="bonus")
      el-input.w194(v-model="form.bonus")
        template(slot="append") 元
      span.ml20(v-if="form.bonus") {{form.bonus}} 积分
      el-tooltip(content="奖励金" placement="top")
        a.el-icon-information.color-grey2.p-as.ml10
    el-form-item(label="保证金" prop="bail")
      el-input.w194(v-model="form.bail")
        template(slot="append") 元
      el-tooltip(content="保证金" placement="top")
        a.el-icon-information.color-grey2.p-as.ml10
    el-form-item(label="有效期" prop="validPeriod")
      el-input.w194(v-model="form.validPeriod")
        template(slot="append") 天
      el-tooltip(content="有效期" placement="top")
        a.el-icon-information.color-grey2.p-as.ml10
</template>

<script>
import {
  SALARY_METHOD
} from '@/common/constants'
export default {
  data () {
    return {
      salaryMethod: SALARY_METHOD,
      /**
       * 交易设置表单
       * @type {Object}
       */
      form: {
        // 拍摄福利
        welfare: {
          // 美食
          food: false,
          // 到站接送
          shuttle: false,
          // 送衣服
          sendClothes: false,
          // 其他
          other: false,
          // 其他文本
          otherText: null
        },
        // 费用约定
        price: null,
        // 薪酬方式
        salaryMethod: null,
        // 奖励金
        bonus: null,
        // 保证金
        bail: null,
        // 有效期
        validPeriod: null
      },
      /**
       * 表单校验
       * @type {Object}
       */
      formRules: {
        bonus: [
          { required: true, message: '请输入奖励金', trigger: 'blur' }
        ],
        bail: [
          { required: true, message: '请输入保证金', trigger: 'blur' }
        ],
        validPeriod: [
          { required: true, message: '请输入有效期', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    /**
     * 改变form
     * @function [handleChangeForm]
     */
    handleChangeForm () {
      this.$emit('change', this.form)
    }
  },
  watch: {
    form: {
      deep: true,
      /**
       * 监听对象变化
       */
      handler () {
        this.handleChangeForm()
      }
    }
  }
}
</script>
