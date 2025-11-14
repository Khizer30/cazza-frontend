import { useToast } from "@/components/ToastProvider";
import {
  forgotPasswordService,
  getGoogleAuthUrlService,
  googleCallbackService,
  setNewPasswordService,
  signInService,
  signUpService,
} from "@/services/authService";
import type {
  FORGOTPASSWORD_PAYLOAD,
  GOOGLE_CALLBACK_PAYLOAD,
  LOGIN_PAYLOAD,
  SETNEWPASSWORD_PAYLOAD,
  SIGNUP_PAYLOAD,
} from "@/types/auth";
import { setToken, setRefreshToken, setUser, removeToken } from "@/utils/localStorage";
import { AxiosError } from "axios";

export const useauth = () => {
  const { showToast } = useToast();
  const signIn = async (paylaod: LOGIN_PAYLOAD) => {
    try {
      const res = await signInService(paylaod);
      if (res && res.success) {
        // Handle new response structure with data object
        if (res.data) {
          const { accessToken, refreshToken } = res.data;
          
          // Store tokens
          if (accessToken) {
            setToken(accessToken);
          }
          if (refreshToken) {
            setRefreshToken(refreshToken);
          }
        } else {
          // Legacy support for old response format
          const token = res.token || res.accessToken || res.access_token;
          if (token) {
            setToken(token);
          }
        }
        
        showToast(res.message || "Successfully signed in", "success");
        return res;
      } else if (res && !res.success) {
        // Handle case where API returns success: false with 200 status
        showToast(res.message || "Invalid email or password", "error");
        throw new Error(res.message || "Login failed");
      }
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message || error.response?.data?.error || "An error occurred during sign in";
        showToast(errorMessage, "error",);
      } else if (error instanceof Error) {
        showToast(error.message, "error");
      } else {
        showToast("An unexpected error occurred. Please try again.", "error");
      }
      throw error;
    }
  };

  const signUp = async (paylaod: SIGNUP_PAYLOAD) => {
    try {
      const res = await signUpService(paylaod);
      if (res && res.success) {
        showToast(res.message || "Verification email has been sent to your email address.", "success");
        return res;
      }
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof AxiosError) {
        showToast(error.response?.data?.message || "An error occurred during signup", "error");
      } else {
        showToast("An unexpected error occurred. Please try again.", "error");
      }
      throw error;
    }
  };
  const forgotPassword = async (paylaod: FORGOTPASSWORD_PAYLOAD) => {
    try {
      const res = await forgotPasswordService(paylaod);
      if (res && res.success) {
        showToast(res.message || "Password reset email has been sent.", "success");
        return res;
      } else if (res && !res.success) {
        showToast(res.message || "Failed to send reset email", "error");
        throw new Error(res.message || "Failed to send reset email");
      }
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message || error.response?.data?.error || "An error occurred";
        showToast(errorMessage, "error");
      } else if (error instanceof Error) {
        showToast(error.message, "error");
      } else {
        showToast("An unexpected error occurred. Please try again.", "error");
      }
      throw error;
    }
  };
  const setNewPassword = async (paylaod: SETNEWPASSWORD_PAYLOAD) => {
    try {
      const res = await setNewPasswordService(paylaod);
      if (res && res.success) {
        showToast(res.message || "Password has been reset successfully", "success");
        return res;
      } else if (res && !res.success) {
        showToast(res.message || "Failed to reset password", "error");
        throw new Error(res.message || "Failed to reset password");
      }
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message || error.response?.data?.error || "An error occurred";
        showToast(errorMessage, "error");
      } else if (error instanceof Error) {
        showToast(error.message, "error");
      } else {
        showToast("An unexpected error occurred. Please try again.", "error");
      }
      throw error;
    }
  };
  const getGoogleAuthUrl = async () => {
    try {
      const res = await getGoogleAuthUrlService();
      if (res && res.success && res.data?.url) {
        // Redirect to Google OAuth URL
        window.location.href = res.data.url;
      } else {
        showToast("Failed to initiate Google authentication", "error");
      }
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message || error.response?.data?.error || "An error occurred";
        showToast(errorMessage, "error");
      } else {
        showToast("An unexpected error occurred. Please try again.", "error");
      }
      throw error;
    }
  };

  const handleGoogleCallback = async (code: string) => {
    try {
      // Send the OAuth authorization code as 'token' field (as per API spec)
      // Note: OAuth codes are single-use and expire quickly (usually 1-10 minutes)
            const payload: GOOGLE_CALLBACK_PAYLOAD = { token: code };
      const res = await googleCallbackService(payload);
      if (res && res.success) {
        // Handle response similar to regular login
        if (res.data) {
          const { accessToken, refreshToken } = res.data;
          
          // Store tokens
          if (accessToken) {
            setToken(accessToken);
          }
          if (refreshToken) {
            setRefreshToken(refreshToken);
          }
          
    }
        
        showToast(res.message || "Successfully signed in with Google", "success");
        return res;
      } else if (res && !res.success) {
        // Display the actual API error message
        const errorMsg = res.message || "Google authentication failed";
        showToast(errorMsg, "error");
        throw new Error(errorMsg);
      }
    } catch (error: unknown) {
      console.log("Google callback error:", error);
      if (error instanceof AxiosError) {
        const responseData = error.response?.data;
        // Display the actual API error message
        const errorMessage = responseData?.message || responseData?.error || "An error occurred during Google authentication";
        showToast(errorMessage, "error");
      } else if (error instanceof Error) {
        showToast(error.message, "error");
      } else {
        showToast("An unexpected error occurred. Please try again.", "error");
      }
      return null;
    }
    
  };

  const logout = () => {
    try {
      removeToken();
      showToast("Successfully signed out", "success");
      // Navigate to login page
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout error:", error);
      showToast("An error occurred during sign out", "error");
    }
  };

  return { signIn, signUp, forgotPassword, setNewPassword, getGoogleAuthUrl, handleGoogleCallback, logout };
};
