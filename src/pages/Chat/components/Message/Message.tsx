import React from "react";
import { MessageTypeEnum } from "services/notifications/chatEnums";
import { formatToStandardDate } from "utils/functions/formatDateFunctions";
import { CHAT_DATE_FORMAT } from "utils/consts/inputPropsConsts";
import { Container, Text } from "pages/Chat/components/Message/Message.styles";
import { useTranslation } from "react-i18next";

interface IMessage {
  messageType: MessageTypeEnum;
  senderId: number;
  userSelfId: number;
  created_at: string;
  text: string;
  defineName: (userID: number) => string;
}

function Message({
  messageType,
  senderId,
  userSelfId,
  text,
  created_at,
  defineName,
}: IMessage) {
  const { t } = useTranslation();

  return (
    <Container
      isSystemMessage={messageType === MessageTypeEnum.FROM_SYSTEM}
      isMine={senderId === userSelfId}
    >
      <div>
        {messageType === MessageTypeEnum.FROM_SYSTEM ? (
          <div>{t("Chat.systemMessage")}</div>
        ) : (
          <div>{defineName(senderId)}</div>
        )}
        <div>
          {formatToStandardDate(new Date(created_at), CHAT_DATE_FORMAT)}
        </div>
      </div>
      <Text>{text}</Text>
    </Container>
  );
}

export default Message;
