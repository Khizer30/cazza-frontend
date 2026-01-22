import apiInvoker from "@/lib/apiInvoker";
import { END_POINT } from "@/lib/url";
import type { NOTIFICATIONS_RESPONSE, MARK_READ_RESPONSE } from "@/types/auth";

export const getNotificationsService = () => {
  return apiInvoker<NOTIFICATIONS_RESPONSE>(END_POINT.notifications.list, "GET");
};

export const markNotificationsReadService = (notificationIds?: string[]) => {
  return apiInvoker<MARK_READ_RESPONSE>(
    END_POINT.notifications.markRead,
    "PUT",
    notificationIds ? { notificationIds } : {}
  );
};
