import { OfferStatus, ProposalType } from "utils/enums";
import apiSlice from "services/api/apiSlice";
import { IJobPost } from "services/jobPosts/setJobPostsAPI";
import {
  BY_FREELANCER_AND_JOB_POST,
  JOB_POST,
  OFFER,
  PROPOSALS,
} from "utils/consts/breakpointConsts";
import { IUser } from "services/user/setUserAPI";

export interface InviteFields {
  message: string;
  idFreelancer: number;
  idJobPost: number;
  bid: number;
  type: ProposalType;
  fileId?: number;
  freelancer?: IUser;
  jobPost?: IJobPost;
}

interface OfferFields {
  id: string;
  status: OfferStatus;
}

export interface IOffersRes {
  id: string;
  status: OfferStatus;
  jobPost: IJobPost;
  createdAt: string;
}

const proposalsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOwnOffers: builder.query<IOffersRes[], void>({
      query: () => `${OFFER}/self`,
    }),
    getProposalsByJobPost: builder.query<InviteFields[], number>({
      query: (jobId) => `${PROPOSALS}/${JOB_POST}/${jobId}`,
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

    getOfferId: builder.mutation<
      IOffersRes,
      { jobPostId: number; freelancerId: number }
    >({
      query({ jobPostId, freelancerId }) {
        return {
          url: `/${OFFER}/${BY_FREELANCER_AND_JOB_POST}?jobPostId=${jobPostId}&freelancerId=${freelancerId}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useSendProposalMutation,
  useSendInviteMutation,
  useGetOwnOffersQuery,
  useGetProposalsByJobPostQuery,
  useChangeOfferStatusMutation,
  useSendOfferMutation,
  useGetOfferIdMutation,
} = proposalsApi;

export default proposalsApi;
