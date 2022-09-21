import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "store/store";
import {
  CONTRACTS,
  FREELANCER_CONTRACTS,
} from "utils/consts/breakepointConsts";
import { IJobPost } from "services/jobPosts/setJobPostsAPI";

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

const contractApi = createApi({
  reducerPath: "contract",
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
  tagTypes: ["Contract"],
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
