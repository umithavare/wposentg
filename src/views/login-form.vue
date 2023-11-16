<template>
  <form class="login-form" @submit.prevent="login">
    <div class="form-group">
      <label for="userName">Telefon</label>
      <input
        type="text"
        id="userName"
        v-model="credentials.userName"
        placeholder="Telefon"
        class="form-control"
      />
    </div>
    <div class="form-group">
      <label for="password">Şifre</label>
      <input
        type="password"
        id="password"
        v-model="credentials.password"
        placeholder="Şifre"
        class="form-control"
      />
    </div>
    <button type="submit" class="btn btn-primary">Giriş Yap</button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useAuthStore } from "../stores/authStore";
import HTTP from "@/http";
import * as CryptoJS from "crypto-js";
import { useNotification } from "@kyvg/vue3-notification";
const { notify } = useNotification();
const authStore = useAuthStore();

export default defineComponent({
  data() {
    return {
      credentials: {
        userName: "",
        password: "",
        lat: "",
        long: "",
      },
      loading: false,
    };
  },
  methods: {
    async login() {
      const sendCredentials = JSON.parse(JSON.stringify(this.credentials));
      debugger; // eslint-disable-line no-debugger
      sendCredentials.password = CryptoJS.SHA512(
        sendCredentials.password
      ).toString();
      try {
        const response = await HTTP.post("/api/Auth/login", sendCredentials);
        debugger;
        if (response.data.success) {
          debugger;
          notify({
            type: "success",
            title: "Login Process",
            text: "Success",
          });
          authStore.login(response.data);
          this.$router.push("/home");
        } else {
          notify({
            type: "error",
            title: "Login Process",
            text: "Error",
          });
        }
      } catch (error) {
        notify({
          type: "error",
          title: "Login Process",
          text: "Error",
        });
      }
    },
    logout() {
      notify({
        type: "success",
        title: "Logout Process",
        text: "Success",
      });
      authStore.logout();
    },
  },
});
</script>

<style lang="scss">

.login-form {
  .link {
    text-align: center;
    font-size: 16px;
    font-style: normal;

    a {
      text-decoration: none;
    }
  }

  .form-text {
    margin: 10px 0;
  }
}
</style>
