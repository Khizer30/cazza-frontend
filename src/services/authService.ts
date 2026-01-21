import apiInvoker from "@/lib/apiInvoker";
import { END_POINT } from "@/lib/url";
import type {
  FORGOTPASSWORD_PAYLOAD,
  FORGOTPASSWORD_RESPONSE,
  GOOGLE_AUTH_RESPONSE,
  GOOGLE_CALLBACK_PAYLOAD,
  GOOGLE_CALLBACK_RESPONSE,
  LOGIN_PAYLOAD,
  LOGIN_RESPONSE,
  SETNEWPASSWORD_PAYLOAD,
  SETNEWPASSWORD_RESPONSE,
  SIGNUP_PAYLOAD,
  SIGNUP_RESPONSE,
} from "@/types/auth";

export const signInService = (paylaod: LOGIN_PAYLOAD) => {
  return apiInvoker<LOGIN_RESPONSE>(END_POINT.auth.login, "POST", paylaod);
};

export const signUpService = (paylaod: SIGNUP_PAYLOAD) => {
  return apiInvoker<SIGNUP_RESPONSE>(END_POINT.auth.signup, "POST", paylaod);
};

export const forgotPasswordService = (paylaod: FORGOTPASSWORD_PAYLOAD) => {
  return apiInvoker<FORGOTPASSWORD_RESPONSE>(
    END_POINT.auth.forgotPassword,
    "POST",
    paylaod
  );
};

export const setNewPasswordService = (paylaod: SETNEWPASSWORD_PAYLOAD) => {
  return apiInvoker<SETNEWPASSWORD_RESPONSE>(
    END_POINT.auth.setNewPassowrd,
    "POST",
    paylaod
  );
};

export const getGoogleAuthUrlService = () => {
  return apiInvoker<GOOGLE_AUTH_RESPONSE>(END_POINT.auth.google, "GET");
};

export const googleCallbackService = (payload: GOOGLE_CALLBACK_PAYLOAD) => {
  return apiInvoker<GOOGLE_CALLBACK_RESPONSE>(
    END_POINT.auth.googleCallback,
    "POST",
    payload
  );
};

export const logoutService = () => {
  return apiInvoker<{ success: boolean; message: string }>(
    END_POINT.auth.logout,
    "GET"
  );
};
