
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from "@reduxjs/toolkit";
import { Song } from '../lib/types/song';


export interface TrackState {
  currentTrack: Song | null;
}

const initialState: TrackState = {
  currentTrack: null,
};

export const trackSlice = createSlice({
  name: "track",
  initialState,
  reducers: {
    setTrack: (state, action: PayloadAction<Song>) => {
      // Sets the track to play and marks it as playing
      state.currentTrack = { ...action.payload, isPlay: true };
    },
    togglePlayPause: (state) => {
      // Toggles play/pause state if there is a current track
      if (state.currentTrack) {
        state.currentTrack.isPlay = !state.currentTrack.isPlay;
      }
    },
    removeTrack: (state) => {
      // Sets the track to play and marks it as playing
      state.currentTrack = null;
    },
  },
});

export const { setTrack, togglePlayPause, removeTrack } = trackSlice.actions;
export default trackSlice.reducer;
