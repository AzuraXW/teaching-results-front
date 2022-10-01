import request from "../utils/request";
export function getHonors() {
  return request.get("/honors");
}
