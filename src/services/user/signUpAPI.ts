import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface SignUp {
  email: string;
  password: string;
}

const userApi = createApi({
  reducerPath: "signUp",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    signUp: builder.mutation<boolean, SignUp>({
      query: ({ email, password }) => ({
        url: "/auth/sign-up",
        method: "POST",
        body: {
          email,
          password,
        },
      }),
      transformResponse: (response: boolean) => response,
    }),
  }),
});

export default { useSignUpMutation: userApi.useSignUpMutation } = userApi;
