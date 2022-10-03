import { ProposalType } from "utils/enums";
import apiSlice from "services/api/apiSlice";
import { PROPOSALS } from "utils/consts/breakpointConsts";

interface ProposalFields {
  message: string;
  idFreelancer: number;
  idJobPost: number;
  bid: number;
  type: ProposalType;
}

const proposalsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendProposal: builder.mutation<void, ProposalFields>({
      query: ({ type, ...proposalFields }) => ({
        url: `/${PROPOSALS}/${type}`,
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
