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
  onDeleteChat?: (chatId: string) => void;
  onRenameChat?: (chatId: string, newTitle: string) => void;
  currentChatId?: string;
  isSidebarOpen?: boolean;
  onToggleSidebar?: () => void;
}

export function ChatLayout({
  children,
  chatHistory = [],
  onNewChat,
  onSelectChat,
  // onDeleteChat,
  // onRenameChat,
  currentChatId,
  isSidebarOpen = false,
  onToggleSidebar,
}: ChatLayoutProps) {
  // const [isEditing, setIsEditing] = useState<string | null>(null);
  // const [editTitle, setEditTitle] = useState("");
  const [internalSidebarOpen, setInternalSidebarOpen] = useState(() => {
    // Initialize based on screen size
    if (typeof window !== "undefined") {
      return window.innerWidth >= 1024;
    }
    return false;
  });

  // Handle responsive sidebar behavior
  useEffect(() => {
    const checkScreenSize = () => {
      const isLargeScreen = window.innerWidth >= 1024; // lg breakpoint
      if (isLargeScreen) {
        setInternalSidebarOpen(true);
      }
      // Don't force close on mobile - let user control it
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Use external state if provided, otherwise use internal state
  const sidebarOpen = onToggleSidebar ? isSidebarOpen : internalSidebarOpen;
  const handleToggleSidebar =
    onToggleSidebar || (() => setInternalSidebarOpen(!internalSidebarOpen));

  // const handleEditStart = (chat: ChatHistoryItem) => {
  //   setIsEditing(chat.id);
  //   setEditTitle(chat.title);
  // };

  // const handleEditSave = () => {
  //   if (editTitle.trim() && onRenameChat && isEditing) {
  //     onRenameChat(isEditing, editTitle.trim());
  //   }
  //   setIsEditing(null);
  //   setEditTitle("");
  // };

  // const handleEditCancel = () => {
  //   setIsEditing(null);
  //   setEditTitle("");
  // };

  return (
    <div className="flex h-full bg-background">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-0 lg:w-64"
        } transition-all duration-300 border-r border-border bg-card flex flex-col overflow-hidden ${
          // Mobile: absolute positioning, full height, overlay
          "absolute inset-y-0 left-0 z-50 bg-background/95 backdrop-blur-sm"
        } ${
          // Desktop: always visible, relative positioning
          "lg:relative lg:z-auto lg:bg-card lg:block"
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground">
                Chat History
              </span>
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
        </div>

        {/* Chat History List */}
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
                    // Auto-close sidebar on mobile after selection
                    if (window.innerWidth < 1024) {
                      handleToggleSidebar();
                    }
                  }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-sm font-medium text-foreground truncate"
                        title={chat.title}
                        style={{
                          maxWidth: "180px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
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
        {/* Mobile Sidebar Toggle */}
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

        {/* Mobile Overlay - Only show on mobile when sidebar is open */}
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={handleToggleSidebar}
          />
        )}

        {/* Chat Content */}
        <div className="flex-1 min-h-0">{children}</div>
      </div>
    </div>
  );
}
