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
        // TODO переподключение
        const connect = await api.ws.getSocket(userName)
        await new Promise(resolve => {
          connect.onopen = () => {
            // TODO проверить что успешно
            connect.onmessage = event => {
              // отдаем в стор на обработку
              store.dispatch('rooms/processNewMessage', event.data)
            }
            ws = connect
            store.dispatch('notifications/showNotification', { text: messagesNotifications.initSocket })
            resolve()
          }
        })
        commit('SET_IS_CONNECT', true)
      } catch (err) {
        dispatch('disconnectSocket')
        store.dispatch('notifications/showNotification', { text: messagesNotifications.errorGetInitSocket, type: 'error' })
        console.error(err)
      }
    },
    async sendSocket({ commit, state }, msg) {
      try {
        // TODO проверка на доставку
        msg = JSON.stringify(msg)
        await ws.send(msg)
      } catch (err) {
        store.dispatch('notifications/showNotification', { text: messagesNotifications.errorSendSocket, type: 'error' })
        console.error(err)
      }
    },
    async disconnectSocket({ commit }) {
      try {
        await ws.close()
        commit('SET_IS_CONNECT', false)
      } catch (err) {
        console.error(err)
      }
    }
  }
}
