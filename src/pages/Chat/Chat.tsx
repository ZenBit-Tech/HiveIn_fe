import { useState } from "react";
import { useGetRoomsQuery } from "services/notifications/setNotificationsAPI";
import { IUser, useGetOwnUserQuery } from "services/user/setUserAPI";
import { Block, Container, Notification } from "pages/Chat/Chat.styles";
import { useTranslation } from "react-i18next";
import { IChatUser } from "services/notifications/chatTypes";
import ChatRoomsList from "pages/Chat/ChatRoomsList/ChatRoomsList";
import ChatRoom from "pages/Chat/ChatRoom/ChatRoom";
import { ChatRoomStatusEnum } from "services/notifications/chatEnums";

export interface IRoomUsers {
  freelancer: IChatUser;
  client: IChatUser;
}

function Chat() {
  const { t } = useTranslation();

  const { data: roomsList } = useGetRoomsQuery();

  const { data: user } = useGetOwnUserQuery();

  const [roomId, setRoomId] = useState<number | null>(null);
  const [jobNameForHeader, setJobNameForHeader] = useState<string>("");
  const [roomUsers, setRoomUsers] = useState<IRoomUsers>();
  const [roomStatus, setRoomStatus] = useState<ChatRoomStatusEnum>(
    ChatRoomStatusEnum.FOR_ALL
  );

  const onClickHandler = (
    id: number,
    jobName: string,
    status: ChatRoomStatusEnum
  ) => {
    setRoomId(id);
    setJobNameForHeader(jobName);
    setRoomStatus(status);
  };

  const defineOpponentsNameAndAvatar = (
    freelancer: IChatUser,
    client: IChatUser,
    currentUser: IUser
  ): { name: string; avatar: string } => {
    if (+currentUser.id! !== freelancer.id) {
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
  const setRoomUsersHandler = (freelancer: IChatUser, client: IChatUser) => {
    setRoomUsers({ freelancer, client });
  };

  return (
    <div>
      {user && roomsList?.length ? (
        <Container>
          <Block>
            {roomsList.map((room) => (
              <ChatRoomsList
                setRoomUsers={setRoomUsersHandler}
                freelancer={room.freelancer}
                client={room.client}
                isSelected={room.id === roomId}
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
                roomStatus={room.status}
              />
            ))}
          </Block>
          {roomId ? (
            <ChatRoom
              userRole={user.role!}
              roomStatus={roomStatus}
              roomUsers={roomUsers}
              userSelfId={+user.id!}
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
