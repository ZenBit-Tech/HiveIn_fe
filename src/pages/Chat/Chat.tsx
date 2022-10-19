/* eslint-disable react/no-children-prop */
import { Block, Container, Notification } from "pages/Chat/Chat.styles";
import ChatRoomsListItem from "pages/Chat/components/ChatRoomsList/ChatRoomsListItem";
import { NavLink, Route, Routes } from "react-router-dom";
import ChatRoom from "pages/Chat/components/ChatRoom/ChatRoom";
import { CHAT_ROOM_ROUTE } from "utils/consts/routeConsts";
import useChatData from "pages/Chat/hooks/useChatData";

function Chat() {
  const {
    t,
    user,
    roomsList,
    getRoomNotifications,
    defineOpponentsNameAndAvatar,
  } = useChatData();

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
                  <ChatRoomsListItem
                    roomNotifications={getRoomNotifications(room.id)}
                    isSelected={isActive}
                    opponentsNameAndAvatar={defineOpponentsNameAndAvatar(
                      room.freelancer,
                      room.client,
                      user
                    )}
                    lastMessage={room.lastMessage.text}
                    lastMessageDate={room.lastMessage.created_at}
                    key={room.id}
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
            <Route
              path=""
              element={<Notification>{t("Chat.chooseTheChat")}</Notification>}
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
