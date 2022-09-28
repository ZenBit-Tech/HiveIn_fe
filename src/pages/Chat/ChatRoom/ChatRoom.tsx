import { Button, Input } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { ChangeEvent, useEffect, useState } from "react";
import {
  Header,
  Message,
  MessageBlock,
  InputBlock,
  Element,
} from "pages/Chat/ChatRoom/ChatRoom.styles";
import {
  MessageTypeEnum,
  useGetMessagesMutation,
  useMessagesQuery,
  useSendMessageMutation,
} from "services/notifications/setNotificationsAPI";
import { formatToStandardDate } from "utils/functions/formatDateFunctions";
import { useTranslation } from "react-i18next";
import { CHAT_DATE_FORMAT } from "utils/consts/inputPropsConsts";
import { IRoomUsers } from "pages/Chat/Chat";
import useChatScroll from "hooks/useChatScroll";

interface IChatRoom {
  roomId: number;
  userSelfId: number;
  jobName: string;
  roomUsers?: IRoomUsers;
}

function ChatRoom({ roomId, userSelfId, jobName, roomUsers }: IChatRoom) {
  const { t } = useTranslation();

  const { data: messages } = useMessagesQuery();

  const [sendMessage] = useSendMessageMutation();

  const [getMessages] = useGetMessagesMutation();

  const [text, setText] = useState<string>("");

  useEffect(() => {
    getMessages(roomId);
  }, [roomId]);
  const ref = useChatScroll(messages);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.currentTarget.value);
  };

  const onSendHandler = () => {
    if (text.trim()) {
      sendMessage({ chatRoomId: roomId, text });
    }
    setText("");
  };

  const defineName = (userID: number): string => {
    if (roomUsers) {
      return userID === roomUsers.client.id
        ? `${roomUsers.client.firstName || "User"} ${
            roomUsers.client.lastName || "Client"
          }`
        : `${roomUsers.freelancer.firstName || "User"} ${
            roomUsers.freelancer.lastName || "Freelancer"
          }`;
    }
    return "User";
  };

  return (
    <div>
      <Header>{jobName}</Header>
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
          <Message isMine isSystemMessage>
            <div>{t("Chat.noMessages")}</div>
          </Message>
        )}
      </MessageBlock>
      <InputBlock>
        <Input
          value={text}
          onChange={onChangeHandler}
          onKeyUp={(event) => event.key === "Enter" && onSendHandler()}
        />
        <Button onClick={onSendHandler} icon={<SendOutlined />} />
      </InputBlock>
    </div>
  );
}
export default ChatRoom;
