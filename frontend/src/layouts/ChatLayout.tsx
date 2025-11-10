// ChatLayout.tsx
import { useState, useEffect, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MessageSquare,
  Plus,
  ChevronLeft,
  ChevronRight,
  History,
} from "lucide-react";

interface ChatHistoryItem {
  id: string;
  title: string;
  timestamp: string;
  isActive?: boolean;
}

interface ChatLayoutProps {
  children: ReactNode;
  chatHistory?: ChatHistoryItem[];
  onNewChat?: () => void;
  onSelectChat?: (chatId: string) => void;
  currentChatId?: string;
  isSidebarOpen?: boolean;
  onToggleSidebar?: () => void;
}

export function ChatLayout({
  children,
  chatHistory = [],
  onNewChat,
  onSelectChat,
  currentChatId,
  isSidebarOpen = false,
  onToggleSidebar,
}: ChatLayoutProps) {
  const [internalSidebarOpen, setInternalSidebarOpen] = useState(() => {
    if (typeof window !== "undefined") return window.innerWidth >= 1024;
    return false;
  });

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth >= 1024) setInternalSidebarOpen(true);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const sidebarOpen = onToggleSidebar ? isSidebarOpen : internalSidebarOpen;
  const handleToggleSidebar =
    onToggleSidebar || (() => setInternalSidebarOpen(!internalSidebarOpen));

  return (
    <div className="flex h-[100%] bg-background overflow-hidden">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-0 lg:w-64"
        } transition-all duration-300 border-r border-border bg-card flex flex-col overflow-hidden absolute inset-y-0 left-0 z-50 lg:relative lg:z-auto lg:block`}
      >
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">Chat History</span>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={onNewChat}
              className="h-8 w-8 p-0 hover:bg-primary/10"
            >
              <Plus className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleToggleSidebar}
              className="h-8 w-8 p-0 hover:bg-primary/10 lg:hidden"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {chatHistory.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                <History className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No chat history yet</p>
                <p className="text-xs">Start a new conversation</p>
              </div>
            ) : (
              chatHistory.map((chat) => (
                <div
                  key={chat.id}
                  className={`group relative rounded-lg p-3 cursor-pointer transition-all duration-200 ${
                    currentChatId === chat.id
                      ? "bg-primary/10 border border-primary/20"
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => {
                    onSelectChat?.(chat.id);
                    if (window.innerWidth < 1024) handleToggleSidebar();
                  }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-sm font-medium text-foreground truncate"
                        title={chat.title}
                      >
                        {chat.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {chat.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {!sidebarOpen && (
          <div className="lg:hidden p-4 border-b border-border bg-background">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleToggleSidebar}
              className="flex items-center gap-2 w-full justify-start"
            >
              <ChevronRight className="w-4 h-4" />
              <span>Chat History</span>
            </Button>
          </div>
        )}

        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={handleToggleSidebar}
          />
        )}

        {/* Chat Content */}
        <div className="flex-1 flex flex-col min-h-0">{children}</div>
      </div>
    </div>
  );
}
