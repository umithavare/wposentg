type AuthState = {
  data: {
    token: string | null;
    expiration: Date | null;
  };
  success: boolean | null;
  message: string | null;
  resultCode: string | null;
};
