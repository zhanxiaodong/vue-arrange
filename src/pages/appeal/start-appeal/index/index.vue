<template lang="pug">
.start-appeal-index
  el-row
    el-col(:span="24")
      tabs(@search="search" :goodsReport="goodsReport")
  el-row.header.text-center
    el-col(:span="1")
      span 性别
    el-col(:span="1")
      span 类别
    el-col(:span="3")
      span 款号
    el-col(:span="1")
      span 尺码
    el-col(:span="2")
      span 品牌
    el-col(:span="2")
      span 颜色
    el-col(:span="1")
      span 零售价
    el-col(:span="1")
      span 数量
    el-col(:span="2")
      span 可使用
    el-col(:span="1")
      span 运输中
    el-col(:span="2")
      span 退货中
    el-col(:span="1")
      span 销售
    el-col(:span="1")
      span 清算
    el-col(:span="2")
      span 退回次数
    el-col(:span="3")
      span 操作
  ul.order-list
    li.order-item(
      v-for="item in orderList"
      v-bind:key="item.id")
      el-row.order-item__top.text-center
        el-col(:span="1")
          span {{item.gender ? item.gender: '0'}}
        el-col(:span="1")
          span {{item.type ? item.type: '0'}}
        el-col(:span="3")
          span {{item.code ? item.code: '0'}}
        el-col(:span="1")
          span {{item.size ? item.size: '0'}}
        el-col(:span="2")
          span {{item.brand ? item.brand: '0'}}
        el-col(:span="2")
          span {{item.color ? item.color: '0'}}
        el-col(:span="1")
          span {{item.initAmount ? item.initAmount: '0'}}
        el-col(:span="1")
          span {{item.num ? item.num: '0'}}
        el-col(:span="2")
          span {{item.availableNum ? item.availableNum: '0'}}
        el-col(:span="1")
          span {{item.transportNum ? item.transportNum: '0'}}
        el-col(:span="2")
          span {{item.backNum ? item.backNum: '0'}}
        el-col(:span="1")
          span {{item.saleNum ? item.saleNum: '0'}}
        el-col(:span="1")
          span {{item.clearNum ? item.clearNum: '0'}}
        el-col(:span="2")
          span {{item.hisBackNum ? item.hisBackNum: '0'}}
        el-col(:span="3")
          el-col(:span="6")
            el-button.btn-list__item-text(type="text" @click="showDetails(item)") 详情
          el-col(:span="6")
            el-button.btn-list__item-text(type="text" @click="inEdit(item.id,item.code)") 补录
          el-col(:span="6")
            el-button.btn-list__item-text(type="text" @click="clearEdit(item.id,item.code)") 清算
          el-col(:span="6")
            el-button.btn-list__item-text(type="text" @click="del(item.id)") 删除
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
        el-form-item(label="数量" prop="num")
          el-input.w194(type="number" v-model="goodsForm.num")
            //template(slot="append") 折
          el-tooltip(content="数量" placement="top")
            a.el-icon-information.color-grey2.p-as.ml10
        el-form-item(label="操作" prop="updateBox")
          el-checkbox(v-model="goodsForm.updateBox") 是否需要更新已配货盒子的折扣
        el-row
          span.color-red1 (注:请以谨慎的态度来使用此功能,系统会记录您的操作记录!)
    span.dialog-footer(slot="footer") 
      el-button(@click="closeVisible = false") 取 消
      el-button(type="primary" @click="updateByCode('goodsForm')") 确 定
  el-dialog.model( v-bind:visible.sync="inCloseVisible" width="40%" title="商品补录")
    el-row
      el-form(label-position="left" ref="inGoodsStock"
        v-bind:model="inGoodsStock"
        label-width="100px")
        el-form-item(label="款号" prop="code")
          el-input.w194(v-model="inGoodsStock.code" :disabled="true")
        el-form-item(label="补录数量" prop="discount")
          el-input.w194(type="number" v-model="inGoodsStock.inNum")
    span.dialog-footer(slot="footer") 
      el-button(@click="inCloseVisible = false") 取 消
      el-button(type="primary" @click="inGoods('inGoodsStock')") 确 定
  el-dialog.model( v-bind:visible.sync="clearCloseVisible" width="40%" title="商品清算")
    el-row
      el-form(label-position="left" ref="clearGoodsStock"
        v-bind:model="clearGoodsStock"
        label-width="100px")
        el-form-item(label="款号" prop="code")
          el-input.w194(v-model="clearGoodsStock.code" :disabled="true")
        el-form-item(label="清算" prop="discount")
          el-input.w194(type="number" v-model="clearGoodsStock.clearNum")
        el-form-item(label="清算价格" prop="discount")
          el-input.w194(type="clearPrice" v-model="clearGoodsStock.clearPrice")
    span.dialog-footer(slot="footer") 
      el-button(@click="clearCloseVisible = false") 取 消
      el-button(type="primary" @click="clearGoods('clearGoodsStock')") 确 定
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
      inCloseVisible: false,
      clearCloseVisible: false,
      inGoodsStock: {
        goodsId: '',
        inNum:0
      },
      clearGoodsStock: {
        goodsId: '',
        clearPrice: 0,
        clearNum:0
      },
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
      searchData: {
      	goodsStatus:"0",
      	goods: {},
        minMoney: null,
        maxMoney: null,
      },
      goodsReport:[
        {
          name: "0",
          text: '所有商品'
        },
        {
          name: "1",
          text: '可使用'
        },
        {
          name: "2",
          text: '运输中'
        },
        {
          name: "3",
          text: '退货中'
        },
        {
          name: "4",
          text: '销售'
        },
        {
          name: "5",
          text: '清算'
        },
        {
          name: "6",
          text: '售完'
        }
      ],
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
            this.$axios.post(this.$apis.goods.updateByCode, this.inGoodsStock).then((res) => {
              if (res.code === '1') {
                this.$message.success('更新成功')
                this.getTaskList()
                this.incloseVisible = false
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
    inEdit (goodsId,code) {
      this.inGoodsStock.goodsId = goodsId
      this.inGoodsStock.code = code
      this.inCloseVisible = true
    },
    clearEdit (goodsId,code) {
      this.clearGoodsStock.goodsId = goodsId
      this.clearGoodsStock.code = code
      this.clearCloseVisible = true
    },
    inGoods () {
      this.$axios.post(this.$apis.goods.inGoods, this.inGoodsStock).then((res) => {
	      if (res.code === '1') {
	        this.$message.success('入库成功')
	        this.getTaskList()
	        this.inCloseVisible = false
	      } else {
	        this.$message.error(res.message)
	      }
	    }).catch((errRes) => {
	      this.$message.error(errRes.message)
	    })	
    },
    clearGoods () {
      this.$axios.post(this.$apis.goods.clearGoods, this.clearGoodsStock).then((res) => {
	      if (res.code === '1') {
	        this.$message.success('清算成功')
	        this.getTaskList()
	        this.clearCloseVisible = false
	      } else {
	        this.$message.error(res.message)
	      }
	    }).catch((errRes) => {
	      this.$message.error(errRes.message)
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
    search (searchData) {
      this.searchData = searchData
      this.pagination.currentPage = 1
      this.getTaskList()
    },
    /**
     * 删除订单
     * @function [del]
     * @param {String} order -订单信息
     */
    del (goodsId) {
      this.$confirm(`确定删除商品`, '删除商品', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
      	this.$axios.post(this.$apis.goods.deleteGoodsById, {
        goodsId: goodsId
	      }).then((res) => {
	        if (res.code === '1') {
	          this.$message({
		          type: 'success',
		          message: '删除成功!'
		        })
	          this.getTaskList()
	        } else {
	          this.$message.error(res.message)
	      }
	      }).catch((errRes) => {
	        this.$message.error(errRes.message)
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
    	const {href} = this.$router.resolve({
        name: 'start-appeal-goods',
        query: {
          id: item.id
        }
      })
      window.open(href, '_blank')
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
        goodsStatus: this.searchData.goodsStatus,
        minMoney: this.searchData.minMoney,
        maxMoney: this.searchData.maxMoney,
        goods: this.searchData.goods,
      }).then((res) => {
        if (res.code === '1') {
          this.orderList = res.data.goodsList
          this.report(res.data.goodsReport)
          this.pagination.total = res.data.totalElements || 0
        } else {
          this.$message.error(res.message)
        }
      }).catch((errRes) => {
        this.$message.error(errRes.message)
      })
    },
    report (goodsReport) {
      this.goodsReport[0].text = '所有商品('+goodsReport.sum+')'
      this.goodsReport[1].text = '可使用('+goodsReport.availableSum+')'
      this.goodsReport[2].text = '运输中('+goodsReport.transportSum+')'
      this.goodsReport[3].text = '退货中('+goodsReport.backSum+')'
      this.goodsReport[4].text = '销售('+goodsReport.saleSum+')'
      this.goodsReport[5].text = '清算('+goodsReport.clearSum+')'
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
