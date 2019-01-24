<template lang="pug">
.new-task-details
  el-row.pb20
    el-button(type="success" @click="getPdf()") PDF 下载
    el-button.ml20(type="success" @click="testImg()") 图片 下载
  el-row.borcol
    el-row.printro(:id="idstr" download)
      el-row
        el-col.fir(:span="8")
          span {{form.nowTime,'YYYY/MM/DD' | timeFormat}}
        el-col.fir(:span="14") 盒子清单 - {{form.orderNo ? form.orderNo : 'M1704031221180422'}} - 迷你王国
      el-row.pt115.pb15.row-ff
        el-col.sec-t.pl100(:span="10") To {{form.baby}} 的穿搭建议
        el-col.sec-c(:span="14") Selected by {{form.stylist}} | 迷你王国       订单编号：{{form.orderNo ? form.orderNo : 'M1704031221180422'}}
      el-row.pl100.pr100.pt50.advicecs
        el-col.other.h600.ft36(v-html="form.remark")
        el-col.text-right.pr250
          span.ft46.ft-bd 贴心小姑姑:  {{form.stylist}}

      el-row.row-th
        el-row.row-sec.text-center.ft-bd
          el-col.bor.pt50.pb50(:span="4")
            el-col
              span.ft42 ITEM NO.
            el-col.ft36 商品编号
          el-col.bor.pt50.pb50(:span="10")
            el-col 
              span.ft-bd.ft42 DESCRIPTION
            el-col.ft36 服饰名称
          el-col.bor.pt50.pb50(:span="5")
            el-col 
              span.ft-bd.ft42 BRAND PRICE
            el-col.ft36 品牌零售价
          el-col.pt50.pb15(:span="5")
            el-col 
              span.ft-bd.ft42 MINI PRICE
            el-col.ft36 折后价（3.5折）
        el-row.brandcs
          el-row.goodstable.text-center(v-for="(item, index) in form.goodsList" v-bind:key="index" v-if="index <= 6")
            el-col(v-if="index < 6")
              el-col.bor.pt10(:span="4")
                span.ft42.ft-bd & 0{{index + 1}}
              el-col.bor.pt10(:span="10")
                span.ft36 {{item.brand}} {{item.color}}{{item.name}}
              el-col.bor.pt10(:span="5")
                span.ft36.oprice ¥{{item.initAmount|numFilter}}
              el-col.pt10(:span="5")
                span.ft36 ¥{{item.initAmount * 0.35|numFilter}}
            el-col#some(v-if="form.goodsList.length-1 < 7  && index == form.goodsList.length-1")
              el-col.pt10(:span="4")
                //- span.ft42.ft-bd 总价
              el-col.pt10.right(:span="20")
                 span.ft42.ft-bd （任意1件3.5折  3件起3.2折 全留3折）
              //- el-col.pt10(:span="5")
              //-   span.ft42.oprice.ft-bd ¥{{form.realTotal|numFilter}}
                    span.ft42.ft-bd 总价
              //- el-col.pt10(:span="5")
              //-   span.ft42.ft-bd ¥{{form.total * 0.3|numFilter}}
            el-col(v-if="form.goodsList.length-1 < 7  && index == form.goodsList.length-1")
              el-col.pt10(:span="4")
                //- span.ft42.ft-bd 折上折
              el-col.pt10(:span="13")
                //- span.ft42.ft-bd 整盒全要7折
              //- el-col.pt10(:span="5")
              //-   span.ft42.oprice.ft-bd
              //- el-col.pt10.right(:span="24")
              //-   span.ft42.ft-bd （任意1件3.5折  3件起3.2折 全留3折）
            el-col#some(v-if="index == 6")
              el-col.bor.pt10(:span="4")
                span.ft42.ft-bd ......
              el-col.bor.pt10(:span="10")
                span.ft36.ft-bd ......
              el-col.bor.pt10(:span="5")
                span.ft36.ft-bd ......
              el-col.pt10(:span="5")
                span.ft36.ft-bd ......
            el-col(v-if="form.goodsList.length-1 >= 7 && index == 6")
              el-col.pt10(:span="4")
                span.ft42.ft-bd 总价
              el-col.pt10(:span="10")
                span.ft42.ft-bd 共{{form.goodsList.length}}件商品
              el-col.pt10(:span="5")
                span.ft42.oprice.ft-bd ¥{{form.total|numFilter}}
              el-col.pt10(:span="5")
                span.ft42.ft-bd ¥{{form.realTotal|numFilter}}
            el-col(v-if="form.goodsList.length-1 >= 7 && index == 6")
              el-col.pt10(:span="4")
                span.ft42.ft-bd 折扣价
              el-col.pt10(:span="10")
                span.ft42.ft-bd 整盒全要7折
              el-col.pt10(:span="5")
                span.ft42.oprice.ft-bd
              el-col.pt10(:span="5")
                span.ft42.ft-bd ¥{{form.realTotal*0.7|numFilter}}
            el-col(v-if="index == 6")
              span.ft36 更多清单请打开迷你王国小程序查看~~
        el-row.tablecs
          el-col(:span="24")
            el-row.concs
              el-col(:span="1")
                el-col.tu B
              el-col.shi(:span="20")
                span.pl30.ft40 您盒子里有特别推荐的品牌
            el-row.concs.rowcc(v-for="(item, index) in form.brandList" v-bind:key="index" v-if="index < 3")
              el-col.rowcc(v-if="index < 2")
                el-col.po
                el-col.gu.pl30(:span="6")
                  span.ft36 {{item.name}}
                el-col.fir.text-left(:span="18")
                  span.ft30 {{item.desc}}
      el-row.foot-print
        el-row.pt40.pb90.cencs
          img.w57.h57(v-bind:src="imgurl5")
          span.shi.pl30 完成试穿后，请进行评价与支付
        el-row.pl60.pr160
          el-col(:span="5")
            el-col(:span="8")
              img.w137.h137(v-bind:src="imgurl1")
            el-col(:span="2")
              span.fir 1. 
            el-col.fir(:span="13")
              span   微信打开迷你王国进入您的订单
          el-col.pt25(:span="1")
            img.w44.h44(v-bind:src="imgurl6")
          el-col(:span="6")
            el-col(:span="6")
              img.w120.h120(v-bind:src="imgurl2")
            el-col(:span="2")
              span.fir 2. 
            el-col.fir(:span="15")
              span   对商品进行评价本次消费立减10元让我们更加了解您
          el-col.pt25(:span="1")
            img.w44.h44(v-bind:src="imgurl6")
          el-col(:span="5")
            el-col(:span="6")
              img.w120.h120(v-bind:src="imgurl3")
            el-col(:span="2")
              span.fir 3. 
            el-col.fir(:span="15")
              span   选择留下的商品进行在线支付
          el-col.pt25(:span="1")
            img.w44.h44(v-bind:src="imgurl6")
          el-col(:span="5")
            el-col(:span="6")
              img.w120.h120(v-bind:src="imgurl4")
            el-col(:span="2")
              span.fir 4. 
            el-col.fir(:span="15")
              span   一键退回以及分享给好友
