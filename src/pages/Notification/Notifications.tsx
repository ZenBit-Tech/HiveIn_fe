/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button, Typography } from "antd";
import React from "react";
import NotificationBox, { Container } from "pages/Notification/style";
import {
  useGetNotificationsQuery,
  useReadNotificationsMutation,
} from "services/notifications/setNotificationsAPI";
import { formatToStandardDate } from "utils/functions/formatDateFunctions";
import { useNavigate } from "react-router-dom";
import { CHAT_ROUTE } from "utils/consts/routeConsts";
import { useTranslation } from "react-i18next";

export default function Notifications() {
  const { t } = useTranslation();

  const { data } = useGetNotificationsQuery();

  const [markNotificationsAsRead] = useReadNotificationsMutation();

  const navigate = useNavigate();

  const onClickHandler = (roomId: number, notificationId: number) => {
    markNotificationsAsRead([notificationId]);
    navigate(`${CHAT_ROUTE}/${roomId}`);
  };

  return (
    <Container>
      <h1>{t("Notifications.title")}</h1>
      {data?.notifications?.length ? (
        data.notifications?.map((item) => (
          <NotificationBox isRead={item.isRead} key={item.id}>
            <Typography.Text strong style={{ textTransform: "capitalize" }}>
              {item.type}
            </Typography.Text>
            {!item.isRead && <Typography>{item.text}</Typography>}
            <Typography>
              {formatToStandardDate(new Date(item.createdAt))}
            </Typography>
            <Button
              type="primary"
              shape="round"
              onClick={() => onClickHandler(item.roomId, item.id)}
            >
              {t("Notifications.button")}
            </Button>
          </NotificationBox>
        ))
      ) : (
        <div>{t("Notifications.noNotifications")}</div>
      )}
    </Container>
  );
}
