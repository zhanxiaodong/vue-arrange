const api = require('../../server.config').api

export default {
  // 公共接口
  common: {
    // 发送验证码
    sendCode: `${api.java}/merchant/sms/sendCode`,
    // 校验验证码
    checkCode: `${api.java}/merchant/sms/checkCode`
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
    getBabyList: `${api.java}/merchant/baby/findBabyPages`,
    // 获取孩子详情页
    findBabyDetailById: `${api.java}/merchant/baby/findBabyDetailById`
  },
  // 账号
  account: {
    // 注册
    register: `${api.java}/merchant/shop/register`,
    // 验证商户
    checkShop: `${api.java}/merchant/shop/checkShop`,
    // 重置密码(不校验验证码)
    resetPassNoCheck: `${api.java}/merchant/shop/resetPassNoCheck`,
    // 用户名密码登录
    loginByPassword: `${api.java}/merchant/account/loginByPassword`,
    // 根据商户id查询信息
    getShopInfoById: `${api.java}/merchant/shop/findById`,
    // 更新商户信息
    updateShop: `${api.java}/merchant/shop/updateShop`,
    // 修改密码
    modifyPwdById: `${api.java}/merchant/shop/modifyPass`,
    // 更新手机号
    updatePhone: `${api.java}/merchant/shop/updateShopTel`,
    // 获取账户金钱相关信息
    getAccountInfo: `${api.java}/merchant/account/balanceById`,
    // 余额充值
    rechargeBalance: `${api.java}/merchant/account/accountBalance/balanceAddAli`,
    // 提现
    withdraw: `${api.java}/merchant/account/withdraw`,
    // 获取交易记录
    findRecord: `${api.java}/merchant/account/findRecord`
  },
  // 地址
  address: {
    // 添加地址
    addAddress: `${api.java}/merchant/way/address/add`,
    // 编辑地址
    editAddress: `${api.java}/merchant/way/address/edit`,
    // 根据商户id查找地址
    findAddressByShopId: `${api.java}/merchant/way/findAddressByShop`,
    // 根据地址id查看详情
    findAddressById: `${api.java}/merchant/user/findAddressById`,
    // 修改地址
    updateAddressWeb: `${api.java}/merchant/user/updateAddressWeb`,
    // 设置默认地址
    setDefaultAddress: `${api.java}/merchant/way/updateAddress`,
    // 删除地址
    deleteAddressById: `${api.java}/merchant/way/deleteAddressById`,
    // 根据商户id查找默认地址
    findDefaultAddressByShopId: `${api.java}/merchant/way/findDefaultByShop`
  },
  // 店铺
  shop: {
    // 添加店铺
    addShop: `${api.java}/merchant/way/store/add`,
    // 编辑店铺
    editShop: `${api.java}/merchant/way/store/edit`,
    // 查找店铺
    getShopList: `${api.java}/merchant/way/findStoreByShop`,
    // 删除店铺
    delShop: `${api.java}/merchant/way/deleteStoreById`
  },
  // 品牌
  brand: {
    // 添加品牌
    addBrand: `${api.java}/merchant/way/brand/add`,
    // 编辑品牌
    editBrand: `${api.java}/merchant/way/brand/edit`,
    // 根据商户id找品牌
    getBrandListById: `${api.java}/merchant/way/findBrandByShop`,
    // 删除品牌
    delBrand: `${api.java}/merchant/way/deleteBrandById`
  },
  // 模特
  model: {
    // 查看合作模特
    getCooperativeModel: `${api.java}/merchant/userInfo/findUsers`
  },
  // 任务
  task: {
    // 发布任务
    add: `${api.java}/merchant/mission/add`,
    // 分页查询任务列表
    getTaskList: `${api.java}/merchant/box/findBoxPages`,
    // 保存沟通记录
    saveLinkUpRecord: `${api.java}/merchant/box/saveLinkUpRecord`,
    // 更新盒子状态
    updateBoxStatus: `${api.java}/merchant/box/saveBoxGoods`,
    // 更新盒子状态且发送信息
    sendMsgByBoxId: `${api.java}/merchant/box/sendMsgByBoxId`,
    // 关闭盒子订单
    closeBox: `${api.java}/merchant/box/closeBox`,
    // 查询盒子详情
    getBoxDetail: `${api.java}/merchant/box/findBoxDetail`,
    // 盒子详情
    findBoxDetailContain: `${api.java}/merchant/box/findBoxDetailContain`,
    // 更新沟通结果
    saveBoxModify: `${api.java}/merchant/box/saveBoxModify`,
    // 更新盒子修正信息
    updateBoxModify: `${api.java}/merchant/box/updateBoxModify`,
    // 通过系统下单
    boxSendWeb: `${api.java}/merchant/box/boxSendWeb`
  },
  // 订单
  order: {
    // 按订单开票
    findOrderInvoice: `${api.java}/merchant/order/findOrderInvoice`
  },
  // 七牛
  qiniu: {
    upload: `${api.java}/merchant/storge/qiniu/uploadToken`
  },
  // 消息中心
  msg: {
    getMsgList: `${api.java}/merchant/msglog/findMsgLogPage`
  },
  // 优惠券
  coupon: {
    // 获取账户优惠券信息
    findCouponInfo: `${api.java}/merchant/shop/findCouponInfo`,
    // 商户兑换优惠券
    exchangeCoupon: `${api.java}/merchant/shop/exchangeCoupon`
  },
  goods: {
    // 保存或发布
    saveGoodsWeb: `${api.java}/merchant/category/saveGoodsWeb`,
    // 更新
    updateGoodsWeb: `${api.java}/merchant/category/updateGoodsWeb`,
    // 分页查盒子
    findGoodsPages: `${api.java}/merchant/category/findGoodsPages`,
    // 查找未发布的规格
    findStandByCode: `${api.java}/merchant/category/findStandByCode`,
    // 获取款号下的货物
    findGoodsByCode: `${api.java}/merchant/category/findGoodsByCode`,
    // 查找盒子记录
    findBoxRecordById: `${api.java}/merchant/box/findBoxRecordById`,
    // 保存盒子记录
    saveBoxRecord: `${api.java}/merchant/box/saveBoxRecord`,
    // 保存运单号
    saveBoxExpress: `${api.java}/merchant/box/saveBoxExpress`,
    // 查找所有的孩子
    findBabyAll: `${api.java}/merchant/baby/findBabyAll`,
    // 通过款号来更新商品的折扣
    updateByCode: `${api.java}/merchant/category/updateByCode`
  },
  // 发票
  invoice: {
    // 保存发票信息
    saveInvoice: `${api.java}/merchant/shop/saveInvoice`,
    // 删除发票信息
    deleteInvoiceById: `${api.java}/merchant/shop/deleteInvoiceById`,
    // 获取发票列表
    findInvoices: `${api.java}/merchant/shop/findInvoices`,
    // 开发票
    excuteOrderInvoices: `${api.java}/merchant/shop/excuteOrderInvoices`
  },
  // 投诉
  appeal: {
    // 查找投诉列表
    findComplaintPage: `${api.java}/merchant/complaint/findComplaintPage`,
    // 提交投诉
    submit: `${api.java}/merchant/complaint/submit`,
    // 处理投诉
    handle: `${api.java}/merchant/complaint/handle`
  },
  // 爬取数据
  search: {
    grab: `${api.java}/merchant/search/grab`
  }
}
