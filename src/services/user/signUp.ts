import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import api from "services/api";

interface SignUp {
  email: string;
  password: string;
}

const signUpApi = createApi({
  reducerPath: "signUp",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
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

export default { useSignUpMutation: signUpApi.useSignUpMutation } = signUpApi;
