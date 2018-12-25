<template>
 <div class="container">
  <div class="one">
    <div class="title">平台综合关键指标</div>
        <el-row type="flex" class="row-bg" >
          <el-col :span="3"><div class="">支付用户</div></el-col>
          <el-col :span="4"><div class="">付费会员用户</div></el-col>
          <el-col :span="3"><div class="">营收全额</div></el-col>
          <el-col :span="3"><div class="">推荐成功率</div></el-col>
          <el-col :span="3"><div class="">支付率</div></el-col>
          <el-col :span="3"><div class="">订阅率</div></el-col>
        </el-row>
         <el-row type="flex" class="row-bg" >
          <el-col :span="3"><div class="">398</div></el-col>
          <el-col :span="4"><div class="">202</div></el-col>
          <el-col :span="3"><div class="">35322</div></el-col>
          <el-col :span="3"><div class="">45%</div></el-col>
          <el-col :span="3"><div class="">45%</div></el-col>
          <el-col :span="3"><div class="">45%</div></el-col>
        </el-row>
  </div>
  <div class="two">
    <div class="title">用户综合关键指标</div>
        <el-row type="flex" class="row-bg" >
          <el-col :span="3"><div class="">总注册用户</div></el-col>
          <el-col :span="4"><div class="">付费会员用户</div></el-col>
          <el-col :span="3"><div class="">男女比例</div></el-col>
          <el-col :span="3"><div class="">核心年龄段</div></el-col>
          <el-col :span="3"><div class="">地域</div></el-col>
          <el-col :span="3"><div class="">推荐率</div></el-col>
        </el-row>
         <el-row type="flex" class="row-bg" >
          <el-col :span="3"><div class="">398</div></el-col>
          <el-col :span="4"><div class="">202</div></el-col>
          <el-col :span="3"><div class="">1:2</div></el-col>
          <el-col :span="3"><div class="">20-24</div></el-col>
          <el-col :span="3"><div class="">浙江</div></el-col>
          <el-col :span="3"><div class="">45%</div></el-col>
        </el-row>
  </div>
  <div class="one">
    <div class="title">商品综合关键指标</div>
        <el-row type="flex" class="row-bg" >
          <el-col :span="3"><div class="">总数</div></el-col>
          <el-col :span="4"><div class="">品牌</div></el-col>
          <el-col :span="3"><div class="">折扣率</div></el-col>
          <el-col :span="3"><div class="">动销率</div></el-col>
          <el-col :span="3"><div class="">毛利率</div></el-col>
        </el-row>
         <el-row type="flex" class="row-bg" >
          <el-col :span="3"><div class="">398</div></el-col>
          <el-col :span="4"><div class="">202</div></el-col>
          <el-col :span="3"><div class="">20%</div></el-col>
          <el-col :span="3"><div class="">45%</div></el-col>
          <el-col :span="3"><div class="">45%</div></el-col>
        </el-row>
  </div>
  <div class="one">
    <div class="title">业务综合关键指标</div>
        <el-row type="flex" class="row-bg" >
          <el-col :span="3"><div class="">盒子总计</div></el-col>
          <el-col :span="4"><div class="">盒子会员均价</div></el-col>
          <el-col :span="3"><div class="">平均周期</div></el-col>
          <el-col :span="3"><div class="">客件数</div></el-col>
          <el-col :span="3"><div class="">客单价</div></el-col>
          <el-col :span="3"><div class="">支付率</div></el-col>
        </el-row>
         <el-row type="flex" class="row-bg" >
          <el-col :span="3"><div class="">398</div></el-col>
          <el-col :span="4"><div class="">202</div></el-col>
          <el-col :span="3"><div class="">6.3天</div></el-col>
          <el-col :span="3"><div class="">30</div></el-col>
          <el-col :span="3"><div class="">45%</div></el-col>
          <el-col :span="3"><div class="">45%</div></el-col>
        </el-row>
  </div>
 </div>
</template>
<script>
</script>
<style lang= "stylus" scoped>
  .el-row {
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
      text-align:center;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

 .left {
     width: 49%;
     text-align: center;
 }
 .right {
     width: 49%;
     margin-left: 2%;
     text-align: center;
 }
 .left-header {
     display: flex;
     flex-flow: row nowrap;
     justify-content center;
 }

 .distance-line {
     height: 80px;
 }

 .title {
     font-weight: 600;
     font-size: 18px;
     margin: 60px 0 30px 0;
 }

</style>

