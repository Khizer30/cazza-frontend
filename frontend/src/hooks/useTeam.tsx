import { useToast } from "@/components/ToastProvider";
import {
  getTeamInvitationsService,
  getTeamMembersService,
  getTeamAnalyticsService,
  cancelInvitationService,
  removeTeamMemberService,
  updateTeamMemberRoleService,
  teamMemberSubscriptionService,
} from "@/services/teamService";
import { useTeamStore } from "@/store/teamStore";
import { AxiosError } from "axios";

export const useTeam = () => {
  const { showToast } = useToast();
  const {
    members,
    invitations,
    analytics,
    isLoading,
    setMembers,
    setInvitations,
    setAnalytics,
    setLoading,
  } = useTeamStore();

  const fetchTeamInvitations = async () => {
    try {
      setLoading(true);
      const res = await getTeamInvitationsService();
      if (res && res.success) {
        setInvitations(res.data || []);
        return res.data || [];
      } else {
        showToast(res.message || "Failed to fetch invitations", "error");
        return [];
      }
    } catch (error: unknown) {
      console.error("Fetch invitations error:", error);
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message || error.response?.data?.error || "Failed to fetch invitations";
        showToast(errorMessage, "error");
      } else if (error instanceof Error) {
        showToast(error.message, "error");
      } else {
        showToast("An unexpected error occurred. Please try again.", "error");
      }
      return [];
    } finally {
      setLoading(false);
    }
  };

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      const res = await getTeamMembersService();
      if (res && res.success) {
        setMembers(res.data || []);
        return res.data || [];
      } else {
        showToast(res.message || "Failed to fetch team members", "error");
        return [];
      }
    } catch (error: unknown) {
      console.error("Fetch team members error:", error);
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message || error.response?.data?.error || "Failed to fetch team members";
        showToast(errorMessage, "error");
      } else if (error instanceof Error) {
        showToast(error.message, "error");
      } else {
        showToast("An unexpected error occurred. Please try again.", "error");
      }
      return [];
    } finally {
      setLoading(false);
    }
  };

  const fetchTeamAnalytics = async () => {
    try {
      setLoading(true);
      const res = await getTeamAnalyticsService();
      if (res && res.success) {
        setAnalytics(res.data);
        return res.data;
      } else {
        showToast(res.message || "Failed to fetch team analytics", "error");
        return null;
      }
    } catch (error: unknown) {
      console.error("Fetch team analytics error:", error);
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message || error.response?.data?.error || "Failed to fetch team analytics";
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

  const fetchAllTeamData = async () => {
    await Promise.all([
      fetchTeamInvitations(),
      fetchTeamMembers(),
      fetchTeamAnalytics(),
    ]);
  };

  const cancelInvitation = async (invitationId: string) => {
    try {
      setLoading(true);
      const res = await cancelInvitationService(invitationId);
      if (res && res.success) {
        showToast(res.message || "Invitation cancelled successfully", "success");
        // Refresh all team data to ensure consistency with server
        await fetchAllTeamData();
        return res;
      } else if (res && !res.success) {
        showToast(res.message || "Failed to cancel invitation", "error");
        throw new Error(res.message || "Cancel invitation failed");
      }
    } catch (error: unknown) {
      console.error("Cancel invitation error:", error);
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message || error.response?.data?.error || "Failed to cancel invitation";
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

  const removeTeamMember = async (memberId: string) => {
    try {
      setLoading(true);
      const res = await removeTeamMemberService(memberId);
      if (res && res.success) {
        showToast(res.message || "Team member removed successfully", "success");
        // Refresh all team data to ensure consistency with server
        await fetchAllTeamData();
        return res;
      } else if (res && !res.success) {
        showToast(res.message || "Failed to remove team member", "error");
        throw new Error(res.message || "Remove member failed");
      }
    } catch (error: unknown) {
      console.error("Remove team member error:", error);
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message || error.response?.data?.error || "Failed to remove team member";
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

  const updateTeamMemberRole = async (teamMemberId: string, currentRole: string) => {
    try {
      setLoading(true);
      // Toggle role: if MEMBER, send ADMIN; if ADMIN, send MEMBER
      const newRole: "ADMIN" | "MEMBER" = currentRole?.toUpperCase() === "ADMIN" ? "MEMBER" : "ADMIN";
      console.log("Updating team member role:", { teamMemberId, currentRole, newRole });
      const res = await updateTeamMemberRoleService(teamMemberId, { role: newRole });
      if (res && res.success) {
        showToast(res.message || "Team member role updated successfully", "success");
        // Refresh all team data to ensure consistency with server
        await fetchAllTeamData();
        return res;
      } else if (res && !res.success) {
        showToast(res.message || "Failed to update team member role", "error");
        throw new Error(res.message || "Update role failed");
      }
    } catch (error: unknown) {
      console.error("Update team member role error:", error);
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message || error.response?.data?.error || "Failed to update team member role";
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

  const payForTeamMember = async (userId: string, interval: "monthly" | "yearly") => {
    try {
      setLoading(true);
      const res = await teamMemberSubscriptionService({ userId, interval });
      if (res && res.success) {
        // If checkout URL is provided, redirect to it
        if (res.data?.checkoutUrl) {
          window.location.href = res.data.checkoutUrl;
          return res;
        }
        showToast(res.message || "Subscription checkout initiated successfully", "success");
        return res;
      } else if (res && !res.success) {
        showToast(res.message || "Failed to initiate subscription checkout", "error");
        throw new Error(res.message || "Subscription checkout failed");
      }
    } catch (error: unknown) {
      console.error("Team member subscription error:", error);
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message || error.response?.data?.error || "Failed to initiate subscription checkout";
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
    members,
    invitations,
    analytics,
    isLoading,
    fetchTeamInvitations,
    fetchTeamMembers,
    fetchTeamAnalytics,
    fetchAllTeamData,
    cancelInvitation,
    removeTeamMember,
    updateTeamMemberRole,
    payForTeamMember,
  };
};

