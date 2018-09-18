<template lang="pug">
.ui-card
  el-row
    el-col(:span="24")
      h1.mb10 shop card
      shop-card.mb20(
        v-for="item in shops"
        v-bind:key="item.id"
        v-bind:shop="item"
        @edit="edit"
        @del="del")
  el-row.mt40
    el-col(:span="24")
      h1.mb10 brand card
      brand-card.mb20(
        v-for="item in brands"
        v-bind:key="item.id"
        v-bind:brand="item"
        @edit="edit"
        @del="del")
  el-row.mt40
    el-col(:span="24")
      h1.mb10 shoot address card
      shoot-address-card.mb20(
        v-for="item in shootAddres"
        v-bind:key="item.id"
        v-bind:address="item"
        @isDefault="showInfo"
        @edit="showInfo"
        @del="showInfo")
  el-row.mt40
    el-col(:span="24")
      h1.mb10 shipping address card
      shipping-address-card.mb20(
        v-for="item in shippingAddress"
        v-bind:key="item.id"
        v-bind:address="item"
        @isDefault="showInfo"
        @edit="showInfo"
        @del="showInfo")
  el-row
    el-col(:span="24")
      h1.mb10 invoice card
      invoice-card.mb20(
        v-for="item in invoices"
        v-bind:key="item.id"
        v-bind:invoice="item"
        @del="showInfo")
  el-row
    el-col(:span="24")
      h1.mb10 receipt card
      receipt-card.mb20(
        v-for="item in receipts"
        v-bind:key="item.id"
        v-bind:receipt="item")
</template>

