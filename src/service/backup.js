import { request, METHOD } from "@/utils/request";
import { LIST_ALL_BACKUPS, ROLLBACK_BACKUP, BACKUP_DB } from "@/service/api";

export async function getAllBackups() {
  return request(LIST_ALL_BACKUPS, METHOD.GET);
}

export async function rollbackBackup(id) {
  return request(`${ROLLBACK_BACKUP}/${id}`, METHOD.PUT);
}

export async function backupDatabase() {
  return request(`${BACKUP_DB}`, METHOD.POST);
}
