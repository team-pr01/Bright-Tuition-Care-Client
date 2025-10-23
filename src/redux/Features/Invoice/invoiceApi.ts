/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../API/baseApi";

const invoiceApi = baseApi.injectEndpoints({
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

    getAllTutorsInvoices: builder.query<any, any>({
      query: () => {
        return {
          url: `/invoice/tutor`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["invoice"],
    }),

    sendInvoice: builder.mutation<any, any>({
      query: (data) => ({
        url: `/invoice/send`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["invoice"],
    }),
  }),
});

export const {
  useGetJobDetailsForInvoiceQuery,
  useGetAllInvoicesQuery,
  useGetSingleInvoiceByIdQuery,
  useGetAllTutorsInvoicesQuery,
  useSendInvoiceMutation,
} = invoiceApi;
