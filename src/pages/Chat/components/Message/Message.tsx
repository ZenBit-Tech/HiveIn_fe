import React from "react";
import { MessageTypeEnum } from "services/notifications/chatEnums";
import { formatToStandardDate } from "utils/functions/formatDateFunctions";
import { CHAT_DATE_FORMAT } from "utils/consts/inputPropsConsts";
import {
  ButtonBlock,
  Container,
  Text,
} from "pages/Chat/components/Message/Message.styles";
import { useTranslation } from "react-i18next";
import { Button } from "antd";
import { OfferStatus } from "utils/enums";

interface IMessage {
  messageType: MessageTypeEnum;
  senderId: number;
  userSelfId: number;
  created_at: string;
  text: string;
  defineName: (userID: number) => string;
  onAccept: () => void;
  onReject: () => void;
  offerStatus?: OfferStatus;
}

function Message({
  messageType,
  senderId,
  userSelfId,
  text,
  created_at,
  defineName,
  onAccept,
  onReject,
  offerStatus,
}: IMessage) {
  const { t } = useTranslation();

  const defineMessageTitle = (): string => {
    if (messageType === MessageTypeEnum.FROM_SYSTEM) {
      return t("Chat.systemMessage");
    }
    if (messageType === MessageTypeEnum.FROM_SYSTEM_OFFER) {
      return "Offer";
    }
    return defineName(senderId);
  };

  const isSystemOffer = messageType === MessageTypeEnum.FROM_SYSTEM_OFFER;
  const isOfferStatusPending = offerStatus === OfferStatus.PENDING;

  return (
    <Container
      isSystemMessage={
        messageType === MessageTypeEnum.FROM_SYSTEM ||
        messageType === MessageTypeEnum.FROM_SYSTEM_OFFER
      }
      isMine={senderId === userSelfId}
    >
      <div>
        <div>{defineMessageTitle()}</div>
        <div>
          {formatToStandardDate(new Date(created_at), CHAT_DATE_FORMAT)}
        </div>
      </div>
      <Text>{text}</Text>
      {isSystemOffer && isOfferStatusPending && (
        <ButtonBlock>
          <Button onClick={onAccept}>{t("Offer.acceptOffer")}</Button>
          <Button onClick={onReject} danger>
            {t("Offer.rejectOffer")}
          </Button>
        </ButtonBlock>
      )}
    </Container>
  );
}

export default Message;
