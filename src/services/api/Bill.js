import request from '@/services/network/request'
export default {
  index(page = 1) {
    return request({
      url: 'bills?page=' + page,
      method: 'get'
    })
  },
  myBills(page = 1) {
    return request({
      url: 'my-bills?page=' + page,
      method: 'get'
    })
  },
  show(id) {
    return request({
      url: 'bills/' + id,
      method: 'get'
    })
  },
  store(data) {
    return request({
      url: 'bills',
      method: 'post',
      data
    })
  },
  update(data) {
    return request({
      url: 'bills/' + data.id,
      method: 'put',
      data
    })
  }
}
