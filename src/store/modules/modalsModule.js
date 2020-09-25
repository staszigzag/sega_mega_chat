export default {
  namespaced: true,
  state: {
    isShowCreateRoom: false,
    isShowDrawer: false
  },
  mutations: {
    TOGGLE_SHOW_CREATE_ROOM(state, isShow) {
      state.isShowCreateRoom = isShow
    },
    TOGGLE_SHOW_DRAWER(state, isShow) {
      state.isShowDrawer = isShow
    }
  }
}
