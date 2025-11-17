import apiInvoker from "@/lib/apiInvoker";
import { END_POINT } from "@/lib/url";
import type { 
  TEAM_INVITE_PAYLOAD, 
  TEAM_INVITE_RESPONSE,
  TEAM_INVITATIONS_RESPONSE,
  TEAM_MEMBERS_RESPONSE,
  TEAM_ANALYTICS_RESPONSE,
  DELETE_INVITATION_RESPONSE,
  DELETE_MEMBER_RESPONSE,
  GET_INVITATION_RESPONSE
} from "@/types/auth";

export const inviteTeamMemberService = (payload: TEAM_INVITE_PAYLOAD) => {
  return apiInvoker<TEAM_INVITE_RESPONSE>(END_POINT.team.invite, "POST", payload);
};

export const getTeamInvitationsService = () => {
  return apiInvoker<TEAM_INVITATIONS_RESPONSE>(END_POINT.team.invitations, "GET");
};

export const cancelInvitationService = (invitationId: string) => {
  return apiInvoker<DELETE_INVITATION_RESPONSE>(
    `${END_POINT.team.invitation}/${invitationId}`,
    "DELETE"
  );
};

export const getTeamMembersService = () => {
  return apiInvoker<TEAM_MEMBERS_RESPONSE>(END_POINT.team.members, "GET");
};

export const getTeamAnalyticsService = () => {
  return apiInvoker<TEAM_ANALYTICS_RESPONSE>(END_POINT.team.analytics, "GET");
};

export const removeTeamMemberService = (memberId: string) => {
  return apiInvoker<DELETE_MEMBER_RESPONSE>(
    `${END_POINT.team.member}/${memberId}`,
    "DELETE"
  );
};

export const getInvitationService = (invitationId: string) => {
  return apiInvoker<GET_INVITATION_RESPONSE>(
    `${END_POINT.team.invitation}/${invitationId}`,
    "GET"
  );
};

