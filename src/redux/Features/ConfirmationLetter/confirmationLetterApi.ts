/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../API/baseApi";

const confirmationLetter = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getJobDetailsForConfirmationLetter: builder.query<any, any>({
      query: (id) => {
        return {
          url: `/confirmation-letter/details/${id}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["confirmationLetter"],
    }),

    getAllConfirmationLetters: builder.query<any, { role?: string }>({
      query: () => {
        return {
          url: `/confirmation-letter`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["notice"],
    }),

    getSingleConfirmationLetterById: builder.query({
      query: (id) => ({
        url: `/confirmation-letter/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["notice"],
    }),

    sendConfirmationLetter: builder.mutation<any, any>({
      query: (data) => ({
        url: `/confirmation-letter/send`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["confirmationLetter"],
    }),
  }),
});

export const {
  useGetJobDetailsForConfirmationLetterQuery,
  useGetAllConfirmationLettersQuery,
  useGetSingleConfirmationLetterByIdQuery,
  useSendConfirmationLetterMutation,
} = confirmationLetter;
