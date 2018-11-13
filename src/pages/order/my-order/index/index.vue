<template lang="pug">
.my-order-index
  el-row
    el-col(:span="24")
      tabs(@search="search")
  el-row.header.text-center
    el-col(:span="4")
      span.ml20 订单编号
    el-col(:span="4")
      span 发起时间
    el-col(:span="2")
      span 会员名称
    el-col(:span="2")
      span 搭配师
    el-col(:span="2")
      span 配送日期
    el-col(:span="3")
      span 订单状态
    el-col(:span="7")
      span 操作
  ul.order-list
    li.order-item(
      v-for="item in orderList"
      v-bind:key="item.box.id")
      el-row.order-item__top.text-center
        el-col(:span="4")
          span(@click="look(item)") {{item.box.orderNo}}
        el-col(:span="4")
          span {{item.box.createTime,'YYYY-MM-DD HH:mm' | timeFormat}}
        el-col(:span="2")
          span {{item.baby ? item.baby.call : '-'}}
        el-col(:span="2")
          span {{item.stylist}}
        el-col(:span="2")
          span {{item.box.orderTime}}
        el-col(:span="3")
          span {{item.box.status | boxStatus}}
        el-col(:span="7")
          el-col(:span="5")
            el-button.btn-list__item-text(type="text" :disabled="item.box.status !== 'LINK_UP'" @click="showDetails(item)") 前往配货
          el-col(:span="5")
            el-button.btn-list__item-text(type="text" :disabled="item.box.status !== 'NOTIFY_EXPRESS'" @click="showDetails(item)") 前往发货
          el-col(:span="5")
            el-button.btn-list__item-text(type="text" :disabled="item.box.status !== 'DELIVERY_COMPLETE' && item.box.status !== 'EVALUATED'" @click="showDetails(item)") 催付提醒
          el-col(:span="3")
            el-button.btn-list__item-text(type="text" :disabled="item.box.status !== 'PAY_COMPLETE' || item.box.status !== 'END'" @click="showDetails(item)") 结单
          el-col(:span="3")
            el-button.btn-list__item-text(type="text" @click="showDetails(item)") 详情
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
import tabs from '../components/tabs'

export default {
  components: {
    tabs
  },
  data () {
    return {
      /**
       * 搜索关键词
       * @type {String}
       */
      keyword: null,
      tel: this.$store.state.user.phone,
      /**
       * 数据分页
       * @type {Object}
       */
      pagination: {
        pageSize: 20,
        currentPage: 1,
        total: null
      },
      /**
       * 订单列表
       * @type {Array}
       */
      orderList: []
    }
  },
  methods: {
    look (item) {
      var status = item.box.status
      if (status === 'LINK_UP' || status === 'CREATE' || status === 'CLOSE') {
        return false
      } else {
        this.$router.push({
          name: 'new-task',
          params: {
            lookobj: item.box.id
          }
        })
      }
    },
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
     * 改变当前页数
     * @function [handleCurrentChange]
     * @param {Int} val -val
     */
    handleCurrentChange (val) {
      this.pagination.currentPage = val
      this.getTaskList()
    },
    /**
     * 搜索
     * @function [search]
     * @param {String} keyword -关键词
     */
    search (keyword) {
      this.keyword = keyword
      this.pagination.currentPage = 1
      this.getTaskList()
    },
    /**
     * 删除订单
     * @function [del]
     * @param {String} order -订单信息
     */
    del (order) {
      this.$confirm(`将删除订单 ${order.name}。删除后您可在回收站找回，或永久删除！`, '删除订单', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    /**
     * 查看订单详情
     * @function [showDetails]
     * @param {Strig} item -订单
     */
    showDetails (item) {
      var params = {}
      params.content = this.content
      params.pagination = this.pagination
      this.$router.push({
        name: 'my-order-details',
        query: {
          id: item.box.id
        },
        params: {
          dataobj: params
        }
      })
    },
    updateInstatus () {
      let status = this.$route.query.status
      var instatus = []
      instatus.push(status)
      if (status === 'DELIVERY_COMPLETE') {
        instatus.push('EVALUATED')
        instatus.push('PAY_PART')
      }
      if (status === 'END') {
        instatus.push('PAY_COMPLETE')
        instatus.push('CLOSE')
      }
      this.instatus = instatus
      return instatus
    },
    /**
     * 获取任务列表
     * @function [getTaskList]
     */
    getTaskList () {
      // let status = this.$route.query.status
      var inStatus = this.updateInstatus()
      this.$axios.post(this.$apis.task.getTaskList, {
        // 当前页数
        pageNo: this.pagination.currentPage - 1,
        // 当前页条数
        pageSize: this.pagination.pageSize,
        // 状态内的单子
        inStatus: inStatus,
        content: this.keyword,
        tel: this.tel
      }).then((res) => {
        if (res.code === '1') {
          this.orderList = res.data.boxList
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
    var params = this.$route.query.params
    if (params) {
      this.pagination = params.pagination
      this.content = params.content
    }
    this.getTaskList()
  },
  watch: {
    $route: {
      deep: true,
      /**
       * 监听路由变化
       */
      handler () {
        this.pagination.currentPage = 1
        this.pagination.pageSize = 20
        this.keyword = null
        this.getTaskList()
      }
    }
  }
}
</script>
