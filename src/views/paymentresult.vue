<template>
  <div>
    <h2>Callback URL</h2>
    <p v-if="processing">Callback işlemi başladı...</p>
    <div v-else-if="resultReceived">
      <h3>Ödeme Sonucu</h3>
      <p v-if="paymentResult">Ödeme Başarılı</p>
      <p v-else>Ödeme Başarısız</p>
      <p>{{ paymentResult.message }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import paymentResultRequestService from "@/services/paymentResultRequestService";
export default defineComponent({
  name: "PaymentResultPage",
  data() {
    return {
      resultReceived: false,
      processing: true,
      paymentResult: "" as any,
      paymentResultRequest: {
        paymentId: "",
        orderId: "",
      },
      loading: false,
    };
  },
  created() {
    const params: any = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop: string) => searchParams.get(prop),
    });

    console.log(params.orderId);
    console.log(params.paymentId);
    (this.paymentResultRequest.paymentId = params.paymentId),
      (this.paymentResultRequest.orderId = params.orderId);
    this.getPaymentResult();
  },
  methods: {
    async getPaymentResult() {
      try {
        debugger;
        const response: any =
          await paymentResultRequestService.PaymentResultRequest(
            this.paymentResultRequest
          );
           if(response.data.data.status =="SUCCESS")
          {
            this.paymentResult = true ;
          }
        this.processing = false;
        this.resultReceived = true;
        debugger;
      } catch (error) {
        debugger;
        console.error("Ödeme sonucu alınamadı:", error);
        this.processing = false;
      }
      return {
        success: true, // Ödeme başarılı mı?
        message: "Ödeme başarılı! Teşekkür ederiz.",
      };
    },
  },
});
</script>
