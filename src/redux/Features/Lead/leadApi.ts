/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../API/baseApi";

const leadApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    

    getAllLeads: builder.query({
      query: ({
        keyword,
        limit,
        page
      }: {
        keyword?: string;
        limit?: number;
        page?: number
      } = {}) => {
        const params = new URLSearchParams();

        if (keyword) params.append("keyword", keyword);
        if (typeof limit === "number") params.append("limit", limit.toString());
        if (typeof page === "number") params.append("page", page.toString());

        return {
          url: `/lead?${params.toString()}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["lead"],
    }),

    getSingleLeadById: builder.query({
      query: (id) => ({
        url: `/lead/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["lead"],
    }),

    getMyLeads: builder.query({
      query: () => ({
        url: `/lead/tutor/my-leads`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["lead"],
    }),

    addLead: builder.mutation<any, any>({
      query: (data) => ({
        url: `/lead/add`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["lead"],
    }),

    deleteLead: builder.mutation<any, string>({
      query: (id) => ({
        url: `/lead/delete/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["lead"],
    }),

    updateLeadInfo: builder.mutation<any, any>({
      query: ({ id, data }) => ({
        url: `/lead/update/${id}`,
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["lead"],
    }),
  }),
});

export const {
  useGetAllLeadsQuery,
  useGetSingleLeadByIdQuery,
  useGetMyLeadsQuery,
  useAddLeadMutation,
  useDeleteLeadMutation,
  useUpdateLeadInfoMutation
} = leadApi;
