import styled from "styled-components";
import { Button, Input } from "antd";
import { LIGHT_BLUE, LIGHT_GRAY } from "utils/consts/colorConsts";
import { SendOutlined } from "@ant-design/icons";
import { ChangeEvent, useEffect, useState } from "react";
import {
  EventEnum,
  getSocket,
  useGetMessagesQuery,
  useSendMessageMutation,
} from "services/notifications/setNotificationsAPI";
import { formatToStandardDate } from "../../../utils/functions/formatDateFunctions";
import useChatScroll from "../../../hooks/useChatScroll";

const ChatRoomContainer = styled.div``;

const Message = styled.div<{ isMine: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin: 3px;
  align-self: ${(props) => (props.isMine ? "flex-start" : "flex-end")};
  border-radius: 5px;
  background-color: ${(props) => (props.isMine ? LIGHT_BLUE : LIGHT_GRAY)};
`;

const MessageBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  padding: 10px;
  max-height: 500px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const InputBlock = styled.div`
  display: flex;
  padding: 5px;
  margin: 3px;
`;

const Element = styled.div`
  margin-top: 10px;
`;
const Header = styled.div`
  background-color: ${LIGHT_BLUE};
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 2px;
  font-size: 18px;
  text-align: center;
`;

interface IChatRoom {
  roomId: number;
  userSelfId: number;
  jobName: string;
}

function ChatRoom({ roomId, userSelfId, jobName }: IChatRoom) {
  const { data: messages } = useGetMessagesQuery(roomId);
  const [sendMessage] = useSendMessageMutation();
  const [text, setText] = useState<string>("");

  const socket = getSocket();
  useEffect(() => {
    socket.emit(EventEnum.GET_MESSAGES, roomId);
  }, [roomId]);
  const ref = useChatScroll(messages);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.currentTarget.value);
  };

  const onSendHandler = () => {
    sendMessage({ chatRoomId: roomId, text });
    setText("");
  };

  return (
    <ChatRoomContainer>
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
            <div>You have no messages</div>
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
    </ChatRoomContainer>
  );
}
export default ChatRoom;
