import { Button, Divider, Typography } from "antd";
import JobPost from "components/JobPost/Index";
import useGoogleAuth from "hooks/useGoogleAuth";
import useJwtDecoder from "hooks/useJwtDecoder";
import { useTranslation } from "react-i18next";
import { useGetHomePostsQuery } from "services/jobPosts/setJobPostsAPI";
import { BLUE } from "utils/colorConsts";
import S from "./style";

export default function ClientHome() {
  useGoogleAuth();

  const { sub: id } = useJwtDecoder();
  const { Title } = Typography;

  const { data: drafts } = useGetHomePostsQuery({
    id: Number(id) || 0,
    isDraft: true,
  });

  const { data: posts } = useGetHomePostsQuery({
    id: Number(id) || 0,
    isDraft: false,
  });

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
        {posts ? (
          posts.map(({ createdAt, title, ...post }) => (
            <div key={post.id} style={{ margin: "15px 0", width: "100%" }}>
              <JobPost
                createdAt={new Date(createdAt)}
                name={title}
                hired={0}
                messages={0}
                proposals={0}
              />
            </div>
          ))
        ) : (
          <Title level={4}>{t("Dashboard.titles.noPosts")}</Title>
        )}
      </S.Box>
      <S.Box>
        <Divider />
        <S.TitleContainer>
          <Title level={4}>{t("Dashboard.titles.drafts")}</Title>
          <Button shape="round" size="large" type="primary">
            {t("Dashboard.buttons.seeDrafts")}
          </Button>
        </S.TitleContainer>
        {drafts ? (
          drafts.map(({ createdAt, title, ...draft }) => (
            <div key={draft.id} style={{ margin: "15px 0", width: "100%" }}>
              <JobPost isDraft createdAt={new Date(createdAt)} name={title} />
            </div>
          ))
        ) : (
          <Title level={4}>{t("Dashboard.titles.noDrafts")}</Title>
        )}
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
              <li key={item} style={{ padding: "5px 0" }}>
                {item}
              </li>
            ))}
          </ol>
        </div>
      </S.Box>
    </S.Container>
  );
}
