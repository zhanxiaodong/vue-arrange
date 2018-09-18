<template lang="pug">
.msg-center-index
  el-row
    el-col(:span="24")
      h2
        i.el-icon-message.mr5
        span 消息中心
  el-row.mt20
    el-col(:span="24")
      tabs
  el-row.mt40
    el-col(:span="24")
      ul.msg-list
        li.msg-item(
          v-for="item in msgList"
          v-bind:key="item.id")
          img.pull-left.w80.h80(v-bind:src="item.avatar")
          .pull-left.ml20.mt10
            h3.mb10
              span.color-blue2 {{item.title}}
              span 报名了您的任务
            p {{item.content}}
          .pull-right.mt10
            span.ft16.color-grey3 {{item.createTime,'YYYY-MM-DD HH:mm' | timeFormat}}
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
import tabs from './components/tabs'
export default {
  components: {
    tabs
  },
  data () {
    return {
      /**
       * 消息类型
       * @type {String}
       */
      type: this.$route.query.status,
      /**
       * 消息列表
       * @type {array}
       */
      msgList: [],
      /**
       * 数据分页
       * @type {Object}
       */
      pagination: {
        pageSize: 10,
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
      this.getMsgList()
    },
    /**
     * 改变当前页数
     * @function [handleCurrentChange]
     * @param {Int} val -val
     */
    handleCurrentChange (val) {
      this.pagination.currentPage = val
      this.getMsgList()
    },
    /**
     * 获取消息列表
     * @function [getMsgList]
     */
    getMsgList () {
      this.$axios.get(this.$apis.msg.getMsgList, {
        params: {
          // 消息类型
          type: this.$route.query.status,
          // 商户id
          userId: this.$store.state.user.userId,
          // 当前页数
          pageIndex: this.pagination.currentPage,
          // 当前页条数
          pageSize: this.pagination.pageSize
        }
      }).then((res) => {
        if (res.code === '1') {
          this.msgList = res.data.content
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
    if (this.$route.query.status) {
      this.getMsgList()
    }
  },
  watch: {
    '$route.query.status' () {
      if (this.$route.query.status) {
        this.getMsgList()
      }
    }
  }
}
</script>
