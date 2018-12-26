<template>
  <html class="page">
  <h2 style="margin-left: 10px;">push通知</h2>
  <div class="one">
    <el-row class="distance">
      <el-col :span="3">
        <div class="basic-title">目标用户:</div>
      </el-col>
      <el-radio-group v-model="pushMsg.userType" style="all: unset;">
        <el-col :span="3">
          <el-radio label="ALL_USERS">所有用户</el-radio>
        </el-col>
        <el-col :span="3">
          <el-radio label="REG_USERS">注册用户</el-radio>
        </el-col>
        <el-col :span="3">
          <el-radio label="VIP_USERS">vip</el-radio>
        </el-col>
        <el-col :span="12">
          <el-radio label="">指定用户</el-radio>
          <el-select v-model="pushMsg.phones" multiple filterable allow-create default-first-option placeholder="输入指定用户手机号">
        </el-select>
        </el-col>
      </el-radio-group>
    </el-row>
    <el-row class="distance">
      <el-col :span="3">
        <div class="basic-title">push类型:</div>
      </el-col>
      <el-radio-group v-model="pushType" style="all: unset;" @change="findPushMsgByType">
        <el-col :span="3">
          <el-radio label="WECHAT">服务通知</el-radio>
        </el-col>
        <el-col :span="3">
          <el-radio label="SMS">短信</el-radio>
        </el-col>
      </el-radio-group>
    </el-row>
    <el-row>
      <el-col :span="3">
        <div class="basic-title">push内容:</div>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <div class="text item">
            服务状态通知:
          </div>
          <el-select v-model="pushTemplateId" placeholder="请选择" @change="selectPush">
            <el-option v-for="item in pushTemplateArr" :key="item.id" :label="item.title" :value="item.id">
            </el-option>
          </el-select>
        </el-card>
      </el-col>
      <el-col :span="6" style="margin-left: 50px;">
        <el-card class="box-card">
          短信内容:  {{pushTemplate.content}}
        </el-card>
      </el-col>
    </el-row>
    <el-button type="success" class="infoButton" @click="push">确认推送</el-button>
  </div>
  <h2 class="title">优惠投放</h2>
  <div class="second">
    <el-row class="distance">
      <el-col :span="3">
        <div class="basic-title">目标用户:</div>
      </el-col>
      <el-radio-group v-model="discount.userType" style="all: unset;">
        <el-col :span="3">
          <el-radio label="ALL_USERS">所有用户</el-radio>
        </el-col>
        <el-col :span="3">
          <el-radio label="REG_USERS">注册用户</el-radio>
        </el-col>
        <el-col :span="3">
          <el-radio label="VIP_USERS">vip</el-radio>
        </el-col>
        <el-col :span="12">
          <el-radio label="">指定用户</el-radio>
          <el-select v-model="pushMsg.phones" multiple filterable allow-create default-first-option placeholder="输入指定用户手机号">
        </el-select>
        </el-col>
      </el-radio-group>
    </el-row>
    <el-row class="distance">
      <el-col :span="3">
        <div class="basic-title">优惠类型:</div>
      </el-col>
      <el-radio-group v-model="radio4" style="display:block;">
        <el-col :span="3">
          <el-radio :label="1">满减券</el-radio>
        </el-col>
        <el-col :span="3">
          <el-radio :label="2">立减券</el-radio>
        </el-col>
        <el-col :span="3">
          <el-radio :label="3">体验券</el-radio>
        </el-col>
        <el-col :span="3">
          <el-radio :label="4">会员身份</el-radio>
        </el-col>
      </el-radio-group>
    </el-row>
    <el-radio-group v-model="radio5" style="all: unset;">
      <el-row>
        <el-col :span="3">
          <div class="basic-title">优惠内容:</div>
        </el-col>
        <el-col :span="3" style="margin-bottom: 30px;">
          <el-radio :label="1">满100减10</el-radio>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3" class="left-distance">
          <el-radio :label="2">立减100</el-radio>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3" class="left-distance">
          <el-radio :label="3">体验</el-radio>
        </el-col>
      </el-row>
    </el-radio-group>
    <el-radio-group v-model="radio6" style="all: unset;">
      <el-row>
        <el-col :span="1" class="left-distance">
          <div class="basic-title">会员:</div>
        </el-col>
        <el-col :span="2">
          <el-radio :label="1">年度</el-radio>
        </el-col>
        <el-col :span="2">
          <el-radio :label="2">终身</el-radio>
        </el-col>
      </el-row>
    </el-radio-group>
    <el-button type="success" class="infoButton" @click="open1">直接投放</el-button>
    <el-button type="success" class="infoButton" @click="open2">生成优惠码</el-button>
  </div>

  </html>
</template>

<script>
  export default {
    data() {
      return {
        pushType: "WECHAT",
        pushMsg: {userType:""},
        pushTemplateId: null,
        pushTemplate: {},
        pushTemplateArr: [],
        discount: {userType:""},
        radio4: 4,
        radio5: 5,
        radio6: 6,
        voucher: { discountType: "ExchangeVoucher", "VipType": "50", "sendNumbers": 3 },
      }
    },
    created() {
      this.findPushMsgByType()
    },
    methods: {
      findPushMsgByType() {
        var pushType = this.pushType
        this.$axios.get(this.$apis.push.findPushMsgByType, { params: { pushType: pushType } }).then((res) => {
          if(res.code !== '1') {
            this.$message.error(res.message)
          } else {
            if(res.data[0]) {
              this.pushTemplateArr = res.data
              this.pushTemplate = res.data[0]
              this.pushTemplateId = this.pushTemplate.id
            }
          }
        }).catch((errRes) => {
          this.$message.error(errRes.message)
        })
      },
      selectPush() {
        for(var i = 0; i < this.pushTemplateArr.length; i++) {
          if(this.pushTemplateArr[i].id == this.pushTemplateId) {
            this.pushTemplate = this.pushTemplateArr[i]
          }
        }
      },
      open1() {
        this.$confirm('该投放不可撤回请谨慎核对信息，是否确认信息无误', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$message({
            type: 'success',
            message: '推送成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消推送'
          });
        });
      },
      open2() {
        this.$confirm('优惠码为:{{}}ZH2S', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          center: true
        }).then(() => {
          this.$message({
            type: 'success',
            message: '确认成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消成功'
          });
        });
      },
      
      push() {
        this.pushMsg.pushTemplateId = this.pushTemplateId
				this.$axios.post(this.$apis.push.pushMsg, this.pushMsg).then((res) => {
          if(res.code !== '1') {
            this.$message.error(res.message)
          } else {
            this.$message.success('推送成功!')
          }
        }).catch((errRes) => {
          this.$message.error(errRes.message)
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .container {
    padding: 30px 0 30px 30px;
  }
  /*卡片样式*/
  
  .text {
    font-size: 14px;
  }
  
  .item {
    padding: 18px 0;
  }
  
  .one {
    padding: 30px;
    margin-top: 20px;
    box-shadow: 0px 0px 15px 6px rgba(128, 128, 128, 0.08);
  }
  
  .distance {
    margin-bottom: 30px;
  }
  
  .infoButton {
    margin-left: 12.5%;
    margin-top: 50px;
  }
  
  .title {
    margin: 30px 0 30px 10px;
  }
  
  .second {
    padding: 30px;
    box-shadow: 0px 0px 15px 6px rgba(128, 128, 128, 0.08);
  }
  
  .left-distance {
    margin-left: 12.5%;
    margin-bottom: 30px;
  }
  
  .basic-title {
    font-weight: 600;
  }
</style>