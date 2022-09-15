import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { io, Socket } from "socket.io-client";
import { RootState } from "store/store";

export interface Notifications {
  id?: number;
  fromUserId: number;
  toUserId: number;
  type: string;
  read?: boolean;
  fromUser?: {
    id: number;
    firstName?: string;
  };
}

let socketConnection: Socket;
function getSocket() {
  if (!socketConnection) {
    socketConnection = io(String(process.env.REACT_APP_API_URL));
  }
  return socketConnection;
}

const notificationsAPI = createApi({
  reducerPath: "setNotificationsAPI",
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
  endpoints: (builder) => ({
    getNotifications: builder.query<Notifications[], void>({
      query: () => "notifications",
    }),
    sendNotification: builder.mutation<Notifications, Notifications>({
      queryFn: (notification: Notifications) => {
        const socket = getSocket();
        return new Promise((resolve) => {
          socket.emit(
            "send-first-notification",
            notification,
            (resolvedNotification: Notifications) => {
              resolve({ data: resolvedNotification });
            }
          );
        });
      },
    }),
    readNotification: builder.mutation<void, number>({
      query: (arg) => ({
        url: `notifications/${arg}`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useSendNotificationMutation,
  useReadNotificationMutation,
} = notificationsAPI;

export { getSocket };

export default notificationsAPI;
