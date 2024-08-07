import { apiSlice } from '../api/apiSlice';

export const tradeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    makeTrade: builder.mutation({
      query: (data) => ({
        url: '/trade/makeTrade',
        method: 'POST',
        body: data
      })
    })
  })
});

export const { useMakeTradeMutation } = tradeApi;
