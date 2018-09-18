<template lang="pug">
.my-order-details
  el-col.text-center(:span="4")
    img.w100.h100(v-bind:src="imgurl")
    el-col {{boxDetail.baby.call}}
    el-col {{boxDetail.baby.birth | monthDiff}}
  el-col(:span="20")
    el-row.rowcsf
      el-col.titlecs.lh30
        span 订单信息 ( {{boxDetail.box.orderNo}} )
      el-col.lh30
        span 订单编号: {{boxDetail.box.orderNo}}
      el-col.lh30 用户: {{boxDetail.baby.call}}
      el-col.lh30 手机号: {{boxDetail.address.tel}}
      el-col.lh30 收件地址: {{boxDetail.address.address}}{{boxDetail.address.addressDetail}} ({{boxDetail.address.label}})
    el-row.pt30.lh30
      el-col.titlecs 用户信息
      el-col(:span="6")
        el-col 身高: {{boxDetail.baby.height}} cm
        el-col 体重: {{boxDetail.baby.weight}} kg
        el-col 鞋码: {{boxDetail.baby.size}} size
        el-col 风格: {{boxDetail.user.style | listToStr}}
        el-col 预算: {{boxDetail.user.consumExp}}
      el-col(:span="2")
        span >
      el-col(:span="6")
        el-col 
          span 身高: 
          span.color-orange2 {{boxDetail.baby.height}} 
          span cm
        el-col 
          span 体重: 
          span.color-orange2 {{boxDetail.baby.weight}} 
          span kg
        el-col 
          span 鞋码: 
          span.color-orange2 {{boxDetail.baby.size}} 
          span size
        el-col 
          span 风格: 
          span.color-orange2 {{boxDetail.user.style | listToStr}}
        el-col 
          span 预算: 
          span.color-orange2 {{boxDetail.user.consumExp ? boxDetail.user.consumExp : '默认'}}
      el-col(:span="8")
        el-col
          span 场合需求: 
          span.color-orange2 {{boxDetail.box.occasions | listToStr}}
        el-col
          span 上装需求: 
          span.color-orange2 {{boxDetail.box.jackets | listToStr}}
        el-col
          span 下装需求: 
          span.color-orange2 {{boxDetail.box.down | listToStr}}
        el-col
          span 配件需求: 
          span.color-orange2 {{boxDetail.box.parts | listToStr}}
      el-col(:span="2")
        el-button 配货
    el-row.rowcs
      el-col.titlecs
        span 留言
      el-col
        span.color-orange2 {{boxDetail.box.remark}}
    el-row.rowcs
      el-col
        el-col.titlecs(:span="22") 盒子信息
        el-col(:span="2")
          el-button 发货
      el-col 盒子编号: {{boxDetail.box.orderNo}}
      el-col 运单号码: {{boxDetail.express ? boxDetail.express.expressNo : '-'}}
    el-row.rowcs
      el-col
        el-col.titlecs(:span="22") 发货信息
        el-col(:span="2")
          el-button 提醒
      el-col 运单编号: {{boxDetail.express ? boxDetail.express.expressNo : '-'}}
      el-col 运单跟踪: -
    el-row.rowcs
      el-col.titlecs 评价支付
    el-row.rowcs
      el-col.titlecs 退件信息
    el-row.rowcs
      el-col.titlecs 修正信息
</template>

<script>
export default {
  data () {
    return {
      boxDetail: {
        user: {
          style: ''
        },
        baby: {
          call: ''
        },
        box: {
          orderNo: ''
        },
        address: {
          tel: ''
        }
      },
      imgurl: '/static/ava.png'
    }
  },
  methods: {
    getBoxDetail (boxId) {
      this.$axios.get(this.$apis.task.getBoxDetail, {
        params: {
          boxId: boxId
        }
      }).then((res) => {
        if (res.code === '1') {
          this.boxDetail = res.data
        } else {
          this.$message.error(res.message)
        }
      }).catch((errRes) => {
        this.$message.error(errRes.message)
      })
    }
  },
  mounted () {
    console.log('-----' + this.$route.query.id)
    this.getBoxDetail(this.$route.query.id)
  }
}
</script>
