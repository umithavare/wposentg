import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () =>
    ({
      data: {
        token: "",
        expiration: null,
      },
      success: null,
      message: "",
      resultCode: "",
    } as AuthState),
  persist: true,
  actions: {
    login(response: LoginResponse) {
      debugger; // eslint-disable-line no-debugger 
      this.data = {
        token: response.data?.token || "",
        expiration: new Date(response.data.expiration),
      };
      (this.success = response.success),
        (this.message = response.message),
        (this.resultCode = response.resultCode);
    },
    logout() {
      localStorage.removeItem("auth");
    },
  },
});
