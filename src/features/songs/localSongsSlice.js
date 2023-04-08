import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  localSongs: [],
};

const localSongsSlice = createSlice({
  name: 'localSongs',
  initialState,
  reducers: {
    addLocalSongs: (state, { payload }) => {
      return {
        localSongs: payload,
      };
    },
    // updateLocalSongs: (state, { payload }) => {
    //   return {
    //     localSongs: state.localSongs.map((localSong) => {
    //       if (payload.some((songTemp) => songTemp.id === localSong.id)) {
    //         localSong.added = true;
    //         return localSong;
    //       } else {
    //         localSong.added = false;
    //         return localSong;
    //       }
    //     }),
    //   };
    // },
    updateLocalSongs: (state, { payload }) => {
      return {
        localSongs: payload,
      };
    },
  },
});

export const { addLocalSongs, updateLocalSongs } = localSongsSlice.actions;

// Selectors
export const songsLocal = (state) => state.localSongs.localSongs;

export default localSongsSlice.reducer;
