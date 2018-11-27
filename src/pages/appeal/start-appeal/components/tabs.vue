<style lang="stylus" scoped>
.my-order-tabs
  position relative

  .input
    position absolute
    right 0
    width 240px
    bottom 25px

    &__icon
      line-height 40px
      padding 0 5px

  .mabide {
    display: -webkit-box;     
    display: -moz-box;        
    display: -ms-flexbox;      
    display: -webkit-flex;    
    display: flex;
    flex-flow: row nowrap;
  }
  .mabide-left {
    width: 85%;
  }
  .mabide-right {
    padding-top: 25px;
  }
</style>


<template lang="pug"> 
    
.my-order-tabs
  <div class="mabide">
  <div class="mabide-left"> 
      <el-select v-model="goods.gender" placeholder="请选择性别" style="padding: 0 10px 10px 0;">
       <el-option v-for="item in genderType" :key="item.name" :label="item.label" :value="item.name">
       </el-option>
      </el-select>
      <el-select v-model="goods.type" placeholder="请选择类别" style="padding: 0 10px 10px 0;">
       <el-option v-for="item in typeList" :key="item.name" :label="item.label" :value="item.name">
       </el-option>
      </el-select>
      <el-select v-model="size" placeholder="请选择尺码" style="padding: 0 10px 10px 0;">
       <el-option v-for="item in standList" :key="item.name" :label="item.label" :value="item.name">
       </el-option>
      </el-select>
      <el-select v-model="brand" placeholder="请选择品牌" style="padding: 0 10px 10px 0;">
       <el-option v-for="item in brandType" :key="item.name" :label="item.label" :value="item.name">
       </el-option>
      </el-select>
      <el-select v-model="realAmount" placeholder="请选择金额" style="padding: 0 10px 10px 0;">
       <el-option v-for="item in realAmountList" :key="item.name" :label="item.label" :value="item.name">
       </el-option>
      </el-select>
      <el-select v-model="style" placeholder="请选择风格" style="padding: 0 10px 10px 0;">
       <el-option v-for="item in styleType" :key="item.name" :label="item.label" :value="item.name">
       </el-option>
      </el-select>
      <el-select v-model="state" placeholder="请选择商品状态" style="padding: 0 10px 10px 0;">
       <el-option v-for="item in stateList" :key="item.name" :label="item.label" :value="item.name">
       </el-option>
      </el-select>
      <el-select v-model="status" placeholder="请选择盈利状态" style="padding: 0 10px 10px 0;">
       <el-option v-for="item in statusList" :key="item.name" :label="item.label" :value="item.name">
       </el-option>
      </el-select>
  </div>
  <div class="mabide-right">
    <el-button type="primary" icon="el-icon-search">搜索</el-button>
  </div>
  </div>
  el-tabs(v-model="activeStatus" @tab-click="handleClick") 
    el-tab-pane(
      v-for="item in tabPane"
      v-bind:key="item.name"
      v-bind:label="item.text"
      v-bind:name="item.name")
    
  //el-input.input(
    v-model="keyword"
    placeholder="款号"
    @keyup.enter.native="search(keyword)")
    i.el-icon-search.input__icon(
      slot="suffix"
      @click="search(keyword)")
  //<el-select v-model="value5" multiple placeholder="请选择">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
    </el-option>
    </el-select>
</template>

<script>
import { ORIGIN_TYPE, STYLE_TYPE, GENDER_TYPE, SEASON_TYPE, ME_TYPE, SCENE_TYPE, BRAND_TYPE, ATTR_TYPE } from '@/common/constants'
export default {
  data () {
    return {
      /**
       * 当前路由
       * @type {String}
       */
      activeStatus: this.$route.query.status,
      /**
       * 搜索关键词
       * @type {String}
       */
      goods: {},
      /**
       * 账户资金菜单
       * @type {Array}
       */
      tabPane: [
        {
          name: 0,
          text: '所有商品'
        },
        {
          name: 1,
          text: '可使用'
        },
        {
          name: 2,
          text: '运输中'
        },
        {
          name: 3,
          text: '退货中'
        },
        {
          name: 4,
          text: '售罄'
        },
        {
          name: 5,
          text: '清算'
        }
      ],
      genderType: [{
          name: '男童',
          label: '男童'
        }, {
          name: '女童',
          label: '女童'
        }, {
          name: '通用',
          label: '通用'
        }
        ],
        
        name: ''   
    }
  },
  methods: {
    /**
     * 跳转路由
     * @function [handleClick]
     * @param {Object} tab -tab
     */
    handleClick (tab) {
      this.$router.push({
        name: 'start-appeal',
        query: {
          status: tab.name
        }
      })
    },
    /**
     * 初始化tabs
     * @function [initTabs]
     */
    initTabs () {
      const status = this.$route.query.status
      if (!status) {
        this.activeStatus = 'ALL'
        this.handleClick({name: 'ALL'})
      }
    },
    /**
     * 搜索
     * @function [search]
     * @param {String} keyword -关键词
     */
    search (keyword) {
      this.$emit('search', keyword)
    }
  },
  watch: {
    '$route.query.status' () {
      this.initTabs()
    }
  },
  created () {
    this.initTabs()
  }
}
</script>
