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
      <div class="titlecs el-col el-col-24">宝贝信息 <span @click="dialogFormVisible = true" style="color: #04B8A0; padding-left: 5px;">修改</span></div>
    <el-dialog title="宝贝信息" :visible.sync="dialogFormVisible" style="margin-top: -10vh;">
     <el-form :model="form">
      <el-form-item label="姓名" :label-width="formLabelWidth">
        <el-input  style="width:50%" v-model="form.call" placeholder="请选择姓名(name)" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="性别" :label-width="formLabelWidth">
        <el-radio-group v-model="form.gender">
           <el-radio :label="3">男</el-radio>
           <el-radio :label="6">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="生日" :label-width="formLabelWidth">
        <el-date-picker v-model="form.birth" type="date" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="身高" :label-width="formLabelWidth">
        <el-input style="width:50%" v-model="form.height" placeholder="请选择身高(cm)" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="体重" :label-width="formLabelWidth">
        <el-input style="width:50%" v-model="form.weight" placeholder="请选择体重(kg)" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="鞋码" :label-width="formLabelWidth">
        <el-input style="width:50%" v-model="form.size" placeholder="请选择鞋码(size)" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="肤色" :label-width="formLabelWidth">
        <el-radio-group v-model="form.skinColor" size="medium">
        <el-radio-button label="白皙"></el-radio-button>
        <el-radio-button label="正常"></el-radio-button>
        <el-radio-button label="偏黑"></el-radio-button>
      </el-radio-group>
    </el-form-item>
     </el-form> 
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
      el-col
        el-col(:span="4")
          span 姓名: {{baby.call}}
        el-col(:span="3")
          span 性别: {{baby.gender}}
        el-col(:span="4")
          span 生日: {{baby.birth}}
      el-col
        el-col(:span="4") 身高: {{baby.height}} cm
        el-col(:span="3") 体重: {{baby.weight}} kg
        el-col(:span="3") 鞋码: {{baby.size}} size
        el-col(:span="3") 肤色: {{baby.skinColor}}
    el-row.pt30.lh30
      <div class="titlecs el-col el-col-24">用户偏好<span @click="dialogFormVisible2 = true" style="color: #04B8A0; padding-left: 5px;">修改</span></div>
    <el-dialog title="用户偏好" :visible.sync="dialogFormVisible2">
     <el-form :model="form">
      <el-form-item label="风格" :label-width="formLabelWidth">
       <el-checkbox-group v-model="form.style" size="medium">
        <el-checkbox-button v-for="style in styles" :label="style" :key="style">{{style}}</el-checkbox-button>
       </el-checkbox-group>
      </el-form-item>
      <el-form-item label="颜色" :label-width="formLabelWidth">
        <el-radio-group v-model="form.colorType" size="medium">
        <el-radio-button v-for="colorType in colorTypes" :label="colorType" :key="colorType">{{colorType}}</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="注重" :label-width="formLabelWidth">
       <el-checkbox-group v-model="form.attitude" size="medium">
        <el-checkbox-button v-for="attitude in attitudes" :label="attitude" :key="attitude">{{attitude}}</el-checkbox-button>
       </el-checkbox-group>
      </el-form-item>
      <el-form-item label="意愿" :label-width="formLabelWidth">
        <el-radio-group v-model="form.consume" size="medium">
        <el-radio-button v-for="consume in consumes" :label="consume" :key="consume" >{{consume}}</el-radio-button>
        </el-radio-group>
      </el-form-item>
     </el-form> 
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible2 = false">确 定</el-button>
      </div>
    </el-dialog>
      el-col
        el-col
          span 风格: {{baby.style | listToStr}}
        el-col
          span 颜色: {{baby.colorType}}
        el-col 注重: {{baby.attitude | listToStr}}
        el-col 意愿: {{baby.consume | listToStr}}
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
        //img(:src="baby.bodyPic ? baby.bodyPic:bodyde")
        <img :src="baby.bodyPic ? baby.bodyPic:bodyde" style="width: 300px;height: 400px;">
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
            el-col(:span="3") {{item.dealType == '充值'? '+':item.dealType == '奖金'? '+':'-'}} {{item.amount}}
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
const styleOptions = ['时尚','休闲','卡通','运动','民族','优雅'];
const colorTypeOptions = ['接受全色系','不喜欢灰暗色系','不喜欢鲜艳色系'];
const attitudeOptions = ['安全','品牌','舒适','个性','实惠','好看'];
const consumeOptions = ['节制','正常','小资','轻奢'];
export default {
  data () {
    return {
      form: {
          call: '',
          gender: '',
          birth: '',
          height: '',
          weight: '',
          size: '',
          skinColor: '',
          style: ['时尚'],
          colorType: ['接受全色系'],
          attitude: ['安全'],
          consume: ['节制']
        },
      styles: styleOptions,
      colorTypes: colorTypeOptions,
      attitudes: attitudeOptions,
      consumes: consumeOptions,
      formLabelWidth: '120px',
      dialogFormVisible2: false,
      dialogFormVisible: false,
      dialogVisible: false,
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