import { request, METHOD } from "@/utils/request";
import { LOGIN } from "@/service/api";
/**
 * 登录服务
 * @param name 账户名
 * @param password 账户密码
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function login(name, password) {
  return request(LOGIN, METHOD.POST, {
    username: name,
    password: password,
  });
}
