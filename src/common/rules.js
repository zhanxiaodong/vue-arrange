/**
 * 手机号验证
 * @function [validatePhone]
 * @param {Object} rule 验证的一些属性，如：message
 * @param {String} value 要验证的值
 * @param {Function} callback 回调（潜规则，第一个参数为错误信息）
 * @return {Any} 无
 */
export const validatePhone = (rule, value, callback) => {
  let phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
  if (value === '') {
    return callback(new Error('请输入手机号'))
  } else if (!phoneReg.test(value)) {
    return callback(new Error('请输入正确的手机号'))
  }
  return callback()
}

/**
 * 邮编验证
 * @function [validateZipCode]
 * @param {Object} rule 验证的一些属性，如：message
 * @param {String} value 要验证的值
 * @param {Function} callback 回调（潜规则，第一个参数为错误信息）
 * @return {Any} 无
 */
export const validateZipCode = (rule, value, callback) => {
  let zipCodeReg = /^[1-9][0-9]{5}$/
  if (value === '') {
    return callback(new Error('请输入邮编'))
  } else if (!zipCodeReg.test(value)) {
    return callback(new Error('请输入正确的邮编'))
  }
  return callback()
}
