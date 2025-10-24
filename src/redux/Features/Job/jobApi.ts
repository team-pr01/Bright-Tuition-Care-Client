/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../API/baseApi";

const jobApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllJobs: builder.query<
      any,
      {
        keyword?: string;
        status?: string;
        city?: string;
        area?: string;
        category?: string;
        class?: string;
        tutoringDays?: string;
        preferredTutorGender?: string;
        studentGender?: string;
        tuitionType?: string;
        skip?: number;
        limit?: number;
      }
    >({
      query: (filters) => {
        const params = new URLSearchParams();

        if (filters.keyword) params.append("keyword", filters.keyword);
        if (filters.status) params.append("status", filters.status);

        if (filters.city) params.append("city", filters.city);
        if (filters.area) params.append("area", filters.area);
        if (filters.category) params.append("category", filters.category);
        if (filters.class) params.append("class", filters.class);
        if (filters.tutoringDays)
          params.append("tutoringDays", filters.tutoringDays);
        if (filters.preferredTutorGender)
          params.append("preferredTutorGender", filters.preferredTutorGender);
        if (filters.studentGender)
          params.append("studentGender", filters.studentGender);
        if (filters.tuitionType)
          params.append("tuitionType", filters.tuitionType);
        if (filters.skip !== undefined)
          params.append("skip", String(filters.skip));
        if (filters.limit !== undefined)
          params.append("limit", String(filters.limit));

        return {
          url: `/job?${params.toString()}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["jobs"],
    }),

    getSingleJobById: builder.query({
      query: (id) => ({
        url: `/job/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["jobs"],
    }),

    getMyPostedJobs: builder.query({
      query: ({
        keyword,
        status,
        skip,
        limit,
      }: {
        keyword?: string;
        status?: string;
        skip?: number;
        limit?: number;
      } = {}) => {
        const params = new URLSearchParams();

        if (keyword) params.append("keyword", keyword);
        if (status) params.append("status", status);
        if (typeof skip === "number") params.append("skip", skip.toString());
        if (typeof limit === "number") params.append("limit", limit.toString());

        return {
          url: `/job/my-posted-jobs?${params.toString()}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["jobs"],
    }),

    postJob: builder.mutation<any, any>({
      query: (data) => ({
        url: `/job/post`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["jobs"],
    }),

    deleteJob: builder.mutation<any, string>({
      query: (id) => ({
        url: `/job/delete/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["jobs"],
    }),

    updateJob: builder.mutation<any, any>({
      query: ({ id, data }) => ({
        url: `/job/update/${id}`,
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["jobs"],
    }),
  }),
});

export const {
  useGetAllJobsQuery,
  useGetSingleJobByIdQuery,
  useGetMyPostedJobsQuery,
  usePostJobMutation,
  useDeleteJobMutation,
  useUpdateJobMutation,
} = jobApi;
