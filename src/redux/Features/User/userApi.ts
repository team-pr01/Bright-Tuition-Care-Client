import { baseApi } from "../../API/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => ({
        url: `/user/me`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["users"],
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: `/user/update-profile`,
        body: data,
        method: "PATCH",
      }),
      invalidatesTags: ["users", "tutor", "guardian", "staff"],
    }),

    deleteAccount: builder.mutation({
      query: (data) => ({
        url: `/user/delete-account`,
        body: data,
        method: "PATCH",
      }),
      invalidatesTags: ["users", "tutor", "guardian", "staff"],
    }),

    suspendUser: builder.mutation({
      query: ({ userId, data }) => ({
        url: `/user/suspend/${userId}`,
        body: data,
        method: "PATCH",
      }),
      invalidatesTags: ["users", "tutor", "guardian"],
    }),

    activeUser: builder.mutation({
      query: (userId) => ({
        url: `/user/active/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["users", "tutor", "guardian"],
    }),
  }),
});

export const {  useGetMeQuery, useUpdateProfileMutation, useDeleteAccountMutation, useSuspendUserMutation, useActiveUserMutation } = userApi;
