const API_PROXY_PREFIX = "http://101.43.245.160:8081/";
// prod
const PROD_URL = "http://101.43.245.160:8081/";
//base url
const BASE_URL = process.env.NODE_ENV === "production" ? PROD_URL : API_PROXY_PREFIX;
//导出api服务地址
module.exports = {
  LIST_ALL_USERS: `${BASE_URL}/users/all`,
  LIST_ALL_LOGS: `${BASE_URL}/sys/log/page`,
  LIST_ALL_BACKUPS: `${BASE_URL}/mysql/backupsList`,
  ROLLBACK_BACKUP: `${BASE_URL}/mysql/rollback`,
  BACKUP_DB: `${BASE_URL}/mysql/mysqlBackups`,
  LIST_ALL_AUDITS: `${BASE_URL}/audit/all`,
  VERIFY_IMAGE: `${BASE_URL}/audit/verify`,
  LOGIN: `${BASE_URL}/users/login`,
  REGISTER: `${BASE_URL}/users/registry`,
  GET_USER_BY_ID: `${BASE_URL}/users`,
  DELETE_USER_BY_ID: `${BASE_URL}/users`,
  ADD_USER: `${BASE_URL}/users/add`,
  UPDATE_USER: `${BASE_URL}/users/update`,
  GET_USER_PERMISSION_BY_ID: `${BASE_URL}/permission`,
  UPDATE_USER_PERMISSION: `${BASE_URL}/permission/update`,
};
