/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../API/baseApi";

const guardianApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllGuardians: builder.query<
      any,
      { city?: string; area?: string; keyword?: string }
    >({
      query: ({ city = "", area = "", keyword = "" } = {}) => {
        const params = new URLSearchParams();

        if (city) params.append("city", city);
        if (area) params.append("area", area);
        if (keyword) params.append("keyword", keyword);

        return {
          url: `/guardian?${params.toString()}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["guardian"],
    }),

    getSingleTestimonialById: builder.query({
      query: (id) => ({
        url: `/testimonial/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["testimonial"],
    }),

    getAllTutorsTestimonials: builder.query<any, { role?: string }>({
      query: () => {
        return {
          url: `/testimonial/tutors`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["testimonial"],
    }),

    getAllGuardiansTestimonials: builder.query<any, { role?: string }>({
      query: () => {
        return {
          url: `/testimonial/guardians`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["testimonial"],
    }),

    addTestimonial: builder.mutation<any, any>({
      query: (data) => ({
        url: `/testimonial/add`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["testimonial"],
    }),

    deleteTestimonial: builder.mutation<any, string>({
      query: (id) => ({
        url: `/testimonial/delete/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["testimonial"],
    }),

    updateTestimonial: builder.mutation<any, any>({
      query: ({ id, data }) => ({
        url: `/testimonial/update/${id}`,
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["testimonial"],
    }),

    suspendUser: builder.mutation({
      query: ({userId, data}) => ({
        url: `/user/suspend/${userId}`,
        body: data,
        method: "PATCH",
      }),
      invalidatesTags: ["guardian"],
    }),

    activeUser: builder.mutation({
      query: (userId) => ({
        url: `/user/active/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["guardian"],
    }),
  }),
});

export const {
  useGetAllGuardiansQuery,
  useGetSingleTestimonialByIdQuery,
  useGetAllTutorsTestimonialsQuery,
  useGetAllGuardiansTestimonialsQuery,
  useAddTestimonialMutation,
  useDeleteTestimonialMutation,
  useUpdateTestimonialMutation,
  useSuspendUserMutation,
  useActiveUserMutation
} = guardianApi;
