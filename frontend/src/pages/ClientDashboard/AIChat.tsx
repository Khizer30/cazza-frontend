import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatLayout } from "@/layouts/ChatLayout";
import { Send, Loader2, Trash2, Copy, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import ZZLogo from "@/assets/imgs/ZZ logo.png";
import { suggestedPrompts } from "@/constants/AiChat";
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

const markdownComponents: Components = {
  p: ({ children }) => (
    <p className="mb-3 last:mb-0 text-foreground leading-relaxed">{children}</p>
  ),
  strong: ({ children }) => (
    <strong className="font-bold text-foreground">{children}</strong>
  ),
  em: ({ children }) => <em className="italic text-foreground">{children}</em>,
  h1: ({ children }) => (
    <h1 className="text-2xl font-bold mb-4 mt-5 first:mt-0 text-foreground">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-xl font-bold mb-3 mt-4 first:mt-0 text-foreground">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg font-semibold mb-3 mt-4 first:mt-0 text-foreground">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-base font-semibold mb-2 mt-3 first:mt-0 text-foreground">
      {children}
    </h4>
  ),
  h5: ({ children }) => (
    <h5 className="text-sm font-semibold mb-2 mt-3 first:mt-0 text-foreground">
      {children}
    </h5>
  ),
  h6: ({ children }) => (
    <h6 className="text-sm font-medium mb-2 mt-2 first:mt-0 text-foreground">
      {children}
    </h6>
  ),
  ul: ({ children }) => (
    <ul className="list-disc ml-5 mb-3 space-y-2 text-foreground">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal ml-5 mb-3 space-y-2 text-foreground">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="text-foreground leading-relaxed pl-1">{children}</li>
  ),
  code: ({ children, className }) => {
    const isInline = !className;
    return isInline ? (
      <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-foreground">
        {children}
      </code>
    ) : (
      <code className={className}>{children}</code>
    );
  },
  pre: ({ children }) => (
    <pre className="bg-muted p-3 rounded-lg overflow-x-auto mb-3 text-sm font-mono text-foreground">
      {children}
    </pre>
  ),
  hr: () => <hr className="my-4 border-border" />,
  a: ({ children, href }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary underline hover:text-primary/80 transition-colors"
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-muted-foreground/30 pl-4 my-3 italic text-foreground/80">
      {children}
    </blockquote>
  ),
};

export const AIChat = () => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (messageId: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(messageId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const {
    conversations,
    currentConversationId,
    setCurrentConversation,
    addMessageToConversation,
    getCurrentConversation,
    deleteConversation,
    loadChatsFromBackend,
    loadChatMessagesFromBackend,
    removeMessageFromConversation,
    updateConversationTitle,
    isLoadingHistory,
    setLoadingHistory,
  } = useChatStore();

  const {
    createChat,
    getAllChats,
    updateChatTitle,
    deleteChat: deleteChatAPI,
    askQuestion,
    getChatHistory,
    deleteMessage,
  } = useChatbot();

  const currentConversation = getCurrentConversation();
  const messages = currentConversation?.messages || [];

  useEffect(() => {
    const loadChats = async () => {
      try {
        setLoadingHistory(true);
        const chats = await getAllChats();
        if (chats && chats.length > 0) {
          loadChatsFromBackend(chats);
          setCurrentConversation(chats[0].id);
        }
      } catch (error) {
        console.error("Failed to load chats:", error);
      } finally {
        setLoadingHistory(false);
      }
    };

    loadChats();
  }, []);

  useEffect(() => {
    const loadMessages = async () => {
      if (currentConversationId && conversations.length > 0) {
        const conv = conversations.find((c) => c.id === currentConversationId);
        if (conv && conv.messages.length === 0) {
          try {
            const historyData = await getChatHistory(currentConversationId);
            if (historyData && historyData.messages) {
              loadChatMessagesFromBackend(
                currentConversationId,
                historyData.messages
              );
            }
          } catch (error) {
            console.error("Failed to load messages:", error);
          }
        }
      }
    };

    loadMessages();
  }, [currentConversationId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userInput = input.trim();
    setInput("");
    setIsLoading(true);

    try {
      let activeChatId = currentConversationId;

      if (!activeChatId) {
        const chatTitle =
          userInput.slice(0, 50) + (userInput.length > 50 ? "..." : "");
        const newChat = await createChat({ title: chatTitle });
        if (newChat) {
          loadChatsFromBackend([newChat]);
          setCurrentConversation(newChat.id);
          activeChatId = newChat.id;
        } else {
          throw new Error("Failed to create chat");
        }
      } else {
        // If chat exists but has no messages, update title to match the first message
        const conv = conversations.find((c) => c.id === activeChatId);
        if (conv && conv.messages.length === 0) {
          const chatTitle =
            userInput.slice(0, 50) + (userInput.length > 50 ? "..." : "");
          handleRenameChat(activeChatId, chatTitle, true);
        }
      }

      const tempUserMessageId = `temp-user-${Date.now()}`;
      const userMessage: ChatMessage = {
        id: tempUserMessageId,
        type: "user",
        content: userInput,
        timestamp: new Date(),
      };

      addMessageToConversation(activeChatId, userMessage);

      const response = await askQuestion(userInput, activeChatId);

      removeMessageFromConversation(activeChatId, tempUserMessageId);

      const backendUserMessage: ChatMessage = {
        id: `user-${response.id}`,
        type: "user",
        content: response.question,
        timestamp: new Date(response.createdAt),
        backendId: response.id,
      };

      const backendAiMessage: ChatMessage = {
        id: `assistant-${response.id}`,
        type: "assistant",
        content: response.answer,
        timestamp: new Date(response.updatedAt),
        backendId: response.id,
      };

      addMessageToConversation(activeChatId, backendUserMessage);
      addMessageToConversation(activeChatId, backendAiMessage);
    } catch (error) {
      console.error("Error getting AI response:", error);

      if (currentConversationId) {
        const errorAiMessage: ChatMessage = {
          id: Date.now().toString() + "-error",
          type: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
          timestamp: new Date(),
        };

        addMessageToConversation(currentConversationId, errorAiMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = async () => {
    try {
      const newChat = await createChat();
      if (newChat) {
        loadChatsFromBackend([
          ...conversations.map((c) => ({
            id: c.id,
            title: c.title,
            userId: "",
            createdAt: c.createdAt.toISOString(),
            updatedAt: c.updatedAt.toISOString(),
          })),
          newChat,
        ]);
        setCurrentConversation(newChat.id);
      }
    } catch (error) {
      console.error("Failed to create new chat:", error);
    }
  };

  const handleSelectChat = (chatId: string) => {
    setCurrentConversation(chatId);
  };

  const handleDeleteChat = async (chatId: string) => {
    try {
      await deleteChatAPI(chatId);
      deleteConversation(chatId);
    } catch (error) {
      console.error("Failed to delete chat:", error);
    }
  };

  const handleRenameChat = async (
    chatId: string,
    newTitle: string,
    muteToast: boolean = false
  ) => {
    try {
      await updateChatTitle(chatId, { title: newTitle }, muteToast);
      updateConversationTitle(chatId, newTitle);
    } catch (error) {
      console.error("Failed to rename chat:", error);
    }
  };

  const handleDeleteMessageClick = (messageId: string) => {
    setMessageToDelete(messageId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!currentConversationId || !messageToDelete) return;

    setIsDeleting(true);
    try {
      const message = messages.find((msg) => msg.id === messageToDelete);
      if (!message?.backendId) {
        removeMessageFromConversation(currentConversationId, messageToDelete);
        setDeleteDialogOpen(false);
        setMessageToDelete(null);
        return;
      }

      await deleteMessage(message.backendId);
      removeMessageFromConversation(currentConversationId, messageToDelete);
      setDeleteDialogOpen(false);
      setMessageToDelete(null);
    } catch (error) {
      console.error("Failed to delete message:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const chatHistoryItems = conversations.map((conv) => ({
    id: conv.id,
    title: conv.title,
    timestamp:
      conv.updatedAt && !isNaN(conv.updatedAt.getTime())
        ? formatDistanceToNow(conv.updatedAt, { addSuffix: true })
        : "just now",
  }));

  return (
    <ChatLayout
      chatHistory={chatHistoryItems}
      onNewChat={handleNewChat}
      onSelectChat={handleSelectChat}
      onDeleteChat={handleDeleteChat}
      onRenameChat={handleRenameChat}
      currentChatId={currentConversationId || undefined}
      isSidebarOpen={isSidebarOpen}
      onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
    >
      <div className="h-[92vh] flex flex-col bg-background">
        <div className="flex-shrink-0 p-4 border-b border-border bg-card">
          <h1 className="text-lg font-semibold">
            {currentConversation?.title || "Ask Cazza"}
          </h1>
        </div>

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
                  className={`flex group ${message.type === "user" ? "justify-end" : "justify-start"
                    }`}
                >
                  <div
                    className={`relative ${message.type === "user"
                      ? "max-w-xs lg:max-w-md"
                      : "max-w-2xl lg:max-w-3xl"
                      } px-4 py-3 pb-8 rounded-lg ${message.type === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-card border border-border shadow-sm text-foreground"
                      }`}
                  >
                    {message.type === "assistant" ? (
                      <div className="markdown-content">
                        <ReactMarkdown components={markdownComponents}>
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <span>{message.content}</span>
                    )}
                    <div className="absolute bottom-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                      <button
                        onClick={() => handleCopy(message.id, message.content)}
                        className={`w-6 h-6 rounded-full flex items-center justify-center transition-all hover:scale-110 ${copiedId === message.id
                          ? "bg-green-500 text-white"
                          : "bg-muted hover:bg-muted-foreground/20 text-muted-foreground"
                          }`}
                        title="Copy message"
                      >
                        {copiedId === message.id ? (
                          <Check className="w-3.5 h-3.5" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                      {message.backendId && (
                        <button
                          onClick={() => handleDeleteMessageClick(message.id)}
                          className="w-6 h-6 rounded-full bg-destructive/80 hover:bg-destructive text-destructive-foreground flex items-center justify-center transition-all hover:scale-110"
                          title="Delete message"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
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
              Are you sure you want to delete this message? This action cannot
              be undone.
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
