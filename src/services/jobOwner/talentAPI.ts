import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IFreelancer } from "components/CandidateCard/CandidateCard";
import { RootState } from "store/store";
import {
  FILTER_FREELANCER,
  HIRED_FREELANCER,
  SAVED_FREELANCERS,
  SAVE_FREELANCER,
  VIEWED_FREELANCER,
} from "utils/brakepointConsts";

export interface IFilters {
  keyWords: string;
  category: string;
  skills: string[];
  userId: number;
}

interface ISaveFreelancer {
  userId: number;
  freelancerId: number;
}

const getTalentApi = createApi({
  reducerPath: "talent",
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
  tagTypes: ["Freelancers"],
  endpoints: (builder) => ({
    filter: builder.query<IFreelancer[], IFilters>({
      query: ({ keyWords, category, skills, userId }) => ({
        url: `${FILTER_FREELANCER}/${userId}/${keyWords}/${category}/${skills}`,
        method: "GET",
      }),
      providesTags: () => ["Freelancers"],
    }),

    getSavedFreelancers: builder.query<IFreelancer[], number>({
      query: (userId) => `${SAVED_FREELANCERS}/${userId}`,
      providesTags: () => ["Freelancers"],
    }),
    saveFreelancers: builder.mutation<IFreelancer[], ISaveFreelancer>({
      query: ({ userId, freelancerId }) => ({
        url: `${SAVE_FREELANCER}/${userId}/${freelancerId}`,
        method: "POST",
      }),
      invalidatesTags: ["Freelancers"],
    }),
    getHiredFreelancers: builder.query<IFreelancer[], number>({
      query: (userId) => `${HIRED_FREELANCER}/${userId}`,
      providesTags: () => ["Freelancers"],
    }),
    getRecentlyViewedFreelancers: builder.query<IFreelancer[], number>({
      query: (userId) => `${VIEWED_FREELANCER}/${userId}`,
      providesTags: () => ["Freelancers"],
    }),
  }),
});

export const {
  useFilterQuery,
  useGetSavedFreelancersQuery,
  useGetHiredFreelancersQuery,
  useGetRecentlyViewedFreelancersQuery,
  useSaveFreelancersMutation,
} = getTalentApi;

export default getTalentApi;
