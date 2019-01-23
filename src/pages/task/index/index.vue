<template lang="pug">
.task-index
  el-row.header.text-center.pl20.pr20
    el-col(:span="4")
      span 订单编号
    el-col(:span="2")
      span 用户名称
    el-col(:span="2")
      span 搭配师
    el-col(:span="4")
      span 发起时间
    el-col(:span="2")
      span 会员类型
    el-col(:span="2")
      span 配送日期
    el-col(:span="2")
      span 沟通次数
    el-col(:span="5")
      span 操作
  el-row
    el-col(:span="24")
      box-card.mb10(
        v-for="item in taskList"
        v-bind:key="item.box.id"
        v-bind:item="item"
        @showClose="showClose(item)"
        @comuFail="comuFail(item)"
        @talk="talk(item)")
        
  el-pagination.pagination(
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    v-bind:current-page="pagination.currentPage"
    v-bind:page-sizes="[10, 20, 30, 40, 50]"
    v-bind:page-size="pagination.pageSize"
    v-bind:total="pagination.total"
    layout="total, sizes, prev, pager, next, jumper"
  )
  el-dialog.model( v-bind:visible.sync="closeVisible" width="40%" title="请选择订单关闭原因")
    el-row
      el-col
        el-radio-group(v-model="closeReason")
          el-radio.radiostyle(v-for="item in closeReasonList" v-bind:key="item.name" v-bind:label="item.name") {{ item.text }}
    span.dialog-footer(slot="footer") 
      el-button(@click="closeVisible = false") 取 消
      el-button(type="primary" @click="closeBox") 确 定
  el-dialog.model( v-bind:visible.sync="talkVisible" width="780px" title="沟通单")
    el-row
      el-form(label-position="left" ref="talkForm"
        v-bind:model="talkForm"
        v-bind:rules="formRules"
        :before-close="handleClose"
        label-width="80px")
        el-form-item(label="身高" prop="height")
          el-input.w194(type="number" v-model="talkForm.height")
            template(slot="append") cm
          el-tooltip(content="身高" placement="top")
            a.el-icon-information.color-grey2.p-as.ml10
        el-form-item(label="体重" prop="weight")
          el-input.w194(type="number" v-model="talkForm.weight")
            template(slot="append") kg
          el-tooltip(content="体重" placement="top")
            a.el-icon-information.color-grey2.p-as.ml10
        el-form-item(label="鞋码" prop="size")
          el-input.w194(type="number" v-model="talkForm.size")
            template(slot="append") size
          el-tooltip(content="鞋码" placement="top")
            a.el-icon-information.color-grey2.p-as.ml10
        el-form-item(label="风格" prop="style")
          el-checkbox-group(v-model="talkForm.style")
            el-checkbox(v-for="item in styleType" v-bind:key="item.name" v-bind:label="item.text" v-bind:value="item.name")
        el-form-item(label="场合" prop="occasions")
          el-checkbox-group(v-model="talkForm.occasions")
            el-checkbox(v-for="item in occasionsType" v-bind:key="item.name" v-bind:label="item.text" v-bind:value="item.name")
        el-form-item(label="上装" prop="jackets")
          el-checkbox-group(v-model="talkForm.jackets")
            el-checkbox(v-for="item in jacketsType" v-bind:key="item.name" v-bind:label="item.text" v-bind:value="item.name")
        el-form-item(label="下装" prop="down")
          el-checkbox-group(v-model="talkForm.down")
            el-checkbox(v-for="item in downType" v-bind:key="item.name" v-bind:label="item.text" v-bind:value="item.name")
        el-form-item(label="配件" prop="parts")
          el-checkbox-group(v-model="talkForm.parts")
            el-checkbox(v-for="item in partsType" v-bind:key="item.name" v-bind:label="item.text" v-bind:value="item.name")
        el-form-item(label="预算" prop="consume")
          el-radio-group(v-model="talkForm.consume")
            el-radio(v-for="item in consumeType" v-bind:key="item.name" v-bind:label="item.name") {{ item.text }}
        el-form-item(label="评级" prop="level")
          el-radio-group(v-model="talkForm.level")
            el-radio(v-for="item in levelType" v-bind:key="item.name" v-bind:label="item.name") {{ item.text }}
        el-form-item(label="补充说明" prop="desc")
          el-input(type="textarea" :rows="6" placeholder="补充信息" v-model="talkForm.desc")
    span.dialog-footer(slot="footer") 
      el-button(@click="closeTalk('talkForm')") 取 消
      el-button(type="primary" @click="confirmTalk('talkForm')") 确 定
  el-dialog.model( v-bind:visible.sync="failD" width="780px" title="沟通失败原因")
    el-row
      el-form(label-position="left" ref="failForm"
        v-bind:model="failForm"
        :before-close="handleClosef"
        label-width="80px")
        el-form-item(label="原因选择" prop="desc")
          el-checkbox-group(v-model="failForm.desc")
            el-checkbox(v-for="item in failReason" v-bind:key="item.name" v-bind:label="item.text" v-bind:value="item.name")
        el-form-item(label="其它原因" prop="other")
          el-input(type="textarea" :rows="6" placeholder="补充信息" v-model="failForm.other")
    span.dialog-footer(slot="footer") 
      el-button(@click="closeTalkf('failForm')") 取 消
      el-button(type="primary" @click="confirmTalkf") 确 定
</template>

