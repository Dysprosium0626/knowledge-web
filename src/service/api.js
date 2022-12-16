const API_PROXY_PREFIX = "/api";
// qa 110.42.187.29
// prod
const PROD_URL = "http://110.42.187.29:8081";
//base url
const BASE_URL = process.env.NODE_ENV === "production" ? PROD_URL : API_PROXY_PREFIX;
//导出api服务地址
module.exports = {
  LIST_ALL: `${BASE_URL}/news/all`,
};
