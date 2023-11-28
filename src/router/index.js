import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { userSessionStore } from "../stores/userSession";
import DashboardView from "../views/DashboardView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardView, 
      meta: {
        needsAuth: true
      },
    },
  ]
});

router.beforeEach((to, from, next) => {
  const userSession = userSessionStore();
  if (to.meta.needsAuth) {
    // On vérifie si l'utilisateur est bien connecté
    if (userSession.session) {
      return next();
    } else {
      return next("/");
    }
  }
  return next();
});

export default router;
