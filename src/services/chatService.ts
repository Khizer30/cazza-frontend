import apiInvoker from "@/lib/apiInvoker";
import { END_POINT } from "@/lib/url";

export interface CreateChatGroupPayload {
  name: string;
  description?: string;
  icon?: string;
}

export interface ChatGroup {
  id: string;
  name: string;
  description?: string | null;
  icon?: string | null;
  createdAt: string;
  updatedAt?: string;
  createdBy?: string;
  memberCount?: number;
  role?: "ADMIN" | "MEMBER";
  joinedAt?: string;
}

export interface ChatGroupMember {
  userId: string;
  role: "ADMIN" | "MEMBER";
  joinedAt: string;
}

export interface ChatGroupDetail extends ChatGroup {
  members: ChatGroupMember[];
}

export interface FirebaseTokenResponse {
  success: boolean;
  data?: {
    token: string;
  };
  message?: string;
}

export interface ChatGroupResponse {
  success: boolean;
  data?: {
    group?: ChatGroup;
    groups?: ChatGroup[];
  };
  message?: string;
}

export interface ChatGroupDetailResponse {
  success: boolean;
  data?: {
    group?: ChatGroupDetail;
  };
  message?: string;
}

export const createChatGroupService = (payload: CreateChatGroupPayload) => {
  return apiInvoker<ChatGroupResponse>(
    END_POINT.chat.createGroup,
    "POST",
    payload
  );
};

export const getUserChatGroupsService = () => {
  return apiInvoker<ChatGroupResponse>(END_POINT.chat.getGroups, "GET");
};

export const getChatGroupByIdService = (groupId: string) => {
  return apiInvoker<ChatGroupDetailResponse>(
    `${END_POINT.chat.getGroupById}/${groupId}`,
    "GET"
  );
};

export const updateChatGroupService = (
  groupId: string,
  payload: { name: string; description?: string; icon?: string }
) => {
  return apiInvoker<ChatGroupResponse>(
    `${END_POINT.chat.updateGroup}/${groupId}`,
    "PUT",
    payload
  );
};

export const deleteChatGroupService = (groupId: string) => {
  return apiInvoker<{ success: boolean; message?: string }>(
    `${END_POINT.chat.deleteGroup}/${groupId}`,
    "DELETE"
  );
};

export const getFirebaseTokenService = (groupId: string) => {
  return apiInvoker<FirebaseTokenResponse>(
    `${END_POINT.chat.getFirebaseToken}?groupId=${groupId}`,
    "GET"
  );
};

export const addMemberToGroupService = (
  groupId: string,
  payload: { userId: string; role: "ADMIN" | "MEMBER" }
) => {
  return apiInvoker<{ success: boolean; message?: string }>(
    `${END_POINT.chat.addMember}/${groupId}/member`,
    "POST",
    payload
  );
};

export const removeMemberFromGroupService = (
  groupId: string,
  userId: string
) => {
  return apiInvoker<{ success: boolean; message?: string }>(
    `${END_POINT.chat.removeMember}/${groupId}/member/${userId}`,
    "DELETE"
  );
};

export const updateMemberRoleService = (
  groupId: string,
  userId: string,
  payload: { role: "ADMIN" | "MEMBER" }
) => {
  return apiInvoker<{ success: boolean; message?: string }>(
    `${END_POINT.chat.updateMemberRole}/${groupId}/member/${userId}/role`,
    "PUT",
    payload
  );
};
