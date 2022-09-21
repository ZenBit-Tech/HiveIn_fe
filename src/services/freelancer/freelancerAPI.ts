import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "store/store";
import { IFreelancerSaved } from "../../components/FreelancerCard/FreelancerCard";
import { REACT_APP_FREELANCER_PROFILE_INFO_URL } from "../../utils/consts/breakepointConsts";

interface FreelancerId {
  id: number;
}

const freelancerApi = createApi({
  reducerPath: "freelancer",
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
    getFreelancerById: builder.query<IFreelancerSaved, FreelancerId>({
      query: ({ id }) =>
        `${REACT_APP_FREELANCER_PROFILE_INFO_URL}/${id.toString()}`,
    }),
  }),
});

export const { useGetFreelancerByIdQuery } = freelancerApi;

export default freelancerApi;
