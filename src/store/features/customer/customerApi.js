import { apiSlice } from '../api/apiSlice';

export const customerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCustomer: builder.mutation({
      query: (data) => ({
        url: '/customer/createCustomer',
        method: 'POST',
        body: data
      })
    })
  })
});

export const { useCreateCustomerMutation } = customerApi;
