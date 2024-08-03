import { apiSlice } from '../api/apiSlice';

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    takeSupply: builder.mutation({
      query: (data) => ({
        url: '/supply/takeSupply',
        method: 'POST',
        body: data
      })
    }),
    editSupply: builder.mutation({
      query: (data) => ({
        url: '/supply/editSupply',
        method: 'POST',
        body: data
      })
    }),
    deleteSupply: builder.mutation({
      query: (data) => ({
        url: '/supply/deleteSupply',
        method: 'POST',
        body: data
      })
    }),
    allSupply: builder.mutation({
      query: (data) => ({
        url: '/supply/allSupply',
        method: 'POST',
        body: data
      })
    })
  })
});

export const { useTakeSupplyMutation, useEditSupplyMutation, useDeleteSupplyMutation, useAllSupplyMutation } = productApi;
