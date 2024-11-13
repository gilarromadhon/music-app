
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from "@reduxjs/toolkit";
import { Song } from '../lib/types/song';

export interface LikedState {
  list: Song[];
}

const initialState: LikedState = {
  list: [],
};

export const likedSlice = createSlice({
  name: "liked",
  initialState,
  reducers: {
    likedSong: (state, action: PayloadAction<Song>) => {
      const existingItem = state.list.find((item) => item.id === action.payload.id);
      if (!existingItem) {
        state.list.push(action.payload);
      }
    },
    unlikedSong: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((item) => item.id !== action.payload);
    },
    removeSong: (state) => {
      state.list = [];
    },
  },
});

export const { likedSong, unlikedSong, removeSong } = likedSlice.actions;
export default likedSlice.reducer;
