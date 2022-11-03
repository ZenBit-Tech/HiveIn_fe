import {
  Block,
  Text,
  ChatElement,
} from "pages/Chat/components/ChatRoomsList/ChatRoomsList.styles";
import { Badge, Avatar } from "antd";
import { useEffect } from "react";
import { useReadNotificationsMutation } from "services/notifications/setNotificationsAPI";
import { formatToStandardDate } from "utils/functions/formatDateFunctions";
import { CHAT_DATE_FORMAT } from "utils/consts/inputPropsConsts";

interface IChatUsersList {
  lastMessage: string;
  lastMessageDate: Date;
  opponentsNameAndAvatar: { name: string; avatar: string };
  isSelected: boolean;
  roomNotifications?: number[];
}

function ChatRoomsListItem({
  lastMessage,
  opponentsNameAndAvatar,
  isSelected,
  roomNotifications,
  lastMessageDate,
}: IChatUsersList) {
  const [readNotifications] = useReadNotificationsMutation();

  useEffect(() => {
    if (isSelected && roomNotifications?.length) {
      readNotifications(roomNotifications);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSelected, roomNotifications]);

  return (
    <ChatElement isSelected={isSelected}>
      <Badge size="small" count={roomNotifications?.length}>
        <Avatar
          style={{ width: 60, height: 60 }}
          src={opponentsNameAndAvatar.avatar}
          alt={opponentsNameAndAvatar.name}
        />
      </Badge>
      <Block>
        <Text fontSize="16px">{opponentsNameAndAvatar.name}</Text>
        <Text fontSize="12px">
          {formatToStandardDate(new Date(lastMessageDate), CHAT_DATE_FORMAT)}
        </Text>
        <Text bold italic fontSize="16px">
          {lastMessage}
        </Text>
      </Block>
    </ChatElement>
  );
}
export default ChatRoomsListItem;
