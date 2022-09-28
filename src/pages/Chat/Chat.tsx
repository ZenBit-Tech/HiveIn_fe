import { useState } from "react";
import {
  IChatUser,
  useGetRoomsQuery,
} from "services/notifications/setNotificationsAPI";
import { IUser, useGetOwnUserQuery } from "services/user/setUserAPI";
import { Block, Container, Notification } from "pages/Chat/Chat.styles";
import { useTranslation } from "react-i18next";
import ChatRoomsList from "./ChatRoomsList/ChatRoomsList";
import ChatRoom from "./ChatRoom/ChatRoom";

function Chat() {
  const { t } = useTranslation();

  const { data: roomsList } = useGetRoomsQuery();

  const { data: user } = useGetOwnUserQuery();

  const [roomId, setRoomId] = useState<number | null>(null);
  const [jobNameForHeader, setJobNameForHeader] = useState<string>("");

  const onClickHandler = (id: number, jobName: string) => {
    setRoomId(id);
    setJobNameForHeader(jobName);
  };

  const defineOpponentsNameAndAvatar = (
    freelancer: IChatUser,
    client: IChatUser,
    currentUser: IUser
  ): { name: string; avatar: string } => {
    if (+currentUser.id!! !== freelancer.id) {
      return {
        name: `${freelancer.firstName || ""} ${freelancer.lastName || ""}`,
        avatar: `${freelancer.avatarURL || ""}`,
      };
    }
    return {
      name: `${client.firstName || ""} ${client.lastName || ""}`,
      avatar: `${client.avatarURL || ""}`,
    };
  };

  return (
    <div>
      {user && roomsList?.length ? (
        <Container>
          <Block>
            {roomsList.map((room) => (
              <ChatRoomsList
                opponentsNameAndAvatar={defineOpponentsNameAndAvatar(
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
            <ChatRoom
              userSelfId={+user.id!!}
              roomId={roomId}
              jobName={jobNameForHeader}
            />
          ) : (
            <Notification>{t("Chat.chooseTheChat")}</Notification>
          )}
        </Container>
      ) : (
        <Notification>{t("Chat.noChats")}</Notification>
      )}
    </div>
  );
}

export default Chat;
