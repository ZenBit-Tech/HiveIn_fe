import {
  useJoinRoomMutation,
  useLeaveRoomMutation,
} from "services/notifications/setNotificationsAPI";
import {
  Block,
  LastMessage,
  ChatElement,
} from "pages/Chat/ChatRoomsList/ChatRoomsList.styles";
import { Avatar } from "@mui/material";

interface IChatUsersList {
  jobName: string;
  id: number;
  onClick: (id: number, jobName: string) => void;
  lastMessage: string;
  opponentsNameAndAvatar: { name: string; avatar: string };
}

function ChatRoomsList({
  jobName,
  id,
  onClick,
  lastMessage,
  opponentsNameAndAvatar,
}: IChatUsersList) {
  const [leaveRoom] = useLeaveRoomMutation();
  const [joinRoom] = useJoinRoomMutation();

  const onClickHandler = async () => {
    leaveRoom();
    onClick(id, jobName);
    joinRoom(id);
  };

  return (
    <ChatElement onClick={onClickHandler}>
      <Avatar
        sx={{ width: 100, height: 100 }}
        src={opponentsNameAndAvatar.avatar}
        alt={opponentsNameAndAvatar.name}
      />
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
export default ChatRoomsList;
