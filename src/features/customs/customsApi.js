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

export const customsApi = createApi({
  reducerPath: 'customsApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Custom'],
  endpoints: (builder) => ({
    fetchCustomLists: builder.query({
      async queryFn() {
        try {
          const customRef = collection(db, 'customs');
          const querySnapshot = await getDocs(customRef);
          let customs = [];
          querySnapshot.forEach((doc) => {
            customs.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          return { data: customs };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ['Custom'],
    }),
    addCustomList: builder.mutation({
      async queryFn(data) {
        try {
          await addDoc(collection(db, 'customs'), {
            ...data,
            timestamp: serverTimestamp(),
          });
          return { data: 'ok' };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ['Custom'],
    }),
    deleteCustomList: builder.mutation({
      async queryFn(id) {
        try {
          await deleteDoc(doc(db, 'customs', id));
          return { data: 'ok' };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ['Custom'],
    }),
  }),
});

export const {
  useAddCustomListMutation,
  useDeleteCustomListMutation,
  useFetchCustomListsQuery,
} = customsApi;
