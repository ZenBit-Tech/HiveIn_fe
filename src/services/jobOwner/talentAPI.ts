import { IFreelancer } from "components/CandidateCard/CandidateCard";
import apiSlice from "services/api/apiSlice";

import {
  FILTER_FREELANCER,
  HIRED_FREELANCER,
  REACT_APP_FREELANCER_PROFILE_INFO_URL,
  SAVED_FREELANCERS,
  SAVE_FREELANCER,
  VIEWED_FREELANCER,
} from "utils/consts/breakpointConsts";

export interface IFilters {
  keyWords: string;
  category: string;
  skills: string[];
  userId: number;
}

const apiSliceWithTags = apiSlice.enhanceEndpoints({
  addTagTypes: ["Freelancers"],
});

const getTalentApi = apiSliceWithTags.injectEndpoints({
  endpoints: (builder) => ({
    filter: builder.query<IFreelancer[], IFilters>({
      query: ({ keyWords, category, skills }) => ({
        url: `${FILTER_FREELANCER}/${keyWords}/${category}/${skills}`,
        method: "GET",
      }),
      providesTags: () => ["Freelancers"],
    }),

    getSavedFreelancers: builder.query<IFreelancer[], void>({
      query: () => `${SAVED_FREELANCERS}`,
      providesTags: () => ["Freelancers"],
    }),
    saveFreelancers: builder.mutation<IFreelancer[], number>({
      query: (freelancerId) => ({
        url: `${SAVE_FREELANCER}/${freelancerId}`,
        method: "POST",
      }),
      invalidatesTags: ["Freelancers"],
    }),
    getHiredFreelancers: builder.query<IFreelancer[], void>({
      query: () => `${HIRED_FREELANCER}`,
      providesTags: () => ["Freelancers"],
    }),
    getRecentlyViewedFreelancers: builder.query<IFreelancer[], void>({
      query: () => `${VIEWED_FREELANCER}`,
      providesTags: () => ["Freelancers"],
    }),
    getAllFreelancer: builder.query<IFreelancer[], void>({
      query: () => `${REACT_APP_FREELANCER_PROFILE_INFO_URL}`,
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
  useGetAllFreelancerQuery,
} = getTalentApi;

export default getTalentApi;
