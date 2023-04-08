import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/theme/themeSlice';
import userReducer from '../features/auth/userSlice';
import songsTempReducer from '../features/songs/songsTempSlice';
import songsSavedReducer from '../features/songs/songsSavedSlice';
import localSongsReducer from '../features/songs/localSongsSlice';
import { songsApi } from '../features/songs/songsApi';
import { customsApi } from '../features/customs/customsApi';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
    songsTemp: songsTempReducer,
    songsSaved: songsSavedReducer,
    localSongs: localSongsReducer,
    [songsApi.reducerPath]: songsApi.reducer,
    [customsApi.reducerPath]: customsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      songsApi.middleware,
      customsApi.middleware
    ),
});

setupListeners(store.dispatch);
