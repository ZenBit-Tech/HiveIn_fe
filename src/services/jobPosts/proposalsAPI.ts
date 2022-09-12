import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "store/store";
import { PROPOSALS } from "utils/breakepointConsts";

interface ProposalFields {
  coverLetter: string;
  bid: number;
  idJobPost: number;
}

const proposalsApi = createApi({
  reducerPath: "proposalsApi",
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
    sendProposal: builder.mutation<void, ProposalFields>({
      query: ({ ...proposalFields }) => ({
        url: `/${PROPOSALS}`,
        method: "POST",
        body: {
          ...proposalFields,
        },
      }),
      transformResponse: (response: void) => response,
    }),
  }),
});

export const { useSendProposalMutation } = proposalsApi;

export default proposalsApi;
