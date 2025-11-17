import { useToast } from "@/components/ToastProvider";
import { 
  getUserProfileService, 
  onboardingService,
  updateUserService,
  updateBusinessProfileService
} from "@/services/userService";
import { useUserStore } from "@/store/userStore";
import type { 
  ONBOARDING_PAYLOAD,
  UPDATE_USER_PAYLOAD,
  UPDATE_BUSINESS_PROFILE_PAYLOAD
} from "@/types/auth";
import { AxiosError } from "axios";

export const useUser = () => {
  const { showToast } = useToast();
  const { user, setUser, setLoading, isLoading } = useUserStore();

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const res = await getUserProfileService();
      if (res && res.success && res.data) {
        setUser(res.data);
        return res.data;
      } else {
        showToast(res.message || "Failed to fetch user profile", "error");
        return null;
      }
    } catch (error: unknown) {
      console.error("Fetch user profile error:", error);
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message || error.response?.data?.error || "Failed to fetch user profile";
        showToast(errorMessage, "error");
      } else if (error instanceof Error) {
        showToast(error.message, "error");
      } else {
        showToast("An unexpected error occurred. Please try again.", "error");
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  const completeOnboarding = async (payload: ONBOARDING_PAYLOAD) => {
    try {
      setLoading(true);
      const res = await onboardingService(payload);
      if (res && res.success) {
        // Fetch updated user profile after onboarding
        await fetchUserProfile();
        showToast(res.message || "Onboarding completed successfully", "success");
        return res;
      } else if (res && !res.success) {
        showToast(res.message || "Failed to complete onboarding", "error");
        throw new Error(res.message || "Onboarding failed");
      }
    } catch (error: unknown) {
      console.error("Onboarding error:", error);
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message || error.response?.data?.error || "Failed to complete onboarding";
        showToast(errorMessage, "error");
      } else if (error instanceof Error) {
        showToast(error.message, "error");
      } else {
        showToast("An unexpected error occurred. Please try again.", "error");
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (payload: UPDATE_USER_PAYLOAD) => {
    try {
      setLoading(true);
      const res = await updateUserService(payload);
      if (res && res.success) {
        // Fetch updated user profile after update
        await fetchUserProfile();
        showToast(res.message || "Profile updated successfully", "success");
        return res;
      } else if (res && !res.success) {
        showToast(res.message || "Failed to update profile", "error");
        throw new Error(res.message || "Update failed");
      }
    } catch (error: unknown) {
      console.error("Update user error:", error);
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message || error.response?.data?.error || "Failed to update profile";
        showToast(errorMessage, "error");
      } else if (error instanceof Error) {
        showToast(error.message, "error");
      } else {
        showToast("An unexpected error occurred. Please try again.", "error");
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateBusinessProfile = async (payload: UPDATE_BUSINESS_PROFILE_PAYLOAD) => {
    try {
      setLoading(true);
      const res = await updateBusinessProfileService(payload);
      if (res && res.success) {
        // Fetch updated user profile after update
        await fetchUserProfile();
        showToast(res.message || "Business profile updated successfully", "success");
        return res;
      } else if (res && !res.success) {
        showToast(res.message || "Failed to update business profile", "error");
        throw new Error(res.message || "Update failed");
      }
    } catch (error: unknown) {
      console.error("Update business profile error:", error);
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message || error.response?.data?.error || "Failed to update business profile";
        showToast(errorMessage, "error");
      } else if (error instanceof Error) {
        showToast(error.message, "error");
      } else {
        showToast("An unexpected error occurred. Please try again.", "error");
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    isLoading,
    fetchUserProfile,
    completeOnboarding,
    updateUser,
    updateBusinessProfile,
  };
};

