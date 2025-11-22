/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../API/baseApi";

const applicationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getJobDetailsForInvoice: builder.query<any, any>({
      query: (id) => {
        return {
          url: `/invoice/details/${id}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["invoice"],
    }),

    getAllInvoices: builder.query<any, { status?: string }>({
      query: ({ status } = {}) => {
        const params = new URLSearchParams();
        if (status) params.append("status", status);

        return {
          url: `/invoice?${params.toString()}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["invoice"],
    }),

    getSingleApplicationById: builder.query({
      query: (id) => ({
        url: `/application/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["application"],
    }),

    getAllApplicationsByJobId: builder.query<
      any,
      { jobId: string; keyword?: string; page?: number; limit?: number }
    >({
      query: ({ jobId, keyword, page = 1, limit = 10 }) => {
        let url = `/application/job/${jobId}?page=${page}&limit=${limit}`;
        if (keyword) {
          url += `&keyword=${encodeURIComponent(keyword)}`;
        }
        return {
          url,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["application"],
    }),

    applyOnJob: builder.mutation<any, any>({
      query: (data) => ({
        url: `/application/apply`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["application"],
    }),

    withdrawApplication: builder.mutation({
      query: (id) => ({
        url: `/application/withdraw/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["application", "tutor"],
    }),

    reApply: builder.mutation<any, any>({
      query: (id) => ({
        url: `/application/re-apply/${id}`,
        method: "PATCH",
        credentials: "include",
      }),
      invalidatesTags: ["application", "tutor"],
    }),

    shortlistTutor: builder.mutation<any, any>({
      query: ({ id, data }) => ({
        url: `/application/shortlist/${id}`,
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["application"],
    }),

    appointTutor: builder.mutation<any, any>({
      query: ({ id, data }) => ({
        url: `/application/appoint/${id}`,
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["application"],
    }),

    confirmTutor: builder.mutation<any, any>({
      query: ({ id, data }) => ({
        url: `/application/confirm/${id}`,
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["application"],
    }),
  }),
});

export const {
  useGetJobDetailsForInvoiceQuery,
  useGetAllInvoicesQuery,
  useGetSingleApplicationByIdQuery,
  useGetAllApplicationsByJobIdQuery,
  useApplyOnJobMutation,
  useWithdrawApplicationMutation,
  useReApplyMutation,
  useShortlistTutorMutation,
  useAppointTutorMutation,
  useConfirmTutorMutation,
} = applicationApi;
