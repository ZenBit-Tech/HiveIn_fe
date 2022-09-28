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
  useGetMessagesMutation,
  useMessagesQuery,
  useSendMessageMutation,
} from "services/notifications/setNotificationsAPI";
import { formatToStandardDate } from "utils/functions/formatDateFunctions";
import { useTranslation } from "react-i18next";
import useChatScroll from "hooks/useChatScroll";

interface IChatRoom {
  roomId: number;
  userSelfId: number;
  jobName: string;
}

function ChatRoom({ roomId, userSelfId, jobName }: IChatRoom) {
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

  return (
    <div>
      <Header>{jobName}</Header>
      <MessageBlock ref={ref}>
        {messages?.length ? (
          messages.map((message) => {
            return (
              <Message
                key={message.id}
                isMine={message.senderId === userSelfId}
              >
                <div>
                  <div>
                    {formatToStandardDate(new Date(message.created_at), "PPpp")}
                  </div>
                  <div>{message.senderId}</div>
                </div>
                <Element>{message.text}</Element>
              </Message>
            );
          })
        ) : (
          <Message isMine={false}>
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
