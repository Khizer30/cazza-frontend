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
  setMembers: (members: TeamMember[]) => void;
  setInvitations: (invitations: TeamInvitation[]) => void;
  setAnalytics: (analytics: TeamAnalytics) => void;
  setLoading: (loading: boolean) => void;
  addInvitation: (invitation: TeamInvitation) => void;
  removeInvitation: (invitationId: string) => void;
  removeMember: (memberId: string) => void;
  clearTeam: () => void;
}

export const useTeamStore = create<TeamState>((set) => ({
  members: [],
  invitations: [],
  analytics: null,
  isLoading: false,
  
  setMembers: (members) => set({ members }),
  
  setInvitations: (invitations) => set({ invitations }),
  
  setAnalytics: (analytics) => set({ analytics }),
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  addInvitation: (invitation) => set((state) => ({
    invitations: [...state.invitations, invitation]
  })),
  
  removeInvitation: (invitationId) => set((state) => ({
    invitations: state.invitations.filter((inv) => inv.id !== invitationId)
  })),
  
  removeMember: (memberId) => set((state) => ({
    members: state.members.filter((member) => member.id !== memberId)
  })),
  
  clearTeam: () => set({ members: [], invitations: [], analytics: null }),
}));

