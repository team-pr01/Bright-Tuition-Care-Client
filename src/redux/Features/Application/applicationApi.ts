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
      {
        jobId: string;
        keyword?: string;
        status?: string;
        page?: number;
        limit?: number;
      }
    >({
      query: ({ jobId, keyword, status = "", page = 1, limit = 10 }) => {
        let url = `/application/job/${jobId}?page=${page}&limit=${limit}`;

        // always pass status (empty string if not provided)
        url += `&status=${encodeURIComponent(status)}`;

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

    getAllApplicationOfATutor: builder.query<
      any,
      { userId: string; skip?: number; limit?: number; status?: string }
    >({
      query: ({ userId, skip = 0, limit = 10, status }) => {
        const url = `/application/tutor/${userId}?skip=${skip}&limit=${limit}&status=${status}`;
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
      invalidatesTags: ["application", "jobs"],
    }),

    withdrawApplication: builder.mutation({
      query: (id) => ({
        url: `/application/withdraw/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["application", "jobs", "tutor"],
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

    rejectTutor: builder.mutation<any, any>({
      query: ({ id, data }) => ({
        url: `/application/reject/${id}`,
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

    // cancelTutor: builder.mutation<any, any>({
    //   query: ({ id, data }) => ({
    //     url: `/application/cancel/${id}`,
    //     method: "PATCH",
    //     body: data,
    //     credentials: "include",
    //   }),
    //   invalidatesTags: ["application"],
    // }),
  }),
});

export const {
  useGetJobDetailsForInvoiceQuery,
  useGetAllInvoicesQuery,
  useGetSingleApplicationByIdQuery,
  useGetAllApplicationsByJobIdQuery,
  useGetAllApplicationOfATutorQuery,
  useApplyOnJobMutation,
  useWithdrawApplicationMutation,
  useReApplyMutation,
  useShortlistTutorMutation,
  useAppointTutorMutation,
  useRejectTutorMutation,
  useConfirmTutorMutation,
} = applicationApi;
