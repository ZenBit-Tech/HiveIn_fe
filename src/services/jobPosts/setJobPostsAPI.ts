import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "store/store";

export interface IJobPost {
  id?: number;
  title?: string;
  duration?: string;
  durationType?: string;
  rate?: string;
  isDraft?: boolean;
  englishLevel?: string;
  jobDescription?: string;
  createdAt?: string;
  updatedAt?: string;
  category?: string;
  skills?: string;
  user?: string;
}

const jobPostsAPI = createApi({
  reducerPath: "setJobPostsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const { authToken } = (getState() as RootState).user;

      if (authToken) {
        headers.set("Authorization", `Bearer ${authToken}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getJobPost: builder.query<IJobPost[], void>({
      query: () => `${process.env.REACT_APP_JOB_POSTS_URL}`,
    }),
  }),
});

export const { useGetJobPostQuery } = jobPostsAPI;

export default jobPostsAPI;
