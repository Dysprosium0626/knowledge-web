import { request, METHOD } from "@/utils/request";
import {
  LIST_ALL,
  PUBLISH_NEWS,
  GET_NEWS_DETAIL,
  GET_NEWS_COMMENTS,
  LIKE_NEWS,
  UNLIKE_NEWS,
  ADD_COMMENT,
  UPLOAD_IMAGE,
  UPDATE_NEWS_COVER,
} from "@/service/api";

export async function listNews() {
  return request(LIST_ALL, METHOD.GET);
}

export async function publishNews(title, content) {
  let req = {
    title: title,
    content: content,
  };
  return request(PUBLISH_NEWS, METHOD.POST, req);
}

export async function getNewsDetail(newsId) {
  return request(GET_NEWS_DETAIL + `/${newsId}`, METHOD.GET);
}

export async function getNewsComments(newsId) {
  return request(GET_NEWS_COMMENTS + `/${newsId}/comments`, METHOD.GET);
}

export async function likeNews(userId, newsId) {
  return request(LIKE_NEWS + `/${userId}/${newsId}`, METHOD.POST);
}

export async function unlikeNews(userId, newsId) {
  return request(UNLIKE_NEWS + `/${userId}/${newsId}`, METHOD.DELETE);
}

export async function addComment(userId, newsId, commentContent) {
  let req = {
    userId: userId,
    newsId: newsId,
    commentContent: commentContent,
  };
  return request(ADD_COMMENT, METHOD.POST, req);
}

export async function uploadFile(data) {
  let headers = { "Content-Type": "multipart/form-data" };
  return request(`${UPLOAD_IMAGE}`, METHOD.POST, data, headers);
}

export async function updateNewsCover(newsId, data) {
  let req = {
    id: newsId,
    cover: data,
  };
  return request(`${UPDATE_NEWS_COVER}/${newsId}/user/2`, METHOD.PUT, req);
}
