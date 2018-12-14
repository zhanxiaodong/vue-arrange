<template>
 <div class="container">
     <div class="title">
        <el-button type="info" round>累计</el-button>
     </div>
     <div class="guest">   
         <div class="guest-title">1.用户综合关键指标</div>
     <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="4"><div class="style">总用户</div></el-col>
      <el-col :span="4"><div class="style">访问用户</div></el-col>
      <el-col :span="4"><div class="style">体验用户</div></el-col>
      <el-col :span="4"><div class="style">迷你会员</div></el-col>
      <el-col :span="4"><div class="style">会员转换率</div></el-col>
      <el-col :span="4"><div class="style">重复订阅用户</div></el-col>
     </el-row>
     <el-row type="flex" class="row-bg" >
      <el-col :span="4"><div class="">400</div></el-col>
      <el-col :span="4"><div class="">300</div></el-col>
      <el-col :span="4"><div class="">200</div></el-col>
      <el-col :span="4"><div class="">100</div></el-col>
      <el-col :span="4"><div class="">50</div></el-col>
      <el-col :span="4"><div class="">20</div></el-col>
     </el-row>
     <div class="distance-line"></div>
      <el-row type="flex" class="row-bg" >
          <el-col :span="4"><div class="style">用户尺码段</div></el-col>
          <el-col :span="4"><div class="style">66-73</div></el-col>
          <el-col :span="4"><div class="style">80-90</div></el-col>
          <el-col :span="4"><div class="style">100-110</div></el-col>
          <el-col :span="4"><div class="style">120-140</div></el-col>
          <el-col :span="4"><div class="style">90-100</div></el-col>
        </el-row>
        <el-row type="flex" class="row-bg" >
          <el-col :span="4"><div class="style">人数</div></el-col>
          <el-col :span="4"><div class="">100</div></el-col>
          <el-col :span="4"><div class="">100</div></el-col>
          <el-col :span="4"><div class="">100</div></el-col>
          <el-col :span="4"><div class="">300</div></el-col>
          <el-col :span="4"><div class="">100</div></el-col>
        </el-row>
        <div class="distance-line"></div>
        <el-row type="flex" class="row-bg" >
          <el-col :span="3"><div class="style">男女比例</div></el-col>
          <el-col :span="4"><div class="">30%</div></el-col>
          <el-col :span="4"><div class="">30%</div></el-col>
          <el-col :span="4"><div class="">30%</div></el-col>
          <el-col :span="5"><div class="">30%</div></el-col>
          <el-col :span="4"><div class="">30%</div></el-col>
        </el-row>
        <div class="distance-line"></div>
        <el-row type="flex" class="row-bg">
         <el-col :span="4"><div class="style">华南地区</div></el-col>
         <el-col :span="4"><div class="style">华北地区</div></el-col>
         <el-col :span="4"><div class="style">华西地区</div></el-col>
         <el-col :span="4"><div class="style">华东地区</div></el-col>
        </el-row>
        <el-row type="flex" class="row-bg" >
         <el-col :span="4"><div class="">20</div></el-col>
         <el-col :span="4"><div class="">30</div></el-col>
         <el-col :span="4"><div class="">40</div></el-col>
         <el-col :span="4"><div class="">50</div></el-col>
        </el-row>
        <div class="distance-line"></div>
        <el-row type="flex" class="row-bg">
         <el-col :span="4"><div class="style">每月订阅计划</div></el-col>
         <el-col :span="4"><div class="style">2月订阅计划</div></el-col>
         <el-col :span="4"><div class="style">自主订阅计划</div></el-col>
        </el-row>
        <el-row type="flex" class="row-bg" >
         <el-col :span="4"><div class="">20</div></el-col>
         <el-col :span="4"><div class="">30</div></el-col>
         <el-col :span="4"><div class="">50</div></el-col>
        </el-row>
     </div>
     <div class="order">
           <div class="guest-title">2.用户综合关键指标</div>
        <el-row type="flex" class="row-bg">
          <el-col :span="3"><div class="style">订单</div></el-col>
          <el-col :span="4"><div class="style">总订单量</div></el-col>
          <el-col :span="4"><div class="style">全买盒子</div></el-col>
          <el-col :span="4"><div class="style">半买盒子</div></el-col>
          <el-col :span="5"><div class="style">30%购买盒子</div></el-col>
          <el-col :span="4"><div class="style">全退盒子</div></el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="3"><div class="style">(数量)</div></el-col>
          <el-col :span="4"><div class="">100</div></el-col>
          <el-col :span="4"><div class="">100</div></el-col>
          <el-col :span="4"><div class="">100</div></el-col>
          <el-col :span="5"><div class="">300</div></el-col>
          <el-col :span="4"><div class="">100</div></el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="3"><div class="style">(百分比)</div></el-col>
          <el-col :span="4"><div class="">30%</div></el-col>
          <el-col :span="4"><div class="">30%</div></el-col>
          <el-col :span="4"><div class="">30%</div></el-col>
          <el-col :span="5"><div class="">30%</div></el-col>
          <el-col :span="4"><div class="">30%</div></el-col>
        </el-row>
        <div id="myChart" :style="{width: '500px', height: '300px'}"></div>
        <div class="distance-line"></div>
        <el-row type="flex" class="row-bg">
         <el-col :span="6"><div class="style">盒子平均货值</div></el-col>
         <el-col :span="6"><div class="style">盒子平均客单价</div></el-col>
         <el-col :span="6"><div class="style">盒子平均客件数</div></el-col>
         <el-col :span="6"><div class="style">盒子平均留下件数</div></el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
         <el-col :span="6"><div class="">837</div></el-col>
         <el-col :span="6"><div class="">647</div></el-col>
         <el-col :span="6"><div class="">39</div></el-col>
         <el-col :span="6"><div class="">50</div></el-col>
        </el-row>
     </div>
     <div class="shopping">
          <div class="guest-title">3.商品综合关键指标</div>
        <el-row type="flex" class="row-bg">
         <el-col :span="6"><div class="style">商品综合关键指标</div></el-col>
         <el-col :span="6"><div class="style">总商品</div></el-col>
         <el-col :span="6"><div class="style">总品牌方</div></el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
         <el-col :span="6"><div class="style">数量</div></el-col>
         <el-col :span="6"><div class="">647</div></el-col>
         <el-col :span="6"><div class="">50</div></el-col>
        </el-row>
        <div class="distance-line"></div>
        <el-row type="flex" class="row-bg">
         <el-col :span="6"><div class="style">品牌</div></el-col>
         <el-col :span="4"><div class="style">搭配数量</div></el-col>
         <el-col :span="4"><div class="style">销售数量</div></el-col>
         <el-col :span="2"><div class="style">动销率</div></el-col>
         <el-col :span="2"><div class="style">毛利率</div></el-col>
         <el-col :span="4"><div class="style">推荐成功率</div></el-col>
         <el-col :span="2"><div class="style">退货率</div></el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
         <el-col :span="6"><div class="">贝贝王国</div></el-col>
         <el-col :span="4"><div class="">1002</div></el-col>
         <el-col :span="4"><div class="">293</div></el-col>
         <el-col :span="2"><div class="">34%</div></el-col>
         <el-col :span="2"><div class="">20%</div></el-col>
         <el-col :span="4"><div class="">10%</div></el-col>
         <el-col :span="2"><div class="">57%</div></el-col>
        </el-row>
        <div class="distance-line"></div>
        <el-row type="flex" class="row-bg">
         <el-col :span="6"><div class="style">盒子1成功推荐率</div></el-col>
         <el-col :span="6"><div class="style">盒子2成功推荐率</div></el-col>
         <el-col :span="6"><div class="style">盒子3成功推荐率</div></el-col>
         <el-col :span="6"><div class="style">盒子4成功推荐率</div></el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
         <el-col :span="6"><div class="">20%</div></el-col>
         <el-col :span="6"><div class="">30%</div></el-col>
         <el-col :span="6"><div class="">40%</div></el-col>
         <el-col :span="6"><div class="">50%</div></el-col>
        </el-row>
        <div id="all" :style="{width: '500px', height: '300px'}"></div>
     </div>
     <div class="profit">
          <div class="guest-title">4.平台盈利综合指标</div>
         <el-row type="flex" class="row-bg">
         <el-col :span="6"><div class="style">累计销售</div></el-col>
         <el-col :span="6"><div class="style">包含优惠券销售额</div></el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
         <el-col :span="6"><div class="">¥20.333</div></el-col>
         <el-col :span="6"><div class="">¥50.433</div></el-col>
        </el-row>
     </div>
 </div>
