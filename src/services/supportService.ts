import apiInvoker from "@/lib/apiInvoker";
import { END_POINT } from "@/lib/url";
import type { SUPPORT_TICKET_PAYLOAD, SUPPORT_TICKET_RESPONSE } from "@/types/auth";

export const submitSupportTicketService = (payload: SUPPORT_TICKET_PAYLOAD) => {
  return apiInvoker<SUPPORT_TICKET_RESPONSE>(END_POINT.user.support, "POST", payload);
};
