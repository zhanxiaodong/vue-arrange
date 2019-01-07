<style scoped>
  #nimeide {
      width: 95%;
    } 
  
  .repair-distance {
  margin-top: 10px;
  }

  #repair-distance {
  margin-bottom: 20px;
  }
  
  #return-title {
    padding-bottom: 30px;
  }

  .stream-info {
    padding-top: 30px;
  }

  #color {
    background: red;
    border: red;
  }
</style>
<template lang="pug">
.my-order-details
  el-col.text-center(:span="4")
    img.w100.h100(v-bind:src="imgurl" @click="showBabyDetail")
    el-col {{boxDetail.baby.call}}({{boxDetail.baby.gender}})
    el-col {{boxDetail.baby.birth | monthDiff}}
  el-col(:span="20")
    el-row.rowcsf
      el-col.titlecs.lh30
        span 订单信息 ( {{boxDetail.box.orderNo}} ) 
        span.color-red1(v-if="boxDetail.box.closeReason") ({{boxDetail.box.closeReason}}) 
      el-col.lh30
        span 订单编号: {{boxDetail.box.orderNo}}
      el-col.lh30 用户: {{boxDetail.baby.call}}
      el-col.lh30 手机号: {{boxDetail.address.tel}}
      el-col.lh30 收件人: {{boxDetail.address.name}}
      el-col.lh30 收件省/市/区: {{boxDetail.address.province}}{{boxDetail.address.city}}{{boxDetail.address.district}}
      el-col.lh30 
        el-col(:span="21") 收件地址: {{boxDetail.address.address}}{{boxDetail.address.addressDetail}} ({{boxDetail.address.label}})
        el-col(:span="2")
          el-button.w100(type="success" @click="modifyAddress") 地址修改
    el-row.pt30.lh30
      el-col.titlecs 用户信息
      el-col(:span="6")
        el-col 身高: {{boxDetail.baby.height}} cm
        el-col 体重: {{boxDetail.baby.weight}} kg
        el-col 鞋码: {{boxDetail.baby.size}} size
        el-col 风格: {{boxDetail.user.style | listToStr}}
        el-col 预算: {{boxDetail.user.consumExp}}
      el-col(:span="1")
        span 
      el-col(:span="6")
        el-col 
          span 身高: 
          span.color-orange2 {{boxDetail.babyModify.height}} 
          span cm
        el-col 
          span 体重: 
          span.color-orange2 {{boxDetail.babyModify.weight}} 
          span kg
        el-col 
          span 鞋码: 
          span.color-orange2 {{boxDetail.babyModify.size}} 
          span size
        el-col 
          span 风格: 
          span.color-orange2 {{boxDetail.babyModify.style | listToStr}}
        el-col 
          span 预算: 
          span.color-orange2 {{boxDetail.babyModify.consume ? boxDetail.babyModify.consume : '默认'}}
      el-col(:span="8")
        el-col
          span 需求原因: 
          span.color-orange2 {{boxDetail.box.season | listToStr}}
        el-col
          span 场景: 
          span.color-orange2 {{boxDetail.box.occasions | listToStr}}
        el-col
          span 风格偏好: 
          span.color-orange2 {{boxDetail.box.consumList | listToStr}}
      el-col(:span="2")
        el-col
          el-button.w100(v-if="boxDetail.box.status === 'LINK_UP'" type="success" @click="newBox") 配货
          el-button.w100(v-else type="info" disabled) 配货
        el-col.pt10
          el-button.w100(v-if="boxDetail.box.status === 'LINK_UP'" type="success" @click="closeVisible = true") 订单关闭
          el-button.w100(v-else type="info" disabled) 订单关闭
        el-col.pt10
          el-button.w100(v-if="boxDetail.box.status === 'NOTIFY_EXPRESS'" type="success" @click="modifyBox") 配货修改
          el-button.w100(v-else type="info" disabled) 配货修改
    el-row.rowcs
      el-col.titlecs
        span 补充信息
      el-col.lh30
        span.color-orange2 {{boxDetail.babyModify.desc}}
    el-row.rowcs
      el-col.titlecs
        span 留言
      el-col.lh30
        span.color-orange2 {{boxDetail.box.remarks}}
    el-row.rowcs
      el-col(:span="21")
        el-col.titlecs.lh30 盒子信息
        el-col.lh30 
          span(@click="look()") 盒子编号: {{boxDetail.box.orderNo}}
        el-col.lh30 运单号码: {{boxDetail.express ? boxDetail.express.expressNo : '-'}}
      el-col(:span="2")
        el-col.pt10
          el-button.w100(v-if="boxDetail.box.status === 'NOTIFY_EXPRESS'" type="success" @click="showExpressDia") 手动发货
          el-button.w100(v-else type="info" disabled) 手动发货
        el-col.pt10
          el-button.w100(v-if="boxDetail.box.status === 'NOTIFY_EXPRESS'" type="success" @click="showConfirm") 系统发货
          el-button.w100(v-else type="info" disabled) 系统发货
    el-row.rowcs
      el-col
        el-col.titlecs(:span="21") 发货信息
        el-col(:span="2")
          el-button.w100(v-if="boxDetail.box.status === 'DISPATCHING'" type="success" @click="arriv") 提醒
          el-button.w100(v-else type="info" disabled) 提醒
      el-col 
        el-col(:span="2") 运单编号:
        el-col(:span="22") {{boxDetail.express ? boxDetail.express.expressNo : '-'}}
      el-col 
        el-col(:span="2") 运单跟踪:
        el-col(:span="22" v-if="toExpress")
          el-col(v-for="(item, index) in boxDetail.express.expressRoute" v-bind:key="index")
            span {{item.acceptTime}}
            span   {{item.remark}}
        el-col(:span="22" v-else) -
    el-row.rowcs
      el-col(:span="21")
        el-col.titlecs 评价支付
        el-col(v-if="evaus")
          el-col.pt10.pb10
            el-col(:span="2")
              span 评价: 
              span {{boxDetail.evalua.rec ? boxDetail.evalua.rec + '星' : '-'}}
            el-col(:span="9")
              span 评价标签: 
              span {{boxDetail.evalua.evalLabel | listToStr}}
            el-col(:span="5")
              span 反馈: 
              span {{boxDetail.evalua.feedback}}
            el-col(:span="4")
              span 推荐成功率: 
              span 
            el-col(:span="4")
              span 支付率: 
              span 
          el-col#nimeide.bc-grey2.text-center.lh30(:span="20")
            el-col(:span="2") 序号
            el-col(:span="2") 点赞
            el-col(:span="2") 尺码
            el-col(:span="2") 款式
            el-col(:span="2") 颜色
            el-col(:span="2") 价格
            el-col(:span="2") 品牌
            el-col(:span="2") 留下
            el-col(:span="2") 销售价格
            el-col(:span="2") 推广费
            el-col(:span="2") 销售金额
            el-col(:span="2") 利润
          el-col#nimeide.text-center.bc-grey4.mt10.lh30(:span="20" v-for="(item, index) in boxDetail.evalua.evaList" v-bind:key="index")
            el-col(:span="2") # {{index + 1}}
            el-col(:span="2") -
            el-col(:span="2") {{item.size ? item.size:'-'}}
            el-col(:span="2") {{item.style ? item.style:'-'}}
            el-col(:span="2") {{item.color ? item.color:'-'}}
            el-col(:span="2") {{item.con ? item.con:'-'}}
            el-col(:span="2") {{item.ma ? item.ma:'-'}}
            el-col(:span="2") {{item.pay? '留下':'-'}}
            el-col(:span="2") {{item.color ? item.color:'-'}}
            el-col(:span="2") {{item.con ? item.con:'-'}}
            el-col(:span="2") {{item.ma ? item.ma:'-'}}
            el-col(:span="2") {{item.pay? '留下':'-'}}
          el-col#nimeide.bc-orange2.mt10.lh30.pl10(:span="20" v-for="item in boxDetail.payList"  v-bind:key="item.time")
            el-col
              span 付款总额: 
              span {{item.amount? item.amount : '-'}}
            el-col
              span 付款方式: 
              span {{item.type? item.type : '-'}}
            el-col
              span 付款时间: 
              span {{item.time? item.time : '-'}}
            el-col
              span 交易单号: 
              span {{item.tradeNo? item.tradeNo : '-'}}
      el-col(:span="2")
        el-col
          el-button.w100( type="success" v-if="boxDetail.box.status === 'DELIVERY_COMPLETE'  || boxDetail.box.status === 'EVALUATED'" @click="sendMsg('PAYWAIT')") 催付
          el-button.w100( type="info" v-else disabled ) 催付
        el-col.pt10
          el-button.w100(type="success" v-if="boxDetail.box.status === 'PAY_PART'" @click="sendMsg('BACK')") 退件提醒
          el-button.w100( type="info" v-else disabled ) 退件提醒
    el-row.rowcs
      el-col(:span="21")
        el-col#return-title.titlecs 退件信息
        el-col.text-center.lh30(:span="24")
          el-col.bc-grey2(:span="4") 序号
          el-col.bc-grey2(:span="10") 留下
          el-col(:span="5") 已退回
          el-col(:span="2") 未退回
        el-col.text-center.mt10.lh30(:span="24" v-for="(item, index) in boxDetail.evalua.evaList" v-bind:key="index")
          el-col.bc-grey4(:span="4") # {{index + 1}}
          el-col.bc-grey4(:span="10") {{item.pay? '留下':'-'}}  
          el-col(:span="5") 
            <input type="radio" name="sendException" value="item.id" @click="getValue(item.id)">
          el-col(:span="2")
            <input type="radio" name="sendException" value="item.id" @click="getValue2(item.id)">
        el-col.stream-info 
          el-col(:span="2") 运单编号:
          el-col(:span="22") {{boxDetail.expressBack ? boxDetail.expressBack.expressNo : '-'}}
        el-col 
          el-col(:span="2") 运单跟踪:
          el-col(:span="22" v-if="backExpress")
            el-col(v-for="(item, index) in boxDetail.expressBack.expressRoute" v-bind:key="index")
              span {{item.acceptTime}}
              span   {{item.remark}}
          el-col(:span="22" v-else) -      
      el-col(:span="2") 
        el-col     
          el-button.w100( type="info" v-if="boxDetail.box.status === 'RETURN_EXCEPTION' || boxDetail.box.status === 'END'  || boxDetail.box.status === 'COMPLETE' || boxDetail.box.status === 'CANCLE'" disabled ) 结单
          el-button.w100( type="success" v-else  @click="endBox") 结单
        el-col.pt10
          el-button#color.w100(type="success" v-if="boxDetail.box.status === 'RETURN_EXCEPTION'" @click="sendException") 异常反馈
          el-button.w100( type="info" v-else disabled ) 异常反馈
    el-row.rowcs
      el-col(:span="21")
        el-col#repair-distance.titlecs 修正信息
        el-row.lh30
          el-col.repair-distance 体型: {{boxDetail.babyModify.shape}}
          el-col.repair-distance 审美: {{boxDetail.babyModify.taste}}
          el-col.repair-distance 态度: {{boxDetail.babyModify.attitude}}
          el-col.repair-distance 消费: {{boxDetail.babyModify.consume}}
          el-col.repair-distance 素质: {{boxDetail.babyModify.quality}}
          el-col.repair-distance 补充说明: {{boxDetail.babyModify.descs}}
      el-col(:span="2")
        el-button.w100(type="success" v-if="boxDetail.box.status !== 'CREATE'" @click="talk") 修正
        el-button.w100(type="info" disabled v-else) 修正
  el-dialog.model( v-bind:visible.sync="dialogVisible" width="40%")
    el-row.mt20
      el-col(:span="24")
        el-form(
          ref="express"
          v-bind:model="express"
          v-bind:rules="expressRules"
          label-width="90px"
          label-position="left")
          el-form-item(label="运单号码" prop="expressNo")
            el-col(:span="10")
              el-input.w194(v-model="express.expressNo")
            el-col.ml30(:span="10")
              el-button(type="success" @click="saveExpressNo('express')") 确定
  el-dialog.model( v-bind:visible.sync="closeVisible" width="40%" title="请选择订单关闭原因")
    el-row
      el-col
        el-radio-group(v-model="closeReason")
          el-radio(v-for="item in closeReasonList" v-bind:key="item.name" v-bind:label="item.name") {{ item.text }}
    span.dialog-footer(slot="footer") 
      el-button(@click="closeVisible = false") 取 消
      el-button(type="primary" @click="closeBox") 确 定
  el-dialog.model( v-bind:visible.sync="confirmSend" width="500px" title="发货信息确认")
    el-row.lh30
      el-col.ft-bd 收件人信息
      el-col
        el-col(:span="7") 收件人:
        el-col(:span="17") {{boxDetail.address.name}}
      el-col
        el-col(:span="7") 手机号:
        el-col(:span="17") {{boxDetail.address.tel}}
      el-col
        el-col(:span="7") 省/市/区:
        el-col(:span="17") {{boxDetail.address.province}}/{{boxDetail.address.city}}/{{boxDetail.address.district}}
      el-col
        el-col(:span="7") 地址:
        el-col(:span="17") {{boxDetail.address.address}}
      el-col.bbc
        el-col(:span="7") 详细地址:
        el-col(:span="17") {{boxDetail.address.addressDetail}}
      el-col.ft-bd.pt10 寄件人信息
      el-col
        el-col(:span="7") 寄件人:
        el-col(:span="17") 迷你王国科技(杭州)有限公司
      el-col
        el-col(:span="7") 手机号:
        el-col(:span="17") 15372042000
      el-col
        el-col(:span="7") 省/市/区:
        el-col(:span="17") 浙江省/杭州市/滨江区
      el-col
        el-col(:span="7") 地址:
        el-col(:span="17") 优迈科技园
      el-col.bbc
        el-col(:span="7") 详细地址:
        el-col(:span="17") 滨安路1181号王道公园4幢301
      el-col.pt10 
        el-col
          span.ft-bd.color-red1 (注:
        el-col.pl20
          span 1.暂不支持预约时间进行下单,顺丰会在下单成功1小时内自动联系;
        el-col.pl20 2.请尽量不要在17:30之后下单,具体情况视情况而定;
        el-col.pl20 3.涉及到顺丰第三方平台,请操作员谨慎操作,后续会记录绩效之中.)
    span.dialog-footer(slot="footer") 
      el-button(@click="confirmSend = false") 取 消
      el-button(type="primary" @click="confirmOrderSend") 发 货
  el-dialog.model( v-bind:visible.sync="editAddressVisible" width="780px" title="收件地址修改")
    el-row
      el-form(
        ref="addressForm"
        v-bind:model="addressForm"
        label-width="90px"
        label-position="left")
        el-form-item(label="收件人")
          el-input.w193(placeholder="姓名" v-model="addressForm.name" disabled)
        el-form-item(label="手机号")
          el-input.w193(placeholder="手机号" v-model="addressForm.tel" disabled)
        el-form-item(label="省/市/区")
          check-address(v-bind:address="addressForm")
        el-form-item(label="地址")
          el-input.w559(placeholder="地址" v-model="addressForm.address")
        el-form-item(label="详细地址")
          el-input.w559(placeholder="详细地址" v-model="addressForm.addressDetail")
    span.dialog-footer(slot="footer") 
      el-button(@click="editAddressVisible = false") 取 消
      el-button(type="primary" @click="confirmAddress") 确 定
  el-dialog.model( v-bind:visible.sync="talkVisible" width="45%" title="修正信息")
    el-row
      el-form(label-position="left" ref="talkForm"
        v-bind:model="talkForm"
        :before-close="handleClose"
        label-width="80px")
        el-form-item(label="体型" prop="shape")
          el-col(:span="16")
            el-radio-group(v-model="talkForm.shape")
              el-radio(v-for="item in shapeType" @click.native.prevent="clickitemone(item.name)" v-bind:key="item.name" v-bind:label="item.name") {{ item.text }}
          el-col(:span="8")
            el-input(placeholder="输入标签" v-model="shapeInput" @blur="inputChange('shape')")
        el-form-item(label="审美")
          el-col(:span="16")
            el-radio-group(v-model="talkForm.taste")
              el-radio(v-for="item in tasteType" @click.native.prevent="clickitemtwo(item.name)" v-bind:key="item.name" v-bind:label="item.name") {{ item.text }}
          el-col(:span="8")
            el-input(placeholder="输入标签" v-model="tasteInput" @blur="inputChange('taste')")
        el-form-item(label="态度" prop="attitude")
          el-col(:span="16")
            el-radio-group(v-model="talkForm.attitude")
              el-radio(v-for="item in attitudeType" @click.native.prevent="clickitemthree(item.name)" v-bind:key="item.name" v-bind:label="item.name") {{ item.text }}
          el-col(:span="8")
            el-input(placeholder="输入标签" v-model="attitudeInput" @blur="inputChange('attitude')")
        el-form-item(label="消费" prop="consume")
          el-col(:span="16")
            el-radio-group(v-model="talkForm.consume")
              el-radio(v-for="item in consumeType" @click.native.prevent="clickitemfour(item.name)" v-bind:key="item.name" v-bind:label="item.name") {{ item.text }}
          el-col(:span="8")
            el-input(placeholder="输入标签" v-model="consumeInput" @blur="inputChange('consume')")
        el-form-item(label="素质" prop="quality")
          el-col(:span="16")
            el-radio-group(v-model="talkForm.quality")
              el-radio(v-for="item in qualityType" @click.native.prevent="clickitemfive(item.name)" v-bind:key="item.name" v-bind:label="item.name") {{ item.text }}
          el-col(:span="8")
            el-input(placeholder="输入标签" v-model="qualityInput" @blur="inputChange('quality')")
        el-form-item(label="评级" prop="level")
          el-radio-group(v-model="talkForm.level")
            el-radio(v-for="item in levelType" @click.native.prevent="clickitemsix(item.name)" v-bind:key="item.name" v-bind:label="item.name") {{ item.text }}
        el-form-item(label="补充说明" prop="descs")
          el-input(type="textarea" :rows="6" placeholder="补充信息" v-model="talkForm.descs")
    span.dialog-footer(slot="footer") 
      el-button(@click="closeTalk('talkForm')") 取 消
      el-button(type="primary" @click="confirmTalk('talkForm')") 确 定
