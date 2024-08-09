import { apiSlice } from '../api/apiSlice';

export const tradeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    makeTrade: builder.mutation({
      query: (data) => ({
        url: '/trade/makeTrade',
        method: 'POST',
        body: data
      })
    }),
    getTradeDetails: builder.mutation({
      query: (data) => ({
        url: '/trade/getTradeDetails',
        method: 'POST',
        body: data
      })
    }),
    getAllTrades: builder.mutation({
      query: (data) => ({
        url: '/trade/getAllTrades',
        method: 'POST',
        body: data
      })
    })
  })
});

export const { useMakeTradeMutation, useGetTradeDetailsMutation, useGetAllTradesMutation } = tradeApi;
