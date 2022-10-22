import { Button, Input } from "antd";
import { SendOutlined } from "@ant-design/icons";
import {
  Header,
  InputBlock,
  MessageBlock,
  Notification,
  StyledButton,
  Title,
  Warning,
} from "pages/Chat/components/ChatRoom/ChatRoom.styles";
import useChatScroll from "hooks/useChatScroll";
import { UserRoleEnum } from "utils/enums";
import useChatRoomData from "pages/Chat/hooks/useChatRoomData";
import Message from "pages/Chat/components/Message/Message";
import SendOfferModal from "components/UI/ModalWindows/SendOfferModal/SendOfferModal";

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
    sendOfferHandler,
    toggleModal,
    modal,
  } = useChatRoomData(userRole);

  const ref = useChatScroll(messages);

  return (
    <div>
      {roomId && +roomId ? (
        <div>
          <Header>
            <div>
              <Title fontSize="16px">{t("Chat.jobTitle")}</Title>
              <Title italic bold>
                {room?.jobPost?.title}
              </Title>
            </div>
            {userRole === UserRoleEnum.CLIENT && (
              <StyledButton type="default" shape="round" onClick={toggleModal}>
                {t("Chat.sendOffer")}
              </StyledButton>
            )}
          </Header>
          <MessageBlock ref={ref}>
            {messages?.length ? (
              messages.map((message) => {
                return (
                  <Message
                    messageType={message.messageType}
                    text={message.text}
                    defineName={defineName}
                    key={message.id}
                    created_at={message.created_at}
                    senderId={message.senderId}
                    userSelfId={userSelfId}
                  />
                );
              })
            ) : (
              <Notification>
                <div>{t("Chat.chooseAnotherRoom")}</div>
              </Notification>
            )}
          </MessageBlock>
          <InputBlock>
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
      <SendOfferModal
        modal={modal}
        onCancel={toggleModal}
        onOk={sendOfferHandler}
        title={t("Chat.sendOffer")}
        text={t("Chat.confirmSendOffer")}
      />
    </div>
  );
}
export default ChatRoom;
