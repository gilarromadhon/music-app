import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import Apt from "../../../public/album/apt.jpeg"
import Think from "../../../public/album/ithink.jpeg"
import YangTerdalam from "../../../public/album/terdalam.jpeg";
import Untungnya from "../../../public/album/untungnya.jpeg";
import Walking from "../../../public/album/walking.jpeg";
import { Song } from "@/lib/types/song";


interface SongState {
  songs: Song[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Simulating an API call with hardcoded data
const hardcodedSongs: Song[] = [];

// Async thunk to simulate API fetching
export const fetchSongs = createAsyncThunk("songs/fetchSongs", async () => {
  // Simulating a network request delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return hardcodedSongs;
});

const initialState: SongState = {
  songs: [],
  status: "idle",
  error: null,
};

const songSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    setHardcodedTracks(state) {
      // Mengatur data hardcoded
      state.songs = [
        {
          id: 11,
          image: Apt,
          title: "APT",
          artist: "Bruno Mars",
          isPlay: false,
          music: "audio/apt.mp3",
        },
        {
          id: 12,
          image: Think,
          title: "I Think They Call This Love",
          artist: "Elliot James Reay",
          isPlay: false,
          music: "audio/think.mp3",
        },
        {
          id: 13,
          image: YangTerdalam,
          title: "Yang Terdalam",
          artist: "NOAH",
          isPlay: false,
          music: "audio/yangterdalam.mp3",
        },
        {
          id: 14,
          image: Untungnya,
          title: "Untungnya, hidup harus tetap berjalan",
          artist: "Bernadya",
          isPlay: false,
          music: "audio/untungnya.mp3",
        },
        {
          id: 15,
          image: Walking,
          title: "Walking Up Together With You",
          artist: "Ardhito Pramono",
          isPlay: false,
          music: "audio/walking.mp3",
        },
      ];
    },
    togglePlayPause: (state, action: PayloadAction<number>) => {
      const song = state.songs.find((song) => song.id === action.payload);
      if (song) {
        song.isPlay = !song.isPlay;
      } 
      state.songs.forEach((s) => {
        if (s.id !== action.payload) {
            s.isPlay = false;
        }
      });
    },
    stopAllSongs: (state) => {
      state.songs.forEach((song) => (song.isPlay = false));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSongs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSongs.fulfilled, (state, action: PayloadAction<Song[]>) => {
        state.status = "succeeded";
        state.songs = action.payload;
      })
      .addCase(fetchSongs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch songs";
      });
  },
});

export const { setHardcodedTracks, togglePlayPause, stopAllSongs } = songSlice.actions;

export default songSlice.reducer;
