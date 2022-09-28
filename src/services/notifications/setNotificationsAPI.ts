import apiSlice from "services/api/apiSlice";
import { io, Socket } from "socket.io-client";
import { NOTIFICATIONS } from "utils/consts/breakpointConsts";

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

const notificationsAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<Notifications[], void>({
      query: () => NOTIFICATIONS,
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
        url: `${NOTIFICATIONS}/${arg}`,
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
