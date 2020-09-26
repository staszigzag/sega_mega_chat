import { SocketCustom } from '../models/SocketCustom'

const baseURL = '/ws'

export function getSocket(userName) {
  if (!userName) throw new Error('user name is required')
  return new SocketCustom({
    url: `${process.env.VUE_APP_SOCKET_BASE_URL}${baseURL}?username=${userName}`,
    reconnection: true
  })
}
