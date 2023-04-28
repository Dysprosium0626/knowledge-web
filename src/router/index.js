import { createRouter, createWebHistory } from "vue-router";
// import Cookies from "js-cookie";

const routes = [
  {
    path: "/",
    redirect: "/main/table",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/login/login.vue"),
  },
  {
    path: "/main",
    name: "main",
    component: () => import("@/pages/main/main.vue"),
    children: [
      {
        path: "/main/table",
        name: "table",
        component: () => import("@/pages/main-table/main-table.vue"),
      },
      {
        path: "/main/user",
        name: "user",
        component: () => import("@/pages/user-management/user-management.vue"),
      },
      {
        path: "/main/artifact",
        name: "artifact",
        component: () => import("@/pages/artifact-management/artifact-management.vue"),
      },
      {
        path: "/main/log",
        name: "log",
        component: () => import("@/pages/log-management/log-management.vue"),
      },
      {
        path: "/main/backup",
        name: "backup",
        component: () => import("@/pages/backup/backup.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/main",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
