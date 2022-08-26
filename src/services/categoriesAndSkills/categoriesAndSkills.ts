import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IResponseData {
  id: number;
  name: string;
}

export const getSkillsOrCategory = createApi({
  reducerPath: "skillsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
  }),
  endpoints: (builder) => ({
    getInfo: builder.query<IResponseData[], "skill" | "category">({
      query: (path) => `/${path}`,
    }),
  }),
});

export const { useGetInfoQuery } = getSkillsOrCategory;
