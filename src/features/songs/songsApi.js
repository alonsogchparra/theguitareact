import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  addDoc,
  collection,
  db,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from '../../firebase';

export const songsApi = createApi({
  reducerPath: 'songsApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Song'],
  endpoints: (builder) => ({
    fetchSongs: builder.query({
      async queryFn() {
        try {
          const songRef = collection(db, 'songs');
          const querySnapshot = await getDocs(songRef);
          let songs = [];
          querySnapshot?.forEach((doc) => {
            songs.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          return { data: songs };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ['Song'],
    }),
    fetchSong: builder.query({
      async queryFn(id) {
        try {
          const docRef = doc(db, 'songs', id);
          const snapshot = await getDoc(docRef);
          return { data: snapshot.data() };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ['Song'],
    }),
    addSong: builder.mutation({
      async queryFn(data) {
        try {
          await addDoc(collection(db, 'songs'), {
            ...data,
            timestamp: serverTimestamp(),
          });
          return { data: 'ok' };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ['Song'],
    }),
    deleteSong: builder.mutation({
      async queryFn(id) {
        try {
          await deleteDoc(doc(db, 'songs', id));
          return { data: 'ok' };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ['Song'],
    }),
    updateSong: builder.mutation({
      async queryFn({ id, data }) {
        try {
          await updateDoc(doc(db, 'songs', id), {
            ...data,
            timestamp: serverTimestamp(),
          });
          return { data: 'ok' };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ['Song'],
    }),
  }),
});

export const {
  useAddSongMutation,
  useDeleteSongMutation,
  useFetchSongQuery,
  useFetchSongsQuery,
  useUpdateSongMutation,
} = songsApi;
