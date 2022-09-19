/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button, Typography } from "antd";
import React, { useEffect, useState } from "react";
import {
  useSendNotificationMutation,
  useGetNotificationsQuery,
  useReadNotificationMutation,
  Notifications as NotificationsType,
  getSocket,
} from "services/notifications/setNotificationsAPI";
import S from "pages/Notification/style";

export default function Notifications() {
  const [sendNotification] = useSendNotificationMutation();
  const [readNotification] = useReadNotificationMutation();
  const { data, isLoading, isSuccess } = useGetNotificationsQuery();
  const [notifications, setNotifications] = useState<NotificationsType[]>([]);
  const socket = getSocket();

  function receiveNotification(notification: NotificationsType) {
    const newNotification = { ...notification };
    setNotifications([...notifications, newNotification]);
  }

  socket.on("first-message", (notification) => {
    receiveNotification(notification);
  });

  useEffect(() => {
    if (isSuccess && !isLoading && data) {
      setNotifications(data);
    }
  }, [isLoading, isSuccess, data]);

  const handleReadNotification = (id: number) => {
    readNotification(id);
  };

  const sendTestNotification = () => {
    const newNotification = {
      fromUserId: 1,
      toUserId: 1,
      type: "TEST_NOTIFICATION",
    };
    sendNotification(newNotification);
  };
  return (
    <>
      <h1>Notifications</h1>
      <Button onClick={sendTestNotification}>Create Notification</Button>
      {notifications.map((item) => (
        <S.NotificationBox
          key={item.id}
          onClick={() => handleReadNotification(item.id || 0)}
        >
          <Typography>Notification type: {item.type}</Typography>
          <Typography>From: {item.fromUser?.firstName}</Typography>
        </S.NotificationBox>
      ))}
    </>
  );
}
