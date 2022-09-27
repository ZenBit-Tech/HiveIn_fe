import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { setSignOut, setToken } from "store/slices/userSlice";
import { RootState } from "store/store";
import { AUTH, LOG_OUT, REFRESH } from "utils/consts/breakpointConsts";
import { UNAUTHORIZED_ERROR } from "utils/consts/errorConsts";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const { authToken } = (getState() as RootState).user;
    if (authToken) {
      headers.set("Authorization", `Bearer ${authToken}`);
    }

    return headers;
  },
});

const refreshQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const { refreshToken } = (getState() as RootState).user;
    if (refreshToken) {
      headers.set("Authorization", `Bearer ${refreshToken}`);
    }

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === UNAUTHORIZED_ERROR) {
    // Send refresh token to get new access token
    const refreshResult = await refreshQuery(
      `/${AUTH}/${REFRESH}`,
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      // Store the new token
      api.dispatch(setToken(refreshResult.data));
      // Retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      await baseQuery(`/${AUTH}/${LOG_OUT}`, api, extraOptions);

      api.dispatch(setSignOut());
    }
  }

  return result;
};

const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});

export default apiSlice;
