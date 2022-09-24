import apiSlice from "services/api/apiSlice";

interface IResponseData {
  id: number;
  name: string;
}

export const getSkillsOrCategory = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInfo: builder.query<IResponseData[], "skill" | "category">({
      query: (path) => `/${path}`,
    }),
  }),
});

export const { useGetInfoQuery } = getSkillsOrCategory;
