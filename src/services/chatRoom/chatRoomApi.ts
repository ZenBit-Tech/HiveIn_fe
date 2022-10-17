import { PROLONG_CHAT } from "utils/consts/breakpointConsts";
import apiSlice from "services/api/apiSlice";

interface ProlongChat {
  chatId: number;
  token: string;
}

interface ProlongResponse {
  affected: number;
}

const chatRoomApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    prolongChat: builder.mutation<ProlongResponse, ProlongChat>({
      query: (data) => ({
        url: `${PROLONG_CHAT}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response: ProlongResponse) => response,
    }),
  }),
});

export const { useProlongChatMutation } = chatRoomApi;

export default chatRoomApi;
