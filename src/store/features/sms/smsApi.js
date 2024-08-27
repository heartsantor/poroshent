import { apiSlice } from '../api/apiSlice';

export const smsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    checkDeviceStatus: builder.mutation({
      query: (data) => ({
        url: '/sms/checkDeviceStatus',
        method: 'POST',
        body: data
      })
    }),
    sendSmsToNumbers: builder.mutation({
      query: (data) => ({
        url: '/sms/sendSmsToNumbers',
        method: 'POST',
        body: data
      })
    })
  })
});

export const { useCheckDeviceStatusMutation, useSendSmsToNumbersMutation } = smsApi;
