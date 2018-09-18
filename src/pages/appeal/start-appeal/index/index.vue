<template lang="pug">
.start-appeal-index
  el-row
    el-col(:span="24")
      tabs(@search="search")
  el-row.header.text-center
    el-col(:span="2")
      span.ml20 款号
    el-col(:span="3")
      span 品牌
    el-col(:span="1")
      span 尺码
    el-col(:span="3")
      span 颜色
    el-col(:span="2")
      span 库存
    el-col(:span="3")
      span 价格
    el-col(:span="4")
      span miniid
    el-col(:span="5")
      span 状态
  ul.order-list
    li.order-item(
      v-for="item in orderList"
      v-bind:key="item.id")
      el-row.order-item__top.text-center
        el-col(:span="2")
          span {{item.code ? item.code: '-'}}
        el-col(:span="3")
          span {{item.brand ? item.brand: '-'}}
        el-col(:span="1")
          span {{item.size ? item.size: '-'}}
        el-col(:span="3")
          span {{item.color ? item.color: '-'}}
        el-col(:span="2")
          span {{item.num - item.useNum}} / {{item.num}}
        el-col(:span="3")
          span {{item.initAmount ? item.initAmount: '-'}}
        el-col(:span="4")
          span {{item.id}}
        el-col(:span="6")
          el-col(:span="5")
            el-button.btn-list__item-text(type="text" v-if="item.status === 'DISABLED'" disabled) 编辑
            el-button.btn-list__item-text(type="text" v-else @click="editCode(item)") 编辑
          el-col(:span="5")
            el-button.btn-list__item-text(type="text" disabled) 上/下架
          el-col(:span="5")
            el-button.btn-list__item-text(type="text" disabled) 清算
          el-col(:span="5")
            el-button.btn-list__item-text(type="text" disabled) 删除
  el-pagination.pagination(
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    v-bind:current-page="pagination.currentPage"
    v-bind:page-sizes="[10, 20, 30, 40, 50]"
    v-bind:page-size="pagination.pageSize"
    v-bind:total="pagination.total"
    layout="total, sizes, prev, pager, next, jumper"
  )
  el-dialog.model( v-bind:visible.sync="closeVisible" width="40%" title="编辑款号下的商品")
    el-row
      el-form(label-position="left" ref="goodsForm"
        v-bind:model="goodsForm"
        v-bind:rules="formRules"
        label-width="100px")
        el-form-item(label="款号" prop="code" required)
          el-input.w194(v-model="goodsForm.code" :disabled="true")
        el-form-item(label="零售折扣" prop="discount")
          el-input.w194(type="number" v-model="goodsForm.discount")
            template(slot="append") 折
          el-tooltip(content="零售折扣" placement="top")
            a.el-icon-information.color-grey2.p-as.ml10
        el-form-item(label="操作" prop="updateBox")
          el-checkbox(v-model="goodsForm.updateBox") 是否需要更新已配货盒子的折扣
        el-row
          span.color-red1 (注:请以谨慎的态度来使用此功能,系统会记录您的操作记录!)
    span.dialog-footer(slot="footer") 
      el-button(@click="closeVisible = false") 取 消
      el-button(type="primary" @click="updateByCode('goodsForm')") 确 定
</template>

<script>
import tabs from '../components/tabs'

export default {
  components: {
    tabs
  },
  data () {
    return {
      closeVisible: false,
      goodsForm: {
        goodsId: '',
        code: '',
        updateBox: false,
        status: '',
        useNum: ''
      },
      formRules: {
        discount: [
          { required: true, message: '请输入零售折扣', trigger: 'blur' }
        ]
      },
      /**
       * 搜索关键词
       * @type {String}
       */
      keyword: null,
      /**
       * 商品列表
       * @type {Array}
       */
      orderList: [],
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
     * 查找货物
     * @function [updateByCode]
     * @param {String} formName - 表单名称
     */
    updateByCode (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('确认更新款号' + this.goodsForm.code + '下所有的商品折扣?', '', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'info'
          }).then(() => {
            this.$axios.post(this.$apis.goods.updateByCode, this.goodsForm).then((res) => {
              if (res.code === '1') {
                this.$message.success('更新成功')
                this.updateStatus()
                this.closeVisible = false
              } else {
                this.$message.error(res.message)
              }
            }).catch((errRes) => {
              this.$message.error(errRes.message)
            })
          }).catch(() => {
          })
        } else {
          return false
        }
      })
    },
    /**
     * 通过款号来更新折扣
     * @function [editCode]
     * @param {Object} val -val
     */
    editCode (item) {
      var status = item.status
      if (status === 'TEMP') {
        this.$router.push({
          name: 'appeal-manage',
          params: {
            dataobj: item
          }
        })
      } else {
        this.goodsForm.goodsId = item.id
        this.goodsForm.code = item.code
        this.goodsForm.discount = item.discount * 10
        this.goodsForm.status = status
        this.goodsForm.useNum = item.useNum
        this.closeVisible = true
      }
    },
    /**
     * 改变每页条数
     * @function [handleSizeChange]
     * @param {Int} val -val
     */
    handleSizeChange (val) {
      this.pagination.pageSize = val
      this.updateStatus()
    },
    /**
     * 改变当前页数
     * @function [handleCurrentChange]
     * @param {Int} val -val
     */
    handleCurrentChange (val) {
      this.pagination.currentPage = val
      this.updateStatus()
    },
    /**
     * 搜索
     * @function [search]
     * @param {String} keyword -关键词
     */
    search (keyword) {
      this.keyword = keyword
      this.pagination.currentPage = 1
      this.updateStatus()
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
        name: 'start-appeal-details',
        query: {
          id: item.box.id
        }
      })
    },
    /**
     * 获取任务列表
     * @function [getTaskList]
     */
    getTaskList (inStatus, neStatus) {
      this.$axios.post(this.$apis.goods.findGoodsPages, {
        // 当前页数
        pageNo: this.pagination.currentPage - 1,
        // 当前页条数
        pageSize: this.pagination.pageSize,
        neStatus: neStatus,
        // 状态内的单子
        inStatus: inStatus,
        // 关键字搜索
        content: this.keyword
      }).then((res) => {
        if (res.code === '1') {
          this.orderList = res.data.goodsList
          this.pagination.total = res.data.totalElements || 0
        } else {
          this.$message.error(res.message)
        }
      }).catch((errRes) => {
        this.$message.error(errRes.message)
      })
    },
    updateStatus () {
      let status = this.$route.query.status
      if (status === 'ALL') {
        var nestatus = []
        nestatus.push('MODIFY')
        this.getTaskList(null, nestatus)
      } else {
        var instatus = []
        instatus.push(status)
        this.getTaskList(instatus, null)
      }
    }
  },
  mounted () {
    this.updateStatus()
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
        this.updateStatus()
      }
    }
  }
}
</script>