</template>

<script>
import { CONSUME_TYPE, LEVEL_TYPE, SHAPE_TYPE, TASTE_TYPE, ATTI_TYPE, QUAL_TYPE } from '@/common/constants'
export default {
  data () {
    return {
      shapeInput: '',
      attitudeInput: '',
      consumeInput: '',
      tasteInput: '',
    	qualityInput: '',
      qualityType: QUAL_TYPE,
      attitudeType: ATTI_TYPE,
      tasteType: TASTE_TYPE,
      shapeType: SHAPE_TYPE,
      levelType: LEVEL_TYPE,
      consumeType: CONSUME_TYPE,
      talkVisible: false,
      closeVisible: false,
      dialogVisible: false,
      editAddressVisible: false,
      confirmSend: false,
      addressForm: {},
      talkForm: {
        boxId: '',
        babyId: '',
        consume: '',
        level: '',
        descs: '',
        quality: '',
        attitude: '',
        shape: '',
        taste: ''
      },
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
          name: '违规操作取消',
          text: '违规操作取消'
        }
      ],
      closeReason: '客户自行要求取消',
      express: {
        expressNo: null
      },
      expressRules: {
        expressNo: [
          { required: true, message: '请输入运单号', trigger: 'blur' }
        ]
      },
      boxDetail: {
        user: {
          style: ''
        },
        baby: {
          call: ''
        },
        babyModify: {},
        box: {
          orderNo: ''
        },
        address: {
          tel: ''
        },
        express: {
          expressNo: '',
          expressRoute: []
        },
        expressBack: {
          expressNo: '',
          expressRoute: []
        },
        evalua: {
          ser: '',
          rec: '',
          evaList: []
        },
        payList: []
      },
      toExpress: false,
      backExpress: false,
      evaus: false,
      imgurl: '/static/ava.png',
      returnException:{"boxId":null,"needBackGoods":[],"unNeedBackGoods":[]}
    }
  },
  methods: {
    confirmOrderSend () {
      var item = {}
      item.userAddress = this.boxDetail.address
      item.boxId = this.boxDetail.box.id
      this.$axios.post(this.$apis.task.boxSendWeb, item).then((res) => {
        console.log(res)
        if (res.code === '1') {
          var result = res.data
          var expressNo = result.expressNo
          if (expressNo) {
            this.confirmSend = false
            var express = this.boxDetail.express
            if (express) {
              this.boxDetail.express.expressNo = expressNo
            } else {
              express = {}
              express.expressNo = expressNo
              this.boxDetail.express = express
            }
            this.$message.success('发货成功')
          } else {
            this.$message.success(result)
          }
        } else {
          this.$message.error(res.message)
        }
      }).catch((errRes) => {
        this.$message.error(errRes.message)
      })
    },
    showConfirm () {
      this.confirmSend = true
    },
    confirmAddress () {
      var msg = '请确认是否将' + this.addressForm.name + '收件地址修改为' + this.addressForm.province + this.addressForm.city + this.addressForm.district + this.addressForm.address + this.addressForm.addressDetail
      this.$confirm(msg + '?', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        var item = this.addressForm
        item.boxId = this.boxDetail.box.id
        this.$axios.post(this.$apis.address.updateAddressWeb, item).then((res) => {
          if (res.code === '1') {
            this.editAddressVisible = false
            this.boxDetail.address = res.data
            this.$message.success('地址更新成功')
          } else {
            this.$message.error(res.message)
          }
        }).catch((errRes) => {
          this.$message.error(errRes.message)
        })
      }).catch(() => {
      })
    },
    modifyAddress () {
      this.findAddressById()
    },
    findAddressById () {
      this.$axios.get(this.$apis.address.findAddressById, {
        params: {
          id: this.boxDetail.address.id
        }
      }).then((res) => {
        if (res.code === '1') {
          this.addressForm = res.data
          this.editAddressVisible = true
        } else {
          this.$message.error('获取地址失败')
        }
      }).catch(() => {
        this.$message.error('获取地址失败')
      })
    },
    confirmTalk (formName) {
      var item = this.talkForm
      this.$axios.post(this.$apis.task.updateBoxModify, item).then((res) => {
        if (res.code === '1') {
          this.$message.success('更新成功')
          this.talkVisible = false
          this.boxDetail.babyModify.shape = this.talkForm.shape
          this.boxDetail.babyModify.taste = this.talkForm.taste
          this.boxDetail.babyModify.attitude = this.talkForm.attitude
          this.boxDetail.babyModify.consume = this.talkForm.consume
          this.boxDetail.babyModify.quality = this.talkForm.quality
          this.boxDetail.babyModify.level = this.talkForm.level
          this.boxDetail.babyModify.descs = this.talkForm.descs
          this.boxDetail.baby.level = this.talkForm.level
          this.$refs[formName].resetFields()
        } else {
          this.$message.error(res.message)
        }
      }).catch((errRes) => {
        this.$message.error(errRes.message)
      })
    },
    showBabyDetail () {
      this.$router.push({
        name: 'baby-details',
        query: {
          id: this.boxDetail.baby.id
        }
      })
    },

    /*单击按钮取消选中*/
    clickitemone (e) {
     e === this.talkForm.shape ? this.talkForm.shape = '' : this.talkForm.shape = e
    },
    clickitemtwo (e) {
     e === this.talkForm.taste ? this.talkForm.taste = '' : this.talkForm.taste = e
    },
    clickitemthree (e) {
     e === this.talkForm.attitude ? this.talkForm.attitude = '' : this.talkForm.attitude = e 
    },
    clickitemfour (e) {
     e === this.talkForm.consume ? this.talkForm.consume = '' : this.talkForm.consume = e 
    },
    clickitemfive (e) {
     e === this.talkForm.quality ? this.talkForm.quality = '' : this.talkForm.quality = e 
    },
    clickitemsix (e) {
     e === this.talkForm.level ? this.talkForm.level = '' : this.talkForm.level = e
    },

    inputChange (type) {
      var value = this.shapeInput || this.attitudeInput || this.consumeInput || this.tasteInput || this.qualityInput;
      this.updateBasic(type, value)
      this.shapeInput = ''
      this.attitudeInput = ''
      this.consumeInput = ''
      this.tasteInput = ''
      this.qualityInput = ''
    },

    talk () {
      this.talkForm.babyId = this.boxDetail.baby.id
      this.talkForm.boxId = this.boxDetail.box.id
      this.talkForm.level = this.boxDetail.baby.level ? this.boxDetail.baby.level : 'b'
      this.talkForm.descs = this.boxDetail.babyModify.descs
      this.talkForm.shape = this.boxDetail.babyModify.shape
      this.updateBasic('shape', this.boxDetail.babyModify.shape)
      this.talkForm.taste = this.boxDetail.babyModify.taste
      this.updateBasic('taste', this.boxDetail.babyModify.taste)
      this.talkForm.attitude = this.boxDetail.babyModify.attitude
      this.updateBasic('attitude', this.boxDetail.babyModify.attitude)
      this.talkForm.quality = this.boxDetail.babyModify.quality
      this.updateBasic('quality', this.boxDetail.babyModify.quality)
      this.talkForm.consume = this.boxDetail.babyModify.consume
      this.updateBasic('consume', this.boxDetail.babyModify.consume)
      this.talkVisible = true
    },
    updateBasic (type, value) {
      var updateBas = false
      var temp
      var newO = {}
      switch (type) {
        case 'shape':
          temp = SHAPE_TYPE
          for (var a = 0; a < temp.length; a++) {
            if (value === temp[a].name) {
              updateBas = true
              break
            }
          }
          if (!updateBas && value) {
            newO.text = value
            newO.name = value
            temp.splice(3, 1, newO)
            this.shapeType = temp
          }
          this.talkForm.shape = value
          break
        case 'taste':
          this.talkForm.taste = value
          temp = TASTE_TYPE
          for (var b = 0; b < temp.length; b++) {
            if (value === temp[b].name) {
              updateBas = true
              break
            }
          }
          if (!updateBas && value) {
            newO.text = value
            newO.name = value
            temp.push(newO)
            this.tasteType = temp
          }
          break
        case 'attitude':
          this.talkForm.attitude = value
          temp = ATTI_TYPE
          for (var c = 0; c < temp.length; c++) {
            if (value === temp[c].name) {
              updateBas = true
              break
            }
          }
          if (!updateBas && value) {
            newO.text = value
            newO.name = value
            temp.push(newO)
            this.attitudeType = temp
          }
          break
        case 'quality':
          this.talkForm.quality = value
          temp = QUAL_TYPE
          for (var d = 0; d < temp.length; d++) {
            if (value === temp[d].name) {
              updateBas = true
              break
            }
          }
          if (!updateBas && value) {
            newO.text = value
            newO.name = value
            temp.push(newO)
            this.qualityType = temp
          }
          break
        case 'consume':
          this.talkForm.consume = value
          temp = CONSUME_TYPE
          for (var i = 0; i < temp.length; i++) {
            if (value === temp[i].name) {
              updateBas = true
              break
            }
          }
          if (!updateBas && value) {
            newO.text = value
            newO.name = value
            temp.push(newO)
            this.consumeType = temp
          }
          break
        default:
          break
      }
      temp = []
    },
    handleClose (done) {
      this.$refs['talkForm'].resetFields()
    },
    closeTalk (formName) {
      this.$refs[formName].resetFields()
      this.talkVisible = false
    },
    closeBox () {
      this.$confirm('确认关闭订单?', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.closeVisible = false
        var item = {}
        item.id = this.boxDetail.box.id
        item.closeReason = this.closeReason
        item.status = 'CLOSE'
        this.$axios.post(this.$apis.task.closeBox, item).then((res) => {
          if (res.code === '1') {
            this.boxDetail.box.status = 'CLOSE'
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
     * 关闭订单原因选择
     * @function [closeBoxShow]
     */
    closeBoxShow () {
      this.closeVisible = true
    },
    /**
     * 消息提醒
     * @function [sendMsg]
     */
    sendMsg (type) {
      this.$axios.get(this.$apis.task.sendMsgByBoxId, {
        params: {
          boxId: this.boxDetail.box.id,
          type: type
        }
      }).then((res) => {
        if (res.code === '1') {
          this.$message.success('提醒成功')
        } else {
          this.$message.error(res.message)
        }
      }).catch((errRes) => {
        this.$message.error(errRes.message)
      })
    },
    /**
     * 货物已经送达
     * @function [arriv]
     */
    arriv () {
      this.$confirm('是否确认快递已经送达至客户?', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$axios.get(this.$apis.task.sendMsgByBoxId, {
          params: {
            boxId: this.boxDetail.box.id,
            type: 'DEVL'
          }
        }).then((res) => {
          if (res.code === '1') {
            this.boxDetail.box.status = 'DELIVERY_COMPLETE'
            this.$message.success('提醒成功')
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
     * 更新盒子状态
     * @function [endBox]
     */
    updateBox (obj) {
      this.$axios.post(this.$apis.task.updateBoxStatus, obj).then((res) => {
        if (res.code !== '1') {
          this.$message.error(res.message)
        } else {
          this.boxDetail.box.status = 'END'
        }
      }).catch((errRes) => {
        this.$message.error(errRes.message)
      })
    },
    /**
     * 结单逻辑
     * @function [endBox]
     */
    endBox () {
      this.$confirm('是否确认顾客退件已到仓,并无售后问题?', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        var obj = {}
        obj.id = this.boxDetail.box.id
        obj.status = 'END'
        this.updateBox(obj)
      }).catch(() => {
      })
    },
    showExpressDia () {
      this.dialogVisible = true
    },

    getValue (id) {
      this.returnException.needBackGoods.push(id);
      var set = new Set(this.returnException.needBackGoods);
      var arr = new Array(set);
      console.log(this.returnException)
      console.log(set)
      console.log(Array.from(set) )
    },

    getValue2 (id) {
      this.returnException.unNeedBackGoods.push(id);
      var set = new Set(this.returnException.needBackGoods);
      console.log(this.returnException)
    },
    /**
     * 查找货物
     * @function [saveExpressNo]
     * @param {String} formName - 表单名称
     */
    saveExpressNo (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('确认运单号' + this.express.expressNo + ',确认后不能修改', '', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'info'
          }).then(() => {
            this.saveExpre()
          }).catch(() => {
          })
        } else {
          return false
        }
      })
    },
    saveExpre () {
      var item = {}
      item.boxId = this.$route.query.id
      item.addressId = this.boxDetail.address.id
      item.status = 'CREATE'
      item.expressNo = this.express.expressNo
      item.type = 'TO'
      this.$axios.post(this.$apis.goods.saveBoxExpress, item).then((res) => {
        if (res.code === '1') {
          this.$message.success('发货成功')
          this.boxDetail.box.status = 'DISPATCHING'
          var express = {}
          var temp = this.boxDetail.express
          if (!temp) {
            express.expressNo = this.express.expressNo
            this.boxDetail.express = express
          } else {
            this.boxDetail.express.expressNo = this.express.expressNo
          }
          this.dialogVisible = false
        } else {
          this.$message.error(res.message)
        }
      }).catch((errRes) => {
        this.$message.error(errRes.message)
      })
    },
    /**
     * 获取盒子详情
     * @function [getBoxDetail]
     * @param {String} boxId 盒子id
     */
    getBoxDetail (boxId) {
      this.$axios.get(this.$apis.task.findBoxDetailContain, {
        params: {
          boxId: boxId
        }
      }).then((res) => {
      	console.log(1,this.boxDetail)
      	console.log(2,res)
        if (res.code === '1') {
          this.boxDetail = res.data
          this.boxDetail.address = res.data.address
          this.boxDetail.baby = res.data.baby
          this.boxDetail.box = res.data.box
          this.boxDetail.user = res.data.user
          if (res.data.express) {
            this.boxDetail.express = res.data.express
            if (res.data.express.expressRoute) {
              this.toExpress = true
            }
          }
          if (res.data.expressBack) {
            this.boxDetail.expressBack = res.data.expressBack
            if (res.data.expressBack.expressRoute) {
              this.backExpress = true
            }
          }
          if (res.data.evalua) {
            this.boxDetail.evalua = res.data.evalua
            this.evaus = true
          } else {
          	var evalua = {evaList:[]}
          	this.boxDetail.evalua = evalua
          }
          if (res.data.payList) {
            this.boxDetail.payList = res.data.payList
          }     
        } else {
          this.$message.error(res.message)
        }
        console.log(this.boxDetail)
      }).catch((errRes) => {
        this.$message.error(errRes.message)
      })
    },
    /**
     * 补充盒子信息
     * @function [showDetails]
     * @param {Strig} item -订单
     */
    newBox () {
      this.$router.push({
        name: 'new-task',
        query: {
          id: this.$route.query.id
        }
      })
    },
    look () {
      var status = this.boxDetail.box.status
      if (status === 'LINK_UP' || status === 'CREATE' || status === 'CLOSE') {
        return false
      } else {
        this.$router.push({
          name: 'new-task',
          params: {
            lookobj: this.boxDetail.box.id
          }
        })
      }
    },
    modifyBox () {
      this.$router.push({
        name: 'new-task',
        params: {
          recordobj: this.$route.query.id
        }
      })
    }
  },
  mounted () {
    let routerParams = this.$route.params.dataobj
    if (routerParams) {
      this.routerParams = routerParams
    }
    this.getBoxDetail(this.$route.query.id)
  },
  beforeRouteLeave (to, from, next) {
    if (to.path === '/order/my-order/') {
      to.query.params = this.routerParams
      next()
    } else {
      next()
    }
  }
}
</script>
