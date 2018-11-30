const api = require('../../server.config').api

export default {
  // 公共接口
  common: {
    // 发送验证码
    sendCode: `${api.java}/merchant_new/sms/sendCode`,
    // 校验验证码
    checkCode: `${api.java}/merchant_new/sms/checkCode`
  },
  // koa2公共服务接口
  koa2: {
    // 上传文件
    upload: `${api.koa2}/commonService/upload`
  },
  // node接口
  node: {
    test: `${api.java}/nodeApi/test`
  },
  // 孩子
  baby: {
    // 孩子列表
    getBabyList: `${api.java}/merchant_new/baby/findBabyPages`,
    // 获取孩子详情页
    findBabyDetailById: `${api.java}/merchant_new/baby/findBabyDetailById`,
    // 更新孩子信息
    modifyBaby: `${api.java}/merchant_new/baby/updateBaby`,
    // 更新用户信息
    modifyUser: `${api.java}/merchant_new/user/updateUser`
  },
  // 账号
  account: {
    // 注册
    register: `${api.java}/merchant_new/shop/register`,
    // 验证商户
    checkShop: `${api.java}/merchant_new/shop/checkShop`,
    // 重置密码(不校验验证码)
    resetPassNoCheck: `${api.java}/merchant_new/shop/resetPassNoCheck`,
    // 用户名密码登录
    loginByPassword: `${api.java}/merchant_new/account/loginByPassword`,
    // 根据商户id查询信息
    getShopInfoById: `${api.java}/merchant_new/shop/findById`,
    // 更新商户信息
    updateShop: `${api.java}/merchant_new/shop/updateShop`,
    // 修改密码
    modifyPwdById: `${api.java}/merchant_new/shop/modifyPass`,
    // 更新手机号
    updatePhone: `${api.java}/merchant_new/shop/updateShopTel`,
    // 获取账户金钱相关信息
    getAccountInfo: `${api.java}/merchant_new/account/balanceById`,
    // 余额充值
    rechargeBalance: `${api.java}/merchant_new/account/accountBalance/balanceAddAli`,
    // 提现
    withdraw: `${api.java}/merchant_new/account/withdraw`,
    // 获取交易记录
    findRecord: `${api.java}/merchant_new/account/findRecord`
  },
  // 地址
  address: {
    // 添加地址
    addAddress: `${api.java}/merchant_new/way/address/add`,
    // 编辑地址
    editAddress: `${api.java}/merchant_new/way/address/edit`,
    // 根据商户id查找地址
    findAddressByShopId: `${api.java}/merchant_new/way/findAddressByShop`,
    // 根据地址id查看详情
    findAddressById: `${api.java}/merchant_new/user/findAddressById`,
    // 修改地址
    updateAddressWeb: `${api.java}/merchant_new/user/updateAddressWeb`,
    // 设置默认地址
    setDefaultAddress: `${api.java}/merchant_new/way/updateAddress`,
    // 删除地址
    deleteAddressById: `${api.java}/merchant_new/way/deleteAddressById`,
    // 根据商户id查找默认地址
    findDefaultAddressByShopId: `${api.java}/merchant_new/way/findDefaultByShop`
  },
  // 店铺
  shop: {
    // 添加店铺
    addShop: `${api.java}/merchant_new/way/store/add`,
    // 编辑店铺
    editShop: `${api.java}/merchant_new/way/store/edit`,
    // 查找店铺
    getShopList: `${api.java}/merchant_new/way/findStoreByShop`,
    // 删除店铺
    delShop: `${api.java}/merchant_new/way/deleteStoreById`
  },
  // 品牌
  brand: {
    // 添加品牌
    addBrand: `${api.java}/merchant_new/way/brand/add`,
    // 编辑品牌
    editBrand: `${api.java}/merchant_new/way/brand/edit`,
    // 根据商户id找品牌
    getBrandListById: `${api.java}/merchant_new/way/findBrandByShop`,
    // 删除品牌
    delBrand: `${api.java}/merchant_new/way/deleteBrandById`
  },
  // 模特
  model: {
    // 查看合作模特
    getCooperativeModel: `${api.java}/merchant_new/userInfo/findUsers`
  },
  // 任务
  task: {
    // 发布任务
    add: `${api.java}/merchant_new/mission/add`,
    // 分页查询任务列表
    getTaskList: `${api.java}/merchant_new/box/findBoxPages`,
    // 保存沟通记录
    saveLinkUpRecord: `${api.java}/merchant_new/box/saveLinkUpRecord`,
    // 更新盒子状态
    updateBoxStatus: `${api.java}/merchant_new/box/saveBoxGoods`,
    // 更新盒子状态且发送信息
    sendMsgByBoxId: `${api.java}/merchant_new/box/sendMsgByBoxId`,
    // 关闭盒子订单
    closeBox: `${api.java}/merchant_new/box/closeBox`,
    // 查询盒子详情
    getBoxDetail: `${api.java}/merchant_new/box/findBoxDetail`,
    // 盒子详情
    findBoxDetailContain: `${api.java}/merchant_new/box/findBoxDetailContain`,
    // 更新沟通结果
    saveBoxModify: `${api.java}/merchant_new/box/saveBoxModify`,
    // 更新盒子修正信息
    updateBoxModify: `${api.java}/merchant_new/box/updateBoxModify`,
    // 通过系统下单
    boxSendWeb: `${api.java}/merchant_new/box/boxSendWeb`,
    // 通过系统发起盒子
    sysSendBox: `${api.java}/merchant_new/box/sysSendBox`
  },
  // 订单
  order: {
    // 按订单开票
    findOrderInvoice: `${api.java}/merchant_new/order/findOrderInvoice`
  },
  // 七牛
  qiniu: {
    upload: `${api.java}/merchant_new/storge/qiniu/uploadToken`
  },
  // 消息中心
  msg: {
    getMsgList: `${api.java}/merchant_new/msglog/findMsgLogPage`
  },
  // 优惠券
  coupon: {
    // 获取账户优惠券信息
    findCouponInfo: `${api.java}/merchant_new/shop/findCouponInfo`,
    // 商户兑换优惠券
    exchangeCoupon: `${api.java}/merchant_new/shop/exchangeCoupon`
  },
  goods: {
    // 保存或发布
    saveGoodsWeb: `${api.java}/merchant_new/category/saveGoodsWeb`,
    // 保存或发布
    deleteGoodsById: `${api.java}/merchant_new/category/deleteGoodsById`,
    // 更新
    updateGoodsWeb: `${api.java}/merchant_new/category/updateGoodsWeb`,
    // 补录
    inGoods: `${api.java}/merchant_new/category/inGoods`,
    // 商品详情
    findGoodsById: `${api.java}/merchant_new/category/findGoodsById`,
    // 清算
    clearGoods: `${api.java}/merchant_new/category/clearGoods`,
    // 分页查盒子
    findGoodsPages: `${api.java}/merchant_new/category/findGoodsPages`,
    // 查找未发布的规格
    findStandByCode: `${api.java}/merchant_new/category/findStandByCode`,
    // 获取款号下的货物
    findGoodsByCode: `${api.java}/merchant_new/category/findGoodsByCode`,
    // 查找盒子记录
    findBoxRecordById: `${api.java}/merchant_new/box/findBoxRecordById`,
    // 保存盒子记录
    saveBoxRecord: `${api.java}/merchant_new/box/saveBoxRecord`,
    // 保存运单号
    saveBoxExpress: `${api.java}/merchant_new/box/saveBoxExpress`,
    // 查找所有的孩子
    findBabyAll: `${api.java}/merchant_new/baby/findBabyAll`,
    // 通过款号来更新商品的折扣
    updateByCode: `${api.java}/merchant_new/category/updateByCode`
  },
  // 发票
  invoice: {
    // 保存发票信息
    saveInvoice: `${api.java}/merchant_new/shop/saveInvoice`,
    // 删除发票信息
    deleteInvoiceById: `${api.java}/merchant_new/shop/deleteInvoiceById`,
    // 获取发票列表
    findInvoices: `${api.java}/merchant_new/shop/findInvoices`,
    // 开发票
    excuteOrderInvoices: `${api.java}/merchant_new/shop/excuteOrderInvoices`
  },
  // 投诉
  appeal: {
    // 查找投诉列表
    findComplaintPage: `${api.java}/merchant_new/complaint/findComplaintPage`,
    // 提交投诉
    submit: `${api.java}/merchant_new/complaint/submit`,
    // 处理投诉
    handle: `${api.java}/merchant_new/complaint/handle`
  },
  // 爬取数据
  search: {
    grab: `${api.java}/merchant_new/search/grab`
  }
}
