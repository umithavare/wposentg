type PaymentResponses = {
  data: {
    responseMessage: string;
    orderId: string;
    returnUrl: string;
    errorCode: string;
    status: string;
    paymentId: string;
    paymentData: string | any;
    returnType: number;
  };
  success: boolean;
  message: string;
  resultCode: string;
};
