import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  temporalTitle: 'New Custom List',
  songsTemp: [],
};

const songsTempSlice = createSlice({
  name: 'songsTemp',
  initialState,
  reducers: {
    addTemporalSongs: (state, action) => {
      return {
        ...state,
        songsTemp: [...state.songsTemp, action.payload],
      };
    },
    deleteTemporalSong: (state, action) => {
      return {
        temporalTitle:
          state.songsTemp.length > 0 ? state.temporalTitle : 'New Custom List',
        songsTemp:
          state.songsTemp.length > 0
            ? state.songsTemp.filter((song) => song.id !== action.payload)
            : [],
      };
    },
    updateTemporalTitle: (state, { payload }) => {
      return {
        ...state,
        temporalTitle: payload,
      };
    },
    deleteAllSongs: (state, { payload }) => {
      return {
        temporalTitle: 'New Custom List',
        songsTemp: [],
      };
    },
    updateTitle: (state, { payload }) => {
      return {
        ...state,
        temporalTitle: payload,
      };
    },
    keepTitle: (state, { payload }) => {
      return {
        ...state,
        temporalTitle: 'New Custom List',
      };
    },
  },
});

export const {
  addTemporalSongs,
  deleteTemporalSong,
  updateTemporalTitle,
  deleteAllSongs,
  updateTitle,
  keepTitle,
} = songsTempSlice.actions;

// Selectors
export const songsTemp = (state) => state.songsTemp.songsTemp;
export const titleTemporal = (state) => state.songsTemp.temporalTitle;

export default songsTempSlice.reducer;
