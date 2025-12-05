/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../API/baseApi";

const verificationRequestApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRefundRequests: builder.query<
      any,
      {
        page?: number;
        limit?: number;
        status?: string;
        keyword?: string;
      }
    >({
      query: ({ page = 1, limit = 10, status, keyword } = {}) => {
        const params = new URLSearchParams();

        if (page) params.append("page", page.toString());
        if (limit) params.append("limit", limit.toString());
        if (status) params.append("status", status);
        if (keyword) params.append("keyword", keyword);

        return {
          url: `/refund-request?${params.toString()}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["refundRequest"],
    }),

     getMyVerificationRequest: builder.query({
      query: () => ({
        url: `/profile-verification/my-request`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["testimonial"],
    }),

    sendVerificationRequest: builder.mutation<any, any>({
      query: () => ({
        url: `/profile-verification/send-request`,
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["verificationRequest"],
    }),

    submitAddressCode: builder.mutation<any, any>({
      query: (data) => ({
        url: `/profile-verification/submit-address-code`,
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["verificationRequest"],
    }),
  }),
});

export const {
  useGetAllRefundRequestsQuery,
  useGetMyVerificationRequestQuery,
  useSendVerificationRequestMutation,
  useSubmitAddressCodeMutation,
} = verificationRequestApi;
