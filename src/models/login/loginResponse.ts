type LoginResponse = {
  data: {
    token: string;
    expiration: Date;
  };
  success: boolean;
  message: string;
  resultCode: string;
};
