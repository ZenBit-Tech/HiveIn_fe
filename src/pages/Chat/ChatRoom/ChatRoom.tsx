import { Button, Input } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { ChangeEvent, useEffect, useState } from "react";
import {
  Element,
  Header,
  InputBlock,
  Message,
  MessageBlock,
  Warning,
  Notification,
} from "pages/Chat/ChatRoom/ChatRoom.styles";
import {
  useGetMessagesMutation,
  useJoinRoomMutation,
  useLeaveRoomMutation,
  useMessagesQuery,
  useRoomQuery,
  useSendMessageMutation,
} from "services/notifications/setNotificationsAPI";
import { formatToStandardDate } from "utils/functions/formatDateFunctions";
import { useTranslation } from "react-i18next";
import { CHAT_DATE_FORMAT } from "utils/consts/inputPropsConsts";
import useChatScroll from "hooks/useChatScroll";
import {
  ChatRoomStatusEnum,
  MessageTypeEnum,
} from "services/notifications/chatEnums";
import { useParams } from "react-router-dom";

interface IChatRoom {
  userSelfId: number;
  userRole: string;
}

function ChatRoom({ userSelfId, userRole }: IChatRoom) {
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
  const ref = useChatScroll(messages);

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
      userRole === "client" &&
      room?.status === ChatRoomStatusEnum.CLIENT_ONLY
    ) {
      return false;
    }
    if (
      userRole === "freelancer" &&
      room?.status === ChatRoomStatusEnum.FREELANCER_ONLY
    ) {
      return false;
    }
    return room?.status !== ChatRoomStatusEnum.FOR_ALL;
  };

  return (
    <div>
      {roomId && +roomId ? (
        <div>
          <Header>
            {room?.jobPost?.title}
            {room?.status}
          </Header>
          <MessageBlock ref={ref}>
            {messages?.length ? (
              messages.map((message) => {
                return (
                  <Message
                    isSystemMessage={
                      message.messageType === MessageTypeEnum.FROM_SYSTEM
                    }
                    key={message.id}
                    isMine={message.senderId === userSelfId}
                  >
                    <div>
                      {message.messageType === MessageTypeEnum.FROM_SYSTEM ? (
                        <div>{t("Chat.systemMessage")}</div>
                      ) : (
                        <div>{defineName(message.senderId)}</div>
                      )}
                      <div>
                        {formatToStandardDate(
                          new Date(message.created_at),
                          CHAT_DATE_FORMAT
                        )}
                      </div>
                    </div>
                    <Element>{message.text}</Element>
                  </Message>
                );
              })
            ) : (
              <Message isMine={false} isSystemMessage>
                <div>{t("Chat.chooseAnotherRoom")}</div>
              </Message>
            )}
          </MessageBlock>
          <InputBlock>
            <Input
              disabled={disableInput()}
              value={text}
              onChange={onChangeHandler}
              onKeyUp={(event) => event.key === "Enter" && onSendHandler()}
            />
            <Button onClick={onSendHandler} icon={<SendOutlined />} />
          </InputBlock>
          {disableInput() && <Warning>{t("Chat.disabledMessaging")}</Warning>}
        </div>
      ) : (
        <Notification>{t("Chat.chooseTheChat")}</Notification>
      )}
    </div>
  );
}
export default ChatRoom;
