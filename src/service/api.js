const API_PROXY_PREFIX = "http://localhost:8081";
// prod
const PROD_URL = "http://101.43.245.160:8081";
//base url
const BASE_URL = process.env.NODE_ENV === "production" ? PROD_URL : API_PROXY_PREFIX;
//导出api服务地址
module.exports = {
  LIST_ALL_USERS: `${BASE_URL}/user/all`,
  PUBLISH_NEWS: `${BASE_URL}/news/add/2`,
  GET_USER_DETAIL: `${BASE_URL}/user/2`,
  GET_NEWS_DETAIL: `${BASE_URL}/news`,
  GET_NEWS_COMMENTS: `${BASE_URL}/news`,
  UPLOAD_AVATAR: `${BASE_URL}/files/avatars`,
  UPLOAD_IMAGE: `${BASE_URL}/files/test`,
  LIKE_NEWS: `${BASE_URL}/likes`,
  UNLIKE_NEWS: `${BASE_URL}/likes`,
  ADD_COMMENT: `${BASE_URL}/comment`,
  ADD_FILE: `${BASE_URL}/files/add`,
  UPDATE_NEWS_COVER: `${BASE_URL}/news`,
  UPDATE_USER_INFO: `${BASE_URL}/user`,
  LOGIN: `${BASE_URL}/user/login`,
};
