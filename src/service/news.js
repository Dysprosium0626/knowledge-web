import { request, METHOD } from "@/utils/request";
import { LIST_ALL } from "@/service/api";

export async function listNews() {
  return request(LIST_ALL, METHOD.GET);
}
