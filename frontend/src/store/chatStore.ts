import { create } from "zustand";

export interface ChatMessage {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
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
  
  // Actions
  createNewConversation: () => string;
  setCurrentConversation: (id: string | null) => void;
  addMessageToConversation: (conversationId: string, message: ChatMessage) => void;
  updateConversationTitle: (conversationId: string, title: string) => void;
  deleteConversation: (conversationId: string) => void;
  getCurrentConversation: () => ChatConversation | null;
  getConversationMessages: (conversationId: string) => ChatMessage[];
}

export const useChatStore = create<ChatState>((set, get) => ({
  conversations: [],
  currentConversationId: null,

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
}));

