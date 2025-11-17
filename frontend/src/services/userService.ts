import apiInvoker from "@/lib/apiInvoker";
import axiosInstance from "@/lib/axiosInstance";
import { END_POINT } from "@/lib/url";
import type { 
  ONBOARDING_PAYLOAD, 
  ONBOARDING_RESPONSE, 
  USER_PROFILE_RESPONSE,
  UPDATE_USER_PAYLOAD,
  UPDATE_USER_RESPONSE,
  UPDATE_BUSINESS_PROFILE_PAYLOAD,
  UPDATE_BUSINESS_PROFILE_RESPONSE
} from "@/types/auth";

export const getUserProfileService = () => {
  return apiInvoker<USER_PROFILE_RESPONSE>(END_POINT.user.profile, "GET");
};

export const onboardingService = (payload: ONBOARDING_PAYLOAD) => {
  return apiInvoker<ONBOARDING_RESPONSE>(END_POINT.user.onboarding, "POST", payload);
};

export const updateUserService = async (payload: UPDATE_USER_PAYLOAD) => {
  const formData = new FormData();
  
  if (payload.firstName !== undefined) {
    formData.append("firstName", payload.firstName);
  }
  if (payload.lastName !== undefined) {
    formData.append("lastName", payload.lastName);
  }
  if (payload.role !== undefined) {
    formData.append("role", payload.role);
  }
  if (payload.profileImage instanceof File) {
    formData.append("profileImage", payload.profileImage);
  }
  
  const response = await axiosInstance({
    url: END_POINT.user.profile,
    method: "PUT",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  
  return response.data as UPDATE_USER_RESPONSE;
};

export const updateBusinessProfileService = (payload: UPDATE_BUSINESS_PROFILE_PAYLOAD) => {
  return apiInvoker<UPDATE_BUSINESS_PROFILE_RESPONSE>(END_POINT.user.businessProfile, "PUT", payload);
};

