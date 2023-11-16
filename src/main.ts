import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import Notifications from "@kyvg/vue3-notification";
import appInfo from "./app-info";

  const app = createApp(App);
  const pinia = createPinia();
  pinia.use(piniaPluginPersistedstate);
  app.use(pinia);
  app.use(router);
  app.use(Notifications);
  app.config.globalProperties.$appInfo = appInfo;
  app.mount("#app");