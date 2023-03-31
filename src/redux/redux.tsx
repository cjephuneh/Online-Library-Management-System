import { configureStore } from "@reduxjs/toolkit";

import { authSlice } from "./authSlice";
import { bookSlice } from "./bookSlice";

export const redux = configureStore({
  reducer: {
    auth: authSlice.reducer,
    book: bookSlice.reducer,
  },
});

export type RootState = ReturnType<typeof redux.getState>;
