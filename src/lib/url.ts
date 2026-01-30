export const END_POINT = {
  auth: {
    login: "/auth/signin",
    check: "/auth/check",
    signup: "/auth/signup",
    forgotPassword: "/auth/forgot-password",
    setNewPassowrd: "/auth/reset-password",
    google: "/auth/google",
    googleCallback: "/auth/google/callback",
    logout: "/auth/logout"
  },
  user: {
    profile: "/user",
    profileImage: "/user",
    deleteProfileImage: "/user/profile-image",
    onboarding: "/user/onboarding",
    businessProfile: "/user/business-profile",
    support: "/user/support",
    subscription: "/billing/subscription",
    checkout: "/billing/checkout",
    unsubscribe: "/billing/unsubscribe"
  },
  team: {
    invite: "/team/invite",
    invitations: "/team/invitations?status=PENDING",
    myInvitations: "/team/invitations/me",
    invitation: "/team/invitation",
    members: "/team/members",
    member: "/team/member",
    updateMemberRole: "/team/member",
    analytics: "/team/analytics",
    memberSubscription: "/billing/checkout-team-member"
  },
  chatbot: {
    ask: "/chatbot/ask",
    createChat: "/chatbot/chat",
    getAllChats: "/chatbot/chats",
    getChat: (chatId: string) => `/chatbot/chat/${chatId}`,
    updateChatTitle: (chatId: string) => `/chatbot/chat/${chatId}/title`,
    deleteChat: (chatId: string) => `/chatbot/chat/${chatId}`,
    history: (chatId: string) => `/chatbot/chat/${chatId}/history`,
    deleteMessage: (messageId: string) => `/chatbot/message/${messageId}`
  },
  chat: {
    createGroup: "/chat/group",
    getGroups: "/chat/groups",
    getGroupById: "/chat/group",
    updateGroup: "/chat/group",
    deleteGroup: "/chat/group",
    getFirebaseToken: "/chat/token",
    addMember: "/chat/group",
    removeMember: "/chat/group",
    updateMemberRole: "/chat/group"
  },
  dashboard: {
    summary: "/dashboard/summary",
    detail: "/dashboard/detail"
  },
  blog: {
    list: "/blogs",
    detail: (blogId: string) => `/blogs/${blogId}`,
    create: "/blogs",
    update: (blogId: string) => `/blogs/${blogId}`,
    delete: (blogId: string) => `/blogs/${blogId}`,
    deleteImage: (blogId: string) => `/blogs/${blogId}/image`
  },
  notifications: {
    list: "/notifications",
    markRead: "/notifications/mark-read"
  }
} as const;
