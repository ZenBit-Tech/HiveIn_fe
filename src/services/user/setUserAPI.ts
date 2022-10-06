import apiSlice from "services/api/apiSlice";
import { REACT_APP_USER_CONTACT_INFO_URL } from "utils/consts/breakpointConsts";

export interface IPublicFile {
  id: string;
  url: string;
  key: string;
}
export interface IUser {
  id?: string;
  email?: string;
  role?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  description?: string;
  avatar?: IPublicFile;
}

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOwnUser: builder.query<IUser, void>({
      query: () => `/${REACT_APP_USER_CONTACT_INFO_URL}/self`,
    }),
    updateUser: builder.mutation<IUser, IUser>({
      query: ({ ...userInfo }: IUser) => ({
        url: `/${REACT_APP_USER_CONTACT_INFO_URL}/self`,
        method: "PATCH",
        body: {
          ...userInfo,
        },
      }),
      transformResponse: (response: IUser) => response,
    }),
  }),
});

export const { useUpdateUserMutation, useGetOwnUserQuery } = userApi;

export default userApi;
