import { request, METHOD } from "@/utils/request";
import { ADD_FILE } from "@/service/api";

export async function insertFile(url) {
  return request(ADD_FILE, METHOD.POST, url);
}
