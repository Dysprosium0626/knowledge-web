const API_PROXY_PREFIX = "/api";
// qa
// prod
const PROD_URL = "http://****:8065/insider";
//base url
const BASE_URL = process.env.NODE_ENV === "production" ? PROD_URL : API_PROXY_PREFIX;
//导出api服务地址
module.exports = {
  LOGIN: `${BASE_URL}/auth/login`,
  CREATE_ORG: `${BASE_URL}/org/createNewOrg`,
  DUPLI_GUIDE: `${BASE_URL}/business/copyGuideCrossOrg`,
  GET_USERS: `${BASE_URL}/org/listUsers`,
  GET_ORGS: `${BASE_URL}/org/listOrgs`,
  MOCK_LOGIN: `${BASE_URL}/business/mockLogin`,
  GUIDES_BY_ORGID: `${BASE_URL}/guide/queryGuidesByOrgId`,
  DOWNLOAD_CRX: `${BASE_URL}/org/download`,
  GET_APPS: `${BASE_URL}/org/getAppsUnderOrg`,
  CLEAR_METRIC: `${BASE_URL}/guide/clearGuideMetric`,
  QUERY_GUIDE_VISITOR_RECORDS: `${BASE_URL}/guide/queryVisitorGuideRecord`,
};
