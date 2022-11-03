import apiSlice from "services/api/apiSlice";
import { io, Socket } from "socket.io-client";
import { RootState, store } from "store/store";
import { EventEnum } from "services/notifications/chatEnums";
import {
  IMessage,
  INotificationResponse,
  INotificationsCount,
  IRoom,
  ISendMessage,
} from "services/notifications/chatTypes";

let socketConnection: Socket;

async function getSocket() {
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
    // Notifications
    getNotifications: builder.query<INotificationResponse, void>({
      queryFn: () => ({ data: {} as INotificationResponse }),
      async onCacheEntryAdded(
        args,
        { cacheDataLoaded, updateCachedData, cacheEntryRemoved }
      ) {
        try {
          await cacheDataLoaded;
          const socket = await getSocket();

          await socket.emit(EventEnum.GET_NOTIFICATIONS);

          socket.on(
            EventEnum.GET_NOTIFICATIONS,
            (response: INotificationResponse) => {
              updateCachedData(() => response);
            }
          );

          await cacheEntryRemoved;

          socket.off(EventEnum.GET_NOTIFICATIONS);
        } catch {
          throw new Error("Error, cannot get list of notifications");
        }
      },
    }),

    getMessagesNotifications: builder.query<INotificationResponse, void>({
      queryFn: () => ({ data: {} as INotificationResponse }),
      async onCacheEntryAdded(
        args,
        { cacheDataLoaded, updateCachedData, cacheEntryRemoved }
      ) {
        try {
          await cacheDataLoaded;
          const socket = await getSocket();
          socket.emit(EventEnum.GET_MESSAGE_NOTIFICATION);

          socket.on(
            EventEnum.GET_MESSAGE_NOTIFICATION,
            (response: INotificationResponse) => {
              updateCachedData(() => response);
            }
          );

          await cacheEntryRemoved;

          socket.off(EventEnum.GET_MESSAGE_NOTIFICATION);
        } catch {
          throw new Error("Error, cannot message notifications");
        }
      },
    }),

    getNotificationsCount: builder.query<INotificationsCount, void>({
      queryFn: () => ({ data: {} as INotificationsCount }),
      async onCacheEntryAdded(
        args,
        { cacheDataLoaded, updateCachedData, cacheEntryRemoved }
      ) {
        try {
          await cacheDataLoaded;

          const socket = await getSocket();
          socket.on("connect", () => {
            socket.emit(EventEnum.GET_COUNT_NOTIFICATIONS);
          });

          socket.on(
            EventEnum.GET_COUNT_NOTIFICATIONS,
            (notifications: INotificationsCount) => {
              updateCachedData(() => ({ ...notifications }));
            }
          );

          await cacheEntryRemoved;

          socket.off(EventEnum.GET_COUNT_NOTIFICATIONS);
        } catch {
          throw new Error("Error, cannot get number of notifications");
        }
      },
    }),

    readNotifications: builder.mutation<void, number[]>({
      queryFn: async (args) => {
        const socket = await getSocket();
        return new Promise((resolve, reject) => {
          socket.emit(EventEnum.MARK_AS_READ_NOTIFICATION, args, () => {
            resolve({ data: undefined });
            reject(new Error("MARK_AS_READ_NOTIFICATION error"));
          });
        });
      },
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

          const socket = await getSocket();
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

    room: builder.query<IRoom, void>({
      queryFn: () => ({ data: {} as IRoom }),
      async onCacheEntryAdded(
        args,
        { cacheDataLoaded, updateCachedData, cacheEntryRemoved }
      ) {
        try {
          await cacheDataLoaded;

          const socket = await getSocket();
          socket.on(EventEnum.ROOM, (room: IRoom) => {
            updateCachedData(() => {
              return room;
            });
          });

          await cacheEntryRemoved;
          socket.off(EventEnum.ROOM);
        } catch {
          throw new Error("Error, cannot get current room");
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

          const socket = await getSocket();
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
      queryFn: async (data) => {
        const socket = await getSocket();
        return new Promise((resolve) => {
          socket.emit(EventEnum.ADD_MESSAGE, data, (message: IMessage) => {
            resolve({ data: message });
          });
        });
      },
    }),

    leaveRoom: builder.mutation<void, string>({
      queryFn: async (id) => {
        const socket = await getSocket();
        return new Promise((resolve, reject) => {
          socket.emit(EventEnum.LEAVE_ROOM, id, () => {
            resolve({ data: undefined });
            reject(new Error("Leave room error"));
          });
        });
      },
    }),

    joinRoom: builder.mutation<void, number>({
      queryFn: async (roomId) => {
        const socket = await getSocket();
        return new Promise((resolve, reject) => {
          socket.emit(EventEnum.JOIN_ROOM, roomId, () => {
            resolve({ data: undefined });
            reject(new Error(`Cannot join the room with id:${roomId}`));
          });
        });
      },
    }),

    getMessages: builder.mutation<void, number>({
      queryFn: async (roomId) => {
        const socket = await getSocket();
        return new Promise((resolve, reject) => {
          socket.emit(EventEnum.GET_MESSAGES, roomId, () => {
            resolve({ data: undefined });
            reject(new Error(`Cannot find messages for room ${roomId}`));
          });
        });
      },
    }),

    // Errors
    getWebsocketError: builder.query<Error, void>({
      queryFn: () => ({ data: {} as Error }),
      async onCacheEntryAdded(
        arg,
        { cacheDataLoaded, updateCachedData, cacheEntryRemoved }
      ) {
        try {
          await cacheDataLoaded;

          const socket = await getSocket();
          socket.on(EventEnum.ERROR, (error: Error) => {
            updateCachedData(() => ({
              ...error,
            }));
          });

          await cacheEntryRemoved;

          socket.off(EventEnum.ERROR);
        } catch {
          throw new Error("Server error");
        }
      },
      keepUnusedDataFor: 1,
    }),

    socketDisconnect: builder.mutation<void, void>({
      queryFn: async () => {
        const socket = await getSocket();
        return new Promise((resolve, reject) => {
          socket.emit("disconnect", undefined, () => {
            resolve({ data: undefined });
            reject(new Error(`Cannot disconnect`));
          });
        });
      },
    }),
  }),
});

export const {
  useGetRoomsQuery,
  useMessagesQuery,
  useSendMessageMutation,
  useJoinRoomMutation,
  useLeaveRoomMutation,
  useGetMessagesMutation,
  useRoomQuery,
  useGetNotificationsCountQuery,
  useGetNotificationsQuery,
  useReadNotificationsMutation,
  useGetMessagesNotificationsQuery,
  useGetWebsocketErrorQuery,
  useSocketDisconnectMutation,
} = notificationsAPI;

export { getSocket };

export default notificationsAPI;
