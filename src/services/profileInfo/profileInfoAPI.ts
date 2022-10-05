import apiSlice from "services/api/apiSlice";
import { IFreelancer } from "services/profileInfo/typesDef";
import { REACT_APP_FREELANCER_PROFILE_INFO_URL } from "utils/consts/breakpointConsts";

export const getProfileInfoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOwnProfile: builder.query<IFreelancer, void>({
      query: () => `${REACT_APP_FREELANCER_PROFILE_INFO_URL}/self`,
    }),
    updateProfile: builder.mutation({
      query: (arg) => ({
        url: `${REACT_APP_FREELANCER_PROFILE_INFO_URL}/${arg.id}`,
        method: "PATCH",
        body: {
          ...arg,
        },
      }),
    }),
  }),
});

export const { useGetOwnProfileQuery, useUpdateProfileMutation } =
  getProfileInfoApi;
