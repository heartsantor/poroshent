import { apiSlice } from '../api/apiSlice';

export const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStockDetailsByType: builder.mutation({
      query: (data) => ({
        url: '/dashBoard/getStockDetailsByType',
        method: 'POST',
        body: data
      })
    }),
    getEarningSummaryByType: builder.mutation({
      query: (data) => ({
        url: '/dashBoard/getEarningSummaryByType',
        method: 'POST',
        body: data
      })
    })
  })
});

export const { useGetEarningSummaryByTypeMutation, useGetStockDetailsByTypeMutation } = dashboardApi;
