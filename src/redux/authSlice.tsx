import { createSlice } from "@reduxjs/toolkit";

interface InitialStateDataType {
  token:
    | {
        access: string;
        refresh: string;
      }
    | undefined;
}

const initialState: InitialStateDataType = {
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token")!)
    : undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateToken(state, action) {
      state.token = action.payload;
      localStorage.setItem("token", JSON.stringify(action.payload));
    },
    deleteToken(state) {
      state.token = undefined;
      localStorage.removeItem("token");
    },
  },
});

export const authActions = authSlice.actions;
