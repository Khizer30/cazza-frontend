import { useTeamStore } from "@/store/teamStore";

export const usePendingInvitations = () => {
  return useTeamStore((state) => state.pendingInvitationsCount);
};
