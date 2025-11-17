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