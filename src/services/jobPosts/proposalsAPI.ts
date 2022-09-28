import apiSlice from "services/api/apiSlice";
import { INVITE, PROPOSALS } from "utils/consts/breakpointConsts";

interface ProposalFields {
  coverLetter: string;
  bid: number;
  idJobPost: number;
}

interface InviteFields {
  inviteMessage: string;
  idFreelancer: number;
  idJobPost: number;
  bid: number;
}

const proposalsApi = apiSlice.injectEndpoints({
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
        url: `/${PROPOSALS}/${INVITE}`,
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
