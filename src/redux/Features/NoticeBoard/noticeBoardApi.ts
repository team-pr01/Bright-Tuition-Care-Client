/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../API/baseApi";

const noticeBoardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotices: builder.query<any, { role?: string }>({
      query: () => {
        return {
          url: `/notice-board`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["testimonial"],
    }),
    getAllTutorsNotice: builder.query<any, { role?: string }>({
      query: () => {
        return {
          url: `/notice-board/tutors`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["testimonial"],
    }),
    getAllGuardiansNotice: builder.query<any, { role?: string }>({
      query: () => {
        return {
          url: `/notice-board/guardians`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["testimonial"],
    }),

    getSingleNoticeById: builder.query({
      query: (id) => ({
        url: `/notice-board/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["testimonial"],
    }),

    addNotice: builder.mutation<any, any>({
      query: (data) => ({
        url: `/notice-board/add`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["testimonial"],
    }),

    deleteNotice: builder.mutation<any, string>({
      query: (id) => ({
        url: `/notice-board/delete/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["testimonial"],
    }),

    updateNotice: builder.mutation<any, any>({
      query: ({ id, data }) => ({
        url: `/notice-board/update/${id}`,
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["testimonial"],
    }),
  }),
});

export const {
  useGetAllNoticesQuery,
  useGetSingleNoticeByIdQuery,
  useGetAllTutorsNoticeQuery,
  useGetAllGuardiansNoticeQuery,
  useAddNoticeMutation,
  useDeleteNoticeMutation,
  useUpdateNoticeMutation,
} = noticeBoardApi;
