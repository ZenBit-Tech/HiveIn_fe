import { IFreelancerSaved } from "components/FreelancerCard/FreelancerCard";
import apiSlice from "services/api/apiSlice";
import { REACT_APP_FREELANCER_PROFILE_INFO_URL } from "utils/consts/breakpointConsts";

interface FreelancerId {
  id: number;
}

const apiSliceWithTags = apiSlice.enhanceEndpoints({
  addTagTypes: ["Freelancers"],
});

const freelancerApi = apiSliceWithTags.injectEndpoints({
  endpoints: (builder) => ({
    getFreelancerById: builder.query<IFreelancerSaved, FreelancerId>({
      query: ({ id }) =>
        `${REACT_APP_FREELANCER_PROFILE_INFO_URL}/${id.toString()}`,
    }),
  }),
});

export const { useGetFreelancerByIdQuery } = freelancerApi;

export default freelancerApi;
