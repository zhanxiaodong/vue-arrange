<template lang="pug">
.booking-model
  el-row.header
    el-col(:span="3")
      el-checkbox.ml20() 全选
    el-col(:span="8")
      span 订单
    el-col.text-center(:span="3")
      span 价格
    el-col.text-center(:span="3")
      span 数量
    el-col.text-center(:span="3")
      span 状态
    el-col.text-center(:span="4")
      span 订单操作
  ul.task-list
    li.task-item(
      v-for="item in taskList"
      v-bind:key="item.id")
      el-row.task-item__top
        el-col(:span="11")
          el-checkbox.ml20(v-model="item.select")
            b.mr10 {{item.createTime ? item.createTime : '--'}}
            span 订单号:{{item.id}}
        el-col.text-center(:span="3")
          span {{item.model ? item.model : '--'}}
        el-col.text-center(:span="3")
          el-tag(type="gray") {{item.type ? item.type : '--' | taskType}}
      el-row.task-item__bottom.mt15.mb15
        el-col(:span="11")
          span.ml45 {{item.title ? item.title : '--'}}
        el-col.text-center(:span="3")
          span ￥ {{item.price ? item.price : '--'}}
        el-col.text-center(:span="3")
          span {{item.num ? item.num : '--'}}
        el-col.text-center(:span="3")
          span {{item.status ? item.status : '--' | taskStatus}}
        el-col.text-center(:span="4")
          ul.btn-list
            li(v-if="item.status === 1")
              el-button.btn-list__item(type="text") 查看详情
            li
              el-button.btn-list__item(type="text") 删除
</template>

<script>
export default {
  data () {
    return {
      /**
       * 订单类型
       * @type {String}
       */
      type: this.$route.name,
      /**
       * 任务列表
       * @type [Array]
       */
      taskList: []
    }
  },
  methods: {
    /**
     * 获取任务列表
     * @function [getTaskList]
     */
    getTaskList () {
      this.$axios.get(this.$apis.task.getTaskList, {
        params: {
          // 商户id
          shopId: this.$store.state.user.userId,
          // 任务类型
          type: this.type,
          // 当前页数
          pageIndex: 1,
          // 当前页条数
          pageSize: 20
        }
      }).then((res) => {
        if (res.code === '1') {
          this.taskList = res.data
        } else {
          this.$message.error(res.message)
        }
      }).catch((errRes) => {
        this.$message.error(errRes.message)
      })
    }
  },
  mounted () {
    this.getTaskList()
  }
}
</script>
