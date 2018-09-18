/* jshint esversion: 6 */
import apis from '@/common/apis'

apis.install = (Vue) => {
  Vue.prototype.$apis = apis
}

export default apis
