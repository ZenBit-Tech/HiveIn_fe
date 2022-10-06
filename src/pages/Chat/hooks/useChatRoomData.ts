import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  useGetMessagesMutation,
  useJoinRoomMutation,
  useLeaveRoomMutation,
  useMessagesQuery,
  useRoomQuery,
  useSendMessageMutation,
} from "services/notifications/setNotificationsAPI";
import { ChangeEvent, useEffect, useState } from "react";
import { UserRoleEnum } from "utils/enums";
import { ChatRoomStatusEnum } from "services/notifications/chatEnums";

function useChatRoomData(userRole: UserRoleEnum) {
  const { roomId } = useParams();

  const { t } = useTranslation();

  const { data: messages } = useMessagesQuery();

  const { data: room } = useRoomQuery();

  const [sendMessage] = useSendMessageMutation();

  const [getMessages] = useGetMessagesMutation();

  const [joinRoom] = useJoinRoomMutation();

  const [leaveRoom] = useLeaveRoomMutation();

  const [text, setText] = useState<string>("");

  useEffect(() => {
    if (roomId && +roomId) {
      joinRoom(+roomId);

      getMessages(+roomId);

      return () => {
        leaveRoom();
      };
    }
    return () => {
      leaveRoom();
    };
  }, [roomId]);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.currentTarget.value);
  };

  const onSendHandler = () => {
    if (text.trim() && roomId && +roomId) {
      sendMessage({ chatRoomId: +roomId, text });
    }
    setText("");
  };

  const defineName = (userID: number): string => {
    if (room && room.client && room.freelancer) {
      return userID === room.client.id
        ? `${room.client.firstName || "User"} ${
            room.client.lastName || "Client"
          }`
        : `${room.freelancer.firstName || "User"} ${
            room.freelancer.lastName || "Freelancer"
          }`;
    }
    return "User";
  };

  const disableInput = (): boolean => {
    if (
      userRole === UserRoleEnum.CLIENT &&
      room?.status === ChatRoomStatusEnum.CLIENT_ONLY
    ) {
      return false;
    }
    if (
      userRole === UserRoleEnum.FREELANCER &&
      room?.status === ChatRoomStatusEnum.FREELANCER_ONLY
    ) {
      return false;
    }
    return room?.status !== ChatRoomStatusEnum.FOR_ALL;
  };

  return {
    disableInput,
    defineName,
    room,
    roomId,
    t,
    messages,
    onSendHandler,
    onChangeHandler,
    text,
  };
}
export default useChatRoomData;
