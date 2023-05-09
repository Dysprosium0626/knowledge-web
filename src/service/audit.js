import { request, METHOD } from "@/utils/request";
import { LIST_ALL_AUDITS, VERIFY_IMAGE } from "@/service/api";

export async function getAllAudits() {
  return request(LIST_ALL_AUDITS, METHOD.GET);
}

export async function verifyImage(id, verify) {
  return request(`${VERIFY_IMAGE}?id=${id}&verify=${verify}`, METHOD.PUT);
}
