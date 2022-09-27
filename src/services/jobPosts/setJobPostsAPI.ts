import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "services/user/setUserAPI";
import { RootState } from "store/store";
import { JOB_POST } from "utils/consts/breakepointConsts";
import { IDraftRequestObject } from "components/CreateJobPostForm/typesDef";
import { TEnglishLevel } from "components/layoutElementWithTitle/typesDef";
import { DurationTypeEnum } from "utils/enums";
import { IWorkCardProps } from "components/UI/WorkCard/WorkCard";
import { ISearchWorkFilters } from "components/UI/SearchWorkForm/typesDef";

export interface ISkills {
  id: number;
  name: string;
}

export interface ICategory {
  id: number;
  name: string;
}

interface IFile {
  id: number;
  filename: string;
  path: string;
}

interface IQueryParam {
  id?: number;
  isDraft?: boolean;
}

export interface IJobPost {
  id: number;
  title: string;
  duration: number;
  durationType: DurationTypeEnum;
  rate: number;
  isDraft: boolean;
  englishLevel: TEnglishLevel;
  jobDescription: string;
  createdAt: string;
  updatedAt: string;
  category: ICategory;
  skills: ISkills[];
  user: IUser;
  file?: IFile;
  contract: {
    startDate: Date;
    endDate: Date;
    id: number;
  };
}

export interface IUpdateParams {
  jobDescription?: string;
  rate?: number;
  userId: string;
  postId: number;
}

export interface IFilterReturnType {
  data: IWorkCardProps[];
  totalCount: number;
}

const jobPostsAPI = createApi({
  reducerPath: "setJobPostsAPI",
  refetchOnMountOrArgChange: true,
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
  tagTypes: ["Posts"],
  endpoints: (builder) => ({
    getOwnJobPosts: builder.query<IJobPost[], boolean>({
      query: (isDraft) => `${JOB_POST}/self/${isDraft}`,
      providesTags: ["Posts"],
    }),
    getOneJobPost: builder.query<IJobPost, IQueryParam>({
      query: ({ id }) => ({
        url: `${JOB_POST}/${id}`,
        credentials: "include",
      }),
      providesTags: ["Posts"],
    }),
    getHomePosts: builder.query<IJobPost[], IQueryParam>({
      query: (path) => ({
        url: `${JOB_POST}/home/self/${path.isDraft}`,
      }),
      providesTags: ["Posts"],
    }),
    postJobPost: builder.mutation<IJobPost, FormData>({
      query: (arg) => ({
        url: `${JOB_POST}`,
        method: "POST",
        body: arg,
      }),
      invalidatesTags: ["Posts"],
    }),
    postDraft: builder.mutation<IJobPost, IDraftRequestObject>({
      query: (arg) => ({
        url: `${JOB_POST}/draft`,
        method: "POST",
        body: {
          ...arg,
        },
      }),
      invalidatesTags: ["Posts"],
    }),
    updatePost: builder.mutation<IJobPost, IUpdateParams>({
      query: ({ postId, ...objToRequest }) => ({
        url: `${JOB_POST}/${postId}`,
        method: "PATCH",
        body: {
          ...objToRequest,
        },
      }),
      invalidatesTags: ["Posts"],
    }),
    deletePost: builder.mutation<null, number>({
      query: (id) => ({
        url: `${JOB_POST}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Posts"],
    }),
    filterJobPosts: builder.query<IFilterReturnType, ISearchWorkFilters>({
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
  useUpdatePostMutation,
  useDeletePostMutation,
} = jobPostsAPI;

export default jobPostsAPI;
