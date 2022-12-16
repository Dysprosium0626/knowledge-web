import { createRouter, createWebHistory } from "vue-router";
// import Cookies from "js-cookie";
const routes = [
  {
    path: "/",
    redirect: "/main/table",
  },
  {
    path: "/login",
    name: "login-pannel",
    component: () => import("@/pages/login/login-pannel.vue"),
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
        path: "/main/user-center",
        name: "user-center",
        component: () => import("@/pages/user-center/user-center.vue"),
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
// router.beforeEach((to) => {
//   if (to.path !== "/login") {
//     const token = Cookies.get("insider-token");
//     if (!token) {
//       return "/login";
//     }
//   } else if (to.path === "/login") {
//     const token = Cookies.get("insider-token");
//     if (token) {
//       return "/main";
//     }
//   }
// });

export default router;
