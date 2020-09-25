import Vue from 'vue'
import Vuex from 'vuex'
import rooms from './modules/roomsModule'
import settings from './modules/settingsModule'
import notifications from './modules/notificationsModule'
import modals from './modules/modalsModule'
import auth from './modules/authModule'
import socket from './modules/socketModule'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    rooms,
    settings,
    notifications,
    modals,
    auth,
    socket
  }
})
