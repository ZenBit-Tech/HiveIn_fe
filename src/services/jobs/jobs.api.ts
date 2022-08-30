import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { RootState } from "store/store";

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
        url: `job-post/${path.id}`,
        credentials: "include",
      }),
    }),
  }),
});

export const { useFetchDetailsQuery } = jobsApi;

export default jobsApi;
