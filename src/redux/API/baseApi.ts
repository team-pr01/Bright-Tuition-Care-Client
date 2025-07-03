/* eslint-disable @typescript-eslint/no-explicit-any */
import type { BaseQueryApi } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn } from '@reduxjs/toolkit/query/react'
import { createApi, DefinitionType, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { FetchArgs } from '@reduxjs/toolkit/query/react'
import { setUser } from '../Features/Auth/authSlice';
import type { RootState } from '../store';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://vedic-app-server.vercel.app/api/v1',
  credentials : 'include',
  prepareHeaders : (headers, {getState}) => {
    const token = (getState() as RootState).auth.token;

    if(token){
      headers.set('authorization', `${token}`);
    }
    return headers; 
  }
});

const baseQueryWithRefreshToken: BaseQueryFn<FetchArgs, BaseQueryApi, DefinitionType> = async (args, api, extraOptions) : Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  if(result.error?.status === 401){
    const res = await fetch('https://vedic-app-server.vercel.app/api/v1/auth/refresh-token', {
      credentials : 'include'
    });

    const data = await res.json();
    const user = (api.getState() as RootState).auth.user
    api.dispatch(
      setUser({
        user,
        token : data?.data?.accessToken
      })
    )
     result = await baseQuery(args, api, extraOptions);
  }

  return result;
}

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["emergencies", "users", "reels", "yoga", "vastu", "temple", "organization"],
  endpoints: () => ({}),
});

// export const { } = baseApi;