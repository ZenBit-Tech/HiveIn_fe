import {
  Block,
  LastMessage,
  ChatElement,
} from "pages/Chat/components/ChatRoomsList/ChatRoomsList.styles";
import { Avatar } from "@mui/material";
import { Badge } from "antd";
import { useEffect } from "react";
import { useReadNotificationsMutation } from "services/notifications/setNotificationsAPI";

interface IChatUsersList {
  jobName: string;
  lastMessage: string;
  opponentsNameAndAvatar: { name: string; avatar: string };
  isSelected: boolean;
  roomNotifications: number[] | undefined;
}

function ChatRoomsListItem({
  jobName,
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
  }, [isSelected, roomNotifications]);

  return (
    <ChatElement isSelected={isSelected}>
      <Badge size="small" count={roomNotifications?.length}>
        <Avatar
          sx={{ width: 60, height: 60 }}
          src={opponentsNameAndAvatar.avatar}
          alt={opponentsNameAndAvatar.name}
        />
      </Badge>
      <Block>
        <div>
          <div>{opponentsNameAndAvatar.name}</div>
          <div>{jobName}</div>
        </div>
        <LastMessage>{lastMessage}</LastMessage>
      </Block>
    </ChatElement>
  );
}
export default ChatRoomsListItem;
