import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "store/store";
import { INVITE, PROPOSALS } from "utils/consts/breakepointConsts";

interface ProposalFields {
  coverLetter: string;
  bid: number;
  idJobPost: number;
}

interface InviteFields {
  coverLetter: string;
  freelancerId: number;
  jobId: number;
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
    sendInvite: builder.mutation<void, InviteFields>({
      query: ({ ...inviteFields }) => ({
        url: `/${INVITE}`,
        method: "POST",
        body: {
          ...inviteFields,
        },
      }),
      transformResponse: (response: void) => response,
    }),
  }),
});

export const { useSendProposalMutation, useSendInviteMutation } = proposalsApi;

export default proposalsApi;