</template>

<script>
import html2Canvas from 'html2canvas'
export default {
  data () {
    return {
      aid: 'imgdown',
      idstr: 'pdfDom',
      htmlTitle: 'M1704031221180422',
      imgurl1: '/static/er-code.png',
      imgurl2: '/static/edit.png',
      imgurl3: '/static/phone.png',
      imgurl4: '/static/back.png',
      imgurl5: '/static/xin.png',
      imgurl6: '/static/jian.png',
      form: {
        goodsList: [],
        brandList: []
      }
    }
  },
  methods: {
    testImg () {
      var name = 'M1704031221180422'
      if (this.form && this.form.orderNo) {
        name = this.form.orderNo
      }
      // var _cans = document.getElementById('pdfDom')
      // var w = parseInt(window.getComputedStyle(_cans).width)
      // var h = parseInt(window.getComputedStyle(_cans).height)
      var canvas = document.createElement('canvas')
      canvas.width = 1084
      canvas.height = 1682
      canvas.style.width = 542 + 'px'
      canvas.style.height = 841 + 'px'
      var context = canvas.getContext('2d')
      context.scale(2, 2)
      html2Canvas(document.getElementById('pdfDom'), {
        allowTaint: false,
        taintTest: false,
        canvas: canvas
      }).then(function (canvas) {
        var a = document.createElement('a')
        a.href = canvas.toDataURL()
        a.download = name
        a.click()
      })
    },
    doPrint () {
      var bdhtml = window.document.body.innerHTML
      var prnhtml = window.document.getElementById(this.idstr).innerHTML
      window.document.body.innerHTML = prnhtml
      window.print()
      window.document.body.innerHTML = bdhtml
      window.location.reload()
    },
    getParams () {
      let routerParams = this.$route.params.dataobj
      if (routerParams) {
        this.form = routerParams
        this.htmlTitle = routerParams.orderNo ? routerParams.orderNo : 'M1704031221180422'
      }
      this.form.nowTime = new Date()
      // this.form.stylist = 'Summer'
    }
  },
  mounted () {
    this.getParams()
  },
  beforeRouteLeave (to, from, next) {
    if (to.path === '/') {
      to.meta.keepAlive = true
    }
    next()
  }
}
</script>
