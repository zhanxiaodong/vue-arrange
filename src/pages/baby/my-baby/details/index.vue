<template lang="pug">
.my-baby-details
  el-col.text-center(:span="4")
    img.w100.h100(:src="baby.avatar ? baby.avatar:imgurl")
    el-col {{baby.call}}
    el-col {{baby.birth | monthDiff}}
  el-col(:span="20")
    el-row.rowcsf.lh30
      el-col.titlecs
        span 注册档案 ( {{baby.id}} )
      el-col
        el-col(:span="4")
          span 注册日期: {{baby.createTime,'YYYY/MM/DD' | timeFormat}}
        el-col(:span="3")
          span 芝麻认证: {{baby.aliCredit}}
        el-col(:span="4")
          span 微信号:  {{baby.nickName}}
        el-col(:span="4")
          span 手机号:  {{baby.tel}}
        el-col(:span="4")
          span 会员类型:  {{baby.userLev}}
        el-col(:span="4")
          span 用户评级: {{baby.level}}
      el-col
        span 订阅计划: {{baby.planDesc}} {{baby.plan  | listToStr}}
    el-row.pt30.lh30
      el-col.titlecs 宝贝信息
      el-col
        el-col(:span="4")
          span 姓名: {{baby.call}}
        el-col(:span="3")
          span 性别: {{baby.gender}}
        el-col(:span="3")
          span 生日: {{baby.birth}}
      el-col
        el-col(:span="4") 身高: {{baby.height}} cm
        el-col(:span="3") 体重: {{baby.weight}} kg
        el-col(:span="3") 鞋码: {{baby.size}} size
        el-col(:span="3") 肤色: {{baby.skinColor}}
        el-col(:span="3") 体型: {{baby.shape}}
        el-col(:span="3") 特征: {{baby.feature}}
      el-col
        span 才艺: {{baby.study | listToStr}}
    el-row.pt30.lh30
      el-col.titlecs 用户偏好
      el-col
        el-col
          span 风格: {{baby.style | listToStr}}
        el-col
          span 颜色: {{baby.color | listToStr}}
        el-col
          span 避免: -
        el-col 消费: {{baby.consume | listToStr}}
        el-col 品牌: {{baby.brandHis | listToStr}}
    el-row.pt30.lh30
      el-col.titlecs 家长属性
      el-col
        el-col
          span 类型: {{baby.selfEval}}
        el-col
          span 社交: {{baby.netWork | listToStr}}
    el-row.pt30.lh30
      el-col.titlecs 宝贝照片
      el-col
        img(:src="baby.bodyPic ? baby.bodyPic:bodyde")
    el-row.pt30.lh30
      el-col.titlecs 账户
      el-col 
        el-col(:span="2") 余额: 
        el-col(:span="22") {{userAccount.balance}}
      el-col
        el-col(:span="2")  记录: 
        el-col(:span="22")
          el-col(v-for="(item, index) in userAccount.recordList" v-bind:key="index")
            el-col(:span="3") {{item.createTime,'YYYY/MM/DD' | timeFormat}}
            el-col(:span="3") {{item.dealType == '充值'? '+':'-'}} {{item.amount}}
            el-col(:span="3") {{item.dealType}}
    el-row.pt30.lh30
      el-col.titlecs 订单信息
      el-col
        el-col(v-for="(item, index) in boxRecord" v-bind:key="index")
          el-col(:span="2") 
            span {{item.createTime,'YYYY/MM/DD' | timeFormat}}
            span.pl10 -
          el-col.pl10(:span="4") 
            el-button.btn(type="text" @click="showDetails(item)") {{item.orderNo}}
</template>

<script>
export default {
  data () {
    return {
      showImg: false,
      userAccount: {
        balance: 0,
        recordList: []
      },
      boxRecord: [
        {
          orderNo: ''
        }
      ],
      baby: {
        call: ''
      },
      imgurl: '/static/ava.png',
      bodyde: '/static/def.png'
    }
  },
  methods: {
    bigImg () {
      this.showImg = false
    },
    clickImg (e) {
      this.showImg = true
    },
    /**
     * 查看订单详情
     * @function [showDetails]
     * @param {Strig} item -订单
     */
    showDetails (item) {
      this.$router.push({
        name: 'my-order-details',
        query: {
          id: item.id
        }
      })
    },
    /**
     * 获取孩子详情
     * @function [getBabyDetail]
     * @param {String} id 盒子id
     */
    getBabyDetail (id) {
      this.$axios.get(this.$apis.baby.findBabyDetailById, {
        params: {
          id: id
        }
      }).then((res) => {
        if (res.code === '1') {
          this.baby = res.data.baby
          this.boxRecord = res.data.boxRecord
          this.userAccount = res.data.userAccount
        } else {
          this.$message.error(res.message)
        }
      }).catch((errRes) => {
        this.$message.error(errRes.message)
      })
    }
  },
  mounted () {
    this.getBabyDetail(this.$route.query.id)
  }
}
</script>
