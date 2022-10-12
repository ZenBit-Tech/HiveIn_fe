/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button, Typography } from "antd";
import React from "react";
import NotificationBox from "pages/Notification/style";
import {
  useGetNotificationsQuery,
  useReadNotificationsMutation,
} from "services/notifications/setNotificationsAPI";
import { formatToStandardDate } from "utils/functions/formatDateFunctions";
import { useNavigate } from "react-router-dom";
import { CHAT_ROUTE } from "utils/consts/routeConsts";

export default function Notifications() {
  const { data } = useGetNotificationsQuery();
  const [markNotificationsAsRead] = useReadNotificationsMutation();

  const navigate = useNavigate();

  const onClickHandler = (roomId: number, notificationId: number) => {
    markNotificationsAsRead([notificationId]);
    navigate(`${CHAT_ROUTE}/${roomId}`);
  };

  return (
    <>
      <h1>Notifications</h1>
      {data?.notifications?.length ? (
        data.notifications?.map((item) => (
          <NotificationBox isRead={item.isRead} key={item.id}>
            <Typography>Notification type: {item.type}</Typography>
            <Typography>Text: {item.text}</Typography>
            <Typography>
              Date: {formatToStandardDate(new Date(item.createdAt))}
            </Typography>
            <Button
              type="primary"
              shape="round"
              onClick={() => onClickHandler(item.roomId, item.id)}
            >
              Go to chat
            </Button>
          </NotificationBox>
        ))
      ) : (
        <div>Nothing</div>
      )}
    </>
  );
}
