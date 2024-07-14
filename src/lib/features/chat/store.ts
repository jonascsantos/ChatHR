import { configureStore } from "@reduxjs/toolkit";

import chatReducer from "@/lib/features/chat/slice";

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      chat: chatReducer,
    },
  });

  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];