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
  .el-input {
    width: 170px;
    margin: 0 10px 10px 0;
  }
  .el-select {
    width: 170px;
    margin: 0 10px 10px 0;
  }
</style>
<template lang="pug"> 
.my-order-tabs
  <div class="mabide">
  <div class="mabide-left"> 
      <el-select v-model="searchData.goods.gender" placeholder="请选择性别" clearable>
       <el-option v-for="item in genderType" :key="item.name" :label="item.label" :value="item.name">
       </el-option>
      </el-select>
      <el-select v-model="searchData.goods.type" placeholder="请选择类别" @change="changeType" clearable>
       <el-option v-for="item in typeList" :key="item.name" :label="item.label" :value="item.name">
       </el-option>
      </el-select>
      <el-select v-model="searchData.goods.childType" placeholder="请选择类别" clearable>
       <el-option v-for="item in childTypeList" :key="item.name" :label="item.label" :value="item.name">
       </el-option>
      </el-select>
      <el-input v-model="searchData.goods.size" placeholder="请输入尺码">
      </el-input>
      <el-input v-model="searchData.goods.brand" placeholder="请输入品牌">
      </el-input>
      <el-input v-model="searchData.goods.code" placeholder="请输入货号">
      </el-input>
      <el-input v-model="searchData.minMoney" type="Number" placeholder="请输入最小金额">
      </el-input>
      <el-input v-model="searchData.maxMoney" type="Number" placeholder="请输入最大金额">
      </el-input>
      <el-select v-model="searchData.goods.style" placeholder="请选择风格" clearable>
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
      v-for="item in goodsReport"
      v-bind:key="item.name"
      v-bind:label="item.text"
      v-bind:name="item.name")
</template>

<script>
import { ORIGIN_TYPE, STYLE_TYPE, GENDER_TYPE, SEASON_TYPE, ME_TYPE, SCENE_TYPE, BRAND_TYPE, ATTR_TYPE } from '@/common/constants'
export default {
	props: {
    goodsReport: {},
    required: true
 },
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
          text: '销售'
        },
        {
          name: "5",
          text: '清算'
        },
        {
          name: "6",
          text: '售完'
        },
        {
          name: "7",
          text: '退回'
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
      childTypeList: [
        {
          name: 'T恤',
          text: 'T恤'
        },
        {
          name: '外套/夹克/大衣',
          text: '外套/夹克/大衣'
        },
        {
          name: '羽绒',
          text: '羽绒'
        },
        {
          name: '衬衫',
          text: '衬衫'
        },
        {
          name: '卫衣/绒衫',
          text: '卫衣/绒衫'
        },
        {
          name: '棉服',
          text: '棉服'
        },
        {
          name: '防晒衣',
          text: '防晒衣'
        },
        {
          name: '毛衣/针织衫',
          text: '毛衣/针织衫'
        }
      ],
      styleType: STYLE_TYPE,
    }
  },
  methods: {
  	/**
     * 商品品类二级联动
     * @function [changeType]
     */
    changeType () {
      var prov = this.searchData.goods.type
      let tempCity = []
      var tempCh
      let allCity = [
        {
          prov: '上装',
          label: 'T恤/衬衫/背心'
        },
        {
          prov: '上装',
          label: '外套/夹克/大衣'
        },
        {
          prov: '上装',
          label: '羽绒服'
        },
        {
          prov: '上装',
          label: '衬衫'
        },
        {
          prov: '上装',
          label: '卫衣/绒衫'
        },
        {
          prov: '上装',
          label: '棉服'
        },
        {
          prov: '上装',
          label: '防晒衣/风衣'
        },
        {
          prov: '上装',
          label: '毛衣/针织开衫'
        },
        {
          prov: '下装',
          label: '休闲裤'
        },
        {
          prov: '下装',
          label: '牛仔裤'
        },
        {
          prov: '下装',
          label: '阔腿裤'
        },
        {
          prov: '下装',
          label: '背带裤'
        },
        {
          prov: '下装',
          label: '连衣袜'
        },
        {
          prov: '一体',
          label: '套装'
        },
        {
          prov: '一体',
          label: '背带'
        },
        {
          prov: '一体',
          label: '家居服'
        },
        {
          prov: '一体',
          label: '泳装'
        },
        {
          prov: '一体',
          label: '连体衣/爬装'
        },
        {
          prov: '裙装',
          label: '连衣裙'
        },
        {
          prov: '裙装',
          label: '背心裙'
        },
        {
          prov: '裙装',
          label: '短裙'
        },
        {
          prov: '裙装',
          label: '半身裙'
        },
        {
          prov: '配件',
          label: '头饰'
        },
        {
          prov: '配件',
          label: '领结'
        },
        {
          prov: '配件',
          label: '包包'
        },
        {
          prov: '配件',
          label: '项链'
        },
        {
          prov: '配件',
          label: '手链'
        },
        {
          prov: '配件',
          label: '太阳镜'
        },
        {
          prov: '配件',
          label: '领带'
        },
        {
          prov: '配件',
          label: '鞋子'
        },
        {
          prov: '配件',
          label: '帽子'
        },
        {
          prov: '配件',
          label: '袜子'
        },
        {
          prov: '配件',
          label: '围巾'
        },
        {
          prov: '配件',
          label: '手套'
        },
        {
          prov: '配件',
          label: '内衣裤'
        },
        {
          prov: '玩具/益智',
          label: '学习/实验/文具'
        },
        {
          prov: '玩具/益智',
          label: '玩偶/毛绒/机器人'
        },
        {
          prov: '玩具/益智',
          label: '早教玩具'
        },
        {
          prov: '玩具/益智',
          label: '仿真玩具/过家家'
        },
        {
          prov: '玩具/益智',
          label: '音乐玩具'
        },
        {
          prov: '玩具/益智',
          label: '拼图/拆装/积木'
        },
        {
          prov: '玩具/益智',
          label: '手工/剪纸'
        },
        {
          prov: '玩具/益智',
          label: '彩泥/粘土'
        },
        {
          prov: '玩具/益智',
          label: '创意玩具/网红玩具'
        }
      ]
      for (var val of allCity) {
        if (prov === val.prov) {
          if (!tempCh) {
            tempCh = val.label
          }
          if (prov === '下装' && this.form.gender === '男童' && (val.label === '裙子' || val.label === '连衣裙')) {
            continue
          }
          tempCity.push({ name: val.label, text: val.label })
        }
      }
      this.childTypeList = tempCity
      this.form.childType = tempCh
    },
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
      this.$emit('search', searchData)
    },
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
