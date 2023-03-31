import { createSlice } from "@reduxjs/toolkit";

interface InitialStateDataType {
  books: [] | undefined;
}

const initialState: InitialStateDataType = {
  books: undefined,
};
export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setBooks(state, action) {
      state.books = action.payload;
    },
  },
});

export const bookActions = bookSlice.actions;