<script>
export default {
  data () {
    return {
      /**
       * 品牌
       * @type {Array}
       */
      brands: [
        {
          id: '123',
          name: '啦啦啦1',
          avatar: 'https://user-gold-cdn.xitu.io/2017/9/25/f3abf1ed9ec6283d5e705987abaa1986?imageView2/1/w/120/h/120/q/85/interlace/1'
        }
      ],
      /**
       * 店铺
       * @type {Array}
       */
      shops: [
        {
          id: '123',
          platform: 'taobao',
          name: '啦啦啦1',
          avatar: 'https://user-gold-cdn.xitu.io/2017/9/25/f3abf1ed9ec6283d5e705987abaa1986?imageView2/1/w/120/h/120/q/85/interlace/1'
        }
      ],
      /**
       * 邮寄地址
       * @type {Array}
       */
      shippingAddress: [
        {
          address: {
            province: {
              citycode: '021',
              adcode: '310000',
              level: 'province',
              center: {
                Q: '31.230372',
                lng: '121.473662',
                N: '121.47366199999999',
                lat: '31.230372'
              },
              name: '上海市'
            },
            city: {
              citycode: '021',
              adcode: '310100',
              level: 'city',
              center: {
                Q: '31.230372',
                lng: '121.473662',
                N: '121.47366199999999',
                lat: '31.230372'
              },
              name: '上海城区'
            },
            detailed: '11',
            street: {
              shopinfo: '0',
              address: '丽园路斜徐路路口斜徐路595号二楼209室星巴克楼上(靠近鲁班路)',
              distance: null,
              name: 'k11 Salon',
              location: {
                Q: '31.206169',
                lng: '121.472574',
                N: '121.47257400000001',
                lat: '31.206169'
              },
              tel: '17601278961;17601224647',
              id: 'B0FFHF4F0R',
              type: '购物服务;购物相关场所;购物相关场所'
            },
            district: {
              citycode: '021',
              adcode: '310101',
              level: 'district',
              center: {
                Q: '31.231739',
                lng: '121.484428',
                N: '121.48442799999998',
                lat: '31.231739'
              },
              name: '黄浦区'
            }
          },
          code: '100001',
          createTime: '2017-10-23T13:57:14+0800',
          id: '59ed84bae4b0e218e9da044b',
          isDefault: true,
          lat: 31.206169,
          lng: 121.472574,
          name: '111',
          region: '',
          remark: '111',
          shopId: '59e3295be4b033ec6c2b39c9',
          tel: '18643242411',
          type: 'RETURN'
        }
      ],
      /**
       * 拍摄地址
       * @type {Array}
       */
      shootAddres: [
        {
          address: {
            province: {
              citycode: '021',
              adcode: '310000',
              level: 'province',
              center: {
                Q: '31.230372',
                lng: '121.473662',
                N: '121.47366199999999',
                lat: '31.230372'
              },
              name: '上海市'
            },
            city: {
              citycode: '021',
              adcode: '310100',
              level: 'city',
              center: {
                Q: '31.230372',
                lng: '121.473662',
                N: '121.47366199999999',
                lat: '31.230372'
              },
              name: '上海城区'
            },
            detailed: '11',
            street: {
              shopinfo: '0',
              address: '丽园路斜徐路路口斜徐路595号二楼209室星巴克楼上(靠近鲁班路)',
              distance: null,
              name: 'k11 Salon',
              location: {
                Q: '31.206169',
                lng: '121.472574',
                N: '121.47257400000001',
                lat: '31.206169'
              },
              tel: '17601278961;17601224647',
              id: 'B0FFHF4F0R',
              type: '购物服务;购物相关场所;购物相关场所'
            },
            district: {
              citycode: '021',
              adcode: '310101',
              level: 'district',
              center: {
                Q: '31.231739',
                lng: '121.484428',
                N: '121.48442799999998',
                lat: '31.231739'
              },
              name: '黄浦区'
            }
          },
          code: '100001',
          createTime: '2017-10-23T13:57:14+0800',
          id: '59ed84bae4b0e218e9da044b',
          isDefault: true,
          lat: 31.206169,
          lng: 121.472574,
          name: '111',
          region: '',
          remark: '111',
          shopId: '59e3295be4b033ec6c2b39c9',
          tel: '18643242411',
          type: 'RETURN'
        }
      ],
      /**
       * 发票
       * @type {Array}
       */
      invoices: [
        {
          id: '123',
          header: '杭州小聪聪有限公司',
          taxNum: '05215165165222BJ',
          registered: {
            address: '杭州市滨江区江陵路119号',
            phone: '13900000000'
          },
          bank: {
            name: '杭州银行',
            account: '1000000000000'
          },
          address: {
            province: '浙江省',
            city: '杭州市',
            area: '滨江区',
            details: '江陵路119号',
            zipCode: '310000'
          },
          contacts: '小聪聪',
          phone: '13600000000'
        }
      ],
      /**
       * 交易记录
       * @type {Array}
       */
      receipts: [
        {
          // id
          id: '1',
          // 交易名称
          name: '账户余额',
          // 付款方
          payer: '歪歪',
          // 收款方
          payee: '杭州小聪聪科技有限公司',
          // 收款方联系电话
          payeePhone: '13600000000',
          // 流水号
          serialNumber: '123',
          // 订单金额
          money: '100',
          // 说明
          desc: '账户充值',
          // 来源 -credit 信誉金；-bail 保证金；-accountBalance 账户余额；-zhifubao 支付宝
          from: 'zhifubao',
          // 类型 -recharge 充值；-drawing 提现; -blocked 冻结； -unfreeze 解冻；-pay 支付； -indemnity 赔付
          type: 'recharge',
          // 交易状态 -success 交易成功；-doing 交易中；-wait 等待交易
          status: 'success',
          // 交易时间
          time: '2017-10-10 10:10'
        }
      ]
    }
  },
  methods: {
    /**
     * 编辑
     * @function [edit]
     * @param {Object} shopInfo -店铺信息
     */
    edit (shopInfo) {
      this.$alert(shopInfo.name, '编辑', {
        confirmButtonText: '确定'
      })
    },
    /**
     * 删除
     * @function [del]
     * @param {Object} shopInfo -店铺信息
     */
    del (shopInfo) {
      this.$confirm(`确定删除 ${shopInfo.name}`, '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    /**
     * 显示地址
     * @function [showInfo]
     * @param {Object} info
     */
    showInfo (info) {
      this.$alert(info, 'show', {
        confirmButtonText: '确定'
      })
    }
  }
}
</script>
