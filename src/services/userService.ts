import apiInvoker from "@/lib/apiInvoker";
import axiosInstance from "@/lib/axiosInstance";
import { END_POINT } from "@/lib/url";
import type {
  ONBOARDING_PAYLOAD,
  ONBOARDING_RESPONSE,
  USER_PROFILE_RESPONSE,
  UPDATE_USER_PAYLOAD,
  UPDATE_USER_RESPONSE,
  UPDATE_PROFILE_IMAGE_PAYLOAD,
  UPDATE_PROFILE_IMAGE_RESPONSE,
  UPDATE_BUSINESS_PROFILE_PAYLOAD,
  UPDATE_BUSINESS_PROFILE_RESPONSE,
  DELETE_USER_RESPONSE,
  START_SUBSCRIPTION_PAYLOAD,
  START_SUBSCRIPTION_RESPONSE,
  GET_SUBSCRIPTION_RESPONSE,
  UNSUBSCRIBE_RESPONSE,
  SUPPORT_TICKET_PAYLOAD,
  SUPPORT_TICKET_RESPONSE
} from "@/types/auth";

export const getUserProfileService = () => {
  return apiInvoker<USER_PROFILE_RESPONSE>(END_POINT.user.profile, "GET");
};

export const onboardingService = (payload: ONBOARDING_PAYLOAD) => {
  return apiInvoker<ONBOARDING_RESPONSE>(END_POINT.user.onboarding, "POST", payload);
};

export const updateUserService = (payload: UPDATE_USER_PAYLOAD) => {
  return apiInvoker<UPDATE_USER_RESPONSE>(END_POINT.user.profile, "PUT", payload);
};

export const updateProfileImageService = async (payload: UPDATE_PROFILE_IMAGE_PAYLOAD) => {
  const formData = new FormData();
  formData.append("profileImage", payload.profileImage);

  const response = await axiosInstance({
    url: END_POINT.user.profile,
    method: "PUT",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  return response.data as UPDATE_PROFILE_IMAGE_RESPONSE;
};

export const updateBusinessProfileService = (payload: UPDATE_BUSINESS_PROFILE_PAYLOAD) => {
  return apiInvoker<UPDATE_BUSINESS_PROFILE_RESPONSE>(END_POINT.user.businessProfile, "PUT", payload);
};

export const deleteUserService = () => {
  return apiInvoker<DELETE_USER_RESPONSE>(END_POINT.user.profile, "DELETE");
};

export const getSubscriptionService = () => {
  return apiInvoker<GET_SUBSCRIPTION_RESPONSE>(END_POINT.user.subscription, "GET");
};

export const startSubscriptionService = (payload: START_SUBSCRIPTION_PAYLOAD) => {
  return apiInvoker<START_SUBSCRIPTION_RESPONSE>(END_POINT.user.checkout, "POST", payload);
};

export const unsubscribeService = () => {
  return apiInvoker<UNSUBSCRIBE_RESPONSE>(END_POINT.user.unsubscribe, "POST");
};

export const createSupportTicketService = (payload: SUPPORT_TICKET_PAYLOAD) => {
  return apiInvoker<SUPPORT_TICKET_RESPONSE>(END_POINT.user.support, "POST", payload);
};
