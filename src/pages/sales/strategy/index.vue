<template>
<html class="page">
  <h2 style="margin-left: 10px;">push通知</h2>
  <div class="one">
   <el-row class="distance">
     <el-col :span="3"><div class="basic-title">目标用户:</div></el-col>
     <el-radio-group v-model="radio1" style="all: unset;">
     <el-col :span="3"><el-radio :label="3">所有用户</el-radio></el-col>
     <el-col :span="3"><el-radio :label="6">注册用户</el-radio></el-col>
     <el-col :span="3"><el-radio :label="9">vip</el-radio></el-col>
     </el-radio-group>
     <el-col :span="3">指定 <i class="el-icon-circle-plus" @click="open3"></i></el-col> 
   </el-row>
   <el-row class="distance">
     <el-col :span="3"><div class="basic-title">push类型:</div></el-col>
    <el-radio-group v-model="radio2" style="all: unset;"> 
     <el-col :span="3"><el-radio :label="2">服务通知</el-radio></el-col>
     <el-col :span="3"><el-radio :label="1">短信</el-radio></el-col>
    </el-radio-group>
   </el-row>
   <el-row>
     <el-col :span="3"><div class="basic-title">push内容:</div></el-col>
     <el-col :span="6">
         <el-card class="box-card">
            <div class="text item">
              服务状态通知: <i class="el-icon-caret-bottom"></i>
            </div>
            <div v-for="item in listContent" :key="item.id" class="text item">
             {{item.title}}{{item.content}}
            </div>
         </el-card>
     </el-col>
     <el-col :span="6" style="margin-left: 50px;">
         <el-card class="box-card" style="line-height: 200px;">
            短信内容:{{content}}
         </el-card>
     </el-col>
   </el-row>
   <el-button type="success" class="infoButton" @click="open7">确认推送</el-button>
  </div>
   <h2 class="title">优惠投放</h2>
   <div class="second">
    <el-row class="distance">
     <el-col :span="3"><div class="basic-title">目标用户:</div></el-col>
     <el-radio-group v-model="radio3" style="all: unset;">
     <el-col :span="3"><el-radio :label="1">所有用户</el-radio></el-col>
     <el-col :span="3"><el-radio :label="2">注册用户</el-radio></el-col>
     <el-col :span="3"><el-radio :label="3">vip</el-radio></el-col>
     </el-radio-group>
     <el-col :span="3">指定 <i class="el-icon-circle-plus" @click="open3"></i></el-col>
   </el-row>
   <el-row class="distance">
     <el-col :span="3"><div class="basic-title">优惠类型:</div></el-col>
     <el-radio-group v-model="radio4" style="display:block;">
     <el-col :span="3"><el-radio :label="1">满减券</el-radio></el-col>
     <el-col :span="3"><el-radio :label="2">立减券</el-radio></el-col>
     <el-col :span="3"><el-radio :label="3">体验券</el-radio></el-col>
     <el-col :span="3"><el-radio :label="4">会员身份</el-radio></el-col>
     </el-radio-group>
   </el-row> 
   <el-radio-group v-model="radio5" style="all: unset;">
   <el-row>
     <el-col :span="3"><div class="basic-title">优惠内容:</div></el-col>
     <el-col :span="3" style="margin-bottom: 30px;"><el-radio :label="1">满{{math}}100减{{math}}10</el-radio></el-col>
   </el-row>
   <el-row>  
    <el-col :span="3" class="left-distance"><el-radio :label="2">立减{{math}}100</el-radio></el-col>
   </el-row>
   <el-row>
    <el-col :span="3" class="left-distance"><el-radio :label="3">体验{{math}}</el-radio></el-col>
   </el-row>
   </el-radio-group>
   <el-radio-group v-model="radio6" style="all: unset;">
   <el-row>
    <el-col :span="1" class="left-distance"><div class="basic-title">会员:</div></el-col>
    <el-col :span="2"><el-radio :label="1">年度</el-radio></el-col>
    <el-col :span="2"><el-radio :label="2">终身</el-radio></el-col>
   </el-row>
   </el-radio-group>
   <el-button type="success" class="infoButton" @click="open1">直接投放</el-button>
   <el-button type="success" class="infoButton" @click="open2">生成优惠码</el-button>
   </div>
</html>
</template>

<script>
 export default {
     data () {
         return {
              radio1: 1,
              radio2: 2,
              radio3: 3,
              radio4: 4,
              radio5: 5,
              radio6: 6,
              listContent:[
                 {
                  title: '服务类型',
                  content: '拉取数据库:',
                },
                 {
                  title: '服务状态:',
                  content: '',
                },
                 {
                  title: '温馨提示:',
                  content: '',
                },
              ]
         }
     },

    methods: {
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
      open3() {
        this.$prompt('请输入手机号码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '你的手机是: ' + value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
      },
      open7() {
        this.$confirm('该推送不可撤回请谨慎核对信息，是否确认信息无误', {
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
    box-shadow: 0px 0px 15px 6px rgba(128,128,128,0.08);
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
    box-shadow: 0px 0px 15px 6px rgba(128,128,128,0.08);
   }

   .left-distance {
       margin-left: 12.5%;
       margin-bottom: 30px;
   }
   .basic-title {
       font-weight: 600;
   }
</style>