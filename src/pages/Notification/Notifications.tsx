import { Button, Typography } from "antd";
import React, { useState } from "react";
import NotificationBox, { Container } from "pages/Notification/style";
import {
  useGetNotificationsQuery,
  useReadNotificationsMutation,
} from "services/notifications/setNotificationsAPI";
import { formatToStandardDate } from "utils/functions/formatDateFunctions";
import { useNavigate } from "react-router-dom";
import { CHAT_ROUTE } from "utils/consts/routeConsts";
import { useTranslation } from "react-i18next";
import { StyledPagination } from "pages/JobOwner/MyJobs/ClientJobsStyles";
import { POSTS_PER_PAGE as PPG } from "utils/consts/jobListConsts";

export default function Notifications() {
  const { t } = useTranslation();

  const { data } = useGetNotificationsQuery();

  const [markNotificationsAsRead] = useReadNotificationsMutation();

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage, setPostsPerPage] = useState<number>(PPG);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  const onClickHandler = (roomId: number, notificationId: number) => {
    markNotificationsAsRead([notificationId]);
    navigate(`${CHAT_ROUTE}/${roomId}`);
  };

  const renderContent = (): JSX.Element[] | JSX.Element => {
    if (!data?.notifications?.length) {
      return <div>{t("Notifications.noNotifications")}</div>;
    }
    return data.notifications
      .slice(firstPostIndex, lastPostIndex)
      .map((item) => (
        <NotificationBox isRead={item.isRead} key={item.id}>
          <Typography.Text strong style={{ textTransform: "capitalize" }}>
            {item.type}
          </Typography.Text>
          {!item.isRead && <Typography>{item.text}</Typography>}
          <Typography>
            {formatToStandardDate(new Date(item.createdAt))}
          </Typography>
          <Button
            style={{ marginTop: "10px" }}
            type="primary"
            shape="round"
            onClick={() => onClickHandler(item.roomId, item.id)}
          >
            {t("Notifications.button")}
          </Button>
        </NotificationBox>
      ));
  };

  return (
    <Container>
      <h1>{t("Notifications.title")}</h1>
      {renderContent()}
      <StyledPagination
        showSizeChanger
        onShowSizeChange={(_page, pageSize) => setPostsPerPage(pageSize)}
        current={currentPage}
        onChange={(page) => setCurrentPage(page)}
        pageSize={postsPerPage}
        total={data?.notifications?.length}
        pageSizeOptions={[PPG, PPG * 2, PPG * 3]}
      />
    </Container>
  );
}
