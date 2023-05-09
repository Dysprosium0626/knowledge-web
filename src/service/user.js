import { request, METHOD } from "@/utils/request";
import {
  GET_USER_DETAIL,
  LOGIN,
  LIST_ALL_USERS,
  REGISTER,
  GET_USER_BY_ID,
  GET_USER_PERMISSION_BY_ID,
  UPDATE_USER_PERMISSION,
  ADD_USER,
  UPDATE_USER,
} from "@/service/api";

export async function getUserDetail() {
  return request(GET_USER_DETAIL, METHOD.GET);
}

export async function login(username, password) {
  return request(LOGIN, METHOD.POST, { username: username, password: password });
}

export async function resgistry(username, password, email) {
  return request(REGISTER, METHOD.POST, { username: username, password: password, email: email });
}

export async function getAllUsers() {
  return request(LIST_ALL_USERS, METHOD.GET);
}

export async function getUserById(id) {
  return request(`${GET_USER_BY_ID}/${id}`, METHOD.GET);
}

export async function deleteUserById(id) {
  return request(`${GET_USER_BY_ID}/${id}`, METHOD.DELETE);
}

export async function getUserPermissionById(id) {
  return request(`${GET_USER_PERMISSION_BY_ID}/${id}`, METHOD.GET);
}

export async function updateUserPermission(permission) {
  let req = {
    userId: permission.userId,
    canLogin: permission.canLogin == true ? 1 : 0,
    canLike: permission.canLike == true ? 1 : 0,
    canComment: permission.canComment == true ? 1 : 0,
  };

  return request(`${UPDATE_USER_PERMISSION}`, METHOD.PUT, req);
}

export async function updateUser(user) {
  let req = {
    id: user.id,
    email: user.email,
    gender: user.gender,
    isAdmin: user.isAdmin,
    password: user.password,
    username: user.username,
    description: user.description,
  };

  return request(UPDATE_USER, METHOD.PUT, req);
}

export async function addUser(user) {
  let req = {
    email: user.email,
    gender: user.gender,
    isAdmin: user.isAdmin,
    password: user.password,
    username: user.username,
  };

  return request(ADD_USER, METHOD.POST, req);
}
