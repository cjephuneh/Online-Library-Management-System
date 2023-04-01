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
  token: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateToken(state, action) {
      state.token = action.payload;
    },
    deleteToken(state) {
      state.token = undefined;
    },
  },
});

export const authActions = authSlice.actions;
