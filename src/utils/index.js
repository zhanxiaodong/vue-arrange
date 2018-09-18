import store from '../store'

/**
 * 获取userInfo
 * @function [geolocation]
 * @export getUserInfo()
 * @returns {Promise}
 */
export function getUserInfo () {
  return new Promise((resolve, reject) => {
    if (store.state.user.token) {
      resolve(store.state.user)
    } else {
      return store.dispatch('user/getUserInfo').then((res) => {
        if (!res) {
          reject(new Error('用户未登录'))
          return
        }
        resolve(res)
      }).catch(reject)
    }
  })
}
