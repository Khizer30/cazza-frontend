export interface LOGIN_PAYLOAD{
    email:string;
    password:string;
}

export interface BusinessProfile {
  id?: string;
  businessName: string;
  businessEntityType: string;
  annualRevenueBand: string;
  marketplaces: string[];
  tools: string[];
  useXero: boolean;
  useMultipleCurrencies: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Subscription {
  id: string;
  status: "ACTIVE" | "TRIAL" | "CANCELED" | "EXPIRED" | "PENDING";
  expiryDate: string | null;
  autoRenew: boolean;
  paymentDate: string | null;
  planType?: "rookie" | "master";
  interval?: "monthly" | "yearly";
  customAmount?: number;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  profileType: string;
  profileImage: string | null;
  providers: string[];
  verified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  planId: string | null;
  planExpiry: string | null;
  ownerId: string | null;
  subscription: Subscription | null;
  businessProfile: BusinessProfile | null;
}

export interface LOGIN_RESPONSE {
  success: boolean;
  message: string;
  data?: {
    accessToken: string;
    refreshToken: string;
    user: User;
  };
  // Legacy support
  token?: string;
  accessToken?: string;
  access_token?: string;
}
export interface SIGNUP_PAYLOAD{
firstName:string;
lastName:string;
email:string;
password:string;
invitationId?:string;
}
export interface SIGNUP_RESPONSE{
  success: boolean;
  message: string;
}
export interface FORGOTPASSWORD_PAYLOAD{
email:string;
}
export interface FORGOTPASSWORD_RESPONSE{
  success: boolean;
  message: string;
}
export interface SETNEWPASSWORD_PAYLOAD{
token:string;
newPassword:string;
}
export interface SETNEWPASSWORD_RESPONSE{
  success: boolean;
  message: string;
}

export interface GOOGLE_AUTH_RESPONSE {
  success: boolean;
  message: string;
  data: {
    url: string;
  };
}

export interface GOOGLE_CALLBACK_PAYLOAD {
  token: string; // The OAuth authorization code from Google
}

export interface GOOGLE_CALLBACK_RESPONSE {
  success: boolean;
  message: string;
  data?: {
    accessToken: string;
    refreshToken: string;
    user: User;
  };
}

export interface ONBOARDING_PAYLOAD {
  businessName: string;
  businessEntityType: string;
  annualRevenueBand: string;
  marketplaces: string[];
  tools: string[];
  useXero: boolean;
  useMultipleCurrencies: boolean;
}

export interface ONBOARDING_RESPONSE {
  success: boolean;
  message: string;
  data?: {
    businessProfile: BusinessProfile;
  };
}

export interface USER_PROFILE_RESPONSE {
  success: boolean;
  message: string;
  data: User;
}

export interface UPDATE_USER_PAYLOAD {
  firstName?: string;
  lastName?: string;
  profileImage?: File | null;
  role?: string;
}

export interface UPDATE_USER_RESPONSE {
  success: boolean;
  message: string;
  data?: User;
}

export interface UPDATE_BUSINESS_PROFILE_PAYLOAD {
  firstName?: string;
  lastName?: string;
  businessName?: string;
  businessEntityType?: string;
  annualRevenueBand?: string;
  marketplaces?: string[];
  tools?: string[];
  useXero?: boolean;
  useMultipleCurrencies?: boolean;
}

export interface UPDATE_BUSINESS_PROFILE_RESPONSE {
  success: boolean;
  message: string;
  data?: {
    businessProfile: BusinessProfile;
  };
}

export interface SUPPORT_TICKET_PAYLOAD {
  subject: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  category: string;
  description: string;
}

export interface SUPPORT_TICKET_RESPONSE {
  success: boolean;
  message: string;
  data?: {
    ticketId?: string;
    ticketNumber?: string;
    [key: string]: any;
  };
}

export interface TEAM_INVITE_PAYLOAD {
  email: string;
  role: "MEMBER" | "ADMIN";
}

export interface TEAM_INVITE_RESPONSE {
  success: boolean;
  message: string;
  data?: {
    invitation: {
      id: string;
      email: string;
      role: "MEMBER" | "ADMIN";
      status: string;
      expiresAt: string;
      createdAt: string;
      [key: string]: any;
    };
  };
}

export interface TeamInvitation {
  id: string;
  email: string;
  role: "MEMBER" | "ADMIN";
  status?: string;
  expiresAt?: string;
  createdAt?: string;
  updatedAt?: string;
  senderId?: string;
  teamOwnerId?: string;
  sender?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  teamOwner?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  [key: string]: any;
}

export interface TeamMemberSubscription {
  id: string;
  status: "ACTIVE" | "TRIAL" | "CANCELED" | "EXPIRED" | "PENDING";
  expiryDate: string | null;
  autoRenew: boolean;
  paymentDate: string | null;
  interval: string; // "Month" or "Year" from API, can be normalized to "monthly" | "yearly"
  price: number;
  name: string;
}

export interface TeamMember {
  id: string;
  userId?: string;
  user_id?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  email?: string;
  profiles?: {
    email?: string;
    [key: string]: any;
  };
  role: "OWNER" | "ADMIN" | "MEMBER" | string;
  profileType?: string;
  profileImage?: string | null;
  verified?: boolean;
  isActive?: boolean;
  joined_at?: string;
  createdAt?: string;
  updatedAt?: string;
  ownerId?: string;
  subscription?: TeamMemberSubscription | null;
  [key: string]: any;
}

export interface TEAM_INVITATIONS_RESPONSE {
  success: boolean;
  message: string;
  data: TeamInvitation[];
}

export interface TEAM_MEMBERS_RESPONSE {
  success: boolean;
  message: string;
  data: TeamMember[];
}

export interface TEAM_ANALYTICS_RESPONSE {
  success: boolean;
  message: string;
  data: {
    totalTeamMembers: number;
    pendingInvitations: number;
    adminCount: number;
  };
}

export interface DELETE_INVITATION_RESPONSE {
  success: boolean;
  message: string;
}

export interface DELETE_MEMBER_RESPONSE {
  success: boolean;
  message: string;
}

export interface UPDATE_TEAM_MEMBER_ROLE_PAYLOAD {
  role: "ADMIN" | "MEMBER";
}

export interface UPDATE_TEAM_MEMBER_ROLE_RESPONSE {
  success: boolean;
  message: string;
  data?: {
    member: TeamMember;
  };
}

export interface DELETE_USER_RESPONSE {
  success: boolean;
  message: string;
}

export interface GET_INVITATION_RESPONSE {
  success: boolean;
  message: string;
  data: {
    email: string;
    [key: string]: any;
  };
}

export interface START_SUBSCRIPTION_PAYLOAD {
  interval: "monthly" | "yearly";
}

export interface START_SUBSCRIPTION_RESPONSE {
  success: boolean;
  message: string;
  data?: {
    checkoutUrl: string;
    subscription?: {
      id: string;
      planType: string;
      trialEnd?: string;
      subscribed: boolean;
      subscriptionEnd?: string;
      customAmount?: number;
      [key: string]: any;
    };
  };
}

export interface UNSUBSCRIBE_RESPONSE {
  success: boolean;
  message: string;
  data?: {
    subscription: Subscription;
  };
}

export interface TEAM_MEMBER_SUBSCRIPTION_PAYLOAD {
  userId: string;
  interval: "monthly" | "yearly";
}

export interface TEAM_MEMBER_SUBSCRIPTION_RESPONSE {
  success: boolean;
  message: string;
  data?: {
    checkoutUrl: string;
    subscription?: {
      id: string;
      planType: string;
      trialEnd?: string;
      subscribed: boolean;
      subscriptionEnd?: string;
      customAmount?: number;
      [key: string]: any;
    };
  };
}