import request from '../utils/request'
function getIntroduction () {
  return request.get('/introduction')
}

export {
    getIntroduction
}