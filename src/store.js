import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false
  },
  getters: {
    isLogin: (state) => state.isLogin
  },
  mutations: {
    SET_ISLOGIN(state, isLogin) {
      state.isLogin = isLogin
    }
  },
  actions: {
    setIsLogin({ commit }, isLogin) {
      commit("SET_ISLOGIN", isLogin)
    }
  }
})
