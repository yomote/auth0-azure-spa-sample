import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ErrorView from "../views/ErrorView.vue";

import { authGuard } from "@auth0/auth0-vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
      name: "home",
      component: HomeView,
      beforeEnter: authGuard,
    },
    {
      path: "/error",
      name: "error",
      component: ErrorView,
    },
    {
      path: "/",
      redirect: (to) => {
        console.log(to);
        if (to.query.error) return "/error";
        else return "/home";
      },
    },
  ],
});

export default router;
