/**
 * @file 定位模块
 */

import amap from '@/utils/amap'
import sessionStorage from '@/utils/session-storage'

const UPDATE = 'UPDATE'
const initialState = {
  // 完整地址
  address: null,
  // 城市
  city: null,
  // 区域
  district: null,
  // 纬度
  lat: null,
  // 经度
  lng: null,
  // 经纬度: [lng, lat]
  lnglat: null,
  // 省份
  province: null,
  // 街道，比如延安路、人民路等
  street: null,
  // 街道号码，比如1号、888号等
  streetNumber: null,
  // 乡镇/镇区，比如延安乡、人民镇、中山街道等
  township: null,
  // 调用系统 (WEB | ANDROID | IOS)
  systemName: 'WEB'
}
let promise = null

const mutations = {
  /**
   * 更新数据
   * @param {Object} state - 状态管理对象
   * @param {Object} data - 新状态数据
   */
  [UPDATE] (state, data) {
    Object.assign(state, data)
    sessionStorage.setItem('location', state)
  }
}

const actions = {
  /**
   * 更新数据
   * @function [update]
   * @param {Object} context - 上下文对象
   * @param {Object} data - 新状态数据
   */
  update (context, data) {
    context.commit(UPDATE, data)
  },

  /**
   * 定位当前位置
   * @function [setLocation]
   * @param {Object} context - 上下文对象
   * @param {Object} data - 位置信息
   * @returns {Promise} Promise实例
   */
  setLocation (context, data) {
    if (!promise) {
      promise = new Promise((resolve, reject) => {
        if (data) {
          context.commit(UPDATE, data)
          resolve()
          return
        }

        // 自动获取位置信息
        // eslint-disable-next-line
        return amap.geolocation({
          timeout: 10000,
          maximumAge: 60000,
          zoomToAccuracy: true
        }).then(({ position }) => {
          const lnglat = [position.lng, position.lat]

          return amap.geocoder(lnglat).then(({ addressComponent, formattedAddress }) => {
            context.commit(UPDATE, {
              lnglat,
              address: formattedAddress,
              city: addressComponent.city,
              district: addressComponent.district,
              lng: lnglat[0],
              lat: lnglat[1],
              province: addressComponent.province,
              street: addressComponent.street,
              streetNumber: addressComponent.streetNumber,
              township: addressComponent.township
            })

            resolve()
          }).catch(reject)
        }).catch(reject)
      }).then(() => {
        promise = null
      }).catch((e) => {
        promise = null
        throw e
      })
    }

    return promise
  }
}

const getters = {}

export default {
  namespaced: true,
  state: Object.assign({}, initialState, sessionStorage.getItem('location', true)),
  mutations,
  actions,
  getters
}
