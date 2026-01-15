import { create } from "zustand";
import type { Notification } from "@/types/auth";

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  refreshTrigger: number;
  setNotifications: (notifications: Notification[]) => void;
  setUnreadCount: (count: number) => void;
  setLoading: (loading: boolean) => void;
  triggerRefresh: () => void;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  refreshTrigger: 0,

  setNotifications: (notifications) =>
    set({
      notifications,
      unreadCount: notifications.filter((n) => !n.isRead).length,
    }),

  setUnreadCount: (count) => set({ unreadCount: count }),

  setLoading: (loading) => set({ isLoading: loading }),

  triggerRefresh: () =>
    set((state) => ({
      refreshTrigger: state.refreshTrigger + 1,
    })),

  markAsRead: (notificationId) =>
    set((state) => {
      const updatedNotifications = state.notifications.map((notification) =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification
      );
      return {
        notifications: updatedNotifications,
        unreadCount: updatedNotifications.filter((n) => !n.isRead).length,
      };
    }),

  markAllAsRead: () =>
    set((state) => {
      const updatedNotifications = state.notifications.map((notification) => ({
        ...notification,
        isRead: true,
      }));
      return {
        notifications: updatedNotifications,
        unreadCount: 0,
      };
    }),

  clearNotifications: () =>
    set({
      notifications: [],
      unreadCount: 0,
      refreshTrigger: 0,
    }),
}));
