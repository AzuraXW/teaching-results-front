import request from "../utils/request"

export function getFooterData () {
  return request.get('/footer')
}