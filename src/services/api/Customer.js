import request from '@/services/network/request'
export default {
  index(page = 1) {
    return request({
      url: 'customer?page=' + page,
      method: 'get'
    })
  },
  show(id) {
    return request({
      url: 'customer/' + id,
      method: 'get'
    })
  },
  store(data) {
    return request({
      url: 'customer',
      method: 'post',
      data
    })
  },
  update(data) {
    return request({
      url: 'customer/' + data.id,
      method: 'put',
      data
    })
  },
  delete(id) {
    return request({
      url: 'customer/' + id,
      method: 'delete'
    })
  }
}
