import axios from 'axios'
// import serverConfig from '../../server.config'
import store from '@/store'

// axios.defaults.baseURL = process.env.NODE_ENV === 'production'
//   ? serverConfig.api
//   : ''
axios.defaults.timeout = 30000
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.common['Authorization'] = `token ${store.state.user.token}`

axios.interceptors.request.use((config) => {
  config.headers['X-Requested-With'] = 'XMLHttpRequest'

  return config
})

axios.interceptors.response.use((response) => {
  const data = response.data

  return data
})

axios.install = (Vue) => {
  Vue.prototype.$axios = axios
}

export default axios
