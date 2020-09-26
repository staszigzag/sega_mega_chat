const STATUS = {
  CONNECTING: 0,
  OPEN: 1,
  CLOSING: 2,
  CLOSED: 3
}

export class SocketCustom {
  constructor({ url, reconnection = false, reconnectionTime = 1000, reconnectionAttempts = 5 }) {
    if (!url) throw new Error('url is required')
    this._ws = null
    this.url = url

    this.reconnection = reconnection
    this.reconnectionTime = reconnectionTime
    // TODO количество попыток подключиться
    this.countReconnect = 0
    this.reconnectionAttempts = reconnectionAttempts
    this.isActive = false
    // TODO переделать на "Наблюдатель"
    this.onmessage = () => {}
  }

  connect() {
    return new Promise((resolve, reject) => {
      // так как при не удачном подключении нужно повторить попытку, и нельзя потерять resolve
      // логика завернута в отдельную функцию
      const reconnect = async () => {
        if (this._ws) {
          this.disconnect()
        }
        this._ws = new WebSocket(this.url)
        // TODO reject
        this._ws.onopen = () => {
          console.warn('SocketCustom connect')
          resolve()
        }
        this._ws.onmessage = event => {
          this.onmessage(event.data)
        }
        // this._ws.onerror = () => {
        //   console.warn('WebSocket error')
        // }
        // кокда идет переподключение мы теряем все сообщения
        // TODO по хорошему нужно при повторном соединении просить историю, что бы не терять месаги
        this._ws.onclose = () => {
          // при закрытие, пытаемся заново подключится, но так не всегда нужно делать
          if (this.reconnection) setTimeout(reconnect, this.reconnectionTime)
        }
      }
      reconnect()
    })
  }

  send(msg) {
    if (!this._ws || this._ws.readyState !== STATUS.OPEN) throw new Error('SocketCustom is already')
    this._ws.send(msg)
  }

  disconnect() {
    return new Promise(resolve => {
      this._ws.onclose = () => {
        console.warn('SocketCustom disconnect')
        resolve()
      }
      this._ws.close()
    })
  }
}
