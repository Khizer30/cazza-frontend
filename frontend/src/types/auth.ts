export interface LOGIN_PAYLOAD{
    email:string;
    password:string;
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