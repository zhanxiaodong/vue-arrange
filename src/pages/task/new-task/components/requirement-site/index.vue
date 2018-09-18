<template lang="pug">
.requirement-site
  el-form.mt20(
    label-position="left"
    ref="form"
    v-bind:model="form"
    v-bind:rules="formRules"
    label-width="100px")
    el-form-item(label="拍摄地点" prop="address")
      span.mr20(v-if="form.address.address.province.name") {{form.address.address.province.name}} {{form.address.address.city.name}} {{form.address.address.district.name}} {{form.address.address.street.name}} {{form.address.address.detailed}}
      select-address(v-bind:type="'shoot'" @address="selectAddress")
    el-form-item(label="拍摄时间" prop="time")
      el-date-picker(
        v-model="form.time"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      )
    el-form-item(label="选择模特" prop="modelNum" v-if="taskType === 'invited-model'")
      cooperative-model(@selectedModel="selectModel")
    el-form-item(label="模特人数" prop="modelNum" v-if="taskType === 'booking-model'")
      el-input.w194(v-model="form.modelNum" type="number")
        template(slot="append") 人
    el-form-item(label="模特要求" required)
      el-tag.pull-left.mr10.h-lh28.mt4(
        v-for="item in form.request.arr"
        v-bind:key="item"
        v-bind:closable="true"
        v-bind:close-transition="false"
        @close="delRequest(item)"
        type="primary") {{item}}
      model-request-cascader(@request="saveModelRequest" v-if="form.request.modelRequestCascaderVisible")
      el-button(v-else size="small" @click="form.request.modelRequestCascaderVisible = true") 添加模特要求
      el-checkbox.ml20.mr10(v-model="form.request.other") 其他
      el-input.w194(v-if="form.request.other" v-model="form.request.otherText")
    el-form-item(label="经纪人" prop="broker")
      el-select.w194.mr20(v-model="form.broker" placeholder="请选择经纪人")
        el-option(v-for="item in broker" v-bind:key="item.name" v-bind:label="item.text" v-bind:value="item.name")
</template>

<script>
export default {
  data () {
    return {
      // pickerOptions: {
      //   disabledDate (time) {
      //     return time.getTime() < Date.now() - 8.64e7
      //   }
      // },
      /**
       * 需求设置表单
       * @type {Object}
       */
      form: {
        // 拍摄地址
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
        // 拍摄时间
        time: null,
        // 模特列表
        modelList: [],
        // 模特数量
        modelNum: null,
        // 模特要求
        request: {
          arr: [],
          other: false,
          otherText: null,
          modelRequestCascaderVisible: false
        },
        // 经纪人
        broker: null
      },
      /**
       * 表单校验
       * @type {Object}
       */
      formRules: {
        address: [
          { required: true, message: '请选择拍摄地址', trigger: 'blur' }
        ],
        // time: [
        //   { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        // ],
        modelNum: [
          { required: true, message: '请输入模特人数', trigger: 'blur' }
        ],
        broker: [
          { required: true, message: '请选择经纪人', trigger: 'blur' }
        ]
      },
      broker: []
    }
  },
  props: {
    /**
     * 任务类型
     * @type {String}
     * invited-model - 模特邀约；booking-model - 模特预约
     */
    taskType: {
      type: String,
      default: null
    }
  },
  methods: {
    /**
     * 改变from
     * @function [handleChangeForm]
     */
    handleChangeForm () {
      this.$emit('change', this.form)
    },
    /**
     * 初始化经纪人
     * @function [initBroker]
     */
    initBroker () {
      this.broker.push({
        name: 'no-broker',
        text: '无需经纪人'
      })
    },
    /**
     * 选择地址
     * @function [selectAddress]
     * @param {Object} address -地址信息
     */
    selectAddress (address) {
      this.form.address = address
    },
    /**
     * 保存模特需求
     * @function [saveModelRequest]
     * @param {Object} value -模特要求
     */
    saveModelRequest (value) {
      const request = value[2] + value[1]
      const requestArr = this.form.request.arr
      if (request && requestArr.indexOf(request) < 0) {
        this.form.request.arr.push(request)
      }
      this.form.request.modelRequestCascaderVisible = false
    },
    /**
     * 删除模特要求
     * @function [delRequest]
     * @param {String} item -模特要求
     */
    delRequest (item) {
      this.form.request.arr.splice(this.form.request.arr.indexOf(item), 1)
    },
    /**
     * 选择模特
     * @function [selectModel]
     * @param {Array} list -模特列表
     */
    selectModel (list) {
      this.form.modelList = list
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
  },
  created () {
    this.initBroker()
  }
}
</script>
