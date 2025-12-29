// ChatLayout.tsx
import { useState, useEffect, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
  MessageSquare,
  Plus,
  ChevronLeft,
  ChevronRight,
  History,
  Trash2,
  Pencil,
  Check,
  X,
  Loader2,
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
  onRenameChat?: (chatId: string, newTitle: string) => Promise<void>;
  currentChatId?: string;
  isSidebarOpen?: boolean;
  onToggleSidebar?: () => void;
}

export function ChatLayout({
  children,
  chatHistory = [],
  onNewChat,
  onSelectChat,
  onDeleteChat,
  onRenameChat,
  currentChatId,
  isSidebarOpen = false,
  onToggleSidebar,
}: ChatLayoutProps) {
  const [internalSidebarOpen, setInternalSidebarOpen] = useState(() => {
    if (typeof window !== "undefined") return window.innerWidth >= 1024;
    return false;
  });
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [isRenaming, setIsRenaming] = useState(false);

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

  const handleStartEdit = (chatId: string, currentTitle: string) => {
    setEditingChatId(chatId);
    setEditingTitle(currentTitle);
  };

  const handleCancelEdit = () => {
    setEditingChatId(null);
    setEditingTitle("");
  };

  const handleSaveEdit = async (chatId: string) => {
    if (editingTitle.trim() && onRenameChat) {
      setIsRenaming(true);
      try {
        await onRenameChat(chatId, editingTitle.trim());
      } finally {
        setIsRenaming(false);
        handleCancelEdit();
      }
    } else {
      handleCancelEdit();
    }
  };

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
                  className={`group relative rounded-lg p-3 transition-all duration-200 ${
                    currentChatId === chat.id
                      ? "bg-primary/10 border border-primary/20"
                      : "hover:bg-muted/50"
                  } ${editingChatId === chat.id ? "" : "cursor-pointer"}`}
                  onClick={() => {
                    if (editingChatId !== chat.id) {
                      onSelectChat?.(chat.id);
                      if (window.innerWidth < 1024) handleToggleSidebar();
                    }
                  }}
                >
                  {editingChatId === chat.id ? (
                    <div className="flex items-center gap-2">
                      <Input
                        value={editingTitle || ""}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !isRenaming) handleSaveEdit(chat.id);
                          if (e.key === "Escape" && !isRenaming) handleCancelEdit();
                        }}
                        className="h-8 text-sm"
                        autoFocus
                        onClick={(e) => e.stopPropagation()}
                        disabled={isRenaming}
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSaveEdit(chat.id);
                        }}
                        className="p-1.5 hover:bg-primary/10 rounded text-primary flex-shrink-0"
                        title="Save"
                        type="button"
                        disabled={isRenaming}
                      >
                        {isRenaming ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Check className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCancelEdit();
                        }}
                        className="p-1.5 hover:bg-destructive/10 rounded text-muted-foreground hover:text-destructive flex-shrink-0"
                        title="Cancel"
                        type="button"
                        disabled={isRenaming}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-start gap-2 w-full">
                      <div className="min-w-0 flex-1">
                        <p
                          className="text-sm font-medium text-foreground truncate max-w-[140px]"
                          title={chat.title}
                        >
                          {chat.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {chat.timestamp}
                        </p>
                      </div>
                      <div className="flex items-center gap-0.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        {onRenameChat && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStartEdit(chat.id, chat.title);
                            }}
                            className="p-1 hover:bg-primary/10 rounded text-muted-foreground hover:text-primary"
                            title="Rename chat"
                            type="button"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                        )}
                        {onDeleteChat && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteChat(chat.id);
                            }}
                            className="p-1 hover:bg-destructive/10 rounded text-muted-foreground hover:text-destructive"
                            title="Delete chat"
                            type="button"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  )}
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
