/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../API/baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPayments: builder.query<any, { role?: string }>({
      query: ({ role = "" } = { role: "" }) => {
        const params = new URLSearchParams();
        params.append("role", role.toString());

        return {
          url: `/payment?${params.toString()}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["payment"],
    }),

    getSinglePaymentById: builder.query({
      query: (id) => ({
        url: `/payment/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["payment"],
    }),

    pay: builder.mutation<any, any>({
      query: (data) => ({
        url: `/payment/pay`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["payment"],
    }),

    updatePaymentStatus: builder.mutation<any, any>({
      query: ({ id, data }) => ({
        url: `/payment/update-status/${id}`,
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["payment"],
    }),
  }),
});

export const {
  useGetAllPaymentsQuery,
  useGetSinglePaymentByIdQuery,
  usePayMutation,
  useUpdatePaymentStatusMutation,
} = paymentApi;
