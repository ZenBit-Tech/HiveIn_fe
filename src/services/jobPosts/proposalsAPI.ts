import apiSlice from "services/api/apiSlice";
import { PROPOSALS } from "utils/consts/breakpointConsts";

interface ProposalFields {
  coverLetter: string;
  bid: number;
  idJobPost: number;
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
  }),
});

export const { useSendProposalMutation } = proposalsApi;

export default proposalsApi;
