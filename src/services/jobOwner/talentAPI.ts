import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "store/store";
import {
  FILTER_FREELANCER,
  HIRED_FREELANCER,
  SAVED_FREELANCERS,
  SAVE_FREELANCER,
  VIEWED_FREELANCER,
} from "utils/consts/breakepointConsts";
import { IFreelancerSaved } from "components/FreelancerCard/FreelancerCard";

export interface IFilters {
  keyWords: string;
  category: string;
  skills: string[];
  userId: number;
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
    filter: builder.query<IFreelancerSaved[], IFilters>({
      query: ({ keyWords, category, skills }) => ({
        url: `${FILTER_FREELANCER}/${keyWords}/${category}/${skills}`,
        method: "GET",
      }),
      providesTags: () => ["Freelancers"],
    }),

    getSavedFreelancers: builder.query<IFreelancerSaved[], void>({
      query: () => `${SAVED_FREELANCERS}`,
      providesTags: () => ["Freelancers"],
    }),
    saveFreelancers: builder.mutation<IFreelancerSaved[], number>({
      query: (freelancerId) => ({
        url: `${SAVE_FREELANCER}/${freelancerId}`,
        method: "POST",
      }),
      invalidatesTags: ["Freelancers"],
    }),
    getHiredFreelancers: builder.query<IFreelancerSaved[], void>({
      query: () => `${HIRED_FREELANCER}`,
      providesTags: () => ["Freelancers"],
    }),
    getRecentlyViewedFreelancers: builder.query<IFreelancerSaved[], void>({
      query: () => `${VIEWED_FREELANCER}`,
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
