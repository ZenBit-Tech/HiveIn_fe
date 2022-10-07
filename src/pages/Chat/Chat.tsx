/* eslint-disable react/no-children-prop */
import { useGetRoomsQuery } from "services/notifications/setNotificationsAPI";
import { IUser, useGetOwnUserQuery } from "services/user/setUserAPI";
import { Block, Container, Notification } from "pages/Chat/Chat.styles";
import { useTranslation } from "react-i18next";
import { IChatUser } from "services/notifications/chatTypes";
import ChatRoomsList from "pages/Chat/components/ChatRoomsList/ChatRoomsList";
import { NavLink, Route, Routes } from "react-router-dom";
import ChatRoom from "pages/Chat/components/ChatRoom/ChatRoom";
import { CHAT_ROOM_ROUTE } from "utils/consts/routeConsts";

export interface IRoomUsers {
  freelancer: IChatUser;
  client: IChatUser;
}

function Chat() {
  const { t } = useTranslation();

  const { data: roomsList } = useGetRoomsQuery();

  const { data: user } = useGetOwnUserQuery();

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

  return (
    <div>
      {user && roomsList?.length ? (
        <Container>
          <Block>
            {roomsList.map((room) => (
              <NavLink
                key={room.id}
                to={`${room.id}`}
                children={({ isActive }) => (
                  <ChatRoomsList
                    isSelected={isActive}
                    opponentsNameAndAvatar={defineOpponentsNameAndAvatar(
                      room.freelancer,
                      room.client,
                      user
                    )}
                    lastMessage={room.lastMessage.text}
                    key={room.id}
                    jobName={room.jobPost.title}
                  />
                )}
              />
            ))}
          </Block>
          <Routes>
            <Route
              path={CHAT_ROOM_ROUTE}
              element={
                <ChatRoom userRole={user.role!} userSelfId={+user.id!} />
              }
            />
          </Routes>
        </Container>
      ) : (
        <Notification>{t("Chat.noChats")}</Notification>
      )}
    </div>
  );
}

export default Chat;
