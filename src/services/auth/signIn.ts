import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface SignIn {
  email: string;
  password: string;
}

interface SignInResponse {
  accessToken: string;
}

const authApi = createApi({
  reducerPath: "signIn",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    signIn: builder.mutation<SignInResponse, SignIn>({
      query: ({ email, password }) => ({
        url: "/auth/sign-in",
        method: "POST",
        body: {
          email,
          password,
        },
      }),
      transformResponse: (response: SignInResponse) => response,
    }),
  }),
});

export default { useSignInMutation: authApi.useSignInMutation } = authApi;
