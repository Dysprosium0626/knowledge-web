import { request, METHOD } from "@/utils/request";
import {
  CREATE_ORG,
  DUPLI_GUIDE,
  GET_USERS,
  GET_ORGS,
  MOCK_LOGIN,
  GUIDES_BY_ORGID,
  DOWNLOAD_CRX,
  GET_APPS,
  CLEAR_METRIC,
  QUERY_GUIDE_VISITOR_RECORDS,
} from "@/service/api";
import Cookies from "js-cookie";

export async function createOrg2Backend(org) {
  return request(CREATE_ORG, METHOD.POST, org, {
    headers: {
      Authorization: "Bearer " + Cookies.get("insider-token"),
    },
  });
}

export async function downloadCRX(info) {
  return request(DOWNLOAD_CRX, METHOD.POST, info, {
    headers: {
      Authorization: "Bearer " + Cookies.get("insider-token"),
    },
    responseType: "blob",
  });
}

export async function dupliGuideCross(guidePack) {
  return request(DUPLI_GUIDE, METHOD.POST, guidePack, {
    headers: {
      Authorization: "Bearer " + Cookies.get("insider-token"),
    },
  });
}

export async function mockLogin4info(userInfo) {
  return request(MOCK_LOGIN, METHOD.POST, userInfo, {
    headers: {
      Authorization: "Bearer " + Cookies.get("insider-token"),
    },
  });
}

export async function getAllOrgs() {
  return request(GET_ORGS, METHOD.POST, null, {
    headers: {
      Authorization: "Bearer " + Cookies.get("insider-token"),
    },
  });
}

export async function getAllApps(orgId) {
  return request(
    GET_APPS,
    METHOD.POST,
    {
      orgId: orgId,
    },
    {
      headers: {
        Authorization: "Bearer " + Cookies.get("insider-token"),
      },
    }
  );
}

export async function getAllUsers() {
  return request(GET_USERS, METHOD.POST, null, {
    headers: {
      Authorization: "Bearer " + Cookies.get("insider-token"),
    },
  });
}
// queryGuidesByOrgId
export async function queryGuidesByOrgId(orgId) {
  return request(
    GUIDES_BY_ORGID,
    METHOD.POST,
    { orgId: orgId },
    {
      headers: {
        Authorization: "Bearer " + Cookies.get("insider-token"),
      },
    }
  );
}

export async function clearGuideMetric(guideMetric) {
  return request(CLEAR_METRIC, METHOD.POST, guideMetric, {
    headers: {
      Authorization: "Bearer " + Cookies.get("insider-token"),
    },
  });
}

export async function queryGuideVisitorRecords(guideMetric) {
  return request(QUERY_GUIDE_VISITOR_RECORDS, METHOD.POST, guideMetric, {
    headers: {
      Authorization: "Bearer " + Cookies.get("insider-token"),
    },
  });
}
