import { useToast } from "@/components/ToastProvider";
import {
  createChatService,
  getAllChatsService,
  getChatService,
  updateChatTitleService,
  deleteChatService,
  askQuestionService,
  getChatHistoryService,
  deleteMessageService,
} from "@/services/chatbotService";
import { AxiosError } from "axios";
import type {
  CREATE_CHAT_PAYLOAD,
  UPDATE_CHAT_TITLE_PAYLOAD,
} from "@/types/auth";

export const useChatbot = () => {
  const { showToast } = useToast();

  const askQuestion = async (question: string, chatId?: string) => {
    try {
      const res = await askQuestionService({ question, chatId });
      if (res && res.success && res.data) {
        return res.data;
      } else if (res && !res.success) {
        const errorMessage =
          res.errors || res.message || "Failed to process question";
        showToast(errorMessage, "error");
        throw new Error(errorMessage);
      }
      throw new Error("Invalid response from server");
    } catch (error: unknown) {
      console.error("Ask question error:", error);
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.errors ||
          error.response?.data?.message ||
          "Failed to process question";
        showToast(errorMessage, "error");
        throw new Error(errorMessage);
      } else if (error instanceof Error) {
        throw error;
      }
      throw new Error("An unexpected error occurred");
    }
  };

  const getChatHistory = async (chatId: string) => {
    try {
      const res = await getChatHistoryService(chatId);
      if (res && res.success && res.data) {
        return res.data;
      } else if (res && !res.success) {
        const errorMessage = res.message || "Failed to retrieve chat history";
        showToast(errorMessage, "error");
        throw new Error(errorMessage);
      }
      throw new Error("Invalid response from server");
    } catch (error: unknown) {
      console.error("Get chat history error:", error);
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message || "Failed to retrieve chat history";
        if (error.response?.status !== 404) {
          showToast(errorMessage, "error");
        }
        throw new Error(errorMessage);
      } else if (error instanceof Error) {
        throw error;
      }
      throw new Error("An unexpected error occurred");
    }
  };

  const deleteMessage = async (messageId: string) => {
    try {
      const res = await deleteMessageService(messageId);
      if (res && res.success) {
        showToast(res.message || "Message deleted successfully", "success");
        return res;
      } else if (res && !res.success) {
        const errorMessage = res.message || "Failed to delete message";
        showToast(errorMessage, "error");
        throw new Error(errorMessage);
      }
      throw new Error("Invalid response from server");
    } catch (error: unknown) {
      console.error("Delete message error:", error);
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message || "Failed to delete message";
        showToast(errorMessage, "error");
        throw new Error(errorMessage);
      } else if (error instanceof Error) {
        throw error;
      }
      throw new Error("An unexpected error occurred");
    }
  };

  const createChat = async (payload?: CREATE_CHAT_PAYLOAD) => {
    try {
      const res = await createChatService(payload);
      if (res && res.success && res.data) {
        return res.data.chat;
      } else if (res && !res.success) {
        const errorMessage = res.message || "Failed to create chat";
        showToast(errorMessage, "error");
        throw new Error(errorMessage);
      }
      throw new Error("Invalid response from server");
    } catch (error: unknown) {
      console.error("Create chat error:", error);
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message || "Failed to create chat";
        showToast(errorMessage, "error");
        throw new Error(errorMessage);
      } else if (error instanceof Error) {
        throw error;
      }
      throw new Error("An unexpected error occurred");
    }
  };

  const getAllChats = async () => {
    try {
      const res = await getAllChatsService();
      if (res && res.success && res.data) {
        return res.data.chats;
      } else if (res && !res.success) {
        const errorMessage = res.message || "Failed to retrieve chats";
        showToast(errorMessage, "error");
        throw new Error(errorMessage);
      }
      throw new Error("Invalid response from server");
    } catch (error: unknown) {
      console.error("Get all chats error:", error);
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message || "Failed to retrieve chats";
        showToast(errorMessage, "error");
        throw new Error(errorMessage);
      } else if (error instanceof Error) {
        throw error;
      }
      throw new Error("An unexpected error occurred");
    }
  };

  const getChat = async (chatId: string) => {
    try {
      const res = await getChatService(chatId);
      if (res && res.success && res.data) {
        return res.data;
      } else if (res && !res.success) {
        const errorMessage = res.message || "Failed to retrieve chat";
        showToast(errorMessage, "error");
        throw new Error(errorMessage);
      }
      throw new Error("Invalid response from server");
    } catch (error: unknown) {
      console.error("Get chat error:", error);
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message || "Failed to retrieve chat";
        showToast(errorMessage, "error");
        throw new Error(errorMessage);
      } else if (error instanceof Error) {
        throw error;
      }
      throw new Error("An unexpected error occurred");
    }
  };

  const updateChatTitle = async (
    chatId: string,
    payload: UPDATE_CHAT_TITLE_PAYLOAD,
    muteToast: boolean = false
  ) => {
    try {
      const res = await updateChatTitleService(chatId, payload);
      if (res && res.success && res.data) {
        if (!muteToast) {
          showToast(res.message || "Chat title updated successfully", "success");
        }
        return res.data;
      } else if (res && !res.success) {
        const errorMessage = res.message || "Failed to update chat title";
        showToast(errorMessage, "error");
        throw new Error(errorMessage);
      }
      throw new Error("Invalid response from server");
    } catch (error: unknown) {
      console.error("Update chat title error:", error);
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message || "Failed to update chat title";
        showToast(errorMessage, "error");
        throw new Error(errorMessage);
      } else if (error instanceof Error) {
        throw error;
      }
      throw new Error("An unexpected error occurred");
    }
  };

  const deleteChat = async (chatId: string) => {
    try {
      const res = await deleteChatService(chatId);
      if (res && res.success) {
        showToast(res.message || "Chat deleted successfully", "success");
        return res;
      } else if (res && !res.success) {
        const errorMessage = res.message || "Failed to delete chat";
        showToast(errorMessage, "error");
        throw new Error(errorMessage);
      }
      throw new Error("Invalid response from server");
    } catch (error: unknown) {
      console.error("Delete chat error:", error);
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message || "Failed to delete chat";
        showToast(errorMessage, "error");
        throw new Error(errorMessage);
      } else if (error instanceof Error) {
        throw error;
      }
      throw new Error("An unexpected error occurred");
    }
  };

  return {
    createChat,
    getAllChats,
    getChat,
    updateChatTitle,
    deleteChat,
    askQuestion,
    getChatHistory,
    deleteMessage,
  };
};
