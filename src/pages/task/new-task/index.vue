<template lang="pug">
.new-task
  el-row
    el-col(:span="24")
      h3
        span 新建盒子
  el-form.mt20(
    label-position="left"
    ref="form"
    v-bind:model="form"
    v-bind:rules="formRules"
    label-width="100px")
    el-form-item(label="创建类型" required)
      el-radio-group(v-model="form.createType")
        el-radio(v-for="item in createTypeList" v-bind:key="item.name" v-bind:label="item.name") {{ item.text }}
    el-form-item(label="指向用户" required)
      el-autocomplete(v-model="form.baby" :disabled="editIn" :fetch-suggestions="querySearch" placeholder="请输入内容" :trigger-on-focus="true" @select="handleSelect")
    el-row
      h3.mt20.bc-grey5.p10.ml-30.pl30.mb30 盒子信息
    el-form-item(label="盒子规格" required)
      el-select(v-model="form.stand")
        el-option(v-for="item in standType" v-bind:key="item.name" v-bind:label="item.text" v-bind:value="item.name")
    el-form-item(label="商品性别" required)
      el-select(v-model="form.gender" :disabled="editIn")
        el-option(v-for="item in genderType" v-bind:key="item.name" v-bind:label="item.text" v-bind:value="item.name")
    el-form-item(label="搭配建议" required)
      el-input.w400(v-model="form.remark" type="textarea" :rows="6")
    el-form-item(label="商品添加" required)
      el-col(:span="18")
        el-table.wfull(:data="form.goodsList" v-model="form.goodsList")
          el-table-column(type="index" :index="indexMethod")
          el-table-column(prop="code" label="款号")
          el-table-column(prop="brand" label="品牌")
          el-table-column(prop="color" label="颜色")
          el-table-column(prop="size" label="尺码")
          el-table-column(prop="childType" label="类型")
          el-table-column(prop="initAmount" label="原价")
          el-table-column(prop="realAmount" label="实价")
          el-table-column(label="操作") 
            template(slot-scope="scope")
              el-button(type="danger" icon="el-icon-delete" size="mini" circle @click="handleDelete(scope.$index, scope.row)")
              el-button(type="success" v-if="form.boxId" icon="el-icon-download" size="mini" circle @click="downloadQr(scope.$index)" )
              el-button(type="info" v-else icon="el-icon-download" size="mini" circle disabled)
            template(slot-scope="scope")
              el-button(size="mini" circle)
              el-button(size="mini" circle) 
      el-col.pt15(:span="3")
        el-button(type="warning" icon="el-icon-plus" size="mini" circle @click="handleAdd()")
    el-form-item(label="涉及品牌")
      el-row(v-for="item in form.brandList" v-bind:key="item.id")
        el-col 
          span {{item.name}}
        el-col
          el-input.w400(type="textarea" :rows="6" v-model="item.desc") {{item.desc}}
    el-form-item(label="图片备份")
      el-upload(:http-request="Upload" ref="upload" :multiple="true" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" action="")
        i.el-icon-plus
      el-dialog(:visible.sync="dialogVisible")
        img(width="100%" :src="dialogImageUrl" alt="")
    el-col(:span="24")
      h3.mt20.bc-grey5.p10.ml-30.pl30 生成盒子
    el-row.lh50
      el-col
        el-col.w100 商品件数:
        span    {{this.form.goodsList.length}}
      el-col
        el-col.w100 盒子总价:
        span    {{total}}
      el-col
        el-col.w100 预创建:
        el-date-picker(v-model="form.preTime" type="date" placeholder="选择日期")
    el-row.rowcs
      el-col(:span="2")
        el-button(type="danger" @click="look") 预览
      el-col(:span="21")
        el-form-item
          el-button(type="info" disabled v-if="modifyIn" ) 创建盒子
          el-button(type="danger" v-else @click="submit('form')" ) 创建盒子
    el-row(id="qrcode" hidden)
      vue-qr(:logoSrc="config.logo" :text="config.value" :size="200" :margin="0" :logoScale="0.3" :logoCornerRadius="25" colorDark='#26aea8')
    el-dialog.model( v-bind:visible.sync="stand.dialogVisible" width="40%")
      el-row.mt20
        el-col(:span="24")
          el-form(
            ref="stand"
            v-bind:model="stand"
            v-bind:rules="standRules"
            label-width="70px"
            label-position="left")
            el-form-item(label="款号" prop="code")
              el-col(:span="10")
                el-input.w194(v-model="stand.code")
              el-col.ml30(:span="10")
                el-button(type="success" @click="serchGoods('stand')") 搜索
      el-row.mt10(v-if="goodsTableShow")
        el-table(ref="multipleTable" :data="dbGoods" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange")
          el-table-column(type="selection" width="55")
          el-table-column(label="颜色" prop="color")
          el-table-column(label="尺码" prop="size")
          el-table-column(label="库存" prop="num")
      el-row.pt20.text-center
        el-button(type="info" disabled v-if="goodsList.length === 0") 录入
        el-button(type="success" @click="interGoods" v-else) 录入
</template>

<script>
import { GENDER_TYPE } from '@/common/constants'
import { client } from '@/utils/alioss'
import VueQr from 'vue-qr'
export default {
  components: {
    VueQr
  },
  data () {
    return {
      config: {
        value: 'www.baidu.com',
        logo: '/static/11.png'
      },
      restaurants: [],
      editIn: false,
      modifyIn: false,
      total: 0,
      realTotal: 0,
      goodsTableShow: false,
      goodsList: [],
      dbGoods: [],
      stand: {
        code: null,
        dialogVisible: false
      },
      standType: [
        {
          name: '80',
          text: '80'
        },
        {
          name: '90',
          text: '90'
        },
        {
          name: '100',
          text: '100'
        },
        {
          name: '110',
          text: '110'
        },
        {
          name: '120',
          text: '120'
        },
        {
          name: '130',
          text: '130'
        },
        {
          name: '140',
          text: '140'
        }
      ],
      createTypeList: [
        {
          name: '指定',
          text: '指定'
        },
        {
          name: '标准',
          text: '标准'
        }
      ],
      form: {
        createType: '指定',
        stand: '90',
        gender: '男童',
        baby: '',
        remark: '',
        preTime: null,
        goodsList: [],
        brandList: [],
        imgUrl: []
      },
      tempStrArr: [],
      genderType: GENDER_TYPE,
      /**
       * 表单验证
       * @type {Object}
       */
      formRules: {
        code: [
          { required: true, message: '请输入款号', trigger: 'blur' }
        ]
      },
      standRules: {
        code: [
          { required: true, message: '请输入款号', trigger: 'blur' }
        ]
      },
      dialogVisible: false,
      dialogImageUrl: null
    }
  },
  methods: {
    downloadQr (index) {
      var tempIndex = index + 1
      this.config.logo = '/static/' + tempIndex + '.png'
      this.config.value = this.form.boxId + '&' + tempIndex
      setTimeout(() => {
        let url = document.querySelector('#qrcode img').src
        let a = document.createElement('a')
        let event = new MouseEvent('click')
        a.download = tempIndex
        a.href = url
        a.dispatchEvent(event)
      }, 500)
    },
    findBabyAll () {
      this.$axios.get(this.$apis.goods.findBabyAll, {}).then((res) => {
        if (res.code === '1') {
          if (res.data) {
            this.restaurants = res.data
          }
        } else {
          this.$message.error(res.message)
        }
      }).catch((errRes) => {
        this.$message.error(errRes.message)
      })
    },
    handleSelect (item) {
      this.form.babyId = item.id
    },
    querySearch (queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      cb(results)
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelectionChange (val) {
      this.goodsList = val
    },
    /**
     * 获取盒子详情
     * @function [getBoxDetail]
     * @param {String} boxId 盒子id
     */
    getBoxDetail (boxId) {
      this.form.boxId = boxId
      this.form.createType = '标准'
      this.$axios.get(this.$apis.task.getBoxDetail, {
        params: {
          boxId: boxId
        }
      }).then((res) => {
        if (res.code === '1') {
          this.boxDetail = res.data
          this.form.gender = res.data.baby.gender.indexOf('男') > -1 ? '男童' : '女童'
          this.form.baby = res.data.baby.call
          this.form.babyId = res.data.baby.id
          this.form.orderNo = res.data.orderNo
        } else {
          this.$message.error(res.message)
        }
      }).catch((errRes) => {
        this.$message.error(errRes.message)
      })
    },
    /**
     * 图片移除
     * @function [handleRemove]
     * @param {Object} file 文件
     * @param {Arr} fileList 文件列表
     */
    handleRemove (file, fileList) {
      var item = 'http://minianys.oss-cn-shanghai.aliyuncs.com/' + file.uid + '.' + file.name.split('.')[1]
      var index = this.form.imgUrl.indexOf(item)
      if (index > -1) {
        this.form.imgUrl.splice(index, 1)
      }
    },
    /**
     * 图片展示
     * @function [handlePictureCardPreview]
     * @param {Object} file
     */
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    /**
     * 上传图片
     * @function [Upload]
     * @param {Object} file
     */
    Upload (file) {
      var fileName = file.file.uid + '.' + file.file.name.split('.')[1]
      console.log(fileName)
      client().put(fileName, file.file).then(
        result => {
          this.form.imgUrl.push(result.url)
        }).catch(err => {
          console.log(err)
        })
    },
    handleAdd () {
      this.stand.dialogVisible = true
      this.stand.code = null
    },
    handleEdit (index, row) {
      this.stand.dialogVisible = true
      this.stand.code = row.code
    },
    handleDelete (index, row) {
      var tempList = this.form.goodsList
      tempList.splice(index, 1)
      this.form.goodsList = tempList
      this.goodsList.splice(index, 1)
      this.updateBrandList(tempList)
    },
    indexMethod (index) {
      return index + 1
    },
    look () {
      let data = this.form
      data.total = this.total
      data.realTotal = this.realTotal
      this.$router.push({
        name: 'new-task-details',
        params: {
          dataobj: data
        }
      })
    },
    submit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post(this.$apis.goods.saveBoxRecord, this.form).then((res) => {
            if (res.code === '1') {
              this.$message.success('保存成功')
              this.$refs[formName].resetFields()
              this.$refs['upload'].clearFiles()
              this.form.goodsList = []
              if (this.form.boxId) {
                this.$router.push({
                  name: 'my-order-details',
                  query: {
                    id: this.form.boxId
                  }
                })
              }
            } else {
              this.$message.error(res.message)
            }
          }).catch((errRes) => {
            this.$message.error(errRes.message)
          })
        } else {
          return false
        }
      })
    },
    /**
     * 录入货物
     * @function [interGoods]
     */
    interGoods () {
      this.stand.dialogVisible = false
      var tempList = this.form.goodsList
      if (this.goodsList) {
        tempList = tempList.concat(this.goodsList)
        this.form.goodsList = tempList
        this.updateBrandList(this.form.goodsList)
      }
      this.dbGoods = []
    },
    /**
     * 更新品牌信息
     * @function [updateBrandList]
     */
    updateBrandList (goodsList) {
      var tempBrandList = []
      var total = 0
      var realTotal = 0
      var tempStrArr = []
      if (goodsList.length > 0) {
        for (var i = 0; i < goodsList.length; i++) {
          if (tempStrArr.indexOf(goodsList[i].brand) < 0) {
            var tempO = {}
            tempO.name = goodsList[i].brand
            tempO.desc = goodsList[i].brandDesc
            tempBrandList.push(tempO)
            tempStrArr.push(goodsList[i].brand)
          }
          total = total + goodsList[i].initAmount
          realTotal = realTotal + goodsList[i].realAmount
        }
      }
      this.tempStrArr = []
      this.total = total
      this.realTotal = realTotal
      this.form.brandList = tempBrandList
    },
    /**
     * 查找货物
     * @function [serchGoods]
     * @param {String} formName - 表单名称
     */
    serchGoods (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.get(this.$apis.goods.findGoodsByCode, {
            params: {
              code: this.stand.code,
              status: 'RELEASE'
            }
          }).then((res) => {
            if (res.code === '1') {
              this.dbGoods = res.data
              if (res.data) {
                this.goodsTableShow = true
              }
            } else {
              this.$message.error(res.message)
            }
          }).catch((errRes) => {
            this.$message.error(errRes.message)
          })
        } else {
          return false
        }
      })
    },
    /**
     * 查找货物
     * @function [modify]
     * @param {String} boxId - 盒子id
     */
    modifyBox (boxId) {
      this.$axios.get(this.$apis.goods.findBoxRecordById, {
        params: {
          boxId: boxId
        }
      }).then((res) => {
        if (res.code === '1') {
          if (res.data) {
          	res.data.brandList = res.data.brandList.filter(item => item.desc)
            this.form = res.data
            var goodsList = res.data.goodsList
            if (goodsList) {
              var total = 0
              var realTotal = 0
              for (var i = 0; i < goodsList.length; i++) {
                total = total + goodsList[i].initAmount
                realTotal = realTotal + goodsList[i].realAmount
              }
              this.total = total
              this.realTotal = realTotal
            }
          }
        } else {
          this.$message.error(res.message)
        }
      }).catch((errRes) => {
        this.$message.error(errRes.message)
      })
    }
  },
  mounted () {
    var boxId = this.$route.query.id
    if (boxId) {
      this.editIn = true
      this.getBoxDetail(boxId)
    } else if (this.$route.params.dataobj) {
      this.editIn = true
      let obj = this.$route.params.dataobj
      this.form.gender = obj.gender.indexOf('男') > -1 ? '男童' : '女童'
      this.form.baby = obj.call
      this.form.babyId = obj.id
      this.babyId = obj.id
    } else if (this.$route.params.recordobj) {
      var boxIdT = this.$route.params.recordobj
      this.editIn = true
      this.modifyBox(boxIdT)
    } else if (this.$route.params.lookobj) {
      console.log('lookobj---' + this.$route.params.lookobj)
      var boxIdTe = this.$route.params.lookobj
      this.modifyIn = true
      this.editIn = true
      this.modifyBox(boxIdTe)
    } else {
      this.findBabyAll()
    }
  }
}
</script>