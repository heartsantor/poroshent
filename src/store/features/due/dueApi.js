import { apiSlice } from '../api/apiSlice';

export const dueApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllDues: builder.mutation({
      query: (data) => ({
        url: '/due/getAllDues',
        method: 'POST',
        body: data
      })
    }),
    getCustomersWithDues: builder.mutation({
      query: (data) => ({
        url: '/due/getCustomersWithDues',
        method: 'POST',
        body: data
      })
    }),
    getCustomerDueDetails: builder.mutation({
      query: (data) => ({
        url: '/due/getCustomerDueDetails',
        method: 'POST',
        body: data
      })
    })
  })
});

export const { useGetAllDuesMutation, useGetCustomerDueDetailsMutation, useGetCustomersWithDuesMutation } = dueApi;
