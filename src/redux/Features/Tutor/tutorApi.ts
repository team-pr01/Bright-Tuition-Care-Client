/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../API/baseApi";

const tutorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTutors: builder.query<
      any,
      {
        city?: string;
        area?: string;
        keyword?: string;
        page?: number;
        limit?: number;
      }
    >({
      query: ({
        city = "",
        area = "",
        keyword = "",
        page = 1,
        limit = 10,
      } = {}) => {
        const params = new URLSearchParams();

        if (city) params.append("city", city);
        if (area) params.append("area", area);
        if (keyword) params.append("keyword", keyword);
        params.append("page", page.toString());
        params.append("limit", limit.toString());

        return {
          url: `/tutor?${params.toString()}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["tutor"],
    }),

    getSingleTutorById: builder.query({
      query: (id) => ({
        url: `/tutor/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["tutor"],
    }),

    getMyApplications: builder.query<any, any | void>({
      query: ({ keyword, status, page = 1, limit = 10 } = {}) => {
        const params = new URLSearchParams();

        if (keyword) params.append("keyword", keyword);
        if (status) params.append("status", status);
        if (page) params.append("page", page.toString());
        if (limit) params.append("limit", limit.toString());

        return {
          url: `/tutor/my-applications?${params.toString()}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["tutor"],
    }),
    

    updateIdentityInfo: builder.mutation({
      query: (data) => ({
        url: `/tutor/update/identity-info`,
        body: data,
        method: "PATCH",
      }),
      invalidatesTags: ["users"],
    }),

    setTutorOfTheMonth: builder.mutation({
      query: (id) => ({
        url: `/tutor/tutor-of-the-month/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["tutor"],
    }),
  }),
});

export const {
  useGetAllTutorsQuery,
  useGetSingleTutorByIdQuery,
  useGetMyApplicationsQuery,
  useUpdateIdentityInfoMutation,
  useSetTutorOfTheMonthMutation,
} = tutorApi;
