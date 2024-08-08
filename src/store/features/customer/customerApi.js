import { apiSlice } from '../api/apiSlice';

export const customerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCustomer: builder.mutation({
      query: (data) => ({
        url: '/customer/createCustomer',
        method: 'POST',
        body: data
      })
    }),
    editCustomer: builder.mutation({
      query: (data) => ({
        url: '/customer/editCustomer',
        method: 'POST',
        body: data
      })
    }),
    allCustomers: builder.mutation({
      query: (data) => ({
        url: '/customer/allCustomers',
        method: 'POST',
        body: data
      })
    }),
    getSingleCustomerDues: builder.mutation({
      query: (data) => ({
        url: '/customer/getSingleCustomerDues',
        method: 'POST',
        body: data
      })
    }),
    singleCustomer: builder.mutation({
      query: (data) => ({
        url: '/customer/singleCustomer',
        method: 'POST',
        body: data
      })
    }),
    deleteCustomer: builder.mutation({
      query: (data) => ({
        url: '/customer/deleteCustomer',
        method: 'POST',
        body: data
      })
    })
  })
});

export const {
  useCreateCustomerMutation,
  useEditCustomerMutation,
  useAllCustomersMutation,
  useGetSingleCustomerDuesMutation,
  useSingleCustomerMutation,
  useDeleteCustomerMutation
} = customerApi;
