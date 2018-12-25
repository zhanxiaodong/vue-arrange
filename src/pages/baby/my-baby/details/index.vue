<style scoped>
.content {
  padding: 10px 0;
}
.babyinfo-one,.babyinfo-two,.like-one,.like-two,.parentinfo,.account-money {
  padding: 10px 0;
}

.repair-distance {
  margin-top: 10px;
}

#repair-distance {
  margin-bottom: 20px;
}

#line-distance {
  padding: 20px 0;
}

#distance-bottom {
  padding-bottom: 20px;
}

#babyimg {
  padding-bottom: 30px;
}

#account {
  padding-bottom: 10px;
}
.w100 {
    width:100px;
    height:100px;
}

/*.el-button--success {
    color: #fff;
    background-color: #67c23a;
    border-color: #67c23a;
}

.el-button {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
  }*/
</style>
<template lang="pug">
.my-baby-details
  el-col.text-center(:span="4")
    img.w100.h100(:src="baby.avatar ? baby.avatar:imgurl")
    el-col {{baby.call}}
    el-col {{baby.birth | monthDiff}}
  el-col(:span="20")
    el-row#header.rowcsf.lh30
      el-col.titlecs
        span 注册档案 ( {{baby.id}} )
      el-col.content
        el-col(:span="5")
          span 注册日期: {{baby.createTime,'YYYY/MM/DD' | timeFormat}}
        //el-col(:span="3")
          span 芝麻认证: {{baby.aliCredit}}
        el-col(:span="5")
          span 手机号:  {{baby.tel}}
        el-col(:span="7")
          span 微信号:  {{baby.nickName}}       
      el-col
        el-col(:span="5")
          span 会员类型:  {{baby.userLev}}
        el-col(:span="5")
          span 用户评级: {{baby.level}}
        el-col(:span="7")
          span 订阅计划: {{baby.planDesc}} {{baby.plan  | listToStr}}
    el-row.pt30.lh30
      <div id="distance-bottom" class="titlecs el-col el-col-24">宝贝信息 <span @click="dialogFormVisible = true" style="color: #04B8A0; padding-left: 20px;">修改</span></div>
    <el-dialog title="宝贝信息" :visible.sync="dialogFormVisible" style="margin-top: -10vh;">
     <el-form>
      <el-form-item label="姓名" :label-width="formLabelWidth">
        <el-input  style="width:50%" v-model="baby.call" placeholder="请选择姓名(name)" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="性别" :label-width="formLabelWidth">
        <el-radio-group v-model="baby.gender">
           <el-radio label="男孩">男孩</el-radio>
           <el-radio label="女孩">女孩</el-radio>
        </el-radio-group>
      </el-form-item>
      
      <el-form-item label="生日" :label-width="formLabelWidth">
        <el-date-picker v-model="birth" type="date" value-format='yyyy-MM-dd' placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="身高" :label-width="formLabelWidth">
        <el-input style="width:50%" v-model="baby.height" placeholder="请选择身高(cm)" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="体重" :label-width="formLabelWidth">
        <el-input style="width:50%" v-model="baby.weight" placeholder="请选择体重(kg)" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="鞋码" :label-width="formLabelWidth">
        <el-input style="width:50%" v-model="baby.size" placeholder="请选择鞋码(size)" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="肤色" :label-width="formLabelWidth">
        <el-radio-group v-model="baby.skinColor" size="medium">
        <el-radio-button label="不确定"></el-radio-button>
        <el-radio-button label="白皙"></el-radio-button>
        <el-radio-button label="正常"></el-radio-button>
        <el-radio-button label="偏黑"></el-radio-button>
      </el-radio-group>
    </el-form-item>
     </el-form> 
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="modifyBaby">确 定</el-button>
      </div>
    </el-dialog>
      el-col.babyinfo-one
        el-col(:span="5")
          span 姓名: {{baby.call}}
        el-col(:span="5")
          span 性别: {{baby.gender}}
        el-col(:span="5")
          span 生日: {{baby.birth}}
      el-col.babyinfo-two
        el-col(:span="5") 身高: {{baby.height}} cm
        el-col(:span="5") 体重: {{baby.weight}} kg
        el-col(:span="5") 鞋码: {{baby.size}} size
        el-col(:span="5") 肤色: {{baby.skinColor}}
    el-row.pt30.lh30
      <div id="line-distance" class="titlecs el-col el-col-24">用户偏好<span @click="dialogFormVisible2 = true" style="color: #04B8A0; padding-left: 20px;">修改</span></div>
    <el-dialog title="用户偏好" :visible.sync="dialogFormVisible2">
     <el-form>
      <el-form-item label="风格" :label-width="formLabelWidth">
       <el-checkbox-group v-model="baby.style" size="medium">
        <el-checkbox-button v-for="style in styles" :label="style" :key="style">{{style}}</el-checkbox-button>
       </el-checkbox-group>
      </el-form-item>
      <el-form-item label="颜色" :label-width="formLabelWidth">
        <el-radio-group v-model="baby.colorType" size="medium">
        <el-radio-button v-for="colorType in colorTypes" :label="colorType" :key="colorType">{{colorType}}</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="注重" :label-width="formLabelWidth">
       <el-checkbox-group v-model="baby.attitude" size="medium">
        <el-checkbox-button v-for="attitude in attitudes" :label="attitude" :key="attitude">{{attitude}}</el-checkbox-button>
       </el-checkbox-group>
      </el-form-item>
      <el-form-item label="意愿" :label-width="formLabelWidth">
        <el-radio-group v-model="baby.consume" size="medium">
        <el-radio-button v-for="consume in consumes" :label="consume" :key="consume" >{{consume}}</el-radio-button>
        </el-radio-group>
      </el-form-item>
     </el-form> 
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="modifyUser">确 定</el-button>
      </div>
    </el-dialog>
      el-col.like-one
        el-col(:span="5") 风格: {{baby.style | listToStr}}
        el-col(:span="5") 颜色: {{baby.colorType}}
      el-col.like-two
        el-col(:span="5") 注重: {{baby.attitude | listToStr}}
        el-col(:span="5") 意愿: {{baby.consume | listToStr}}
    el-row.pt30.lh30
      el-col#line-distance.titlecs 家长属性
      el-col
        el-col.parentinfo
          span 类型: {{baby.selfEval}}
        el-col
          span 社交: {{baby.netWork | listToStr}}
    el-row.pt30.lh30
      el-col#babyimg.titlecs 宝贝照片
      el-col
        //img(:src="baby.bodyPic ? baby.bodyPic:bodyde")
        <img :src="baby.bodyPic ? baby.bodyPic:bodyde" style="width: 300px;height: 240px;">
    el-row.pt30.lh30
      el-col#account.titlecs 账户
      el-col.account-money
        el-col(:span="2") 余额: 
        el-col(:span="22") {{userAccount.balance}}
      el-col.account-history
        el-col(:span="2")  记录: 
        el-col(:span="22")
          el-col(v-for="(item, index) in userAccount.recordList" v-bind:key="index")
            el-col(:span="3") {{item.createTime,'YYYY/MM/DD' | timeFormat}}
            el-col(:span="3") {{item.dealType == '充值'? '+':item.dealType == '奖金'? '+':'-'}} {{item.amount}}
            el-col(:span="3") {{item.dealType}}
    el-row.pt30.lh30
      el-col#account.titlecs 订单信息
      el-col(v-for="(item, index) in boxRecord" v-bind:key="index")
        el-col
          el-col(:span="2") 
            span {{item.createTime,'YYYY/MM/DD' | timeFormat}}
            span.pl10 -
          el-col.pl10(:span="4") 
            el-button.btn(type="text" @click="showDetails(item)") {{item.orderNo}}
        el-col(v-if="item.goodsEval")
          el-col(:span="2") 
            span {{item.goodsEval.createTime,'YYYY/MM/DD' | timeFormat}}
            span.pl10 -
          el-col.pl10(:span="22").titlecs
            span {{item.goodsEval.desc}}
    el-row.rowcs
      el-col(:span="21")
        el-col#repair-distance.titlecs 修正信息
        el-row.lh30
          el-col.repair-distance 体型: {{babyModify.shape}}
          el-col.repair-distance 审美: {{babyModify.taste}}
          el-col.repair-distance 态度: {{babyModify.attitude}}
          el-col.repair-distance 消费: {{babyModify.consume}}
          el-col.repair-distance 素质: {{babyModify.quality}}
          el-col.repair-distance 补充说明: {{babyModify.descs}}
      el-col(:span="2")
        el-button(type="success" @click="talk") 修正
        //el-button(type="info" disabled v-else) 修正
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
    	birth:'2018-11-12',
      styles: ['时尚','休闲','卡通','运动','民族','优雅'],
      colorTypes:  ['接受全色系','不喜欢灰暗色系','不喜欢鲜艳色系'],
      attitudes: ['安全','品牌','舒适','个性','实惠','好看'],
      consumes: ['节制 50-100/套','正常 100-300/套','小资 300-500/套','轻奢 500+/套'],
      formLabelWidth: '120px',
      dialogFormVisible2: false,
      dialogFormVisible: false,
      dialogVisible: false,
      showImg: false,
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
      babyModify:{
      	consume: '',
        descs: '',
        quality: '',
        attitude: '',
        shape: '',
        taste: ''
      },
      boxDetail: {
        babyModify: {}
      },
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
    /*添加标签信息*/
    confirmTalk (formName) {
      var item = this.talkForm
      this.$axios.post(this.$apis.task.updateBoxModify, item).then((res) => {
        if (res.code === '1') {
          this.$message.success('更新成功')
          this.talkVisible = false
          this.babyModify.shape = this.talkForm.shape
          this.babyModify.taste = this.talkForm.taste
          this.babyModify.attitude = this.talkForm.attitude
          this.babyModify.consume = this.talkForm.consume
          this.babyModify.quality = this.talkForm.quality
          this.babyModify.level = this.talkForm.level
          this.babyModify.descs = this.talkForm.descs
          this.baby.level = this.talkForm.level
          this.$refs[formName].resetFields()
        } else {
          this.$message.error(res.message)
        }
      }).catch((errRes) => {
        this.$message.error(errRes.message)
      })
    },
    talk () {
      this.updateBasic('style', this.babyModify.style)
      this.talkForm.style = this.babyModify.style
      this.updateBasic('me', this.babyModify.me)
      this.talkForm.me = this.babyModify.me
      this.updateBasic('scene', this.babyModify.scene)
      this.talkForm.scene = this.babyModify.scene
      this.updateBasic('season', this.babyModify.season)
      this.talkForm.consume = this.babyModify.consume
      this.updateBasic('attr', this.babyModify.attr)
      this.talkForm.attr = this.babyModify.attr
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
    /*标签添加到行中*/
    inputChange (type) {
      var value = this.shapeInput || this.attitudeInput || this.consumeInput || this.tasteInput || this.qualityInput;
      this.updateBasic(type, value)
      this.shapeInput = ''
      this.attitudeInput = ''
      this.consumeInput = ''
      this.tasteInput = ''
      this.qualityInput = ''
    },
    /*newBox () {
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
    },*/
    
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
        	this.birth = res.data.baby.birth
          this.baby = res.data.baby
          this.boxRecord = res.data.boxRecord
          this.userAccount = res.data.userAccount
          if(res.data.babyModify) {
          	this.babyModify = res.data.babyModify
          }
        } else {
          this.$message.error(res.message)
        }
      }).catch((errRes) => {
        this.$message.error(errRes.message)
      })
    },
    modifyBaby () {
      this.dialogFormVisible = false
      var baby = {}
      baby.id = this.baby.id
      baby.call = this.baby.call
      baby.gender = this.baby.gender
      baby.birth = this.birth
      baby.height = this.baby.height
      baby.weight = this.baby.weight
      baby.size = this.baby.size
      baby.skinColor = this.baby.skinColor
      console.log(baby)
      this.$axios.post(this.$apis.baby.modifyBaby, baby).then((res) => {
        if (res.code === '1') {
        	this.$message.success("更新成功")
        	this.getBabyDetail(this.$route.query.id)
        } else {
          this.$message.error(res.message)
        }
      }).catch((errRes) => {
        this.$message.error(errRes.message)
      })
    },
    modifyUser () {
      this.dialogFormVisible2 = false
      var user = {}
      user.wechatOpenId = this.baby.openId
      user.style = this.baby.style
      user.colorType = this.baby.colorType
      user.attitude = this.baby.attitude
      var consumDesc = {}
      consumDesc.except = this.baby.consume
      user.consumDesc = consumDesc
      this.$axios.post(this.$apis.baby.modifyUser, user).then((res) => {
        if (res.code === '1') {
        	this.$message.success("更新成功")
        	this.getBabyDetail(this.$route.query.id)
        } else {
          this.$message.error(res.message)
        }
      }).catch((errRes) => {
        this.$message.error(errRes.message)
      })
    }
  },
  mounted () {
    let routerParams = this.$route.params.dataobj
    if (routerParams) {
      this.routerParams = routerParams
    }
    this.getBabyDetail(this.$route.query.id)
  },
}
</script>