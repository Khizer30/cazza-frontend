import apiInvoker from "@/lib/apiInvoker";
import { END_POINT } from "@/lib/url";
import type {
  CHATBOT_ASK_PAYLOAD,
  CHATBOT_ASK_RESPONSE,
  CHATBOT_HISTORY_RESPONSE,
  CHATBOT_DELETE_MESSAGE_RESPONSE,
  CREATE_CHAT_PAYLOAD,
  CREATE_CHAT_RESPONSE,
  GET_ALL_CHATS_RESPONSE,
  GET_CHAT_RESPONSE,
  UPDATE_CHAT_TITLE_PAYLOAD,
  UPDATE_CHAT_TITLE_RESPONSE,
  DELETE_CHAT_RESPONSE,
} from "@/types/auth";

export const createChatService = (payload?: CREATE_CHAT_PAYLOAD) => {
  return apiInvoker<CREATE_CHAT_RESPONSE>(
    END_POINT.chatbot.createChat,
    "POST",
    payload || {}
  );
};

export const getAllChatsService = () => {
  return apiInvoker<GET_ALL_CHATS_RESPONSE>(
    END_POINT.chatbot.getAllChats,
    "GET"
  );
};

export const getChatService = (chatId: string) => {
  return apiInvoker<GET_CHAT_RESPONSE>(
    END_POINT.chatbot.getChat(chatId),
    "GET"
  );
};

export const updateChatTitleService = (chatId: string, payload: UPDATE_CHAT_TITLE_PAYLOAD) => {
  return apiInvoker<UPDATE_CHAT_TITLE_RESPONSE>(
    END_POINT.chatbot.updateChatTitle(chatId),
    "PUT",
    payload
  );
};

export const deleteChatService = (chatId: string) => {
  return apiInvoker<DELETE_CHAT_RESPONSE>(
    END_POINT.chatbot.deleteChat(chatId),
    "DELETE"
  );
};

export const askQuestionService = (payload: CHATBOT_ASK_PAYLOAD) => {
  return apiInvoker<CHATBOT_ASK_RESPONSE>(
    END_POINT.chatbot.ask,
    "POST",
    payload
  );
};

export const getChatHistoryService = (chatId: string) => {
  return apiInvoker<CHATBOT_HISTORY_RESPONSE>(END_POINT.chatbot.history(chatId), "GET");
};

export const deleteMessageService = (messageId: string) => {
  return apiInvoker<CHATBOT_DELETE_MESSAGE_RESPONSE>(
    END_POINT.chatbot.deleteMessage(messageId),
    "DELETE"
  );
};
