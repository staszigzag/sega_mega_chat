export class Settings {
  constructor(data = {}) {
    this.maxMessageLength = data.max_message_length || 10500
    this.maxRoomTitleLength = data.max_room_title_length || 50
    this.maxUserNameLength = data.max_username_length || 50
    this.uptime = data.uptime
    this.minLength = 1
    this.sizeChunkMessages = 20
    this.reconnectionTime = 500
  }
}
