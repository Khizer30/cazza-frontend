import { AxiosError } from "axios";

import { useToast } from "@/components/ToastProvider";
import { inviteTeamMemberService } from "@/services/teamService";
import {
  getUserProfileService,
  onboardingService,
  updateUserService,
  updateProfileImageService,
  deleteProfileImageService,
  updateBusinessProfileService,
  deleteUserService,
  getSubscriptionService,
  startSubscriptionService,
  unsubscribeService,
  createSupportTicketService
} from "@/services/userService";
import { useTeamStore } from "@/store/teamStore";
import { useUserStore } from "@/store/userStore";
import type {
  ONBOARDING_PAYLOAD,
  UPDATE_USER_PAYLOAD,
  UPDATE_PROFILE_IMAGE_PAYLOAD,
  UPDATE_BUSINESS_PROFILE_PAYLOAD,
  TEAM_INVITE_PAYLOAD,
  START_SUBSCRIPTION_PAYLOAD,
  SUPPORT_TICKET_PAYLOAD
} from "@/types/auth";

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
        showToast(res.message || "Failed to fetch profile", "error");
        return null;
      }
    } catch (error: unknown) {
      console.error("Fetch profile error:", error);
      if (error instanceof AxiosError) {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
          return null;
        }
        const errorMessage =
          error.response?.data?.message || error.response?.data?.error || "Failed to fetch user profile";
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
        // Don't fail if user profile fetch fails - onboarding was successful
        try {
          await fetchUserProfile();
        } catch (profileError) {
          console.warn("Failed to fetch user profile after onboarding, but onboarding was successful:", profileError);
          // Continue anyway - user can be fetched later
        }
        showToast(res.message || "Onboarding completed successfully", "success");
        return res;
      } else if (res && !res.success) {
        showToast(res.message || "Failed to complete onboarding", "error");
        throw new Error(res.message || "Onboarding failed");
      }
    } catch (error: unknown) {
      console.error("Onboarding error:", error);
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message || error.response?.data?.error || "Failed to complete onboarding";
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
        // Show specific message instead of generic backend message
        const customMessage = res.message?.toLowerCase().includes("user updated")
          ? "Personal information updated successfully"
          : res.message || "Personal information updated successfully";
        showToast(customMessage, "success");
        return res;
      } else if (res && !res.success) {
        showToast(res.message || "Failed to update personal information", "error");
        throw new Error(res.message || "Update failed");
      }
    } catch (error: unknown) {
      console.error("Update user error:", error);
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message || error.response?.data?.error || "Failed to update personal information";
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

  const updateBusinessProfile = async (payload: UPDATE_BUSINESS_PROFILE_PAYLOAD, customSuccessMessage?: string) => {
    try {
      setLoading(true);
      const res = await updateBusinessProfileService(payload);
      if (res && res.success) {
        // Fetch updated user profile after update
        await fetchUserProfile();
        // Use custom message if provided, otherwise use generic message
        const message = customSuccessMessage || "Business profile updated successfully";
        showToast(message, "success");
        return res;
      } else if (res && !res.success) {
        showToast(res.message || "Failed to update business profile", "error");
        throw new Error(res.message || "Update failed");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        // Show specific validation errors if available
        if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
          const validationMessages = error.response.data.errors
            .map((err: any) => err.message || err.msg || JSON.stringify(err))
            .join(", ");
          showToast(`Validation error: ${validationMessages}`, "error");
        } else {
          const errorMessage =
            error.response?.data?.message || error.response?.data?.error || "Failed to update business profile";
          showToast(errorMessage, "error");
        }
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
          error.response?.data?.message || error.response?.data?.error || "Failed to invite team member";
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
        const errorMessage = error.response?.data?.message || error.response?.data?.error || "Failed to delete account";
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

  const getSubscription = async () => {
    try {
      setLoading(true);
      const res = await getSubscriptionService();
      if (res && res.success) {
        return res.data;
      } else if (res && !res.success) {
        showToast(res.message || "Failed to fetch subscription", "error");
        throw new Error(res.message || "Get subscription failed");
      }
    } catch (error: unknown) {
      console.error("Get subscription error:", error);
      if (error instanceof AxiosError) {
        const status = error.response?.status;
        // Handle 403 Forbidden gracefully - team members don't have access to billing
        if (status === 403) {
          // Don't show error toast for 403 - it's expected for team members
          return null;
        }
        const errorMessage =
          error.response?.data?.message || error.response?.data?.error || "Failed to fetch subscription";
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
        if (res.data?.checkoutUrl) {
          window.location.href = res.data.checkoutUrl;
          return res;
        }
        showToast(res.message || "Subscription started successfully", "success");
        return res;
      } else if (res && !res.success) {
        showToast(res.message || "Failed to start subscription", "error");
        throw new Error(res.message || "Subscription failed");
      }
    } catch (error: unknown) {
      console.error("Start subscription error:", error);
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message || error.response?.data?.error || "Failed to start subscription";
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
        showToast(res.message || "Subscription will be cancelled at the end of the billing period", "success");
        return res;
      } else if (res && !res.success) {
        showToast(res.message || "Failed to cancel subscription", "error");
        throw new Error(res.message || "Unsubscribe failed");
      }
    } catch (error: unknown) {
      console.error("Unsubscribe error:", error);
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message || error.response?.data?.error || "Failed to cancel subscription";
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

  const updateProfileImage = async (payload: UPDATE_PROFILE_IMAGE_PAYLOAD) => {
    try {
      setLoading(true);
      const res = await updateProfileImageService(payload);
      if (res && res.success) {
        // Fetch updated user profile after update
        await fetchUserProfile();
        // Show specific message instead of generic backend message
        const customMessage = res.message?.toLowerCase().includes("user updated")
          ? "Profile image updated successfully"
          : res.message || "Profile image updated successfully";
        showToast(customMessage, "success");
        return res;
      } else if (res && !res.success) {
        showToast(res.message || "Failed to update profile image", "error");
        throw new Error(res.message || "Update profile image failed");
      }
    } catch (error: unknown) {
      console.error("Update profile image error:", error);
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message || error.response?.data?.error || "Failed to update profile image";
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

  const deleteProfileImage = async () => {
    try {
      setLoading(true);
      const res = await deleteProfileImageService();
      if (res && res.success) {
        await fetchUserProfile();
        showToast(res.message || "Profile image deleted successfully", "success");
        return res;
      } else if (res && !res.success) {
        showToast(res.message || "Failed to delete profile image", "error");
        throw new Error(res.message || "Delete profile image failed");
      }
    } catch (error: unknown) {
      console.error("Delete profile image error:", error);
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message || error.response?.data?.error || "Failed to delete profile image";
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

  const createSupportTicket = async (payload: SUPPORT_TICKET_PAYLOAD) => {
    try {
      setLoading(true);
      const res = await createSupportTicketService(payload);
      if (res && res.success) {
        showToast(res.message || "Support ticket created successfully", "success");
        return res;
      } else if (res && !res.success) {
        showToast(res.message || "Failed to create support ticket", "error");
        throw new Error(res.message || "Create support ticket failed");
      }
    } catch (error: unknown) {
      console.error("Create support ticket error:", error);
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message || error.response?.data?.error || "Failed to create support ticket";
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
    updateProfileImage,
    deleteProfileImage,
    updateBusinessProfile,
    inviteTeamMember,
    deleteUser,
    getSubscription,
    startSubscription,
    unsubscribe,
    createSupportTicket
  };
};
