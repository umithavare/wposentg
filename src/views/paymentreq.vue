<template>
  <div>
    <h2> Web Api Payment Request Form</h2>
    <div class="registration-form">
      <form>
        <label >Amount</label>
        <div class="form-group">
          <input
            type="text"
            class="form-control item"
            id="amount"
            v-model="externalSaleRequest.amount"
            placeholder="Amount"
          />
        </div>  
        <label >Currency(Try:949)</label>
        <div class="form-group">
          <input
            type="text"
            class="form-control item" 
            id="currencyCode"
            v-model="externalSaleRequest.currencyCode"
            placeholder="Currency Code"
          />
        </div>
        <label >Order Id</label>
        <div class="form-group">
          <input
            type="text"
            class="form-control item"
            id="orderId"
            v-model="externalSaleRequest.orderId"
            placeholder="Order ID"
          />
        </div>
        <label >Installement</label>
        <div class="form-group">
          <input
            type="text"
            class="form-control item"
            id="installement"
            v-model="externalSaleRequest.installment"
            placeholder="Installement"
          />
        </div>
        <label >Card Holder Name</label>
        <div class="form-group">
          <input
            type="text"
            class="form-control item"
            id="cardHolderName"
            v-model="externalSaleRequest.cardHolderName"
            placeholder="Card Holder Name"
          />
        </div>
        <label >Card Number</label>
        <div class="form-group">
          <input
            type="text"
            class="form-control item"
            id="cardNumber"
            v-model="externalSaleRequest.cardNumber"
            placeholder="Card Number"
          />
        </div>
        <label >Expire Year</label>
        <div class="form-group">
          <input
            type="text"
            class="form-control item"
            id="expireYear"
            v-model="externalSaleRequest.expireYear"
            placeholder="Expire Year"
          />
        </div>
        <label >Expire Month</label>
        <div class="form-group">
          <input
            type="text"
            class="form-control item"
            id="expireMonth"
            v-model="externalSaleRequest.expireMonth"
            placeholder="Expire Month"
          />
        </div>
        <label >Cvc</label>
        <div class="form-group">
          <input
            type="text"
            class="form-control item"
            id="cvc"
            v-model="externalSaleRequest.cvc"
            placeholder="CVC"
          />
        </div>
        <div class="form-group">
          <label for="isSecureTransaction">Is Secure Transaction:</label>
          <input
            type="checkbox"
            id="isSecureTransaction"
            v-model="externalSaleRequest.isSecureTransaction"
          />
        </div>
        <br>
        <br>  
        <label >Call Back Url</label>
        <div class="form-group">
          <input
            type="text"
            class="form-control item"
            id="callbackUrl"
            v-model="externalSaleRequest.callbackUrl"
            placeholder="Callback URL"
          />
        </div>
        <div class="form-group">
          <button
            @click="submitPaymentRequest"
            type="button"
            class="btn btn-block create-request"
          >
            Gönder
          </button>
          <button
            @click="logout"
            type="button"
            class="btn btn-block create-request"
          >
            yenile
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
import paymentRequestService from "@/services/paymentRequestService";
import HTTP from "@/http";
import { useNotification } from "@kyvg/vue3-notification";
import { json, response } from "express";
import { v4 as uuidv4 } from "uuid";
import { useAuthStore } from "../stores/authStore";
import { ExternalSaleRequest } from "@/models/entity/myApi";
const { notify } = useNotification();
const orderId: string = uuidv4().replace(/-/g, "");
export default defineComponent({
  name: "PaymentReqPage",
  data() {
      const externalSaleRequest: ExternalSaleRequest = {
          amount: 0,
          currencyCode: 0,
          orderId: orderId,
          installment: 1,
          cardHolderName: "",
          cardNumber: "",
          expireYear: "0",
          expireMonth: "0",
          cvc: "",
          isSecureTransaction: true,
          callbackUrl: "https://localhost:7220/Redirect/Receive",
      } 
    return {
      paymentHtml: "" as any,
      paymentLink: "" as any,
      externalSaleRequest : externalSaleRequest,
      paymentResultRequest: {
        paymentId: "",
        orderId: "",  
      },
      loading: false,
    };
  },
  methods: {
    async submitPaymentRequest() {
      debugger;
      const sendCredentials = JSON.parse(
        JSON.stringify(this.externalSaleRequest)
      );
      try {
        const response: any = await paymentRequestService.PaymentRequest(
          sendCredentials
        );
        if (response.data.success) {
          console.log(response.data.data.paymentData);

          if (response.data.data.returnType === 2) {
            this.paymentHtml = response.data.data.paymentData;
            const newWindow = window.open("", "_blank");
            if (newWindow) {
              newWindow.document.write(this.paymentHtml);
              newWindow.document.close();
            } else {
              alert(
                "Yeni pencere açılamadı. Tarayıcı engelleyici veya pop-up engelleyici açık olabilir."
              );
            }
          } else if (response.data.data.returnType === 1) {
            this.paymentLink = response.data.data.returnUrl;
            const newWindow = window.open(this.paymentLink, "_blank");
            if (!newWindow) {
              alert(
                "Yeni pencere açılamadı. Tarayıcı engelleyici veya pop-up engelleyici açık olabilir."
              );
            }
          } else {
            console.log("returnType 1 veya 2 değil");
            alert("Ödeme verileri bulunamadı.");
          }

          debugger;
          notify({
            type: "success",
            title: "payment Process",
            text: "Success",
          });
        }
      } catch (error) {
        notify({
          type: "error",
          title: "payment Process",
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
      const authstore = useAuthStore();
      authstore.logout();
      this.$router.push("/login-form");
    },
  },
});
</script>
