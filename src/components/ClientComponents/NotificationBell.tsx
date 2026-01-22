import { format } from "date-fns";
import { Bell, CheckCircle2, Circle, Loader2 } from "lucide-react";
import { useState } from "react";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ScrollArea } from "../ui/scroll-area";

import { useNotifications } from "@/hooks/useNotifications";

export const NotificationBell = () => {
  const [open, setOpen] = useState(false);
  const { notifications, unreadCount, isLoading, markAsRead, markAllAsRead } = useNotifications();

  const handleNotificationClick = (notificationId: string) => {
    if (!notifications.find((n) => n.id === notificationId)?.isRead) {
      markAsRead(notificationId);
    }
  };

  const formatTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const isToday =
        date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear();

      if (isToday) {
        return format(date, "h:mm a");
      } else {
        return format(date, "MMM d, h:mm a");
      }
    } catch {
      return "";
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-10 w-10">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 min-w-5 px-1.5 text-xs flex items-center justify-center rounded-full"
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0 bg-background border shadow-lg z-50" align="end">
        <div className="flex items-center justify-between p-4 border-b border-border bg-card">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-base">Notifications</h3>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="h-5 px-2 text-xs font-medium">
                {unreadCount} new
              </Badge>
            )}
          </div>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="h-7 text-xs hover:bg-muted" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center p-8 min-h-[200px]">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center min-h-[200px]">
            <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
              <Bell className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-foreground mb-1">No notifications</p>
            <p className="text-xs text-muted-foreground">You're all caught up!</p>
          </div>
        ) : notifications.length <= 3 ? (
          <div className="divide-y divide-border">
            {notifications.map((notification) => {
              const isUnread = !notification.isRead;
              return (
                <div
                  key={notification.id}
                  className={`group relative cursor-pointer transition-all ${
                    isUnread
                      ? "bg-primary/5 hover:bg-primary/10 border-l-2 border-l-primary"
                      : "bg-background hover:bg-muted/30"
                  }`}
                  onClick={() => handleNotificationClick(notification.id)}
                >
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {isUnread ? (
                          <div className="relative">
                            <Circle className="h-4 w-4 text-primary fill-primary" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="h-1.5 w-1.5 bg-primary-foreground rounded-full" />
                            </div>
                          </div>
                        ) : (
                          <CheckCircle2 className="h-4 w-4 text-muted-foreground/50" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0 space-y-1.5">
                        <div className="flex items-start justify-between gap-2">
                          <h4
                            className={`text-sm font-bold leading-snug ${
                              isUnread ? "text-foreground" : "text-foreground/70"
                            }`}
                          >
                            {notification.subject}
                          </h4>
                        </div>
                        <p
                          className={`text-xs leading-relaxed ${
                            isUnread ? "text-muted-foreground" : "text-muted-foreground/70"
                          } line-clamp-2`}
                        >
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between pt-0.5">
                          <p className="text-[10px] font-medium text-muted-foreground/80">
                            {formatTime(notification.createdAt)}
                          </p>
                          {isUnread && (
                            <Badge
                              variant="secondary"
                              className="h-3.5 px-1.5 text-[9px] font-semibold bg-primary/15 text-primary border-primary/30"
                            >
                              New
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <ScrollArea className="max-h-[400px]">
            <div className="divide-y divide-border">
              {notifications.map((notification) => {
                const isUnread = !notification.isRead;
                return (
                  <div
                    key={notification.id}
                    className={`group relative cursor-pointer transition-all ${
                      isUnread
                        ? "bg-primary/5 hover:bg-primary/10 border-l-2 border-l-primary"
                        : "bg-background hover:bg-muted/30"
                    }`}
                    onClick={() => handleNotificationClick(notification.id)}
                  >
                    <div className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                          {isUnread ? (
                            <div className="relative">
                              <Circle className="h-4 w-4 text-primary fill-primary" />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="h-1.5 w-1.5 bg-primary-foreground rounded-full" />
                              </div>
                            </div>
                          ) : (
                            <CheckCircle2 className="h-4 w-4 text-muted-foreground/50" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0 space-y-1.5">
                          <div className="flex items-start justify-between gap-2">
                            <h4
                              className={`text-sm font-bold leading-snug ${
                                isUnread ? "text-foreground" : "text-foreground/70"
                              }`}
                            >
                              {notification.subject}
                            </h4>
                          </div>
                          <p
                            className={`text-xs leading-relaxed ${
                              isUnread ? "text-muted-foreground" : "text-muted-foreground/70"
                            } line-clamp-2`}
                          >
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between pt-0.5">
                            <p className="text-[10px] font-medium text-muted-foreground/80">
                              {formatTime(notification.createdAt)}
                            </p>
                            {isUnread && (
                              <Badge
                                variant="secondary"
                                className="h-3.5 px-1.5 text-[9px] font-semibold bg-primary/15 text-primary border-primary/30"
                              >
                                New
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        )}
      </PopoverContent>
    </Popover>
  );
};
