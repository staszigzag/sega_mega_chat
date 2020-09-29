import { SocketCustom } from '../models/SocketCustom'

const baseURL = '/ws'
const url = new URL(baseURL, process.env.VUE_APP_SOCKET_BASE_URL)

export function getSocket(userName) {
  if (!userName) throw new Error('user name is required')
  url.searchParams.set('username', userName)
  return new SocketCustom({
    url: url.href,
    reconnection: true
  })
}
