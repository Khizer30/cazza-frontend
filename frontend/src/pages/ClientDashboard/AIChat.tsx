import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatLayout } from "@/layouts/ChatLayout";
import { FormattedMessage } from "@/utils/FormattedMessage";
import { BrainCircuit, Forward, Send, Sparkles, User } from "lucide-react";
import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import ZZLogo from "@/assets/imgs/ZZ logo.png";
const suggestedPrompts = [
  "What's my TikTok profit this month?",
  "Am I close to the £90k VAT threshold?",
  "What's my profit on TikTok vs Amazon?",
  "How do I map Shopify into Xero?",
];
export const AIChat = () => {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<
    Array<{
      id: string;
      type: "user" | "assistant";
      content: string;
      timestamp: Date;
      isTyping?: boolean;
      isNew?: boolean;
    }>
  >([]);
  const [chatHistory, setChatHistory] = useState<
    Array<{
      id: string;
      title: string;
      timestamp: string;
    }>
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [forwardDialog, setForwardDialog] = useState<{
    open: boolean;
    messageContent: string;
    messageId: string;
  }>({ open: false, messageContent: "", messageId: "" });
  return (
    <ChatLayout>
      <div className="h-full flex flex-col bg-background">
        {/* Messages Area - Show if there are messages, otherwise show welcome */}
        {messages.length > 0 ? (
          <div className="flex-1 p-6 space-y-4 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`group flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                } animate-slide-up`}
              >
                <div
                  className={`relative max-w-xs lg:max-w-md px-4 py-3 rounded-lg transition-all duration-300 ${
                    message.type === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-white border border-border shadow-sm text-foreground"
                  }`}
                >
                  {message.isTyping ? (
                    <div className="flex items-center gap-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        Cazza is typing...
                      </span>
                    </div>
                  ) : (
                    <>
                      <div className="text-sm space-y-1">
                        {message.type === "assistant" ? (
                          <div className="prose prose-sm max-w-none dark:prose-invert">
                            <ReactMarkdown
                              components={{
                                p: ({ children }) => (
                                  <p className="mb-2 text-foreground">
                                    {children}
                                  </p>
                                ),
                                strong: ({ children }) => (
                                  <strong className="font-bold text-foreground">
                                    {children}
                                  </strong>
                                ),
                                ul: ({ children }) => (
                                  <ul className="list-disc ml-4 mb-2 space-y-1">
                                    {children}
                                  </ul>
                                ),
                                ol: ({ children }) => (
                                  <ol className="list-decimal ml-4 mb-2 space-y-1">
                                    {children}
                                  </ol>
                                ),
                                li: ({ children }) => (
                                  <li className="text-foreground">
                                    {children}
                                  </li>
                                ),
                              }}
                            >
                              {message.content}
                            </ReactMarkdown>
                          </div>
                        ) : (
                          <span className="text-primary-foreground">
                            {message.content}
                          </span>
                        )}
                      </div>
                      {/* Forward button at bottom for assistant messages */}
                      {message.type === "assistant" && message.content && (
                        <div className="mt-2 pt-2 border-t border-border/50 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="sm"
                            // onClick={() =>
                            //   handleForwardMessage(message.id, message.content)
                            // }
                            className="h-7 w-7 p-0 hover:bg-muted hover:text-foreground"
                            title="Forward to channel"
                          >
                            <Forward className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
            {/* Auto-scroll anchor */}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          /* Welcome Screen - Only show when no messages */
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <div className="w-full max-w-2xl bg-card rounded-lg shadow-soft border border-border midday-card">
              <div className="p-8">
                {/* Header */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-5 h-5 bg-foreground/20 rounded-sm flex items-center justify-center">
                    <div className="w-3 h-3 bg-foreground/40 rounded-sm"></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-card-foreground">
                      Ask Cazza
                    </span>
                  </div>
                </div>

                {/* Main Content */}
                <div className="text-center space-y-8">
                  {/* Greeting */}
                  <div className="space-y-6 flex flex-col items-center">
                    {/* <div className="w-20 h-20 bg-foreground rounded-full flex items-center justify-center mx-auto">
                      <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center">
                        <div className="w-6 h-6 bg-foreground rounded-sm"></div>
                      </div>
                    </div> */}

                    <img src={ZZLogo} alt="Cazza" className="size-32" />
                    <h1 className="text-2xl font-semibold text-card-foreground leading-tight">
                      Hello, how can I help you today?
                    </h1>
                  </div>

                  {/* Suggested Prompts */}
                  <div className="grid grid-cols-2 gap-3">
                    {suggestedPrompts.map((prompt, index) => (
                      <button
                        key={index}
                        className="h-auto p-4 text-left justify-start hover:bg-muted/30 transition-all duration-200 border border-border rounded-lg bg-card hover:shadow-soft hover:scale-105 midday-button text-sm font-medium text-card-foreground"
                        // onClick={() => handleSuggestionClick(prompt)}
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

        {/* Input Section - Always at bottom */}
        <div className="flex-shrink-0 p-6 border-t border-border bg-background">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-foreground/20 rounded-sm flex items-center justify-center">
              <div className="w-3 h-3 bg-foreground/40 rounded-sm"></div>
            </div>
            <div className="flex-1 flex items-center gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Cazza a question..."
                className="border border-border bg-card text-card-foreground placeholder:text-muted-foreground focus:bg-card transition-colors rounded-lg"
                // onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button
                // onClick={handleSendMessage}
                size="sm"
                className="px-3 py-2 h-8 bg-foreground hover:bg-foreground/90 text-background rounded-lg"
                // disabled={!input.trim() || isLoading}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Forward Message Dialog */}
        {/* <ForwardMessageDialog
          open={forwardDialog.open}
          onOpenChange={(open) =>
            setForwardDialog((prev) => ({ ...prev, open }))
          }
          messageContent={forwardDialog.messageContent}
          messageId={forwardDialog.messageId}
          onForwardSuccess={() => {
            toast({
              title: "Success",
              description: "AI response forwarded to channel",
            });
          }}
        /> */}
      </div>
    </ChatLayout>
  );
};
