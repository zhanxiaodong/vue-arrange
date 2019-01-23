<template lang="pug">
el-card.box-card(v-bind:body-style="{display: [open ? 'block' : 'none']}")
  .box-card__header(slot="header")
    el-row.ft14
      el-col.text-center(:span="4")
        span {{item.box.orderNo}}{{item.box.status=='PRE_CREATE' ? '(*)':''}}
      el-col.text-center(:span="2")  
        span(@click="showDetails(item)") {{item.baby.call}}
      el-col.text-center(:span="2") {{item.stylist}} 
      el-col.text-center(:span="4")
        span {{item.box.createTime,'YYYY-MM-DD HH:mm' | timeFormat}}
      el-col.text-center(:span="2")
        span {{item.user.level ? item.user.level : '--' | viplev}}
      el-col.text-center(:span="2")
        span {{item.box.orderTime}}
      el-col.text-center(:span="2")
        el-popover(trigger="hover" )
          el-row(v-for="bun in item.records" v-bind:key="item.id")
            el-row
              span {{bun.createTime,'YYYY-MM-DD HH:mm' | timeFormat}}
              span.pl5 {{bun.operatorName}}
              span.pl5 {{bun.desc}};{{bun.other}}
          label.labsty(slot="reference") {{item.records ? item.records.length : '0'}}
      el-col.text-center(:span="5")
        span.color-green3(@click="comuFail(item)") 沟通失败
        span.pl15.color-green3(@click="confirm(item)") 沟通确认
        span.pl15.color-green3(v-if="item.box.status == 'CREATE' || item.box.status == 'PRE_CREATE' || item.box.status == 'LINK_UP'" @click="showClose(item)") 关闭订单
      el-col.text-center(:span="1")
        span.right-btn(type="text" @click="open = !open")
          i.el-icon-caret-bottom(v-if="!open")
          i.el-icon-caret-top(v-else)
  .box-card__body
    el-row
      el-col.ft14(:span="24")
        el-col.rb(:span="8")
          el-col.ft15.ft-bd 订单信息
          el-col
            span 订单编号: {{item.box.orderNo}}
          el-col
            span 订单类型: {{item.box.type ? item.box.type :'迷你盒子' | boxType}}
          el-col 用户: {{item.baby.call}}
          el-col 手机号: {{item.address.tel}}
          el-col 收件地址: {{item.address.address}}{{item.address.addressDetail}}({{item.address.label}})
        el-col.rb(:span="8")
          el-col.ft15.ft-bd 用户信息
          el-col 年龄: {{item.baby.birth | monthDiff}}
          el-col
            el-col(:span="11")
              el-col 身高: {{item.baby.height}} cm
              el-col 体重: {{item.baby.weight}} kg
              el-col 鞋码: {{item.baby.size}} size
              el-col 风格: {{item.user.style | listToStr}}
              el-col 预算: {{item.user.consumExp}}
            el-col(:span="2")
              span >
            el-col(:span="11")
              el-col 
                span 身高: 
                span.color-orange2 {{item.babyModify.height}} 
                span cm
              el-col 
                span 体重: 
                span.color-orange2 {{item.babyModify.weight}} 
                span kg
              el-col 
                span 鞋码: 
                span.color-orange2 {{item.babyModify.size}} 
                span size
              el-col 
                span 风格: 
                span.color-orange2 {{item.babyModify.style | listToStr}}
              el-col 
                span 预算: 
                span.color-orange2 {{item.babyModify.consume ? item.babyModify.consume : '默认'}}
        el-col.rb(:span="4")
          el-col.ft15.ft-bd 个性信息
          el-col
            span 场合需求: 
            span.color-orange2 {{item.box.occasions | listToStr}}
          el-col
            span 需求原因: 
            span.color-orange2 {{item.box.season | listToStr}}
          el-col
            span 风格偏好: 
            span.color-orange2 {{item.box.consumList }}
          el-col
            span 接受沟通: 
            span.color-orange2 {{item.box.accepts | listToStr}}
        el-col(:span="4")    
          el-col.ft15.ft-bd 补充信息
          el-col.color-orange2 {{item.box.remarks}}
</template>

<script>
export default {
  data () {
    return {
      /**
       * 是否展开
       * @type {Boolean}
       */
      open: false
    }
  },
  props: {
    /**
     * 盒子信息
     * @type {Object}
     */
    item: {
      type: Object,
      default: null
    }
  },
  methods: {
    /*用户详情路由*/ 
    showDetails (item) {
      const {href} = this.$router.resolve({
        name: 'baby-details',
        query: {
          id: item.baby.id
        }
      })
      window.open(href, '_blank')
    },
    /**
     * 删除
     * @function [del]
     */
    del () {
      this.$emit('del', this.item)
    },
    /**
     * 弹出确认框
     * @function [showClose]
     */
    showClose () {
      this.$emit('showClose', this.item)
    },
    talk (item) {
      this.$emit('talk', item)
    },
    comuFail (item) {
      this.$emit('comuFail', this.item)
    },
    /**
     * 沟通确认框
     */
    confirm (item) {
      var status = item.box.status
      var str
      var updateStatus
      if (status === 'CREATE' || status === 'PRE_CREATE') {
        str = '是否确认已完成有效沟通,货值顾客需求?'
        updateStatus = 'LINK_UP'
        this.talk(item)
      } else {
        if (status === 'LINK_UP') {
          str = '是否确认已完成配货,符合顾客的提及需求?'
          updateStatus = 'NOTIFY_EXPRESS'
        } else if (status === 'RETURN_EXPRESS') {
          str = '是否确认顾客推荐已到仓,并无售后问题?'
          updateStatus = 'END'
        } else if (status === 'DISPATCHING') {
          str = '是否确认顾客订单已达到,用户已签收?'
          updateStatus = 'DELIVERY_COMPLETE'
        } else if (status === 'NOTIFY_EXPRESS') {
          str = '是否确认已完成发货,通知物流配送?'
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
            this.updateBox(obj, item)
          }
        }).catch(() => {
        })
      }
    },
    updateBox (obj, item) {
      this.$axios.post(this.$apis.task.updateBoxStatus, obj).then((res) => {
        if (res.code !== '1') {
          this.$message.error(res.message)
        } else {
          this.item.box.status = obj.status
          // this.getBoxList()
        }
      }).catch((errRes) => {
        this.$message.error(errRes.message)
      })
    },
    getBoxList () {
      this.$emit('getTaskList')
    }
  }
}
</script>
