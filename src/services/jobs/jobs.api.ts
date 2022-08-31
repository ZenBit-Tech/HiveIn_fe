import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { RootState } from "store/store";
import { JOB_POST } from "utils/brakepointConsts";

interface Skills {
  id: number;
  name: string;
}

interface Job {
  title: string;
  duration: number;
  durationType: string;
  rate: number;
  isDraft: boolean;
  englishLevel: string;
  jobDescription: string;
  createdAt: string;
  skills: Skills[];
}

interface QueryParam {
  id: number;
  isDraft?: boolean;
}

const jobsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.authToken;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchDetails: builder.query<Job, QueryParam>({
      query: (path) => ({
        url: `${JOB_POST}/${path.id}`,
        credentials: "include",
      }),
    }),
    fetchHomePosts: builder.query<Job[], QueryParam>({
      query: (path) => ({
        url: `${JOB_POST}/home/${path.id}/${path.isDraft}`,
      }),
    }),
  }),
});

export const { useFetchDetailsQuery, useFetchHomePostsQuery } = jobsApi;

export default jobsApi;
