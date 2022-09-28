import { CONTRACTS, FREELANCER_CONTRACTS } from "utils/consts/breakpointConsts";
import { IJobPost } from "services/jobPosts/setJobPostsAPI";
import apiSlice from "services/api/apiSlice";

interface ICloseContract {
  contractId: number;
  isContractStart?: boolean;
  isContractEnd?: boolean;
  freelancer?: number;
}

export interface IContract {
  id: number;
  offer: {
    id: number;
    jobPost: IJobPost;
    status: string;
  };
  startDate?: string;
  endDate?: string;
}

const apiSliceWithTags = apiSlice.enhanceEndpoints({
  addTagTypes: ["Contract"],
});

const contractApi = apiSliceWithTags.injectEndpoints({
  endpoints: (builder) => ({
    getContracts: builder.query<IContract[], void>({
      query: () => ({
        url: `${FREELANCER_CONTRACTS}`,
        method: "GET",
      }),
      providesTags: () => ["Contract"],
      transformResponse: (baseQueryReturnValue: IContract[]) =>
        baseQueryReturnValue,
    }),
    closeContract: builder.mutation<void, ICloseContract>({
      query: ({
        contractId,
        isContractEnd = true,
        freelancer,
      }: ICloseContract) => ({
        url: `${CONTRACTS}/${contractId}`,
        method: "PATCH",
        body: { freelancer, isContractEnd },
      }),
      invalidatesTags: () => ["Contract"],
    }),
  }),
});

export const { useGetContractsQuery, useCloseContractMutation } = contractApi;

export default contractApi;
