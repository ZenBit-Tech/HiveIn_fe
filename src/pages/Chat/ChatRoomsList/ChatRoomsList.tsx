import {
  IChatUser,
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
  isSelected: boolean;
  freelancer: IChatUser;
  client: IChatUser;
  setRoomUsers: (freelancer: IChatUser, client: IChatUser) => void;
}

function ChatRoomsList({
  jobName,
  id,
  onClick,
  lastMessage,
  opponentsNameAndAvatar,
  isSelected,
  freelancer,
  client,
  setRoomUsers,
}: IChatUsersList) {
  const [leaveRoom] = useLeaveRoomMutation();
  const [joinRoom] = useJoinRoomMutation();

  const onClickHandler = async () => {
    leaveRoom();
    onClick(id, jobName);
    setRoomUsers(freelancer, client);
    joinRoom(id);
  };

  return (
    <ChatElement isSelected={isSelected} onClick={onClickHandler}>
      <Avatar
        sx={{ width: 60, height: 60 }}
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
