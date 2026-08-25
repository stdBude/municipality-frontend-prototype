import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


type Request ={
  request :{
    title: string,
    user: string,
    imageRef: string,
    public_idOfImage: string,
    description: string,
    region:string,
    typeOfRequest: string,
    createdAt: string
  },
  user:{
    username: string,
    _id: string
  }
}

type RequestsResponse = {
    requests: Array<{
        _id: string,
        typeOfRequest: string,
        region: string,
        description: string,
        title: string,
        imageRef: string,
        user: string,
        __v: number,
        createdAt: Date,
        updatedAt?: string
    }>
}
type RequestsResponse1 = {
    request: Array<{
        _id: string,
        typeOfRequest: string,
        region: string,
        description: string,
        title: string,
        imageRef: string,
        user: string,
        __v: number,
        createdAt: Date,
        updatedAt?: string
    }>
}


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
    getRequests: builder.mutation<RequestsResponse, { token: string, page?: number, currentPage?: number, id?: string, limit?: number, type?: string, region?: string }>({
        query: ({ token, page, currentPage, limit, type, region }) => {
            const resolvedPage = page ?? currentPage
            return ({
            url: '/api/requests/requests/getAll',
            method: 'GET',
            params: { page: resolvedPage, limit: limit ?? 5, type: type ?? "", region: region ??"" },
            headers: {
                Authorization: `Bearer ${token}`,
            },
            
    })
    }
    }),
    getRequestById: builder.mutation<Request, {id: string | undefined, token: string}>({
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
    getByUser: builder.mutation<RequestsResponse1,{token: string,
        id: string,
        page: number,
        currentPage?:number,
        limit?: number
    }>({
        query: ({token,id, page, currentPage, limit}) =>{
             const resolvedPage = page ?? currentPage
            return({
            
            url: `/api/requests/requests/getByUser/${id}`,
            method: 'GET',
            params: { page: resolvedPage, limit: limit ?? 5 },
            headers: {
                Authorization: `Bearer ${token}`,
            },})
            
            
    }
    }),
    getCounts: builder.mutation({
        query: (credentials) => ({
            url: '/api/requests/requests/counts',
            method: 'GET',
            headers: {
                Authorization: `Bearer ${credentials}`,
            },
            
    })
    }),getCountsWhole: builder.mutation({
        query: ({token, type, region}) => ({
            url: '/api/requests/requests/counts-filter',
            method: 'GET',
            params: { type : type ?? "", region: region ?? ""},
            headers: {
                Authorization: `Bearer ${token}`,
            },
            
    })
    }),
  }),
});

export const { useGetCountsWholeMutation, useLoginMutation, useAdminLoginMutation, useGetRequestsMutation, useGetRequestByIdMutation, useCreateRequestMutation, useGetByUserMutation, useGetCountsMutation } = munticipalityApi;