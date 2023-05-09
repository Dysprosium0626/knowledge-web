import axios from "axios";

// http method
const METHOD = {
  GET: "get",
  POST: "post",
  DELETE: "delete",
  PUT: "put",
};

/**
 * axios请求
 * @param url 请求地址
 * @param method {METHOD} http method
 * @param params 请求参数
 * @returns {Promise<AxiosResponse<T>>}
 */
async function request(url, method, params, config) {
  switch (method) {
    case METHOD.GET:
      return axios.get(url, { params, ...config });
    case METHOD.POST:
      return axios.post(url, params, config);
    case METHOD.PUT:
      return axios.put(url, params, config);
    case METHOD.DELETE:
      return axios.delete(url, params, config);
    default:
      return axios.get(url, { params, ...config });
  }
}

export { METHOD, request };
