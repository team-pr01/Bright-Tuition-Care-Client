import { baseApi } from "../../API/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["users"],
    }),

    signup: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/signup",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["users"],
    }),

    verifyOtp: builder.mutation({
      query: (verifyOtpData) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: verifyOtpData,
        credentials: "include",
      }),
      invalidatesTags: ["users"],
    }),
    forgotPassword: builder.mutation({
      query: (forgotPasswordData) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: forgotPasswordData,
        credentials: "include",
      }),
      invalidatesTags: ["users"],
    }),

    resetPassword: builder.mutation({
      query: ({resetPasswordData, token}) => ({
        url: `/auth/reset-password/${token}`,
        method: "POST",
        body: resetPasswordData,
        credentials: "include",
      }),
      invalidatesTags: ["users"],
    }),


  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useVerifyOtpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation
} = authApi;
