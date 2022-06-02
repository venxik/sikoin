// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apis } from '../../constants';

interface KoperasiData {
  namaKoperasi: string;
}

// Define a service using a base URL and expected endpoints
export const koperasiApi = createApi({
  reducerPath: 'koperasiApi',
  baseQuery: fetchBaseQuery({ baseUrl: apis.baseURL }),
  endpoints: builder => ({
    getKoperasiList: builder.query<KoperasiData, void>({
      query: () => '/api/koperasi',
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetKoperasiListQuery } = koperasiApi;
