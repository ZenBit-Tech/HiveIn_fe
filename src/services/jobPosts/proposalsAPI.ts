import { ProposalType, OfferStatus } from "utils/enums";
import apiSlice from "services/api/apiSlice";
import { IJobPost } from "services/jobPosts/setJobPostsAPI";
import { OFFER, PROPOSALS } from "utils/consts/breakpointConsts";

interface ProposalFields {
  message: string;
  idFreelancer: number;
  idJobPost: number;
  bid: number;
  type: ProposalType;
}

interface OfferFields {
  id: string;
  status: OfferStatus;
}

export interface IProposalsRes {
  id: string;
  status: OfferStatus;
  jobPost: IJobPost;
  createdAt: string;
}

const proposalsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOwnOffers: builder.query<IProposalsRes[], void>({
      query: () => `${OFFER}/self`,
    }),
    changeOfferStatus: builder.mutation<void, OfferFields>({
      query: ({ id, ...offerFields }) => ({
        url: `/${OFFER}/${id}`,
        method: "PATCH",
        body: {
          ...offerFields,
        },
      }),
      transformResponse: (response: void) => response,
    }),

    sendOffer: builder.mutation<
      void,
      { jobPostId: number; freelancerId: number }
    >({
      query(arg) {
        return {
          url: `/${OFFER}`,
          method: "POST",
          body: arg,
        };
      },
    }),

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

export const {
  useSendProposalMutation,
  useGetOwnOffersQuery,
  useChangeOfferStatusMutation,
  useSendOfferMutation,
} = proposalsApi;

export default proposalsApi;
