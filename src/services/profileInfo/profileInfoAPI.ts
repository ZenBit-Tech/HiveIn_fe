import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IFreelancer } from "services/profileInfo/typesDef";

export const getProfileInfoApi = createApi({
  reducerPath: "profileInfoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
  }),
  endpoints: (builder) => ({
    getProfile: builder.query<IFreelancer | null, number>({
      query: (id) =>
        `${process.env.REACT_APP_FREELANCER_PROFILE_INFO_URL}/${id}`,
    }),
    updateProfile: builder.mutation({
      query: (arg) => ({
        url: `${process.env.REACT_APP_FREELANCER_PROFILE_INFO_URL}/${arg.id}`,
        method: "PATCH",
        body: {
          ...arg,
        },
      }),
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } =
  getProfileInfoApi;
