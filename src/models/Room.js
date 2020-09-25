import { Message } from './Message'

export class Room {
  constructor(data) {
    this.name = data.name
    this.isActive = false
    this.isCurrent = false
    this.history = []
    this.lastMessage = data.last_message ? new Message(data.last_message) : null

    // TODO
    // Object.defineProperty(this, 'lastMessage', {
    //   get() {
    //     if (this.history.length) return this.history[this.history.length - 1]
    //     else return this._lastMessage
    //   },
    //   set(val) {
    //     this._lastMessage = val
    //   }
    // })
  }

  addMessagesInHistory(...msg) {
    this.history.push(...msg)
    this.lastMessage = msg.pop()
  }
}
