import request from '../utils/request'
function getBanner () {
  return request.get('/banner')
}

export {
  getBanner
}