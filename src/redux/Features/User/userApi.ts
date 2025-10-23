import { baseApi } from "../../API/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    suspendUser: builder.mutation({
      query: ({userId, data}) => ({
        url: `/user/suspend/${userId}`,
        body: data,
        method: "PATCH",
      }),
      invalidatesTags: ["users"],
    }),

    activeUser: builder.mutation({

      query: (userId) => ({
        url: `/user/active/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const { useSuspendUserMutation, useActiveUserMutation } = userApi;
