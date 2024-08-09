import { apiSlice } from '../api/apiSlice';

export const transactionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    makeTranjectionByCustomer: builder.mutation({
      query: (data) => ({
        url: '/tranjection/makeTranjectionByCustomer',
        method: 'POST',
        body: data
      })
    }),
    makeTranjectionByTrade: builder.mutation({
      query: (data) => ({
        url: '/tranjection/makeTranjectionByTrade',
        method: 'POST',
        body: data
      })
    }),
    getAllTranjections: builder.mutation({
      query: (data) => ({
        url: '/tranjection/getAllTranjections',
        method: 'POST',
        body: data
      })
    }),
    getTranjectionById: builder.mutation({
      query: (data) => ({
        url: '/tranjection/getTranjectionById',
        method: 'POST',
        body: data
      })
    })
  })
});

export const {
  useMakeTranjectionByCustomerMutation,
  useMakeTranjectionByTradeMutation,
  useGetAllTranjectionsMutation,
  useGetTranjectionByIdMutation
} = transactionApi;
