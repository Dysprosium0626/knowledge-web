import { request, METHOD } from "@/utils/request";
import {
  GET_USER_DETAIL,
  UPLOAD_AVATAR,
  UPDATE_USER_INFO,
  LOGIN,
  LIST_ALL_USERS,
} from "@/service/api";

export async function getUserDetail() {
  return request(GET_USER_DETAIL, METHOD.GET);
}

export async function updateUserAvatar(userId) {
  let headers = { "Content-Type": "multipart/form-data" };
  return request(`${UPLOAD_AVATAR}/${userId}`, METHOD.POST, headers);
}

export async function updateUserInfo(userId, data) {
  return request(`${UPDATE_USER_INFO}/${userId}`, METHOD.PUT, data);
}

export async function login(username, password) {
  return request(LOGIN, METHOD.POST, { username: username, password: password });
}

export async function getAllUsers() {
  return request(LIST_ALL_USERS, METHOD.GET);
}
