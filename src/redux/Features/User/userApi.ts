import { baseApi } from "../../API/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: `/user/update-profile`,
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

export const { useUpdateUserProfileMutation, useSuspendUserMutation, useActiveUserMutation } = userApi;
