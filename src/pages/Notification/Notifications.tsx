/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Typography } from "antd";
import React, { useEffect } from "react";
import NotificationBox from "pages/Notification/style";
import {
  useGetNotificationsQuery,
  useReadNotificationsMutation,
} from "services/notifications/setNotificationsAPI";
import { formatToStandardDate } from "utils/functions/formatDateFunctions";

export default function Notifications() {
  const { data } = useGetNotificationsQuery();
  const [markNotificationsAsRead] = useReadNotificationsMutation();

  useEffect(() => {
    return () => {
      if (data?.notifications) {
        const notificationIds = data.notifications.map(
          (notification) => notification.id
        );
        markNotificationsAsRead(notificationIds);
      }
    };
  }, [data]);

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
          </NotificationBox>
        ))
      ) : (
        <div>Nothing</div>
      )}
    </>
  );
}
