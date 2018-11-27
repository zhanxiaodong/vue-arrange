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
      <el-select v-model="searchData.goods.gender" placeholder="请选择性别" style="padding: 0 10px 10px 0;">
       <el-option v-for="item in genderType" :key="item.name" :label="item.label" :value="item.name">
       </el-option>
      </el-select>
      <el-select v-model="searchData.goods.type" placeholder="请选择类别" style="padding: 0 10px 10px 0;">
       <el-option v-for="item in typeList" :key="item.name" :label="item.label" :value="item.name">
       </el-option>
      </el-select>
      <el-input v-model="searchData.goods.size" placeholder="请输入尺码">
      </el-input>
      <el-input v-model="searchData.goods.brand" placeholder="请输入品牌">
      </el-input>
      <el-input v-model="searchData.minMoney" type="Number" placeholder="请输入最小金额">
      </el-input>
      <el-input v-model="searchData.maxMoney" type="Number" placeholder="请输入最大金额">
      </el-input>
      <el-select v-model="searchData.goods.style" placeholder="请选择风格" style="padding: 0 10px 10px 0;">
       <el-option v-for="item in styleType" :key="item.name" :label="item.label" :value="item.name">
       </el-option>
      </el-select>
  </div>
  <div class="mabide-right">
    <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
  </div>
  </div>
  el-tabs(v-model="searchData.goodsStatus" @tab-click="handleClick") 
    el-tab-pane(
      v-for="item in tabPane"
      v-bind:key="item.name"
      v-bind:label="item.text"
      v-bind:name="item.name")
</template>

<script>
import { ORIGIN_TYPE, STYLE_TYPE, GENDER_TYPE, SEASON_TYPE, ME_TYPE, SCENE_TYPE, BRAND_TYPE, ATTR_TYPE } from '@/common/constants'
export default {
  data () {
    return {
    	searchData:{
    		goodsStatus: this.$route.query.status,
        goods: {},
        minMoney: null,
        maxMoney: null,
    	},
      tabPane: [
        {
          name: "0",
          text: '所有商品'
        },
        {
          name: "1",
          text: '可使用'
        },
        {
          name: "2",
          text: '运输中'
        },
        {
          name: "3",
          text: '退货中'
        },
        {
          name: "4",
          text: '售罄'
        },
        {
          name: "5",
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
        typeList: [
        {
          name: '上装',
          text: '上装'
        },
        {
          name: '下装',
          text: '下装'
        },
        {
          name: '裙装',
          text: '裙装'
        },
        {
          name: '一体',
          text: '一体'
        },
        {
          name: '配件',
          text: '配件'
        },
        {
          name: '玩具/益智',
          text: '玩具/益智'
        }
      ],
      styleType: STYLE_TYPE,
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
        this.goodsStatus = "0"
        this.handleClick({name: "0"})
      }
    },
    search () {
    	var searchData = this.searchData;
    	console.log(searchData)
      this.$emit('search', searchData)
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
