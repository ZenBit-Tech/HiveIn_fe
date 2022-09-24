import apiSlice from "services/api/apiSlice";
import {
  AUTH,
  GOOGLE,
  LOG_OUT,
  SIGN_IN,
  SIGN_UP,
} from "utils/consts/breakpointConsts";

interface AuthFields {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: {
    authToken: string;
    email: string;
    id: number;
    role: "freelancer" | "client" | undefined;
  };
  refreshToken: string;
}

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<AuthResponse, AuthFields>({
      query: ({ email, password }) => ({
        url: `/${AUTH}/${SIGN_IN}`,
        method: "POST",
        body: {
          email,
          password,
        },
      }),
      transformResponse: (response: AuthResponse) => response,
    }),
    signUp: builder.mutation<AuthResponse, AuthFields>({
      query: ({ email, password }) => ({
        url: `/${AUTH}/${SIGN_UP}`,
        method: "POST",
        body: {
          email,
          password,
        },
      }),
      transformResponse: (response: AuthResponse) => response,
    }),
    logOut: builder.mutation<void, void>({
      query: () => ({
        url: `/${AUTH}/${LOG_OUT}`,
        method: "POST",
      }),
    }),
    googleOAuthSignIn: builder.query<AuthResponse, void>({
      query: () => ({
        url: `/${AUTH}/${GOOGLE}`,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useLogOutMutation,
  useGoogleOAuthSignInQuery,
} = authApi;

export default authApi;
