import styled from "styled-components";
import { LIGHT_BLUE } from "utils/consts/colorConsts";
import { useState } from "react";
import {
  IChatUser,
  useGetRoomsQuery,
} from "services/notifications/setNotificationsAPI";
import { IUser, useGetOwnUserQuery } from "services/user/setUserAPI";
import ChatList from "./ChatList/ChatList";
import ChatRoom from "./ChatRoom/ChatRoom";

const Container = styled.div`
  display: flex;
`;

const Block = styled.div`
  border-radius: 10px;
  background-color: ${LIGHT_BLUE};
  margin-right: 10px;
  height: 320px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

function Chat() {
  const { data: roomsList } = useGetRoomsQuery();

  const { data: user } = useGetOwnUserQuery();

  const [roomId, setRoomId] = useState<number | null>(null);

  const onClickHandler = (id: number) => {
    setRoomId(id);
  };

  const defineOpponentsName = (
    freelancer: IChatUser,
    client: IChatUser,
    // eslint-disable-next-line @typescript-eslint/no-shadow
    user: IUser
  ): string => {
    if (+user.id!! !== freelancer.id) {
      return `${freelancer.firstName || ""} ${freelancer.lastName || ""}`;
    }
    return `${client.firstName || ""} ${client.lastName || ""}`;
  };

  return (
    <div>
      {user && roomsList?.length ? (
        <Container>
          <Block>
            {roomsList.map((room) => (
              <ChatList
                opponentsName={defineOpponentsName(
                  room.freelancer,
                  room.client,
                  user
                )}
                lastMessage={room.lastMessage.text}
                key={room.id}
                id={room.id}
                onClick={onClickHandler}
                jobName={room.jobPost.title}
              />
            ))}
          </Block>
          {roomId ? (
            <ChatRoom userSelfId={+user.id!!} roomId={roomId} />
          ) : (
            <div style={{ fontSize: "24px" }}>Please choose the chat</div>
          )}
        </Container>
      ) : (
        <div style={{ fontSize: "24px" }}>You have no chats</div>
      )}
    </div>
  );
}

export default Chat;
