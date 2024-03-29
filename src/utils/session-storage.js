/**
 * @file 封装sessionStorage
 */

const sessionStorage = global.sessionStorage

export default {
  /**
   * 设置一个值
   * @function [setItem]
   * @param {string} key - 键名
   * @param {*} value - 键值
   * @returns {Promise} Promise实例
   */
  setItem (key, value) {
    return new Promise((resolve) => {
      sessionStorage.setItem(key, JSON.stringify(value))
      resolve()
    })
  },

  /**
   * 获取一个值
   * @function [getItem]
   * @param {string} key - 键名
   * @param {string} [sync] - 同步与否
   * @returns {Promise} Promise实例
   */
  getItem (key, sync = false) {
    if (sync) {
      return JSON.parse(sessionStorage.getItem(key))
    }

    return new Promise((resolve) => {
      resolve(JSON.parse(sessionStorage.getItem(key)))
    })
  },

  /**
   * 删除一个值
   * @function [removeItem]
   * @param {string} key - 键名
   * @returns {Promise} Promise实例
   */
  removeItem (key) {
    return new Promise((resolve) => {
      sessionStorage.removeItem(key)
      resolve()
    })
  },

  /**
   * 清空所有值
   * @function [clear]
   * @returns {Promise} Promise实例
   */
  clear () {
    return new Promise((resolve) => {
      sessionStorage.clear()
      resolve()
    })
  }
}
