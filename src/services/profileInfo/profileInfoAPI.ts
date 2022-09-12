import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IFreelancer } from "services/profileInfo/typesDef";
import { RootState } from "store/store";
import { REACT_APP_FREELANCER_PROFILE_INFO_URL } from "utils/breakepointConsts";

export const getProfileInfoApi = createApi({
  reducerPath: "profileInfoApi",
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
