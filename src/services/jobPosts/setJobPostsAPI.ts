import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "services/user/setUserAPI";
import { RootState } from "store/store";
import { JOB_POST } from "utils/brakepointConsts";
import ContractStatusEnum from "utils/enums";

interface Skills {
  id: number;
  name: string;
}

interface QueryParam {
  id?: number;
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
  contract: {
    status: ContractStatusEnum;
  };
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
    getOwnJobPosts: builder.query<IJobPost[], void>({
      query: () => `${JOB_POST}/self`,
    }),
    getOneJobPost: builder.query<IJobPost, QueryParam>({
      query: ({ id }) => ({
        url: `${JOB_POST}/${id}`,
        credentials: "include",
      }),
    }),
    getHomePosts: builder.query<IJobPost[], QueryParam>({
      query: (path) => ({
        url: `${JOB_POST}/home/self/${path.isDraft}`,
      }),
    }),
  }),
});

export const {
  useGetOwnJobPostsQuery,
  useGetOneJobPostQuery,
  useGetHomePostsQuery,
} = jobPostsAPI;

export default jobPostsAPI;
