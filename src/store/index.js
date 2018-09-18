import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'

import user from './modules/user'
import location from './modules/location'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  getters,
  mutations,
  modules: {
    user,
    location
  }
})
