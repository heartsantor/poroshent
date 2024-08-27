import { apiSlice } from '../api/apiSlice';

export const operatorApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllStatus: builder.mutation({
      query: (data) => ({
        url: '/operator/getAllStatus',
        method: 'POST',
        body: data
      })
    })
  })
});

export const { useGetAllStatusMutation } = operatorApi;
