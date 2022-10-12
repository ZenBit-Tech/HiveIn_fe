import { Button, Input } from "antd";
import { SendOutlined } from "@ant-design/icons";
import {
  Element,
  Header,
  InputBlock,
  Message,
  MessageBlock,
  Notification,
  Warning,
} from "pages/Chat/components/ChatRoom/ChatRoom.styles";
import { formatToStandardDate } from "utils/functions/formatDateFunctions";
import { CHAT_DATE_FORMAT } from "utils/consts/inputPropsConsts";
import useChatScroll from "hooks/useChatScroll";
import { MessageTypeEnum } from "services/notifications/chatEnums";
import { UserRoleEnum } from "utils/enums";
import useChatRoomData from "pages/Chat/hooks/useChatRoomData";

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

  const ref = useChatScroll(messages);

  return (
    <div>
      {roomId && +roomId ? (
        <div>
          <Header>{room?.jobPost?.title}</Header>
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
