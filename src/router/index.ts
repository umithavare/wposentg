import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import paymentreq from "@/views/paymentreq.vue";
import paymentresult from "@/views/paymentresult.vue";
import paymentresultreq from "@/views/paymentresultreq.vue";
import defaultLayout from "@/layouts/side-nav-outer-toolbar.vue";
import simpleLayout from "@/layouts/single-card.vue";
import { useAuthStore } from "@/stores/authStore";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/paymentreq",
    name: "paymentreq",
    meta: {
      requiresAuth: true,
      layout: defaultLayout,
    },
    component: paymentreq,
  },

  {
    path: "/paymentresultreq",
    name: "paymentresultreq",
    meta: {
      requiresAuth: true,
      layout: defaultLayout,
    },
    component: paymentresultreq,
  },

  {
    path: "/paymentresult",
    name: "paymentresult",
    meta: {
      requiresAuth: true,
      layout: defaultLayout,
    },
    component: paymentresult,
  },
  {
    path: "/login-form",
    name: "login-form",
    meta: {
      requiresAuth: false,
      layout: simpleLayout,
      title: "Web Api Test Login",
    },
    component: loadView("login-form"),
  },
  {
    path: "/",
    redirect: "/paymentreq",
  },
  {
    path: "/recovery",
    redirect: "/home",
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/paymentreq",
  },
];

function loadView(view: string) {
  return () => import(`@/views/${view}.vue`);
}

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!authStore.success) {
      next("/login-form");
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
