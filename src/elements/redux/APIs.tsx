import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const munticipalityApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_SITE_URL }),
    endpoints: (builder) => ({
    login: builder.mutation({
        query: (credentials) => ({
            url: '/api/auth/login',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: credentials,
        })}),
    adminLogin: builder.mutation({
        query: (credentials) => ({
            url: '/api/admin/',
            method: 'POST',
            headers: {
                Authorization: `Bearer ${credentials}`,
            },
            
    })
    }),
    getRequests: builder.mutation({
        query: (credentials) => ({
            url: '/api/requests/requests/getAll',
            method: 'GET',
            headers: {
                Authorization: `Bearer ${credentials}`,
            },
            
    })
    }),
    getRequestById: builder.mutation({
        query: (credentials) => ({
            url: `/api/requests/requests/getById/${credentials.id}`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${credentials.token}`,
            },
            
    })
    }),
    createRequest: builder.mutation({
        query: (credentials) => ({
            url: '/api/requests/requests/create',
            method: 'POST',
            headers: {
                Authorization: `Bearer ${credentials.token}`,
            },
            body: credentials.body,
            
    })
    }),
    getByUser: builder.mutation({
        query: (credentials) => ({
            url: `/api/requests/requests/getByUser/${credentials.id}`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${credentials.token}`,
            },
            
            
    })
    }),
  }),
});

export const { useLoginMutation, useAdminLoginMutation, useGetRequestsMutation, useGetRequestByIdMutation, useCreateRequestMutation, useGetByUserMutation } = munticipalityApi;