import axios from '../config/axios'

const baseURL = '/api/'

export async function getConfig() {
  const { data } = await axios.get(`${baseURL}settings`)
  return data
}
export async function getRooms() {
  const { data } = await axios.get(`${baseURL}rooms`)
  return data
}
export async function getHistory(name) {
  const { data } = await axios.get(`${baseURL}rooms/${name}/history`)
  return data
}
