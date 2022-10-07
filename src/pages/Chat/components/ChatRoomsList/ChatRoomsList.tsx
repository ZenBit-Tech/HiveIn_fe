import {
  Block,
  LastMessage,
  ChatElement,
} from "pages/Chat/components/ChatRoomsList/ChatRoomsList.styles";
import { Avatar } from "@mui/material";

interface IChatUsersList {
  jobName: string;
  lastMessage: string;
  opponentsNameAndAvatar: { name: string; avatar: string };
  isSelected: boolean;
}

function ChatRoomsList({
  jobName,
  lastMessage,
  opponentsNameAndAvatar,
  isSelected,
}: IChatUsersList) {
  return (
    <ChatElement isSelected={isSelected}>
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
