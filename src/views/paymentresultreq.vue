<template>
  <div>
    <h2>Web Api Payment Result Request Form</h2>
    <div class="registration-form">
      <form>
        <div class="form-group">
          <input
            type="text"
            class="form-control item"
            id="amount"
            v-model="paymentResultRequest.paymentId"
            placeholder="paymentId"
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            class="form-control item"
            id="currencyCode"
            v-model="paymentResultRequest.orderId"
            placeholder="orderId"
          />
        </div>
        <div class="form-group">
          <button
            @click="submitPaymentResultRequest"
            type="button"
            class="btn btn-block create-request"
          >
            Sorgula
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style>
.registration-form form {
  background-color: #fff;
  max-width: 600px;
  margin: auto;
  padding: 50px 70px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.075);
}

.registration-form .item {
  border-radius: 20px;
  margin-bottom: 25px;
  padding: 10px 20px;
}

.registration-form .create-request {
  border-radius: 30px;
  padding: 10px 20px;
  font-size: 18px;
  font-weight: bold;
  background-color: #5791ff;
  border: none;
  color: white;
  margin-top: 20px;
}

@media (max-width: 576px) {
  .registration-form form {
    padding: 50px 20px;
  }
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import { useNotification } from "@kyvg/vue3-notification";
import paymentResultRequestService from "@/services/paymentResultRequestService";
const { notify } = useNotification();
export default defineComponent({
  name: "PaymentResultReqPage",
  data() {
    return {
      paymentResultRequest: {
        paymentId: "",
        orderId: "",
      },
      loading: false,
    };
  },

  methods: {
    async submitPaymentResultRequest() {
      debugger;
      try {
        const response: any =
          await paymentResultRequestService.PaymentResultRequest(
            this.paymentResultRequest
          );
        // this.paymentHtml = response.data.data.paymentData;
        if (response.data.data.status =="SUCCESS") {
          debugger;
          notify({
            type: "success",
            title: "payment Result Process",
            text: "Success",
          });
        } else {
          notify({
            type: "error",
            title: "payment Result Process",
            text: "Error",
          });
        }
      } catch (error) {
        notify({
          type: "error",
          title: "payment Result Process",
          text: "Error",
        });
      }
    },
  },
});
</script>
