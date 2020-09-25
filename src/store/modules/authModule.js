const USER_NAME = 'userName'

export default {
  namespaced: true,
  state: {
    userName: null
  },
  mutations: {
    LOGIN(state, name) {
      state.userName = name
    },
    LOGOUT(state) {
      state.userName = null
    }
  },
  actions: {
    login({ commit }, name) {
      localStorage.setItem(USER_NAME, name)
      commit('LOGIN', name)
      return name
    },
    logout({ commit }) {
      localStorage.removeItem(USER_NAME)
      commit('LOGOUT')
    },
    async checkAuth({ dispatch }) {
      const user = await localStorage.getItem(USER_NAME)
      return user
    }
  }
}
