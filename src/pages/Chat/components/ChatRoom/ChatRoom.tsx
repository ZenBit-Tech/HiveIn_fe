import { Button, Input, Modal } from "antd";
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
import useModalHandler from "../../../../hooks/use-modal-handler";

interface IChatRoom {
  userSelfId: number;
  userRole: UserRoleEnum;
}

function ChatRoom({ userSelfId, userRole }: IChatRoom) {
  const {
    roomId,
    room,
    isDisabled,
    t,
    messages,
    defineName,
    onSendHandler,
    onChangeHandler,
    text,
  } = useChatRoomData(userRole);

  const { modal, toggleModal } = useModalHandler();

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
            {userRole === UserRoleEnum.CLIENT && (
              <Button type="dashed" onClick={toggleModal}>
                +
              </Button>
            )}
            <Input
              disabled={isDisabled}
              value={text}
              onChange={onChangeHandler}
              onKeyUp={(event) => event.key === "Enter" && onSendHandler()}
            />
            <Button onClick={onSendHandler} icon={<SendOutlined />} />
          </InputBlock>
          {isDisabled && <Warning>{t("Chat.disabledMessaging")}</Warning>}
        </div>
      ) : (
        <Notification>{t("Chat.chooseTheChat")}</Notification>
      )}
      <Modal visible={modal} onCancel={toggleModal}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: "24px" }}>Send offer</div>
          <div style={{ fontSize: "18px" }}>
            Do you want to send the offer to this user?
          </div>
        </div>
      </Modal>
    </div>
  );
}
export default ChatRoom;