</template>

<script>
 export default {
    name: 'eCharts',
    data () {
        return {
        msg: 'Welcome to Your Vue.js App'
        }
    },
    mounted(){
        this.drawLine();
        this.drawAll();
        this.drawOther();
    },
    methods: {
        drawLine(){
            // 基於準備好的dom，初始化echarts實例
            var myChart = this.$echarts.init(document.getElementById('myChart'))
            // 繪製圖表
            myChart.setOption({
                title: { text: '' },
                tooltip: {},
                legend: {
                   orient: 'horizontal',
                   left: 'center',
                   data: ['全买盒子','半买盒子','30%购买盒子','全退盒子']
                },
                series: [{
                    radius : '55%',
                    center: ['50%', '50%'],
                    name: '銷量',
                    type: 'pie',
                    data: [
                        {value: 15, name: '全买盒子'},
                        {value: 15, name: '半买盒子'},
                        {value: 15, name: '30%购买盒子'},
                        {value: 15, name: '全退盒子'}
                        ]
                }]
            });
        },

        drawAll(){
            var all = this.$echarts.init(document.getElementById('all'))
            all.setOption({
                  title: { text:'推荐成功率' },
                  xAxis: {
                    type: 'category',
                    data: ['盒子1成功推荐率', '盒子2成功推荐率', '盒子3成功推荐率', '盒子4成功推荐率', '盒子5成功推荐率']
         },
                  yAxis: {
                    type: 'category',
                    data: ['36%', '37%', '38%', '39%', '40%', '41%', '42%']
         },
                  series: [{
                    data: ['27%', '36%', '42%', '40%'],
                    type: 'line'
         }]
            });
        },

        drawOther(){
            var other = this.$echarts.init(document.getElementById('other'))
            other.setOption({
                  title: { text:'推荐成功率' },
                  xAxis: {
                    type: 'category',
                    data: ['盒子1成功推荐率', '盒子2成功推荐率', '盒子3成功推荐率', '盒子4成功推荐率', '盒子5成功推荐率']
         },
                  yAxis: {
                    type: 'category',
                    data: ['36%', '37%', '38%', '39%', '40%', '41%', '42%']
         },
                  series: [{
                    data: ['27%', '36%', '42%', '40%'],
                    type: 'line'
         }]
            });
        }
    }
}
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

 .guest-title {
     font-weight: 600;
     font-size: 18px;
     margin: 50px 0;
 }

 #other,#all,#myChart {
     margin-top: 30px;
 }

 .title {
     text-align: center;
 }

 .style {
     font-weight: 600;
 }
</style>