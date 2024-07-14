import { RootState } from "@/lib/store";

export const selectChats = (state: RootState) => state.chat.chats;
export const selectChatById = (state: RootState, chatId: string) => {
    return state.chat.chats.find(chat => chat.id === chatId);
  };
export const selectChatMessagesById = (state: RootState, chatId: string) => {
    const chat = state.chat.chats.find(chat => chat.id === chatId);
    return chat?.messages.map(message => {
        return {
          id: message.id,
          role: message.role,
          content: message.content,
          createdAt: new Date(message.createdAt!),
        }
    })
};
export const selectCurrentChatId = (state: RootState) => state.chat.currentChatId;