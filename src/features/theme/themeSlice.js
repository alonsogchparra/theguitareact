import { createSlice } from '@reduxjs/toolkit';
import { themeSelection } from '../../utils/themeSelection';

const initialState = themeSelection;

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme: (state, { payload }) => {
      switch (payload) {
        case 'blackYellow':
          return {
            ...state,
            currentTheme: 'yellowBlack',
          };

        case 'yellowBlack':
          return {
            ...state,
            currentTheme: 'blueWhite',
          };

        case 'blueWhite':
          return {
            ...state,
            currentTheme: 'whiteBlue',
          };

        case 'whiteBlue':
          return {
            ...state,
            currentTheme: 'redDark',
          };

        case 'redDark':
          return {
            ...state,
            currentTheme: 'red',
          };

        case 'red':
          return {
            ...state,
            currentTheme: 'blackYellow',
          };

        default:
          return state;
      }
    },
  },
});

export const { changeTheme } = themeSlice.actions;

// selectors
export const selectThemes = (state) => state.theme.themes;
export const theCurrentTheme = (state) => state.theme.currentTheme;

export default themeSlice.reducer;
