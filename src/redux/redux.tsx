import { configureStore } from "@reduxjs/toolkit";

import { authSlice } from "./authSlice";

export const redux = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});
