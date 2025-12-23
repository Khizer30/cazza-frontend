import apiInvoker from "@/lib/apiInvoker";
import { END_POINT } from "@/lib/url";
import type {
  CHATBOT_ASK_PAYLOAD,
  CHATBOT_ASK_RESPONSE,
  CHATBOT_HISTORY_RESPONSE,
  CHATBOT_DELETE_MESSAGE_RESPONSE,
} from "@/types/auth";

export const askQuestionService = (payload: CHATBOT_ASK_PAYLOAD) => {
  return apiInvoker<CHATBOT_ASK_RESPONSE>(
    END_POINT.chatbot.ask,
    "POST",
    payload
  );
};

export const getChatHistoryService = () => {
  return apiInvoker<CHATBOT_HISTORY_RESPONSE>(END_POINT.chatbot.history, "GET");
};

export const deleteMessageService = (messageId: string) => {
  return apiInvoker<CHATBOT_DELETE_MESSAGE_RESPONSE>(
    `${END_POINT.chatbot.deleteMessage}/${messageId}`,
    "DELETE"
  );
};
