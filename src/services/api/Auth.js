import request from '@/services/network/request'
export default {
  login(data) {
    return request({
      url: '/auth/login',
      method: 'post',
      data
    })
  },
  getInfo() {
    return request({
      url: '/auth/info',
      method: 'get'
    })
  },
  logout() {
    return request({
      url: '/auth/logout',
      method: 'get'
    })
  }
}
