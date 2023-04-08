import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  titleList: '',
  songsList: [],
};

const songsSavedSlice = createSlice({
  name: 'songsSaved',
  initialState,
  reducers: {
    addSongsList: (state, { payload }) => {
      return {
        titleList: payload.title,
        songsList: payload.songList,
      };
    },
    resetSongListSelection: (state, action) => {
      return {
        titleList: '',
        songsList: [],
      };
    },
  },
});

export const { addSongsList, resetSongListSelection } = songsSavedSlice.actions;

export const songsList = (state) => state.songsSaved.songsList;
export const titleList = (state) => state.songsSaved.titleList;

export default songsSavedSlice.reducer;
