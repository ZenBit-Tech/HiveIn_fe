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
import { OfferStatus, UserRoleEnum } from "utils/enums";
import useChatRoomData from "pages/Chat/hooks/useChatRoomData";
import Message from "pages/Chat/components/Message/Message";
import OfferModal from "components/UI/ModalWindows/SendOfferModal/OfferModal";
import { useProlongChatMutation } from "services/chatRoom/chatRoomApi";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import {
  LIGHT_BLUE,
  TAG_CLOSED,
  TAG_PENDING,
  TAG_SUCCESS,
} from "utils/consts/colorConsts";

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
    toggleSendOfferModal,
    sendOfferModal,
    toggleAcceptOfferModal,
    toggleRejectOfferModal,
    rejectOfferModal,
    acceptOfferModal,
    acceptButtonHandler,
    rejectButtonHandler,
    onAcceptOfferHandler,
    onRejectOfferHandler,
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

  const renderSendOfferButton = (): JSX.Element => {
    if (room?.offerStatus === OfferStatus.PENDING) {
      return (
        <StyledButton
          disabled
          style={{ backgroundColor: TAG_PENDING }}
          type="default"
          shape="round"
          onClick={toggleSendOfferModal}
        >
          {t("Offer.pendingStatus")}
        </StyledButton>
      );
    }
    if (room?.offerStatus === OfferStatus.ACCEPTED) {
      return (
        <StyledButton
          disabled
          style={{ backgroundColor: TAG_SUCCESS }}
          type="default"
          shape="round"
          onClick={toggleSendOfferModal}
        >
          {t("Offer.acceptedStatus")}
        </StyledButton>
      );
    }
    if (room?.offerStatus === OfferStatus.REJECTED) {
      return (
        <StyledButton
          disabled
          style={{ backgroundColor: TAG_CLOSED }}
          type="default"
          shape="round"
          onClick={toggleSendOfferModal}
        >
          {t("Offer.rejectedStatus")}
        </StyledButton>
      );
    }
    if (room?.offerStatus === OfferStatus.EXPIRED) {
      return (
        <StyledButton
          disabled
          style={{ backgroundColor: TAG_CLOSED }}
          type="default"
          shape="round"
          onClick={toggleSendOfferModal}
        >
          {t("Offer.expiredStatus")}
        </StyledButton>
      );
    }
    return (
      <StyledButton
        style={{ backgroundColor: LIGHT_BLUE }}
        type="default"
        shape="round"
        onClick={toggleSendOfferModal}
      >
        {t("Chat.sendOffer")}
      </StyledButton>
    );
  };

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
            {isClient && renderSendOfferButton()}
          </Header>
          <MessageBlock ref={ref}>
            {messages?.length ? (
              messages.map((message) => {
                return (
                  <Message
                    onAccept={acceptButtonHandler}
                    onReject={rejectButtonHandler}
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
      <OfferModal
        modal={sendOfferModal}
        onCancel={toggleSendOfferModal}
        onOk={sendOfferHandler}
        title={t("Chat.sendOffer")}
        text={t("Chat.confirmSendOffer")}
      />
      <OfferModal
        modal={acceptOfferModal}
        onCancel={toggleAcceptOfferModal}
        onOk={onAcceptOfferHandler}
        title="Accept"
        text="Do you want to accept this offer?"
      />
      <OfferModal
        modal={rejectOfferModal}
        onCancel={toggleRejectOfferModal}
        onOk={onRejectOfferHandler}
        title="Reject"
        text="Do you want to reject this offer?"
      />
    </div>
  );
}
export default ChatRoom;
