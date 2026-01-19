import { useToast } from "@/components/ToastProvider";
import {
  getUserProfileService,
  onboardingService,
  updateUserService,
  updateUserPlatformsService,
  updateBusinessProfileService,
  deleteUserService,
  startSubscriptionService,
  unsubscribeService,
} from "@/services/userService";
import { inviteTeamMemberService } from "@/services/teamService";
import { useUserStore } from "@/store/userStore";
import { useTeamStore } from "@/store/teamStore";
import type {
  ONBOARDING_PAYLOAD,
  UPDATE_USER_PAYLOAD,
  UPDATE_USER_PLATFORMS_PAYLOAD,
  UPDATE_BUSINESS_PROFILE_PAYLOAD,
  TEAM_INVITE_PAYLOAD,
  START_SUBSCRIPTION_PAYLOAD,
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
        const status = error.response?.status;
        if (status === 401 || status === 403) {
          return null;
        }
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to fetch user profile";
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
        showToast(
          res.message || "Onboarding completed successfully",
          "success"
        );
        return res;
      } else if (res && !res.success) {
        showToast(res.message || "Failed to complete onboarding", "error");
        throw new Error(res.message || "Onboarding failed");
      }
    } catch (error: unknown) {
      console.error("Onboarding error:", error);
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to complete onboarding";
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
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to update profile";
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

  const updateBusinessProfile = async (
    payload: UPDATE_BUSINESS_PROFILE_PAYLOAD
  ) => {
    try {
      setLoading(true);
      const res = await updateBusinessProfileService(payload);
      if (res && res.success) {
        // Fetch updated user profile after update
        await fetchUserProfile();
        showToast(
          res.message || "Business profile updated successfully",
          "success"
        );
        return res;
      } else if (res && !res.success) {
        showToast(res.message || "Failed to update business profile", "error");
        throw new Error(res.message || "Update failed");
      }
    } catch (error: unknown) {
      console.error("Update business profile error:", error);
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to update business profile";
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

  const inviteTeamMember = async (payload: TEAM_INVITE_PAYLOAD) => {
    try {
      setLoading(true);
      const res = await inviteTeamMemberService(payload);
      if (res && res.success) {
        // Add invitation to store if data includes invitation
        if (res.data?.invitation) {
          const { addInvitation } = useTeamStore.getState();
          addInvitation(res.data.invitation);
        }
        showToast(res.message || "Team member invited successfully", "success");
        return res;
      } else if (res && !res.success) {
        showToast(res.message || "Failed to invite team member", "error");
        throw new Error(res.message || "Invite failed");
      }
    } catch (error: unknown) {
      console.error("Invite team member error:", error);
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to invite team member";
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

  const deleteUser = async () => {
    try {
      setLoading(true);
      const res = await deleteUserService();
      if (res && res.success) {
        showToast(res.message || "Account deleted successfully", "success");
        // Clear user from store
        setUser(null);
        return res;
      } else if (res && !res.success) {
        showToast(res.message || "Failed to delete account", "error");
        throw new Error(res.message || "Delete account failed");
      }
    } catch (error: unknown) {
      console.error("Delete user error:", error);
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to delete account";
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

  const startSubscription = async (payload: START_SUBSCRIPTION_PAYLOAD) => {
    try {
      setLoading(true);
      const res = await startSubscriptionService(payload);
      if (res && res.success) {
        // If checkout URL is provided, redirect to it
        if (res.data?.checkoutUrl) {
          window.location.href = res.data.checkoutUrl;
          return res;
        }
        // Otherwise, fetch updated user profile after subscription
        await fetchUserProfile();
        showToast(
          res.message || "Subscription started successfully",
          "success"
        );
        return res;
      } else if (res && !res.success) {
        showToast(res.message || "Failed to start subscription", "error");
        throw new Error(res.message || "Subscription failed");
      }
    } catch (error: unknown) {
      console.error("Start subscription error:", error);
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to start subscription";
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

  const unsubscribe = async () => {
    try {
      setLoading(true);
      const res = await unsubscribeService();
      if (res && res.success) {
        // Fetch updated user profile after unsubscribe
        await fetchUserProfile();
        showToast(
          res.message || "Subscription canceled successfully",
          "success"
        );
        return res;
      } else if (res && !res.success) {
        showToast(res.message || "Failed to cancel subscription", "error");
        throw new Error(res.message || "Unsubscribe failed");
      }
    } catch (error: unknown) {
      console.error("Unsubscribe error:", error);
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to cancel subscription";
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

  const updateUserPlatforms = async (payload: UPDATE_USER_PLATFORMS_PAYLOAD, customMessage?: string) => {
    try {
      setLoading(true);
      const res = await updateUserPlatformsService(payload);
      if (res && res.success) {
        // Fetch updated user profile after update
        await fetchUserProfile();
        showToast(customMessage || res.message || "Platforms updated successfully", "success");
        return res;
      } else if (res && !res.success) {
        showToast(res.message || "Failed to update platforms", "error");
        throw new Error(res.message || "Update platforms failed");
      }
    } catch (error: unknown) {
      console.error("Update user platforms error:", error);
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to update platforms";
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
    updateUserPlatforms,
    updateBusinessProfile,
    inviteTeamMember,
    deleteUser,
    startSubscription,
    unsubscribe,
  };
};
