/**
 * @file 用户模块
 */

import localStorage from '@/utils/local-storage'

const UPDATE = 'UPDATE'
const initialState = {
  // 用户名
  userName: null,
  // 用户Id
  userId: null,
  // 用户头像
  img: null,
  // 手机号
  phone: null,
  // token
  token: null
}

const mutations = {
  /**
   * 更新数据
   * @param {Object} state - 状态管理对象
   * @param {Object} data - 新状态数据
   */
  [UPDATE] (state, data) {
    Object.assign(state, data)
    localStorage.setItem('userInfo', state)
  }
}

const actions = {
  /**
   * 获取用户信息
   * @function [getUserInfo]
   * @param {Object} context - 上下文对象
   * @returns {Promise}
   */
  getUserInfo (context) {
    return new Promise((resolve, reject) => {
      return localStorage.getItem('userInfo').then((res) => {
        if (!res) {
          reject(new Error('用户未登录'))
          return
        }
        context.commit(UPDATE, {
          userName: res.userName,
          userId: res.userId,
          img: res.img,
          phone: res.phone,
          token: res.token
        })
        resolve(res)
      }).catch(reject)
    })
  },
  /**
   * 保存用户信息
   * @function [setUserInfo]
   * @param {Object} context - 上下文对象
   * @param {Object} data - 数据
   * @returns {Promise}
   */
  setUserInfo (context, data) {
    return new Promise((resolve, reject) => {
      return localStorage.setItem('userInfo').then((res) => {
        context.commit(UPDATE, {
          userName: data.userName,
          userId: data.userId,
          img: data.img,
          phone: data.phone,
          token: data.token
        })
        resolve()
      }).catch(reject)
    })
  },
  /**
   * 删除用户信息
   * @function [delUserInfo]
   * @param {Object} context - 上下文对象
   * @returns {Promise}
   */
  delUserInfo (context) {
    return new Promise((resolve, reject) => {
      return localStorage.removeItem('userInfo').then((res) => {
        context.commit(UPDATE, {
          userName: null,
          userId: null,
          img: null,
          phone: null,
          token: null
        })
        resolve()
      }).catch(reject)
    })
  }
}

const getters = {
  user: state => state
}

export default {
  namespaced: true,
  state: Object.assign({}, initialState, localStorage.getItem('userInfo')),
  mutations,
  actions,
  getters
}
