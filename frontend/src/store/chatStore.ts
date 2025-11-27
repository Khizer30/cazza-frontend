import { create } from "zustand";
import type { ChatMessage as ApiChatMessage } from "@/types/auth";

export interface ChatMessage {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  backendId?: string; // Store backend message ID for deletion
}

export interface ChatConversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

interface ChatState {
  conversations: ChatConversation[];
  currentConversationId: string | null;
  isLoadingHistory: boolean;
  
  // Actions
  createNewConversation: () => string;
  setCurrentConversation: (id: string | null) => void;
  addMessageToConversation: (conversationId: string, message: ChatMessage) => void;
  updateConversationTitle: (conversationId: string, title: string) => void;
  deleteConversation: (conversationId: string) => void;
  getCurrentConversation: () => ChatConversation | null;
  getConversationMessages: (conversationId: string) => ChatMessage[];
  // Backend integration methods
  loadChatHistoryFromBackend: (apiMessages: ApiChatMessage[]) => void;
  removeMessageFromConversation: (conversationId: string, messageId: string) => void;
  setLoadingHistory: (loading: boolean) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  conversations: [],
  currentConversationId: null,
  isLoadingHistory: false,

  createNewConversation: () => {
    const newId = `chat-${Date.now()}`;
    const newConversation: ChatConversation = {
      id: newId,
      title: "New Chat",
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    set((state) => ({
      conversations: [newConversation, ...state.conversations],
      currentConversationId: newId,
    }));

    return newId;
  },

  setCurrentConversation: (id) => {
    set({ currentConversationId: id });
  },

  addMessageToConversation: (conversationId, message) => {
    set((state) => {
      const updatedConversations = state.conversations.map((conv) => {
        if (conv.id === conversationId) {
          const updatedMessages = [...conv.messages, message];
          // Auto-generate title from first user message if still "New Chat"
          let title = conv.title;
          if (title === "New Chat" && message.type === "user") {
            title = message.content.slice(0, 50) + (message.content.length > 50 ? "..." : "");
          }
          return {
            ...conv,
            messages: updatedMessages,
            title,
            updatedAt: new Date(),
          };
        }
        return conv;
      });

      return { conversations: updatedConversations };
    });
  },

  updateConversationTitle: (conversationId, title) => {
    set((state) => ({
      conversations: state.conversations.map((conv) =>
        conv.id === conversationId ? { ...conv, title, updatedAt: new Date() } : conv
      ),
    }));
  },

  deleteConversation: (conversationId) => {
    set((state) => {
      const updatedConversations = state.conversations.filter(
        (conv) => conv.id !== conversationId
      );
      const newCurrentId =
        state.currentConversationId === conversationId
          ? updatedConversations.length > 0
            ? updatedConversations[0].id
            : null
          : state.currentConversationId;

      return {
        conversations: updatedConversations,
        currentConversationId: newCurrentId,
      };
    });
  },

  getCurrentConversation: () => {
    const { conversations, currentConversationId } = get();
    return conversations.find((conv) => conv.id === currentConversationId) || null;
  },

  getConversationMessages: (conversationId) => {
    const { conversations } = get();
    const conversation = conversations.find((conv) => conv.id === conversationId);
    return conversation?.messages || [];
  },

  // Load chat history from backend API
  loadChatHistoryFromBackend: (apiMessages) => {
    if (apiMessages.length === 0) {
      // If no messages, create a new conversation
      const { createNewConversation } = get();
      createNewConversation();
      return;
    }

    // Convert API messages to store format
    const storeMessages: ChatMessage[] = [];
    apiMessages.forEach((apiMsg) => {
      // Add user message
      storeMessages.push({
        id: `user-${apiMsg.id}`,
        type: "user",
        content: apiMsg.question,
        timestamp: new Date(apiMsg.createdAt),
        backendId: apiMsg.id,
      });
      // Add assistant message
      storeMessages.push({
        id: `assistant-${apiMsg.id}`,
        type: "assistant",
        content: apiMsg.answer,
        timestamp: new Date(apiMsg.updatedAt),
        backendId: apiMsg.id,
      });
    });

    // Sort by timestamp
    storeMessages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

    // Create or update the main conversation
    const conversationId = "main-chat";
    const title = storeMessages.length > 0 
      ? storeMessages[0].content.slice(0, 50) + (storeMessages[0].content.length > 50 ? "..." : "")
      : "Chat History";

    set((state) => {
      const existingConv = state.conversations.find((conv) => conv.id === conversationId);
      
      if (existingConv) {
        // Update existing conversation
        return {
          conversations: state.conversations.map((conv) =>
            conv.id === conversationId
              ? {
                  ...conv,
                  messages: storeMessages,
                  title,
                  updatedAt: new Date(),
                }
              : conv
          ),
          currentConversationId: conversationId,
        };
      } else {
        // Create new conversation
        return {
          conversations: [
            {
              id: conversationId,
              title,
              messages: storeMessages,
              createdAt: new Date(apiMessages[apiMessages.length - 1]?.createdAt || Date.now()),
              updatedAt: new Date(),
            },
          ],
          currentConversationId: conversationId,
        };
      }
    });
  },

  // Remove a message from conversation (used after backend deletion)
  removeMessageFromConversation: (conversationId, messageId) => {
    set((state) => {
      const updatedConversations = state.conversations.map((conv) => {
        if (conv.id === conversationId) {
          // Remove both user and assistant messages with the same backendId
          const messageToDelete = conv.messages.find((msg) => msg.id === messageId);
          const backendId = messageToDelete?.backendId;
          
          const updatedMessages = backendId
            ? conv.messages.filter((msg) => msg.backendId !== backendId)
            : conv.messages.filter((msg) => msg.id !== messageId);

          return {
            ...conv,
            messages: updatedMessages,
            updatedAt: new Date(),
          };
        }
        return conv;
      });

      return { conversations: updatedConversations };
    });
  },

  setLoadingHistory: (loading) => {
    set({ isLoadingHistory: loading });
  },
}));

