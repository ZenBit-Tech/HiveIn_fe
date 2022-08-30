import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "services/user/setUserAPI";
import { RootState } from "store/store";

interface Skills {
  id: number;
  name: string;
}

interface QueryParam {
  id: number;
}
export interface IJobPost {
  id: number;
  title: string;
  duration: number;
  durationType: string;
  rate: number;
  isDraft: boolean;
  englishLevel: string;
  jobDescription: string;
  createdAt: string;
  updatedAt: string;
  category: string;
  skills: Skills[];
  user: IUser[];
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
    getOneJobPost: builder.query<IJobPost, QueryParam>({
      query: ({ id }) => ({
        url: `${process.env.REACT_APP_JOB_POSTS_URL}/${id}`,
        credentials: "include",
      }),
    }),
  }),
});

export const { useGetJobPostQuery, useGetOneJobPostQuery } = jobPostsAPI;

export default jobPostsAPI;
