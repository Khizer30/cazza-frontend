import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatLayout } from "@/layouts/ChatLayout";
import { Send, Loader2, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import ZZLogo from "@/assets/imgs/ZZ logo.png";
import { suggestedPrompts } from "@/constants/AiChat";
import { useToast } from "@/components/ToastProvider";
import { useChatStore, type ChatMessage } from "@/store/chatStore";
import { useChatbot } from "@/hooks/useChatbot";
import { formatDistanceToNow } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const AIChat = () => {
  const { showToast } = useToast();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    conversations,
    currentConversationId,
    createNewConversation,
    setCurrentConversation,
    addMessageToConversation,
    getCurrentConversation,
    deleteConversation,
    loadChatHistoryFromBackend,
    removeMessageFromConversation,
    isLoadingHistory,
    setLoadingHistory,
  } = useChatStore();

  const { askQuestion, getChatHistory, deleteMessage } = useChatbot();

  // Get current conversation messages
  const currentConversation = getCurrentConversation();
  const messages = currentConversation?.messages || [];

  // Load chat history from backend on mount
  useEffect(() => {
    const loadHistory = async () => {
      try {
        setLoadingHistory(true);
        const historyData = await getChatHistory();
        if (historyData && historyData.messages) {
          loadChatHistoryFromBackend(historyData.messages);
        } else if (conversations.length === 0) {
          // If no history and no conversations, create a new one
          createNewConversation();
        }
      } catch (error) {
        console.error("Failed to load chat history:", error);
        // Create new conversation if loading fails
        if (conversations.length === 0) {
          createNewConversation();
        }
      } finally {
        setLoadingHistory(false);
      }
    };

    loadHistory();
  }, []); // Only run on mount

  // Set current conversation if none is selected
  useEffect(() => {
    if (conversations.length > 0 && !currentConversationId) {
      setCurrentConversation(conversations[0].id);
    }
  }, [conversations, currentConversationId]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send a message and get AI response from backend
  const handleSendMessage = async () => {
    if (!input.trim() || isLoading || !currentConversationId) return;

    const userInput = input.trim();
    const tempUserMessageId = `temp-user-${Date.now()}`;
    
    // Add user message optimistically
    const userMessage: ChatMessage = {
      id: tempUserMessageId,
      type: "user",
      content: userInput,
      timestamp: new Date(),
    };

    addMessageToConversation(currentConversationId, userMessage);
    setInput("");
    setIsLoading(true);

    try {
      // Send question to backend
      const response = await askQuestion(userInput);

      // Remove temporary user message
      removeMessageFromConversation(currentConversationId, tempUserMessageId);
      
      // Add user message with backend ID
      const backendUserMessage: ChatMessage = {
        id: `user-${response.id}`,
        type: "user",
        content: response.question,
        timestamp: new Date(response.createdAt),
        backendId: response.id,
      };

      // Add assistant message with backend ID
      const backendAiMessage: ChatMessage = {
        id: `assistant-${response.id}`,
        type: "assistant",
        content: response.answer,
        timestamp: new Date(response.updatedAt),
        backendId: response.id,
      };

      // Add backend messages to conversation
      addMessageToConversation(currentConversationId, backendUserMessage);
      addMessageToConversation(currentConversationId, backendAiMessage);
    } catch (error) {
      console.error("Error getting AI response:", error);
      
      // Remove temporary user message on error
      removeMessageFromConversation(currentConversationId, tempUserMessageId);
      
      // Add error message to chat
      const errorAiMessage: ChatMessage = {
        id: Date.now().toString() + "-error",
        type: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };

      addMessageToConversation(currentConversationId, errorAiMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle new chat
  const handleNewChat = () => {
    createNewConversation();
  };

  // Handle chat selection
  const handleSelectChat = (chatId: string) => {
    setCurrentConversation(chatId);
  };

  // Handle delete chat
  const handleDeleteChat = (chatId: string) => {
    deleteConversation(chatId);
    showToast("Chat deleted", "success");
  };

  // Handle delete message click - opens confirmation dialog
  const handleDeleteMessageClick = (messageId: string) => {
    setMessageToDelete(messageId);
    setDeleteDialogOpen(true);
  };

  // Confirm and delete message
  const handleConfirmDelete = async () => {
    if (!currentConversationId || !messageToDelete) return;

    setIsDeleting(true);
    try {
      // Find the message to get its backendId
      const message = messages.find((msg) => msg.id === messageToDelete);
      if (!message?.backendId) {
        // If no backendId, just remove from local store
        removeMessageFromConversation(currentConversationId, messageToDelete);
        setDeleteDialogOpen(false);
        setMessageToDelete(null);
        return;
      }

      await deleteMessage(message.backendId);
      // Remove message from conversation after successful deletion
      removeMessageFromConversation(currentConversationId, messageToDelete);
      setDeleteDialogOpen(false);
      setMessageToDelete(null);
    } catch (error) {
      console.error("Failed to delete message:", error);
      // Error toast is already shown in the hook
    } finally {
      setIsDeleting(false);
    }
  };

  // Format chat history for sidebar
  const chatHistoryItems = conversations.map((conv) => ({
    id: conv.id,
    title: conv.title,
    timestamp: formatDistanceToNow(conv.updatedAt, { addSuffix: true }),
  }));

  return (
    <ChatLayout
      chatHistory={chatHistoryItems}
      onNewChat={handleNewChat}
      onSelectChat={handleSelectChat}
      onDeleteChat={handleDeleteChat}
      currentChatId={currentConversationId || undefined}
      isSidebarOpen={isSidebarOpen}
      onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
    >
      <div className="h-[92vh] flex flex-col bg-background">
        {/* Header - fixed at top */}
        <div className="flex-shrink-0 p-4 border-b border-border bg-card">
          <h1 className="text-lg font-semibold">
            {currentConversation?.title || "Ask Cazza"}
          </h1>
        </div>

        {/* Messages container */}
        <div className="flex-1 overflow-y-auto p-6">
          {isLoadingHistory ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          ) : messages.length > 0 ? (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex group ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`relative max-w-xs lg:max-w-md px-4 py-3 pb-8 rounded-lg ${
                      message.type === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-card border border-border shadow-sm text-foreground"
                    }`}
                  >
                    {message.type === "assistant" ? (
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    ) : (
                      <span>{message.content}</span>
                    )}
                    {message.backendId && (
                      <button
                        onClick={() => handleDeleteMessageClick(message.id)}
                        className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-destructive/80 hover:bg-destructive text-destructive-foreground flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
                        title="Delete message"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="relative max-w-xs lg:max-w-md px-4 py-3 rounded-lg bg-card border border-border shadow-sm">
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          ) : (
            /* Welcome state */
            <div className="flex flex-col items-center justify-center h-full p-8">
              <div className="w-full max-w-2xl bg-card rounded-lg shadow-soft border border-border midday-card">
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-5 h-5 bg-foreground/20 rounded-sm flex items-center justify-center">
                      <div className="w-3 h-3 bg-foreground/40 rounded-sm"></div>
                    </div>
                    <span className="text-sm font-medium text-card-foreground">
                      Ask Cazza
                    </span>
                  </div>

                  <div className="text-center space-y-8">
                    <div className="space-y-6 flex flex-col items-center">
                      <img src={ZZLogo} alt="Cazza" className="size-32" />
                      <h1 className="text-2xl font-semibold text-card-foreground leading-tight">
                        Hello, how can I help you today?
                      </h1>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {suggestedPrompts.map((prompt, index) => (
                        <button
                          key={index}
                          className="h-auto p-4 text-left justify-start hover:bg-muted/30 transition-all duration-200 border border-border rounded-lg bg-card hover:shadow-soft hover:scale-105 midday-button text-sm font-medium text-card-foreground"
                          onClick={() => setInput(prompt)}
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input area fixed at bottom */}
        <div className="flex-shrink-0 p-4 border-t border-border bg-background">
          <div className="flex items-center gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Ask Cazza a question..."
              className="flex-1 border border-border rounded-lg p-2"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              className="px-3 py-2 rounded-lg bg-primary text-secondary"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Delete confirmation dialog */}
      <AlertDialog
        open={deleteDialogOpen}
        onOpenChange={(open) => {
          setDeleteDialogOpen(open);
          if (!open) {
            setMessageToDelete(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Message</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this message? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ChatLayout>
  );
};
