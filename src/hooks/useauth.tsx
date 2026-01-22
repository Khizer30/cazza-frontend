import { AxiosError } from "axios";

import { useToast } from "@/components/ToastProvider";
import {
  forgotPasswordService,
  getGoogleAuthUrlService,
  googleCallbackService,
  logoutService,
  setNewPasswordService,
  signInService,
  signUpService
} from "@/services/authService";
import { getUserProfileService } from "@/services/userService";
import { useUserStore } from "@/store/userStore";
import type {
  FORGOTPASSWORD_PAYLOAD,
  GOOGLE_CALLBACK_PAYLOAD,
  LOGIN_PAYLOAD,
  SETNEWPASSWORD_PAYLOAD,
  SIGNUP_PAYLOAD
} from "@/types/auth";
// Removed localStorage imports - using cookies only

export const useauth = () => {
  const { showToast } = useToast();
  const { setUser } = useUserStore();

  const fetchUserProfile = async () => {
    try {
      const res = await getUserProfileService();
      if (res && res.success && res.data) {
        setUser(res.data);
        return res.data;
      }
      return null;
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      return null;
    }
  };

  const signIn = async (paylaod: LOGIN_PAYLOAD) => {
    try {
      const res = await signInService(paylaod);

      if (res && res.success) {
        // Tokens are now managed via HTTP-only cookies from backend
        // No need to manually store tokens in localStorage

        // Fetch user profile after successful login
        const userData = await fetchUserProfile();
        console.log("User Data:", userData);

        // If fetchUserProfile returns null, try to use user from response as fallback
        if (!userData && res.data?.user) {
          setUser(res.data.user);
        }

        showToast(res.message || "Successfully signed in", "success");
        return res;
      } else if (res && !res.success) {
        // Handle case where API returns success: false with 200 status
        showToast(res.message || "Invalid email or password", "error");
        throw new Error(res.message || "Login failed");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message || error.response?.data?.error || "An error occurred during sign in";
        showToast(errorMessage, "error");
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
      if (error instanceof AxiosError) {
        const responseData = error.response?.data;
        let errorMessage = "An error occurred during signup";

        // Check if backend returned detailed validation errors
        if (responseData?.errors && Array.isArray(responseData.errors) && responseData.errors.length > 0) {
          // Extract all error messages from the errors array
          const errorMessages = responseData.errors.map((err: { message?: string }) => err.message).filter(Boolean);

          if (errorMessages.length > 0) {
            errorMessage = errorMessages.join(". ");
          }
        } else if (responseData?.message) {
          errorMessage = responseData.message;
        } else if (responseData?.error) {
          errorMessage = responseData.error;
        }

        showToast(errorMessage, "error");
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
      const payload: GOOGLE_CALLBACK_PAYLOAD = { token: code };
      const res = await googleCallbackService(payload);
      if (res && res.success) {
        // Tokens are now stored in HTTP-only cookies by the backend
        // No need to manually store tokens in localStorage

        // Fetch user profile after successful Google auth
        const userData = await fetchUserProfile();

        // If fetchUserProfile returns null, try to use user from response as fallback
        if (!userData && res.data?.user) {
          setUser(res.data.user);
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
      if (error instanceof AxiosError) {
        const responseData = error.response?.data;
        // Display the actual API error message
        const errorMessage =
          responseData?.message || responseData?.error || "An error occurred during Google authentication";
        showToast(errorMessage, "error");
      } else if (error instanceof Error) {
        showToast(error.message, "error");
      } else {
        showToast("An unexpected error occurred. Please try again.", "error");
      }
      return null;
    }
  };

  const logout = async () => {
    try {
      // Call backend logout API to clear cookies
      await logoutService();

      // Clear local user state
      setUser(null);

      // Clear any localStorage items
      localStorage.clear();

      showToast("Successfully signed out", "success");

      // Navigate to login page
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout error:", error);

      // Even if backend call fails, clear local state and redirect
      setUser(null);
      localStorage.clear();

      showToast("Signed out", "success");
      window.location.href = "/login";
    }
  };

  return {
    signIn,
    signUp,
    forgotPassword,
    setNewPassword,
    getGoogleAuthUrl,
    handleGoogleCallback,
    logout,
    fetchUserProfile
  };
};
