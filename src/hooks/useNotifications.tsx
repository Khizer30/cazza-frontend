import { useEffect, useCallback } from "react";
import { useToast } from "@/components/ToastProvider";
import { getNotificationsService, markNotificationsReadService } from "@/services/notificationService";
import { useNotificationStore } from "@/store/notificationStore";
import { AxiosError } from "axios";
import { useLocation } from "react-router-dom";

export const useNotifications = () => {
  const { showToast } = useToast();
  const {
    notifications,
    unreadCount,
    isLoading,
    refreshTrigger,
    setNotifications,
    setLoading,
    markAsRead: markAsReadInStore,
    markAllAsRead: markAllAsReadInStore
  } = useNotificationStore();
  const location = useLocation();

  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getNotificationsService();
      if (res && res.success) {
        setNotifications(res.data || []);
        return res.data || [];
      } else {
        showToast(res.message || "Failed to fetch notifications", "error");
        return [];
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          setNotifications([]);
          return [];
        }
        console.error("Fetch notifications error:", error);
        const errorMessage =
          error.response?.data?.message || error.response?.data?.error || "Failed to fetch notifications";
        showToast(errorMessage, "error");
      } else if (error instanceof Error) {
        showToast(error.message, "error");
      } else {
        showToast("An unexpected error occurred. Please try again.", "error");
      }
      return [];
    } finally {
      setLoading(false);
    }
  }, [setNotifications, setLoading, showToast]);

  const markAsRead = useCallback(
    async (notificationId: string) => {
      try {
        markAsReadInStore(notificationId);
        const res = await markNotificationsReadService([notificationId]);
        if (res && res.success) {
          await fetchNotifications();
        } else {
          showToast(res.message || "Failed to mark notification as read", "error");
        }
      } catch (error: unknown) {
        console.error("Mark as read error:", error);
        if (error instanceof AxiosError) {
          const errorMessage =
            error.response?.data?.message || error.response?.data?.error || "Failed to mark notification as read";
          showToast(errorMessage, "error");
        } else if (error instanceof Error) {
          showToast(error.message, "error");
        } else {
          showToast("An unexpected error occurred. Please try again.", "error");
        }
        await fetchNotifications();
      }
    },
    [markAsReadInStore, fetchNotifications, showToast]
  );

  const markAllAsRead = useCallback(async () => {
    try {
      const unreadIds = notifications.filter((n) => !n.isRead).map((n) => n.id);
      if (unreadIds.length === 0) return;

      markAllAsReadInStore();
      const res = await markNotificationsReadService(unreadIds);
      if (res && res.success) {
        await fetchNotifications();
        showToast(res.message || "All notifications marked as read", "success");
      } else {
        showToast(res.message || "Failed to mark all notifications as read", "error");
      }
    } catch (error: unknown) {
      console.error("Mark all as read error:", error);
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message || error.response?.data?.error || "Failed to mark all notifications as read";
        showToast(errorMessage, "error");
      } else if (error instanceof Error) {
        showToast(error.message, "error");
      } else {
        showToast("An unexpected error occurred. Please try again.", "error");
      }
      await fetchNotifications();
    }
  }, [notifications, markAllAsReadInStore, fetchNotifications, showToast]);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [location.pathname, refreshTrigger, fetchNotifications]);

  return {
    notifications,
    unreadCount,
    isLoading,
    fetchNotifications,
    markAsRead,
    markAllAsRead
  };
};
