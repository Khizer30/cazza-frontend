import { useToast } from "@/components/ToastProvider";
import {
  askQuestionService,
  getChatHistoryService,
  deleteMessageService,
} from "@/services/chatbotService";
import { AxiosError } from "axios";

export const useChatbot = () => {
  const { showToast } = useToast();

  const askQuestion = async (question: string) => {
    try {
      const res = await askQuestionService({ question });
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

  const getChatHistory = async () => {
    try {
      const res = await getChatHistoryService();
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
        showToast(errorMessage, "error");
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

  return {
    askQuestion,
    getChatHistory,
    deleteMessage,
  };
};
