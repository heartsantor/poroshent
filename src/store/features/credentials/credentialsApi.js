import { apiSlice } from '../api/apiSlice';

export const credentialsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allCredentials: builder.mutation({
      query: (data) => ({
        url: '/credentials/allCredentials',
        method: 'POST',
        body: data
      })
    }),
    serverUpdate: builder.mutation({
      query: (data) => ({
        url: '/credentials/serverUpdate',
        method: 'POST',
        body: data
      })
    }),
    serverCredentialsUpdate: builder.mutation({
      query: (data) => ({
        url: '/credentials/serverCredentialsUpdate',
        method: 'POST',
        body: data
      })
    }),
    operatorUpdate: builder.mutation({
      query: (data) => ({
        url: '/credentials/operatorUpdate',
        method: 'POST',
        body: data
      })
    })
  })
});

export const { useAllCredentialsMutation, useServerUpdateMutation, useServerCredentialsUpdateMutation, useOperatorUpdateMutation } =
  credentialsApi;
