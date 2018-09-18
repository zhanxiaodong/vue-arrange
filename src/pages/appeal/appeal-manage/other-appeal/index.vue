<template lang="pug">
.other-appeal
  el-row.header
    el-col(:span="4")
      span.ml40 投诉编号
    el-col.text-center(:span="4")
      span 订单编号
    el-col.text-center(:span="4")
      span 被投诉方
    el-col.text-center(:span="4")
      span 状态
    el-col.text-center(:span="3")
      span 申请时间
    el-col.text-center(:span="5")
      span 订单操作
  ul.task-list
    li.task-item(
      v-for="item in appealList"
      v-bind:key="item.id")
      el-row.task-item__bottom.mt15.mb15
        el-col(:span="4")
          span.ml45 {{item.comNo ? item.comNo : '--'}}
        el-col.text-center(:span="4")
          span {{item.orderNo ? item.orderNo : '--'}}
        el-col.text-center(:span="4")
          span {{item.respondentName ? item.respondentName : '--'}}
        el-col.text-center(:span="4")
          span {{item.status ? item.status : '--' | appealStatus}}
        el-col.text-center(:span="3")
          span {{item.createTime,'YYYY-MM-DD' | timeFormat}}
        el-col.text-center(:span="5")
          ul.btn-list
            li
              el-button.btn-list__item(type="text") 查看详情
              el-button.btn-list__item(type="text") 撤销
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
       * 投诉列表
       * @type {Array}
       */
      appealList: [],
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
      this.getAppealList()
    },
    /**
     * 改变当前页数
     * @function [handleCurrentChange]
     * @param {Int} val -val
     */
    handleCurrentChange (val) {
      this.pagination.currentPage = val
      this.getAppealList()
    },
    /**
     * 获取投诉列表
     * @function [getAppealList]
     */
    getAppealList () {
      this.$axios.get(this.$apis.appeal.findComplaintPage, {
        params: {
          // 商户id
          userId: this.$store.state.user.userId,
          // 任务类型 RES(被投诉) | REQ(我投诉)
          type: 'RES',
          // 当前页数
          pageIndex: this.pagination.currentPage,
          // 当前页条数
          pageSize: this.pagination.pageSize
        }
      }).then((res) => {
        if (res.code === '1') {
          this.appealList = res.data.content
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
    this.getAppealList()
  },
  watch: {
    $route: {
      deep: true,
      /**
       * 监听路由变化
       */
      handler () {
        this.getAppealList()
      }
    }
  }
}
</script>