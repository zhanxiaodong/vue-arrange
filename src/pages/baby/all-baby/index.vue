<template lang="pug">
.all-baby
  el-row.pt40
    el-col(:span="24")
      tabs(@search="search")
  el-row.header.text-center
    el-col(:span="4")
      span 顾客名称
    el-col(:span="3")
      span 注册日期
    el-col(:span="4")
      span 会员编号
    el-col(:span="3")
      span 会员类型
    el-col(:span="3")
      span 订阅计划
    el-col(:span="2")
      span 评级
    el-col(:span="3")
      span 归属
    el-col(:span="2")
      span 操作
  ul.baby-list
    li.baby-item(
      v-for="item in babyList"
      v-bind:key="item.id")
      el-row.baby-item__top.text-center
        el-col(:span="4")
          el-col.imgcenter(:span="12")
            img.w30.h30.ml20(v-bind:src="imgurl")
          el-col.text-left(:span="12")
            span {{item.call}}
        el-col(:span="3")
          span {{item.createTime,'YYYY-MM-DD HH:mm' | timeFormat}}
        el-col(:span="4")
          span {{item.id}}
        el-col(:span="3")
          span {{item.userLev}}
        el-col(:span="3")
          span {{item.planDesc}}
        el-col(:span="2")
          span {{item.level ? item.level : 'b'}}
        el-col(:span="3")
          span {{item.stylistName? item.stylistName : 'Summer'}}
        el-col(:span="2")
            el-button.btn-list__item-text(type="text" @click="showDetails(item)") 用户详情
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
import tabs from '../my-baby/components/tabs'
export default {
  components: {
    tabs
  },
  data () {
    return {
      imgurl: '/static/ava.png',
      tel: '18368152702',
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
       * 孩子列表
       * @type {Array}
       */
      babyList: []
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
      this.getBabyList()
    },
    /**
     * 改变当前页数
     * @function [handleCurrentChange]
     * @param {Int} val -val
     */
    handleCurrentChange (val) {
      this.pagination.currentPage = val
      this.getBabyList()
    },
    /**
     * 搜索
     * @function [search]
     * @param {String} keyword -关键词
     */
    search (keyword) {
      this.keyword = keyword
      this.pagination.currentPage = 1
      this.getBabyList()
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
      this.$router.push({
        name: 'baby-details',
        query: {
          id: item.id
        }
      })
    },
    /**
     * 获取孩子列表
     * @function [getBabyList]
     */
    getBabyList () {
      // let status = this.$route.query.status
      this.$axios.post(this.$apis.baby.getBabyList, {
        // 当前页数
        pageNo: this.pagination.currentPage - 1,
        // 当前页条数
        pageSize: this.pagination.pageSize,
        content: this.keyword
      }).then((res) => {
        if (res.code === '1') {
          this.babyList = res.data.babyList
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
    this.getBabyList()
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
        this.getBabyList()
      }
    }
  }
}
</script>