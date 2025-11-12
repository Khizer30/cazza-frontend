import { useToast } from "@/components/ToastProvider";
import {
  forgotPasswordService,
  setNewPasswordService,
  signInService,
  signUpService,
} from "@/services/authService";
import type {
  FORGOTPASSWORD_PAYLOAD,
  SETNEWPASSWORD_PAYLOAD,
  SIGNUP_PAYLOAD,
} from "@/types/auth";
import { setToken } from "@/utils/localStorage";
import { AxiosError } from "axios";

export const useauth = () => {
  const { showToast } = useToast();
  const signIn = async (paylaod: SIGNUP_PAYLOAD) => {
    try {
      const res = await signInService(paylaod);
      if (res) {
        setToken("s");
        showToast("hi", "success");
      }
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof AxiosError) {
        showToast(error.response?.data.message, "error");
      }
    }
  };

  const signUp = async (paylaod: SIGNUP_PAYLOAD) => {
    try {
      const res = await signUpService(paylaod);
      if (res) {
        console.log(res);
      }
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof AxiosError) {
        showToast(error.response?.data.message, "error");
      }
    }
  };
  const forgotPassword = async (paylaod: FORGOTPASSWORD_PAYLOAD) => {
    try {
      const res = await forgotPasswordService(paylaod);
      if (res) {
        console.log(res);
      }
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof AxiosError) {
        showToast(error.response?.data.message, "error");
      }
    }
  };
  const setNewPassword = async (paylaod: SETNEWPASSWORD_PAYLOAD) => {
    try {
      const res = await setNewPasswordService(paylaod);
      if (res) {
        console.log(res);
      }
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof AxiosError) {
        showToast(error.response?.data.message, "error");
      }
    }
  };
  return { signIn, signUp, forgotPassword, setNewPassword };
};
