import api from '../../api'
import store from '../index'
import messagesNotifications from '../../utility/messagesNotifications'

let ws
export default {
  namespaced: true,
  state: {
    isConnect: false
  },
  mutations: {
    SET_IS_CONNECT(state, isConnect) {
      state.isConnect = isConnect
    }
  },
  actions: {
    async connectSocket({ commit, dispatch }, userName) {
      try {
        const newWS = api.ws.getSocket(userName)
        newWS.onmessage = (msg) => {
          store.dispatch('rooms/processNewMessage', msg)
        }
        await newWS.connect()
        ws = newWS
        store.dispatch('notifications/showNotification', { text: messagesNotifications.initSocket })
        commit('SET_IS_CONNECT', true)
      } catch (err) {
        store.dispatch('notifications/showNotification', { text: messagesNotifications.errorGetInitSocket, type: 'error' })
        console.warn(err)
        throw err
      }
    },
    async sendSocket({ commit, state }, msg) {
      try {
      // TODO проверка на доставку
        msg = JSON.stringify(msg)
        ws.send(msg)
      } catch (err) {
        store.dispatch('notifications/showNotification', { text: messagesNotifications.errorSendSocket, type: 'error' })
        console.dir(err)
        throw err
      }
    },
    async disconnectSocket({ commit }) {
      try {
        if (ws) await ws.disconnect()
        commit('SET_IS_CONNECT', false)
      } catch (err) {
        console.warn(err)
      }
    }
  }
}
