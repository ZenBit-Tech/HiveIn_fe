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
import { BOX_SHADOW_DARK, BOX_SHADOW_LIGHT } from "utils/consts/colorConsts";

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
        <div
          key={item.id}
          onClick={() => handleReadNotification(item.id || 0)}
          style={{
            width: "230px",
            borderRadius: "12px",
            height: "85px",
            background: item.read ? "#fff" : "#ddd",
            margin: "15px 0",
            padding: "5px",
            cursor: "pointer",
            boxShadow: `${BOX_SHADOW_LIGHT} 0px 1px 3px, ${BOX_SHADOW_DARK} 0px 1px 2px`,
          }}
        >
          <Typography>Notification type: {item.type}</Typography>
          <Typography>From: {item.fromUser?.firstName}</Typography>
        </div>
      ))}
    </>
  );
}
