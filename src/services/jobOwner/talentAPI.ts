import apiSlice from "services/api/apiSlice";
import { IFreelancerSaved } from "components/FreelancerCard/FreelancerCard";
import {
  FILTER_FREELANCER,
  HIRED_FREELANCER,
  REACT_APP_FREELANCER_PROFILE_INFO_URL,
  SAVED_FREELANCERS,
  SAVE_FREELANCER,
  VIEWED_FREELANCER,
  VIEW_FREELANCER,
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
    viewFreelancers: builder.mutation<IFreelancerSaved[], number>({
      query: (freelancerId) => ({
        url: `${VIEW_FREELANCER}/${freelancerId}`,
        method: "POST",
      }),
      invalidatesTags: ["Freelancers"],
    }),
    getAllFreelancer: builder.query<IFreelancerSaved[], void>({
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
  useViewFreelancersMutation,
  useGetAllFreelancerQuery,
} = getTalentApi;

export default getTalentApi;
