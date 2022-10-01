import { createRouter, createWebHistory } from "vue-router";
import afterEach from "./afterEach";
import Home from "../views/Home.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        title: "首页",
      },
    },
    {
      path: "/show/:id",
      name: "show",
      component: () => import("../views/Show.vue"),
    },
  ],
});

router.afterEach(afterEach);

export default router;
