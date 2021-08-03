import request from '@/utils/request'

export function getMembers() {
  return request({
    url: 'api/member/all',
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: 'api/member',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/member/',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/member',
    method: 'put',
    data
  })
}

export default { add, edit, del }
