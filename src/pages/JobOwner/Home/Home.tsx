import { Button, Divider, Typography } from "antd";
import JobPost from "components/JobPost/Index";
import useGoogleAuth from "hooks/useGoogleAuth";
import { useTranslation } from "react-i18next";
import { BLUE } from "utils/colorConsts";
import S from "./style";

export default function ClientHome() {
  useGoogleAuth();

  const { Title } = Typography;

  const mockPosts = [
    {
      name: "Full stack developer",
      hired: 0,
      messages: 15,
      proposals: 8,
      createdAt: new Date(),
    },
    {
      name: "Frontend developer",
      hired: 0,
      messages: 10,
      proposals: 13,
      createdAt: new Date(),
    },
  ];
  const { t } = useTranslation();
  const stepsList = [
    t("Dashboard.createJobTutorial.list.item1"),
    t("Dashboard.createJobTutorial.list.item2"),
    t("Dashboard.createJobTutorial.list.item3"),
    t("Dashboard.createJobTutorial.list.item4"),
  ];

  return (
    <S.Container>
      <S.Box>
        <Divider />
        <S.TitleContainer>
          <Title level={4}>{t("Dashboard.titles.posts")}</Title>
          <Button shape="round" size="large" type="primary">
            {t("Dashboard.buttons.seePosts")}
          </Button>
        </S.TitleContainer>
        {mockPosts.map(({ createdAt, hired, messages, name, proposals }) => (
          <div key={name} style={{ margin: "15px 0", width: "100%" }}>
            <JobPost
              createdAt={createdAt}
              name={name}
              hired={hired}
              messages={messages}
              proposals={proposals}
            />
          </div>
        ))}
      </S.Box>
      <S.Box>
        <Divider />
        <S.TitleContainer>
          <Title level={4}>{t("Dashboard.titles.drafts")}</Title>
          <Button shape="round" size="large" type="primary">
            {t("Dashboard.buttons.seeDrafts")}
          </Button>
        </S.TitleContainer>
        {mockPosts.map(({ createdAt, name }) => (
          <div key={name} style={{ margin: "15px 0", width: "100%" }}>
            <JobPost createdAt={createdAt} name={name} />
          </div>
        ))}
        <Divider />
      </S.Box>
      <S.Box>
        <div style={{ width: "45%" }}>
          <Title level={4} style={{ color: BLUE }}>
            {t("Dashboard.createJobTutorial.title")}
          </Title>
          <span>
            {t("Dashboard.createJobTutorial.subtitle.start")}{" "}
            <span style={{ color: BLUE }}>
              {t("Dashboard.createJobTutorial.subtitle.focus")}
            </span>{" "}
            {t("Dashboard.createJobTutorial.subtitle.end")}
          </span>
          <ol>
            {stepsList.map((item) => (
              <li style={{ padding: "5px 0" }}>{item}</li>
            ))}
          </ol>
        </div>
      </S.Box>
    </S.Container>
  );
}
