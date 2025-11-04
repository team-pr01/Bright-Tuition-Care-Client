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

    getSingleInvoiceById: builder.query({
      query: (id) => ({
        url: `/invoice/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["invoice"],
    }),

getAllApplicationsByJobId: builder.query<any, { jobId: string; keyword?: string; page?: number; limit?: number }>({
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
  }),
});

export const {
  useGetJobDetailsForInvoiceQuery,
  useGetAllInvoicesQuery,
  useGetSingleInvoiceByIdQuery,
  useGetAllApplicationsByJobIdQuery,
  useApplyOnJobMutation,
} = applicationApi;
