import apiSlice from "services/api/apiSlice";
import {
  AUTH,
  FORGOT_PASSWORD,
  RESTORE_PASSWORD,
} from "utils/consts/breakpointConsts";

interface ForgotPassword {
  email: string;
}

interface RestorePassword {
  token: string;
  password: string;
}

const forgotPassApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    forgotPassword: builder.mutation<boolean, ForgotPassword>({
      query: ({ email }) => ({
        url: `/${AUTH}/${FORGOT_PASSWORD}`,
        method: "POST",
        body: {
          email,
        },
      }),
    }),
    restorePassword: builder.mutation<boolean, RestorePassword>({
      query: ({ password, token }) => ({
        url: `/${AUTH}/${RESTORE_PASSWORD}`,
        method: "PATCH",
        body: {
          token,
          password,
        },
      }),
      transformResponse: (response: boolean) => response,
    }),
  }),
});

export const { useForgotPasswordMutation, useRestorePasswordMutation } =
  forgotPassApi;

export default forgotPassApi;
