/* eslint-disable @typescript-eslint/no-explicit-any */
import type { BaseQueryApi } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { FetchArgs } from "@reduxjs/toolkit/query/react";
import { setUser } from "../Features/Auth/authSlice";
import type { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  // baseUrl: 'https://bright-tuition-care-server.onrender.com/api/v1',
  baseUrl: "http://localhost:5000/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  string | FetchArgs,
  BaseQueryApi,
  unknown
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const res = await fetch("http://localhost:5000/api/v1/auth/refresh-token", {
      credentials: "include",
      method: "POST",
    });

    const data = await res.json();
    console.log(data);
    const user = (api.getState() as RootState).auth.user;
    api.dispatch(
      setUser({
        user,
        token: data?.data?.accessToken,
      })
    );
    result = await baseQuery(args, api, extraOptions);
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: [
    "admin",
    "users",
    "tutor",
    "guardian",
    "jobs",
    "applications",
    "tutorials",
    "invoices",
    "staff",
    "testimonial",
    "notice",
    "confirmationLetter",
    "invoice",
    "lead",
    "notification",
  ],
  endpoints: () => ({}),
});
