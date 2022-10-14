import { OfferStatus, ProposalType } from "utils/enums";
import apiSlice from "services/api/apiSlice";
import { IJobPost } from "services/jobPosts/setJobPostsAPI";
import { OFFER, PROPOSALS } from "utils/consts/breakpointConsts";

export interface InviteFields {
  message: string;
  idFreelancer: number;
  idJobPost: number;
  bid: number;
  type: ProposalType;
  fileId?: number;
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
    sendInvite: builder.mutation<void, InviteFields>({
      query: ({ type, ...proposalFields }) => ({
        url: `/${PROPOSALS}/${type}`,
        method: "POST",
        body: {
          ...proposalFields,
        },
      }),
      transformResponse: (response: void) => response,
    }),
    sendProposal: builder.mutation<void, FormData>({
      query: (arg) => ({
        url: `/${PROPOSALS}/${ProposalType.PROPOSAL}`,
        method: "POST",
        body: arg,
      }),
      transformResponse: (response: void) => response,
    }),
  }),
});

export const {
  useSendProposalMutation,
  useSendInviteMutation,
  useGetOwnOffersQuery,
  useChangeOfferStatusMutation,
} = proposalsApi;

export default proposalsApi;
