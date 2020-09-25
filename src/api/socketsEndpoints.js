const baseURL = '/ws'

export async function getSocket(userName) {
  const url = `${process.env.VUE_APP_SOCKET_BASE_URL}${baseURL}?username=${userName}`
  const ws = await new WebSocket(url)
  return ws
}
