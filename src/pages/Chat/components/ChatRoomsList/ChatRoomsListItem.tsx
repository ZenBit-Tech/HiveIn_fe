import {
  Block,
  LastMessage,
  ChatElement,
} from "pages/Chat/components/ChatRoomsList/ChatRoomsList.styles";
import { Badge, Avatar } from "antd";
import { useEffect } from "react";
import { useReadNotificationsMutation } from "services/notifications/setNotificationsAPI";

interface IChatUsersList {
  lastMessage: string;
  opponentsNameAndAvatar: { name: string; avatar: string };
  isSelected: boolean;
  roomNotifications?: number[];
}

function ChatRoomsListItem({
  lastMessage,
  opponentsNameAndAvatar,
  isSelected,
  roomNotifications,
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
        <div>{opponentsNameAndAvatar.name}</div>
        <LastMessage>{lastMessage}</LastMessage>
      </Block>
    </ChatElement>
  );
}
export default ChatRoomsListItem;
