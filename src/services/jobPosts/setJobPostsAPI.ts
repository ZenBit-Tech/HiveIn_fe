import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "services/user/setUserAPI";
import { RootState } from "store/store";
import { JOB_POST } from "utils/brakepointConsts";

interface Skills {
  id: number;
  name: string;
}

interface QueryParam {
  id: number;
  isDraft?: boolean;
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
      query: () => `${JOB_POST}`,
    }),
    getOneJobPost: builder.query<IJobPost, QueryParam>({
      query: ({ id }) => ({
        url: `${JOB_POST}/${id}`,
        credentials: "include",
      }),
    }),
    getHomePosts: builder.query<IJobPost[], QueryParam>({
      query: (path) => ({
        url: `${JOB_POST}/home/${path.id}/${path.isDraft}`,
      }),
    }),
  }),
});

export const {
  useGetJobPostQuery,
  useGetOneJobPostQuery,
  useGetHomePostsQuery,
} = jobPostsAPI;

export default jobPostsAPI;
