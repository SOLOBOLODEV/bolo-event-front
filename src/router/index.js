import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { userSessionStore } from "../stores/userSession";
import DashboardView from "../views/DashboardView.vue";
import EventView from "../views/EventView.vue";
import CreateEventView from "../views/CreateEventView.vue";
import JoinedEventsView from "../views/JoinedEventsView.vue";

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
      }
    },
    {
      path:"/events",
      name:"events",
      component: EventView,
      meta: {
        needsAuth: true
      }
    },  
    {
      path:"/create-event",
      name:"create-event",
      component: CreateEventView,
      meta: {
        needsAuth: true
      }
    },
    {
      path:"/joined-events",
      name:"joined-events",
      component: JoinedEventsView,
      meta: {
        needsAuth: true
      }
    }
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
  return next("/dashboard");
});

export default router;