<script>
// import tabs from './components/tabs'
import { JACK_TYPE, CONSUME_TYPE, DOWN_TYPE, PART_TYPE, LEVEL_TYPE, STYLE_TYPE, SCENE_TYPE } from '@/common/constants'
export default {
  data () {
    return {
      failD: false,
      tel: this.$store.state.user.phone,
      styleType: STYLE_TYPE,
      occasionsType: SCENE_TYPE,
      jacketsType: JACK_TYPE,
      downType: DOWN_TYPE,
      partsType: PART_TYPE,
      levelType: LEVEL_TYPE,
      consumeType: CONSUME_TYPE,
      talkVisible: false,
      failReason: [
        {
          name: '电话无人接听',
          text: '电话无人接听'
        },
        {
          name: '已约其它时间沟通',
          text: '已约其它时间沟通'
        }
      ],
      formRules: {
        height: [
          { required: true, message: '请输入身高', trigger: 'blur' }
        ]
      },
      failForm: {
        boxId: '',
        desc: [],
        other: ''
      },
      operatorName: '',
      talkForm: {
        height: '',
        weight: '',
        size: '',
        style: [],
        boxId: '',
        babyId: '',
        occasions: [],
        consume: '',
        level: '',
        desc: '',
        // 上装
        jackets: [],
        // 下装
        down: [],
        // 配件
        parts: []
      },
      closeVisible: false,
      closeReasonList: [
        {
          name: '客户自行要求取消',
          text: '客户自行要求取消'
        },
        {
          name: '非目标客户取消',
          text: '非目标客户取消'
        },
        {
          name: '错过本季度购买需求时间',
          text: '错过本季度购买需求时间'
        },
        {
          name: '违规操作取消',
          text: '违规操作取消'
        }
      ],
      closeReason: '客户自行要求取消',
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
    confirmTalkf () {
      this.failForm.operatorName = this.$store.state.user.userName
      this.$axios.post(this.$apis.task.saveLinkUpRecord, this.failForm).then((res) => {
        if (res.code === '1') {
          this.$message.success('更新成功')
          this.$refs['failForm'].resetFields()
          this.failD = false
          this.getTaskList()
        } else {
          this.$message.error(res.message)
        }
      }).catch((errRes) => {
        this.$message.error(errRes.message)
      })
    },
    confirmTalk (formName) {
      this.$confirm('确认沟通完成?', '', {
        confirmButtonText: '提交',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        var item = this.talkForm
        item.status = 'LINK_UP'
        item.operatorName = this.$store.state.user.userName
        this.$axios.post(this.$apis.task.saveBoxModify, item).then((res) => {
          if (res.code === '1') {
            this.$message.success('更新成功')
            this.$refs[formName].resetFields()
            this.talkVisible = false
            this.getTaskList()
          } else {
            this.$message.error(res.message)
          }
        }).catch((errRes) => {
          this.$message.error(errRes.message)
        })
      }).catch(() => {
      })
    },
    handleClosef (done) {
      this.$refs['failForm'].resetFields()
    },
    closeTalkf (formName) {
      this.$refs[formName].resetFields()
      this.failD = false
    },
    handleClose (done) {
      this.$refs['talkForm'].resetFields()
    },
    closeTalk (formName) {
      this.$refs[formName].resetFields()
      this.talkVisible = false
    },
    talk (item) {
      this.talkForm.babyId = item.baby.id
      this.talkForm.boxId = item.box.id
      this.talkForm.height = item.baby.height === '不确定' ? '' : item.baby.height
      this.talkForm.weight = item.baby.weight === '不确定' ? '' : item.baby.weight
      this.talkForm.size = item.baby.size === '不确定' ? '' : item.baby.size
      this.talkForm.level = item.baby.level ? item.baby.level : 'b'
      this.talkVisible = true
    },
    showClose (item) {
      this.closeVisible = true
      this.tempBoxId = item.box.id
    },
    comuFail (item) {
      this.failD = true
      console.log(item.box.id)
      this.failForm.boxId = item.box.id
    },
    closeBox () {
      this.$confirm('确认关闭订单?', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.closeVisible = false
        var item = {}
        item.id = this.tempBoxId
        item.closeReason = this.closeReason
        item.status = 'CLOSE'
        item.orderNo = this.$store.state.user.userName
        this.$axios.post(this.$apis.task.closeBox, item).then((res) => {
          if (res.code === '1') {
            this.getTaskList()
            this.$message.success('订单已关闭')
          } else {
            this.$message.error(res.message)
          }
        }).catch((errRes) => {
          this.$message.error(errRes.message)
        })
      }).catch(() => {
      })
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
     * 获取任务列表
     * @function [getTaskList]
     */
    getTaskList () {
      // let status = this.$route.query.status
      // var inStatus = ['CREATE', 'LINK_UP', 'RETURN_EXPRESS', 'DISPATCHING', 'NOTIFY_EXPRESS']
      var inStatus = ['CREATE','PRE_CREATE']
      this.$axios.post(this.$apis.task.getTaskList, {
        // 当前页数
        pageNo: this.pagination.currentPage - 1,
        // 当前页条数
        pageSize: this.pagination.pageSize,
        // 状态内的单子
        inStatus: inStatus,
        tel: this.tel
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
  },
  watch: {
    $route: {
      deep: true,
      /**
       * 监听路由变化
       */
      handler () {
        this.getTaskList()
      }
    }
  }
}
</script>
