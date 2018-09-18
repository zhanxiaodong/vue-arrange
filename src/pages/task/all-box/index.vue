<template lang="pug">
.all-box
  el-row.header
    el-col(:span="4")
      span.ml40 用户名称
    el-col.text-center(:span="4")
      span 发起时间
    el-col.text-center(:span="4")
      span 会员类型
    el-col.text-center(:span="4")
      span 配送日期
    el-col.text-center(:span="4")
      span 订单编号
    el-col.text-center(:span="4")
      span 操作
  el-row
    el-col(:span="24")
      box-card.mb20(
        v-for="item in taskList"
        v-bind:key="item.box.id"
        v-bind:item="item")
        
  el-pagination.pagination(
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    v-bind:current-page="pagination.currentPage"
    v-bind:page-sizes="[10, 20, 30, 40, 50]"
    v-bind:page-size="pagination.pageSize"
    v-bind:total="pagination.total"
    layout="total, sizes, prev, pager, next, jumper"
  )
</template>

<script>
export default {
  data () {
    return {
      /**
       * 是否展开
       * @type {Boolean}
       */
      open: false,
      /**
       * 任务列表
       * @type {Array}
       */
      taskList: [],
      /**
       * 数据分页
       * @type {Object}
       */
      pagination: {
        pageSize: 20,
        currentPage: 1,
        total: null
      }
    }
  },
  methods: {
    /**
     * 改变每页条数
     * @function [handleSizeChange]
     * @param {Int} val -val
     */
    handleSizeChange (val) {
      this.pagination.pageSize = val
      this.getTaskList()
    },
    /**
     * 沟通确认框
     */
    confirm (item) {
      var status = item.box.status
      var str
      var updateStatus
      if (status === 'CREATE') {
        str = '是否确认已完成有效沟通,货值顾客需求?'
        updateStatus = 'NOTIFY_EXPRESS'
      } else if (status === 'RETURN_EXPRESS') {
        str = '是否确认顾客推荐已到仓,并无售后问题?'
        updateStatus = 'END'
      } else if (status === 'DISPATCHING') {
        str = '是否确认顾客订单已达到,用户已签收?'
        updateStatus = 'DELIVERY_COMPLETE'
      } else if (status === 'NOTIFY_EXPRESS') {
        str = '是否确认已完成配货,符合顾客的提及需求?'
        updateStatus = 'DISPATCHING'
      } else {
        str = '该状态不支持操作'
      }
      this.$confirm(str, '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        if (updateStatus) {
          var obj = {}
          obj.id = item.box.id
          obj.status = updateStatus
          this.updateBox(obj)
        }
      }).catch(() => {
      })
    },
    updateBox (obj) {
      this.$axios.post(this.$apis.task.updateBoxStatus, obj).then((res) => {
        if (res.code !== '1') {
          this.$message.error(res.message)
        } else {
          this.getTaskList()
        }
      }).catch((errRes) => {
        this.$message.error(errRes.message)
      })
    },
    /**
     * 改变当前页数
     * @function [handleCurrentChange]
     * @param {Int} val -val
     */
    handleCurrentChange (val) {
      this.pagination.currentPage = val
      this.getTaskList()
    },
    /**
     * 获取任务列表
     * @function [getTaskList]
     */
    getTaskList () {
      var inStatus = ['CREATE', 'RETURN_EXPRESS', 'DISPATCHING', 'NOTIFY_EXPRESS']
      this.$axios.post(this.$apis.task.getTaskList, {
        // 当前页数
        pageNo: this.pagination.currentPage - 1,
        // 当前页条数
        pageSize: this.pagination.pageSize,
        // 状态内的单子
        inStatus: inStatus
      }).then((res) => {
        if (res.code === '1') {
          this.taskList = res.data.boxList
          this.pagination.total = res.data.totalElements || 0
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
