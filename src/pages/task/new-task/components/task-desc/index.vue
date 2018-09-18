<template lang="pug">
.task-desc
  el-form.mt20(
    label-position="left"
    ref="form"
    v-bind:model="form"
    v-bind:rules="formRules"
    label-width="100px")
    el-form-item(label="商品属性" required)
      el-form-item.pull-left.w194.mr30(prop="type")
        el-select(v-model="form.type" placeholder="类别")
          el-option(v-for="item in type" v-bind:key="item.name" v-bind:label="item.text" v-bind:value="item.name")
      el-form-item.pull-left.w194(prop="size_0")
        el-select(v-model="form.size[0]" placeholder="尺码")
          el-option(v-for="item in size" v-bind:key="item.num" v-bind:label="item.num" v-bind:value="item.num")
      span.ml10.mr10.pull-left ~
      el-form-item.pull-left.w194(prop="size_1")
        el-select(v-model="form.size[1]" placeholder="尺码")
          el-option(
            v-for="item in size"
            v-bind:key="item.num"
            v-bind:label="item.num"
            v-bind:value="item.num"
            v-bind:disabled="item.num <= form.size[0]")
    el-form-item(label="商品链接" prop="url")
      el-input.w408.mr20(v-model="form.url")
      el-button(type="success" @click="grab") 点击读取
    el-form-item(label="商品标题" prop="title")
      el-input.w408(v-model="form.title")
    el-form-item(label="商品主图" required)
      upload-avatar(@url="showUrl")
    el-form-item(label="购买引导" required)
      el-row
        el-col(v-bind:span="24")
          el-form-item.pull-left.w194.mr10
            el-select(v-model="form.bayGuide.orderType" placeholder="下单方式" @change="changeBayGuide")
              el-option(v-for="item in orderType" v-bind:key="item.name" v-bind:label="item.text" v-bind:value="item.name")
      el-row.mt20(v-if="form.bayGuide.orderType === 'keyword'")
        el-col(v-bind:span="24")
          el-form-item.pull-left
            el-tag.mr10.h-lh28(
              v-for="item in form.bayGuide.keyword"
              v-bind:key="item"
              v-bind:closable="true"
              v-bind:close-transition="false"
              @close="delKeyword(item)"
              type="primary") {{item}}
            el-input.keyword-input(
              v-if="form.bayGuide.keywordInputVisible"
              v-model="form.bayGuide.keywordInputValue"
              size="mini"
              ref="saveKeywordInput"
              @keyup.enter.native="saveKeyword"
            )
            el-button(v-else size="small" @click="showKeywordInput") 添加关键词
      el-row.mt20(v-if="form.bayGuide.orderType !== 'other'")
        el-col(v-bind:span="24")
          el-form-item.pull-left.w194.mr10
            el-select(v-model="form.bayGuide.onPage" placeholder="产品位置")
              el-option(v-for="item in onPage" v-bind:key="item.name" v-bind:label="item.text" v-bind:value="item.name")
          el-form-item.pull-left.w194.mr10
            el-select(v-model="form.bayGuide.shopSeveral" placeholder="货比几家")
              el-option(v-for="item in shopSeveral" v-bind:key="item.num" v-bind:label="item.num" v-bind:value="item.num")
          el-form-item.pull-left.w194
            el-select(v-model="form.bayGuide.browsingTime" placeholder="浏览时长")
              el-option(v-for="item in browsingTime" v-bind:key="item.name" v-bind:label="item.text" v-bind:value="item.name")
      el-row.mt20(v-if="form.bayGuide.orderType !== 'other'")
        el-col(v-bind:span="24")
          el-checkbox(v-model="form.bayGuide.focusOnShops") 关注店铺
          el-checkbox(v-model="form.bayGuide.favoriteProduct") 收藏宝贝
          el-checkbox(v-model="form.bayGuide.tomorrowBuy") 隔天购买
          el-checkbox(v-model="form.bayGuide.phoneBuy") 手机下单
      el-row.mt20(v-if="form.bayGuide.orderType === 'other'")
        el-input.w408(type="textarea" v-model="form.bayGuide.otherOrderType" placeholder="手动输入购买路径")
    el-form-item(label="试用要求" required)
      el-row
        el-col(v-bind:span="24")
          el-form-item.pull-left.w194.mr10
            el-select(v-model="form.tryRequest.reportType" placeholder="报告方式" @change="changeTryRequest")
              el-option(v-for="item in reportType" v-bind:key="item.name" v-bind:label="item.text" v-bind:value="item.name")
      el-row.mt20(v-if="form.tryRequest.reportType !== 'other'")
        el-col(v-bind:span="24")
          el-form-item.pull-left.w194.mr10
            el-select(v-model="form.tryRequest.videoNum" placeholder="视频个数")
              el-option(v-for="item in imgNum" v-bind:key="item.num" v-if="item.num <= 5" v-bind:label="item.num" v-bind:value="item.num")
      el-row.mt20(v-if="form.tryRequest.reportType !== 'other'")
        el-col(v-bind:span="24")
          el-form-item.pull-left.w194.mr10
            el-select(v-model="form.tryRequest.imgNum" placeholder="图片张数")
              el-option(v-for="item in imgNum" v-bind:key="item.num" v-bind:label="item.num" v-bind:value="item.num")
          el-form-item.pull-left.w194.mr10
            el-select(v-model="form.tryRequest.shootingScenes" placeholder="拍摄场景")
              el-option(v-for="item in shootingScenes" v-bind:key="item.name" v-bind:label="item.text" v-bind:value="item.name")
          el-form-item.pull-left.w194.mr10
            el-select(v-model="form.tryRequest.wordCount" placeholder="五星好评字数")
              el-option(v-for="item in wordCount" v-bind:key="item.name" v-bind:label="item.text" v-bind:value="item.name")
          el-form-item.pull-left.w194.mr10
            el-select(v-model="form.tryRequest.appendCommentsTime" placeholder="追评时间")
              el-option(v-for="item in appendCommentsTime" v-bind:key="item.name" v-bind:label="item.text" v-bind:value="item.name")
      el-row.mt20(v-if="form.tryRequest.reportType !== 'other'")
        el-col(v-bind:span="24")
          el-form-item.pull-left.w194.mr10
            el-select(v-model="form.tryRequest.questionAndAnswerType" clearable placeholder="问答评价")
              el-option(v-for="item in questionAndAnswer" v-bind:key="item.name" v-bind:label="item.text" v-bind:value="item.name")
      
      el-row.mt20(v-if="form.tryRequest.reportType && form.tryRequest.reportType !== 'other'")
        el-col(v-bind:span="24")
          el-row
            el-col(v-bind:span="24")
              el-checkbox(v-model="form.tryRequest.assignComments") 指定评论文案
          el-row(v-if="form.tryRequest.assignComments")
            el-col(v-bind:span="24")
              el-input.pull-left.w408(type="textarea" v-model="form.tryRequest.assignCommentsText" placeholder="手动输入评论文案")

      el-row.mt20(v-if="form.tryRequest.questionAndAnswerType && form.tryRequest.reportType !== 'other'")
        el-col(v-bind:span="24")
          el-row
            el-col(v-bind:span="24")
              el-checkbox.pull-left(v-model="form.tryRequest.questionAndAnswer") 指定问答文案
          el-row.mt20(v-if="form.tryRequest.questionAndAnswer")
            el-col(v-bind:span="24")
              el-input.pull-left.w408(type="textarea" v-model="form.tryRequest.questionAndAnswerText" placeholder="手动输入问答文案")

      el-row.mt20(v-if="form.tryRequest.reportType === 'commentsAndShare'")
        el-col(v-bind:span="24")
          el-checkbox(v-model="form.tryRequest.sendWeCaht") 朋友圈直发
          el-checkbox(v-model="form.tryRequest.sendWeibo") 微博直发
      
      el-row.mt20(v-if="form.tryRequest.reportType === 'other'")
        el-input.w408(type="textarea" v-model="form.tryRequest.otherReportType" placeholder="手动输入试用要求")
    el-form-item(label="商品价格" prop="price")
      el-input.w194.mr20(type="number" v-model="form.price")
        template(slot="append") 元
    el-form-item(label="奖励金" prop="bonus")
      el-input.w194(type="number" v-model="form.bonus")
        template(slot="append") 元
      span.ml10(v-if="form.bonus") {{form.bonus}} 积分
      el-tooltip(content="奖励金" placement="top")
        a.el-icon-information.color-grey2.p-as.ml10
    el-form-item(label="保证金" prop="bail")
      el-input.w194(type="number" v-model="form.bail")
        template(slot="append") 元
      el-tooltip(content="保证金" placement="top")
        a.el-icon-information.color-grey2.p-as.ml10
    el-form-item(label="直购折扣" prop="discount")
      el-input.w194(type="number" v-model="form.discount")
        template(slot="append") 折
      el-tooltip(content="直购折扣" placement="top")
        a.el-icon-information.color-grey2.p-as.ml10
    el-form-item(label="试用份数" prop="tryNum")
      el-input.w194(type="number" v-model="form.tryNum")
        template(slot="append") 份
      el-tooltip(content="试用份数" placement="top")
        a.el-icon-information.color-grey2.p-as.ml10
    el-form-item(label="有效期" prop="validPeriod")
      el-input.w194(type="number" v-model="form.validPeriod")
        template(slot="append") 天
      el-tooltip(content="有效期" placement="top")
        a.el-icon-information.color-grey2.p-as.ml10
    el-form-item(label="是否包邮" required)
      el-radio-group(v-model="form.freePostage")
        el-radio(v-bind:label="true") 包邮
        el-radio(v-bind:label="false") 不包邮
      el-tooltip(content="是否包邮" placement="top")
        a.el-icon-information.color-grey2.p-as.ml10
