import moment from 'moment'

export default {
  /**
   * 时间格式化
   * @function [timeFormat]
   * @param {Date} date [日期]
   * @param {String} format [格式化的样式]
   * @return {String} 时间
   */
  timeFormat (date, format) {
  	if (!date) {
  		return '-'
  	}
    if (format) {
      return moment(date).format(format)
    } else {
      return moment(date).format('MM-DD HH:mm')
    }
  },
  /**
   * 转换platform
   * @function [ebPlatform]
   * @param {String} platform
   * @returns {String} 电商平台
   */
  ebPlatform (platform) {
    if (platform === 'taobao') {
      return '淘宝'
    } else if (platform === 'jd') {
      return '京东'
    } else if (platform === 'sunning') {
      return '苏宁'
    } else if (platform === 'yunji') {
      return '云集'
    } else {
      return ''
    }
  },
  /**
   * 开票订单状态
   * @function [orderInvoicingStatus]
   * @param {Num} num
   * @returns {String} 开票订单状态
   * 0-未开票，1-审核中，2-已开票，3-拒绝开票，4-已超时
   */
  orderInvoicingStatus (num) {
    if (num === 0) {
      return '未开票'
    } else if (num === 1) {
      return '开票中'
    } else if (num === 2) {
      return '已开票'
    } else if (num === 3) {
      return '拒绝开票'
    } else if (num === 4) {
      return '已超时'
    } else if (num === 5) {
      return '已寄出'
    } else if (num === 6) {
      return '已收到'
    } else {
      return ''
    }
  },
  /**
   * 开票订单属性
   * @function [orderClass]
   * @param {String} class
   * @returns {String} 开票订单类型
   * invitedModel-模特邀约；bookingModel-模特预约；marketingTask-营销任务；tryReport-试用报告
   */
  orderClass (orderClass) {
    if (orderClass === 'invited-model') {
      return '模特'
    } else if (orderClass === 'marketing-task') {
      return '营销'
    } else if (orderClass === 'try-report') {
      return '试用'
    } else if (orderClass === 'booking-model') {
      return '模特'
    } else {
      return ''
    }
  },
  /**
   * 开票订单类型
   * @function [taskType]
   * @param {String} type
   * @returns {String} 开票订单类型
   * invitedModel-模特邀约；bookingModel-模特预约；marketingTask-营销任务；tryReport-试用报告
   */
  taskType (type) {
    if (type === 'invited-model') {
      return '模特邀约'
    } else if (type === 'booking-model') {
      return '模特预约'
    } else if (type === 'marketing-task') {
      return '营销任务'
    } else if (type === 'try-report') {
      return '试用报告'
    }
  },
  boxStatus (status) {
    if (status === 'LINK_UP') {
      return '已沟通'
    } else if (status === 'NOTIFY_EXPRESS') {
      return '已配货'
    } else if (status === 'DISPATCHING') {
      return '配送中'
    } else if (status === 'DELIVERY_COMPLETE' || status === 'EVALUATED') {
      return '待付款'
    } else if (status === 'PAY_PART') {
      return '部分付款'
    } else if (status === 'RETURN_EXPRESS') {
      return '退件中'
    } else if (status === 'END' || status === 'PAY_COMPLETE') {
      return '已结单'
    } else if (status === 'CLOSE') {
      return '已关闭'
    }
  },
  boxType (type) {
    if (type === 'GEN') {
      return '迷你盒子'
    } else {
      return '标准盒子'
    }
  },
  monthDiff (birth) {
    if (birth === undefined) {
      return ''
    }
    var result
    var timeA = birth.split('-')
    var months
    var nowD = new Date()
    months = (nowD.getFullYear() - timeA[0]) * 12
    months -= Number(timeA[1])
    months += nowD.getMonth() + 1
    var hisDays = Number(timeA[2])
    var nowDays = nowD.getDate()
    var days
    if (nowDays >= hisDays) {
      days = nowDays - hisDays
      result = months + '月' + days + '天'
    } else {
      var tempDate = new Date(nowD.getFullYear(), nowD.getMonth(), 0)
      days = tempDate.getDate() + nowDays - hisDays
      result = (months - 1) + '月' + days + '天'
    }
    return result
  },
  listToStr (str) {
    if (str) {
      str = String(str)
      return `${str.split(',').join('/').replace('+', '').replace('[', '').replace(']', '').replace(/"/g, '')}`
    }
  },
  viplev (type) {
    if (type === '0') {
      return '访客用户'
    } else if (type === '10') {
      return '访客用户'
    } else if (type === '20') {
      return '体验会员'
    } else if (type === '40') {
      return '年度会员'
    } else if (type === '50') {
      return '迷礼I'
    } else if (type === '60') {
      return '迷礼II'
    } else if (type === '70') {
      return '迷礼III'
    }
  },
  /**
   * 任务状态
   * @function [taskStatus]
   * @param {String} status
   * @returns {String} 任务状态
   */
  taskStatus (status) {
    if (status === 'EDIT') {
      return '编写'
    } else if (status === 'RELEASE') {
      return '发布'
    } else if (status === 'CANCEL') {
      return '取消'
    } else if (status === 'DELETE') {
      return '删除'
    } else if (status === 'PREPAY') {
      return '待支付'
    } else if (status === 'COMPLETE') {
      return '完成'
    }
  },
  /**
   * 任务状态
   * @function [taskStatus]
   * @param {String} status
   * @returns {String} 任务状态
   */
  otherTaskStatus (status) {
    if (status === 'COMPLETE') {
      return '已完成'
    } else {
      return '进行中'
    }
  },
  /**
   * 将手机号中间4位数字替换为星号
   * @function [asterisk]
   * @param {String} str - 待处理字符串
   * @returns {String} 已处理字符串
   */
  asterisk (str) {
    str = String(str)
    return `${str.substr(0, 3)}****${str.substr(-4, 4)}`
  },
  /**
   * 交易类型
   * @function [businessDealType]
   * @param {String} type - 交易类型
   * @returns {String} 开票类型
   */
  businessDealType (type) {
    if (type === 'recharge') {
      return '充值'
    } else if (type === 'drawing') {
      return '提现'
    } else if (type === 'blocked') {
      return '冻结'
    } else if (type === 'unfreeze') {
      return '解冻'
    } else if (type === 'pay') {
      return '支付'
    } else if (type === 'indemnity') {
      return '赔付'
    }
  },
  /**
   * 交易金额
   * @function [businessDealMoney]
   * @param {String} type - 交易类型
   * @param {String} money - 交易金额
   * @returns {String} 金额
   */
  businessDealMoney (type, money) {
    if (type === 'recharge') {
      return `+${money}`
    } else if (type === 'drawing') {
      return `-${money}`
    } else if (type === 'blocked') {
      return `-${money}`
    } else if (type === 'unfreeze') {
      return `+${money}`
    } else if (type === 'pay') {
      return `-${money}`
    } else if (type === 'indemnity') {
      return `-${money}`
    }
  },
  /**
   * 交易状态
   * @function [businessDealStatus]
   * @param {String} status - 交易状态
   * @returns {String} 状态
   */
  businessDealStatus (status) {
    if (status === 'success') {
      return '交易成功'
    } else if (status === 'doing') {
      return '交易进行中'
    } else if (status === 'wait') {
      return '等待交易'
    }
  },
  /**
   * 交易来源
   * @function [businessDealFrom]
   * @param {String} from - 交易来源
   * @returns {String} 来源
   */
  businessDealFrom (from) {
    if (from === 'credit') {
      return '信誉金'
    } else if (from === 'bail') {
      return '保证金'
    } else if (from === 'BALANCE') {
      return '账户余额'
    } else if (from === 'ALIPAY') {
      return '支付宝'
    }
  },
  /**
   * 申诉状态
   * @function [appealStatus]
   * @param {String} status
   * @returns {String} 申诉状态
   */
  appealStatus (status) {
    if (status === 'CREATE') {
      return '处理中'
    } else if (status === 'CANCEL') {
      return '撤销'
    } else if (status === 'COMPLETE') {
      return '完成'
    }
  },
  /**
   * 截取当前数据到小数点后两位
   */
  numFilter (value) {
    let realVal = Number(value).toFixed(2)
    return Number(realVal)
  }
}
