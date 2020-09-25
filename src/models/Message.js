export class Message {
  constructor(data) {
    // TODO id
    this.room = data.room
    this.created = data.created
    this.sender = data.sender.username
    this.text = data.text
  }

  get toJSON() {
    return JSON.stringify({
      room: this.room,
      text: this.text
    })
  }
}
