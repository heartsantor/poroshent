import { apiSlice } from '../api/apiSlice';

export const dueApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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

export const { useGetCustomerDueDetailsMutation, useGetCustomersWithDuesMutation } = dueApi;
