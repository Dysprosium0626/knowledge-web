import { request, METHOD } from "@/utils/request";
import { LIST_ALL_LOGS } from "@/service/api";

export async function getAllLogs() {
  let start = 1;
  let limit = 100;
  return request(`${LIST_ALL_LOGS}?start=${start}&limit=${limit}`, METHOD.GET);
}
