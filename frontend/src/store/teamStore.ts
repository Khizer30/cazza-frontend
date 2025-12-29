import { create } from "zustand";
import type { TeamMember, TeamInvitation } from "@/types/auth";

interface TeamAnalytics {
  totalTeamMembers: number;
  pendingInvitations: number;
  adminCount: number;
}

interface TeamState {
  members: TeamMember[];
  invitations: TeamInvitation[];
  analytics: TeamAnalytics | null;
  isLoading: boolean;
  invitationsRefreshTrigger: number;
  pendingInvitationsCount: number;
  setMembers: (members: TeamMember[]) => void;
  setInvitations: (invitations: TeamInvitation[]) => void;
  setAnalytics: (analytics: TeamAnalytics | null) => void;
  setLoading: (loading: boolean) => void;
  addInvitation: (invitation: TeamInvitation) => void;
  removeInvitation: (invitationId: string) => void;
  removeMember: (memberId: string) => void;
  clearTeam: () => void;
  triggerInvitationsRefresh: () => void;
  setPendingInvitationsCount: (count: number) => void;
}

export const useTeamStore = create<TeamState>((set) => ({
  members: [],
  invitations: [],
  analytics: null,
  isLoading: false,
  invitationsRefreshTrigger: 0,
  pendingInvitationsCount: 0,

  setMembers: (members) => set({ members }),

  setInvitations: (invitations) => set({ invitations }),

  setAnalytics: (analytics) => set({ analytics }),

  setLoading: (loading) => set({ isLoading: loading }),

  addInvitation: (invitation) =>
    set((state) => ({
      invitations: [...state.invitations, invitation],
    })),

  removeInvitation: (invitationId) =>
    set((state) => ({
      invitations: state.invitations.filter((inv) => inv.id !== invitationId),
      invitationsRefreshTrigger: state.invitationsRefreshTrigger + 1,
    })),

  removeMember: (memberId) =>
    set((state) => ({
      members: state.members.filter((member) => member.id !== memberId),
    })),

  clearTeam: () =>
    set({
      members: [],
      invitations: [],
      analytics: null,
      invitationsRefreshTrigger: 0,
      pendingInvitationsCount: 0,
    }),

  triggerInvitationsRefresh: () =>
    set((state) => ({
      invitationsRefreshTrigger: state.invitationsRefreshTrigger + 1,
    })),

  setPendingInvitationsCount: (count) =>
    set({ pendingInvitationsCount: count }),
}));
