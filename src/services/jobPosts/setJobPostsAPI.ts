import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "services/user/setUserAPI";
import { RootState } from "store/store";
import { JOB_POST } from "utils/consts/brakepointConsts";
import { IDraftRequestObject } from "components/CreateJobPostForm/typesDef";
import { IWorkCardProps } from "components/UI/WorkCard/WorkCard";
import { ISearchWorkFilters } from "components/UI/SearchWorkForm/typesDef";

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
    postJobPost: builder.mutation<IJobPost, FormData>({
      query: (arg) => ({
        url: `${JOB_POST}`,
        method: "POST",
        body: arg,
      }),
    }),
    postDraft: builder.mutation<IJobPost, IDraftRequestObject>({
      query: (arg) => ({
        url: `${JOB_POST}/draft`,
        method: "POST",
        body: {
          ...arg,
        },
      }),
    }),
    filterJobPosts: builder.query<
      { data: IWorkCardProps[]; totalCount: number },
      ISearchWorkFilters
    >({
      query: (params) => ({
        url: `${JOB_POST}/search-job/`,
        params: {
          ...params,
          skills: params.skills?.map((skill) => skill.id).join("_"),
        },
      }),
    }),
  }),
});

export const {
  useGetOwnJobPostsQuery,
  useGetOneJobPostQuery,
  useGetHomePostsQuery,
  usePostJobPostMutation,
  usePostDraftMutation,
  useFilterJobPostsQuery,
} = jobPostsAPI;

export default jobPostsAPI;
