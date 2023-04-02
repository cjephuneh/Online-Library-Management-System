import { createSlice } from "@reduxjs/toolkit";

export interface BookDataType {
  id: number;
  name: string;
  photo: string;
  summary: string;
  releases_time: string;
  start_from: string | null;
  end_at: string | null;
  status: string;
  is_active: string;
  genre: string;
  author: string[];
  patrons: string | null;
  rating: string;
  slug: string;
}

interface InitialStateDataType {
  books: BookDataType[] | undefined;
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
