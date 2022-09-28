import styled from "styled-components";
import { DARK_BLUE } from "utils/consts/colorConsts";
import {
  EventEnum,
  getSocket,
} from "../../../services/notifications/setNotificationsAPI";

const imageLink =
  "https://www.interlinecenter.com/wp-content/uploads/2016/10/dummy-user-img.png";

const ChatElement = styled.div`
  width: 300px;
  display: flex;
  gap: 10px;
  &:hover {
    border: 1px solid ${DARK_BLUE};
    border-radius: 10px;
  }
  padding: 5px;
  cursor: pointer;
  max-height: 120px;
`;
const Block = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 5px;
`;
const LastMessage = styled.p`
  display: inline-block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 150px;
`;

interface IChatUsersList {
  jobName: string;
  id: number;
  onClick: (id: number, jobName: string) => void;
  lastMessage: string;
  opponentsName: string;
}

function ChatList({
  jobName,
  id,
  onClick,
  lastMessage,
  opponentsName,
}: IChatUsersList) {
  const socket = getSocket();
  const onClickHandler = async () => {
    await socket.emit(EventEnum.LEAVE_ROOM);
    onClick(id, jobName);
    socket.emit(EventEnum.JOIN_ROOM, id);
  };

  return (
    <ChatElement onClick={onClickHandler}>
      <img style={{ maxWidth: "100px" }} src={imageLink} alt={imageLink} />
      <Block>
        <div>
          <div>{opponentsName}</div>
          <div>{jobName}</div>
        </div>
        <LastMessage>{lastMessage}</LastMessage>
      </Block>
    </ChatElement>
  );
}
export default ChatList;
