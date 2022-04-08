import axios from 'axios'
import store from '@/store'
import { getToken } from '@/utils/auth'
import Vue from 'vue'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL + '/api/', // url = base url + request url
  timeout: 0 // request timeout
})

service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log('error', error) // for debug
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
      console.log(res.message || 'Error')

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 400) {
        Vue.$toast(res.message)
      }
      if (res.code === 401) {
        // to re-login

        // Vue.$toast('You have been logged out, you can cancel to stay on this page, or log in again')
        store.dispatch('auth/resetToken').then(() => {
          location.reload()
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    alert(error)
    console.log('errpp' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
