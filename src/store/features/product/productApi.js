import { apiSlice } from '../api/apiSlice';

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.mutation({
      query: (data) => ({
        url: '/product/allProducts',
        method: 'POST',
        body: data
      })
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: '/product/createProduct',
        method: 'POST',
        body: data
      })
    }),
    deleteProduct: builder.mutation({
      query: (data) => ({
        url: '/product/deleteProduct',
        method: 'POST',
        body: data
      })
    })
  })
});

export const { useCreateProductMutation, useGetProductMutation, useDeleteProductMutation } = productApi;
