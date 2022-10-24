import { useTranslation } from "react-i18next";
import {
  useGetMessagesNotificationsQuery,
  useGetRoomsQuery,
} from "services/notifications/setNotificationsAPI";
import { IUser, useGetOwnUserQuery } from "services/user/setUserAPI";
import { IChatUser, IRoom } from "services/notifications/chatTypes";
import { MessageTypeEnum } from "services/notifications/chatEnums";

const useChatData = () => {
  const { t } = useTranslation();

  const { data: roomsList } = useGetRoomsQuery();

  const { data: user } = useGetOwnUserQuery();

  const { data: notificationsResponse } = useGetMessagesNotificationsQuery();

  const getRoomNotifications = (roomId: number): number[] | undefined => {
    if (notificationsResponse && notificationsResponse.notifications) {
      return notificationsResponse.notifications
        .filter((notification) => notification.roomId === roomId)
        .map((notification) => notification.id);
    }
    return undefined;
  };

  const defineOpponentsNameAndAvatar = (
    freelancer: IChatUser,
    client: IChatUser,
    currentUser: IUser
  ): { name: string; avatar: string } => {
    if (+currentUser.id! !== freelancer.id) {
      return {
        name: `${freelancer.firstName || "User"} ${
          freelancer.lastName || "Freelancer"
        }`,
        avatar: `${freelancer.avatarURL || ""}`,
      };
    }
    return {
      name: `${client.firstName || "User"} ${client.lastName || "Client"}`,
      avatar: `${client.avatarURL || ""}`,
    };
  };

  const defineLastMessage = (room: IRoom): string => {
    if (room.lastMessage.messageType === MessageTypeEnum.FROM_USER) {
      return room.lastMessage.text;
    }
    return t("Chat.systemMessage");
  };

  return {
    t,
    roomsList,
    user,
    getRoomNotifications,
    defineOpponentsNameAndAvatar,
    defineLastMessage,
  };
};
export default useChatData;
