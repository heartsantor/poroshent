import { apiSlice } from '../api/apiSlice';

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    takeSupply: builder.mutation({
      query: (data) => ({
        url: '/supply/takeSupply',
        method: 'POST',
        body: data
      })
    })
  })
});

export const { useTakeSupplyMutation } = productApi;
