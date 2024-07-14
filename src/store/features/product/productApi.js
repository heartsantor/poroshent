import { apiSlice } from '../api/apiSlice';

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (data) => ({
        url: '/product/createProduct',
        method: 'POST',
        body: data
      })
    })
  })
});

export const { useCreateProductMutation } = productApi;
