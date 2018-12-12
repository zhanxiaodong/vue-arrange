<template>
 <div class="container">
    <div class="left">
        <el-button type="info" round>累计</el-button>
     <div class="guest">   
     <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="3"><div class="">总用户</div></el-col>
      <el-col :span="4"><div class="">访问用户</div></el-col>
      <el-col :span="4"><div class="">体验用户</div></el-col>
      <el-col :span="4"><div class="">迷你会员</div></el-col>
      <el-col :span="4"><div class="">会员转换率</div></el-col>
      <el-col :span="5"><div class="">重复订阅用户</div></el-col>
     </el-row>
     <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="3"><div class="">400</div></el-col>
      <el-col :span="4"><div class="">300</div></el-col>
      <el-col :span="4"><div class="">200</div></el-col>
      <el-col :span="4"><div class="">100</div></el-col>
      <el-col :span="4"><div class="">50</div></el-col>
      <el-col :span="5"><div class="">20</div></el-col>
     </el-row>
     <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="6"><div class="">每月订阅计划</div></el-col>
      <el-col :span="6"><div class="">2月订阅计划</div></el-col>
      <el-col :span="6"><div class="">季度订阅计划</div></el-col>
      <el-col :span="6"><div class="">自主订阅计划</div></el-col>
     </el-row>
     <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="6"><div class="">20</div></el-col>
      <el-col :span="6"><div class="">30</div></el-col>
      <el-col :span="6"><div class="">40</div></el-col>
      <el-col :span="6"><div class="">50</div></el-col>
     </el-row>
      <div>echart</div>
     </div>
     <div class="order">
        <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="3"><div class="">订单</div></el-col>
          <el-col :span="4"><div class="">总订单量</div></el-col>
          <el-col :span="4"><div class="">全买盒子</div></el-col>
          <el-col :span="4"><div class="">半买盒子</div></el-col>
          <el-col :span="5"><div class="">30%购买盒子</div></el-col>
          <el-col :span="4"><div class="">全退盒子</div></el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="3"><div class="">(数量)</div></el-col>
          <el-col :span="4"><div class="">100</div></el-col>
          <el-col :span="4"><div class="">100</div></el-col>
          <el-col :span="4"><div class="">100</div></el-col>
          <el-col :span="5"><div class="">300</div></el-col>
          <el-col :span="4"><div class="">100</div></el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="3"><div class="">(百分比)</div></el-col>
          <el-col :span="4"><div class="">30%</div></el-col>
          <el-col :span="4"><div class="">30%</div></el-col>
          <el-col :span="4"><div class="">30%</div></el-col>
          <el-col :span="5"><div class="">30%</div></el-col>
          <el-col :span="4"><div class="">30%</div></el-col>
        </el-row>
        <div>echart</div>
     </div>
    </div>
    <div class="right">
        <div class="left-header">
            <el-button type="info" round>本周</el-button>
            <el-button type="info" round>本月</el-button>
            <el-button type="info" round>季度</el-button>
        </div>
    </div>
 </div>
</template>

<script>

</script>
 
<style lang="stylus" scoped>
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

 .container {
     display: flex;
     flex-flow: row nowrap;
 }
 .left {
     width: 49%;
     background: green;
 }
 .right {
     width: 49%;
     margin-left: 2%;
     background: red;
 }
 .left-header {
     display: flex;
     flex-flow: row nowrap;
     justify-content center;
 }
</style>