import { Message } from './Message'

export class Room {
  constructor(data) {
    this.name = data.name
    this.isActive = false
    this.isCurrent = false
    this.history = []
    this.messagesStore = []
    this.lastMessage = data.last_message ? new Message(data.last_message) : null
    this.isGetHistory = false
  }

  addMessagesInHistory(messages) {
    // это если история получена раньше первых сообщений
    if (!this.messagesStore.length) {
      // this.lastMessage = messages[messages.length - 1]
      this.lastMessage = messages.pop()
    } else {
      // фильтруем дубликаты
      messages = messages.filter(newMes => !this.messagesStore.find(m => newMes.created === m.created))
    }
    this.history.push(...messages)
    this.isGetHistory = true
  }

  addMessageInStore(msg) {
    this.messagesStore.push(msg)
    this.lastMessage = msg
  }
}
