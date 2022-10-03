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
import { IChatUser } from "services/notifications/chatTypes";
import { ChatRoomStatusEnum } from "services/notifications/chatEnums";

interface IChatUsersList {
  jobName: string;
  id: number;
  onClick: (
    id: number,
    jobName: string,
    roomStatus: ChatRoomStatusEnum
  ) => void;
  lastMessage: string;
  opponentsNameAndAvatar: { name: string; avatar: string };
  isSelected: boolean;
  freelancer: IChatUser;
  client: IChatUser;
  setRoomUsers: (freelancer: IChatUser, client: IChatUser) => void;
  roomStatus: ChatRoomStatusEnum;
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
  roomStatus,
}: IChatUsersList) {
  const [leaveRoom] = useLeaveRoomMutation();
  const [joinRoom] = useJoinRoomMutation();

  const onClickHandler = async () => {
    leaveRoom();
    onClick(id, jobName, roomStatus);
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
