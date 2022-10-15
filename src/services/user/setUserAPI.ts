import apiSlice from "services/api/apiSlice";
import {
  AUTH,
  REACT_APP_USER_CONTACT_INFO_URL,
  REMOVE_AVATAR,
} from "utils/consts/breakpointConsts";
import { UserRoleEnum } from "utils/enums";

export interface IPublicFile {
  id: string;
  url: string;
  key: string;
}
export interface IUser {
  id?: string;
  email?: string;
  role?: UserRoleEnum;
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
    removeAvatar: builder.mutation<void, void>({
      query: () => ({
        url: `/${AUTH}/${REMOVE_AVATAR}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useUpdateUserMutation,
  useGetOwnUserQuery,
  useRemoveAvatarMutation,
} = userApi;

export default userApi;
