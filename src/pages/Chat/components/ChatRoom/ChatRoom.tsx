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

  const isClient = userRole === UserRoleEnum.CLIENT;

  const isOfferBeenSent = !!room?.offerStatus;

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
            {isClient && (
              <StyledButton
                disabled={isOfferBeenSent}
                type="dashed"
                shape="round"
                onClick={toggleModal}
              >
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
