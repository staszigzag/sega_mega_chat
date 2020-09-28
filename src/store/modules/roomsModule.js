import api from '../../api'
import store from '../index'
import messagesNotifications from '../../utility/messagesNotifications'
import { Room } from '../../models/Room'
import { Message } from '../../models/Message'

export default {
  namespaced: true,
  state: {
    rooms: [],
    currentRoom: null,
    activeRooms: []
  },
  mutations: {
    SET_ROOMS(state, rooms) {
      // комнаты которые были созданы, но в них не чего не писали, и их в комнатах с сервера еще нет
      const customRooms = state.rooms.filter(r => !r.lastMessage)
      state.rooms = [...rooms, ...customRooms]
    },
    ADD_ROOM(state, room) {
      state.rooms.push(room)
    },
    RESET_ROOMS(state) {
      if (state.currentRoom) state.currentRoom.isCurrent = false
      state.currentRoom = null
      state.activeRooms.forEach(r => (r.isActive = false))
      state.activeRooms = []
    },
    SET_CURRENT_ROOM(state, room) {
      if (state.currentRoom) {
        state.currentRoom.isCurrent = false
      }
      room.isCurrent = true
      state.currentRoom = room
    },
    ADD_ACTIVE_ROOM(state, room) {
      room.isActive = true
      state.activeRooms.push(room)
    },
    ADD_NEW_MESSAGE(state, msg) {
      // добавляем только активным румам, т.е. последние сообщение реактивно будет меняется только в них
      // на случай одинаковых комнат берем фильтр
      const rooms = state.activeRooms.filter(r => r.name === msg.room)
      rooms.forEach(r => {
        r.addMessageInStore(msg)
      })
    }
  },
  actions: {
    async getRooms({ commit, dispatch }) {
      try {
        const { result } = await api.main.getRooms()
        const rooms = result.map(r => new Room(r))
        console.info('rooms from api', rooms)
        commit('SET_ROOMS', rooms)
        store.dispatch('notifications/showNotification', { text: messagesNotifications.getRooms })
      } catch (err) {
        console.warn(err)
        setTimeout(() => dispatch('getRooms'), store.state.settings.settings.reconnectionTime)
      }
    },
    // локально создаем и делаем активной
    async createRoom({ commit }, name) {
      try {
        const room = new Room({ name })
        console.info('new local room', room)
        commit('ADD_ROOM', room)
        commit('ADD_ACTIVE_ROOM', room)
        commit('SET_CURRENT_ROOM', room)
      } catch (err) {
        store.dispatch('notifications/showNotification', { text: messagesNotifications.errorSetRooms, type: 'error' })
        console.warn(err)
        throw err
      }
    },
    // создаем рум из сообщения сокета
    async createAutoRoom({ commit }, msg) {
      try {
        const room = new Room({ name: msg.room })
        room.addMessageInStore(msg)
        console.info('new auto room from api', room)
        commit('ADD_ROOM', room)
        store.dispatch('notifications/showNotification', { text: `${messagesNotifications.createAutoRoom} ${room.name}` })
      } catch (err) {
        store.dispatch('notifications/showNotification', { text: messagesNotifications.errorSetRooms, type: 'error' })
        console.warn(err)
      }
    },
    async processNewMessage({ commit, dispatch, state }, rawMsg) {
      try {
        const message = new Message(JSON.parse(rawMsg))
        console.info('new messages ', message)
        // ищем доступные для сообщения комнаты
        const isExistRooms = state.rooms.find(r => r.name === message.room)
        if (isExistRooms) commit('ADD_NEW_MESSAGE', message)
        // есле нет то создаем новую
        else dispatch('createAutoRoom', message)
      } catch (err) {
        store.dispatch('notifications/showNotification', { text: messagesNotifications.errorProcessMessages, type: 'error' })
        console.warn(err)
      }
    },
    async getHistory({ commit, dispatch }, room) {
      try {
        // у кастомных комнат в которые не писали, нет последнего сообщения
        if (!room.lastMessage) return
        const { result } = await api.main.getHistory(room.name)
        const messages = result.map(m => new Message(m))
        room.addMessagesInHistory(messages)
        console.info(`message for ${room.name}`, messages)
        store.dispatch('notifications/showNotification', { text: `${messagesNotifications.getHistory} ${room.name}` })
      } catch (err) {
        console.warn(err)
        setTimeout(() => dispatch('getHistory', room), store.state.settings.settings.reconnectionTime)
      }
    },
    async initActiveRoom({ commit, dispatch }, room) {
      try {
        if (room.isActive) return
        commit('ADD_ACTIVE_ROOM', room)
        commit('SET_CURRENT_ROOM', room)
        dispatch('getHistory', room)
      } catch (err) {
        store.dispatch('notifications/showNotification', { text: messagesNotifications.errorGetMessages, type: 'error' })
        console.warn(err)
        throw err
      }
    }
  }
}