</template>

<script>
import {
  COMMODITY_TYPE,
  COMMODITY_SIZE,
  ORDER_TYPE,
  ON_PAGE,
  SEQUENCE,
  BROWSING_TIME,
  REPORT_TYPE,
  SHOOTING_SCENES,
  WORD_COUNT,
  APPEND_COMMENTS_TIME,
  QUESTION_AND_ANSWER
} from '@/common/constants'

export default {
  data () {
    return {
      /**
       * 任务描述表单
       * @type {Object}
       */
      form: {
        // 商品类型
        type: null,
        // 商品尺寸
        size: [null, null],
        // 商品链接
        url: null,
        // 商品标题
        title: null,
        // 商品图片
        img: null,
        // 购买引导
        bayGuide: {
          // 下单方式
          orderType: null,
          // 其他下单方式
          otherOrderType: null,
          // 下单关键词
          keyword: [],
          // 下单关键词输入框可见性
          keywordInputVisible: false,
          // 下单关键词输入框值
          keywordInputValue: null,
          // 产品位置
          onPage: null,
          // 货比几家
          shopSeveral: null,
          // 浏览时长
          browsingTime: null,
          // 关注店铺
          focusOnShops: false,
          // 收藏宝贝
          favoriteProduct: false,
          // 隔天购买
          tomorrowBuy: false,
          // 手机下单
          phoneBuy: false
        },
        /**
         * 试用要求
         * @type {Object}
         */
        tryRequest: {
          // 报告方式
          reportType: null,
          // 其他试用要求
          otherReportType: null,
          // 视频个数
          videoNum: null,
          // 图片个数
          imgNum: null,
          // 拍摄场景
          shootingScenes: null,
          // 五星好评字数
          wordCount: null,
          // 追评时间
          appendCommentsTime: null,
          // 指定评论
          assignComments: false,
          // 评论文案文案
          assignCommentsText: null,
          // 朋友圈直发
          sendWeCaht: false,
          // 微博直发
          sendWeibo: false,
          // 问答评价类型
          questionAndAnswerType: null,
          // 问答评价
          questionAndAnswer: null,
          // 问答评价文案
          questionAndAnswerText: null
        },
        // 商品价格
        price: null,
        // 奖励金
        bonus: null,
        // 保证金
        bail: null,
        // 直购折扣
        discount: null,
        // 试用份数
        tryNum: null,
        // 有效期
        validPeriod: null,
        // 是否包邮
        freePostage: true
      },
      /**
       * 表单验证
       * @type {Object}
       */
      formRules: {
        type: [
          { required: true, message: '请选择产品类型', trigger: 'blur' }
        ],
        size_0: [
          { required: true, message: '请选择产品尺寸', trigger: 'blur' }
        ],
        size_1: [
          { required: true, message: '请选择产品尺寸', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请输入商品链接', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请输入商品标题', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        bonus: [
          { required: true, message: '请输入奖励金', trigger: 'blur' }
        ],
        bail: [
          { required: true, message: '请输入保证金', trigger: 'blur' }
        ],
        discount: [
          { required: true, message: '请输入直购折扣', trigger: 'blur' }
        ],
        tryNum: [
          { required: true, message: '请输入试用份数', trigger: 'blur' }
        ],
        validPeriod: [
          { required: true, message: '请输入有效期', trigger: 'blur' }
        ]
      },
      type: COMMODITY_TYPE,
      size: COMMODITY_SIZE(),
      orderType: ORDER_TYPE,
      onPage: ON_PAGE,
      shopSeveral: SEQUENCE(),
      browsingTime: BROWSING_TIME(),
      /**
       * 报告方式
       * @type {Array}
       */
      // 试用要求
      reportType: REPORT_TYPE,
      // 图片个数
      imgNum: SEQUENCE(),
      // 拍摄场景
      shootingScenes: SHOOTING_SCENES,
      // 五星好评字数
      wordCount: WORD_COUNT(),
      // 追评时间
      appendCommentsTime: APPEND_COMMENTS_TIME,
      // 问答评价
      questionAndAnswer: QUESTION_AND_ANSWER
    }
  },
  methods: {
    /**
     * 改变form
     * @function [handleChangeForm]
     */
    handleChangeForm () {
      this.$emit('change', this.form)
    },
    /**
     * 删除关键词
     * @function [delKeyword]
     * @param {String} item -item
     */
    delKeyword (item) {
      this.form.bayGuide.keyword.splice(this.form.bayGuide.keyword.indexOf(item), 1)
    },
    /**
     * 保存关键词
     * @function [saveKeyword]
     */
    saveKeyword () {
      const keyword = this.form.bayGuide.keywordInputValue
      const keywordArr = this.form.bayGuide.keyword
      if (keyword && keywordArr.indexOf(keyword) < 0) {
        this.form.bayGuide.keyword.push(keyword)
      }
      this.form.bayGuide.keywordInputVisible = false
      this.form.bayGuide.keywordInputValue = null
    },
    /**
     * 显示关键词输入框
     * @function [showKeywordInput]
     */
    showKeywordInput () {
      this.form.bayGuide.keywordInputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveKeywordInput.$refs.input.focus()
      })
    },
    /**
     * 改变下单方式
     * @function [changeBayGuide]
     */
    changeBayGuide () {
      this.form.bayGuide.otherOrderType = null
      this.form.bayGuide.keyword = []
      this.form.bayGuide.keywordInputVisible = false
      this.form.bayGuide.keywordInputValue = null
      this.form.bayGuide.onPage = null
      this.form.bayGuide.shopSeveral = null
      this.form.bayGuide.browsingTime = null
      this.form.bayGuide.focusOnShops = false
      this.form.bayGuide.favoriteProduct = false
      this.form.bayGuide.tomorrowBuy = false
      this.form.bayGuide.phoneBuy = false
    },
    /**
     * 改变试用要求
     * @function [changeTryRequest]
     */
    changeTryRequest () {
      this.form.tryRequest.otherReportType = null
      this.form.tryRequest.videoNum = null
      this.form.tryRequest.imgNum = null
      this.form.tryRequest.shootingScenes = null
      this.form.tryRequest.wordCount = null
      this.form.tryRequest.appendCommentsTime = null
      this.form.tryRequest.assignComments = false
      this.form.tryRequest.assignCommentsText = null
      this.form.tryRequest.sendWeCaht = false
      this.form.tryRequest.sendWeibo = false
      this.form.tryRequest.questionAndAnswerType = null
      this.form.tryRequest.questionAndAnswer = null
      this.form.tryRequest.questionAndAnswerText = null
    },
    /**
     * 显示图片
     * @function [showUrl]
     * @param {String} url -图片链接
     */
    showUrl (url) {
      this.form.img = url
    },
    grab () {
      if (this.form.url) {
        this.$axios.get(this.$apis.search.grab, {
          params: {
            url: this.form.url
          }
        }).then((res) => {
          if (res.code === '1') {
            this.form.title = res.data.name
            this.showUrl(res.data.img)
          } else {
            this.$message.error(res.message)
          }
        }).catch((errRes) => {
          this.$message.error(errRes.message)
        })
      } else {
        this.$message.error('请输入商品链接')
      }
    }
  },
  watch: {
    form: {
      deep: true,
      /**
       * 监听对象变化
       */
      handler () {
        this.handleChangeForm()
      }
    }
  }
}
</script>
