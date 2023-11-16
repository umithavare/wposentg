import axios from "axios";
import { useAuthStore } from "@/stores/authStore";
import router from "@/router";
const api_url = process.env.VUE_APP_BASE_URL;
export const controller = new AbortController();
const instance = axios.create({
  baseURL: api_url,
  timeout: 180000,
  // crossdomain: true,
  headers: {
    "Content-Type": "application/json",
  },
  signal: controller.signal,
});

instance.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    const expiration = authStore.data.expiration;
    const currentDate = new Date();

    if (expiration! <= currentDate) {
      // Token süresi dolmuş, logout işlemini başlat
      authStore.logout();
      router.push({ name: "login-form" });
    }
    
    // Burada authorize olmak için token başına Bearer yazıyoruz
    config.headers["Authorization"] = `Bearer ${authStore.data.token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    error.errorMessages = [];
    const authStore = useAuthStore();
    if (error?.response?.resultCode === 401) {
      instance.defaults.headers.Authorization = null;
      authStore.logout();
      router.push({ name: "login-form" });
    }

    if (error?.response?.data?.Errors) {
      const errorsArray = error.response.data.Errors;
      errorsArray.forEach((err: any) => {
        if (err.InnerException == null) {
          error.errorMessages.push(err.Message);
        } else {
          error.errorMessages.push(
            getInnerExceptionMessage(err.InnerException)
          );
        }
      });
    }
    return Promise.reject(error);
  }
);

function getInnerExceptionMessage(innerException: any, level = 0): any {
  //alert(innerException.Message + " -- " + level); // level tamemen bug takibi için.
  if (innerException?.InnerException != null) {
    return getInnerExceptionMessage(innerException.InnerException, level + 1);
  } else {
    return innerException?.Message || "Hata Yaptın";
  }
}

export default instance;
