import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "store/store";
import { IContract } from "pages/Freelancer/MyContracts/Contract/interfaces";
import {
  CONTRACTS,
  FREELANCER_CONTRACTS,
} from "utils/consts/breakepointConsts";

interface ICloseContract {
  freelancer?: number;
  endDate: Date;
  contractId: number;
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
      query: ({ contractId, endDate, freelancer }: ICloseContract) => ({
        url: `${CONTRACTS}/${contractId}`,
        method: "PATCH",
        body: { freelancer, endDate },
      }),
      invalidatesTags: () => ["Contract"],
    }),
  }),
});

export const { useGetContractsQuery, useCloseContractMutation } = contractApi;

export default contractApi;
