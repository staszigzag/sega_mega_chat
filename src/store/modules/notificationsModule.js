import messages from '../../utility/messagesNotifications'

const TIMEOUT = 4000
const BASE_COLOR = 'secondary'
let resolvePromiseFunc

export default {
  namespaced: true,
  state: {
    count: 0,
    notifications: [],
    // typesUserActions: TYPES_USER_ACTIONS,
    userAction: null
  },
  mutations: {
    INCREMENT_COUNT(state) {
      state.count++
    },
    ADD_NOTIFICATION(state, notification) {
      state.notifications.unshift(notification)
    },
    DELETE_NOTIFICATION(state, notification) {
      const index = state.notifications.findIndex(not => not.id === notification.id)
      if (index === -1) return
      state.notifications.splice(index, 1)
    },
    SET_USER_ACTION(state, action) {
      state.userAction = action
    }
  },
  actions: {
    showNotification({ commit, state }, { type, text = '' }) {
      let color = BASE_COLOR
      if (type === 'error') color = 'error'
      const notification = { text, color, id: state.count }
      commit('ADD_NOTIFICATION', notification)
      setTimeout(() => {
        commit('DELETE_NOTIFICATION', notification)
      }, TIMEOUT)
      commit('INCREMENT_COUNT')
    },
    confirmUserAction({ commit, state }, text = messages.defaultBottomSheet, type = TYPES_USER_ACTIONS.DELETE) {
      return new Promise(resolve => {
        // назначаем resolve глобальной переменной
        resolvePromiseFunc = resolve
        commit('SET_USER_ACTION', { type, text })
      })
    },
    async resolveConfirmUserAction({ commit, state }, isConfirm) {
      commit('SET_USER_ACTION', null)
      // резолвим промис который создали в confirmUserAction
      resolvePromiseFunc(isConfirm)
    }
  }
}

const TYPES_USER_ACTIONS = {
  DELETE: 'delete'
}
