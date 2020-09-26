import api from '../../api'
import { Settings } from '../../models/Settinds'
import messagesNotifications from '../../utility/messagesNotifications'
import store from '../../store'

export default {
  namespaced: true,
  state: {
    settings: null
  },
  mutations: {
    SET_SETTINGS(state, sets) {
      state.settings = sets
    }
  },
  actions: {
    async getSettings({ commit }) {
      let settings
      try {
        const { result } = await api.main.getConfig()
        settings = new Settings(result)
      } catch (err) {
        // если сломалось ставим дефолтные
        settings = new Settings()
        store.dispatch('notifications/showNotification', { text: messagesNotifications.errorGetSettings, type: 'error' })
      } finally {
        console.info('settings from api', settings)
        commit('SET_SETTINGS', settings)
      }
    }
  }
}
