import { apiSlice } from '../api/apiSlice';

export const areaApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createArea: builder.mutation({
      query: (data) => ({
        url: '/area/createArea',
        method: 'POST',
        body: data
      })
    }),
    editArea: builder.mutation({
      query: (data) => ({
        url: '/area/editArea',
        method: 'POST',
        body: data
      })
    }),
    allAreas: builder.mutation({
      query: (data) => ({
        url: '/area/allArea',
        method: 'POST',
        body: data
      })
    }),
    singleArea: builder.mutation({
      query: (data) => ({
        url: '/area/singleArea',
        method: 'POST',
        body: data
      })
    }),
    deleteArea: builder.mutation({
      query: (data) => ({
        url: '/area/deleteArea',
        method: 'POST',
        body: data
      })
    })
  })
});

export const { useCreateAreaMutation, useEditAreaMutation, useAllAreasMutation, useSingleAreaMutation, useDeleteAreaMutation } = areaApi;
