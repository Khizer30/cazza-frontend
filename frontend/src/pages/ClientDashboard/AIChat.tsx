import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatLayout } from "@/layouts/ChatLayout";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import ZZLogo from "@/assets/imgs/ZZ logo.png";
import { suggestedPrompts, cannedResponses } from "@/constants/AiChat";

export const AIChat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    Array<{
      id: string;
      type: "user" | "assistant";
      content: string;
      timestamp: Date;
    }>
  >([]);

  const [responseIndex, setResponseIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 📨 Send a message and simulate AI response
  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      type: "user" as const,
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setTimeout(() => {
      // Get the next canned response
      const nextResponse = cannedResponses[responseIndex] || {
        question: input.trim(),
        answer:
          "I'm still learning that one! Try asking about TikTok sales, refunds, or profit breakdowns.",
      };

      const aiMessage = {
        id: Date.now().toString() + "-ai",
        type: "assistant" as const,
        content: nextResponse.answer,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setResponseIndex((prev) =>
        Math.min(prev + 1, cannedResponses.length - 1)
      );
    }, 800); // slight delay for realism
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSendMessage();
  };

  return (
    <ChatLayout>
      <div className="h-[92vh] flex flex-col bg-background">
        {/* Header - fixed at top */}
        <div className="flex-shrink-0 p-4 border-b border-border bg-white">
          <h1 className="text-lg font-semibold">Ask Cazza</h1>
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
                        : "bg-white border border-border shadow-sm text-foreground"
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
        <div className="flex-shrink-0 p-4 border-t border-border bg-white">
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
              disabled={!input.trim()}
              className="px-3 py-2 rounded-lg bg-primary text-white"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </ChatLayout>
  );
};
