import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatLayout } from "@/layouts/ChatLayout";
import { Send, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import ZZLogo from "@/assets/imgs/ZZ logo.png";
import { suggestedPrompts } from "@/constants/AiChat";
import { sendMessageToGemini, type ChatMessage as GeminiChatMessage } from "@/services/geminiService";
import { useToast } from "@/components/ToastProvider";
import { useChatStore, type ChatMessage } from "@/store/chatStore";
import { formatDistanceToNow } from "date-fns";

export const AIChat = () => {
  const { showToast } = useToast();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const {
    conversations,
    currentConversationId,
    createNewConversation,
    setCurrentConversation,
    addMessageToConversation,
    getCurrentConversation,
    deleteConversation,
  } = useChatStore();

  // Get current conversation messages
  const currentConversation = getCurrentConversation();
  const messages = currentConversation?.messages || [];

  // Create initial conversation if none exists
  useEffect(() => {
    if (conversations.length === 0) {
      createNewConversation();
    } else if (!currentConversationId) {
      setCurrentConversation(conversations[0].id);
    }
  }, []);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Convert messages to Gemini format
  const convertToGeminiFormat = (msgs: ChatMessage[]): GeminiChatMessage[] => {
    return msgs.map((msg) => ({
      role: msg.type === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));
  };

  // Send a message and get AI response from Gemini
  const handleSendMessage = async () => {
    if (!input.trim() || isLoading || !currentConversationId) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    const userInput = input.trim();
    addMessageToConversation(currentConversationId, userMessage);
    setInput("");
    setIsLoading(true);

    try {
      // Convert existing messages to Gemini format (before adding the new user message)
      const chatHistory = convertToGeminiFormat(messages);
      
      // Get response from Gemini
      const response = await sendMessageToGemini(userInput, chatHistory);

      const aiMessage: ChatMessage = {
        id: Date.now().toString() + "-ai",
        type: "assistant",
        content: response,
        timestamp: new Date(),
      };

      addMessageToConversation(currentConversationId, aiMessage);
    } catch (error) {
      console.error("Error getting AI response:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to get response. Please try again.";

      showToast(errorMessage, "error");

      // Add error message to chat
      const errorAiMessage: ChatMessage = {
        id: Date.now().toString() + "-error",
        type: "assistant",
        content: `Sorry, I encountered an error: ${errorMessage}. Please try again.`,
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
          {messages.length > 0 ? (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`relative max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
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
    </ChatLayout>
  );
};
