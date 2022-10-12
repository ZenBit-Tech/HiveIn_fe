import { useTranslation } from "react-i18next";
import {
  useGetMessagesNotificationsQuery,
  useGetRoomsQuery,
} from "services/notifications/setNotificationsAPI";
import { IUser, useGetOwnUserQuery } from "services/user/setUserAPI";
import { IChatUser } from "services/notifications/chatTypes";

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
        name: `${freelancer.firstName || ""} ${freelancer.lastName || ""}`,
        avatar: `${freelancer.avatarURL || ""}`,
      };
    }
    return {
      name: `${client.firstName || ""} ${client.lastName || ""}`,
      avatar: `${client.avatarURL || ""}`,
    };
  };

  return {
    t,
    roomsList,
    user,
    getRoomNotifications,
    defineOpponentsNameAndAvatar,
  };
};
export default useChatData;
