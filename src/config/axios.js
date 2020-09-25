import axios from 'axios'
import store from '../store'

console.log(process.env.VUE_APP_API_BASE_URL)
// Axios Instance
const axiosConfig = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL
  // withCredentials: true
})

// Add Access Token
// const addToken = config => {
// const token = store.state.authorisationModule.token
// if (token) {
//   config.headers.Authorization = `Token ${token}`
// }
// }

// Request Interceptor
// axiosConfig.interceptors.request.use(
//   config => {
//     addToken(config)
//     return config
//   },
//   error => Promise.reject(error)
// )

export default axiosConfig
