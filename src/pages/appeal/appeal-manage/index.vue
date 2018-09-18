<template lang="pug">
.appeal-manage
  el-row
    el-col(:span="24")
      h3
        span 商品录入
  el-form.mt20(
    label-position="left"
    ref="form"
    v-bind:model="form"
    v-bind:rules="formRules"
    label-width="100px")
    el-form-item(label="创建类型" required)
      el-radio-group(v-model="form.origin")
        el-radio(v-for="item in originType" v-bind:key="item.name" v-bind:label="item.name") {{ item.text }}
    el-form-item(label="风格标签" required)
      el-select(v-model="form.style")
        el-option(v-for="item in styleType" v-bind:key="item.name" v-bind:label="item.text" v-bind:value="item.name")
    el-row
      h3.mt20.bc-grey5.p10.ml-30.pl30.mb30 商品信息
    el-form-item(label="商品性别" required)
      el-select(v-model="form.gender")
        el-option(v-for="item in genderType" v-bind:key="item.name" v-bind:label="item.text" v-bind:value="item.name")
    el-form-item(label="商品品类" required)
      el-select(v-model="form.type" @change="changeType")
        el-option(v-for="item in typeList" v-bind:key="item.name" v-bind:label="item.text" v-bind:value="item.name")
      el-select.pl20(v-model="form.childType")
        el-option(v-for="item in childTypeList" v-bind:key="item.name" v-bind:label="item.text" v-bind:value="item.name")
    el-form-item(label="材质" required)
      el-select(v-model="form.material")
        el-option(v-for="item in meType" v-bind:key="item.name" v-bind:label="item.text" v-bind:value="item.name")
    el-form-item(label="场景" required)
      el-select(v-model="form.scene")
        el-option(v-for="item in sceneType" v-bind:key="item.name" v-bind:label="item.text" v-bind:value="item.name")
    el-form-item(label="季节" required)
      el-select(v-model="form.season")
        el-option(v-for="item in seasonType" v-bind:key="item.name" v-bind:label="item.text" v-bind:value="item.name")
    el-form-item(label="属性" required)
      el-select.w400(v-model="form.attr" multiple)
        el-option(v-for="item in attrType" v-bind:key="item.name" v-bind:label="item.text" v-bind:value="item.name")
    el-form-item(label="款号" prop="code" required)
      el-input.w194(v-model="form.code")
    el-form-item(label="规格" required)
      el-col(:span="16")
        el-table.wfull(:data="form.standList" v-model="form.standList")
          el-table-column(type="index" :index="indexMethod")
          el-table-column(prop="name" label="商品名称")
          el-table-column(prop="size" label="尺码")
          el-table-column(prop="color" label="颜色")
          el-table-column(prop="num" label="库存")
          el-table-column(label="操作")
            template(slot-scope="scope")
              el-button(type="primary" icon="el-icon-edit" size="mini" circle @click="handleEdit(scope.$index, scope.row)")
              el-button(type="danger" icon="el-icon-delete" size="mini" circle @click="handleDelete(scope.$index, scope.row)")
      el-col.pt15(:span="3")
        el-button(type="warning" icon="el-icon-plus" size="mini" circle @click="handleAdd()")
    el-form-item(label="品牌" required)
      el-select(v-model="form.brand" allow-create filterable)
        el-option(v-for="item in brandType" v-bind:key="item.name" v-bind:label="item.text" v-bind:value="item.name")
    el-form-item(label="吊牌价" prop="initAmount")
      el-input.w194(type="number" v-model="form.initAmount" @change="disChange")
        template(slot="append") 元
      el-tooltip(content="吊牌价" placement="top")
        a.el-icon-information.color-grey2.p-as.ml10
    el-form-item(label="采购价" prop="interAmount")
      el-input.w194(type="number" v-model="form.interAmount")
        template(slot="append") 元
      el-tooltip(content="采购价" placement="top")
        a.el-icon-information.color-grey2.p-as.ml10
    el-form-item(label="零售折扣" prop="discount")
      el-input.w194(type="number" v-model="form.discount" @change="disChange")
        template(slot="append") 折
      el-tooltip(content="零售折扣" placement="top")
        a.el-icon-information.color-grey2.p-as.ml10
    el-form-item(label="实付价格" prop="realAmount")
      el-input.w194(type="number" v-model="form.realAmount" disabled)
        template(slot="append") 元
    el-form-item(label="图片备份")
      el-upload(:http-request="Upload" ref="upload" :multiple="true" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" action="")
        i.el-icon-plus
      el-dialog(:visible.sync="dialogVisible")
        img(width="100%" :src="dialogImageUrl" alt="")
    el-col(:span="24")
      h3.mt20.bc-grey5.p10.ml-30.pl30 发布商品
    el-row.lh50
      el-col
        span SKU:
        span    {{form.standList.length}}
      el-col
        span 库存:
        span    {{totalNum}}
    el-row.rowcs
      el-col(:span="2")
        el-button.w100(type="danger" @click="saveT('form')")   保  存 
      el-col(:span="21")
        el-form-item
          el-button(type="danger" @click="submit('form')") 发布商品
    el-dialog.model(title="规格信息" v-bind:visible.sync="stand.dialogVisible" width="40%")
      el-row.mt20
        el-col(:span="24")
          el-form(
            ref="stand"
            v-bind:model="stand"
            v-bind:rules="standRules"
            label-width="70px"
            label-position="left")
            el-form-item(label="名称" prop="name")
              el-input(v-model="stand.name")
            el-form-item(label="尺码" prop="size")
              el-input(v-model="stand.size" type="number")
            el-form-item(label="颜色" prop="color")
              el-input(v-model="stand.color")
            el-form-item(label="库存" prop="num")
              el-input(v-model="stand.num" type="number")
      footer(slot="footer")
        el-button(@click="stand.dialogVisible = false") 取 消
        el-button(type="success" @click="save('stand')") 确 定
</template>

<script>
import { client } from '@/utils/alioss'
import { ORIGIN_TYPE, STYLE_TYPE, GENDER_TYPE, SEASON_TYPE, ME_TYPE, SCENE_TYPE, BRAND_TYPE, ATTR_TYPE } from '@/common/constants'
export default {
  data () {
    return {
      address: {},
      dialogVisible: false,
      dialogImageUrl: null,
      edit: false,
      stand: {
        size: null,
        color: '',
        num: null,
        dialogVisible: false
      },
      form: {
        origin: '采购',
        style: '卡通',
        gender: '男童',
        season: '春季',
        scene: '节日',
        standList: [],
        material: '棉型织物',
        discount: null,
        brand: '巴布豆',
        type: '上装',
        childType: 'T恤',
        imgUrl: [],
        realAmount: 0.00
      },
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
      attrType: ATTR_TYPE,
      styleType: STYLE_TYPE,
      originType: ORIGIN_TYPE,
      genderType: GENDER_TYPE,
      seasonType: SEASON_TYPE,
      meType: ME_TYPE,
      sceneType: SCENE_TYPE,
      brandType: BRAND_TYPE,
      /**
       * 表单验证
       * @type {Object}
       */
      formRules: {
        type: [
          { required: true, message: '请选择产品类型', trigger: 'blur' }
        ],
        discount: [
          { required: true, message: '请输入零售折扣', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入款号', trigger: 'blur' }
        ],
        initAmount: [
          { required: true, message: '请输入吊牌价', trigger: 'blur' }
        ],
        interAmount: [
          { required: true, message: '请输入采购价', trigger: 'blur' }
        ],
        standList: [
          { required: true, message: '请输入规格' }
        ]
      },
      standRules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        size: [
          { required: true, message: '请输入尺码', trigger: 'blur' }
        ],
        color: [
          { required: true, message: '请输入颜色', trigger: 'blur' }
        ],
        num: [
          { required: true, message: '请输入库存', trigger: 'blur' }
        ]
      },
      totalNum: 0
    }
  },
  methods: {
    showA () {
      console.log(this.address)
    },
    /**
     * 图片移除
     * @function [Upload]
     * @param {Object} file - 图片内容
     */
    handleRemove (file, fileList) {
      var item = 'http://minianys.oss-cn-shanghai.aliyuncs.com/' + file.uid + '.' + file.name.split('.')[1]
      var index = this.form.imgUrl.indexOf(item)
      if (index > -1) {
        this.form.imgUrl.splice(index, 1)
      }
    },
    /**
     * 选择地址
     * @function [selectAddress]
     * @param {Object} address -地址信息
     */
    selectAddress (address) {
      console.log('address--' + address)
    },
    /**
     * 图片预览
     * @function [Upload]
     * @param {Object} file - 图片内容
     */
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    disChange (value) {
      if (this.form.initAmount) {
        this.form.realAmount = this.form.initAmount * this.form.discount / 10
      }
    },
    /**
     * 图片上传
     * @function [Upload]
     * @param {Object} file - 图片内容
     */
    Upload (file) {
      var fileName = file.file.uid + '.' + file.file.name.split('.')[1]
      client().put(fileName, file.file).then(
        result => {
          this.form.imgUrl.push(result.url)
        }).catch(err => {
          console.log(err)
        })
    },
    /**
     * 表格新增
     * @function [handleAdd]
     */
    handleAdd () {
      this.stand.dialogVisible = true
      this.stand.name = null
      this.stand.size = null
      this.stand.color = null
      this.stand.num = null
    },
    /**
     * 表格编辑
     * @function [handleEdit]
     * @param {int} index - 表格序号
     * @param {Object} row - 表格行内容
     */
    handleEdit (index, row) {
      this.stand.dialogVisible = true
      this.stand.name = row.name
      this.stand.size = row.size
      this.stand.color = row.color
      this.stand.num = row.num
      this.activeIndex = index
    },
    /**
     * 表格删除
     * @function [handleDelete]
     * @param {int} index - 表格序号
     * @param {Object} row - 表格行内容
     */
    handleDelete (index, row) {
      var tempList = this.form.standList
      tempList.splice(index, 1)
      this.form.standList = tempList
    },
    /**
     * 表格序号
     * @function [changeType]
     * @param {int} index - 表格序号
     */
    indexMethod (index) {
      return index + 1
    },
    /**
     * 商品品类二级联动
     * @function [changeType]
     */
    changeType () {
      var prov = this.form.type
      let tempCity = []
      var tempCh
      let allCity = [
        {
          prov: '上装',
          label: 'T恤'
        },
        {
          prov: '上装',
          label: '外套/夹克/大衣'
        },
        {
          prov: '上装',
          label: '羽绒'
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
          label: '防晒衣'
        },
        {
          prov: '上装',
          label: '毛衣/针织衫'
        },
        {
          prov: '下装',
          label: '长裤'
        },
        {
          prov: '下装',
          label: '短裤'
        },
        {
          prov: '下装',
          label: '裙子'
        },
        {
          prov: '下装',
          label: '连衣裙'
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
          tempCity.push({ name: val.label, text: val.label })
        }
      }
      this.childTypeList = tempCity
      this.form.childType = tempCh
    },
    /**
     * 跳转路由
     * @function [handleClick]
     * @param {Object} tab -标签页信息
     */
    handleClick (tab) {
      this.$router.push({
        name: tab.name
      })
    },
    saveT (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.form.standList.length > 0) {
            this.form.status = 'TEMP'
            this.$axios.post(this.$apis.goods.saveGoodsWeb, this.form).then((res) => {
              if (res.code === '1') {
                this.$message.success('保存成功')
                this.$refs[formName].resetFields()
                this.$refs['upload'].clearFiles()
                this.form.standList = []
              } else {
                this.$message.error(res.message)
              }
            }).catch((errRes) => {
              this.$message.error(errRes.message)
            })
          } else {
            this.$message.error('请输入规格')
          }
        } else {
          console.log('false')
          return false
        }
      })
    },
    submit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.form.standList.length > 0) {
            this.form.status = 'RELEASE'
            this.$axios.post(this.$apis.goods.saveGoodsWeb, this.form).then((res) => {
              if (res.code === '1') {
                this.$message.success('发布成功')
                this.$refs[formName].resetFields()
                this.form.standList = []
              } else {
                this.$message.error(res.message)
              }
            }).catch((errRes) => {
              this.$message.error(errRes.message)
            })
          } else {
            this.$message.error('请输入规格')
          }
        } else {
          console.log('false')
          return false
        }
      })
    },
    save (formName) {
      var activeIndex = this.activeIndex
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var temp = {
            name: this.stand.name,
            size: this.stand.size,
            color: this.stand.color,
            num: this.stand.num
          }
          if ((activeIndex && activeIndex >= 0) || activeIndex === 0) {
            this.form.standList.splice(activeIndex, 1, temp)
            this.activeIndex = null
          } else {
            this.form.standList.push(temp)
          }
          this.stand.dialogVisible = false
          this.updateNum()
        } else {
          return false
        }
      })
    },
    updateNum () {
      var temp = this.form.standList
      var totalNum = 0
      for (var i = 0; i < temp.length; i++) {
        totalNum = totalNum + parseInt(temp[i].num)
      }
      this.totalNum = totalNum
    },
    findStandByCode (code) {
      this.$axios.get(this.$apis.goods.findStandByCode, {
        params: {
          code: code
        }
      }).then((res) => {
        if (res.code === '1') {
          this.form.standList = res.data
        } else {
          this.$message.error(res.message)
        }
      }).catch((errRes) => {
        this.$message.error(errRes.message)
      })
    }
  },
  mounted () {
    let obj = this.$route.params.dataobj
    if (obj) {
      console.log(obj)
      this.edit = true
      this.form = obj
      this.form.discount = obj.discount * 10
      // this.form.standList = []
      this.$axios.get(this.$apis.goods.findStandByCode, {
        params: {
          code: obj.code
        }
      }).then((res) => {
        if (res.code === '1') {
          this.form.standList = res.data
          this.updateNum()
        } else {
          this.$message.error(res.message)
        }
      }).catch((errRes) => {
        this.$message.error(errRes.message)
      })
    }
  }
}
</script>
