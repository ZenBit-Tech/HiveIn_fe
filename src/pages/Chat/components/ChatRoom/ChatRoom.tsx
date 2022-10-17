import { Button, Input } from "antd";
import { SendOutlined } from "@ant-design/icons";
import {
  Element,
  Header,
  InputBlock,
  Message,
  MessageBlock,
  Notification,
  Title,
  Warning,
} from "pages/Chat/components/ChatRoom/ChatRoom.styles";
import { formatToStandardDate } from "utils/functions/formatDateFunctions";
import { CHAT_DATE_FORMAT } from "utils/consts/inputPropsConsts";
import useChatScroll from "hooks/useChatScroll";
import { MessageTypeEnum } from "services/notifications/chatEnums";
import { UserRoleEnum } from "utils/enums";
import useChatRoomData from "pages/Chat/hooks/useChatRoomData";
import { useProlongChatMutation } from "services/chatRoom/chatRoomApi";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface IChatRoom {
  userSelfId: number;
  userRole: UserRoleEnum;
}

function ChatRoom({ userSelfId, userRole }: IChatRoom) {
  const {
    roomId,
    room,
    disableInput,
    t,
    messages,
    defineName,
    onSendHandler,
    onChangeHandler,
    text,
  } = useChatRoomData(userRole);

  const [prolongChat, { isSuccess, data }] = useProlongChatMutation();

  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const prolongToken = params.get("prolong");

  useEffect(() => {
    if (prolongToken) {
      prolongChat({ token: prolongToken, chatId: +roomId! });
      navigate(location.pathname);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data?.affected && isSuccess) toast.success(t("Chat.prolong"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, data]);

  const ref = useChatScroll(messages);

  return (
    <div>
      {roomId && +roomId ? (
        <div>
          <Header>
            <Title fontSize="16px">{t("Chat.jobTitle")}</Title>
            <Title italic bold>
              {room?.jobPost?.title}
            </Title>
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
              <Message isMine isSystemMessage>
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
