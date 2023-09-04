import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ErrorView from "../views/ErrorView.vue";
import axios from "axios";

const authCheck = async (to, from, next) => {
  try {
    await axios.get("/auth");
    next();
  } catch (err) {
    location.href = "/login";
  }
};

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: "/home",
      name: "home",
      component: HomeView,
      beforeEnter: authCheck,
    },
    {
      path: "/error",
      name: "error",
      component: ErrorView,
      props: (route) => ({
        error: route.query.error,
        error_description: route.query.error_description,
      }),
    },
    {
      path: "/",
      redirect: "/home",
    },
  ],
});

export default router;
