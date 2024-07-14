import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Message {
  id: string;
  role: "function" | "system" | "user" | "assistant" | "data" | "tool";
  content: string;
  createdAt?: string;
}

export interface ChatType {
  id: string;
  lastUpdated: string,
  title: string,
  messages: Message[];
}

export interface Chats {
  chats: ChatType[],
  currentChatId: string,
}

const initialState: Chats = {
  chats: [],
  currentChatId: ""
}

const slice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addChat: (state, action) => {
      state.chats.push(action.payload);
    },
    setCurrentChatId(state, action: PayloadAction<string>) {
      state.currentChatId = action.payload;
    },
    updateChatTitle: (state, action) => {
      const { chatId, title } = action.payload;
      const chat = state.chats.find(chat => chat.id === chatId);
      if (chat) {
        chat.title = title;
        chat.lastUpdated = new Date().toString();
      }
    },
    addMessage: (state, action) => {
      const { chatId, message } = action.payload;
      const chat = state.chats.find(chat => chat.id === chatId);

      if (chat) {
        chat.messages.push(message);
        chat.lastUpdated = new Date().toString();
      }
    },
    updateMessage: (state, action) => {
      const { chatId, message } = action.payload;
      const chat = state.chats.find(chat => chat.id === chatId);
      if (chat) {
        const msg = chat.messages.find(m => m.id === message.id);
        if (msg) {
          Object.assign(msg, message);
          chat.lastUpdated = new Date().toString();
        }
      }
    },
  },
});

export const { addChat, setCurrentChatId, updateChatTitle, addMessage, updateMessage } = slice.actions;
export default slice.reducer;