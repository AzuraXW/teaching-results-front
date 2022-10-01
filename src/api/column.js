import request from "../utils/request";
export function getColumn() {
  return request.get("/column");
}

export function getColumnContent() {
  return request.get("/column/1/content");
}
