import apiSlice from "services/api/apiSlice";
import { io, Socket } from "socket.io-client";
import { RootState, store } from "store/store";
import { NOTIFICATIONS } from "utils/consts/breakpointConsts";

export enum EventEnum {
  ROOMS = "rooms",
  ERROR = "error",
  GET_ROOMS = "getRooms",
  JOIN_ROOM = "joinRoom",
  MESSAGES = "messages",
  GET_MESSAGES = "getMessages",
  LEAVE_ROOM = "leaveRoom",
  ADD_MESSAGE = "addMessage",
  MESSAGE_ADDED = "messageAdded",
  NOTIFICATION = "send-first-notification",
  NOTIFICATION_SEND = "'first-message'",
}

export enum MessageTypeEnum {
  FROM_USER = "fromUser",
  FROM_SYSTEM = "fromSystem",
}

enum ChatRoomStatusEnum {
  FOR_ALL = "forAll",
  FREELANCER_ONLY = "freelancerOnly",
  CLIENT_ONLY = "clientOnly",
}

export interface IChatUser {
  id: number;
  firstName: string | null;
  lastName: string | null;
  avatarURL: string | null;
}

export interface IMessage {
  id: number;
  chatRoomId: number;
  created_at: string;
  senderId: number;
  text: string;
  messageType: MessageTypeEnum;
}

export interface IRoom {
  id: number;
  status: ChatRoomStatusEnum;
  freelancer: IChatUser;
  client: IChatUser;
  jobPost: {
    id: number;
    title: string;
  };
  lastMessage: {
    created_at: Date;
    id: number;
    isSystemMessage: boolean;
    text: string;
  };
}

interface ISendMessage {
  chatRoomId: number;
  text: string;
}

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
    const { getState } = store;

    const { authToken } = (getState() as RootState).user;
    socketConnection = io(String(process.env.REACT_APP_API_URL), {
      extraHeaders: { authorization: `Bearer ${authToken}` },
    });
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

    // Chat
    getRooms: builder.query<IRoom[], void>({
      queryFn: () => ({ data: [] }),
      async onCacheEntryAdded(
        ars,
        { cacheDataLoaded, updateCachedData, cacheEntryRemoved }
      ) {
        try {
          await cacheDataLoaded;

          const socket = getSocket();
          socket.emit(EventEnum.GET_ROOMS, () => {});
          socket.on(EventEnum.ROOMS, (rooms: IRoom[]) => {
            updateCachedData((draft) => {
              draft.splice(0, draft.length, ...rooms);
            });
          });

          await cacheEntryRemoved;

          socket.off(EventEnum.ROOMS);
        } catch {
          throw new Error("Error, cannot get chat rooms");
        }
      },
    }),
    messages: builder.query<IMessage[], void>({
      queryFn: () => ({ data: [] }),
      async onCacheEntryAdded(
        roomId,
        { cacheDataLoaded, updateCachedData, cacheEntryRemoved }
      ) {
        try {
          await cacheDataLoaded;

          const socket = getSocket();
          socket.on(EventEnum.MESSAGES, (messages: IMessage[]) => {
            updateCachedData((draft) => {
              draft.splice(0, draft.length, ...messages);
            });
          });

          await cacheEntryRemoved;

          socket.off(EventEnum.MESSAGES);
        } catch {
          throw new Error("Error, cannot get chat messages");
        }
      },
    }),
    sendMessage: builder.mutation<IMessage, ISendMessage>({
      queryFn: (data) => {
        const socket = getSocket();
        return new Promise((resolve) => {
          socket.emit(EventEnum.ADD_MESSAGE, data, (message: IMessage) => {
            resolve({ data: message });
          });
        });
      },
    }),
    leaveRoom: builder.mutation<void, void>({
      queryFn: () => {
        const socket = getSocket();
        return new Promise((resolve, reject) => {
          socket.emit(EventEnum.LEAVE_ROOM, null, () => {
            resolve({ data: undefined });
            reject(new Error("Leave room error"));
          });
        });
      },
    }),
    joinRoom: builder.mutation<void, number>({
      queryFn: (roomId) => {
        const socket = getSocket();
        return new Promise((resolve, reject) => {
          socket.emit(EventEnum.JOIN_ROOM, roomId, () => {
            resolve({ data: undefined });
            reject(new Error(`Cannot join the room with id:${roomId}`));
          });
        });
      },
    }),
    getMessages: builder.mutation<void, number>({
      queryFn: (roomId) => {
        const socket = getSocket();
        return new Promise((resolve, reject) => {
          socket.emit(EventEnum.GET_MESSAGES, roomId, () => {
            resolve({ data: undefined });
            reject(new Error(`Cannot find messages for room ${roomId}`));
          });
        });
      },
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useSendNotificationMutation,
  useReadNotificationMutation,
  useGetRoomsQuery,
  useMessagesQuery,
  useSendMessageMutation,
  useJoinRoomMutation,
  useLeaveRoomMutation,
  useGetMessagesMutation,
} = notificationsAPI;

export { getSocket };

export default notificationsAPI;
