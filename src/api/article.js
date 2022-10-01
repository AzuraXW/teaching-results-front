import request from "../utils/request";
function getArticle() {
  return request.get("/article");
}

export { getArticle };
